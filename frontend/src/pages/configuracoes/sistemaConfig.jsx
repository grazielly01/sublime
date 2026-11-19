import React, { useState } from "react";
import "./sistemaConfig.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { useNavigate } from "react-router-dom";

function SistemaConfig() {
  const navigate = useNavigate();

  // Estados dos modais de sistema
  const [modalIdiomaAberto, setModalIdiomaAberto] = useState(false);
  const [modalBackupAberto, setModalBackupAberto] = useState(false);
  const [modalAparenciaAberto, setModalAparenciaAberto] = useState(false);

  // Estados dos campos editáveis
  const [idioma, setIdioma] = useState("pt-BR");
  const [formatoData, setFormatoData] = useState("DD/MM/AAAA");
  const [frequenciaBackup, setFrequenciaBackup] = useState("Diário");
  const [horarioBackup, setHorarioBackup] = useState("02:00");
  const [temaSelecionado, setTemaSelecionado] = useState("Vinho");

  return (
    <div className="tudoSistemaConfig">
      <Sidebar paginaAtiva="Configurações" />

      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset" />

        <main className="conteudoSistemaConfig">
          <div className="topoSistemaConfig">
            <button
              className="botaoVoltarSistema"
              onClick={() => navigate("/configuracoes")}
              title="Voltar"
            >
              ←
            </button>
            <h1 className="tituloSistemaConfig">Sistema</h1>
          </div>

          {/* Cards / Botões divididos para abrir os modais específicos */}
          <div className="cardsSistemaConfigLista">
            <div
              className="cardOpcaoSistema"
              onClick={() => setModalIdiomaAberto(true)}
            >
              <h2>Idioma e Formato</h2>
              <p>Idioma do sistema, formato de datas e localização...</p>
            </div>

            <div
              className="cardOpcaoSistema"
              onClick={() => setModalBackupAberto(true)}
            >
              <h2>Backup Automático</h2>
              <p>Frequência, horários, histórico e backup manual...</p>
            </div>

            <div
              className="cardOpcaoSistema"
              onClick={() => setModalAparenciaAberto(true)}
            >
              <h2>Aparência e Cores</h2>
              <p>Temas, paleta de cores e preferências visuais...</p>
            </div>
          </div>
        </main>
      </div>

      {/* =====================================================
         POP-UP MODAL: IDIOMA E FORMATO
      ===================================================== */}
      {modalIdiomaAberto && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "650px", width: "90%", padding: "32px" }}>
            <div className="modalCabecalho" style={{ marginBottom: "20px" }}>
              <h2 style={{ fontSize: "22px" }}>Idioma e Formato</h2>
              <button
                type="button"
                className="botaoFecharModal"
                onClick={() => setModalIdiomaAberto(false)}
                style={{ fontSize: "24px" }}
              >
                &times;
              </button>
            </div>

            <div className="modalCorpo" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: 600, fontSize: "15px" }}>Idioma do sistema:</label>
                <select
                  value={idioma}
                  onChange={(e) => setIdioma(e.target.value)}
                  style={{ height: "46px", padding: "0 12px", borderRadius: "8px", border: "1px solid #c9939a", background: "#fff", fontSize: "15px" }}
                >
                  <option value="pt-BR">Português (BR)</option>
                  <option value="en-US">English (US)</option>
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: 600, fontSize: "15px" }}>Formato da data:</label>
                <select
                  value={formatoData}
                  onChange={(e) => setFormatoData(e.target.value)}
                  style={{ height: "46px", padding: "0 12px", borderRadius: "8px", border: "1px solid #c9939a", background: "#fff", fontSize: "15px" }}
                >
                  <option value="DD/MM/AAAA">DD/MM/AAAA</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setModalIdiomaAberto(false)}
                  style={{ padding: "12px 24px", borderRadius: "999px", border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontWeight: "600", fontSize: "15px" }}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => setModalIdiomaAberto(false)}
                  style={{ padding: "12px 24px", borderRadius: "999px", border: "none", background: "#8e1027", color: "#fff", fontWeight: "600", cursor: "pointer", fontSize: "15px" }}
                >
                  Salvar alterações
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
         POP-UP MODAL: BACKUP AUTOMÁTICO
      ===================================================== */}
      {modalBackupAberto && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "650px", width: "90%", padding: "32px" }}>
            <div className="modalCabecalho" style={{ marginBottom: "20px" }}>
              <h2 style={{ fontSize: "22px" }}>Backup Automático</h2>
              <button
                type="button"
                className="botaoFecharModal"
                onClick={() => setModalBackupAberto(false)}
                style={{ fontSize: "24px" }}
              >
                &times;
              </button>
            </div>

            <div className="modalCorpo" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: 600, fontSize: "15px" }}>Frequência do backup automático:</label>
                <select
                  value={frequenciaBackup}
                  onChange={(e) => setFrequenciaBackup(e.target.value)}
                  style={{ height: "46px", padding: "0 12px", borderRadius: "8px", border: "1px solid #c9939a", background: "#fff", fontSize: "15px" }}
                >
                  <option value="Diário">Diário</option>
                  <option value="Semanal">Semanal</option>
                  <option value="Mensal">Mensal</option>
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontWeight: 600, fontSize: "15px" }}>Horário do backup automático:</label>
                <input
                  type="time"
                  value={horarioBackup}
                  onChange={(e) => setHorarioBackup(e.target.value)}
                  style={{ height: "46px", padding: "0 12px", borderRadius: "8px", border: "1px solid #c9939a", background: "#fff", fontSize: "15px" }}
                />
              </div>

              <div style={{ padding: "16px", background: "#fff5f3", borderRadius: "8px", border: "1px solid #efc5c8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "14px", color: "#6b5558" }}>Último backup: 25/05/2026 às 02:08</span>
                <button
                  type="button"
                  onClick={() => alert("Backup realizado com sucesso!")}
                  style={{ background: "#fff", color: "#9d0926", border: "1px solid #9d0926", padding: "8px 16px", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontSize: "13px" }}
                >
                  Realizar agora
                </button>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setModalBackupAberto(false)}
                  style={{ padding: "12px 24px", borderRadius: "999px", border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontWeight: "600", fontSize: "15px" }}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => setModalBackupAberto(false)}
                  style={{ padding: "12px 24px", borderRadius: "999px", border: "none", background: "#8e1027", color: "#fff", fontWeight: "600", cursor: "pointer", fontSize: "15px" }}
                >
                  Salvar alterações
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
         POP-UP MODAL: APARÊNCIA E CORES
      ===================================================== */}
      {modalAparenciaAberto && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "650px", width: "90%", padding: "32px" }}>
            <div className="modalCabecalho" style={{ marginBottom: "20px" }}>
              <h2 style={{ fontSize: "22px" }}>Aparência e Cores</h2>
              <button
                type="button"
                className="botaoFecharModal"
                onClick={() => setModalAparenciaAberto(false)}
                style={{ fontSize: "24px" }}
              >
                &times;
              </button>
            </div>

            <div className="modalCorpo" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <p style={{ color: "#7A6E6C", fontSize: "15px" }}>
                Selecione a combinação de cores utilizada pelo sistema (Tema atual: <strong>{temaSelecionado}</strong>):
              </p>

              <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                <div onClick={() => setTemaSelecionado("Claro")} style={{ textAlign: "center", cursor: "pointer" }}>
                  <div style={{ width: "54px", height: "54px", borderRadius: "50%", background: "#fff5f3", border: temaSelecionado === "Claro" ? "3px solid #9d0926" : "1px solid #d5b4b8", boxShadow: "0 3px 7px rgba(0,0,0,0.08)" }} />
                  <span style={{ fontSize: "13px", fontWeight: 600, marginTop: "6px", display: "block" }}>Claro</span>
                </div>
                <div onClick={() => setTemaSelecionado("Rosa")} style={{ textAlign: "center", cursor: "pointer" }}>
                  <div style={{ width: "54px", height: "54px", borderRadius: "50%", background: "#f5c6cb", border: temaSelecionado === "Rosa" ? "3px solid #9d0926" : "1px solid #d5b4b8", boxShadow: "0 3px 7px rgba(0,0,0,0.08)" }} />
                  <span style={{ fontSize: "13px", fontWeight: 600, marginTop: "6px", display: "block" }}>Rosa</span>
                </div>
                <div onClick={() => setTemaSelecionado("Vinho")} style={{ textAlign: "center", cursor: "pointer" }}>
                  <div style={{ width: "54px", height: "54px", borderRadius: "50%", background: "#9d0926", border: temaSelecionado === "Vinho" ? "3px solid #9d0926" : "1px solid #d5b4b8", boxShadow: "0 3px 7px rgba(0,0,0,0.08)" }} />
                  <span style={{ fontSize: "13px", fontWeight: 600, marginTop: "6px", display: "block" }}>Vinho</span>
                </div>
                <div onClick={() => setTemaSelecionado("Escuro")} style={{ textAlign: "center", cursor: "pointer" }}>
                  <div style={{ width: "54px", height: "54px", borderRadius: "50%", background: "#4a2c2a", border: temaSelecionado === "Escuro" ? "3px solid #9d0926" : "1px solid #d5b4b8", boxShadow: "0 3px 7px rgba(0,0,0,0.08)" }} />
                  <span style={{ fontSize: "13px", fontWeight: 600, marginTop: "6px", display: "block" }}>Escuro</span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setModalAparenciaAberto(false)}
                  style={{ padding: "12px 24px", borderRadius: "999px", border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontWeight: "600", fontSize: "15px" }}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => setModalAparenciaAberto(false)}
                  style={{ padding: "12px 24px", borderRadius: "999px", border: "none", background: "#8e1027", color: "#fff", fontWeight: "600", cursor: "pointer", fontSize: "15px" }}
                >
                  Salvar alterações
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SistemaConfig;