import React from "react";
import "./detalhesOrdem.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { useParams, useNavigate } from "react-router-dom";

function DetalhesOrdem() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dados simulados
  const ordens = [
    { id: 1, produto: "Brigadeiro Gourmet", quantidade: 480, prazo: "20/08/2026" },
    { id: 2, produto: "Cupcake Red Velvet", quantidade: 200, prazo: "20/08/2026" },
    { id: 3, produto: "Copo da Felicidade 250ml", quantidade: 120, prazo: "17/06/2026" },
  ];

  const ordem = ordens.find((o) => o.id.toString() === id) || {
    produto: "Copo da Felicidade 250ml",
    quantidade: 120,
    prazo: "17/06/2026",
  };

  return (
    <div className="tudoDetalhesOrdem">
      <Sidebar paginaAtiva="Produção" />

      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset Indústria B2B" />

        <main className="conteudoDetalhesOrdem">
          {/* Topo no canto superior esquerdo */}
          <div className="topoDetalhesOrdem">
            <button
              type="button"
              className="botaoVoltarDetalhes"
              onClick={() => navigate(-1)}
              title="Voltar"
            >
              ←
            </button>
            <h1 className="tituloDetalhesOrdem">Detalhes da ordem</h1>
          </div>

          <div className="containerDetalhesOrdem">
            <div className="cardDetalhesOrdem">
              {/* Nome do produto */}
              <div className="campoDetalhe">
                <label>Nome do produto a ser produzido</label>
                <input type="text" value={ordem.produto} readOnly />
              </div>

              {/* Quantidade e Prazo */}
              <div className="linhaDuplaDetalhes">
                <div className="campoDetalhe">
                  <label>Quantidade a ser produzido (unidade)</label>
                  <input type="text" value={ordem.quantidade} readOnly />
                </div>

                <div className="campoDetalhe">
                  <label>Prazo</label>

                  {/* Campo com ícone de calendário acoplado */}
                  <div className="campoComIconeCalendario">
                    <svg
                      className="iconeCalendario"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <input type="text" value={ordem.prazo} readOnly />
                  </div>
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="acoesDetalhesOrdem">
             <button
  className="botaoExcluir"
  onClick={() => navigate(`/excluirordem/${id}`)}
>
  Excluir
</button>

              <button
                type="button"
                className="botaoEditar"
                onClick={() => navigate(`/registrarproducao/${id || 3}`)}
              >
                Editar
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DetalhesOrdem;