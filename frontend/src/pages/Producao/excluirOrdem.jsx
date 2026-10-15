import "./excluirOrdem.css";

import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";

import { useParams, useNavigate } from "react-router-dom";

import { motion } from "motion/react";

function ExcluirOrdem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const ordens = [
    { id: 1, produto: "Brigadeiro Gourmet" },
    { id: 2, produto: "Cupcake Red Velvet" },
    { id: 3, produto: "Copo da Felicidade 250ml" },
  ];

  const ordem = ordens.find((o) => o.id.toString() === id);

  return (
    <div className="tudoExcluirOrdem">

      <Sidebar paginaAtiva="Produção" />

      <div className="tudoMenosSidebar">

        <Header nomeIndustria="Sweet Sunset Indústria B2B" />

        <main className="conteudoExcluirOrdem">

          {/* TOPO */}
          <div className="topoExcluirOrdem">

            <button
              type="button"
              className="botaoVoltarExcluir"
              onClick={() => navigate(`/detalhesordem/${id}`)}
              title="Voltar"
            >
              ←
            </button>

            <h1 className="tituloExcluirOrdem">
              Detalhes da ordem
            </h1>

          </div>

          {/* CARD DE CONFIRMAÇÃO */}
          <div className="cardConfirmacao">

            <p>
              Tem certeza de que deseja excluir a ordem{" "}
              <strong>{ordem?.produto}</strong>?
            </p>

            <div className="acoesConfirmacao">

              <button
                type="button"
                className="botaoCancelar"
                onClick={() => navigate(`/detalhesordem/${id}`)}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="botaoExcluir"
                onClick={() => navigate("/producao")}
              >
                Excluir
              </button>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default ExcluirOrdem;