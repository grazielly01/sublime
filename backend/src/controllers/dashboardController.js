const prisma = require('../config/database');


class DashboardController {
  async obterVisaoGeral(req, res) {
    try {
      // 1. Cards de Resumo (Métricas do Topo)

      // Faturamento do mês (Soma dos pedidos do mês atual)
      const inicioMes = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      const faturamento = await prisma.pedido.aggregate({
        _sum: { valor: true },
        where: { data: { gte: inicioMes } }
      });

      // Pedidos Abertos (Status diferente de Entregue/Cancelado)
      const pedidosAbertos = await prisma.pedido.count({
        where: { status: { notIn: ['Entregue', 'Cancelado'] } }
      });

      // Produção do Dia (Soma dos produtos produzidos hoje)
      const producaoDia = await prisma.produto.aggregate({
        _sum: { produzidos: true }
      });

      // Itens com Estoque Baixo
      const itensEmBaixa = await prisma.produto.count({
        where: {
          estoque: { lte: prisma.produto.fields.estoqueMin }
        }
      });

      // 2. Pedidos Recentes (Últimos 4 pedidos)
      const pedidosRecentes = await prisma.pedido.findMany({
        take: 4,
        orderBy: { data: 'desc' }
      });

      // 3. Produtos Mais Lucrativos (Top 4 por Lucro)
      const produtosMaisLucrativos = await prisma.produto.findMany({
        take: 4,
        orderBy: { lucro: 'desc' }
      });

      // 4. Metas Ativas
      const metas = await prisma.meta.findMany({
        take: 3
      });

      // Retorno consolidado para a Dashboard
      return res.json({
        resumo: {
          faturamentoMes: faturamento._sum.valor || 0,
          pedidosAbertos,
          producaoDia: producaoDia._sum.produzidos || 0,
          itensEmBaixa
        },
        pedidosRecentes,
        produtosMaisLucrativos,
        metas
      });

    } catch (error) {
      return res.status(500).json({ 
        error: 'Erro ao carregar dados do Dashboard', 
        detalhes: error.message 
      });
    }
  }
}

module.exports = new DashboardController();

//fazer a troca de sessoes