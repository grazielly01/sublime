import "./sistemaConfig.css";

import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { useNavigate } from "react-router-dom";

function SistemaConfig() {
  const navigate = useNavigate();

  return (
    <div className="tudoSistemaConfig">

      <Sidebar paginaAtiva="Configurações" />

      <div className="tudoMenosSidebar">

        <Header nomeIndustria="Sweet Sunset" />

        <main className="conteudoSistemaConfig">

          {/* TÍTULO + SETA */}
          <div className="topoSistemaConfig">

            <button
              className="botaoVoltarSistema"
              onClick={() => navigate(-1)}
              title="Voltar"
            >
              ←
            </button>

            <h1 className="tituloSistemaConfig">
              Sistema
            </h1>

          </div>


          {/* CONTAINER PRINCIPAL */}
          <div className="containerSistemaConfig">

            {/* IDIOMA */}
            <section className="secaoSistemaConfig">

              <h2>Idioma</h2>

              <div className="camposSistema">

                <label>
                  Idioma do sistema:

                  <select defaultValue="pt-BR">
                    <option value="pt-BR">
                      Português (BR)
                    </option>

                    <option value="en-US">
                      English (US)
                    </option>
                  </select>

                </label>


                <label>
                  Formato da data:

                  <select defaultValue="DD/MM/AAAA">
                    <option>
                      DD/MM/AAAA
                    </option>

                    <option>
                      MM/DD/YYYY
                    </option>
                  </select>

                </label>

              </div>

            </section>


            {/* BACKUP */}
            <section className="secaoSistemaConfig">

              <h2>Backup</h2>

              <div className="camposSistema">

                <label>
                  Frequência do backup automático:

                  <select defaultValue="Diário">
                    <option>Diário</option>
                    <option>Semanal</option>
                    <option>Mensal</option>
                  </select>

                </label>


                <label>
                  Horário do backup automático:

                  <input
                    type="time"
                    defaultValue="02:00"
                  />

                </label>

              </div>


              <div className="informacoesBackup">

                <p className="ultimoBackup">
                  Último backup realizado: 25/05/2026 às 02:08
                </p>

                <button className="botaoBackup">
                  Realizar backup agora
                </button>

              </div>

            </section>


            {/* APARÊNCIA */}
            <section className="secaoSistemaConfig">

              <h2>Aparência</h2>

              <p className="descricaoAparencia">
                Selecione a combinação de cores utilizada pelo sistema.
              </p>

              <div className="coresAparencia">

                <button
                  className="cor cor1"
                  title="Tema claro"
                />

                <button
                  className="cor cor2"
                  title="Tema rosa"
                />

                <button
                  className="cor cor3"
                  title="Tema vinho"
                />

                <button
                  className="cor cor4"
                  title="Tema escuro"
                />

              </div>

            </section>


            {/* SALVAR */}
            <div className="acoesSistemaConfig">

              <button className="botaoSalvarSistema">
                Salvar alterações
              </button>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default SistemaConfig;