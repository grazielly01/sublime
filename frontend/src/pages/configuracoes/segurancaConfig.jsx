import "./segurancaConfig.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SegurancaConfig() {
  const navigate = useNavigate();

  const [doisFatores, setDoisFatores] = useState(false);
  const [mostrarUsuarios, setMostrarUsuarios] = useState(false);

  const [usuarios, setUsuarios] = useState([
    { nome: "João Carvalho Moraes", ativo: true },
    { nome: "Amanda Ferreira Fenix", ativo: true },
    { nome: "Sebastião Pinheiro Santos", ativo: true },
    { nome: "Lívia Stenberg Amorim", ativo: true },
    { nome: "Pedro da Silva Guimarães", ativo: true },
    { nome: "Mariana Oliveira Santos", ativo: true },
    { nome: "Lucas Ferreira Costa", ativo: true },
    { nome: "Beatriz Almeida", ativo: true },
    { nome: "Gabriel Souza", ativo: true },
  ]);

  const alternarUsuario = (index) => {
    setUsuarios((prev) =>
      prev.map((usuario, i) =>
        i === index
          ? { ...usuario, ativo: !usuario.ativo }
          : usuario
      )
    );
  };

  return (
    <div className="tudoSegurancaConfig">
      <Sidebar paginaAtiva="Configurações" />

      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset" />

        <main className="conteudoSegurancaConfig">

          {/* TÍTULO + VOLTAR. APROVANDO */}
          <div className="topoSegurancaConfig">
            <button
              className="botaoVoltarSeguranca"
              onClick={() => navigate(-1)}
              title="Voltar"
            >
              ←
            </button>

            <h1 className="tituloSegurancaConfig">
              Segurança
            </h1>
          </div>

          {/* LOGIN E AUTENTICAÇÃO */}
          <section className="secaoSegurancaConfig">
            <h2>Login e autenticação</h2>

            <div className="configuracaoLinha">
              <div className="textoConfiguracao">
                <span className="tituloConfiguracao">
                  Autenticação de dois fatores (2FA)
                </span>

                <p className="descricao2FA">
                  Adicione uma camada extra de proteção à sua conta
                </p>
              </div>

              <button
                type="button"
                className={`toggle ${doisFatores ? "ativo" : ""}`}
                onClick={() => setDoisFatores(!doisFatores)}
                aria-label="Ativar autenticação de dois fatores"
              >
                <span className="bolinhaToggle"></span>
              </button>
            </div>
          </section>

          {/* CONTROLE DE ACESSO */}
          <section className="secaoSegurancaConfig">
            <div className="cabecalhoAcesso">
              <div>
                <h2>Controle de acesso</h2>

                <p className="usuariosAtivos">
                  Usuários ativos —{" "}
                  {usuarios.filter((usuario) => usuario.ativo).length} usuários
                </p>
              </div>

              <button
                className="botaoVerUsuarios"
                onClick={() => setMostrarUsuarios(!mostrarUsuarios)}
              >
                {mostrarUsuarios ? "Ocultar usuários" : "Ver usuários"}
              </button>
            </div>

            {/* LISTA DE USUÁRIOS */}
            {mostrarUsuarios && (
              <div className="listaUsuarios">
                {usuarios.map((usuario, index) => (
                  <div className="usuarioLinha" key={index}>
                    <div className="informacoesUsuario">
                      <div className="avatarUsuario">
                        {usuario.nome.charAt(0)}
                      </div>

                      <span>{usuario.nome}</span>
                    </div>

                    <button
                      type="button"
                      className={`toggle toggleUsuario ${
                        usuario.ativo ? "ativo" : ""
                      }`}
                      onClick={() => alternarUsuario(index)}
                    >
                      <span className="bolinhaToggle"></span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* BOTÃO SALVAR */}
          <div className="acoesSeguranca">
            <button className="botaoSalvarSeguranca">
              Salvar alterações
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}

export default SegurancaConfig;
