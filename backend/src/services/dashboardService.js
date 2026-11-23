
function formatarData(data) {
  return [
    data.getFullYear(),
    String(data.getMonth() + 1).padStart(2, "0"),
    String(data.getDate()).padStart(2, "0")
  ].join("-");
}

// HISTÓRICO FINANCEIRO
function gerarHistoricoFinanceiro() {
  const historico = [];
  const hoje = new Date();

  for (let i = 364; i >= 0; i--) {
    const data = new Date(hoje);
    data.setDate(hoje.getDate() - i);

    const variacao = Math.sin(i / 12) * 700;
    const variacaoDia = Math.cos(i * 0.8) * 250;

    const receita = Math.round(3000 + variacao + variacaoDia);
    const custo = Math.round(receita * 0.48);
    const perdas = Math.round(
      custo * (0.025 + Math.abs(Math.sin(i)) * 0.015)
    );

    const lucro = receita - custo - perdas;

    const entrada = Math.round(
      receita * (0.75 + Math.abs(Math.sin(i / 5)) * 0.15)
    );

    const saida = Math.round(
      custo * (0.80 + Math.abs(Math.cos(i / 6)) * 0.15)
    );

    const valorEmAberto = Math.round(
      receita * (0.01 + Math.abs(Math.sin(i / 8)) * 0.04)
    );

    historico.push({
      data: formatarData(data),
      receita,
      custo,
      perdas,
      lucro,
      entrada,
      saida,
      valorEmAberto
    });
  }

  return historico;
}

// HISTÓRICO DE PRODUÇÃO
function gerarHistoricoProducao() {
  const historico = [];
  const hoje = new Date();

  for (let i = 364; i >= 0; i--) {
    const data = new Date(hoje);
    data.setDate(hoje.getDate() - i);

    const quantidade = Math.round(
      2800 + Math.sin(i / 10) * 500 + Math.cos(i) * 180
    );

    const disponibilidade = Math.round(88 + Math.sin(i / 8) * 5);
    const desempenho = Math.round(85 + Math.cos(i / 9) * 6);
    const qualidade = Math.round(94 + Math.sin(i / 7) * 3);

    const oee = Math.round(
      (disponibilidade * desempenho * qualidade) / 10000
    );

    const bolos = Math.round(quantidade * 0.25);
    const docesFinos = Math.round(quantidade * 0.30);
    const tortas = Math.round(quantidade * 0.20);
    const cupcakes = quantidade - bolos - docesFinos - tortas;

    historico.push({
      data: formatarData(data),
      quantidade,
      oee,
      disponibilidade,
      desempenho,
      qualidade,
      mix: {
        bolos,
        docesFinos,
        tortas,
        cupcakes
      }
    });
  }

  return historico;
}

// HISTÓRICO COMERCIAL
function gerarHistoricoComercial() {
  const historico = [];
  const hoje = new Date();

  const produtos = [
    "Brigadeiro Gourmet",
    "Cupcake Sortido",
    "Torta de Limão",
    "Bolo Red Velvet",
    "Copo da Felicidade"
  ];

  const clientes = [
    "Padaria Pão Quente",
    "Mercado Vila Nova",
    "Rede Doce Mel",
    "Café Central",
    "Empório Sabor"
  ];

  const precosProdutos = [3.5, 8, 28, 45, 12];

  for (let i = 364; i >= 0; i--) {
    const data = new Date(hoje);
    data.setDate(hoje.getDate() - i);

    const vendasProdutos = produtos.map((produto, index) => {
      const quantidade = Math.round(
        15 + Math.abs(Math.sin(i + index * 2)) * 65
      );

      return {
        produto,
        quantidade,
        faturamento: Math.round(
          quantidade * precosProdutos[index]
        )
      };
    });

    const vendasClientes = clientes.map((cliente, index) => {
      const pedidos = Math.round(
        Math.abs(Math.sin(i / 3 + index)) * 3
      );

      const faturamento =
        pedidos *
        Math.round(
          350 + Math.abs(Math.cos(i + index)) * 650
        );

      return {
        cliente,
        pedidos,
        faturamento
      };
    });

    historico.push({
      data: formatarData(data),
      vendasProdutos,
      vendasClientes
    });
  }

  return historico;
}

