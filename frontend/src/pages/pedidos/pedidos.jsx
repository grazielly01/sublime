import { useState, useEffect } from "react";
import "./pedidos.css";
import { Link } from "react-router-dom";
import Button from "../../componentes/Button/Button.jsx";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";

function Pedidos() {
  // 1. Estado para armazenar os pedidos vindos da API
  const [pedidos, setPedidos] = useState([]);
  
  // 2. Estado para controlar qual filtro de status está ativo
  const [filtroAtivo, setFiltroAtivo] = useState("TODOS");

  // Lista das opções de filtros com os códigos que a API espera
  const opcoesFiltro = [
    { label: "Todos", value: "TODOS" },
    { label: "Aguardando", value: "AGUARDANDO" },
    { label: "Em produção", value: "EM_PRODUCAO" },
    { label: "Pronto", value: "PRONTO" },
    { label: "Entregue", value: "ENTREGUE" },
    { label: "Cancelado", value: "CANCELADO" },
  ];

  // 3. Função responsável por buscar os pedidos no backend
  const carregarPedidos = async (status) => {
    try {
      // Se for "TODOS", não passa query param. Caso contrário, envia ?status=NOME
      const url = status && status !== "TODOS"
        ? `http://localhost:3000/pedidos?status=${status}`
        : "http://localhost:3000/pedidos";

      const response = await fetch(url);
      const result = await response.json();

      // Atualiza o estado com a lista 'data' retornada pelo backend
      if (result.data) {
        setPedidos(result.data);
      } else if (Array.isArray(result)) {
        setPedidos(result);
      }
    } catch (error) {
      console.error("Erro ao carregar pedidos da API:", error);
    }
  };

  // 4. Executa a busca sempre que a página carrega ou quando o filtro muda
  useEffect(() => {
    carregarPedidos(filtroAtivo);
  }, [filtroAtivo]);

  // Função auxiliar para formatar a badge do status
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
            <div className="filtrosContainer" style={{ display: 'flex', gap: '8px' }}>
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

            <Link to="/pedidos/registrar" className="botaoNovoPedido">
              <Button id="buttonNovoPedido" texto="+ Novo pedido" />
            </Link>
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

                    <h2 className="nomeEstabelecimento">{pedido.cliente || pedido.estabelecimento}</h2>

                    <p className="infoPedido">
                      {pedido.itensCount ? `${pedido.itensCount} itens` : pedido.itens} · {pedido.entrega}
                    </p>

                    <div className="rodapeCardPedido">
                      <p className="valorPedido">
                        {typeof pedido.valorTotal === "number"
                          ? `R$ ${pedido.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                          : pedido.valorTotal || pedido.valor}
                      </p>

                      <div className="botaoDetalhes">
                        <Link to={`/pedidos/detalhes/${pedido.id}`}>
                          <Button texto="Detalhes" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pedidos;