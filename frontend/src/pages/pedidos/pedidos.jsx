import { useState, useEffect } from "react";
import "./pedidos.css";
import "./registrarPedido.css";
import "./detalhesPedido.css";
import "./apagarPedido.css";
import Input from "../../componentes/Input/Input.jsx";
import Button from "../../componentes/Button/Button.jsx";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import Select from "../../componentes/Select/Select.jsx";

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [filtroAtivo, setFiltroAtivo] = useState("TODOS");

  // Estado do pop-up Registrar Novo Pedido
  const [modalNovoPedidoAberto, setModalNovoPedidoAberto] = useState(false);
  const [novoPedidoForm, setNovoPedidoForm] = useState({
    cliente: "",
    status: "Aguardando",
    prazo: "",
    quantidade: "",
    descricao: "",
  });

  // Estados do pop-up Detalhes do Pedido
  const [modalDetalhesAberto, setModalDetalhesAberto] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [editandoPedido, setEditandoPedido] = useState(false);

  // Estado do pop-up Confirmar Exclusão do Pedido
  const [modalConfirmarExclusaoAberto, setModalConfirmarExclusaoAberto] = useState(false);

  const opcoesFiltro = [
    { label: "Todos", value: "TODOS" },
    { label: "Aguardando", value: "AGUARDANDO" },
    { label: "Em produção", value: "EM_PRODUCAO" },
    { label: "Pronto", value: "PRONTO" },
    { label: "Entregue", value: "ENTREGUE" },
    { label: "Cancelado", value: "CANCELADO" },
  ];

  const carregarPedidos = async (status) => {
    try {
      const url =
        status && status !== "TODOS"
          ? `http://localhost:3000/pedidos?status=${status}`
          : "http://localhost:3000/pedidos";

      const response = await fetch(url);
      const result = await response.json();

      if (result.data) {
        setPedidos(result.data);
      } else if (Array.isArray(result)) {
        setPedidos(result);
      }
    } catch (error) {
      console.error("Erro ao carregar pedidos da API:", error);
    }
  };

  useEffect(() => {
    carregarPedidos(filtroAtivo);
  }, [filtroAtivo]);

  const mapearCodigoStatus = (statusTexto) => {
    const mapa = {
      "Aguardando": "AGUARDANDO",
      "Em produção": "EM_PRODUCAO",
      "Pronto": "PRONTO",
      "Entregue": "ENTREGUE",
      "Cancelado": "CANCELADO",
    };
    return mapa[statusTexto] || "AGUARDANDO";
  };

  const mapearTextoStatus = (codigoStatus) => {
    const mapa = {
      AGUARDANDO: "Aguardando",
      EM_PRODUCAO: "Em produção",
      PRONTO: "Pronto",
      ENTREGUE: "Entregue",
      CANCELADO: "Cancelado",
    };
    return mapa[codigoStatus] || "Aguardando";
  };

  const formatarStatus = (status) => {
    switch (status) {
      case "EM_PRODUCAO":
        return { classe: "producao", texto: "Em produção" };
      case "AGUARDANDO":
        return { classe: "aguardando", texto: "Aguardando" };
      case "PRONTO":
        return { classe: "pronto", texto: "Pronto" };
      case "ENTREGUE":
        return { classe: "entregue", texto: "Entregue" };
      case "CANCELADO":
        return { classe: "cancelado", texto: "Cancelado" };
      default:
        return { classe: "aguardando", texto: status };
    }
  };

  const abrirDetalhesPedido = (pedido) => {
    setPedidoSelecionado({
      id: pedido.id,
      cliente: pedido.cliente || pedido.estabelecimento || "",
      status: mapearTextoStatus(pedido.status),
      prazo: pedido.entrega || "",
      quantidade: String(pedido.itensCount || pedido.itens || "1"),
      descricao: pedido.descricao || "Sem descrição informada.",
    });
    setEditandoPedido(false);
    setModalDetalhesAberto(true);
  };

  const salvarEdicaoPedido = () => {
    if (!pedidoSelecionado) return;

    const statusCodigo = mapearCodigoStatus(pedidoSelecionado.status);

    setPedidos((prev) =>
      prev.map((p) =>
        p.id === pedidoSelecionado.id
          ? {
              ...p,
              cliente: pedidoSelecionado.cliente,
              status: statusCodigo,
              itensCount: Number(pedidoSelecionado.quantidade) || 1,
              entrega: pedidoSelecionado.prazo,
              descricao: pedidoSelecionado.descricao,
            }
          : p
      )
    );
    setEditandoPedido(false);
  };

  // Abre o pop-up de confirmação de exclusão
  const solicitarExclusaoPedido = () => {
    setModalDetalhesAberto(false);
    setModalConfirmarExclusaoAberto(true);
  };

  // Remove o pedido definitivamente
  const confirmarExclusaoPedido = () => {
    if (pedidoSelecionado) {
      setPedidos((prev) => prev.filter((p) => p.id !== pedidoSelecionado.id));
    }
    setModalConfirmarExclusaoAberto(false);
    setPedidoSelecionado(null);
  };

  const handleRegistrarPedido = async (e) => {
    e.preventDefault();

    const statusCodigo = mapearCodigoStatus(novoPedidoForm.status);
    const qtd = parseInt(novoPedidoForm.quantidade, 10) || 1;
    const dataFormatada = novoPedidoForm.prazo
      ? novoPedidoForm.prazo.replace("T", " ").split("-").reverse().join("/")
      : "A definir";

    const novoItem = {
      id: Date.now(),
      cliente: novoPedidoForm.cliente,
      status: statusCodigo,
      itensCount: qtd,
      entrega: dataFormatada,
      descricao: novoPedidoForm.descricao,
      valorTotal: 0,
    };

    try {
      await fetch("http://localhost:3000/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoItem),
      });
    } catch (error) {
      console.warn("API offline, adicionando pedido localmente:", error);
    }

    setPedidos((prev) => [novoItem, ...prev]);
    setNovoPedidoForm({
      cliente: "",
      status: "Aguardando",
      prazo: "",
      quantidade: "",
      descricao: "",
    });
    setModalNovoPedidoAberto(false);
  };

  return (
    <div className="tudoPedidos">
      <Sidebar paginaAtiva="Pedidos" />

      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset" />

        <div className="conteudoPedidos conteudoPedidos2">
          {/* Topo da página */}
          <div className="topoPedidos">
            <div>
              <h1 className="tituloPedidos">Pedidos</h1>
              <p className="subtituloPedidos">
                Pedidos de padarias, mercados e lojas — controle de status e prazo.
              </p>
            </div>
          </div>

          {/* Abas de Filtros com onClick funcional */}
          <div className="filtrosPedidosEButton">
            <div className="filtrosContainer" style={{ display: "flex", gap: "8px" }}>
              {opcoesFiltro.map((opcao) => (
                <div
                  key={opcao.value}
                  className={`filtroPedido ${filtroAtivo === opcao.value ? "ativo" : ""}`}
                  onClick={() => setFiltroAtivo(opcao.value)}
                  style={{ cursor: "pointer" }}
                >
                  {opcao.label}
                </div>
              ))}
            </div>

            <div
              className="botaoNovoPedido"
              onClick={() => setModalNovoPedidoAberto(true)}
            >
              <Button id="buttonNovoPedido" texto="+ Novo pedido" />
            </div>
          </div>

          {/* Grade de Cards alimentada dinamicamente pelo Backend */}
          <div className="listaPedidos">
            {pedidos.length === 0 ? (
              <p style={{ marginTop: "20px" }}>Nenhum pedido encontrado para este status.</p>
            ) : (
              pedidos.map((pedido) => {
                const infoStatus = formatarStatus(pedido.status);

                return (
                  <div className="cardPedido" key={pedido.id}>
                    {/* Badge de status */}
                    <div className="topoCardPedido">
                      <span className={`statusPedido ${infoStatus.classe}`}>
                        {infoStatus.texto}
                      </span>
                    </div>

                    <h2 className="nomeEstabelecimento">
                      {pedido.cliente || pedido.estabelecimento}
                    </h2>

                    <p className="infoPedido">
                      {pedido.itensCount ? `${pedido.itensCount} itens` : pedido.itens} ·{" "}
                      {pedido.entrega}
                    </p>

                    <div className="rodapeCardPedido">
                      <p className="valorPedido">
                        {typeof pedido.valorTotal === "number"
                          ? `R$ ${pedido.valorTotal.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}`
                          : pedido.valorTotal || pedido.valor}
                      </p>

                      <div
                        className="botaoDetalhes"
                        onClick={() => abrirDetalhesPedido(pedido)}
                      >
                        <Button texto="Detalhes" />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
         POP-UP 1: DETALHES DO PEDIDO
      ===================================================== */}
      {modalDetalhesAberto && pedidoSelecionado && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "820px" }}>
            <div className="modalCabecalho">
              <h2>Detalhes do pedido</h2>
              <button
                type="button"
                className="botaoFecharModal"
                onClick={() => setModalDetalhesAberto(false)}
              >
                &times;
              </button>
            </div>

            <div className="modalCorpo">
              <div className="formDetalhesPedidoModal">
                <div className="linhaDetalhes1">
                  <div className="campoDetalhe campoCliente">
                    <label>Cliente</label>
                    <Input
                      value={pedidoSelecionado.cliente}
                      disabled={!editandoPedido}
                      required={false}
                      onChange={(e) =>
                        setPedidoSelecionado({
                          ...pedidoSelecionado,
                          cliente: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="campoDetalhe campoStatus">
                    <label>Status</label>
                    <Select
                      id="selectStatusDetalhesPedido"
                      value={pedidoSelecionado.status}
                      disabled={!editandoPedido}
                      required={false}
                      onChange={(e) =>
                        setPedidoSelecionado({
                          ...pedidoSelecionado,
                          status: e.target.value,
                        })
                      }
                      options={[
                        "Aguardando",
                        "Em produção",
                        "Pronto",
                        "Entregue",
                        "Cancelado",
                      ]}
                    />
                  </div>

                  <div className="campoDetalhe campoPrazo">
                    <label>Prazo</label>
                    <div className="inputComIcone">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="5" width="18" height="16" rx="2" />
                        <path d="M3 10h18M8 3v4M16 3v4" />
                      </svg>
                      <Input
                        id="inputPrazo"
                        value={pedidoSelecionado.prazo}
                        disabled={!editandoPedido}
                        required={false}
                        onChange={(e) =>
                          setPedidoSelecionado({
                            ...pedidoSelecionado,
                            prazo: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="linhaDetalhes2">
                  <div className="campoDetalhe campoQuantidade">
                    <label>Quantidade a ser entregue</label>
                    <Input
                      value={pedidoSelecionado.quantidade}
                      disabled={!editandoPedido}
                      required={false}
                      onChange={(e) =>
                        setPedidoSelecionado({
                          ...pedidoSelecionado,
                          quantidade: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="campoDetalhe campoDescricao">
                    <label>Descrição</label>
                    <Input
                      value={pedidoSelecionado.descricao}
                      disabled={!editandoPedido}
                      required={false}
                      onChange={(e) =>
                        setPedidoSelecionado({
                          ...pedidoSelecionado,
                          descricao: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="botoesDetalhesPedido">
                  <div className="botaoContorno" onClick={solicitarExclusaoPedido}>
                    <Button type="button" texto="Excluir" />
                  </div>

                  <div
                    onClick={() => {
                      if (editandoPedido) {
                        salvarEdicaoPedido();
                      } else {
                        setEditandoPedido(true);
                      }
                    }}
                  >
                    <Button
                      type="button"
                      texto={editandoPedido ? "Salvar" : "Editar"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
         POP-UP 2: CONFIRMAR EXCLUSÃO DO PEDIDO
      ===================================================== */}
      {modalConfirmarExclusaoAberto && pedidoSelecionado && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "460px" }}>
            <div
              className="modalCabecalho"
              style={{ borderBottom: "none", marginBottom: 0, paddingBottom: 0 }}
            >
              <span />
              <button
                type="button"
                className="botaoFecharModal"
                onClick={() => {
                  setModalConfirmarExclusaoAberto(false);
                  setModalDetalhesAberto(true);
                }}
              >
                &times;
              </button>
            </div>

            <div className="conteudoConfirmacaoApagarEvento">
              <div className="iconeAlertaApagarEvento">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h3 className="tituloConfirmacaoApagarEvento">
                Excluir pedido?
              </h3>

              <p className="textoConfirmacaoApagarEvento">
                Tem certeza de que deseja excluir o pedido de{" "}
                <strong>{pedidoSelecionado.cliente}</strong>?
              </p>

              <p className="subtextoConfirmacaoApagarEvento">
                Esta ação não poderá ser desfeita e o pedido será removido do sistema.
              </p>

              <div className="botoesConfirmacaoEvento">
                <button
                  type="button"
                  className="botaoCancelarEvento"
                  onClick={() => {
                    setModalConfirmarExclusaoAberto(false);
                    setModalDetalhesAberto(true);
                  }}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="botaoConfirmarApagarEvento"
                  onClick={confirmarExclusaoPedido}
                >
                  Sim, excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
         POP-UP 3: REGISTRAR NOVO PEDIDO
      ===================================================== */}
      {modalNovoPedidoAberto && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "820px" }}>
            <div className="modalCabecalho">
              <h2>Registrar novo pedido</h2>
              <button
                type="button"
                className="botaoFecharModal"
                onClick={() => setModalNovoPedidoAberto(false)}
              >
                &times;
              </button>
            </div>

            <div className="modalCorpo">
              <form className="formRegistrarPedidoModal" onSubmit={handleRegistrarPedido}>
                <div className="linhaPedido1">
                  <div className="campoRegistrar campoCliente">
                    <label>
                      Cliente <span>*</span>
                    </label>
                    <Input
                      placeholder="Escreva aqui o nome do cliente..."
                      required={true}
                      value={novoPedidoForm.cliente}
                      onChange={(e) =>
                        setNovoPedidoForm({ ...novoPedidoForm, cliente: e.target.value })
                      }
                    />
                  </div>

                  <div className="campoRegistrar campoStatus">
                    <label>Status (padrão inicial)</label>
                    <Select
                      id="selectStatusPedido"
                      required={false}
                      value={novoPedidoForm.status}
                      onChange={(e) =>
                        setNovoPedidoForm({ ...novoPedidoForm, status: e.target.value })
                      }
                      options={[
                        "Aguardando",
                        "Em produção",
                        "Pronto",
                        "Entregue",
                        "Cancelado",
                      ]}
                    />
                  </div>

                  <div className="campoRegistrar campoPrazo">
                    <label>
                      Prazo <span>*</span>
                    </label>
                    <div className="inputComIcone">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="5" width="18" height="16" rx="2" />
                        <path d="M3 10h18M8 3v4M16 3v4" />
                      </svg>
                      <input
                        type="datetime-local"
                        id="inputPrazo"
                        required
                        value={novoPedidoForm.prazo}
                        onChange={(e) =>
                          setNovoPedidoForm({ ...novoPedidoForm, prazo: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="linhaPedido2">
                  <div className="campoRegistrar campoQuantidade">
                    <label>
                      Quantidade a ser entregue <span>*</span>
                    </label>
                    <Input
                      type="number"
                      min="1"
                      placeholder="00"
                      required={true}
                      value={novoPedidoForm.quantidade}
                      onChange={(e) =>
                        setNovoPedidoForm({ ...novoPedidoForm, quantidade: e.target.value })
                      }
                    />
                  </div>

                  <div className="campoRegistrar campoDescricao">
                    <label>
                      Descrição <span>*</span>
                    </label>
                    <Input
                      placeholder="Escreva aqui a descrição..."
                      required={true}
                      value={novoPedidoForm.descricao}
                      onChange={(e) =>
                        setNovoPedidoForm({ ...novoPedidoForm, descricao: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="botoesRegistrarPedido">
                  <div
                    className="botaoContorno"
                    onClick={() => setModalNovoPedidoAberto(false)}
                  >
                    <Button type="button" texto="Cancelar" />
                  </div>
                  <Button type="submit" texto="Registrar" />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pedidos;