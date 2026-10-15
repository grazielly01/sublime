import React from "react";
import "./dadosConfig.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

function DadosConfig() {
  const navigate = useNavigate();

  return (
    <div className="tudoDadosConfig">
      <Sidebar paginaAtiva="Configurações" />

      <div className="tudoMenosSidebar tudoMenosSidebarDadosConfig">
        <Header nomeIndustria="Sweet Sunset" />

        <main className="conteudoDadosConfig">
          {/* Topo com Seta de Voltar e Título. APROVANDO */}
          <div className="topoDadosConfig">
            <button
              type="button"
              className="botaoVoltarConfig"
              onClick={() => navigate(-1)}
              title="Voltar"
            >
              ←
            </button>
            <h1 className="tituloDadosConfig">Dados da indústria</h1>
          </div>

          {/* Card Único envelopando os dados */}
          <div className="cardDadosConfig">
            {/* --- SEÇÃO: DADOS CADASTRAIS --- */}
            <section className="secaoBlocoConfig">
              <h2 className="subtituloDadosConfig">Dados cadastrais</h2>

              {/* Linha 1 */}
              <div className="linhaGrid2">
                <label className="campoFormConfig">
                  <span>Razão social:</span>
                  <input
                    type="text"
                    defaultValue="Sweet Sunset Indústria de Confeitaria LTDA"
                  />
                </label>
                <label className="campoFormConfig">
                  <span>Nome fantasia:</span>
                  <input type="text" defaultValue="Sweet Sunset" />
                </label>
              </div>

              {/* Linha 2 */}
              <div className="linhaGrid3">
                <label className="campoFormConfig">
                  <span>CNPJ:</span>
                  <input type="text" defaultValue="12.345.678/9000-90" />
                </label>
                <label className="campoFormConfig">
                  <span>Inscrição estadual:</span>
                  <input type="text" defaultValue="12.345.678/9000-90" />
                </label>
                <label className="campoFormConfig">
                  <span>Inscrição municipal:</span>
                  <input type="text" defaultValue="12.345.678/9000-90" />
                </label>
              </div>

              {/* Linha 3 */}
              <div className="linhaGrid3">
                <label className="campoFormConfig">
                  <span>Data de fundação:</span>
                  <div className="inputComIconeEsquerda">
                    <svg
                      className="iconeInput"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <input type="text" defaultValue="01/02/2021" />
                  </div>
                </label>
                <label className="campoFormConfig">
                  <span>Telefone:</span>
                  <input type="tel" defaultValue="(11) 98765-4321" />
                </label>
                <label className="campoFormConfig">
                  <span>E-mail:</span>
                  <input
                    type="email"
                    defaultValue="Contato@SweetSunset.com.br"
                  />
                </label>
              </div>
            </section>

            {/* --- SEÇÃO: ENDEREÇO --- */}
            <section className="secaoBlocoConfig">
              <h2 className="subtituloDadosConfig">Endereço</h2>

              {/* Linha 1 Endereço */}
              <div className="linhaGridEndereco1">
                <label className="campoFormConfig">
                  <span>CEP:</span>
                  <div className="inputComIconeDireita">
                    <input type="text" defaultValue="01234-567" />
                    <svg
                      className="iconeLupa"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                </label>
                <label className="campoFormConfig">
                  <span>Rua/avenida:</span>
                  <input type="text" defaultValue="Rua da Alegria" />
                </label>
                <label className="campoFormConfig">
                  <span>Número:</span>
                  <input type="text" defaultValue="012" />
                </label>
                <label className="campoFormConfig">
                  <span>Complemento:</span>
                  <input type="text" defaultValue="-" />
                </label>
              </div>

              {/* Linha 2 Endereço */}
              <div className="linhaGridEndereco2">
                <label className="campoFormConfig">
                  <span>Bairro:</span>
                  <input type="text" defaultValue="Bairro da Riqueza" />
                </label>
                <label className="campoFormConfig">
                  <span>Cidade:</span>
                  <div className="containerSelect">
                    <select defaultValue="São Paulo">
                      <option value="São Paulo">São Paulo</option>
                    </select>
                  </div>
                </label>
                <label className="campoFormConfig">
                  <span>Estado:</span>
                  <div className="containerSelect">
                    <select defaultValue="SP">
                      <option value="SP">SP</option>
                    </select>
                  </div>
                </label>

                {/* Botão Salvar Alinhado na mesma linha */}
                <div className="containerBotaoSalvar">
                  <button type="button" className="botaoSalvarConfig">
                    <svg
                      className="iconeSalvar"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>
                    Salvar alterações
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DadosConfig;
