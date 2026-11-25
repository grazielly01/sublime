const prisma = require('../config/database');

class AlertasController {
  // GET /alertas - Lista alertas com suporte a filtro ?categoria=ESTOQUE
  async listar(req, res) {
    try {
      const { categoria } = req.query;
      const insumos = await prisma.insumos.findMany({
        include: { categoria_insumos: true }
      });
      const pedidos = await prisma.pedido.findMany({
        include: { cliente: true },
        where: { status_pedido: { notIn: ['entregue', 'cancelado'] } }
      });

      const alertas = [];

      insumos.forEach((insumo) => {
        const quantidade = Number(insumo.qtde_em_estoque_insumo || 0);
        const minimo = Number(insumo.qtde_minima_insumo || 0);
        if (quantidade <= minimo) {
          alertas.push({
            id: 1000 + insumo.idInsumo,
            titulo: `${insumo.nome_insumo || 'Insumo'} abaixo do mínimo`,
            descricao: `Apenas ${quantidade} restantes (mínimo ${minimo}).`,
            prioridade: quantidade === 0 ? 'ALTA' : 'MÉDIA',
            categoria: 'ESTOQUE',
            corBarra: quantidade === 0 ? '#d32f2f' : '#fbc02d'
          });
        }

        if (insumo.data_validade_insumo) {
          const hoje = new Date();
          const dias = Math.ceil((insumo.data_validade_insumo.getTime() - hoje.getTime()) / 86400000);
          if (dias >= 0 && dias <= 30) {
            alertas.push({
              id: 2000 + insumo.idInsumo,
              titulo: `Validade próxima - ${insumo.nome_insumo || 'Insumo'}`,
              descricao: `Lote ${insumo.lote_insumo || '-'} vence em ${dias} dia(s).`,
              prioridade: dias <= 7 ? 'ALTA' : 'MÉDIA',
              categoria: 'VALIDADE',
              corBarra: dias <= 7 ? '#d32f2f' : '#fbc02d'
            });
          }
        }
      });

      pedidos.forEach((pedido) => {
        alertas.push({
          id: 3000 + pedido.id_pedido,
          titulo: `Pedido #${pedido.id_pedido} em aberto`,
          descricao: `${pedido.cliente?.nome_cliente || 'Cliente não informado'}: ${pedido.nome_produto_pedido || 'Pedido cadastrado'}.`,
          prioridade: pedido.status_pedido === 'aguardando' ? 'MÉDIA' : 'BAIXA',
          categoria: 'PEDIDOS',
          corBarra: pedido.status_pedido === 'aguardando' ? '#fbc02d' : '#616161'
        });
      });

      const categoriaFiltro = categoria && categoria.toUpperCase() !== 'TODOS'
        ? categoria.toUpperCase()
        : null;
      const resultado = categoriaFiltro
        ? alertas.filter((alerta) => alerta.categoria === categoriaFiltro)
        : alertas;

      return res.json({ total: resultado.length, data: resultado });
    } catch (error) {
      console.error('Erro ao listar alertas:', error);
      return res.status(500).json({ error: 'Erro ao carregar alertas do banco de dados.' });
    }
  }

  // DELETE /alertas/:id - Dispensa/Remove um alerta da lista
  async dispensar(req, res) {
    return res.status(404).json({
      error: 'Este alerta é calculado a partir do banco de dados e não pode ser dispensado.'
    });
  }
}

module.exports = new AlertasController();