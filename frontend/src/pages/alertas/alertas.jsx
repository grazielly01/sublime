
import { useState, useEffect } from "react";
import "./alertas.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import Alert from "../../componentes/Alerts/Alerts.jsx";

// Endereço do backend configurado na Vercel
const API_URL = import.meta.env.VITE_API_URL;

function Alertas() {
  const [alertas, setAlertas] = useState([]);
  const [filtroAtivo, setFiltroAtivo] = useState("TODOS");
  const [carregando, setCarregando] = useState(true);

  const opcoesFiltro = [
    { label: "Todos", value: "TODOS" },
    { label: "Pedidos", value: "PEDIDOS" },
    { label: "Estoque", value: "ESTOQUE" },
    { label: "Financeiro", value: "FINANCEIRO" },
    { label: "Produção", value: "PRODUCAO" },
  ];

  // Buscar alertas no backend
  const carregarAlertas = async (categoria) => {
    try {
      setCarregando(true);

      if (!API_URL) {
        throw new Error("VITE_API_URL não está configurada.");
      }

      const url =
        categoria && categoria !== "TODOS"
          ? `${API_URL}/alertas?categoria=${encodeURIComponent(categoria)}`
          : `${API_URL}/alertas`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const result = await response.json();

      setAlertas(
        Array.isArray(result.data) ? result.data : []
      );

    } catch (error) {
      console.error("Erro ao carregar alertas:", error);
      setAlertas([]);
    } finally {
      setCarregando(false);
    }
  };

  // Atualizar quando mudar o filtro
  useEffect(() => {
    carregarAlertas(filtroAtivo);
  }, [filtroAtivo]);

  // Dispensar alerta
  const dispensarAlerta = async (id) => {
    try {
      const response = await fetch(`${API_URL}/alertas/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      setAlertas((prev) =>
        prev.filter((item) => item.id !== id)
      );

    } catch (error) {
      console.error("Erro ao dispensar alerta:", error);
      alert("Não foi possível dispensar o alerta.");
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
            Notificações automáticas de estoque, validade,
            financeiro e pedidos.
          </p>

          {/* Filtros */}
          <div className="filtrosAlertas">
            {opcoesFiltro.map((opcao) => (
              <div
                key={opcao.value}
                className={`filtroAlerta ${
                  filtroAtivo === opcao.value ? "ativo" : ""
                }`}
                onClick={() => setFiltroAtivo(opcao.value)}
                style={{ cursor: "pointer" }}
              >
                {opcao.label}
              </div>
            ))}
          </div>

          {/* Lista de alertas */}
          <div className="listaAlertas">

            {carregando ? (
              <p style={{ marginTop: "20px" }}>
                Carregando alertas...
              </p>
            ) : alertas.length === 0 ? (
              <p style={{ marginTop: "20px" }}>
                Nenhum alerta nesta categoria.
              </p>
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
