const prisma = require('../config/database');

function normalizarStatus(status) {
  if (!status) return undefined;

  const valor = String(status).toUpperCase();
  if (valor === 'EM_PRODUCAO' || valor === 'EM PRODUÇÃO') {
    return 'em_produ__o';
  }

  const mapa = {
    AGUARDANDO: 'aguardando',
    PRONTO: 'pronto',
    ENTREGUE: 'entregue',
    CANCELADO: 'cancelado'
  };

  return mapa[valor];
}

function formatarStatus(status) {
  if (!status) return 'AGUARDANDO';

  const valor = String(status).toLowerCase();
  if (valor === 'em producao' || valor === 'em produção' || valor === 'em_produ__o') {
    return 'EM_PRODUCAO';
  }

  return valor.toUpperCase();
}

class PedidoController {
  // GET /pedidos - Aceita filtro por Query Param: ?status=AGUARDANDO
  async listar(req, res) {
    try {
      const { status } = req.query;
      const statusFiltro = status && status.toUpperCase() !== 'TODOS'
        ? normalizarStatus(status)
        : undefined;

      const pedidos = await prisma.pedido.findMany({
        where: statusFiltro ? { status_pedido: statusFiltro } : undefined,
        include: {
          cliente: true,
          pedido_item: true
        },
        orderBy: { id_pedido: 'desc' }
      });

      const resultado = pedidos.map((pedido) => ({
        id: pedido.id_pedido,
        cliente: pedido.cliente?.nome_cliente || '',
        clienteId: pedido.cliente_pedido,
        itensCount: pedido.qtde_produto_pedido || pedido.pedido_item?.length || 1,
        entrega: pedido.data_entrega_pedido
          ? pedido.data_entrega_pedido.toISOString().slice(0, 10)
          : 'A definir',
        valorTotal: pedido.vlr_total_pedido ? Number(pedido.vlr_total_pedido) : 0,
        status: formatarStatus(pedido.status_pedido),
        descricao: pedido.descricao_pedido,
        produto: pedido.nome_produto_pedido
      }));

      return res.json({
        total: resultado.length,
        data: resultado
      });
    } catch (erro) {
      console.error('Erro ao listar pedidos:', erro);
      return res.status(500).json({ error: 'Erro ao carregar pedidos do banco de dados.' });
    }
  }

  // POST /pedidos - Cadastra um novo pedido
  async criar(req, res) {
    try {
      const { cliente, itensCount, entrega, valorTotal, descricao, status } = req.body;

      if (!cliente || valorTotal === undefined) {
        return res.status(400).json({ error: 'Cliente e valor são obrigatórios.' });
      }

      let clientePedido = await prisma.cliente.findFirst({
        where: { nome_cliente: cliente }
      });

      if (!clientePedido) {
        clientePedido = await prisma.cliente.create({
          data: { nome_cliente: cliente }
        });
      }

      const novoPedido = await prisma.pedido.create({
        data: {
          cliente_pedido: clientePedido.id_cliente,
          nome_produto_pedido: descricao || 'Pedido',
          data_entrega_pedido: entrega ? new Date(entrega) : null,
          qtde_produto_pedido: Number(itensCount) || 1,
          status_pedido: normalizarStatus(status) || 'aguardando',
          vlr_total_pedido: Number(valorTotal),
          descricao_pedido: descricao || null
        }
      });

      return res.status(201).json({
        id: novoPedido.id_pedido,
        cliente,
        itensCount: novoPedido.qtde_produto_pedido,
        entrega: novoPedido.data_entrega_pedido
          ? novoPedido.data_entrega_pedido.toISOString().slice(0, 10)
          : 'A definir',
        valorTotal: Number(novoPedido.vlr_total_pedido),
        status: formatarStatus(novoPedido.status_pedido)
      });
    } catch (erro) {
      console.error('Erro ao criar pedido:', erro);
      return res.status(500).json({ error: 'Erro ao cadastrar pedido no banco de dados.' });
    }
  }

  // PATCH /pedidos/:id/status - Altera o status no banco

async atualizarStatus(req, res) {
  try {
    const id = Number(req.params.id);
    const status = normalizarStatus(req.body.status);

    const atual = await prisma.ordens_producao.findUnique({
      where: { id_ordem: id }
    });

    if (!atual) {
      return res.status(404).json({
        error: 'Ordem não encontrada.'
      });
    }

    const ordem = await prisma.ordens_producao.update({
      where: { id_ordem: id },
      data: {
        status_ordem: status,

        quantidade_feita: status === 'concluida'
          ? atual.quantidade_total
          : atual.quantidade_feita,

        data_conclusao_ordem: status === 'concluida'
          ? (atual.data_conclusao_ordem || new Date())
          : null
      }
    });

    return res.json({
      id: ordem.id_ordem,
      produto: ordem.nome_produto_ordem,
      quantidadeTotal: ordem.quantidade_total,
      quantidadeFeita: ordem.quantidade_feita,
      status: formatarStatus(ordem.status_ordem),
      dataConclusao: ordem.data_conclusao_ordem
    });

  } catch (error) {
    console.error('Erro ao atualizar ordem:', error);

    return res.status(500).json({
      error: 'Erro ao atualizar ordem no banco de dados.'
    });
  }
}
}

module.exports = new PedidoController();