// DADOS DO DASHBOARD
const dashboardData = {
  resumo: [
    { titulo: "Estoque", valor: "OK", status: "ok" },
    { titulo: "Produção", valor: "Atenção", status: "atencao" },
    { titulo: "Pedidos", valor: "Urgente", status: "urgente" },
    { titulo: "Financeiro", valor: "Estável", status: "estavel" }
  ],

  kpis: [
    {
      titulo: "Lucro estimado (mês)",
      valor: "R$ 47.000",
      variacao: "+9,3%",
      status: "positivo"
    },
    {
      titulo: "Perdas em R$",
      valor: "R$ 2.912",
      variacao: "-12,1%",
      status: "positivo"
    },
    {
      titulo: "Faturamento (mês)",
      valor: "R$ 91.430",
      variacao: "+12,4%",
      status: "positivo"
    },
    {
      titulo: "Inadimplência",
      valor: "1,8%",
      variacao: "-0,4pp",
      status: "positivo"
    }
  ],

  receita: [
    { mes: "Jan", receita: 52, custo: 25 },
    { mes: "Fev", receita: 58, custo: 28 },
    { mes: "Mar", receita: 67, custo: 32 },
    { mes: "Abr", receita: 74, custo: 35 },
    { mes: "Mai", receita: 84, custo: 40 },
    { mes: "Jun", receita: 91, custo: 44 }
  ],

  historicoFinanceiro: gerarHistoricoFinanceiro(),
  historicoProducao: gerarHistoricoProducao(),
  historicoComercial: gerarHistoricoComercial(),

  metas: [
    {
      id: "m1",
      nome: "Meta de faturamento",
      atual: 91000,
      objetivo: 100000,
      tipo: "moeda"
    },
    {
      id: "m2",
      nome: "Pedidos do mês",
      atual: 142,
      objetivo: 160,
      tipo: "numero"
    },
    {
      id: "m3",
      nome: "Novos clientes B2B",
      atual: 7,
      objetivo: 10,
      tipo: "numero"
    }
  ],

  producao: {
    oee: 78,
    disponibilidade: 92,
    desempenho: 88,
    qualidade: 96
  },

  produtos: [
    { nome: "Brigadeiro Gourmet", quantidade: 4200, percentual: 100 },
    { nome: "Cupcake Sortido", quantidade: 3100, percentual: 74 },
    { nome: "Torta de Limão", quantidade: 2400, percentual: 57 },
    { nome: "Bolo Red Velvet", quantidade: 1900, percentual: 45 },
    { nome: "Copo da Felicidade", quantidade: 1650, percentual: 39 }
  ],

  lotes: [
    {
      codigo: "#L2206",
      produto: "Leite condensado",
      qtd: "120 un",
      vence: "5 dias",
      badgeClass: "badgeUrgente"
    },
    {
      codigo: "#L2198",
      produto: "Creme de leite",
      qtd: "85 un",
      vence: "12 dias",
      badgeClass: "badgeAtencao"
    },
    {
      codigo: "#L2185",
      produto: "Farinha de trigo",
      qtd: "200 kg",
      vence: "28 dias",
      badgeClass: "badgeNormal"
    }
  ],

  clientes: [
    {
      nome: "Padaria Pão Quente",
      pedidos: 28,
      ltv: "R$ 42.800",
      status: "Ativo"
    },
    {
      nome: "Mercado Vila Nova",
      pedidos: 22,
      ltv: "R$ 36.200",
      status: "Ativo"
    },
    {
      nome: "Rede Doce Mel",
      pedidos: 19,
      ltv: "R$ 31.900",
      status: "Atenção"
    },
    {
      nome: "Café Central",
      pedidos: 14,
      ltv: "R$ 18.400",
      status: "Ativo"
    },
    {
      nome: "Empório Sabor",
      pedidos: 11,
      ltv: "R$ 14.200",
      status: "Inativo"
    }
  ],

  entregas: [
    {
      cliente: "Padaria Pão Quente",
      produto: "300 brigadeiros",
      quando: "Hoje 14h",
      urgente: true
    },
    {
      cliente: "Mercado Vila Nova",
      produto: "80 tortas de limão",
      quando: "Amanhã 09h",
      urgente: false
    },
    {
      cliente: "Café Central",
      produto: "120 cupcakes",
      quando: "Amanhã 16h",
      urgente: false
    },
    {
      cliente: "Rede Doce Mel",
      produto: "Bolos sortidos (45kg)",
      quando: "Sex 08h",
      urgente: false
    }
  ],

  alertas: [
    {
      id: 1,
      tipo: "Estoque",
      mensagem: "Chocolate ao leite — 2 dias de cobertura",
      nivel: "alta"
    },
    {
      id: 2,
      tipo: "Validade",
      mensagem: "Lote #L2206 vence em 5 dias",
      nivel: "media"
    },
    {
      id: 3,
      tipo: "Financeiro",
      mensagem: "3 faturas vencendo nesta semana",
      nivel: "media"
    },
    {
      id: 4,
      tipo: "Produção",
      mensagem: "Forno 2 — manutenção preventiva atrasada",
      nivel: "alta"
    }
  ],

  fornecedores: [
    {
      nome: "Distribuidora Açúcar & Cia",
      atraso: "12d",
      nota: "2,8",
      ultima: "10/06/2026"
    },
    {
      nome: "Laticínios Sul",
      atraso: "5d",
      nota: "3,2",
      ultima: "14/06/2026"
    },
    {
      nome: "Embalagens Rápido",
      atraso: "8d",
      nota: "2,5",
      ultima: "11/06/2026"
    }
  ],

  fluxoSemana: [
    { dia: "Seg", entrada: 12400, saida: 8200 },
    { dia: "Ter", entrada: 9800, saida: 6100 },
    { dia: "Qua", entrada: 15200, saida: 11400 },
    { dia: "Qui", entrada: 11000, saida: 7300 },
    { dia: "Sex", entrada: 18900, saida: 9200 },
    { dia: "Sáb", entrada: 22400, saida: 5800 }
  ],

  indicadores: [
    { titulo: "Margem média", valor: "42%" },
    { titulo: "Ticket médio B2B", valor: "R$ 1.180" },
    { titulo: "Perdas de produção", valor: "3,2%" },
    { titulo: "Prazo médio entrega", valor: "2,4 dias" },
    { titulo: "Produção do dia", valor: "3.280 un." }
  ]
};

// OBTER DADOS DO DASHBOARD
function obterDashboard() {
  return JSON.parse(JSON.stringify(dashboardData));
}

// ATUALIZAR METAS
function atualizarMetas(metas) {
  if (!Array.isArray(metas) || metas.length > 6) {
    throw new Error("Lista de metas inválida.");
  }

  dashboardData.metas = metas.map((meta, index) => ({
    id: meta.id || `m${Date.now()}${index}`,
    nome: String(meta.nome || "").trim(),
    atual: Number(meta.atual),
    objetivo: Number(meta.objetivo),
    tipo: meta.tipo === "moeda" ? "moeda" : "numero"
  }));

  return JSON.parse(JSON.stringify(dashboardData.metas));
}

module.exports = {
  obterDashboard,
  atualizarMetas
};
