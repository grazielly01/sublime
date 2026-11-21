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

function parseValorMoeda(valor) {
  if (typeof valor === "number") return Number.isFinite(valor) ? valor : 0;
  const limpo = String(valor ?? "0")
    .replace(/R\$/gi, "")
    .replace(/\s+/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  const num = Number(limpo);
  return Number.isFinite(num) ? num : 0;
}

function formatarDataParaIso(dataStr) {
  if (!dataStr) return new Date().toISOString().slice(0, 10);
  if (/^\d{4}-\d{2}-\d{2}/.test(dataStr)) return dataStr.slice(0, 10);
  const partes = String(dataStr).split("/");
  if (partes.length === 3) {
    const [dia, mes, ano] = partes;
    return `${ano}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
  }
  return new Date().toISOString().slice(0, 10);
}

function formatarDataParaBr(dataIso) {
  if (!dataIso) return "";
  const limpa = String(dataIso).slice(0, 10);
  const partes = limpa.split("-");
  if (partes.length === 3) {
    const [ano, mes, dia] = partes;
    return `${dia}/${mes}/${ano}`;
  }
  return dataIso;
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
    const nova = { ...dados, id: dados.id ?? Date.now() };
    const atuais = lerLocal();
    salvarLocal([nova, ...atuais]);
    return nova;
  }
}

async function atualizarTransacao(id, dados) {
  try {
    const response = await fetch(`${API_CAIXA}/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
    const texto = await response.text();
    const resultado = texto ? JSON.parse(texto) : {};
    if (!response.ok) {
      throw new Error(resultado.error || "Erro ao atualizar na API");
    }
    const locais = lerLocal();
    if (locais.some((item) => String(item.id) === String(id))) {
      salvarLocal(
        locais.map((item) =>
          String(item.id) === String(id) ? { ...item, ...dados, id } : item
        )
      );
    }
    return { ...dados, ...resultado, id };
  } catch {
    const locais = lerLocal();
    const existeLocal = locais.some((item) => String(item.id) === String(id));
    const atualizada = { ...dados, id };
    const novaLista = existeLocal
      ? locais.map((item) => (String(item.id) === String(id) ? { ...item, ...atualizada } : item))
      : [atualizada, ...locais];
    salvarLocal(novaLista);
    return atualizada;
  }
}

async function listarTransacoes() {
  const locais = lerLocal();
  try {
    const response = await fetch(API_CAIXA, {
      headers: { Accept: "application/json" },
    });
    const texto = await response.text();

    if (!response.ok) {
      throw new Error(`Erro ${response.status} ao carregar transações`);
    }

    const resultado = texto ? JSON.parse(texto) : [];
    const apiLista = Array.isArray(resultado) ? resultado : resultado.data || [];
    const idsApi = new Set(apiLista.map((i) => String(i.id)));
    const apenasLocais = locais.filter((i) => !idsApi.has(String(i.id)));
    return [...apenasLocais, ...apiLista];
  } catch (error) {
    console.warn("API do caixa indisponível; usando dados locais.", error.message);
    return locais;
  }
}

async function excluirTransacao(id) {
  try {
    const response = await fetch(`${API_CAIXA}/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });

    if (!response.ok && response.status !== 404) {
      const texto = await response.text();
      let mensagem = "Erro ao excluir transação";
      try {
        mensagem = texto ? JSON.parse(texto).error || mensagem : mensagem;
      } catch {
        // Resposta não-JSON do servidor
      }
      throw new Error(mensagem);
    }
  } catch (error) {
    const locais = lerLocal();
    const existeLocal = locais.some((item) => String(item.id) === String(id));
    if (!existeLocal) {
      throw error;
    }
  }

  const filtradas = lerLocal().filter((item) => String(item.id) !== String(id));
  salvarLocal(filtradas);
  return true;
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

// Gráficos dinâmicos
const pad2 = (n) => String(n).padStart(2, "0");

function extrairDataPartes(dataValor) {
  const texto = String(dataValor ?? "").trim();

  // Formato ISO: YYYY-MM-DD
  const isoMatch = texto.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    return {
      ano: Number(isoMatch[1]),
      mes: Number(isoMatch[2]),
      dia: Number(isoMatch[3]),
    };
  }

  // Formato BR: DD/MM/YYYY
  const brMatch = texto.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
  if (brMatch) {
    return {
      ano: Number(brMatch[3]),
      mes: Number(brMatch[2]),
      dia: Number(brMatch[1]),
    };
  }

  return { ano: NaN, mes: NaN, dia: NaN };
}

function normalizarTransacao(t) {
  const { ano, mes, dia } = extrairDataPartes(t.date ?? t.dataCompleta ?? t.data);
  return {
    ehEntrada: t.type === "INCOME" || t.tipo === "entrada",
    ehSaida: t.type === "EXPENSE" || t.tipo === "saida",
    valor: Number(t.amount ?? t.valorNumerico ?? parseValorMoeda(t.valor) ?? 0) || 0,
    ano,
    mes,
    dia,
  };
}

function filtrarDoMes(transacoes, mes, ano) {
  return transacoes.filter((t) => {
    const n = normalizarTransacao(t);
    return n.ano === ano && n.mes === mes;
  });
}

function escalaEixo(minimo, maximo, intervalos) {
  const min = Math.min(0, minimo);
  const max = Math.max(0, maximo);
  let passo = 1000;
  let base = 0;

  if (max !== min) {
    let achou = false;
    for (let magnitude = 1; !achou; magnitude *= 10) {
      for (const m of [1, 2, 2.5, 5]) {
        const p = m * magnitude;
        const b = Math.floor(min / p) * p;
        if (b + intervalos * p >= max) {
          passo = p;
          base = b;
          achou = true;
          break;
        }
      }
    }
  }

  const topo = base + intervalos * passo;
  const ticks = Array.from({ length: intervalos + 1 }, (_, i) => topo - i * passo);
  return { base, topo, passo, ticks };
}

function formatarEixo(valor) {
  const abs = Math.abs(valor);
  const texto =
    abs >= 1000
      ? (abs / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + "k"
      : abs.toLocaleString("pt-BR", { maximumFractionDigits: 0 });
  return (valor < 0 ? "-" : "") + texto;
}

function montarDadosGraficos(transacoesDoMes, mes, ano) {
  const diasNoMes = new Date(ano, mes, 0).getDate();
  const lista = transacoesDoMes.map(normalizarTransacao);

  const semanas = [];
  for (let inicio = 1; inicio <= diasNoMes; inicio += 7) {
    semanas.push({ inicio, fim: Math.min(inicio + 6, diasNoMes), entradas: 0, saidas: 0 });
  }

  lista.forEach((t) => {
    const semana = semanas[Math.floor((t.dia - 1) / 7)];
    if (!semana) return;
    if (t.ehEntrada) semana.entradas += t.valor;
    if (t.ehSaida) semana.saidas += t.valor;
  });

  const maiorBarra = Math.max(0, ...semanas.flatMap((s) => [s.entradas, s.saidas]));
  const eixoBarras = escalaEixo(0, maiorBarra, 3);

  const barras = semanas.map((s) => ({
    rotulo: `${pad2(s.inicio)}–${pad2(s.fim)}/${pad2(mes)}`,
    entradas: s.entradas,
    saidas: s.saidas,
    alturaEntrada: (s.entradas / eixoBarras.topo) * 100,
    alturaSaida: (s.saidas / eixoBarras.topo) * 100,
  }));

  const dias = [1, 5, 10, 15, 20, 25, diasNoMes];
  const saldos = dias.map((d) =>
    lista
      .filter((t) => t.dia <= d)
      .reduce((soma, t) => soma + (t.ehEntrada ? t.valor : t.ehSaida ? -t.valor : 0), 0)
  );

  const eixoLinha = escalaEixo(Math.min(...saldos), Math.max(...saldos), 4);

  const Y_TOPO = 10;
  const Y_BASE = 240;
  const pontosLinha = saldos.map((saldo, i) => ({
    x: 20 + i * (960 / (dias.length - 1)),
    y:
      Y_BASE -
      ((saldo - eixoLinha.base) / (eixoLinha.topo - eixoLinha.base)) * (Y_BASE - Y_TOPO),
    saldo,
  }));

  const rotulosLinha = dias.map((d, i) => (i === 0 ? `01/${pad2(mes)}` : pad2(d)));

  return { barras, eixoBarras, eixoLinha, pontosLinha, rotulosLinha };
}

function FluxoCaixa() {
  const navigate = useNavigate();

  const [cardAtivo, setCardAtivo] = useState("margem");
  const [botaoAtivo, setBotaoAtivo] = useState("entrada");

  const [modalMovimentacoesAberto, setModalMovimentacoesAberto] = useState(false);
  const [modalDespesasAberto, setModalDespesasAberto] = useState(false);
  const [modalRegistrarSaidaAberto, setModalRegistrarSaidaAberto] = useState(false);
  const [modalRegistrarEntradaAberto, setModalRegistrarEntradaAberto] = useState(false);
  const [confirmacaoExclusao, setConfirmacaoExclusao] = useState(null);

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
  const [itensBaseRemovidos, setItensBaseRemovidos] = useState([]);

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

  useEffect(() => {
    if (!confirmacaoExclusao) return;
    const aoPressionarEsc = (e) => {
      if (e.key === "Escape") setConfirmacaoExclusao(null);
    };
    document.addEventListener("keydown", aoPressionarEsc);
    return () => document.removeEventListener("keydown", aoPressionarEsc);
  }, [confirmacaoExclusao]);

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
    const valorNumerico = parseValorMoeda(formSaida.amount);

    const payload = {
      description: formSaida.description,
      amount: valorNumerico,
      type: "EXPENSE",
      category: formSaida.category,
      categoriaVisual: formSaida.categoriaVisual || "Insumos",
      detalhes: formSaida.detalhes,
      observacoes: formSaida.observacoes,
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
    const valorNumerico = parseValorMoeda(formEntrada.amount);

    const payload = {
      description: formEntrada.description,
      amount: valorNumerico,
      type: "INCOME",
      category: null,
      categoriaVisual: formEntrada.categoriaVisual || "Venda de produto",
      detalhes: formEntrada.detalhes,
      observacoes: formEntrada.observacoes,
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

  const handleSalvarEdicaoEntrada = async () => {
    if (!entradaSelecionada) return;
    const valorNumerico = parseValorMoeda(entradaSelecionada.valor);
    const dataIso = formatarDataParaIso(entradaSelecionada.data);

    const payload = {
      description: entradaSelecionada.titulo,
      amount: valorNumerico,
      type: "INCOME",
      category: null,
      categoriaVisual: entradaSelecionada.categoria,
      detalhes: entradaSelecionada.itens,
      observacoes: entradaSelecionada.observacoes,
      date: dataIso,
    };

    if (entradaSelecionada.id) {
      await atualizarTransacao(entradaSelecionada.id, payload);
      await carregarTransacoes();
    } else {
      const nova = { ...payload, id: Date.now() };
      const atuais = lerLocal();
      salvarLocal([nova, ...atuais]);
      if (entradaSelecionada.baseKey) {
        setItensBaseRemovidos((prev) => [...prev, entradaSelecionada.baseKey]);
      }
      await carregarTransacoes();
      setEntradaSelecionada((prev) => ({ ...prev, id: nova.id, baseKey: null }));
    }

    setEditandoDetalhes(false);
  };

  const handleSalvarEdicaoSaida = async () => {
    if (!saidaSelecionada) return;
    const valorNumerico = parseValorMoeda(saidaSelecionada.valor);
    const dataIso = formatarDataParaIso(saidaSelecionada.data);
    const categoriaEnum =
      String(saidaSelecionada.tipoDespesa).toLowerCase().includes("fix") ? "FIXED" : "VARIABLE";

    const payload = {
      description: saidaSelecionada.titulo,
      amount: valorNumerico,
      type: "EXPENSE",
      category: categoriaEnum,
      categoriaVisual: saidaSelecionada.categoria,
      detalhes: saidaSelecionada.descricao,
      observacoes: saidaSelecionada.observacoes,
      date: dataIso,
    };

    if (saidaSelecionada.id) {
      await atualizarTransacao(saidaSelecionada.id, payload);
      await carregarTransacoes();
    } else {
      const nova = { ...payload, id: Date.now() };
      const atuais = lerLocal();
      salvarLocal([nova, ...atuais]);
      if (saidaSelecionada.baseKey) {
        setItensBaseRemovidos((prev) => [...prev, saidaSelecionada.baseKey]);
      }
      await carregarTransacoes();
      setSaidaSelecionada((prev) => ({ ...prev, id: nova.id, baseKey: null }));
    }

    setEditandoDetalhesSaida(false);
  };

  const handleExcluirTransacao = async (alvo) => {
    if (!alvo) return;
    const { id, baseKey, rotaFallback } = alvo;

    if (id) {
      try {
        await excluirTransacao(id);
        setTransacoesApi((prev) => prev.filter((item) => String(item.id) !== String(id)));
        await carregarTransacoes();
        setConfirmacaoExclusao(null);
        setModalDetalhesEntradaAberto(false);
        setModalDetalhesSaidaAberto(false);
        return;
      } catch (error) {
        alert(error.message);
        return;
      }
    }

    if (baseKey) {
      setItensBaseRemovidos((prev) => [...prev, baseKey]);
      setConfirmacaoExclusao(null);
      setModalDetalhesEntradaAberto(false);
      setModalDetalhesSaidaAberto(false);
      return;
    }

    setConfirmacaoExclusao(null);
    setModalDetalhesEntradaAberto(false);
    setModalDetalhesSaidaAberto(false);
    if (rotaFallback) {
      navigate(rotaFallback);
    }
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
      baseKey: item.baseKey || null,
      titulo: item.descricao || item.titulo,
      data: formatarDataParaIso(item.dataCompleta || item.data || new Date().toISOString().slice(0, 10)),
      categoria: item.categoria || item.categoriaVisual || "Venda de produto",
      valor: Number(item.valorNumerico ?? parseValorMoeda(item.valor)).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      itens:
        item.itens ||
        item.detalhes ||
        "15 Torta de Limão 22cm, 30 Cupcake Red Velvet, 28 Brownie Avelã, 40 Cupcake Morango",
      observacoes: item.observacoes || "",
    });
    setNomeArquivoDetalhes("");
    setEditandoDetalhes(false);
    setModalDetalhesEntradaAberto(true);
  };

  const abrirDetalhesSaida = (item) => {
    setSaidaSelecionada({
      id: item.id || null,
      baseKey: item.baseKey || null,
      titulo: item.descricao || item.titulo,
      data: formatarDataParaIso(item.dataCompleta || item.data || new Date().toISOString().slice(0, 10)),
      categoria: item.categoria || item.categoriaVisual || "Insumos",
      valor: Number(item.valorNumerico ?? parseValorMoeda(item.valor)).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      descricao:
        item.itens ||
        item.descricao ||
        item.detalhes ||
        "Compra de matéria-prima para produção",
      tipoDespesa:
        item.tipoDespesa || (item.category === "FIXED" ? "Fixa" : "Variável"),
      observacoes: item.observacoes || "",
    });
    setNomeArquivoDetalhesSaida("");
    setEditandoDetalhesSaida(false);
    setModalDetalhesSaidaAberto(true);
  };

  const [abertosGrupos, setAbertosGrupos] = useState({
    Hoje: true,
    Ontem: true,
    "Outras movimentações": true,
  });

  const alternarGrupo = (titulo) => {
    setAbertosGrupos((prev) => ({ ...prev, [titulo]: !prev[titulo] }));
  };

  const movimentosBase = [
    {
      baseKey: "base-0",
      tipo: "entrada",
      descricao: "Venda – Padaria São José",
      valor: "R$ 2.760,00",
      valorNumerico: 2760,
      dataCompleta: "03/05/2026",
      categoria: "Venda de produto",
      itens: "20 Bolo de Cenoura c/ Chocolate, 35 Brigadeiro Gourmet, 15 Torta de Limão",
      observacoes: "Pagamento via PIX na entrega.",
    },
    {
      baseKey: "base-1",
      tipo: "saida",
      descricao: "Compra – Chocolate Callebaut 10kg",
      valor: "R$ 1.240,00",
      valorNumerico: 1240,
      dataCompleta: "03/05/2026",
      categoria: "Compra de insumo",
      itens: "Chocolate ao leite Callebaut 10kg (Lote LT-0421)",
      tipoDespesa: "Variável",
      observacoes: "Fornecedor oficial.",
    },
    {
      baseKey: "base-2",
      tipo: "saida",
      descricao: "Compra – Farinha de trigo 25kg",
      valor: "R$ 615,00",
      valorNumerico: 615,
      dataCompleta: "02/05/2026",
      categoria: "Compra de insumo",
      itens: "Saco de Farinha de trigo especial 25kg",
      tipoDespesa: "Variável",
      observacoes: "",
    },
    {
      baseKey: "base-3",
      tipo: "entrada",
      descricao: "Venda – Vila Bela Bolos",
      valor: "R$ 1.840,00",
      valorNumerico: 1840,
      dataCompleta: "02/05/2026",
      categoria: "Encomenda",
      itens: "12 Bolo Red Velvet, 25 Brownie Tradicional",
      observacoes: "",
    },
    {
      baseKey: "base-4",
      tipo: "saida",
      descricao: "Compra – Chocolate Callebaut 5kg",
      valor: "R$ 625,00",
      valorNumerico: 625,
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
      descricao: t.description || t.descricao || "Movimentação",
      valorNumerico: valorNum,
      valor: valorNum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      dataCompleta: t.date || new Date().toISOString().slice(0, 10),
      categoria: t.categoriaVisual || (ehEntrada ? "Venda de produto" : "Insumos"),
      itens: t.detalhes || t.description || t.descricao || "",
      tipoDespesa: t.category === "FIXED" ? "Fixa" : "Variável",
    };
  });

  const movimentosBaseFormatados = movimentosBase
    .filter((m) => !itensBaseRemovidos.includes(m.baseKey))
    .map((m) => ({
      ...m,
      reactKey: m.baseKey,
    }));

  // Lista consolidada de todas as movimentações ativas (aparecem em Movimentações recentes, cards e gráficos)
  const movimentos = [...movimentosFormatadosApi, ...movimentosBaseFormatados];

  const hoje = new Date();
  const mesSistema = hoje.getMonth() + 1;
  const anoSistema = hoje.getFullYear();
  const hojeIso = hoje.toISOString().slice(0, 10);
  const ontemDate = new Date(hoje);
  ontemDate.setDate(hoje.getDate() - 1);
  const ontemIso = ontemDate.toISOString().slice(0, 10);

  const transacoesConsolidadas = movimentos.map((m) => ({
    ...m,
    type: m.tipo === "entrada" ? "INCOME" : "EXPENSE",
    amount: Number(m.valorNumerico ?? parseValorMoeda(m.valor) ?? 0),
    date: formatarDataParaIso(m.dataCompleta || m.data || hojeIso),
  }));

  const transacoesDoMesAtual = filtrarDoMes(transacoesConsolidadas, mesSistema, anoSistema);

  const primeiraDataValida = transacoesConsolidadas
    .map((t) => extrairDataPartes(t.date))
    .find((d) => !Number.isNaN(d.ano) && !Number.isNaN(d.mes));

  const mesReferencia =
    transacoesDoMesAtual.length > 0
      ? mesSistema
      : primeiraDataValida?.mes || mesSistema;

  const anoReferencia =
    transacoesDoMesAtual.length > 0
      ? anoSistema
      : primeiraDataValida?.ano || anoSistema;

  const transacoesParaCalculo =
    transacoesDoMesAtual.length > 0
      ? transacoesDoMesAtual
      : filtrarDoMes(transacoesConsolidadas, mesReferencia, anoReferencia);

  const dataRef = new Date(anoReferencia, mesReferencia - 1, 1);
  const nomeMesRaw = dataRef.toLocaleDateString("pt-BR", { month: "long" });
  const nomeMes = nomeMesRaw.charAt(0).toUpperCase() + nomeMesRaw.slice(1);

  const resumo = calcularFluxoCaixa(transacoesParaCalculo);
  const graficos = montarDadosGraficos(transacoesParaCalculo, mesReferencia, anoReferencia);

  const margemLucro =
    resumo.totalEntradas > 0
      ? ((resumo.saldoFinal / resumo.totalEntradas) * 100).toFixed(1).replace(".", ",")
      : "0,0";

  const formatarMoeda = (num) =>
    Number(num).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  // Grupos dinâmicos para o pop-up "Movimentações recentes"
  const mapearItemModal = (item) => ({
    id: item.id,
    baseKey: item.baseKey || null,
    tipo: item.tipo,
    titulo: item.descricao,
    data: formatarDataParaBr(item.dataCompleta).slice(0, 5) || "Hoje",
    dataCompleta: item.dataCompleta,
    itens: item.itens || item.descricao,
    categoria: item.categoria,
    tipoDespesa: item.tipoDespesa,
    observacoes: item.observacoes || "",
    valorNumerico: item.valorNumerico,
    valor: Number(item.valorNumerico).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
  });

  const itensHoje = movimentos
    .filter((item) => formatarDataParaIso(item.dataCompleta) === hojeIso)
    .map(mapearItemModal);

  const itensOntem = movimentos
    .filter((item) => formatarDataParaIso(item.dataCompleta) === ontemIso)
    .map(mapearItemModal);

  const itensOutrasDatas = movimentos
    .filter((item) => {
      const iso = formatarDataParaIso(item.dataCompleta);
      return iso !== hojeIso && iso !== ontemIso;
    })
    .map(mapearItemModal);

  const gruposMovimentacoesCompleto = [
    {
      titulo: "Hoje",
      itens: itensHoje,
    },
    {
      titulo: "Ontem",
      itens: itensOntem,
    },
    {
      titulo: "Outras movimentações",
      itens: itensOutrasDatas,
    },
  ];

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
              Entradas, saídas e saldo consolidado de {nomeMes}/{anoReferencia}.
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
                {graficos.eixoBarras.ticks.map((valor) => (
                  <span key={valor}>{formatarEixo(valor)}</span>
                ))}
              </div>

              <div className="areaBarras">
                <div className="linhaGrafico linha60"></div>
                <div className="linhaGrafico linha40"></div>
                <div className="linhaGrafico linha20"></div>
                <div className="linhaGrafico linha0"></div>

                {graficos.barras.map((b) => (
                  <div className="grupoBarras" key={b.rotulo}>
                    <div className="parBarras">
                      <div
                        className="barra entrada"
                        style={{ height: `${b.alturaEntrada}%` }}
                        title={`Entradas: ${formatarMoeda(b.entradas)}`}
                      ></div>
                      <div
                        className="barra saida"
                        style={{ height: `${b.alturaSaida}%` }}
                        title={`Saídas: ${formatarMoeda(b.saidas)}`}
                      ></div>
                    </div>
                    <span>{b.rotulo}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* EVOLUÇÃO DO SALDO */}
          <section className="cardGraficoFluxo">
            <div className="cabecalhoCardFluxo">
              <h2>Evolução do saldo</h2>
            </div>
            <div className="graficoLinha">
              <div className="eixoLinhaY">
                {graficos.eixoLinha.ticks.map((valor) => (
                  <span key={valor}>{formatarEixo(valor)}</span>
                ))}
              </div>

              <div className="campoLinhaGrafico">
                <div className="linhasLinha">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>

                <svg className="svgLinha" viewBox="0 0 1000 250" preserveAspectRatio="none">
                  <polyline
                    points={graficos.pontosLinha.map((p) => `${p.x},${p.y}`).join(" ")}
                    fill="none"
                    stroke="#9d0926"
                    strokeWidth="3"
                  />
                  {graficos.pontosLinha.map((p) => (
                    <circle key={p.x} cx={p.x} cy={p.y} r="5">
                      <title>{formatarMoeda(p.saldo)}</title>
                    </circle>
                  ))}
                </svg>

                <div className="datasLinha">
                  {graficos.rotulosLinha.map((rotulo, i) => (
                    <span key={i}>{rotulo}</span>
                  ))}
                </div>
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
                        type="date"
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
                    onClick={() =>
                      setConfirmacaoExclusao({
                        tipo: "entrada",
                        id: entradaSelecionada.id,
                        baseKey: entradaSelecionada.baseKey,
                        titulo: entradaSelecionada.titulo,
                        valor: entradaSelecionada.valor,
                      })
                    }
                  >
                    Excluir
                  </button>
                  <button
                    type="button"
                    className="botaoEditar"
                    onClick={() => {
                      if (editandoDetalhes) {
                        handleSalvarEdicaoEntrada();
                      } else {
                        setEditandoDetalhes(true);
                      }
                    }}
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
                        type="date"
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
                    onClick={() =>
                      setConfirmacaoExclusao({
                        tipo: "saida",
                        id: saidaSelecionada.id,
                        baseKey: saidaSelecionada.baseKey,
                        titulo: saidaSelecionada.titulo,
                        valor: saidaSelecionada.valor,
                      })
                    }
                  >
                    Excluir
                  </button>
                  <button
                    type="button"
                    className="botaoEditar"
                    onClick={() => {
                      if (editandoDetalhesSaida) {
                        handleSalvarEdicaoSaida();
                      } else {
                        setEditandoDetalhesSaida(true);
                      }
                    }}
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

                      {aberto && (
                        <div className="itensGrupo">
                          {grupo.itens.length === 0 ? (
                            <p style={{ padding: "12px 16px", color: "#7A6E6C", fontSize: "13px" }}>
                              Nenhuma movimentação registrada neste período.
                            </p>
                          ) : (
                            grupo.itens.map((item, i) => (
                              <div
                                className="movimentacao"
                                key={item.id || item.baseKey || `${grupo.titulo}-${i}`}
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
                            ))
                          )}
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
                      <option value="Insumos">Insumos</option>
                      <option value="Folha de pagamento">Folha de pagamento</option>
                      <option value="Custo fixo">Custo fixo</option>
                      <option value="Manutenção">Manutenção</option>
                      <option value="Outros">Outros</option>
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
                      <option value="Venda de produto">Venda de produto</option>
                      <option value="Encomenda">Encomenda</option>
                      <option value="Outros">Outros</option>
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

      {/* POP-UP DE EXCLUSÃO */}
      {confirmacaoExclusao && (
        <div
          className="modalOverlay"
          style={{ zIndex: 1100 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setConfirmacaoExclusao(null);
          }}
        >
          <div
            className="modalConteudo modalConfirmacaoExclusao"
            role="dialog"
            aria-modal="true"
            aria-labelledby="tituloConfirmacaoExclusao"
          >
            <div className="modalCabecalho">
              <h2 id="tituloConfirmacaoExclusao">
                Confirmar exclusão {confirmacaoExclusao.tipo === "entrada" ? "da entrada" : "da saída"}
              </h2>
              <button
                type="button"
                className="botaoFecharModal"
                aria-label="Fechar confirmação"
                onClick={() => setConfirmacaoExclusao(null)}
              >
                &times;
              </button>
            </div>

            <div className="modalCorpo">
              <p className="textoConfirmacaoExclusao">
                Tem certeza que deseja excluir{" "}
                <strong>{confirmacaoExclusao.titulo || "esta movimentação"}</strong>
                {confirmacaoExclusao.valor ? ` (R$ ${confirmacaoExclusao.valor})` : ""}? Essa ação não poderá ser desfeita.
              </p>

              <div className="acoesConfirmacaoExclusao">
                <button
                  type="button"
                  className="botaoCancelar"
                  onClick={() => setConfirmacaoExclusao(null)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="botaoExcluir"
                  onClick={() => handleExcluirTransacao(confirmacaoExclusao)}
                >
                  Sim, excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FluxoCaixa;