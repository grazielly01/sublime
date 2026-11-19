import "./fluxocaixa.css";
import "./fluxocaixaMovimentacao.css";
import "./fluxocaixadespesa.css";
import "./fluxocaixaDetalhes.css";
import "./fluxocaixaSaida.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const API_CAIXA = "http://localhost:3000/caixa";
const STORAGE_KEY = "sublime_fluxo_caixa";

function lerLocal() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function salvarLocal(lista) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

async function cadastrarTransacao(dados) {
  try {
    const response = await fetch(API_CAIXA, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
    const texto = await response.text();
    const resultado = texto ? JSON.parse(texto) : {};
    if (!response.ok) {
      throw new Error(resultado.error || "Erro na API");
    }
    return resultado;
  } catch {
    const nova = { ...dados, id: Date.now() };
    const atuais = lerLocal();
    salvarLocal([nova, ...atuais]);
    return nova;
  }
}

async function listarTransacoes() {
  try {
    const response = await fetch(API_CAIXA, {
      headers: { Accept: "application/json" },
    });
    const texto = await response.text();

    if (!response.ok) {
      throw new Error(`Erro ${response.status} ao carregar transações`);
    }

    const resultado = texto ? JSON.parse(texto) : [];
    return Array.isArray(resultado) ? resultado : resultado.data || [];
  } catch (error) {
    console.warn("API do caixa indisponível; usando dados locais.", error.message);
    return lerLocal();
  }
}

async function excluirTransacao(id) {
  const response = await fetch(`${API_CAIXA}/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const texto = await response.text();
    let mensagem = "Erro ao excluir transação";

    try {
      mensagem = texto ? JSON.parse(texto).error || mensagem : mensagem;
    } catch {
      // Resposta não-JSON do servidor
    }

    throw new Error(mensagem);
  }

  const filtradas = lerLocal().filter((item) => String(item.id) !== String(id));
  salvarLocal(filtradas);
  return response;
}
function calcularFluxoCaixa(movimentacoes = []) {
  const entradas = movimentacoes.filter(
    (item) => item.type === "INCOME" || item.tipo === "entrada"
  );
  const saidas = movimentacoes.filter(
    (item) => item.type === "EXPENSE" || item.tipo === "saida"
  );

  const totalEntradas = entradas.reduce(
    (total, item) => total + Number(item.amount ?? item.valor ?? 0),
    0
  );
  const totalSaidas = saidas.reduce(
    (total, item) => total + Number(item.amount ?? item.valor ?? 0),
    0
  );

  const despesasFixas = saidas
    .filter((item) => item.category === "FIXED" || item.categoriaDespesa === "fixa")
    .reduce((total, item) => total + Number(item.amount ?? item.valor ?? 0), 0);

  const despesasVariaveis = saidas
    .filter((item) => item.category === "VARIABLE" || item.categoriaDespesa === "variavel")
    .reduce((total, item) => total + Number(item.amount ?? item.valor ?? 0), 0);

  const saldoFinal = totalEntradas - totalSaidas;

  return {
    totalEntradas,
    totalSaidas,
    saldoFinal,
    despesasFixas,
    despesasVariaveis,
    quantidadeEntradas: entradas.length,
    quantidadeSaidas: saidas.length,
  };
}

const IconeSeta = ({ tipo }) =>
  tipo === "entrada" ? (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 7L7 17M7 17h9M7 17V8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

const IconeChevron = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconeSetaSaida = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 7L7 17M7 17h9M7 17V8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function FluxoCaixa() {
  const navigate = useNavigate();

  const [cardAtivo, setCardAtivo] = useState("margem");
  const [botaoAtivo, setBotaoAtivo] = useState("entrada");

  const [modalMovimentacoesAberto, setModalMovimentacoesAberto] = useState(false);
  const [modalDespesasAberto, setModalDespesasAberto] = useState(false);
  const [modalRegistrarSaidaAberto, setModalRegistrarSaidaAberto] = useState(false);
  const [modalRegistrarEntradaAberto, setModalRegistrarEntradaAberto] = useState(false);

  const [formSaida, setFormSaida] = useState({
    description: "",
    date: new Date().toISOString().slice(0, 10),
    categoriaVisual: "",
    amount: "",
    detalhes: "",
    category: "VARIABLE",
    observacoes: "",
  });

  const [formEntrada, setFormEntrada] = useState({
    description: "",
    date: new Date().toISOString().slice(0, 10),
    categoriaVisual: "",
    amount: "",
    detalhes: "",
    observacoes: "",
  });

  const [transacoesApi, setTransacoesApi] = useState([]);

  const [modalDetalhesEntradaAberto, setModalDetalhesEntradaAberto] = useState(false);
  const [entradaSelecionada, setEntradaSelecionada] = useState(null);
  const [nomeArquivoDetalhes, setNomeArquivoDetalhes] = useState("");
  const [editandoDetalhes, setEditandoDetalhes] = useState(false);

  const [modalDetalhesSaidaAberto, setModalDetalhesSaidaAberto] = useState(false);
  const [saidaSelecionada, setSaidaSelecionada] = useState(null);
  const [nomeArquivoDetalhesSaida, setNomeArquivoDetalhesSaida] = useState("");
  const [editandoDetalhesSaida, setEditandoDetalhesSaida] = useState(false);

  const [nomeArquivoSaida, setNomeArquivoSaida] = useState("");
  const [nomeArquivoEntrada, setNomeArquivoEntrada] = useState("");

  const carregarTransacoes = async () => {
    try {
      const dados = await listarTransacoes();
      setTransacoesApi(Array.isArray(dados) ? dados : dados.data || []);
    } catch (error) {
      console.error("Erro ao carregar transações:", error.message);
    }
  };

  useEffect(() => {
    carregarTransacoes();
  }, []);

  const handleClicarSaida = () => {
    setBotaoAtivo("saida");
    setModalRegistrarSaidaAberto(true);
  };

  const handleClicarEntrada = () => {
    setBotaoAtivo("entrada");
    setModalRegistrarEntradaAberto(true);
  };

  const handleSalvarSaida = async (e) => {
    e.preventDefault();
    const valorNumerico = Number(String(formSaida.amount).replace(/\./g, "").replace(",", "."));

    const payload = {
      description: formSaida.description,
      amount: valorNumerico,
      type: "EXPENSE",
      category: formSaida.category,
      date: formSaida.date,
    };

    try {
      await cadastrarTransacao(payload);
      await carregarTransacoes();
      setFormSaida({
        description: "",
        date: new Date().toISOString().slice(0, 10),
        categoriaVisual: "",
        amount: "",
        detalhes: "",
        category: "VARIABLE",
        observacoes: "",
      });
      setNomeArquivoSaida("");
      setModalRegistrarSaidaAberto(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSalvarEntrada = async (e) => {
    e.preventDefault();
    const valorNumerico = Number(String(formEntrada.amount).replace(/\./g, "").replace(",", "."));

    const payload = {
      description: formEntrada.description,
      amount: valorNumerico,
      type: "INCOME",
      category: null,
      date: formEntrada.date,
    };

    try {
      await cadastrarTransacao(payload);
      await carregarTransacoes();
      setFormEntrada({
        description: "",
        date: new Date().toISOString().slice(0, 10),
        categoriaVisual: "",
        amount: "",
        detalhes: "",
        observacoes: "",
      });
      setNomeArquivoEntrada("");
      setModalRegistrarEntradaAberto(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleExcluirTransacao = async (id, rotaFallback) => {
    if (id) {
      try {
        await excluirTransacao(id);
        await carregarTransacoes();
        setModalDetalhesEntradaAberto(false);
        setModalDetalhesSaidaAberto(false);
        return;
      } catch (error) {
        alert(error.message);
        return;
      }
    }
    setModalDetalhesEntradaAberto(false);
    setModalDetalhesSaidaAberto(false);
    navigate(rotaFallback);
  };

  const handleArquivoSaida = (e) => {
    const arquivo = e.target.files?.[0];
    setNomeArquivoSaida(arquivo ? arquivo.name : "");
  };

  const handleArquivoEntrada = (e) => {
    const arquivo = e.target.files?.[0];
    setNomeArquivoEntrada(arquivo ? arquivo.name : "");
  };

  const handleArquivoDetalhes = (e) => {
    const arquivo = e.target.files?.[0];
    setNomeArquivoDetalhes(arquivo ? arquivo.name : "");
  };

  const handleArquivoDetalhesSaida = (e) => {
    const arquivo = e.target.files?.[0];
    setNomeArquivoDetalhesSaida(arquivo ? arquivo.name : "");
  };

  const abrirDetalhesEntrada = (item) => {
    setEntradaSelecionada({
      id: item.id || null,
      titulo: item.descricao || item.titulo,
      data: item.dataCompleta || item.data || "03/05/2026",
      categoria: item.categoria || "Venda de produto",
      valor: String(item.valor || "0,00").replace("R$ ", ""),
      itens: item.itens || "15 Torta de Limão 22cm, 30 Cupcake Red Velvet, 28 Brownie Avelã, 40 Cupcake Morango",
      observacoes: item.observacoes || "",
    });
    setNomeArquivoDetalhes("");
    setEditandoDetalhes(false);
    setModalDetalhesEntradaAberto(true);
  };

  const abrirDetalhesSaida = (item) => {
    setSaidaSelecionada({
      id: item.id || null,
      titulo: item.descricao || item.titulo,
      data: item.dataCompleta || item.data || "03/05/2026",
      categoria: item.categoria || "Insumos",
      valor: String(item.valor || "0,00").replace("R$ ", ""),
      descricao: item.itens || item.descricao || "Compra de matéria-prima para produção",
      tipoDespesa: item.tipoDespesa || "Variável",
      observacoes: item.observacoes || "",
    });
    setNomeArquivoDetalhesSaida("");
    setEditandoDetalhesSaida(false);
    setModalDetalhesSaidaAberto(true);
  };

  const [abertosGrupos, setAbertosGrupos] = useState({
    Hoje: true,
    Ontem: false,
    "01/05": true,
  });

  const alternarGrupo = (titulo) => {
    setAbertosGrupos((prev) => ({ ...prev, [titulo]: !prev[titulo] }));
  };

  const movimentosBase = [
    {
      tipo: "entrada",
      descricao: "Venda – Padaria São José",
      valor: "R$ 2.760,00",
      dataCompleta: "03/05/2026",
      categoria: "Venda de produto",
      itens: "20 Bolo de Cenoura c/ Chocolate, 35 Brigadeiro Gourmet, 15 Torta de Limão",
      observacoes: "Pagamento via PIX na entrega.",
    },
    {
      tipo: "saida",
      descricao: "Compra – Chocolate Callebaut 10kg",
      valor: "R$ 1.240,00",
      dataCompleta: "03/05/2026",
      categoria: "Compra de insumo",
      itens: "Chocolate ao leite Callebaut 10kg (Lote LT-0421)",
      tipoDespesa: "Variável",
      observacoes: "Fornecedor oficial.",
    },
    {
      tipo: "saida",
      descricao: "Compra – Farinha de trigo 25kg",
      valor: "R$ 615,00",
      dataCompleta: "02/05/2026",
      categoria: "Compra de insumo",
      itens: "Saco de Farinha de trigo especial 25kg",
      tipoDespesa: "Variável",
      observacoes: "",
    },
    {
      tipo: "entrada",
      descricao: "Venda – Vila Bela Bolos",
      valor: "R$ 1.840,00",
      dataCompleta: "02/05/2026",
      categoria: "Encomenda",
      itens: "12 Bolo Red Velvet, 25 Brownie Tradicional",
      observacoes: "",
    },
    {
      tipo: "saida",
      descricao: "Compra – Chocolate Callebaut 5kg",
      valor: "R$ 625,00",
      dataCompleta: "01/05/2026",
      categoria: "Compra de insumo",
      itens: "Chocolate meio amargo Callebaut 5kg",
      tipoDespesa: "Variável",
      observacoes: "",
    },
  ];

  const movimentosFormatadosApi = transacoesApi.map((t) => {
    const ehEntrada = t.type === "INCOME" || t.tipo === "entrada";
    const valorNum = Number(t.amount ?? t.valor ?? 0);

    return {
      ...t,
      reactKey: `api-${t.id ?? `${t.description}-${t.date}-${valorNum}`}`,
      tipo: ehEntrada ? "entrada" : "saida",
      descricao: t.description || t.descricao,
      valor: valorNum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      dataCompleta: t.date || "Hoje",
      tipoDespesa: t.category === "FIXED" ? "Fixa" : "Variável",
    };
  });

  const movimentosBaseFormatados = movimentosBase.map((m, i) => ({
    ...m,
    reactKey: `base-${i}-${m.descricao}`,
  }));

  const movimentos = [...movimentosFormatadosApi, ...movimentosBaseFormatados];

  const baseCalculo = [
    { type: "INCOME", amount: 52430 },
    { type: "EXPENSE", amount: 18220 },
    ...transacoesApi,
  ];
  const resumo = calcularFluxoCaixa(baseCalculo);
  const margemLucro =
    resumo.totalEntradas > 0
      ? ((resumo.saldoFinal / resumo.totalEntradas) * 100).toFixed(1).replace(".", ",")
      : "0,0";

  const formatarMoeda = (num) =>
    Number(num).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const maioresDespesas = [
    { nome: "Folha de salários", valor: "R$ 4.500" },
    { nome: "Matéria-prima", valor: "R$ 3.120" },
    { nome: "Energia elétrica", valor: "R$ 1.950" },
    { nome: "Embalagens personalizadas", valor: "R$ 1.250" },
    { nome: "Manutenção de equipamentos", valor: "R$ 850" },
  ];

  const despesasFixas = [
    ["Aluguel", "R$ 3.500,00"],
    ["Salários", "R$ 5.000,00"],
    ["Internet", "R$ 200,00"],
    ["Sistema/assinaturas", "R$ 300,00"],
    ["Energia base", "R$ 800,00"],
    ["Manutenção", "R$ 300,00"],
  ];

  const despesasVariaveis = [
    ["Matéria-prima", "R$ 3.500,00"],
    ["Embalagens", "R$ 5.000,00"],
    ["Fretes", "R$ 200,00"],
    ["Taxas de entrega", "R$ 300,00"],
    ["Horas extras", "R$ 800,00"],
    ["Produção extra", "R$ 300,00"],
  ];

  const gruposMovimentacoesCompleto = [
    {
      titulo: "Hoje",
      itens: [
        {
          tipo: "entrada",
          titulo: "Venda — Padaria Estrella",
          data: "03/05",
          dataCompleta: "03/05/2026",
          itens: "15 Torta de Limão 22cm, 30 Cupcake Red Velvet, 28 Brownie Avelã, 40 Cupcake Morango",
          categoria: "Outros",
          valor: "R$ 2.700,00",
        },
        {
          tipo: "entrada",
          titulo: "Venda — Sonda Supermercado",
          data: "03/05",
          dataCompleta: "03/05/2026",
          itens: "15 Bolo Formigueiro, 15 Bolo Chocolate Branco, 15 Bolo Sensação, 15 Bolo Meio Amargo, 15 Ninho",
          categoria: "Venda de produto",
          valor: "R$ 745,00",
        },
        {
          tipo: "saida",
          titulo: "Compra — Serviço encanador",
          data: "03/05",
          dataCompleta: "03/05/2026",
          itens: "Conserto sanitário masculino",
          categoria: "Conserto/manutenção",
          tipoDespesa: "Variável",
          observacoes: "do seu Zé (o melhor)",
          valor: "R$ 1.200,00",
        },
      ],
    },
    {
      titulo: "Ontem",
      itens: [],
    },
    {
      titulo: "01/05",
      itens: [
        {
          tipo: "saida",
          titulo: "Compra — Embalagens Personalizadas",
          data: "01/05",
          dataCompleta: "01/05/2026",
          itens: "Embalagens Personalizadas",
          categoria: "Compra de insumo",
          tipoDespesa: "Variável",
          valor: "R$ 2.080,00",
        },
        {
          tipo: "entrada",
          titulo: "Venda — Tia Bete Doces",
          data: "01/05",
          dataCompleta: "01/05/2026",
          itens: "16 Mousse Maracujá, 10 Pizza Brownie, 10 Copo Felicidade Surpresa de Uva, 15 Vulcão Chocolate",
          categoria: "Venda de produto",
          valor: "R$ 922,00",
        },
        {
          tipo: "saida",
          titulo: "Compra — Farinha de Trigo 30kg",
          data: "01/05",
          dataCompleta: "01/05/2026",
          itens: "Farinha de trigo 30kg",
          categoria: "Compra de insumo",
          tipoDespesa: "Variável",
          valor: "R$ 1.052,00",
        },
        {
          tipo: "entrada",
          titulo: "Venda — Doceria Super Magic",
          data: "01/05",
          dataCompleta: "01/05/2026",
          itens: "Pedido personalizado",
          categoria: "Venda de produto",
          valor: "R$ 2.700,00",
        },
      ],
    },
  ];

  const despesasCompletas = [
    { nome: "Folha salarial", detalhe: "Pagamento de funcionário", valor: "R$ 8.400" },
    { nome: "Farinha e açúcar (lote mensal)", detalhe: "Compra de insumo", valor: "R$ 3.120" },
    { nome: "Energia elétrica industrial", detalhe: "Contas", valor: "R$ 1.950" },
    { nome: "Embalagens personalizadas", detalhe: "Compra de insumo", valor: "R$ 2.760" },
    { nome: "Manutenção de equipamentos industriais", detalhe: "Conserto/manutenção", valor: "R$ 4.300" },
    { nome: "Gás industrial", detalhe: "Contas", valor: "R$ 2.650" },
    { nome: "Fretes e entregas", detalhe: "Fretes/entregas", valor: "R$ 2.100" },
    { nome: "Ingredientes complementares e especiais", detalhe: "Compra de insumo", valor: "R$ 1.780" },
  ];

  const voltar = () => {
    window.history.back();
  };

  return (
    <div className="tudoFluxoCaixa">
      <Sidebar paginaAtiva="Fluxo de caixa" />

      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset" />

        <main className="conteudoFluxoCaixa">
          {/* CABEÇALHO */}
          <div className="topoFluxoCaixa">
            <div className="tituloComVoltar">
              <button
                className="botaoVoltar"
                onClick={voltar}
                aria-label="Voltar"
                type="button"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 18l-6-6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <h1 className="tituloFluxoCaixa">Fluxo de caixa</h1>
            </div>

            <p className="subtituloFluxoCaixa">
              Entradas, saídas e saldo consolidado de setembro/2026.
            </p>
          </div>

          {/* 4 CARDS SUPERIORES QUE ALTERNAM AO CLICAR */}
          <section className="resumoFluxo">
            <div
              className={`cardFluxo ${cardAtivo === "entradas" ? "cardSaldoFinal" : ""}`}
              onClick={() => setCardAtivo("entradas")}
              style={{ cursor: "pointer" }}
            >
              <span className="labelFluxo">Entradas Totais</span>
              <strong className="valorFluxo">{formatarMoeda(resumo.totalEntradas)}</strong>
            </div>

            <div
              className={`cardFluxo ${cardAtivo === "despesas" ? "cardSaldoFinal" : ""}`}
              onClick={() => setCardAtivo("despesas")}
              style={{ cursor: "pointer" }}
            >
              <span className="labelFluxo">Despesas Totais</span>
              <strong className="valorFluxo">{formatarMoeda(resumo.totalSaidas)}</strong>
            </div>

            <div
              className={`cardFluxo ${cardAtivo === "lucro" ? "cardSaldoFinal" : ""}`}
              onClick={() => setCardAtivo("lucro")}
              style={{ cursor: "pointer" }}
            >
              <span className="labelFluxo">Lucro Líquido</span>
              <strong className="valorFluxo">{formatarMoeda(resumo.saldoFinal)}</strong>
            </div>

            <div
              className={`cardFluxo ${cardAtivo === "margem" ? "cardSaldoFinal" : ""}`}
              onClick={() => setCardAtivo("margem")}
              style={{ cursor: "pointer" }}
            >
              <span className="labelFluxo">Margem de Lucro</span>
              <strong className="valorFluxo">{margemLucro}%</strong>
            </div>
          </section>

          {/* GRÁFICO DE BARRAS */}
          <section className="cardGraficoFluxo">
            <div className="cabecalhoCardFluxo">
              <h2>Fluxo de Caixa (Mês)</h2>
              <div className="acoesGrafico">
                <div className="botoesFluxo">
                  <button
                    className={botaoAtivo === "saida" ? "botaoEntrada" : "botaoSaida"}
                    type="button"
                    onClick={handleClicarSaida}
                  >
                    + Saída
                  </button>

                  <button
                    className={botaoAtivo === "entrada" ? "botaoEntrada" : "botaoSaida"}
                    type="button"
                    onClick={handleClicarEntrada}
                  >
                    + Entrada
                  </button>
                </div>

                <div className="legendaGrafico">
                  <span><i className="legendaEntrada"></i>Entradas</span>
                  <span><i className="legendaSaida"></i>Saídas</span>
                </div>
              </div>
            </div>

            <div className="graficoBarras">
              <div className="eixoY">
                <span>60k</span><span>40k</span><span>20k</span><span>0</span>
              </div>
              <div className="areaBarras">
                <div className="linhaGrafico linha60"></div>
                <div className="linhaGrafico linha40"></div>
                <div className="linhaGrafico linha20"></div>
                <div className="linhaGrafico linha0"></div>

                <div className="grupoBarras">
                  <div className="parBarras">
                    <div className="barra entrada" style={{ height: "68%" }}></div>
                    <div className="barra saida" style={{ height: "46%" }}></div>
                  </div>
                  <span>07/09</span>
                </div>
                <div className="grupoBarras">
                  <div className="parBarras">
                    <div className="barra entrada" style={{ height: "76%" }}></div>
                    <div className="barra saida" style={{ height: "43%" }}></div>
                  </div>
                  <span>08/09</span>
                </div>
                <div className="grupoBarras">
                  <div className="parBarras">
                    <div className="barra entrada" style={{ height: "64%" }}></div>
                    <div className="barra saida" style={{ height: "39%" }}></div>
                  </div>
                  <span>15/09</span>
                </div>
                <div className="grupoBarras">
                  <div className="parBarras">
                    <div className="barra entrada" style={{ height: "70%" }}></div>
                    <div className="barra saida" style={{ height: "44%" }}></div>
                  </div>
                  <span>22/09</span>
                </div>
                <div className="grupoBarras">
                  <div className="parBarras">
                    <div className="barra entrada" style={{ height: "82%" }}></div>
                    <div className="barra saida" style={{ height: "45%" }}></div>
                  </div>
                  <span>29/09</span>
                </div>
              </div>
            </div>
          </section>

          {/* EVOLUÇÃO DO SALDO */}
          <section className="cardGraficoFluxo">
            <div className="cabecalhoCardFluxo">
              <h2>Evolução do saldo</h2>
            </div>
            <div className="graficoLinha">
              <div className="linhasLinha">
                <span></span><span></span><span></span><span></span>
              </div>

              <div className="eixoLinhaY">
                <span>32k</span><span>24k</span><span>16k</span><span>8k</span><span>0</span>
              </div>

              <svg className="svgLinha" viewBox="0 0 1000 250" preserveAspectRatio="none">
                <polyline
                  points="20,205 190,180 360,185 530,145 700,125 850,88 980,52"
                  fill="none"
                  stroke="#9d0926"
                  strokeWidth="3"
                />
                <circle cx="20" cy="205" r="5" />
                <circle cx="190" cy="180" r="5" />
                <circle cx="360" cy="185" r="5" />
                <circle cx="530" cy="145" r="5" />
                <circle cx="700" cy="125" r="5" />
                <circle cx="850" cy="88" r="5" />
                <circle cx="980" cy="52" r="5" />
              </svg>

              <div className="datasLinha">
                <span>01/09</span><span>05</span><span>10</span><span>15</span><span>20</span><span>25</span><span>30</span>
              </div>
            </div>
          </section>

          {/* DUAS COLUNAS */}
          <section className="duasColunasFluxo">
            <div className="cardMovimentacoes">
              <div className="cabecalhoCardFluxo cabecalhoLista">
                <h2>Movimentações recentes</h2>
                <button type="button" onClick={() => setModalMovimentacoesAberto(true)}>
                  Ver todas
                </button>
              </div>

              <div className="listaMovimentacoes">
                {movimentos.map((m, i) => (
                  <div
                    className="movimentacao"
                    key={m.reactKey || `movimento-${i}`}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      m.tipo === "entrada"
                        ? abrirDetalhesEntrada(m)
                        : abrirDetalhesSaida(m)
                    }
                  >
                    <div className="infoMovimentacao">
                      <span
                        className={
                          m.tipo === "entrada"
                            ? "iconeMovimentacao entradaIcone"
                            : "iconeMovimentacao saidaIcone"
                        }
                      >
                        {m.tipo === "entrada" ? "↓" : "↑"}
                      </span>
                      <strong>{m.descricao}</strong>
                    </div>

                    <span className={m.tipo === "entrada" ? "valorEntrada" : "valorSaida"}>
                      {m.tipo === "entrada" ? "+" : "-"}
                      {m.valor}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="cardMovimentacoes">
              <div className="cabecalhoCardFluxo cabecalhoLista">
                <h2>Maiores despesas</h2>
                <button type="button" onClick={() => setModalDespesasAberto(true)}>
                  Ver todas
                </button>
              </div>

              <div className="listaMovimentacoes">
                {maioresDespesas.map((d, i) => (
                  <div className="movimentacao" key={i}>
                    <div className="infoMovimentacao">
                      <span className="iconeDespesa">-</span>
                      <strong>{d.nome}</strong>
                    </div>
                    <span className="valorSaida">{d.valor}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* RESUMO INFERIOR */}
          <section className="resumoInferior">
            <div className="miniCard">
              <span>Lucro do mês</span>
              <strong>R$ 32.210,00</strong>
              <small>+12,4% em relação ao mês anterior</small>
            </div>
            <div className="miniCard">
              <span>Lucro da semana</span>
              <strong>R$ 5.338,60</strong>
              <small>+6,2% em relação à semana anterior</small>
            </div>
            <div className="miniCard">
              <span>Lucro do dia</span>
              <strong>R$ 982,00</strong>
              <small>+4,3% em relação a ontem</small>
            </div>
          </section>

          {/* DESPESAS FIXAS E VARIÁVEIS */}
          <section className="cardDespesas">
            <div className="cabecalhoCardFluxo">
              <h2>Despesas fixas x despesas variáveis (mês)</h2>
            </div>
            <div className="conteudoDespesas">
              <div className="areaPizza">
                <div className="pizza">
                  <div className="centroPizza">
                    <strong>R$ 20.500,00</strong>
                    <span>Total de despesas</span>
                  </div>
                </div>
                <div className="legendaPizza">
                  <div><i className="pontoFixo"></i>Despesas fixas (58,5%)</div>
                  <div><i className="pontoVariavel"></i>Despesas variáveis (41,5%)</div>
                </div>
              </div>

              <div className="tabelaDespesa">
                <h3>Despesas fixas</h3>
                {despesasFixas.map((item, i) => (
                  <div className="linhaDespesa" key={i}>
                    <span>{item[0]}</span>
                    <strong>{item[1]}</strong>
                  </div>
                ))}
                <div className="totalDespesa">
                  <span>Total fixas</span>
                  <strong>R$ 12.000,00</strong>
                </div>
              </div>

              <div className="tabelaDespesa">
                <h3>Despesas variáveis</h3>
                {despesasVariaveis.map((item, i) => (
                  <div className="linhaDespesa" key={i}>
                    <span>{item[0]}</span>
                    <strong>{item[1]}</strong>
                  </div>
                ))}
                <div className="totalDespesa">
                  <span>Total variáveis</span>
                  <strong>R$ 8.500,00</strong>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* POP-UP: DETALHES DA ENTRADA */}
      {modalDetalhesEntradaAberto && entradaSelecionada && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "820px" }}>
            <div className="modalCabecalho">
              <h2>Detalhes da entrada</h2>
              <button
                type="button"
                className="botaoFecharModal"
                onClick={() => setModalDetalhesEntradaAberto(false)}
              >
                &times;
              </button>
            </div>
            <div className="modalCorpo">
              <div className="detalhesMovimentacao">
                <div className="linhaDetalhes colunas4">
                  <label>
                    Título da entrada
                    <input
                      type="text"
                      value={entradaSelecionada.titulo}
                      readOnly={!editandoDetalhes}
                      onChange={(e) =>
                        setEntradaSelecionada({ ...entradaSelecionada, titulo: e.target.value })
                      }
                    />
                  </label>

                  <label className="campoData">
                    Data da entrada
                    <div className="wrapperInput">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M3 9h18" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                      <input
                        type="text"
                        value={entradaSelecionada.data}
                        readOnly={!editandoDetalhes}
                        onChange={(e) =>
                          setEntradaSelecionada({ ...entradaSelecionada, data: e.target.value })
                        }
                      />
                    </div>
                  </label>

                  <label>
                    Categoria
                    <input
                      type="text"
                      value={entradaSelecionada.categoria}
                      readOnly={!editandoDetalhes}
                      onChange={(e) =>
                        setEntradaSelecionada({ ...entradaSelecionada, categoria: e.target.value })
                      }
                    />
                  </label>

                  <label className="campoValor">
                    Valor
                    <div className="wrapperInput">
                      <span className="prefixoValor">R$</span>
                      <input
                        type="text"
                        value={entradaSelecionada.valor}
                        readOnly={!editandoDetalhes}
                        onChange={(e) =>
                          setEntradaSelecionada({ ...entradaSelecionada, valor: e.target.value })
                        }
                      />
                    </div>
                  </label>
                </div>

                <label>
                  Descrição
                  <input
                    type="text"
                    value={entradaSelecionada.itens}
                    readOnly={!editandoDetalhes}
                    onChange={(e) =>
                      setEntradaSelecionada({ ...entradaSelecionada, itens: e.target.value })
                    }
                  />
                </label>

                <label>
                  Anexar comprovante (opcional)
                  <label className="areaUpload" htmlFor="comprovanteDetalhesModal">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 16V4M12 4l-4 4M12 4l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Clique aqui para anexar ou arraste o arquivo aqui</span>
                    <span>PDF, JPG, JPEG ou PNG (máx. 10MB)</span>
                    <input
                      id="comprovanteDetalhesModal"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleArquivoDetalhes}
                    />
                  </label>
                  {nomeArquivoDetalhes && (
                    <span className="nomeArquivo">Arquivo selecionado: {nomeArquivoDetalhes}</span>
                  )}
                </label>

                <label>
                  Observações (opcional)
                  <textarea
                    placeholder="Informações adicionais sobre esta entrada..."
                    value={entradaSelecionada.observacoes}
                    readOnly={!editandoDetalhes}
                    onChange={(e) =>
                      setEntradaSelecionada({ ...entradaSelecionada, observacoes: e.target.value })
                    }
                  />
                </label>

                <div className="acoesDetalhes">
                  <button
                    type="button"
                    className="botaoExcluir"
                    onClick={() => handleExcluirTransacao(entradaSelecionada.id, "/fluxocaixaexcluir2")}
                  >
                    Excluir
                  </button>
                  <button
                    type="button"
                    className="botaoEditar"
                    onClick={() => setEditandoDetalhes(!editandoDetalhes)}
                  >
                    {editandoDetalhes ? "Salvar" : "Editar"}
                  </button>
                  <button
                    type="button"
                    className="botaoVoltarModalDetalhes"
                    onClick={() => setModalDetalhesEntradaAberto(false)}
                  >
                    Voltar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POP-UP: DETALHES DA SAÍDA */}
      {modalDetalhesSaidaAberto && saidaSelecionada && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "820px" }}>
            <div className="modalCabecalho">
              <h2>Detalhes da saída</h2>
              <button
                type="button"
                className="botaoFecharModal"
                onClick={() => setModalDetalhesSaidaAberto(false)}
              >
                &times;
              </button>
            </div>
            <div className="modalCorpo">
              <div className="detalhesSaida">
                <div className="linhaSaida colunas4">
                  <label>
                    Título da saída
                    <input
                      type="text"
                      value={saidaSelecionada.titulo}
                      readOnly={!editandoDetalhesSaida}
                      onChange={(e) =>
                        setSaidaSelecionada({ ...saidaSelecionada, titulo: e.target.value })
                      }
                    />
                  </label>

                  <label className="campoData">
                    Data da saída
                    <div className="wrapperInput">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M3 9h18" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                      <input
                        type="text"
                        value={saidaSelecionada.data}
                        readOnly={!editandoDetalhesSaida}
                        onChange={(e) =>
                          setSaidaSelecionada({ ...saidaSelecionada, data: e.target.value })
                        }
                      />
                    </div>
                  </label>

                  <label>
                    Categoria
                    <input
                      type="text"
                      value={saidaSelecionada.categoria}
                      readOnly={!editandoDetalhesSaida}
                      onChange={(e) =>
                        setSaidaSelecionada({ ...saidaSelecionada, categoria: e.target.value })
                      }
                    />
                  </label>

                  <label className="campoValor">
                    Valor
                    <div className="wrapperInput">
                      <span className="prefixoValor">R$</span>
                      <input
                        type="text"
                        value={saidaSelecionada.valor}
                        readOnly={!editandoDetalhesSaida}
                        onChange={(e) =>
                          setSaidaSelecionada({ ...saidaSelecionada, valor: e.target.value })
                        }
                      />
                    </div>
                  </label>
                </div>

                <div className="linhaSaida colunas2">
                  <label>
                    Descrição
                    <input
                      type="text"
                      value={saidaSelecionada.descricao}
                      readOnly={!editandoDetalhesSaida}
                      onChange={(e) =>
                        setSaidaSelecionada({ ...saidaSelecionada, descricao: e.target.value })
                      }
                    />
                  </label>

                  <label>
                    Fixa ou variável
                    <input
                      type="text"
                      value={saidaSelecionada.tipoDespesa}
                      readOnly={!editandoDetalhesSaida}
                      onChange={(e) =>
                        setSaidaSelecionada({ ...saidaSelecionada, tipoDespesa: e.target.value })
                      }
                    />
                  </label>
                </div>

                <label>
                  Anexar comprovante (opcional)
                  <label className="areaUpload" htmlFor="comprovanteDetalhesSaidaModal">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 16V4M12 4l-4 4M12 4l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Clique aqui para anexar ou arraste o arquivo aqui</span>
                    <span>PDF, JPG, JPEG ou PNG (máx. 10MB)</span>
                    <input
                      id="comprovanteDetalhesSaidaModal"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleArquivoDetalhesSaida}
                    />
                  </label>
                  {nomeArquivoDetalhesSaida && (
                    <span className="nomeArquivo">Arquivo selecionado: {nomeArquivoDetalhesSaida}</span>
                  )}
                </label>

                <label>
                  Observações (opcional)
                  <textarea
                    placeholder="Informações adicionais sobre esta saída..."
                    value={saidaSelecionada.observacoes}
                    readOnly={!editandoDetalhesSaida}
                    onChange={(e) =>
                      setSaidaSelecionada({ ...saidaSelecionada, observacoes: e.target.value })
                    }
                  />
                </label>

                <div className="acoesSaida">
                  <button
                    type="button"
                    className="botaoExcluir"
                    onClick={() => handleExcluirTransacao(saidaSelecionada.id, "/fluxocaixaexcluir1")}
                  >
                    Excluir
                  </button>
                  <button
                    type="button"
                    className="botaoEditar"
                    onClick={() => setEditandoDetalhesSaida(!editandoDetalhesSaida)}
                  >
                    {editandoDetalhesSaida ? "Salvar" : "Editar"}
                  </button>
                  <button
                    type="button"
                    className="botaoVoltarModalSaida"
                    onClick={() => setModalDetalhesSaidaAberto(false)}
                  >
                    Voltar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POP-UP: MOVIMENTAÇÕES RECENTES */}
      {modalMovimentacoesAberto && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "750px" }}>
            <div className="modalCabecalho">
              <h2>Movimentações recentes</h2>
              <button
                type="button"
                className="botaoFecharModal"
                onClick={() => setModalMovimentacoesAberto(false)}
              >
                &times;
              </button>
            </div>
            <div className="modalCorpo">
              <div
                className="listaCompletaMovimentacoes"
                style={{ background: "transparent", border: "none", boxShadow: "none", padding: 0 }}
              >
                {gruposMovimentacoesCompleto.map((grupo) => {
                  const aberto = abertosGrupos[grupo.titulo];
                  return (
                    <div className="grupoMovimentacoes" key={grupo.titulo}>
                      <button
                        type="button"
                        className={`cabecalhoGrupo ${aberto ? "" : "fechado"}`}
                        onClick={() => alternarGrupo(grupo.titulo)}
                      >
                        <h2>{grupo.titulo}</h2>
                        <IconeChevron />
                      </button>

                      {aberto && grupo.itens.length > 0 && (
                        <div className="itensGrupo">
                          {grupo.itens.map((item, i) => (
                            <div
                              className="movimentacao"
                              key={i}
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setModalMovimentacoesAberto(false);
                                if (item.tipo === "entrada") {
                                  abrirDetalhesEntrada(item);
                                } else {
                                  abrirDetalhesSaida(item);
                                }
                              }}
                            >
                              <div className="infoMovimentacaoCompleta">
                                <span
                                  className={`iconeMovimentacaoCompleta ${
                                    item.tipo === "entrada" ? "iconeEntrada" : "iconeSaida"
                                  }`}
                                >
                                  <IconeSeta tipo={item.tipo} />
                                </span>

                                <div className="textoMovimentacao">
                                  <strong>{item.titulo}</strong>
                                  <div className="metaMovimentacao">
                                    <span className="tagTipo">
                                      {item.tipo === "entrada" ? "Entrada" : "Saída"}
                                    </span>
                                    <span className="separador">·</span>
                                    <span>{item.data}</span>
                                    <span className="separador">·</span>
                                    <span>{item.itens}</span>
                                    <span className="separador">·</span>
                                    <span>{item.categoria}</span>
                                  </div>
                                </div>
                              </div>

                              <span className={`valorMovimentacaoCompleta ${item.tipo}`}>
                                {item.tipo === "entrada" ? `+ ${item.valor}` : item.valor}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POP-UP: MAIORES DESPESAS */}
      {modalDespesasAberto && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "700px" }}>
            <div className="modalCabecalho">
              <h2>Maiores despesas</h2>
              <button
                type="button"
                className="botaoFecharModal"
                onClick={() => setModalDespesasAberto(false)}
              >
                &times;
              </button>
            </div>
            <div className="modalCorpo">
              <div
                className="listaCompletaDespesas"
                style={{ background: "transparent", border: "none", boxShadow: "none", padding: 0 }}
              >
                {despesasCompletas.map((d, i) => (
                  <div className="despesa" key={i}>
                    <div className="infoDespesaWrapper">
                      <span className="iconeSaida">
                        <IconeSetaSaida />
                      </span>

                      <div className="infoDespesa">
                        <strong>{d.nome}</strong>
                        <p>
                          <span>Saída</span>
                          <span className="separador">·</span>
                          <span>{d.detalhe}</span>
                        </p>
                      </div>
                    </div>
                    <span className="valorSaida">{d.valor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POP-UP: REGISTRAR NOVA SAÍDA */}
      {modalRegistrarSaidaAberto && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "800px" }}>
            <div className="modalCabecalho">
              <h2>Registrar nova saída</h2>
              <button
                type="button"
                className="botaoFecharModal"
                onClick={() => setModalRegistrarSaidaAberto(false)}
              >
                &times;
              </button>
            </div>
            <div className="modalCorpo">
              <form className="formFluxoCaixaRegistrar" onSubmit={handleSalvarSaida}>
                <div className="linhaFormRegistrar colunas4">
                  <label>
                    Título da saída<span className="obrigatorio">*</span>
                    <input
                      type="text"
                      placeholder="Escreva aqui o título..."
                      value={formSaida.description}
                      onChange={(e) => setFormSaida({ ...formSaida, description: e.target.value })}
                      required
                    />
                  </label>
                  <label className="campoData">
                    Data da saída<span className="obrigatorio">*</span>
                    <div className="wrapperInput">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M3 9h18" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                      <input
                        type="date"
                        value={formSaida.date}
                        onChange={(e) => setFormSaida({ ...formSaida, date: e.target.value })}
                        required
                      />
                    </div>
                  </label>
                  <label>
                    Categoria<span className="obrigatorio">*</span>
                    <select
                      value={formSaida.categoriaVisual}
                      onChange={(e) => setFormSaida({ ...formSaida, categoriaVisual: e.target.value })}
                      required
                    >
                      <option value="" disabled>Selecione uma categoria</option>
                      <option value="insumos">Insumos</option>
                      <option value="folha">Folha de pagamento</option>
                      <option value="custo-fixo">Custo fixo</option>
                      <option value="manutencao">Manutenção</option>
                      <option value="outros">Outros</option>
                    </select>
                  </label>
                  <label className="campoValor">
                    Valor<span className="obrigatorio">*</span>
                    <div className="wrapperInput">
                      <span className="prefixoValor">R$</span>
                      <input
                        type="text"
                        placeholder="0,00"
                        value={formSaida.amount}
                        onChange={(e) => setFormSaida({ ...formSaida, amount: e.target.value })}
                        required
                      />
                    </div>
                  </label>
                </div>

                <div className="linhaFormRegistrar colunas2">
                  <label>
                    Descrição<span className="obrigatorio">*</span>
                    <input
                      type="text"
                      placeholder="Escreva aqui a descrição..."
                      value={formSaida.detalhes}
                      onChange={(e) => setFormSaida({ ...formSaida, detalhes: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    Fixa ou variável<span className="obrigatorio">*</span>
                    <select
                      value={formSaida.category}
                      onChange={(e) => setFormSaida({ ...formSaida, category: e.target.value })}
                      required
                    >
                      <option value="FIXED">Fixa</option>
                      <option value="VARIABLE">Variável</option>
                    </select>
                  </label>
                </div>

                <label>
                  Anexar comprovante (opcional)
                  <label className="areaUpload" htmlFor="comprovanteSaidaModal">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 16V4M12 4l-4 4M12 4l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Clique aqui para anexar ou arraste o arquivo aqui</span>
                    <span>PDF, JPG, JPEG ou PNG (máx. 10MB)</span>
                    <input
                      id="comprovanteSaidaModal"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleArquivoSaida}
                    />
                  </label>
                  {nomeArquivoSaida && (
                    <span className="nomeArquivo">Arquivo selecionado: {nomeArquivoSaida}</span>
                  )}
                </label>

                <label>
                  Observações (opcional)
                  <textarea
                    placeholder="Informações adicionais sobre esta saída..."
                    value={formSaida.observacoes}
                    onChange={(e) => setFormSaida({ ...formSaida, observacoes: e.target.value })}
                  />
                </label>

                <div className="acoesFluxoCaixaRegistrar">
                  <button
                    type="button"
                    className="botaoCancelar"
                    onClick={() => setModalRegistrarSaidaAberto(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="botaoRegistrar">
                    Registrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* POP-UP: REGISTRAR NOVA ENTRADA */}
      {modalRegistrarEntradaAberto && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "800px" }}>
            <div className="modalCabecalho">
              <h2>Registrar nova entrada</h2>
              <button
                type="button"
                className="botaoFecharModal"
                onClick={() => setModalRegistrarEntradaAberto(false)}
              >
                &times;
              </button>
            </div>
            <div className="modalCorpo">
              <form className="formFluxoCaixaEntrada" onSubmit={handleSalvarEntrada}>
                <div className="linhaFormEntrada colunas4">
                  <label>
                    Título da entrada<span className="obrigatorio">*</span>
                    <input
                      type="text"
                      placeholder="Escreva aqui o título..."
                      value={formEntrada.description}
                      onChange={(e) => setFormEntrada({ ...formEntrada, description: e.target.value })}
                      required
                    />
                  </label>
                  <label className="campoData">
                    Data da entrada<span className="obrigatorio">*</span>
                    <div className="wrapperInput">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M3 9h18" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                      <input
                        type="date"
                        value={formEntrada.date}
                        onChange={(e) => setFormEntrada({ ...formEntrada, date: e.target.value })}
                        required
                      />
                    </div>
                  </label>
                  <label>
                    Categoria<span className="obrigatorio">*</span>
                    <select
                      value={formEntrada.categoriaVisual}
                      onChange={(e) => setFormEntrada({ ...formEntrada, categoriaVisual: e.target.value })}
                      required
                    >
                      <option value="" disabled>Selecione uma categoria</option>
                      <option value="venda">Venda de produto</option>
                      <option value="encomenda">Encomenda</option>
                      <option value="outros">Outros</option>
                    </select>
                  </label>
                  <label className="campoValor">
                    Valor<span className="obrigatorio">*</span>
                    <div className="wrapperInput">
                      <span className="prefixoValor">R$</span>
                      <input
                        type="text"
                        placeholder="0,00"
                        value={formEntrada.amount}
                        onChange={(e) => setFormEntrada({ ...formEntrada, amount: e.target.value })}
                        required
                      />
                    </div>
                  </label>
                </div>

                <label>
                  Descrição<span className="obrigatorio">*</span>
                  <input
                    type="text"
                    placeholder="Escreva aqui a descrição..."
                    value={formEntrada.detalhes}
                    onChange={(e) => setFormEntrada({ ...formEntrada, detalhes: e.target.value })}
                    required
                  />
                </label>

                <label>
                  Anexar comprovante (opcional)
                  <label className="areaUpload" htmlFor="comprovanteEntradaModal">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 16V4M12 4l-4 4M12 4l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Clique aqui para anexar ou arraste o arquivo aqui</span>
                    <span>PDF, JPG, JPEG ou PNG (máx. 10MB)</span>
                    <input
                      id="comprovanteEntradaModal"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleArquivoEntrada}
                    />
                  </label>
                  {nomeArquivoEntrada && (
                    <span className="nomeArquivo">Arquivo selecionado: {nomeArquivoEntrada}</span>
                  )}
                </label>

                <label>
                  Observações (opcional)
                  <textarea
                    placeholder="Informações adicionais sobre esta entrada..."
                    value={formEntrada.observacoes}
                    onChange={(e) => setFormEntrada({ ...formEntrada, observacoes: e.target.value })}
                  />
                </label>

                <div className="acoesFluxoCaixaEntrada">
                  <button
                    type="button"
                    className="botaoCancelar"
                    onClick={() => setModalRegistrarEntradaAberto(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="botaoRegistrar">
                    Registrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FluxoCaixa;