import { useState, useEffect } from "react";
import "./alertas.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import Alert from "../../componentes/Alerts/Alerts.jsx";

function Alertas() {
  // 1. Estados para os dados da API e filtro selecionado
  const [alertas, setAlertas] = useState([]);
  const [filtroAtivo, setFiltroAtivo] = useState("TODOS");

  // Lista de filtros com os nomes de categorias correspondentes
  const opcoesFiltro = [
    { label: "Todos", value: "TODOS" },
    { label: "Pedidos", value: "PEDIDOS" },
    { label: "Estoque", value: "ESTOQUE" },
    { label: "Financeiro", value: "FINANCEIRO" },
    { label: "Produção", value: "PRODUCAO" },
  ];

  // 2. Função para buscar alertas do Backend
  const carregarAlertas = async (categoria) => {
    try {
      const url = categoria && categoria !== "TODOS"
        ? `http://localhost:3000/alertas?categoria=${categoria}`
        : "http://localhost:3000/alertas";

      const response = await fetch(url);
      const result = await response.json();

      if (result && Array.isArray(result.data)) {
        setAlertas(result.data);
      } else if (Array.isArray(result)) {
        setAlertas(result);
      } else {
        setAlertas([]);
      }
    } catch (error) {
      console.error("Erro ao carregar alertas:", error);
      setAlertas([]);
    }
  };

  // 3. Executa a busca sempre que a página carrega ou o filtro muda
  useEffect(() => {
    carregarAlertas(filtroAtivo);
  }, [filtroAtivo]);

  // 4. Função para dispensar/deletar um alerta
  const dispensarAlerta = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/alertas`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove o alerta dispensado da lista local sem recarregar a página
        setAlertas((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Erro ao dispensar alerta:", error);
    }
  };

  return (
    <div className="tudoAlertas">
      <Sidebar paginaAtiva="Alertas" />

      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset" />

        <div className="conteudoAlertas conteudoAlertas2">
          <h1 className="tituloAlertas">Alertas</h1>
          <p className="subtituloAlertas">
            Notificações automáticas de estoque, validade, financeiro e pedidos.
          </p>

          {/* Abas de filtro com evento onClick */}
          <div className="filtrosAlertas">
            {opcoesFiltro.map((opcao) => (
              <div
                key={opcao.value}
                className={`filtroAlerta ${filtroAtivo === opcao.value ? "ativo" : ""}`}
                onClick={() => setFiltroAtivo(opcao.value)}
                style={{ cursor: "pointer" }}
              >
                {opcao.label}
              </div>
            ))}
          </div>

          {/* Renderização da Lista de Alertas vindos da API */}
          <div className="listaAlertas">
            {alertas.length === 0 ? (
              <p style={{ marginTop: "20px" }}>Nenhum alerta nesta categoria.</p>
            ) : (
              alertas.map((alerta) => (
                <Alert
                  key={alerta.id}
                  id={alerta.id}
                  titulo={alerta.titulo}
                  descricao={alerta.descricao}
                  prioridade={alerta.prioridade?.toLowerCase()}
                  onDispensar={() => dispensarAlerta(alerta.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alertas;