import "./metavisaogeral.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { useNavigate } from "react-router-dom";

function MetaVisaoGeral() {
  const navigate = useNavigate();

  // Lista de metas com IDs (Lógica e dados intactos)
  const metas = [
    {
      id: 1,
      titulo: "Zerar todos os pedidos atrasados em 4 dias",
      descricao:
        "Zerar todos os 5 pedidos atrasados: Mousse de limão, Cookies de avelã, Bolos Formigueiros, Bolos de Cenoura e Copos da Felicidade",
      status: "Não iniciado",
      prazo: "15/09 09h",
    },
    {
      id: 2,
      titulo: "Planejar produção",
      descricao: "Planejar produção do mês em até 2 dias",
      status: "Pronto",
      prazo: "Hoje",
    },
    {
      id: 3,
      titulo: "Produzir 200 bolos de cenoura",
      descricao: "Produzir 200 bolos de cenoura até o final da semana",
      status: "Em andamento",
      prazo: "18/09 12h",
    },
  ];

  return (
    <div className="tudoMetaVisaoGeral">
      <Sidebar paginaAtiva="Visão Geral" />

      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset" />

        <main className="conteudoMetaVisaoGeral">
          {/* Topo com seta de voltar, título e botão + Meta */}
          <div className="topoMetaVisaoGeral">
            <div className="tituloEVoltar">
              <button
                className="botaoVoltarMeta"
                onClick={() => navigate(-1)}
                title="Voltar"
              >
                ‹
              </button>
              <h1 className="tituloMetaVisaoGeral">Metas</h1>
            </div>

            <button
              className="botaoNovaMeta"
              onClick={() => navigate("/registrarmeta")}
            >
              + Meta
            </button>
          </div>

          {/* Card Container com a lista de metas */}
          <section className="listaMetas">
            {metas.map((m) => (
              <div
                key={m.id}
                className="meta"
                onClick={() => navigate(`/detalhesmeta/${m.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="infoMeta">
                  <h2>{m.titulo}</h2>
                  <p>{m.descricao}</p>
                </div>

                <div className="statusEPrazo">
                  <div
                    className={`statusMeta ${m.status
                      .replace(" ", "")
                      .toLowerCase()}`}
                  >
                    {m.status}
                  </div>
                  <span className="prazoMeta">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {m.prazo}
                  </span>
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}

export default MetaVisaoGeral;