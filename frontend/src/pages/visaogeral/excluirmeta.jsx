import "./excluirmeta.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";

function ExcluirMeta() {
  const { id } = useParams();
  const navigate = useNavigate();

  const metas = [
    { id: 1, titulo: "Zerar todos os pedidos atrasados em 4 dias" },
    { id: 2, titulo: "Planejar produção" },
    { id: 3, titulo: "Produzir 200 bolos de cenoura" },
    { id: 4, titulo: "Mandar consertar banheiro" },
    { id: 5, titulo: "Produzir 50 Cupcake Red Velvet" },
    { id: 6, titulo: "Produzir 76 Cookies Caramelo Salgado" },
    { id: 7, titulo: "Zerar alertas em uma semana" },
  ];

  const meta = metas.find((m) => m.id.toString() === id);

  return (
    <div className="tudoExcluirMeta">
      <Sidebar paginaAtiva="Visão Geral" />

      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset" />

        <main className="conteudoExcluirMeta">
          {/* Topo fixo no canto esquerdo */}
          <div className="topoExcluirMeta">
            <button
              type="button"
              className="botaoVoltarMeta"
              onClick={() => navigate(-1)}
              title="Voltar"
            >
               ‹
            </button>
            <h1 className="tituloExcluirMeta">Detalhes da meta</h1>
          </div>

          <div className="containerCardExcluir">
            <div className="cardConfirmacao">
              <p>
                Tem certeza de que deseja excluir a<br />
                meta “<strong>{meta?.titulo || "Zerar alertas em uma semana"}</strong>”?
              </p>

              <div className="acoesConfirmacao">
                <button
                  type="button"
                  className="botaoCancelar"
                  onClick={() => navigate(`/detalhesmeta/${id}`)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="botaoExcluir"
                  onClick={() => navigate("/metavisaogeral")}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ExcluirMeta;