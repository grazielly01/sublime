import React, { useState } from "react";
import "./segurancaConfig.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { useNavigate } from "react-router-dom";

function SegurancaConfig() {
  const navigate = useNavigate();

  // Estados dos modais de segurança
  const [modalAuthAberto, setModalAuthAberto] = useState(false);
  const [modalAcessoAberto, setModalAcessoAberto] = useState(false);
  const [modalHistoricoAberto, setModalHistoricoAberto] = useState(false);

  // Estados internos
  const [doisFatores, setDoisFatores] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");

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

  const [historico] = useState([
    { acao: "Login realizado com sucesso", data: "26/05/2026 - 08:30", ip: "192.168.1.15" },
    { acao: "Alteração de senha de segurança", data: "20/05/2026 - 14:12", ip: "192.168.1.15" },
    { acao: "Novo usuário cadastrado (Beatriz Almeida)", data: "15/05/2026 - 10:05", ip: "192.168.1.10" },
    { acao: "Backup manual executado", data: "10/05/2026 - 02:00", ip: "Sistema" },
  ]);

  const alternarUsuario = (index) => {
    setUsuarios((prev) =>
      prev.map((usuario, i) =>
        i === index ? { ...usuario, ativo: !usuario.ativo } : usuario
      )
    );
  };

  return (
    <div className="tudoSegurancaConfig">
      <Sidebar paginaAtiva="Configurações" />

      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset" />

        <main className="conteudoSegurancaConfig">
          <div className="topoSegurancaConfig">
            <button
              className="botaoVoltarSeguranca"
              onClick={() => navigate("/configuracoes")}
              title="Voltar"
            >
              ←
            </button>
            <h1 className="tituloSegurancaConfig">Segurança</h1>
          </div>

          {/* Cards / Botões divididos */}
          <div className="cardsSegurancaConfigLista">
            <div
              className="cardOpcaoSeguranca"
              onClick={() => setModalAuthAberto(true)}
            >
              <h2>Login e Autenticação (2FA)</h2>
              <p>Autenticação de dois fatores, alteração de senha e credenciais...</p>
            </div>

            <div
              className="cardOpcaoSeguranca"
              onClick={() => setModalAcessoAberto(true)}
            >
              <h2>Controle de Acesso de Usuários</h2>
              <p>Gerenciar acessos ativos, permissões e status dos colaboradores...</p>
            </div>

            <div
              className="cardOpcaoSeguranca"
              onClick={() => setModalHistoricoAberto(true)}
            >
              <h2>Histórico de Atividades</h2>
              <p>Registro de logins, alterações críticas e auditoria do sistema...</p>
            </div>
          </div>
        </main>
      </div>

      {/* =====================================================
         POP-UP MODAL: LOGIN E AUTENTICAÇÃO (2FA)
      ===================================================== */}
      {modalAuthAberto && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "650px", width: "90%", padding: "32px" }}>
            <div className="modalCabecalho" style={{ marginBottom: "20px" }}>
              <h2 style={{ fontSize: "22px" }}>Login e Autenticação</h2>
              <button
                type="button"
                className="botaoFecharModal"
                onClick={() => setModalAuthAberto(false)}
                style={{ fontSize: "24px" }}
              >
                &times;
              </button>
            </div>

            <div className="modalCorpo" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", background: "#fff5f3", borderRadius: "10px", border: "1px solid #efc5c8" }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: "15px", display: "block" }}>Autenticação de dois fatores (2FA)</span>
                  <span style={{ fontSize: "13px", color: "#6b5558" }}>Adicione uma camada extra de proteção à sua conta</span>
                </div>
                <button
                  type="button"
                  className={`toggle ${doisFatores ? "ativo" : ""}`}
                  onClick={() => setDoisFatores(!doisFatores)}
                >
                  <span className="bolinhaToggle"></span>
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: 600, fontSize: "14px" }}>Senha atual:</label>
                <input
                  type="password"
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                  placeholder="Digite sua senha atual"
                  style={{ height: "46px", padding: "0 12px", borderRadius: "8px", border: "1px solid #c9939a", background: "#fff" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: 600, fontSize: "14px" }}>Nova senha:</label>
                <input
                  type="password"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  placeholder="Digite a nova senha"
                  style={{ height: "46px", padding: "0 12px", borderRadius: "8px", border: "1px solid #c9939a", background: "#fff" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setModalAuthAberto(false)}
                  style={{ padding: "12px 24px", borderRadius: "999px", border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontWeight: "600" }}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => { alert("Configurações de autenticação salvas!"); setModalAuthAberto(false); }}
                  style={{ padding: "12px 24px", borderRadius: "999px", border: "none", background: "#8e1027", color: "#fff", fontWeight: "600", cursor: "pointer" }}
                >
                  Salvar alterações
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
         POP-UP MODAL: CONTROLE DE ACESSO DE USUÁRIOS
      ===================================================== */}
      {modalAcessoAberto && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "750px", width: "90%", padding: "32px" }}>
            <div className="modalCabecalho" style={{ marginBottom: "20px" }}>
              <h2 style={{ fontSize: "22px" }}>Controle de Acesso</h2>
              <button
                type="button"
                className="botaoFecharModal"
                onClick={() => setModalAcessoAberto(false)}
                style={{ fontSize: "24px" }}
              >
                &times;
              </button>
            </div>

            <div className="modalCorpo" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <p style={{ margin: 0, color: "#6b5558", fontSize: "14px" }}>
                Usuários ativos no sistema — <strong>{usuarios.filter((u) => u.ativo).length}</strong> de {usuarios.length} usuários habilitados.
              </p>

              <div className="listaUsuarios" style={{ maxHeight: "380px", overflowY: "auto", borderTop: "1px solid #efc5c8", marginTop: "10px" }}>
                {usuarios.map((usuario, index) => (
                  <div className="usuarioLinha" key={index} style={{ padding: "12px 4px", borderBottom: "1px solid #f0d8da", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className="informacoesUsuario" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div className="avatarUsuario" style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#ffe5e8", color: "#9d0926", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700" }}>
                        {usuario.nome.charAt(0)}
                      </div>
                      <span style={{ fontWeight: 500, fontSize: "15px" }}>{usuario.nome}</span>
                    </div>

                    <button
                      type="button"
                      className={`toggle toggleUsuario ${usuario.ativo ? "ativo" : ""}`}
                      onClick={() => alternarUsuario(index)}
                      style={{ width: "46px", height: "25px", position: "relative", border: "none", borderRadius: "50px", background: usuario.ativo ? "#9d0926" : "#d8c3c6", cursor: "pointer" }}
                    >
                      <span className="bolinhaToggle" style={{ position: "absolute", top: "4px", left: usuario.ativo ? "25px" : "4px", width: "17px", height: "17px", borderRadius: "50%", background: "#fff", transition: "left 0.2s ease" }}></span>
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setModalAcessoAberto(false)}
                  style={{ padding: "12px 24px", borderRadius: "999px", border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontWeight: "600" }}
                >
                  Concluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
         POP-UP MODAL: HISTÓRICO DE ATIVIDADES
      ===================================================== */}
      {modalHistoricoAberto && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "750px", width: "90%", padding: "32px" }}>
            <div className="modalCabecalho" style={{ marginBottom: "20px" }}>
              <h2 style={{ fontSize: "22px" }}>Histórico de Atividades</h2>
              <button
                type="button"
                className="botaoFecharModal"
                onClick={() => setModalHistoricoAberto(false)}
                style={{ fontSize: "24px" }}
              >
                &times;
              </button>
            </div>

            <div className="modalCorpo" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <p style={{ color: "#6b5558", fontSize: "14px" }}>
                Registro recente de auditoria e eventos de segurança do sistema:
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "380px", overflowY: "auto" }}>
                {historico.map((h, i) => (
                  <div key={i} style={{ padding: "14px 16px", background: "#fff", border: "1px solid #EDE3E1", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <strong style={{ fontSize: "15px", color: "#2B2B2B", display: "block" }}>{h.acao}</strong>
                      <span style={{ fontSize: "13px", color: "#7A6E6C" }}>IP: {h.ip}</span>
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#8E1027" }}>{h.data}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setModalHistoricoAberto(false)}
                  style={{ padding: "12px 24px", borderRadius: "999px", border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontWeight: "600" }}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SegurancaConfig;