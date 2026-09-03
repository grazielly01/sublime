import "./registrarmeta.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

function RegistrarMeta() {
  const navigate = useNavigate();

  return (
    <div className="tudoRegistrarMeta">

      <Sidebar paginaAtiva="Visão Geral" />

      <div className="tudoMenosSidebarMeta">

        <Header nomeIndustria="Sweet Sunset" />

        <main className="conteudoRegistrarMeta">

          {/* TÍTULO */}
          <div className="topoRegistrarMeta">

            <button
              type="button"
              className="botaoVoltarMeta"
              onClick={() => navigate("/metavisaogeral")}
              aria-label="Voltar"
            >
              ‹
            </button>

            <h1 className="tituloRegistrarMeta">
              Registrar nova meta
            </h1>

          </div>

          {/* FORMULÁRIO */}
          <form className="formRegistrarMeta">

            {/* TÍTULO */}
            <label className="campoTituloMeta">
              <span>
                Título da meta <b>*</b>
              </span>

              <input
                type="text"
                placeholder="Escreva aqui o título..."
              />
            </label>


            {/* PRAZO */}
            <label className="campoPrazoMeta">
              <span>
                Prazo da meta <b>*</b>
              </span>

              <input
                type="date"
              />
            </label>


            {/* DESCRIÇÃO */}
            <label className="campoDescricaoMeta">
              <span>
                Descrição <b>*</b>
              </span>

              <textarea
                placeholder="Escreva aqui a descrição..."
              ></textarea>
            </label>


            {/* QUANTIDADE */}
            <label className="campoQuantidadeMeta">
              <span>
                Quantidade a ser produzida
              </span>

              <input
                type="number"
                placeholder="00"
              />
            </label>


            {/* BOTÕES */}
            <div className="acoesFormMeta">

              <button
                type="button"
                className="botaoCancelar"
                onClick={() => navigate("/metavisaogeral")}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="botaoRegistrar"
              >
                Registrar
              </button>

            </div>

          </form>

        </main>

      </div>

    </div>
  );
}

export default RegistrarMeta;