import "./dashboard.css";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import {
  buscarDashboard,
  salvarMetas as salvarMetasAPI,
} from "../../services/dashboardService";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API_ESTOQUE = `${API_URL}/estoque`;
const API_ALERTAS = `${API_URL}/alertas`;

const metasPadrao = [
  { id: "m1", titulo: "Meta de faturamento", tipo: "moeda", atual: 91000, meta: 100000 },
  { id: "m2", titulo: "Pedidos do mês", tipo: "numero", atual: 142, meta: 160 },
  { id: "m3", titulo: "Novos clientes B2B", tipo: "numero", atual: 7, meta: 10 },
];

const LIMITE_DE_METAS = 6;

function normalizarAlertaDashboard(alerta) {
  const prioridade = String(alerta?.prioridade || alerta?.nivel || "media").toLowerCase();
  const nivel =
    prioridade === "alta" || prioridade === "urgente" || prioridade === "critico"
      ? "alta"
      : "media";

  return {
    id: alerta?.id,
    tipo: alerta?.categoria || alerta?.tipo || "Alerta",
    mensagem: alerta?.titulo || alerta?.descricao || alerta?.mensagem || "",
    descricao: alerta?.descricao || "",
    nivel,
  };
}

function parseDataValidade(valor) {
  if (!valor) return null;
  const texto = String(valor).trim().split("T")[0];

  // Formato DD/MM/AAAA
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(texto)) {
    const [dia, mes, ano] = texto.split("/").map(Number);
    const data = new Date(ano, mes - 1, dia);
    data.setHours(0, 0, 0, 0);
    return Number.isNaN(data.getTime()) ? null : data;
  }

  // Formato AAAA-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(texto)) {
    const [ano, mes, dia] = texto.split("-").map(Number);
    const data = new Date(ano, mes - 1, dia);
    data.setHours(0, 0, 0, 0);
    return Number.isNaN(data.getTime()) ? null : data;
  }

  const fallback = new Date(texto);
  if (Number.isNaN(fallback.getTime())) return null;
  fallback.setHours(0, 0, 0, 0);
  return fallback;
}

