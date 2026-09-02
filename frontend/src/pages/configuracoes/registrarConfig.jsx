import "./registrarConfig.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

function RegistrarConfig() {
  const navigate = useNavigate();

  return (
    <div className="tudoRegistrarConfig">
      <Sidebar paginaAtiva="Configurações" />

      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset" />

        <main className="conteudoRegistrarConfig">

          {/* TÍTULO + SETA. -> APROVANDO */}
          <div className="topoRegistrarConfig">
            <button
              type="button"
              className="botaoVoltarRegistrarConfig"
              onClick={() => navigate(-1)}
              title="Voltar"
            >
              ←
            </button>

            <h1 className="tituloRegistrarConfig">
              Registrar novo colaborador
            </h1>
          </div>

          {/* FORMULÁRIO */}
          <form className="formRegistrarConfig">

            <label>
              Nome do colaborador: *
              <input
                type="text"
                placeholder="Escreva aqui o nome..."
              />
            </label>

            <label>
              Cargo: *
              <input
                type="text"
                placeholder="Escreva aqui o cargo..."
              />
            </label>

            <label>
              Salário (mês): *
              <input
                type="text"
                placeholder="R$ 00,00"
              />
            </label>

            <label>
              Dias:
              <select defaultValue="Seg à Sex">
                <option>Seg à Sex</option>
                <option>Seg à Sáb</option>
                <option>Dom à Dom</option>
              </select>
            </label>

            <label>
              Horário:

              <div className="horarioInputs">
                <input
                  type="time"
                  defaultValue="07:00"
                />

                <span>às</span>

                <input
                  type="time"
                  defaultValue="16:00"
                />
              </div>
            </label>

            {/* BOTÕES */}
            <div className="acoesRegistrarConfig">

              <button
                type="button"
                className="botaoCancelar"
                onClick={() => navigate("/equipeconfig")}
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

export default RegistrarConfig;
