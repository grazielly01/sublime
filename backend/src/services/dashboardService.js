const prisma = require('../config/database');

function moeda(valor) {
  return Number(valor || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

async function obterDashboard() {
  const now = new Date();
  const inicioMes = new Date(now.getFullYear(), now.getMonth(), 1);
  const [pedidos, insumos, produtos, clientes, ordens, entradas, saidas, metas, fornecedores] = await Promise.all([
    prisma.pedido.findMany({ include: { cliente: true } }),
    prisma.insumos.findMany({ include: { categoria_insumos: true } }),
    prisma.produtos.findMany({ orderBy: { qtde_produto: 'desc' } }),
    prisma.cliente.findMany({ include: { pedido: true }, orderBy: { id_cliente: 'desc' } }),
    prisma.ordens_producao.findMany({ orderBy: { prazo_ordem: 'asc' } }),
    prisma.entradas.findMany({ where: { data_entrada: { gte: inicioMes } } }),
    prisma.saidas.findMany({ where: { data_saida: { gte: inicioMes } } }),
    prisma.meta.findMany({ orderBy: { id_meta: 'asc' } }),
    prisma.fornecedores.findMany({ orderBy: { data_ultima_movimentacao_fornecedor: 'desc' } })
  ]);

  const faturamento = pedidos.reduce((total, pedido) => total + Number(pedido.vlr_total_pedido || 0), 0);
  const entradasMes = entradas.reduce((total, entrada) => total + Number(entrada.valor_entrada || 0), 0);
  const saidasMes = saidas.reduce((total, saida) => total + Number(saida.valor_saida || 0), 0);
  const insumosBaixos = insumos.filter((item) => Number(item.qtde_em_estoque_insumo || 0) <= Number(item.qtde_minima_insumo || 0));

  const metasFormatadas = metas.map((meta) => ({
    id: String(meta.id_meta),
    nome: meta.titulo_meta || 'Meta',
    atual: Number(meta.qtde_atual_meta ?? meta.valor_atual_meta ?? 0),
    objetivo: Number(meta.qtde_meta ?? meta.valor_alvo_meta ?? 0),
    tipo: meta.tipo_meta === 'moeda' ? 'moeda' : 'numero'
  }));
  return {
    resumo: [
      { titulo: 'Estoque', valor: insumosBaixos.length ? 'Atenção' : 'OK', status: insumosBaixos.length ? 'atencao' : 'ok' },
      { titulo: 'Produção', valor: ordens.some((ordem) => ordem.status_ordem === 'em_andamento') ? 'Em andamento' : 'Normal', status: 'atencao' },
      { titulo: 'Pedidos', valor: String(pedidos.length), status: 'urgente' },
      { titulo: 'Financeiro', valor: moeda(entradasMes - saidasMes), status: 'estavel' }
    ],
    kpis: [
      { titulo: 'Lucro estimado (mês)', valor: moeda(entradasMes - saidasMes), variacao: '', status: entradasMes >= saidasMes ? 'positivo' : 'negativo' },
      { titulo: 'Saídas (mês)', valor: moeda(saidasMes), variacao: '', status: 'negativo' },
      { titulo: 'Faturamento (mês)', valor: moeda(faturamento), variacao: '', status: 'positivo' },
      { titulo: 'Pedidos cadastrados', valor: String(pedidos.length), variacao: '', status: 'positivo' }
    ],
    receita: [],
    historicoFinanceiro: [],
    historicoProducao: [],
    historicoComercial: [],
    metas: metasFormatadas,
    producao: {
      oee: 0,
      disponibilidade: 0,
      desempenho: 0,
      qualidade: 0
    },
    produtos: produtos.slice(0, 5).map((produto) => ({
      nome: produto.nome_produto,
      quantidade: Number(produto.qtde_produto || 0),
      percentual: 0
    })),
    lotes: insumosBaixos.slice(0, 5).map((insumo) => ({
      codigo: insumo.lote_insumo ? `#${insumo.lote_insumo}` : `#I${insumo.idInsumo}`,
      produto: insumo.nome_insumo,
      qtd: `${insumo.qtde_em_estoque_insumo || 0} un`,
      vence: insumo.data_validade_insumo ? insumo.data_validade_insumo.toISOString().slice(0, 10) : 'Sem validade',
      badgeClass: 'badgeUrgente'
    })),
    clientes: clientes.slice(0, 10).map((cliente) => ({
      nome: cliente.nome_cliente,
      pedidos: cliente.pedido.length,
      ltv: moeda(cliente.pedido.reduce((total, pedido) => total + Number(pedido.vlr_total_pedido || 0), 0)),
      status: cliente.status_cliente || 'ativo'
    })),
    entregas: pedidos
      .filter((pedido) => pedido.status_pedido !== 'entregue' && pedido.status_pedido !== 'cancelado')
      .slice(0, 10)
      .map((pedido) => ({
        cliente: pedido.cliente?.nome_cliente || 'Cliente não informado',
        produto: pedido.nome_produto_pedido || 'Pedido',
        quando: pedido.data_entrega_pedido ? pedido.data_entrega_pedido.toISOString().slice(0, 10) : 'Sem prazo',
        urgente: pedido.status_pedido === 'aguardando'
      })),
    alertas: insumosBaixos.slice(0, 10).map((insumo) => ({
      id: insumo.idInsumo,
      tipo: 'Estoque',
      mensagem: `${insumo.nome_insumo} abaixo do mínimo`,
      nivel: 'alta'
    })),
    fornecedores: fornecedores.slice(0, 10).map((fornecedor) => ({
      nome: fornecedor.nome_fornecedor,
      atraso: fornecedor.atraso_dias_fornecedor ? `${fornecedor.atraso_dias_fornecedor}d` : '0d',
      nota: Number(fornecedor.nota_fornecedor || 0).toFixed(1),
      ultima: fornecedor.data_ultima_movimentacao_fornecedor
        ? fornecedor.data_ultima_movimentacao_fornecedor.toISOString().slice(0, 10)
        : ''
    })),
    fluxoSemana: [],
    indicadores: [
      { titulo: 'Margem média', valor: entradasMes > 0 ? `${(((entradasMes - saidasMes) / entradasMes) * 100).toFixed(1)}%` : '0%' },
      { titulo: 'Pedidos cadastrados', valor: String(pedidos.length) },
      { titulo: 'Insumos em atenção', valor: String(insumosBaixos.length) },
      { titulo: 'Ordens de produção', valor: String(ordens.length) }
    ]
  };
}

async function atualizarMetas(metas) {
  if (!Array.isArray(metas) || metas.length > 6) {

     throw new Error('Lista de metas inválida.');
  }

  await prisma.$transaction(async (tx) => {
    await tx.meta.deleteMany();
    await tx.meta.createMany({
      data: metas.map((meta) => ({
        titulo_meta: String(meta.nome || '').trim(),
        qtde_meta: meta.tipo === 'moeda' ? null : Number(meta.objetivo),
        qtde_atual_meta: meta.tipo === 'moeda' ? null : Number(meta.atual),
        valor_alvo_meta: meta.tipo === 'moeda' ? Number(meta.objetivo) : null,
        valor_atual_meta: meta.tipo === 'moeda' ? Number(meta.atual) : null,
        tipo_meta: meta.tipo === 'moeda' ? 'moeda' : 'numero'
      }))
    });
  });

   return obterDashboard();
}
module.exports = { obterDashboard, atualizarMetas };