const prisma = require('../config/database');

function categoriaParaBanco(categoria) {
  const mapa = {
    producao: 'produção',
    produção: 'produção',
    entrega: 'entrega',
    compra: 'compra',
    pagamento: 'pagamento',
    outro: 'outro'
  };

  return mapa[String(categoria || '').toLowerCase()] || 'outro';
}

function categoriaParaFrontend(categoria) {
  const valor = String(categoria || 'outro').toLowerCase();
  return valor === 'produção' ? 'producao' : valor;
}

function dataLocal(valor) {
  if (!valor) return null;
  if (typeof valor === 'string') {
    const apenasData = valor.slice(0, 10);
    if (/^\d{4}-\d{2}-\d{2}/.test(apenasData)) return apenasData;
  }

  const data = new Date(valor);
  if (Number.isNaN(data.getTime())) return null;
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

function formatarEvento(evento) {
  const inicio = evento.data_inicio_evento;
  const data = dataLocal(inicio);
  if (!data) return null;

  const [ano, mes, dia] = data.split('-').map(Number);
  return {
    id: evento.id_evento,
    dia,
    mes: mes - 1,
    ano,
    titulo: evento.titulo_evento || 'Evento',
    categoria: categoriaParaFrontend(evento.categoria_evento),
    descricao: evento.descricao_evento || ''
  };
}

class CalendarioController {
  async listar(req, res) {
    try {
      const eventos = await prisma.$queryRawUnsafe(`
        SELECT id_evento, titulo_evento, data_inicio_evento,
               data_fim_evento, categoria_evento, descricao_evento
        FROM evento
        ORDER BY data_inicio_evento ASC
      `);

      const ordens = await prisma.$queryRawUnsafe(`
        SELECT id_ordem, nome_produto_ordem, quantidade_total,
               prazo_ordem, status_ordem
        FROM ordens_producao
      `);

      const pedidos = await prisma.$queryRawUnsafe(`
        SELECT p.id_pedido, p.nome_produto_pedido, p.data_entrega_pedido,
               p.status_pedido, c.nome_cliente
        FROM pedido p
        LEFT JOIN cliente c ON c.id_cliente = p.cliente_pedido
      `);

      const resultado = eventos
        .map(formatarEvento)
        .filter(Boolean);

      for (const ordem of ordens) {
        const data = dataLocal(ordem.prazo_ordem);
        if (!data) continue;
        const [ano, mes, dia] = data.split('-').map(Number);
        resultado.push({
          id: `ordem-${ordem.id_ordem}`,
          dia,
          mes: mes - 1,
          ano,
          titulo: `${ordem.quantidade_total || ''} ${ordem.nome_produto_ordem || 'Produto'}`.trim(),
          categoria: 'producao',
          descricao: `Ordem de produção ${ordem.status_ordem || 'na fila'}.`,
          origem: 'ordens_producao'
        });
      }

      for (const pedido of pedidos) {
        const data = dataLocal(pedido.data_entrega_pedido);
        if (!data) continue;
        const [ano, mes, dia] = data.split('-').map(Number);
        resultado.push({
          id: `pedido-${pedido.id_pedido}`,
          dia,
          mes: mes - 1,
          ano,
          titulo: pedido.nome_produto_pedido || `Pedido #${pedido.id_pedido}`,
          categoria: 'entrega',
          descricao: `Entrega para ${pedido.nome_cliente || 'cliente não informado'} - ${pedido.status_pedido || 'aguardando'}.`,
          origem: 'pedido'
        });
      }

      resultado.sort((a, b) =>
        new Date(a.ano, a.mes, a.dia) - new Date(b.ano, b.mes, b.dia)
      );

      return res.json({ total: resultado.length, data: resultado });
    } catch (error) {
      console.error('Erro ao listar calendário:', error);
      return res.status(500).json({ error: 'Erro ao carregar eventos do banco de dados.' });
    }
  }

  async criar(req, res) {
    try {
      const titulo = req.body.titulo || req.body.titulo_evento;
      const prazo = req.body.prazo || req.body.data_inicio_evento;

      if (!titulo || !prazo) {
        return res.status(400).json({ error: 'Título e prazo são obrigatórios.' });
      }

      const inicio = new Date(`${prazo}T00:00:00`);
      if (Number.isNaN(inicio.getTime())) {
        return res.status(400).json({ error: 'Prazo inválido.' });
      }

      const categoria = categoriaParaBanco(req.body.categoria);
      const descricao = req.body.descricao || req.body.descricao_evento || null;

      await prisma.$executeRawUnsafe(`
        INSERT INTO evento (titulo_evento, data_inicio_evento, data_fim_evento,
                            categoria_evento, descricao_evento)
        VALUES (?, ?, ?, ?, ?)
      `, titulo, inicio, inicio, categoria, descricao);

      const [evento] = await prisma.$queryRawUnsafe(`
        SELECT * FROM evento ORDER BY id_evento DESC LIMIT 1
      `);

      return res.status(201).json(formatarEvento(evento));
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      return res.status(500).json({ error: 'Erro ao cadastrar evento no banco de dados.' });
    }
  }

  async atualizar(req, res) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) {
        return res.status(400).json({ error: 'Este evento veio de outra tabela e não pode ser editado aqui.' });
      }

      const atual = await prisma.$queryRawUnsafe(
        'SELECT * FROM evento WHERE id_evento = ?', id
      );

      if (!atual.length) {
        return res.status(404).json({ error: 'Evento não encontrado.' });
      }

      const prazo = req.body.prazo || req.body.data_inicio_evento;
      const inicio = prazo
        ? new Date(`${prazo}T00:00:00`)
        : atual[0].data_inicio_evento;

      if (Number.isNaN(inicio.getTime())) {
        return res.status(400).json({ error: 'Prazo inválido.' });
      }

      const titulo = req.body.titulo ?? atual[0].titulo_evento;
      const categoria = req.body.categoria
        ? categoriaParaBanco(req.body.categoria)
        : atual[0].categoria_evento;
      const descricao = req.body.descricao ?? atual[0].descricao_evento;

      await prisma.$executeRawUnsafe(`
        UPDATE evento
        SET titulo_evento = ?, data_inicio_evento = ?, data_fim_evento = ?,
            categoria_evento = ?, descricao_evento = ?
        WHERE id_evento = ?
      `, titulo, inicio, inicio, categoria, descricao, id);

      const [evento] = await prisma.$queryRawUnsafe(
        'SELECT * FROM evento WHERE id_evento = ?', id
      );

      return res.json(formatarEvento(evento));
    } catch (error) {
      console.error('Erro ao atualizar evento:', error);
      return res.status(500).json({ error: 'Erro ao atualizar evento no banco de dados.' });
    }
  }

  async excluir(req, res) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) {
        return res.status(400).json({ error: 'Este item é derivado de pedidos ou produção e não pode ser excluído pelo calendário.' });
      }

      const resultado = await prisma.$executeRawUnsafe(
        'DELETE FROM evento WHERE id_evento = ?', id
      );

      if (resultado === 0) {
        return res.status(404).json({ error: 'Evento não encontrado.' });
      }

      return res.json({ mensagem: 'Evento excluído com sucesso!' });
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
      return res.status(500).json({ error: 'Erro ao excluir evento do banco de dados.' });
    }
  }
}

module.exports = new CalendarioController();
