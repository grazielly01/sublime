import { useState } from "react";
import "./Producao.css";
import "./registrarProducao.css";
import "./excluirOrdem.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";

const initialOrders = [
  { id: 1, name: "Brigadeiro Gourmet", team: "Equipe A", total: 480, done: 360, status: "Em andamento", time: "45 min restantes", prazo: "2026-08-20", kind: "progressing" },
  { id: 2, name: "Cupcake Red Velvet", team: "Equipe B", total: 200, done: 200, status: "Concluído", time: "Finalizado às 10h12", prazo: "2026-08-20", kind: "finished" },
  { id: 3, name: "Torta de Limão 22cm", team: "Equipe A", total: 18, done: 6, status: "Em andamento", time: "1h 20min restantes", prazo: "2026-08-21", kind: "progressing" },
  { id: 4, name: "Copo da Felicidade 250ml", team: "Equipe C", total: 120, done: 0, status: "Na fila", time: "Iniciar 14h00", prazo: "2026-08-21", kind: "queued" },
  { id: 5, name: "Bolo de Chocolate 1kg", team: "Equipe B", total: 30, done: 0, status: "Na fila", time: "Iniciar 15h30", prazo: "2026-08-22", kind: "queued" },
];

//testando
export default function Producao() {
  const [orders, setOrders] = useState(initialOrders);

  // Estados do pop-up Registrar Nova Ordem
  const [modalNovaOrdemAberto, setModalNovaOrdemAberto] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    quantidade: "",
    prazo: "",
  });

  // Estados do pop-up Detalhes da Ordem
  const [modalDetalhesOrdemAberto, setModalDetalhesOrdemAberto] = useState(false);
  const [ordemSelecionada, setOrdemSelecionada] = useState(null);
  const [editandoOrdem, setEditandoOrdem] = useState(false);

  // Estado do pop-up Confirmar Exclusão
  const [modalConfirmarExclusaoAberto, setModalConfirmarExclusaoAberto] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitNovaOrdem = (e) => {
    e.preventDefault();
    const qtdNumerica = parseInt(form.quantidade, 10) || 1;
    const dataFormatada = form.prazo
      ? form.prazo.split("-").reverse().join("/")
      : "Hoje";

    const novaOrdem = {
      id: Date.now(),
      name: form.nome,
      team: "Equipe A",
      total: qtdNumerica,
      done: 0,
      status: "Na fila",
      time: `Prazo: ${dataFormatada}`,
      prazo: form.prazo || "2026-08-20",
      kind: "queued",
    };

    setOrders((prev) => [novaOrdem, ...prev]);
    setForm({ nome: "", quantidade: "", prazo: "" });
    setModalNovaOrdemAberto(false);
  };

  // Abre o modal de Detalhes da Ordem
  const abrirDetalhesOrdem = (order) => {
    setOrdemSelecionada({ ...order });
    setEditandoOrdem(false);
    setModalDetalhesOrdemAberto(true);
  };

  // Salva edição da ordem selecionada
  const salvarEdicaoOrdem = () => {
    setOrders((prev) =>
      prev.map((o) => (o.id === ordemSelecionada.id ? ordemSelecionada : o))
    );
    setEditandoOrdem(false);
  };

  // Abre o modal de Confirmação de Exclusão
  const solicitarExclusaoOrdem = () => {
    setModalDetalhesOrdemAberto(false);
    setModalConfirmarExclusaoAberto(true);
  };

  // Exclui definitivamente a ordem da lista
  const confirmarExclusaoOrdem = () => {
    if (ordemSelecionada) {
      setOrders((prev) => prev.filter((o) => o.id !== ordemSelecionada.id));
    }
    setModalConfirmarExclusaoAberto(false);
    setOrdemSelecionada(null);
  };

  function updateOrder(index, changes) {
    setOrders((current) =>
      current.map((order, pos) =>
        pos === index ? { ...order, ...changes } : order
      )
    );
  }

  function startOrder(index) {
    updateOrder(index, {
      kind: "progressing",
      status: "Em andamento",
      time: "1h 30min restantes",
    });
  }

  function finishOrder(index) {
    const order = orders[index];
    updateOrder(index, {
      done: order.total,
      kind: "finished",
      status: "Concluído",
      time: "Finalizado agora",
    });
  }

  return (
    <div className="production-page">
      <Sidebar paginaAtiva="Produção" />
      <Header nomeIndustria="Sweet Sunset" />

      <main>
        {/* título + botão */}
        <section className="title-row">
          <div>
            <h1 className="page-title">Produção</h1>
            <p className="page-lead">
              Planejamento e acompanhamento das ordens de produção de hoje.
            </p>
          </div>
          <button
            type="button"
            className="btnnovaordem"
            onClick={() => setModalNovaOrdemAberto(true)}
          >
            Nova ordem
          </button>
        </section>

        {/* cards resumo */}
        <section className="metrics">
          <article className="metric">
            <div className="metric-label">META DO DIA</div>
            <div className="metric-number">1.420 un</div>
            <div className="mini-track"><span /></div>
            <div className="metric-text complete-rate">87% concluído</div>
          </article>

          <article className="metric">
            <div className="metric-label">ORDENS ATIVAS</div>
            <div className="metric-number wine">{orders.length}</div>
            <div className="metric-text">
              {orders.filter((o) => o.kind === "progressing").length} em andamento ·{" "}
              {orders.filter((o) => o.kind === "queued").length} na fila ·{" "}
              {orders.filter((o) => o.kind === "finished").length} concluída
            </div>
          </article>

          <article className="metric">
            <div className="metric-label">PERDAS HOJE</div>
            <div className="metric-number">2,1%</div>
            <div className="metric-text">Dentro do esperado (≤ 4%)</div>
          </article>
        </section>

        {/* fila de produção */}
        <section className="queue">
          <h2>Fila de produção</h2>
          <div className="orders">
            {orders.map((order, index) => {
              const percent = Math.round((order.done / order.total) * 100);
              return (
                <article
                  className="order"
                  key={order.id}
                  onClick={() => abrirDetalhesOrdem(order)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="order-main">
                    <div>
                      <h3>{order.name}</h3>
                      <div className="team">
                        {order.team} · {order.total} unidades
                      </div>
                    </div>
                    <span className={`status ${order.kind}`}>{order.status}</span>
                  </div>

                  <div className="progress">
                    <span style={{ width: `${percent}%` }} />
                  </div>

                  <div className="details">
                    <span className="time">{order.time}</span>
                    <span>{order.done} / {order.total} ({percent}%)</span>
                  </div>

                  {order.kind === "progressing" && (
                    <button
                      className="action complete"
                      onClick={(e) => {
                        e.stopPropagation();
                        finishOrder(index);
                      }}
                    >
                      Concluir lote
                    </button>
                  )}
                  {order.kind === "queued" && (
                    <button
                      className="action start"
                      onClick={(e) => {
                        e.stopPropagation();
                        startOrder(index);
                      }}
                    >
                      Iniciar
                    </button>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </main>

      {/* =====================================================
         POP-UP 1: REGISTRAR NOVA ORDEM
      ===================================================== */}
      {modalNovaOrdemAberto && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "620px" }}>
            <div className="modalCabecalho">
              <h2>Registrar nova ordem</h2>
              <button
                type="button"
                className="botaoFecharModal"
                onClick={() => setModalNovaOrdemAberto(false)}
              >
                &times;
              </button>
            </div>
            <div className="modalCorpo">
              <form className="formRegistrarProducao" onSubmit={handleSubmitNovaOrdem}>
                <div className="cardFormProducao">
                  <label className="campoNomeProducao">
                    <span>
                      Nome do produto a ser produzido <b>*</b>
                    </span>
                    <input
                      type="text"
                      name="nome"
                      placeholder="Escreva aqui o nome..."
                      value={form.nome}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <div className="linhaDuplaProducao">
                    <label className="campoQuantidadeProducao">
                      <span>
                        Quantidade a ser produzido (unidade) <b>*</b>
                      </span>
                      <input
                        type="number"
                        min="1"
                        name="quantidade"
                        placeholder="00"
                        value={form.quantidade}
                        onChange={handleChange}
                        required
                      />
                    </label>

                    <label className="campoPrazoProducao">
                      <span>
                        Prazo <b>*</b>
                      </span>
                      <input
                        type="date"
                        name="prazo"
                        value={form.prazo}
                        onChange={handleChange}
                        required
                      />
                    </label>
                  </div>
                </div>

                <div className="acoesFormProducao">
                  <button
                    type="button"
                    className="botaoCancelar"
                    onClick={() => setModalNovaOrdemAberto(false)}
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

      {/* =====================================================
         POP-UP 2: DETALHES DA ORDEM
      ===================================================== */}
      {modalDetalhesOrdemAberto && ordemSelecionada && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "600px" }}>
            <div className="modalCabecalho">
              <h2>Detalhes da ordem</h2>
              <button
                type="button"
                className="botaoFecharModal"
                onClick={() => setModalDetalhesOrdemAberto(false)}
              >
                &times;
              </button>
            </div>
            <div className="modalCorpo">
              <div className="formRegistrarProducao">
                <div className="cardFormProducao">
                  <label className="campoNomeProducao">
                    <span>Nome do produto a ser produzido</span>
                    <input
                      type="text"
                      value={ordemSelecionada.name}
                      readOnly={!editandoOrdem}
                      onChange={(e) =>
                        setOrdemSelecionada({ ...ordemSelecionada, name: e.target.value })
                      }
                    />
                  </label>

                  <div className="linhaDuplaProducao">
                    <label className="campoQuantidadeProducao">
                      <span>Quantidade a ser produzido (unidade)</span>
                      <input
                        type="number"
                        value={ordemSelecionada.total}
                        readOnly={!editandoOrdem}
                        onChange={(e) =>
                          setOrdemSelecionada({
                            ...ordemSelecionada,
                            total: parseInt(e.target.value, 10) || 0,
                          })
                        }
                      />
                    </label>

                    <label className="campoPrazoProducao">
                      <span>Prazo</span>
                      <input
                        type="date"
                        value={ordemSelecionada.prazo || "2026-08-20"}
                        readOnly={!editandoOrdem}
                        onChange={(e) =>
                          setOrdemSelecionada({ ...ordemSelecionada, prazo: e.target.value })
                        }
                      />
                    </label>
                  </div>
                </div>

                <div className="acoesFormProducao" style={{ justifyContent: "center" }}>
                  <button
                    type="button"
                    className="botaoRegistrar"
                    style={{ borderRadius: "999px" }}
                    onClick={solicitarExclusaoOrdem}
                  >
                    Excluir
                  </button>

                  <button
                    type="button"
                    className="botaoRegistrar"
                    style={{ borderRadius: "999px" }}
                    onClick={() => {
                      if (editandoOrdem) {
                        salvarEdicaoOrdem();
                      } else {
                        setEditandoOrdem(true);
                      }
                    }}
                  >
                    {editandoOrdem ? "Salvar" : "Editar"}
                  </button>

                  <button
                    type="button"
                    className="botaoCancelar"
                    style={{ borderRadius: "999px" }}
                    onClick={() => setModalDetalhesOrdemAberto(false)}
                  >
                    Voltar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
         POP-UP 3: CONFIRMAR EXCLUSÃO DA ORDEM
      ===================================================== */}
      {modalConfirmarExclusaoAberto && ordemSelecionada && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "460px" }}>
            <div className="modalCabecalho" style={{ borderBottom: "none", marginBottom: 0, paddingBottom: 0 }}>
              <span />
              <button
                type="button"
                className="botaoFecharModal"
                onClick={() => {
                  setModalConfirmarExclusaoAberto(false);
                  setModalDetalhesOrdemAberto(true);
                }}
              >
                &times;
              </button>
            </div>

            <div className="conteudoConfirmacaoExclusao">
              <div className="iconeAlertaExclusao">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h3 className="tituloConfirmacaoExclusao">Excluir ordem de produção?</h3>

              <p className="textoConfirmacaoExclusao">
                Tem certeza de que deseja excluir a ordem{" "}
                <strong>{ordemSelecionada.name}</strong>?
              </p>

              <p className="subtextoConfirmacaoExclusao">
                Esta ação não poderá ser desfeita e o lote será removido da fila.
              </p>

              <div className="acoesConfirmacao">
                <button
                  type="button"
                  className="botaoCancelarExclusao"
                  onClick={() => {
                    setModalConfirmarExclusaoAberto(false);
                    setModalDetalhesOrdemAberto(true);
                  }}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="botaoConfirmarExclusao"
                  onClick={confirmarExclusaoOrdem}
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