function mapearInsumosParaLotes(listaInsumos) {
  if (!Array.isArray(listaInsumos) || listaInsumos.length === 0) return [];

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  return listaInsumos
    .map((insumo) => {
      const dataVal = parseDataValidade(insumo.validade);
      if (!dataVal) return null;

      const diffMs = dataVal.getTime() - hoje.getTime();
      const diasRestantes = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      let textoVence = "";
      let badgeClass = "badgeSucesso";

      if (diasRestantes < 0) {
        const diasAtras = Math.abs(diasRestantes);
        textoVence = diasAtras === 1 ? "Venceu ontem" : `Vencido (${diasAtras}d)`;
        badgeClass = "badgeUrgente";
      } else if (diasRestantes === 0) {
        textoVence = "Vence hoje";
        badgeClass = "badgeUrgente";
      } else if (diasRestantes === 1) {
        textoVence = "1 dia";
        badgeClass = "badgeUrgente";
      } else {
        textoVence = `${diasRestantes} dias`;
        if (diasRestantes <= 7) {
          badgeClass = "badgeUrgente";
        } else if (diasRestantes <= 15) {
          badgeClass = "badgeAtencao";
        } else {
          badgeClass = "badgeSucesso";
        }
      }

      const codigoBruto = String(insumo.lote || "").trim();
      const codigoFormatado = codigoBruto
        ? codigoBruto.startsWith("#")
          ? codigoBruto
          : `#${codigoBruto}`
        : "—";

      const qtdNumero = Number(insumo.quantidade ?? 0);
      const unidade = insumo.unidade ? ` ${insumo.unidade}` : " un";

      return {
        id: insumo.id,
        codigo: codigoFormatado,
        produto: insumo.nome || "Insumo sem nome",
        qtd: `${qtdNumero.toLocaleString("pt-BR")}${unidade}`,
        vence: textoVence,
        badgeClass,
        diasRestantes,
        validadeFormatada: dataVal.toLocaleDateString("pt-BR"),
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.diasRestantes - b.diasRestantes);
}

function formatarMoeda(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

function formatarValor(valor, tipo) {
  const n = Number(valor) || 0;

  if (tipo === "moeda") {
    if (Math.abs(n) >= 1000) {
      return `R$ ${(n / 1000).toLocaleString("pt-BR", {
        maximumFractionDigits: 1,
      })}k`;
    }

    return `R$ ${n.toLocaleString("pt-BR")}`;
  }

  return n.toLocaleString("pt-BR");
}

function calcularPorcentagem(atual, meta) {
  const a = Number(atual);
  const m = Number(meta);

  if (!Number.isFinite(a) || !Number.isFinite(m) || m <= 0) return 0;

  return Math.round((a / m) * 100);
}

function criarId() {
  return "m" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function paraRascunho(m) {
  return {
    id: m.id,
    titulo: m.titulo,
    tipo: m.tipo,
    atual: String(m.atual),
    meta: String(m.meta),
  };
}

function obterDataLocal(dataString) {
  const [ano, mes, dia] = dataString.split("-").map(Number);
  return new Date(ano, mes - 1, dia);
}

function formatarDataLocal(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}

function obterIntervalo(periodo, inicioPersonalizado = "", fimPersonalizado = "") {
  if (periodo === "personalizado") {
    const inicio = obterDataLocal(inicioPersonalizado);
    const fim = obterDataLocal(fimPersonalizado);

    inicio.setHours(0, 0, 0, 0);
    fim.setHours(23, 59, 59, 999);

    const dias = Math.max(
      1,
      Math.ceil((fim - inicio) / 86400000) + 1
    );

    const fimAnterior = new Date(inicio);
    fimAnterior.setDate(fimAnterior.getDate() - 1);
    fimAnterior.setHours(23, 59, 59, 999);

    const inicioAnterior = new Date(fimAnterior);
    inicioAnterior.setDate(inicioAnterior.getDate() - dias + 1);
    inicioAnterior.setHours(0, 0, 0, 0);

    return {
      inicio,
      fim,
      inicioAnterior,
      fimAnterior,
    };
  }

  const dias =
    periodo === "7d" ? 7 :
    periodo === "30d" ? 30 :
    periodo === "90d" ? 90 : 365;

  const hoje = new Date();
  hoje.setHours(23, 59, 59, 999);

  const inicio = new Date(hoje);
  inicio.setHours(0, 0, 0, 0);
  inicio.setDate(inicio.getDate() - dias + 1);

  const fimAnterior = new Date(inicio);
  fimAnterior.setDate(fimAnterior.getDate() - 1);
  fimAnterior.setHours(23, 59, 59, 999);

  const inicioAnterior = new Date(fimAnterior);
  inicioAnterior.setDate(inicioAnterior.getDate() - dias + 1);
  inicioAnterior.setHours(0, 0, 0, 0);

  return {
    inicio,
    fim: hoje,
    inicioAnterior,
    fimAnterior,
  };
}

function filtrarPeriodo(
  historico,
  periodo,
  anterior = false,
  inicioPersonalizado = "",
  fimPersonalizado = ""
) {
  const intervalo = obterIntervalo(
    periodo,
    inicioPersonalizado,
    fimPersonalizado
  );

  const inicio = anterior
    ? intervalo.inicioAnterior
    : intervalo.inicio;

  const fim = anterior
    ? intervalo.fimAnterior
    : intervalo.fim;

  return (historico || []).filter((item) => {
    if (!item.data) return false;

    const data = obterDataLocal(item.data);

    return data >= inicio && data <= fim;
  });
}

function agruparHistorico(historico, periodo, campos) {
  const grupos = {};

  (historico || []).forEach((item) => {
    const data = obterDataLocal(item.data);
    const ano = data.getFullYear();
    const mes = data.getMonth() + 1;
    const dia = data.getDate();

    let chave;
    let rotulo;

    if (periodo === "7d") {
      chave = item.data;
      rotulo = `${dia}/${mes}`;
    } else if (periodo === "1a") {
      chave = `${ano}-${String(mes).padStart(2, "0")}`;
      rotulo = data.toLocaleDateString("pt-BR", { month: "short" });
    } else {
      const inicioSemana = new Date(data);
      inicioSemana.setDate(data.getDate() - data.getDay());

      chave = formatarDataLocal(inicioSemana);
      rotulo = `${inicioSemana.getDate()}/${inicioSemana.getMonth() + 1}`;
    }

    if (!grupos[chave]) {
      grupos[chave] = { mes: rotulo };

      campos.forEach((campo) => {
        grupos[chave][campo] = 0;
      });
    }

    campos.forEach((campo) => {
      grupos[chave][campo] += Number(item[campo]) || 0;
    });
  });

  return Object.values(grupos);
}

function calcularVariacao(atual, anterior, inverter = false) {
  if (!anterior) {
    return { texto: "—", status: "neutro" };
  }

  const variacao = ((atual - anterior) / Math.abs(anterior)) * 100;
  const sinal = variacao > 0 ? "+" : "";

  const favoravel = inverter ? variacao <= 0 : variacao >= 0;

  return {
    texto: `${sinal}${variacao.toFixed(1).replace(".", ",")}%`,
    status: favoravel ? "positivo" : "negativo",
  };
}

function somar(historico, campo) {
  return (historico || []).reduce(
    (total, item) => total + (Number(item[campo]) || 0),
    0
  );
}

function calcularMedia(historico, campo) {
  if (!historico?.length) return 0;

  return historico.reduce(
    (total, item) => total + (Number(item[campo]) || 0),
    0
  ) / historico.length;
}

function calcularResumoFinanceiro(atual, anterior) {
  const receita = somar(atual, "receita");
  const perdas = somar(atual, "perdas");
  const lucro = somar(atual, "lucro");
  const valorEmAberto = somar(atual, "valorEmAberto");

  const receitaAnterior = somar(anterior, "receita");
  const perdasAnterior = somar(anterior, "perdas");
  const lucroAnterior = somar(anterior, "lucro");
  const abertoAnterior = somar(anterior, "valorEmAberto");

  const inadimplencia = receita > 0
    ? (valorEmAberto / receita) * 100
    : 0;

  const inadimplenciaAnterior = receitaAnterior > 0
    ? (abertoAnterior / receitaAnterior) * 100
    : 0;

  return [
    {
      titulo: "Lucro estimado",
      valor: formatarMoeda(lucro),
      variacao: calcularVariacao(lucro, lucroAnterior),
      icone: "R$",
    },
    {
      titulo: "Perdas em R$",
      valor: formatarMoeda(perdas),
      variacao: calcularVariacao(perdas, perdasAnterior, true),
      icone: "↓",
    },
    {
      titulo: "Faturamento",
      valor: formatarMoeda(receita),
      variacao: calcularVariacao(receita, receitaAnterior),
      icone: "R$",
    },
    {
      titulo: "Inadimplência",
      valor: `${inadimplencia.toFixed(1).replace(".", ",")}%`,
      variacao: calcularVariacao(
        inadimplencia,
        inadimplenciaAnterior,
        true
      ),
      icone: "%",
    },
  ];
}

function calcularProducao(historico) {
  if (!historico?.length) {
    return {
      oee: 0,
      disponibilidade: 0,
      desempenho: 0,
      qualidade: 0,
      quantidade: 0,
    };
  }

  return {
    oee: Math.round(calcularMedia(historico, "oee")),
    disponibilidade: Math.round(calcularMedia(historico, "disponibilidade")),
    desempenho: Math.round(calcularMedia(historico, "desempenho")),
    qualidade: Math.round(calcularMedia(historico, "qualidade")),
    quantidade: somar(historico, "quantidade"),
  };
}

function calcularVolumePorPeriodo(historicoProducao, periodo) {
  const agrupado = agruparHistorico(historicoProducao, periodo, ["quantidade"]);
  const serie = agrupado.map((item) => ({
    label: item.mes,
    valor: Number(item.quantidade) || 0,
  }));

  const total = serie.reduce((acc, item) => acc + item.valor, 0);
  const media = serie.length > 0 ? Math.round(total / serie.length) : 0;
  const pico = serie.length > 0
    ? serie.reduce((maior, atual) => (atual.valor > maior.valor ? atual : maior), serie[0])
    : null;
  const maxValor = Math.max(1, ...serie.map((item) => item.valor));

  return {
    serie,
    total,
    media,
    pico,
    maxValor,
  };
}

function calcularReceitaPorCategoria(historicoProducao, historicoComercial) {
  const categorias = [
    { chave: "bolos", nome: "Bolos", cor: "#8E1027", termos: ["bolo"] },
    { chave: "tortas", nome: "Tortas", cor: "#B3213B", termos: ["torta"] },
    {
      chave: "docesFinos",
      nome: "Doces finos",
      cor: "#D96B7E",
      termos: ["doce", "brigadeiro", "trufa", "macaron", "camafeu"],
    },
    { chave: "cupcakes", nome: "Cupcakes", cor: "#E89CA9", termos: ["cupcake"] },
  ];

  const totais = {
    bolos: 0,
    tortas: 0,
    docesFinos: 0,
    cupcakes: 0,
  };

  let encontrouFaturamentoComercial = false;

  (historicoComercial || []).forEach((dia) => {
    (dia.vendasProdutos || []).forEach((item) => {
      const fat = Number(item.faturamento) || 0;
      if (fat <= 0) return;

      const nomeProd = String(item.produto || "").toLowerCase();
      const cat =
        categorias.find((c) => c.termos.some((t) => nomeProd.includes(t))) ||
        categorias[2];

      totais[cat.chave] += fat;
      encontrouFaturamentoComercial = true;
    });
  });

  if (!encontrouFaturamentoComercial) {
    (historicoProducao || []).forEach((item) => {
      categorias.forEach((cat) => {
        totais[cat.chave] += Number(item.mix?.[cat.chave]) || 0;
      });
    });
  }

  const totalGeral = Object.values(totais).reduce((acc, v) => acc + v, 0);
  const maiorValor = Math.max(1, ...Object.values(totais));

  return {
    ehMoeda: encontrouFaturamentoComercial,
    itens: categorias
      .map((cat) => {
        const valor = totais[cat.chave];
        return {
          nome: cat.nome,
          cor: cat.cor,
          valor,
          percentualTotal: totalGeral > 0 ? Math.round((valor / totalGeral) * 100) : 0,
          larguraBarra: Math.round((valor / maiorValor) * 100),
        };
      })
      .sort((a, b) => b.valor - a.valor),
  };
}

function calcularTopProdutos(historico) {
  const produtos = {};

  (historico || []).forEach((dia) => {
    (dia.vendasProdutos || []).forEach((item) => {
      if (!produtos[item.produto]) {
        produtos[item.produto] = {
          nome: item.produto,
          quantidade: 0,
          faturamento: 0,
        };
      }

      produtos[item.produto].quantidade += Number(item.quantidade) || 0;
      produtos[item.produto].faturamento += Number(item.faturamento) || 0;
    });
  });

  const lista = Object.values(produtos)
    .sort((a, b) => b.quantidade - a.quantidade)
    .slice(0, 5);

  const maior = Math.max(1, ...lista.map((item) => item.quantidade));

  return lista.map((item) => ({
    ...item,
    percentual: Math.round((item.quantidade / maior) * 100),
  }));
}

function calcularTopClientes(historico, clientesOriginais) {
  const clientes = {};

  (historico || []).forEach((dia) => {
    (dia.vendasClientes || []).forEach((item) => {
      if (!clientes[item.cliente]) {
        clientes[item.cliente] = {
          nome: item.cliente,
          pedidos: 0,
          faturamento: 0,
        };
      }

      clientes[item.cliente].pedidos += Number(item.pedidos) || 0;
      clientes[item.cliente].faturamento += Number(item.faturamento) || 0;
    });
  });

  const lista = Object.values(clientes)
    .sort((a, b) => b.faturamento - a.faturamento)
    .slice(0, 5);

  return lista.map((cliente) => {
    const original = (clientesOriginais || []).find(
      (item) => item.nome === cliente.nome
    );

    return {
      ...cliente,
      ltv: formatarMoeda(cliente.faturamento),
      status: original?.status || "Ativo",
    };
  });
}

function calcularIndicadores(financeiro, comercial, producao) {
  const receita = somar(financeiro, "receita");
  const lucro = somar(financeiro, "lucro");
  const perdas = somar(financeiro, "perdas");

  const pedidos = (comercial || []).reduce((total, dia) => {
    return total + (dia.vendasClientes || []).reduce(
      (soma, item) => soma + (Number(item.pedidos) || 0),
      0
    );
  }, 0);

  const margem = receita > 0 ? (lucro / receita) * 100 : 0;
  const percentualPerdas = receita > 0 ? (perdas / receita) * 100 : 0;
  const ticketMedio = pedidos > 0 ? receita / pedidos : 0;

  return [
    { titulo: "Margem média", valor: `${margem.toFixed(1).replace(".", ",")}%` },
    { titulo: "Ticket médio B2B", valor: formatarMoeda(ticketMedio) },
    { titulo: "Perdas de produção", valor: `${percentualPerdas.toFixed(1).replace(".", ",")}%` },
    { titulo: "Prazo médio entrega", valor: "2,4 dias" },
    { titulo: "Produção do período", valor: `${producao.quantidade.toLocaleString("pt-BR")} un.` },
  ];
}

function ModalDetalhesCard({ cardKey, onFechar, dados }) {
  const [saindo, setSaindo] = useState(false);
  const janelaRef = useRef(null);
  const botaoXRef = useRef(null);
  const timerRef = useRef(null);
  const fecharRef = useRef(null);

  function fechar() {
    if (saindo) return;
    setSaindo(true);
    timerRef.current = setTimeout(onFechar, 160);
  }

  useEffect(() => {
    fecharRef.current = fechar;
  });

  useEffect(() => {
    botaoXRef.current?.focus();

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function aoPressionarEsc(e) {
      if (e.key === "Escape") fecharRef.current?.();
    }

    document.addEventListener("keydown", aoPressionarEsc);

    return () => {
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener("keydown", aoPressionarEsc);
      clearTimeout(timerRef.current);
    };
  }, []);

  function aoPressionarTab(e) {
    if (e.key !== "Tab" || !janelaRef.current) return;

    const focaveis = janelaRef.current.querySelectorAll(
      'button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (!focaveis.length) return;

    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];

    if (e.shiftKey && document.activeElement === primeiro) {
      e.preventDefault();
      ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault();
      primeiro.focus();
    }
  }

  const configuracoes = {
    topProdutos: {
      titulo: "Top 5 produtos vendidos",
      subtitulo: "Volume de vendas no período selecionado.",
    },
    alertasEstoque: {
      titulo: "Alertas de estoque & validade",
      subtitulo: "Alertas ativos de cobertura, validade e compra.",
    },
    lotesVencimento: {
      titulo: "Controle de lotes próximos ao vencimento",
      subtitulo: "Lotes do estoque ordenados por data de validade (PEPS).",
    },
    proximasEntregas: {
      titulo: "Próximas entregas",
      subtitulo: "Pedidos agendados e prioridades de entrega.",
    },
    topClientesB2B: {
      titulo: "Top clientes B2B",
      subtitulo: "Faturamento e pedidos no período selecionado.",
    },
    alertasCriticos: {
      titulo: "Alertas críticos",
      subtitulo: "Alertas registrados na operação.",
    },
    fornecedoresAtraso: {
      titulo: "Fornecedores em atraso",
      subtitulo: "Atrasos, avaliações e últimas entregas.",
    },
  };

  const info = configuracoes[cardKey] || {
    titulo: "Detalhes",
    subtitulo: "",
  };

  return (
    <div
      className={`gmOverlay ${saindo ? "saindo" : ""}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) fechar();
      }}
    >
      <div
        ref={janelaRef}
        className="gmJanela"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gmDetalhesTitulo"
        onKeyDown={aoPressionarTab}
      >
        <div className="gmCabecalho">
          <div>
            <h2 id="gmDetalhesTitulo" className="gmTitulo">{info.titulo}</h2>
            <p className="gmSubtitulo">{info.subtitulo}</p>
          </div>

          <button
            ref={botaoXRef}
            type="button"
            className="gmBotaoX"
            onClick={fechar}
            aria-label="Fechar"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="gmCorpo">
          {cardKey === "topProdutos" && (
            <div className="listaProdutosDashboard" style={{ marginTop: 4 }}>
              {dados.produtos.map((produto, i) => (
                <div className="produtoDashboard" key={produto.nome}>
                  <div className="produtoNome">
                    <span>#{i + 1} · {produto.nome}</span>
                    <strong>{produto.quantidade.toLocaleString("pt-BR")} un.</strong>
                  </div>
                  <div className="barraProduto">
                    <div style={{ width: `${produto.percentual}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cardKey === "alertasEstoque" && (
            <>
              <div className="listaAlertas">
                {dados.alertas.slice(0, 2).map((alerta, i) => (
                  <div className="alertaDashboard" key={alerta.id || i}>
                    <span className={`pontoAlerta ${alerta.nivel}`}></span>
                    <div>
                      <small>{alerta.tipo}</small>
                      <p>{alerta.mensagem}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="sugestaoDashboard">
                <b>Sugestão:</b> Comprar 40kg de chocolate ao leite e 15kg de manteiga
                nos próximos 3 dias.
              </div>
            </>
          )}

          {cardKey === "lotesVencimento" && (
            <div className="tabelaDashboard">
              <div className="linhaTabela cabecalhoTabela">
                <span>Lote</span><span>Produto</span><span>Qtd</span><span>Vence</span>
              </div>
              {dados.lotes.length === 0 ? (
                <p style={{ padding: "12px 0", color: "#7A6E6C" }}>
                  Nenhum insumo com validade cadastrada no estoque.
                </p>
              ) : (
                dados.lotes.map((lote, i) => (
                  <div className="linhaTabela" key={lote.id || i} title={lote.validadeFormatada ? `Validade: ${lote.validadeFormatada}` : undefined}>
                    <span>{lote.codigo}</span>
                    <span>{lote.produto}</span>
                    <span>{lote.qtd}</span>
                    <b className={lote.badgeClass}>{lote.vence}</b>
                  </div>
                ))
              )}
            </div>
          )}

          {cardKey === "proximasEntregas" && (
            <div className="listaEntregas">
              {dados.entregas.map((entrega, i) => (
                <div className="entregaDashboard" key={i}>
                  <div>
                    <strong>{entrega.cliente}</strong>
                    <span>{entrega.produto}</span>
                  </div>
                  <div className="horarioEntrega">
                    <strong>{entrega.quando}</strong>
                    {entrega.urgente && <span className="badgeUrgente">Urgente</span>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {cardKey === "topClientesB2B" && (
            <div className="tabelaDashboard">
              <div className="linhaTabela cabecalhoTabela">
                <span>Cliente</span><span>Pedidos</span><span>Faturamento</span><span>Status</span>
              </div>
              {dados.clientes.map((cliente, i) => (
                <div className="linhaTabela" key={i}>
                  <strong>{cliente.nome}</strong>
                  <span>{cliente.pedidos}</span>
                  <span>{cliente.ltv}</span>
                  <b className={`statusCliente ${cliente.status.toLowerCase().replace("ã", "a")}`}>
                    {cliente.status}
                  </b>
                </div>
              ))}
            </div>
          )}

          {cardKey === "alertasCriticos" && (
            <div className="listaAlertas">
              {dados.alertas.map((alerta, i) => (
                <div className="alertaDashboard" key={alerta.id || i}>
                  <span className={`pontoAlerta ${alerta.nivel}`}></span>
                  <div>
                    <small>{alerta.tipo}</small>
                    <p>{alerta.mensagem}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cardKey === "fornecedoresAtraso" && (
            <>
              <div className="tabelaDashboard">
                <div className="linhaTabela cabecalhoTabela">
                  <span>Fornecedor</span><span>Atraso</span><span>Nota</span><span>Última entrega</span>
                </div>
                {dados.fornecedores.map((fornecedor, i) => (
                  <div className="linhaTabela" key={i}>
                    <strong>{fornecedor.nome}</strong>
                    <b className="badgeUrgente">{fornecedor.atraso}</b>
                    <b className="notaFornecedor">{fornecedor.nota}</b>
                    <span>{fornecedor.ultima}</span>
                  </div>
                ))}
              </div>
              <div className="recomendacaoDashboard">
                <b>Recomendação:</b> Avalie substituir Embalagens Rápido — nota 2,5 e
                8 dias de atraso médio nos últimos 3 meses.
              </div>
            </>
          )}
        </div>

        <div className="gmRodape">
          <div></div>
          <div className="gmAcoes">
            <button type="button" className="gmBotaoPrimario" onClick={fechar}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalGerenciarMetas({ metas, onSalvar, onFechar }) {
  const [rascunho, setRascunho] = useState(() => metas.map(paraRascunho));
  const [erros, setErros] = useState({});
  const [saindo, setSaindo] = useState(false);

  const janelaRef = useRef(null);
  const botaoXRef = useRef(null);
  const timerRef = useRef(null);
  const fecharRef = useRef(null);

  function fechar() {
    if (saindo) return;
    setSaindo(true);
    timerRef.current = setTimeout(onFechar, 160);
  }

  useEffect(() => {
    fecharRef.current = fechar;
  });

  useEffect(() => {
    const primeiroCampo = janelaRef.current?.querySelector("input");
    (primeiroCampo || botaoXRef.current)?.focus();

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function aoPressionarEsc(e) {
      if (e.key === "Escape") fecharRef.current?.();
    }

    document.addEventListener("keydown", aoPressionarEsc);

    return () => {
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener("keydown", aoPressionarEsc);
      clearTimeout(timerRef.current);
    };
  }, []);

  function aoPressionarTab(e) {
    if (e.key !== "Tab" || !janelaRef.current) return;

    const focaveis = janelaRef.current.querySelectorAll(
      'button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (!focaveis.length) return;

    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];

    if (e.shiftKey && document.activeElement === primeiro) {
      e.preventDefault();
      ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault();
      primeiro.focus();
    }
  }

  function atualizarCampo(id, campo, valor) {
    setRascunho((atual) =>
      atual.map((m) => m.id === id ? { ...m, [campo]: valor } : m)
    );

    setErros((atual) => {
      if (!atual[id]?.[campo]) return atual;

      const copia = { ...atual, [id]: { ...atual[id] } };
      delete copia[id][campo];
      return copia;
    });
  }

  function adicionarMeta() {
    if (rascunho.length >= LIMITE_DE_METAS) return;

    const novoId = criarId();

    setRascunho((atual) => [
      ...atual,
      { id: novoId, titulo: "", tipo: "numero", atual: "0", meta: "" },
    ]);

    setTimeout(() => {
      const cartao = janelaRef.current?.querySelector(`[data-meta-id="${novoId}"]`);
      cartao?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      cartao?.querySelector("input")?.focus();
    }, 30);
  }

  function removerMeta(id) {
    setRascunho((atual) => atual.filter((m) => m.id !== id));

    setErros((atual) => {
      const copia = { ...atual };
      delete copia[id];
      return copia;
    });
  }

  function restaurarPadrao() {
    setRascunho(metasPadrao.map(paraRascunho));
    setErros({});
  }

  async function salvar(e) {
    e.preventDefault();

    const novosErros = {};

    rascunho.forEach((m) => {
      const erro = {};

      if (!m.titulo.trim()) erro.titulo = "Dê um nome para a meta.";

      const meta = Number(m.meta);
      if (m.meta === "" || !Number.isFinite(meta) || meta <= 0) {
        erro.meta = "Informe uma meta maior que zero.";
      }

      const atual = Number(m.atual);
      if (m.atual === "" || !Number.isFinite(atual) || atual < 0) {
        erro.atual = "Informe um valor de 0 ou mais.";
      }

      if (Object.keys(erro).length) novosErros[m.id] = erro;
    });

    if (Object.keys(novosErros).length) {
      setErros(novosErros);

      setTimeout(() => {
        janelaRef.current?.querySelector('[aria-invalid="true"]')?.focus();
      }, 0);

      return;
    }

    try {
      await onSalvar(
        rascunho.map((m) => ({
          id: m.id,
          titulo: m.titulo.trim(),
          tipo: m.tipo,
          atual: Number(m.atual),
          meta: Number(m.meta),
        }))
      );

      fechar();
    } catch (error) {
      setErros({ geral: error.message || "Não foi possível salvar as metas." });
    }
  }

  return (
    <div
      className={`gmOverlay ${saindo ? "saindo" : ""}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) fechar();
      }}
    >
      <div
        ref={janelaRef}
        className="gmJanela"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gmTitulo"
        onKeyDown={aoPressionarTab}
      >
        <div className="gmCabecalho">
          <div>
            <h2 id="gmTitulo" className="gmTitulo">Gerenciar metas</h2>
            <p className="gmSubtitulo">
              Personalize as metas do mês que aparecem no Dashboard.
            </p>
          </div>

          <button
            ref={botaoXRef}
            type="button"
            className="gmBotaoX"
            onClick={fechar}
            aria-label="Fechar"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <form className="gmForm" onSubmit={salvar} noValidate>
          <div className="gmCorpo">
            {rascunho.length === 0 && (
              <p className="gmVazio">
                Nenhuma meta definida. Clique em "Adicionar meta" para criar a primeira.
              </p>
            )}

            {erros.geral && <p className="gmErro" role="alert">{erros.geral}</p>}

            {rascunho.map((m, indice) => {
              const erro = erros[m.id] || {};
              const pct = calcularPorcentagem(m.atual, m.meta);
              const comPrefixo = m.tipo === "moeda";

              return (
                <div key={m.id} className="gmMeta" data-meta-id={m.id}>
                  <div className="gmMetaTopo">
                    <div className="gmCampo gmCampoNome">
                      <label className="gmRotulo" htmlFor={`gm-titulo-${m.id}`}>
                        Meta {indice + 1}
                      </label>
                      <input
                        id={`gm-titulo-${m.id}`}
                        className="gmInput"
                        type="text"
                        maxLength={50}
                        placeholder="Ex.: Meta de faturamento"
                        value={m.titulo}
                        aria-invalid={erro.titulo ? "true" : "false"}
                        onChange={(e) => atualizarCampo(m.id, "titulo", e.target.value)}
                      />
                      {erro.titulo && <p className="gmErro">{erro.titulo}</p>}
                    </div>

                    <button
                      type="button"
                      className="gmRemover"
                      onClick={() => removerMeta(m.id)}
                      aria-label={`Remover meta ${m.titulo || indice + 1}`}
                      title="Remover meta"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>

                  <div className="gmCampos">
                    <div className="gmCampo">
                      <label className="gmRotulo" htmlFor={`gm-tipo-${m.id}`}>Tipo</label>
                      <select
                        id={`gm-tipo-${m.id}`}
                        className="gmSelect"
                        value={m.tipo}
                        onChange={(e) => atualizarCampo(m.id, "tipo", e.target.value)}
                      >
                        <option value="moeda">Valor em R$</option>
                        <option value="numero">Quantidade</option>
                      </select>
                    </div>

                    <div className="gmCampo">
                      <label className="gmRotulo" htmlFor={`gm-atual-${m.id}`}>Valor atual</label>
                      <div className={`gmInputWrap ${comPrefixo ? "comPrefixo" : ""}`}>
                        {comPrefixo && <span className="gmPrefixo">R$</span>}
                        <input
                          id={`gm-atual-${m.id}`}
                          className="gmInput"
                          type="number"
                          min="0"
                          step="any"
                          value={m.atual}
                          aria-invalid={erro.atual ? "true" : "false"}
                          onChange={(e) => atualizarCampo(m.id, "atual", e.target.value)}
                        />
                      </div>
                      {erro.atual && <p className="gmErro">{erro.atual}</p>}
                    </div>

                    <div className="gmCampo">
                      <label className="gmRotulo" htmlFor={`gm-meta-${m.id}`}>Meta</label>
                      <div className={`gmInputWrap ${comPrefixo ? "comPrefixo" : ""}`}>
                        {comPrefixo && <span className="gmPrefixo">R$</span>}
                        <input
                          id={`gm-meta-${m.id}`}
                          className="gmInput"
                          type="number"
                          min="0"
                          step="any"
                          placeholder="0"
                          value={m.meta}
                          aria-invalid={erro.meta ? "true" : "false"}
                          onChange={(e) => atualizarCampo(m.id, "meta", e.target.value)}
                        />
                      </div>
                      {erro.meta && <p className="gmErro">{erro.meta}</p>}
                    </div>
                  </div>

                  <div className="gmPreview">
                    <div className="gmPreviewBarra">
                      <div style={{ width: `${Math.min(pct, 100)}%` }}></div>
                    </div>
                    <span className="gmPreviewPct">{pct}%</span>
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              className="gmAdicionar"
              onClick={adicionarMeta}
              disabled={rascunho.length >= LIMITE_DE_METAS}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
              Adicionar meta
            </button>

            {rascunho.length >= LIMITE_DE_METAS && (
              <p className="gmDica">Você pode ter até {LIMITE_DE_METAS} metas.</p>
            )}
          </div>

          <div className="gmRodape">
            <button type="button" className="gmBotaoRestaurar" onClick={restaurarPadrao}>
              Restaurar padrão
            </button>

            <div className="gmAcoes">
              <button type="button" className="gmBotaoSecundario" onClick={fechar}>
                Cancelar
              </button>
              <button type="submit" className="gmBotaoPrimario">
                Salvar alterações
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function ModalPeriodo({
  dataInicio,
  dataFim,
  setDataInicio,
  setDataFim,
  erro,
  onAplicar,
  onFechar,
}) {
  const janelaRef = useRef(null);

  useEffect(() => {
    janelaRef.current?.querySelector("input")?.focus();

    function aoPressionarEsc(e) {
      if (e.key === "Escape") onFechar();
    }

    document.addEventListener("keydown", aoPressionarEsc);

    return () => {
      document.removeEventListener("keydown", aoPressionarEsc);
    };
  }, [onFechar]);

  return (
    <div
      className="gmOverlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onFechar();
      }}
    >
      <div
        ref={janelaRef}
        className="gmJanela"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tituloModalPeriodo"
      >
        <div className="gmCabecalho">
          <div>
            <h2 id="tituloModalPeriodo" className="gmTitulo">
              Selecionar período
            </h2>
            <p className="gmSubtitulo">
              Escolha o intervalo que deseja analisar no Dashboard.
            </p>
          </div>

          <button
            type="button"
            className="gmBotaoX"
            onClick={onFechar}
            aria-label="Fechar"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="gmCorpo">
          <div className="gmCampos">
            <div className="gmCampo">
              <label className="gmRotulo" htmlFor="periodoInicio">
                Data inicial
              </label>
              <input
                id="periodoInicio"
                className="gmInput"
                type="date"
                value={dataInicio}
                max={dataFim || undefined}
                onChange={(e) => setDataInicio(e.target.value)}
              />
            </div>

            <div className="gmCampo">
              <label className="gmRotulo" htmlFor="periodoFim">
                Data final
              </label>
              <input
                id="periodoFim"
                className="gmInput"
                type="date"
                value={dataFim}
                min={dataInicio || undefined}
                onChange={(e) => setDataFim(e.target.value)}
              />
            </div>
          </div>

          {erro && (
            <p className="gmErro" role="alert" style={{ marginTop: 12 }}>
              {erro}
            </p>
          )}
        </div>

        <div className="gmRodape">
          <div></div>
          <div className="gmAcoes">
            <button
              type="button"
              className="gmBotaoSecundario"
              onClick={onFechar}
            >
              Cancelar
            </button>

            <button
              type="button"
              className="gmBotaoPrimario"
              onClick={onAplicar}
            >
              Aplicar período
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const [periodoPersonalizado, setPeriodoPersonalizado] = useState(false);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [erroPeriodo, setErroPeriodo] = useState("");

  const [metas, setMetas] = useState(metasPadrao);
  const [dadosDashboard, setDadosDashboard] = useState(null);
  const [insumosEstoque, setInsumosEstoque] = useState([]);
  const [alertasAPI, setAlertasAPI] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroDashboard, setErroDashboard] = useState("");
  const [periodoSelecionado, setPeriodoSelecionado] = useState("30d");
  const [modalMetasAberto, setModalMetasAberto] = useState(false);
  const [modalCardAtivo, setModalCardAtivo] = useState(null);
  const [avisoMetas, setAvisoMetas] = useState(false);

  const botaoGerenciarRef = useRef(null);
  const avisoTimerRef = useRef(null);

  const buscarInsumosEstoque = async () => {
    try {
      const resposta = await fetch(API_ESTOQUE);
      if (!resposta.ok) return;
      const json = await resposta.json();
      const lista = Array.isArray(json?.data)
        ? json.data
        : Array.isArray(json)
          ? json
          : [];
      setInsumosEstoque(lista);
    } catch (err) {
      console.warn("Não foi possível buscar insumos do estoque:", err);
    }
  };

  const buscarAlertasAPI = async () => {
    try {
      const resposta = await fetch(API_ALERTAS, {
        headers: { Accept: "application/json" },
      });
      if (!resposta.ok) return;
      const json = await resposta.json();
      const lista = Array.isArray(json?.data)
        ? json.data
        : Array.isArray(json)
          ? json
          : [];
      setAlertasAPI(lista.map(normalizarAlertaDashboard));
    } catch (err) {
      console.warn("Não foi possível buscar alertas da API:", err);
    }
  };

  useEffect(() => {
    let ativo = true;

    async function carregarDashboard() {
      try {
        setCarregando(true);
        setErroDashboard("");

        const [dados] = await Promise.all([
          buscarDashboard(),
          buscarInsumosEstoque(),
          buscarAlertasAPI(),
        ]);

        if (!ativo) return;

        setDadosDashboard(dados);

        setMetas((dados.metas || []).map((meta) => ({
          id: meta.id,
          titulo: meta.nome,
          tipo: meta.tipo === "moeda" ? "moeda" : "numero",
          atual: Number(meta.atual),
          meta: Number(meta.objetivo),
        })));
      } catch (error) {
        if (ativo) {
          setErroDashboard(error.message || "Não foi possível carregar o Dashboard.");
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarDashboard();

    const aoFocarJanela = () => {
      buscarInsumosEstoque();
      buscarAlertasAPI();
    };
    window.addEventListener("focus", aoFocarJanela);

    return () => {
      ativo = false;
      window.removeEventListener("focus", aoFocarJanela);
    };
  }, []);

  useEffect(() => {
    return () => clearTimeout(avisoTimerRef.current);
  }, []);

  async function salvarMetas(novasMetas) {
    const metasParaAPI = novasMetas.map((meta) => ({
      id: meta.id,
      nome: meta.titulo,
      tipo: meta.tipo,
      atual: meta.atual,
      objetivo: meta.meta,
    }));

    const metasSalvas = await salvarMetasAPI(metasParaAPI);

    const metasFormatadas = metasSalvas.map((meta) => ({
      id: meta.id,
      titulo: meta.nome,
      tipo: meta.tipo === "moeda" ? "moeda" : "numero",
      atual: Number(meta.atual),
      meta: Number(meta.objetivo),
    }));

    setMetas(metasFormatadas);
    setAvisoMetas(true);

    clearTimeout(avisoTimerRef.current);
    avisoTimerRef.current = setTimeout(() => setAvisoMetas(false), 2600);
  }

  function fecharModalMetas() {
    setModalMetasAberto(false);
    botaoGerenciarRef.current?.focus();
  }

  function aplicarPeriodoPersonalizado() {
    setErroPeriodo("");

    if (!dataInicio || !dataFim) {
      setErroPeriodo("Preencha a data inicial e a data final.");
      return;
    }

    if (dataInicio > dataFim) {
      setErroPeriodo("A data inicial não pode ser posterior à data final.");
      return;
    }

    setPeriodoSelecionado("personalizado");
    setPeriodoPersonalizado(false);
  }

  function exportarDashboard() {
    const periodoTexto =
      periodoSelecionado === "personalizado"
        ? `${dataInicio} até ${dataFim}`
        : periodoSelecionado === "7d"
          ? "Últimos 7 dias"
          : periodoSelecionado === "30d"
            ? "Últimos 30 dias"
            : periodoSelecionado === "90d"
              ? "Últimos 90 dias"
              : "Últimos 365 dias";

    const linhas = [
      ["DASHBOARD SUBLIME"],
      ["Período", periodoTexto],
      [
        "Data de exportação",
        formatarDataLocal(new Date()),
      ],
      [],
      ["INDICADORES FINANCEIROS"],
      ["Indicador", "Valor", "Variação"],
      ...kpis.map((item) => [
        item.titulo,
        item.valor,
        item.variacao.texto,
      ]),
      [],
      ["HISTÓRICO FINANCEIRO"],
      ["Data", "Receita", "Custo", "Lucro", "Perdas"],
      ...financeiroPeriodo.map((item) => [
        item.data,
        Number(item.receita) || 0,
        Number(item.custo) || 0,
        Number(item.lucro) || 0,
        Number(item.perdas) || 0,
      ]),
      [],
      ["RECEITA POR CATEGORIA"],
      ["Categoria", "Valor", "Participação"],
      ...receitaCategorias.itens.map((cat) => [
        cat.nome,
        receitaCategorias.ehMoeda ? formatarMoeda(cat.valor) : `${cat.valor} un.`,
        `${cat.percentualTotal}%`,
      ]),
      [],
      ["PRODUÇÃO"],
      ["Indicador", "Valor"],
      ["OEE", `${producao.oee}%`],
      ["Disponibilidade", `${producao.disponibilidade}%`],
      ["Desempenho", `${producao.desempenho}%`],
      ["Qualidade", `${producao.qualidade}%`],
      ["Quantidade produzida", producao.quantidade],
      [],
      ["VOLUME PRODUZIDO POR PERÍODO"],
      ["Período", "Unidades"],
      ...volumeProduzido.serie.map((item) => [
        item.label,
        item.valor,
      ]),
      [],
      ["TOP PRODUTOS"],
      ["Produto", "Quantidade", "Faturamento"],
      ...produtos.map((item) => [
        item.nome,
        item.quantidade,
        Number(item.faturamento) || 0,
      ]),
      [],
      ["CLIENTES B2B"],
      ["Cliente", "Pedidos", "Faturamento", "Status"],
      ...clientes.map((item) => [
        item.nome,
        item.pedidos,
        item.faturamento ?? item.ltv,
        item.status,
      ]),
      [],
      ["INDICADORES OPERACIONAIS"],
      ["Indicador", "Valor"],
      ...indicadores.map((item) => [
        item.titulo,
        item.valor,
      ]),
    ];

    const conteudoCSV = linhas
      .map((linha) =>
        linha
          .map((valor) => {
            const texto = String(valor ?? "").replace(/"/g, '""');
            return `"${texto}"`;
          })
          .join(";")
      )
      .join("\r\n");

    const arquivo = new Blob(
      ["\uFEFF" + conteudoCSV],
      { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(arquivo);
    const link = document.createElement("a");

    link.href = url;
    link.download = `dashboard-sublime-${formatarDataLocal(new Date())}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  const historicoFinanceiro = dadosDashboard?.historicoFinanceiro || [];
  const historicoProducao = dadosDashboard?.historicoProducao || [];
  const historicoComercial = dadosDashboard?.historicoComercial || [];

  const financeiroPeriodo = filtrarPeriodo(
    historicoFinanceiro,
    periodoSelecionado,
    false,
    dataInicio,
    dataFim
  );

  const financeiroAnterior = filtrarPeriodo(
    historicoFinanceiro,
    periodoSelecionado,
    true,
    dataInicio,
    dataFim
  );

  const producaoPeriodo = filtrarPeriodo(
    historicoProducao,
    periodoSelecionado,
    false,
    dataInicio,
    dataFim
  );

  const comercialPeriodo = filtrarPeriodo(
    historicoComercial,
    periodoSelecionado,
    false,
    dataInicio,
    dataFim
  );

  const comercialAnterior = filtrarPeriodo(
    historicoComercial,
    periodoSelecionado,
    true,
    dataInicio,
    dataFim
  );

  const kpis = calcularResumoFinanceiro(financeiroPeriodo, financeiroAnterior);

  // GRÁFICO 1: Faturamento vs. Lucro líquido (escala dinâmica real)
  const faturamentoLucro = agruparHistorico(
    financeiroPeriodo,
    periodoSelecionado,
    ["receita", "lucro"]
  );

  const maiorValorGrafico1 = Math.max(
    1,
    ...faturamentoLucro.map((item) => Math.max(item.receita, item.lucro))
  );

  const tetoEscala = Math.ceil(maiorValorGrafico1 / 1000) * 1000;
  const ticksEscala = [
    tetoEscala,
    Math.round(tetoEscala * 0.75),
    Math.round(tetoEscala * 0.5),
    Math.round(tetoEscala * 0.25),
    0,
  ];

  // GRÁFICO 2: Receita por categoria de produto
  const receitaCategorias = calcularReceitaPorCategoria(
    producaoPeriodo,
    comercialPeriodo
  );

  const producao = calcularProducao(producaoPeriodo);
  const volumeProduzido = calcularVolumePorPeriodo(
    producaoPeriodo,
    periodoSelecionado
  );

  const produtosCalculados = calcularTopProdutos(comercialPeriodo);
  const clientesCalculados = calcularTopClientes(
    comercialPeriodo,
    dadosDashboard?.clientes || []
  );

  const produtos = produtosCalculados.length
    ? produtosCalculados
    : (dadosDashboard?.produtos || []).map((produto) => ({
        ...produto,
        percentual: Math.round((produto.quantidade / 4200) * 100),
      }));

  const clientes = clientesCalculados.length
    ? clientesCalculados
    : dadosDashboard?.clientes || [];

  const resumo = (dadosDashboard?.resumo || []).map((item) => ({
    titulo: item.titulo,
    status: item.valor,
    tipo: item.status,
    icone: item.status === "urgente" ? "×" :
      item.status === "atencao" ? "!" : "✓",
  }));

  const lotesDoEstoque = mapearInsumosParaLotes(insumosEstoque);
  const lotes = lotesDoEstoque.length > 0 ? lotesDoEstoque : (dadosDashboard?.lotes || []);

  const entregas = dadosDashboard?.entregas || [];
  const listaBaseAlertas =
    alertasAPI.length > 0 ? alertasAPI : dadosDashboard?.alertas || [];
  const alertasCriticos = listaBaseAlertas.filter((item) => item.nivel === "alta");
  const alertas = alertasCriticos.length > 0 ? alertasCriticos : listaBaseAlertas;
  const fornecedores = dadosDashboard?.fornecedores || [];

  const indicadores = calcularIndicadores(
    financeiroPeriodo,
    comercialPeriodo,
    producao
  );

  const produtoDestaque = produtos[0] || null;
  const clienteAtual = clientes[0] || null;

  function obterQuantidadeProduto(historico, nomeProduto) {
    return (historico || []).reduce((total, dia) => {
      const produto = (dia.vendasProdutos || []).find(
        (item) => item.produto === nomeProduto
      );

      return total + (Number(produto?.quantidade) || 0);
    }, 0);
  }

  function obterFaturamentoCliente(historico, nomeCliente) {
    return (historico || []).reduce((total, dia) => {
      const cliente = (dia.vendasClientes || []).find(
        (item) => item.cliente === nomeCliente
      );

      return total + (Number(cliente?.faturamento) || 0);
    }, 0);
  }

  const crescimentoProduto = produtoDestaque
    ? (() => {
        const atual = obterQuantidadeProduto(comercialPeriodo, produtoDestaque.nome);
        const anterior = obterQuantidadeProduto(comercialAnterior, produtoDestaque.nome);

        return anterior > 0 ? ((atual - anterior) / anterior) * 100 : null;
      })()
    : null;

  const variacaoCliente = clienteAtual
    ? (() => {
        const atual = obterFaturamentoCliente(comercialPeriodo, clienteAtual.nome);
        const anterior = obterFaturamentoCliente(comercialAnterior, clienteAtual.nome);

        return anterior > 0 ? ((atual - anterior) / anterior) * 100 : null;
      })()
    : null;

  const dadosModal = {
    produtos,
    lotes,
    clientes,
    entregas,
    alertas: listaBaseAlertas,
    fornecedores,
  };

  if (carregando) {
    return (
      <div className="tudoDashboard">
        <Sidebar paginaAtiva="Dashboard" />
        <div className="tudoMenosSidebar">
          <Header nomeIndustria="Sweet Sunset" />
          <main className="conteudoDashboard">
            <p>Carregando Dashboard...</p>
          </main>
        </div>
      </div>
    );
  }

  if (erroDashboard) {
    return (
      <div className="tudoDashboard">
        <Sidebar paginaAtiva="Dashboard" />
        <div className="tudoMenosSidebar">
          <Header nomeIndustria="Sweet Sunset" />
          <main className="conteudoDashboard">
            <p role="alert">{erroDashboard}</p>
            <button type="button" onClick={() => window.location.reload()}>
              Tentar novamente
            </button>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="tudoDashboard">
      <Sidebar paginaAtiva="Dashboard" />

      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset" />

        <main className="conteudoDashboard">
          <div className="topoDashboard">
            <div>
              <h1 className="tituloDashboard">Dashboard</h1>
              <p className="subtituloDashboard">
                Visão completa da operação industrial em tempo real.
              </p>
            </div>
          </div>

          {/* PERÍODOS */}
          <div className="divSeiLa">
            <div className="acoesDashboard">
              {[
                { valor: "7d", rotulo: "7d" },
                { valor: "30d", rotulo: "30d" },
                { valor: "90d", rotulo: "90d" },
                { valor: "1a", rotulo: "Ano" },
              ].map((periodo) => (
                <button
                  key={periodo.valor}
                  type="button"
                  className={`botaoPeriodo ${periodoSelecionado === periodo.valor ? "ativo" : ""}`}
                  aria-pressed={periodoSelecionado === periodo.valor}
                  onClick={() => setPeriodoSelecionado(periodo.valor)}
                >
                  {periodo.rotulo}
                </button>
              ))}

              <button
                type="button"
                className={`botaoDashboardSecundario ${periodoSelecionado === "personalizado" ? "ativo" : ""}`}
                onClick={() => {
                  setErroPeriodo("");
                  setPeriodoPersonalizado(true);
                }}
              >
                Período
              </button>

              <button
                type="button"
                className="botaoDashboardSecundario"
                onClick={exportarDashboard}
              >
                ↓ Exportar
              </button>
            </div>
          </div>

          {/* RESUMO */}
          <section className="secaoDashboard">
            <div className="cardsResumo">
              {resumo.map((item, i) => (
                <div className={`cardResumo ${item.tipo}`} key={i}>
                  <div className="iconeResumo">{item.icone}</div>
                  <div>
                    <span>{item.titulo}</span>
                    <strong>{item.status}</strong>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FINANCEIRO */}
          <section className="secaoDashboard">
            <div className="tituloSecaoDashboard">
              <span>R$</span>
              <h2>Financeiro</h2>
            </div>

            <div className="cardsKpiDashboard">
              {kpis.map((k, i) => (
                <div className="cardKpiDashboard" key={i}>
                  <div className="topoKpiDashboard">
                    <span className="iconeKpiDashboard">{k.icone}</span>
                    <span className={`badgeKpiDashboard ${k.variacao.status}`}>
                      ↗ {k.variacao.texto}
                    </span>
                  </div>
                  <p className="tituloKpiDashboard">{k.titulo}</p>
                  <strong className="valorKpiDashboard">{k.valor}</strong>
                </div>
              ))}
            </div>

            <div className="gridFinanceiro">
              {/* GRÁFICO 1: Faturamento vs. Lucro líquido */}
              <div className="cardDashboard graficoReceita">
                <div className="cabecalhoCardDashboard">
                  <h3>Faturamento vs. Lucro líquido</h3>
                  <span className="badgeSucesso">Período selecionado</span>
                </div>

                <div className="graficoArea">
                  <div className="linhasGrafico">
                    {ticksEscala.map((tick, idx) => (
                      <span key={idx}>
                        {tick === 0
                          ? "0"
                          : tick >= 1000
                            ? `${(tick / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}k`
                            : tick}
                      </span>
                    ))}
                  </div>

                  <div className="graficoColunas">
                    {faturamentoLucro.map((item, i) => (
                      <div className="grupoGrafico" key={`${item.mes}-${i}`}>
                        <div
                          className="barraReceita"
                          style={{
                            height: `${(item.receita / tetoEscala) * 100}%`,
                          }}
                          title={`Faturamento: ${formatarMoeda(item.receita)}`}
                        ></div>

                        <div
                          className="barraLucro"
                          style={{
                            height: `${(Math.max(0, item.lucro) / tetoEscala) * 100}%`,
                          }}
                          title={`Lucro líquido: ${formatarMoeda(item.lucro)}`}
                        ></div>

                        <span>{item.mes}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="legendaGrafico">
                  <span><i className="legendaReceita"></i>Faturamento</span>
                  <span><i className="legendaLucro"></i>Lucro líquido</span>
                </div>
              </div>

              <div className="cardDashboard cardMetasDashboard">
                <div className="cabecalhoCardDashboard">
                  <h3>Metas do mês</h3>

                  <button
                    ref={botaoGerenciarRef}
                    type="button"
                    className="botaoGerenciarMetas"
                    aria-haspopup="dialog"
                    onClick={() => setModalMetasAberto(true)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 4h-7" />
                      <path d="M10 4H3" />
                      <path d="M21 12h-9" />
                      <path d="M8 12H3" />
                      <path d="M21 20h-5" />
                      <path d="M12 20H3" />
                      <path d="M14 2v4" />
                      <path d="M8 10v4" />
                      <path d="M16 18v4" />
                    </svg>
                    Gerenciar
                  </button>
                </div>

                {metas.length === 0 && (
                  <p className="metasVazio">
                    Nenhuma meta definida. Clique em "Gerenciar" para criar suas metas.
                  </p>
                )}

                {metas.map((meta) => {
                  const porcentagem = calcularPorcentagem(meta.atual, meta.meta);

                  return (
                    <div className="metaDashboard" key={meta.id}>
                      <div className="linhaMeta">
                        <span>{meta.titulo}</span>
                        <strong>
                          {formatarValor(meta.atual, meta.tipo)}
                          <small> / {formatarValor(meta.meta, meta.tipo)}</small>
                        </strong>
                      </div>

                      <div className="barraMeta">
                        <div style={{ width: `${Math.min(porcentagem, 100)}%` }}></div>
                      </div>

                      <span className="porcentagemMeta">{porcentagem}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* GRÁFICO 2 E INSIGHTS */}
            <div className="gridDoisDashboard">
              <div className="cardDashboard">
                <div className="cabecalhoCardDashboard">
                  <h3>Receita por categoria de produto</h3>
                  <span className="badgeSucesso">Mix comercial</span>
                </div>

                <div className="listaCategoriasReceita">
                  {receitaCategorias.itens.map((cat) => (
                    <div className="itemCategoriaReceita" key={cat.nome}>
                      <div className="topoCategoriaReceita">
                        <span className="nomeCategoriaReceita">
                          <i style={{ background: cat.cor }}></i>
                          {cat.nome}
                        </span>
                        <div className="valoresCategoriaReceita">
                          <strong>
                            {receitaCategorias.ehMoeda
                              ? formatarMoeda(cat.valor)
                              : `${cat.valor.toLocaleString("pt-BR")} un.`}
                          </strong>
                          <small>{cat.percentualTotal}%</small>
                        </div>
                      </div>

                      <div className="trilhoCategoriaReceita">
                        <div
                          className="preenchimentoCategoriaReceita"
                          style={{
                            width: `${cat.larguraBarra}%`,
                            background: cat.cor,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cardDashboard insightsDashboard">
                <div className="cabecalhoCardDashboard">
                  <h3>Insights financeiros</h3>
                </div>

                <div className="insight positivo">
                  <strong>↗ Oportunidade</strong>
                  <p>
                    {produtoDestaque ? (
                      <>
                        <b>{produtoDestaque.nome}</b> lidera as vendas com{" "}
                        <b>{produtoDestaque.quantidade.toLocaleString("pt-BR")} unidades</b>
                        {crescimentoProduto !== null
                          ? `, variação de ${crescimentoProduto >= 0 ? "+" : ""}${crescimentoProduto.toFixed(1).replace(".", ",")}% em relação ao período anterior.`
                          : " no período selecionado."}
                      </>
                    ) : (
                      "Ainda não existem vendas suficientes para gerar uma recomendação."
                    )}
                  </p>
                </div>

                <div className="insight atencao">
                  <strong>↘ Atenção</strong>
                  <p>
                    {clienteAtual ? (
                      <>
                        <b>{clienteAtual.nome}</b> é o cliente com maior faturamento no período,
                        com {formatarMoeda(clienteAtual.faturamento || 0)} em compras.
                        {variacaoCliente !== null && variacaoCliente < 0
                          ? ` O faturamento caiu ${Math.abs(variacaoCliente).toFixed(1).replace(".", ",")}% em relação ao período anterior.`
                          : ""}
                      </>
                    ) : (
                      "Não há dados comerciais suficientes para analisar os clientes."
                    )}
                  </p>
                </div>

                <div className="insight estoque">
                  <strong>Estoque</strong>
                  <p>
                    {alertas.length > 0
                      ? alertas[0].mensagem
                      : "Nenhum alerta operacional registrado no momento."}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* PRODUÇÃO */}
          <section className="secaoDashboard">
            <div className="tituloSecaoDashboard">
              <span></span>
              <h2>Produção</h2>
            </div>

            <div className="gridProducaoDashboard">
              <div className="cardDashboard oeeDashboard">
                <h3>Eficiência industrial (OEE)</h3>

                <div className="circuloOee">
                  <div>
                    <strong>{producao.oee}%</strong>
                    <span>OEE</span>
                  </div>
                </div>

                <div className="indicadoresOee">
                  <div>
                    <strong>{producao.disponibilidade}%</strong>
                    <span>Disponib.</span>
                  </div>
                  <div>
                    <strong>{producao.desempenho}%</strong>
                    <span>Performance</span>
                  </div>
                  <div>
                    <strong>{producao.qualidade}%</strong>
                    <span>Qualidade</span>
                  </div>
                </div>
              </div>

              <div className="cardDashboard volumeProducaoCard">
                <div className="cabecalhoCardDashboard">
                  <h3>Volume produzido</h3>
                  <span className="badgeSucesso">
                    Média: {volumeProduzido.media.toLocaleString("pt-BR")} un.
                  </span>
                </div>

                {volumeProduzido.pico && (
                  <p className="subinfoVolumeProducao">
                    Pico em <b>{volumeProduzido.pico.label}</b> com{" "}
                    <b>{volumeProduzido.pico.valor.toLocaleString("pt-BR")} un.</b>
                  </p>
                )}

                {volumeProduzido.serie.length === 0 ? (
                  <p className="metasVazio">
                    Sem registros de produção no período selecionado.
                  </p>
                ) : (
                  <div className="volumeColunasArea">
                    {volumeProduzido.serie.map((item, idx) => {
                      const alturaPct = Math.max(
                        (item.valor / volumeProduzido.maxValor) * 100,
                        8
                      );
                      const isPico =
                        volumeProduzido.pico &&
                        item.label === volumeProduzido.pico.label &&
                        item.valor === volumeProduzido.pico.valor;

                      const valorCompacto =
                        item.valor >= 1000
                          ? `${(item.valor / 1000).toLocaleString("pt-BR", {
                              maximumFractionDigits: 1,
                            })}k`
                          : item.valor.toLocaleString("pt-BR");

                      return (
                        <div className="volumeColunaItem" key={`${item.label}-${idx}`}>
                          <span className={`volumeValorTopo ${isPico ? "pico" : ""}`}>
                            {valorCompacto}
                          </span>
                          <div className="volumeTrilho">
                            <div
                              className={`volumeBarra ${isPico ? "pico" : ""}`}
                              style={{ height: `${alturaPct}%` }}
                              title={`${item.label}: ${item.valor.toLocaleString("pt-BR")} unidades`}
                            />
                          </div>
                          <span className="volumeRotuloBase">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="cardDashboard">
                <div className="cabecalhoCardDashboard">
                  <h3>Top 5 produtos vendidos</h3>
                  <button
                    type="button"
                    className="botaoLinkDashboard"
                    onClick={() => setModalCardAtivo("topProdutos")}
                  >
                    Gerenciar
                  </button>
                </div>

                <div className="listaProdutosDashboard">
                  {produtos.map((produto) => (
                    <div className="produtoDashboard" key={produto.nome}>
                      <div className="produtoNome">
                        <span>{produto.nome}</span>
                        <strong>{produto.quantidade.toLocaleString("pt-BR")}</strong>
                      </div>
                      <div className="barraProduto">
                        <div style={{ width: `${produto.percentual}%` }}></div>
                      </div>
                    </div>
                  ))}

                  {produtos.length === 0 && <p>Sem vendas no período.</p>}
                </div>
              </div>
            </div>
          </section>

          {/* ESTOQUE */}
          <section className="secaoDashboard">
            <div className="tituloSecaoDashboard">
              <span></span>
              <h2>Estoque</h2>
            </div>

            <div className="gridDoisDashboard">
              <div className="cardDashboard">
                <div className="cabecalhoCardDashboard">
                  <h3>Alertas de estoque & validade</h3>
                  <button
                    type="button"
                    className="botaoLinkDashboard"
                    onClick={() => setModalCardAtivo("alertasEstoque")}
                  >
                    Gerenciar
                  </button>
                </div>

                <div className="listaAlertas">
                  {listaBaseAlertas.slice(0, 2).map((alerta, i) => (
                    <div className="alertaDashboard" key={alerta.id || i}>
                      <span className={`pontoAlerta ${alerta.nivel}`}></span>
                      <div>
                        <small>{alerta.tipo}</small>
                        <p>{alerta.mensagem}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="sugestaoDashboard">
                  <b>Sugestão:</b> Comprar 40kg de chocolate ao leite e 15kg de manteiga
                  nos próximos 3 dias.
                </div>
              </div>

              <div className="cardDashboard">
                <div className="cabecalhoCardDashboard">
                  <h3>Controle de lotes próximos ao vencimento</h3>
                  <button
                    type="button"
                    className="botaoLinkDashboard"
                    onClick={() => setModalCardAtivo("lotesVencimento")}
                  >
                    Gerenciar
                  </button>
                </div>

                <div className="tabelaDashboard">
                  <div className="linhaTabela cabecalhoTabela">
                    <span>Lote</span><span>Produto</span><span>Qtd</span><span>Vence</span>
                  </div>

                  {lotes.length === 0 ? (
                    <p style={{ padding: "12px 0", color: "#7A6E6C" }}>
                      Nenhum insumo com validade cadastrada.
                    </p>
                  ) : (
                    lotes.slice(0, 3).map((lote, i) => (
                      <div
                        className="linhaTabela"
                        key={lote.id || i}
                        title={lote.validadeFormatada ? `Validade: ${lote.validadeFormatada}` : undefined}
                      >
                        <span>{lote.codigo}</span>
                        <span>{lote.produto}</span>
                        <span>{lote.qtd}</span>
                        <b className={lote.badgeClass}>{lote.vence}</b>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* PEDIDOS */}
          <section className="secaoDashboard">
            <div className="tituloSecaoDashboard">
              <span></span>
              <h2>Pedidos</h2>
            </div>

            <div className="gridDoisDashboard">
              <div className="cardDashboard">
                <div className="cabecalhoCardDashboard">
                  <h3>Próximas entregas</h3>
                  <button
                    type="button"
                    className="botaoLinkDashboard"
                    onClick={() => setModalCardAtivo("proximasEntregas")}
                  >
                    Gerenciar
                  </button>
                </div>

                <div className="listaEntregas">
                  {entregas.map((entrega, i) => (
                    <div className="entregaDashboard" key={i}>
                      <div>
                        <strong>{entrega.cliente}</strong>
                        <span>{entrega.produto}</span>
                      </div>

                      <div className="horarioEntrega">
                        <strong>{entrega.quando}</strong>
                        {entrega.urgente && <span className="badgeUrgente">Urgente</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cardDashboard">
                <div className="cabecalhoCardDashboard">
                  <h3>Top clientes B2B</h3>
                  <button
                    type="button"
                    className="botaoLinkDashboard"
                    onClick={() => setModalCardAtivo("topClientesB2B")}
                  >
                    Ver todos
                  </button>
                </div>

                <div className="tabelaDashboard">
                  <div className="linhaTabela cabecalhoTabela">
                    <span>Cliente</span>
                    <span>Pedidos</span>
                    <span>Faturamento</span>
                    <span>Status</span>
                  </div>

                  {clientes.map((cliente) => (
                    <div className="linhaTabela" key={cliente.nome}>
                      <strong>{cliente.nome}</strong>
                      <span>{cliente.pedidos}</span>
                      <span>{cliente.ltv}</span>
                      <b className={`statusCliente ${cliente.status.toLowerCase().replace("ã", "a")}`}>
                        {cliente.status}
                      </b>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ALERTAS */}
          <section className="secaoDashboard">
            <div className="tituloSecaoDashboard">
              <span>⚠</span>
              <h2>Alertas</h2>
            </div>

            <div className="gridDoisDashboard">
              <div className="cardDashboard">
                <div className="cabecalhoCardDashboard">
                  <h3>Alertas críticos</h3>
                  <button
                    type="button"
                    className="botaoLinkDashboard"
                    onClick={() => window.location.assign("/alertas")}
                  >
                    Ver todos
                  </button>
                </div>

                <div className="listaAlertas">
                  {alertas.length === 0 ? (
                    <p style={{ padding: "8px 0", color: "#7A6E6C" }}>
                      Nenhum alerta crítico no momento.
                    </p>
                  ) : (
                    alertas.map((alerta, i) => (
                      <div className="alertaDashboard" key={alerta.id || i}>
                        <span className={`pontoAlerta ${alerta.nivel}`}></span>
                        <div>
                          <small>{alerta.tipo}</small>
                          <p>{alerta.mensagem}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="cardDashboard">
                <div className="cabecalhoCardDashboard">
                  <h3>Fornecedores em atraso</h3>
                  <button
                    type="button"
                    className="botaoLinkDashboard"
                    onClick={() => setModalCardAtivo("fornecedoresAtraso")}
                  >
                    Gerenciar
                  </button>
                </div>

                <div className="tabelaDashboard">
                  <div className="linhaTabela cabecalhoTabela">
                    <span>Fornecedor</span>
                    <span>Atraso</span>
                    <span>Nota</span>
                    <span>Última entrega</span>
                  </div>

                  {fornecedores.map((fornecedor, i) => (
                    <div className="linhaTabela" key={i}>
                      <strong>{fornecedor.nome}</strong>
                      <b className="badgeUrgente">{fornecedor.atraso}</b>
                      <b className="notaFornecedor">{fornecedor.nota}</b>
                      <span>{fornecedor.ultima}</span>
                    </div>
                  ))}
                </div>

                <div className="recomendacaoDashboard">
                  <b>Recomendação:</b> Avalie substituir Embalagens Rápido — nota 2,5
                  e 8 dias de atraso médio nos últimos 3 meses.
                </div>
              </div>
            </div>
          </section>

          {/* INDICADORES FINAIS */}
          <div className="indicadoresFinaisDashboard">
            {indicadores.map((indicador, i) => (
              <div className="indicadorFinalDashboard" key={i}>
                <span>{indicador.titulo}</span>
                <strong>{indicador.valor}</strong>
              </div>
            ))}
          </div>
        </main>
      </div>

      {modalMetasAberto &&
        createPortal(
          <ModalGerenciarMetas
            metas={metas}
            onSalvar={salvarMetas}
            onFechar={fecharModalMetas}
          />,
          document.body
        )}

      {modalCardAtivo &&
        createPortal(
          <ModalDetalhesCard
            cardKey={modalCardAtivo}
            dados={dadosModal}
            onFechar={() => setModalCardAtivo(null)}
          />,
          document.body
        )}

      {periodoPersonalizado &&
        createPortal(
          <ModalPeriodo
            dataInicio={dataInicio}
            dataFim={dataFim}
            setDataInicio={setDataInicio}
            setDataFim={setDataFim}
            erro={erroPeriodo}
            onAplicar={aplicarPeriodoPersonalizado}
            onFechar={() => setPeriodoPersonalizado(false)}
          />,
          document.body
        )}

      {avisoMetas &&
        createPortal(
          <div className="gmToast" role="status">
            Metas atualizadas com sucesso
          </div>,
          document.body
        )}
    </div>
  );
}

export default Dashboard;
