import "./dashboard.css";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { motion } from "motion/react";

const metasPadrao = [
  { id: "m1", titulo: "Meta de faturamento", tipo: "moeda", atual: 91000, meta: 100000 },
  { id: "m2", titulo: "Pedidos do mês", tipo: "numero", atual: 142, meta: 160 },
  { id: "m3", titulo: "Novos clientes B2B", tipo: "numero", atual: 7, meta: 10 },
];

const LIMITE_DE_METAS = 6;
const CHAVE_METAS = "dashboardMetas";

function formatarValor(valor, tipo) {
  const n = Number(valor) || 0;

  if (tipo === "moeda") {
    if (Math.abs(n) >= 1000) {
      return `R$ ${(n / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}k`;
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

function lerMetasSalvas() {
  try {
    const bruto = localStorage.getItem(CHAVE_METAS);
    if (!bruto) return metasPadrao;

    const lista = JSON.parse(bruto);
    const valida =
      Array.isArray(lista) &&
      lista.every(
        (m) =>
          m &&
          typeof m.titulo === "string" &&
          Number.isFinite(Number(m.atual)) &&
          Number.isFinite(Number(m.meta))
      );

    if (!valida) return metasPadrao;

    return lista.map((m, i) => ({
      id: m.id ?? `salva${i}`,
      titulo: m.titulo,
      tipo: m.tipo === "moeda" ? "moeda" : "numero",
      atual: Number(m.atual),
      meta: Number(m.meta),
    }));
  } catch {
    return metasPadrao;
  }
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

/* =========================================================
   POP-UP GENÉRICO DE DETALHES / GERENCIAMENTO DOS CARDS
========================================================= */
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
      if (e.key === "Escape" && fecharRef.current) fecharRef.current();
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
    if (focaveis.length === 0) return;
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
      subtitulo: "Detalhes de volume de vendas e participação no card.",
    },
    alertasEstoque: {
      titulo: "Alertas de estoque & validade",
      subtitulo: "Alertas ativos de cobertura, validade e sugestão de compra.",
    },
    lotesVencimento: {
      titulo: "Controle de lotes próximos ao vencimento",
      subtitulo: "Lotes monitorados por quantidade e prazo de validade.",
    },
    proximasEntregas: {
      titulo: "Próximas entregas",
      subtitulo: "Pedidos agendados, produtos e prioridades de entrega.",
    },
    topClientesB2B: {
      titulo: "Top clientes B2B",
      subtitulo: "Clientes com maior volume de pedidos, LTV e status atual.",
    },
    alertasCriticos: {
      titulo: "Alertas críticos",
      subtitulo: "Todos os alertas críticos registrados na operação.",
    },
    fornecedoresAtraso: {
      titulo: "Fornecedores em atraso",
      subtitulo: "Atrasos, avaliações, últimas entregas e recomendação do card.",
    },
  };

  const info = configuracoes[cardKey] || { titulo: "Detalhes", subtitulo: "" };

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
            <h2 id="gmDetalhesTitulo" className="gmTitulo">
              {info.titulo}
            </h2>
            <p className="gmSubtitulo">{info.subtitulo}</p>
          </div>

          <button
            ref={botaoXRef}
            type="button"
            className="gmBotaoX"
            onClick={fechar}
            aria-label="Fechar"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="gmCorpo">
          {cardKey === "topProdutos" && (
            <div className="listaProdutosDashboard" style={{ marginTop: 4 }}>
              {dados.produtos.map((produto, i) => (
                <div className="produtoDashboard" key={i}>
                  <div className="produtoNome">
                    <span>
                      #{i + 1} · {produto.nome}
                    </span>
                    <strong>{produto.quantidade.toLocaleString("pt-BR")} un.</strong>
                  </div>
                  <div className="barraProduto">
                    <div style={{ width: `${(produto.quantidade / 4200) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cardKey === "alertasEstoque" && (
            <>
              <div className="listaAlertas">
                {dados.alertas.slice(0, 2).map((alerta, i) => (
                  <div className="alertaDashboard" key={i}>
                    <span className={`pontoAlerta ${alerta.nivel}`}></span>
                    <div>
                      <small>{alerta.tipo}</small>
                      <p>{alerta.mensagem}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="sugestaoDashboard">
                <b>Sugestão:</b> Comprar 40kg de chocolate ao leite e 15kg de manteiga nos
                próximos 3 dias.
              </div>
            </>
          )}

          {cardKey === "lotesVencimento" && (
            <div className="tabelaDashboard">
              <div className="linhaTabela cabecalhoTabela">
                <span>Lote</span>
                <span>Produto</span>
                <span>Qtd</span>
                <span>Vence</span>
              </div>
              {dados.lotes.map((lote, i) => (
                <div className="linhaTabela" key={i}>
                  <span>{lote.codigo}</span>
                  <span>{lote.produto}</span>
                  <span>{lote.qtd}</span>
                  <b className={lote.badgeClass}>{lote.vence}</b>
                </div>
              ))}
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
                <span>Cliente</span>
                <span>Pedidos</span>
                <span>LTV</span>
                <span>Status</span>
              </div>
              {dados.clientes.map((cliente, i) => (
                <div className="linhaTabela" key={i}>
                  <strong>{cliente.nome}</strong>
                  <span>{cliente.pedidos}</span>
                  <span>{cliente.ltv}</span>
                  <b
                    className={`statusCliente ${cliente.status
                      .toLowerCase()
                      .replace("ã", "a")}`}
                  >
                    {cliente.status}
                  </b>
                </div>
              ))}
            </div>
          )}

          {cardKey === "alertasCriticos" && (
            <div className="listaAlertas">
              {dados.alertas.map((alerta, i) => (
                <div className="alertaDashboard" key={i}>
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
                  <span>Fornecedor</span>
                  <span>Atraso</span>
                  <span>Nota</span>
                  <span>Última entrega</span>
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
                <b>Recomendação:</b> Avalie substituir Embalagens Rápido — nota 2,5 e 8 dias de
                atraso médio nos últimos 3 meses.
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

/* pop-up de gerenciar metas */
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
      if (e.key === "Escape" && fecharRef.current) fecharRef.current();
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
    if (focaveis.length === 0) return;

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
    setRascunho((atual) => atual.map((m) => (m.id === id ? { ...m, [campo]: valor } : m)));

    setErros((atual) => {
      if (!atual[id] || !atual[id][campo]) return atual;
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

  function salvar(e) {
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

      if (Object.keys(erro).length > 0) novosErros[m.id] = erro;
    });

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      setTimeout(() => {
        janelaRef.current?.querySelector('[aria-invalid="true"]')?.focus();
      }, 0);
      return;
    }

    onSalvar(
      rascunho.map((m) => ({
        id: m.id,
        titulo: m.titulo.trim(),
        tipo: m.tipo,
        atual: Number(m.atual),
        meta: Number(m.meta),
      }))
    );

    fechar();
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
                          inputMode="decimal"
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
                          inputMode="decimal"
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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

function Dashboard() {
  const [metas, setMetas] = useState(lerMetasSalvas);
  const [modalMetasAberto, setModalMetasAberto] = useState(false);
  const [modalCardAtivo, setModalCardAtivo] = useState(null);
  const [avisoMetas, setAvisoMetas] = useState(false);
  const botaoGerenciarRef = useRef(null);
  const avisoTimerRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_METAS, JSON.stringify(metas));
    } catch {
      /* se o navegador bloquear o armazenamento, só não salva */
    }
  }, [metas]);

  useEffect(() => {
    return () => clearTimeout(avisoTimerRef.current);
  }, []);

  function salvarMetas(novasMetas) {
    setMetas(novasMetas);
    setAvisoMetas(true);
    clearTimeout(avisoTimerRef.current);
    avisoTimerRef.current = setTimeout(() => setAvisoMetas(false), 2600);
  }

  function fecharModalMetas() {
    setModalMetasAberto(false);
    botaoGerenciarRef.current?.focus();
  }

  const resumo = [
    { titulo: "Estoque", status: "OK", tipo: "ok", icone: "✓" },
    { titulo: "Produção", status: "Atenção", tipo: "atencao", icone: "!" },
    { titulo: "Pedidos", status: "Urgente", tipo: "urgente", icone: "×" },
    { titulo: "Financeiro", status: "Estável", tipo: "estavel", icone: "✓" },
  ];

  const kpis = [
    { titulo: "Lucro estimado (mês)", valor: "R$ 47.000", variacao: "+9,3%", tipo: "positivo", icone: "R$" },
    { titulo: "Perdas em R$", valor: "R$ 2.912", variacao: "-12,1%", tipo: "positivo", icone: "↓" },
    { titulo: "Faturamento (mês)", valor: "R$ 91.430", variacao: "+12,4%", tipo: "positivo", icone: "R$" },
    { titulo: "Inadimplência", valor: "1,8%", variacao: "-0,4pp", tipo: "positivo", icone: "%" },
  ];

  const fluxoSemana = [
    { dia: "Seg", entrada: 12400, saida: 8200 },
    { dia: "Ter", entrada: 9800, saida: 6100 },
    { dia: "Qua", entrada: 15200, saida: 11400 },
    { dia: "Qui", entrada: 11000, saida: 7300 },
    { dia: "Sex", entrada: 18900, saida: 9200 },
    { dia: "Sáb", entrada: 22400, saida: 5800 },
  ];

  const produtos = [
    { nome: "Brigadeiro Gourmet", quantidade: 4200 },
    { nome: "Cupcake Sortido", quantidade: 3100 },
    { nome: "Torta de Limão", quantidade: 2400 },
    { nome: "Bolo Red Velvet", quantidade: 1900 },
    { nome: "Copo da Felicidade", quantidade: 1650 },
  ];

  const lotes = [
    { codigo: "#L2206", produto: "Leite condensado", qtd: "120 un", vence: "5 dias", badgeClass: "badgeUrgente" },
    { codigo: "#L2198", produto: "Creme de leite", qtd: "85 un", vence: "12 dias", badgeClass: "badgeAtencao" },
    { codigo: "#L2185", produto: "Farinha de trigo", qtd: "200 kg", vence: "28 dias", badgeClass: "badgeNormal" },
  ];

  const clientes = [
    { nome: "Padaria Pão Quente", pedidos: 28, ltv: "R$ 42.800", status: "Ativo" },
    { nome: "Mercado Vila Nova", pedidos: 22, ltv: "R$ 36.200", status: "Ativo" },
    { nome: "Rede Doce Mel", pedidos: 19, ltv: "R$ 31.900", status: "Atenção" },
    { nome: "Café Central", pedidos: 14, ltv: "R$ 18.400", status: "Ativo" },
    { nome: "Empório Sabor", pedidos: 11, ltv: "R$ 14.200", status: "Inativo" },
  ];

  const entregas = [
    { cliente: "Padaria Pão Quente", produto: "300 brigadeiros", quando: "Hoje 14h", urgente: true },
    { cliente: "Mercado Vila Nova", produto: "80 tortas de limão", quando: "Amanhã 09h", urgente: false },
    { cliente: "Café Central", produto: "120 cupcakes", quando: "Amanhã 16h", urgente: false },
    { cliente: "Rede Doce Mel", produto: "Bolos sortidos (45kg)", quando: "Sex 08h", urgente: false },
  ];

  const alertas = [
    { tipo: "Estoque", mensagem: "Chocolate ao leite — 2 dias de cobertura", nivel: "alta" },
    { tipo: "Validade", mensagem: "Lote #L2206 vence em 5 dias", nivel: "media" },
    { tipo: "Financeiro", mensagem: "3 faturas vencendo nesta semana", nivel: "media" },
    { tipo: "Produção", mensagem: "Forno 2 — manutenção preventiva atrasada", nivel: "alta" },
  ];

  const fornecedores = [
    { nome: "Distribuidora Açúcar & Cia", atraso: "12d", nota: "2,8", ultima: "10/06/2026" },
    { nome: "Laticínios Sul", atraso: "5d", nota: "3,2", ultima: "14/06/2026" },
    { nome: "Embalagens Rápido", atraso: "8d", nota: "2,5", ultima: "11/06/2026" },
  ];

  const indicadores = [
    { titulo: "Margem média", valor: "42%" },
    { titulo: "Ticket médio B2B", valor: "R$ 1.180" },
    { titulo: "Perdas de produção", valor: "3,2%" },
    { titulo: "Prazo médio entrega", valor: "2,4 dias" },
    { titulo: "Produção do dia", valor: "3.280 un." },
  ];

  const dadosModal = {
    produtos,
    lotes,
    clientes,
    entregas,
    alertas,
    fornecedores,
  };

  return (
    <div className="tudoDashboard">
      <Sidebar paginaAtiva="Dashboard" />

      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset" />

        <main className="conteudoDashboard">
          {/* CABEÇALHO */}
          <div className="topoDashboard">
            <div>
              <h1 className="tituloDashboard">Dashboard</h1>
              <p className="subtituloDashboard">
                Visão completa da operação industrial em tempo real.
              </p>
            </div>
          </div>

          {/* PERÍODOS E EXPORTAR */}
          <div className="divSeiLa">
            <div className="acoesDashboard">
              <button className="botaoPeriodo">7d</button>
              <button className="botaoPeriodo ativo">30d</button>
              <button className="botaoPeriodo">90d</button>
              <button className="botaoPeriodo">Ano</button>

              <button className="botaoDashboardSecundario">
                📅 Período
              </button>

              <button className="botaoDashboardSecundario">
                ↓ Exportar
              </button>
            </div>
          </div>

          {/* RESUMO POR SETOR */}
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
                    <span className={`badgeKpiDashboard ${k.tipo}`}>↗ {k.variacao}</span>
                  </div>
                  <p className="tituloKpiDashboard">{k.titulo}</p>
                  <strong className="valorKpiDashboard">{k.valor}</strong>
                </div>
              ))}
            </div>

            <div className="gridFinanceiro">
              {/* GRÁFICO */}
              <div className="cardDashboard graficoReceita">
                <div className="cabecalhoCardDashboard">
                  <h3>Receita, custo e meta</h3>
                  <span className="badgeSucesso">↗ Acima da meta</span>
                </div>

                <div className="graficoArea">
                  <div className="linhasGrafico">
                    <span>100k</span>
                    <span>75k</span>
                    <span>50k</span>
                    <span>25k</span>
                    <span>0</span>
                  </div>

                  <div className="graficoColunas">
                    {[52, 58, 67, 74, 84, 91].map((valor, i) => (
                      <div className="grupoGrafico" key={i}>
                        <div className="barraReceita" style={{ height: `${valor}%` }}></div>
                        <div className="barraCusto" style={{ height: `${valor * 0.48}%` }}></div>
                        <span>{["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="legendaGrafico">
                  <span><i className="legendaReceita"></i>Receita</span>
                  <span><i className="legendaCusto"></i>Custo</span>
                  <span><i className="legendaMeta"></i>Meta</span>
                </div>
              </div>

              {/* METAS */}
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
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

            {/* FLUXO + INSIGHTS */}
            <div className="gridDoisDashboard">
              <div className="cardDashboard">
                <div className="cabecalhoCardDashboard">
                  <h3>Fluxo da semana</h3>
                </div>

                <div className="fluxoDashboard">
                  {fluxoSemana.map((dia, i) => {
                    const maior = Math.max(dia.entrada, dia.saida);

                    return (
                      <div className="diaFluxo" key={i}>
                        <div className="barrasFluxo">
                          <div
                            className="barraEntrada"
                            style={{ height: `${(dia.entrada / maior) * 100}%` }}
                          ></div>
                          <div
                            className="barraSaida"
                            style={{ height: `${(dia.saida / maior) * 75}%` }}
                          ></div>
                        </div>
                        <span>{dia.dia}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="legendaGrafico">
                  <span><i className="legendaReceita"></i>Entrada</span>
                  <span><i className="legendaCusto"></i>Saída</span>
                </div>
              </div>

              <div className="cardDashboard insightsDashboard">
                <div className="cabecalhoCardDashboard">
                  <h3>Insights financeiros</h3>
                </div>

                <div className="insight positivo">
                  <strong>↗ Oportunidade</strong>
                  <p>
                    Brigadeiro Gourmet cresceu <b>+38%</b> em 30 dias.
                    Considere aumentar a produção em 15%.
                  </p>
                </div>

                <div className="insight atencao">
                  <strong>↘ Atenção</strong>
                  <p>
                    <b>Rede Doce Mel</b> reduziu pedidos em 22%. Recomendamos contato comercial.
                  </p>
                </div>

                <div className="insight estoque">
                  <strong>Estoque</strong>
                  <p>
                    Compra sugerida: <b>40kg de chocolate ao leite</b> para cobrir 30 dias.
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
                    <strong>78%</strong>
                    <span>OEE</span>
                  </div>
                </div>

                <div className="indicadoresOee">
                  <div>
                    <strong>92%</strong>
                    <span>Disponib.</span>
                  </div>
                  <div>
                    <strong>88%</strong>
                    <span>Performance</span>
                  </div>
                  <div>
                    <strong>96%</strong>
                    <span>Qualidade</span>
                  </div>
                </div>
              </div>

              <div className="cardDashboard">
                <h3>Mix de produção</h3>

                <div className="mixDashboard">
                  <div className="pizzaMix"></div>

                  <div className="legendaMix">
                    <span><i></i> Bolos <b>38%</b></span>
                    <span><i></i> Doces finos <b>27%</b></span>
                    <span><i></i> Tortas <b>19%</b></span>
                    <span><i></i> Sazonais <b>16%</b></span>
                  </div>
                </div>
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
                  {produtos.map((produto, i) => (
                    <div className="produtoDashboard" key={i}>
                      <div className="produtoNome">
                        <span>{produto.nome}</span>
                        <strong>{produto.quantidade.toLocaleString("pt-BR")}</strong>
                      </div>
                      <div className="barraProduto">
                        <div style={{ width: `${(produto.quantidade / 4200) * 100}%` }}></div>
                      </div>
                    </div>
                  ))}
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
                  {alertas.slice(0, 2).map((alerta, i) => (
                    <div className="alertaDashboard" key={i}>
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
                    <span>Lote</span>
                    <span>Produto</span>
                    <span>Qtd</span>
                    <span>Vence</span>
                  </div>

                  {lotes.map((lote, i) => (
                    <div className="linhaTabela" key={i}>
                      <span>{lote.codigo}</span>
                      <span>{lote.produto}</span>
                      <span>{lote.qtd}</span>
                      <b className={lote.badgeClass}>{lote.vence}</b>
                    </div>
                  ))}
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
                    <span>LTV</span>
                    <span>Status</span>
                  </div>

                  {clientes.map((cliente, i) => (
                    <div className="linhaTabela" key={i}>
                      <strong>{cliente.nome}</strong>
                      <span>{cliente.pedidos}</span>
                      <span>{cliente.ltv}</span>
                      <b
                        className={`statusCliente ${cliente.status
                          .toLowerCase()
                          .replace("ã", "a")}`}
                      >
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
                    onClick={() => setModalCardAtivo("alertasCriticos")}
                  >
                    Ver todos
                  </button>
                </div>

                <div className="listaAlertas">
                  {alertas.map((alerta, i) => (
                    <div className="alertaDashboard" key={i}>
                      <span className={`pontoAlerta ${alerta.nivel}`}></span>
                      <div>
                        <small>{alerta.tipo}</small>
                        <p>{alerta.mensagem}</p>
                      </div>
                    </div>
                  ))}
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
                  <b>Recomendação:</b> Avalie substituir Embalagens Rápido — nota 2,5 e 8 dias
                  de atraso médio nos últimos 3 meses.
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

      {/* Popup de gerenciar metas e aviso de "salvo" */}
      {modalMetasAberto &&
        createPortal(
          <ModalGerenciarMetas
            metas={metas}
            onSalvar={salvarMetas}
            onFechar={fecharModalMetas}
          />,
          document.body
        )}

      {/* Popup de detalhes / gerenciamento dos cards */}
      {modalCardAtivo &&
        createPortal(
          <ModalDetalhesCard
            cardKey={modalCardAtivo}
            dados={dadosModal}
            onFechar={() => setModalCardAtivo(null)}
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