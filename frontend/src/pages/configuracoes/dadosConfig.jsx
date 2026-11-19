import React, { useState } from "react";
import "./dadosConfig.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

function DadosConfig() {
  const navigate = useNavigate();

  // Estados dos dados da indústria
  const [razaoSocial, setRazaoSocial] = useState("Sweet Sunset Indústria de Confeitaria LTDA");
  const [nomeFantasia, setNomeFantasia] = useState("Sweet Sunset");
  const [cnpj, setCnpj] = useState("12.345.678/9000-90");
  const [inscricaoEstadual, setInscricaoEstadual] = useState("12.345.678/9000-90");
  const [inscricaoMunicipal, setInscricaoMunicipal] = useState("12.345.678/9000-90");
  const [dataFundacao, setDataFundacao] = useState("01/02/2021");
  const [telefone, setTelefone] = useState("(11) 98765-4321");
  const [email, setEmail] = useState("Contato@SweetSunset.com.br");

  const [cep, setCep] = useState("01234-567");
  const [rua, setRua] = useState("Rua da Alegria");
  const [numero, setNumero] = useState("012");
  const [complemento, setComplemento] = useState("-");
  const [bairro, setBairro] = useState("Bairro da Riqueza");
  const [cidade, setCidade] = useState("São Paulo");
  const [estado, setEstado] = useState("SP");

  // Estados para controlar os modais
  const [modalCadastraisAberto, setModalCadastraisAberto] = useState(false);
  const [modalEnderecoAberto, setModalEnderecoAberto] = useState(false);

  const salvarCadastrais = (e) => {
    e.preventDefault();
    setModalCadastraisAberto(false);
  };

  const salvarEndereco = (e) => {
    e.preventDefault();
    setModalEnderecoAberto(false);
  };

  return (
    <div className="tudoDadosConfig">
      <Sidebar paginaAtiva="Configurações" />

      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset" />

        <main className="conteudoDadosConfig">
          <div className="topoDadosConfig">
            <button
              type="button"
              className="botaoVoltarConfig"
              onClick={() => navigate("/configuracoes")}
              title="Voltar"
            >
              ←
            </button>
            <h1 className="tituloDadosConfig">Dados da indústria</h1>
          </div>

          {/* Lista de botões divididos */}
          <div className="cardsDadosConfigLista">
            <div
              className="cardOpcaoDados"
              onClick={() => setModalCadastraisAberto(true)}
            >
              <h2>Dados cadastrais</h2>
              <p>Razão social, CNPJ, Inscrição estadual, Contatos...</p>
            </div>

            <div
              className="cardOpcaoDados"
              onClick={() => setModalEnderecoAberto(true)}
            >
              <h2>Endereço</h2>
              <p>CEP, Rua, Número, Bairro, Cidade, Estado...</p>
            </div>
          </div>
        </main>
      </div>

      {/* =====================================================
         POP-UP MODAL: EDITAR DADOS CADASTRAIS
      ===================================================== */}
      {modalCadastraisAberto && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "860px" }}>
            <div className="modalCabecalho">
              <h2>Editar dados cadastrais</h2>
              <button
                type="button"
                className="botaoFecharModal"
                onClick={() => setModalCadastraisAberto(false)}
              >
                &times;
              </button>
            </div>

            <div className="modalCorpo">
              <form onSubmit={salvarCadastrais} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", gap: "16px" }}>
                  <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontWeight: 600, fontSize: "13px" }}>Razão social:</label>
                    <input
                      type="text"
                      value={razaoSocial}
                      onChange={(e) => setRazaoSocial(e.target.value)}
                      required
                      style={{ height: "40px", padding: "0 12px", border: "1px solid #c9939a", borderRadius: "8px" }}
                    />
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontWeight: 600, fontSize: "13px" }}>Nome fantasia:</label>
                    <input
                      type="text"
                      value={nomeFantasia}
                      onChange={(e) => setNomeFantasia(e.target.value)}
                      required
                      style={{ height: "40px", padding: "0 12px", border: "1px solid #c9939a", borderRadius: "8px" }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "16px" }}>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontWeight: 600, fontSize: "13px" }}>CNPJ:</label>
                    <input
                      type="text"
                      value={cnpj}
                      onChange={(e) => setCnpj(e.target.value)}
                      required
                      style={{ height: "40px", padding: "0 12px", border: "1px solid #c9939a", borderRadius: "8px" }}
                    />
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontWeight: 600, fontSize: "13px" }}>Inscrição estadual:</label>
                    <input
                      type="text"
                      value={inscricaoEstadual}
                      onChange={(e) => setInscricaoEstadual(e.target.value)}
                      style={{ height: "40px", padding: "0 12px", border: "1px solid #c9939a", borderRadius: "8px" }}
                    />
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontWeight: 600, fontSize: "13px" }}>Inscrição municipal:</label>
                    <input
                      type="text"
                      value={inscricaoMunicipal}
                      onChange={(e) => setInscricaoMunicipal(e.target.value)}
                      style={{ height: "40px", padding: "0 12px", border: "1px solid #c9939a", borderRadius: "8px" }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "16px" }}>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontWeight: 600, fontSize: "13px" }}>Data de fundação:</label>
                    <input
                      type="text"
                      value={dataFundacao}
                      onChange={(e) => setDataFundacao(e.target.value)}
                      style={{ height: "40px", padding: "0 12px", border: "1px solid #c9939a", borderRadius: "8px" }}
                    />
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontWeight: 600, fontSize: "13px" }}>Telefone:</label>
                    <input
                      type="tel"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      style={{ height: "40px", padding: "0 12px", border: "1px solid #c9939a", borderRadius: "8px" }}
                    />
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontWeight: 600, fontSize: "13px" }}>E-mail:</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ height: "40px", padding: "0 12px", border: "1px solid #c9939a", borderRadius: "8px" }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "16px" }}>
                  <button
                    type="button"
                    onClick={() => setModalCadastraisAberto(false)}
                    style={{ padding: "10px 20px", borderRadius: "999px", border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontWeight: "600" }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    style={{ padding: "10px 20px", borderRadius: "999px", border: "none", background: "#8e1027", color: "#fff", fontWeight: "600", cursor: "pointer" }}
                  >
                    Salvar alterações
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
         POP-UP MODAL: EDITAR ENDEREÇO
      ===================================================== */}
      {modalEnderecoAberto && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "860px" }}>
            <div className="modalCabecalho">
              <h2>Editar endereço</h2>
              <button
                type="button"
                className="botaoFecharModal"
                onClick={() => setModalEnderecoAberto(false)}
              >
                &times;
              </button>
            </div>

            <div className="modalCorpo">
              <form onSubmit={salvarEndereco} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr 1fr", gap: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontWeight: 600, fontSize: "13px" }}>CEP:</label>
                    <input
                      type="text"
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                      required
                      style={{ height: "40px", padding: "0 12px", border: "1px solid #c9939a", borderRadius: "8px" }}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontWeight: 600, fontSize: "13px" }}>Rua/avenida:</label>
                    <input
                      type="text"
                      value={rua}
                      onChange={(e) => setRua(e.target.value)}
                      required
                      style={{ height: "40px", padding: "0 12px", border: "1px solid #c9939a", borderRadius: "8px" }}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontWeight: 600, fontSize: "13px" }}>Número:</label>
                    <input
                      type="text"
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}
                      required
                      style={{ height: "40px", padding: "0 12px", border: "1px solid #c9939a", borderRadius: "8px" }}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontWeight: 600, fontSize: "13px" }}>Complemento:</label>
                    <input
                      type="text"
                      value={complemento}
                      onChange={(e) => setComplemento(e.target.value)}
                      style={{ height: "40px", padding: "0 12px", border: "1px solid #c9939a", borderRadius: "8px" }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontWeight: 600, fontSize: "13px" }}>Bairro:</label>
                    <input
                      type="text"
                      value={bairro}
                      onChange={(e) => setBairro(e.target.value)}
                      required
                      style={{ height: "40px", padding: "0 12px", border: "1px solid #c9939a", borderRadius: "8px" }}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontWeight: 600, fontSize: "13px" }}>Cidade:</label>
                    <select
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                      style={{ height: "40px", padding: "0 8px", border: "1px solid #c9939a", borderRadius: "8px", background: "#fff" }}
                    >
                      <option value="São Paulo">São Paulo</option>
                      <option value="Rio de Janeiro">Rio de Janeiro</option>
                      <option value="Campinas">Campinas</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontWeight: 600, fontSize: "13px" }}>Estado:</label>
                    <select
                      value={estado}
                      onChange={(e) => setEstado(e.target.value)}
                      style={{ height: "40px", padding: "0 8px", border: "1px solid #c9939a", borderRadius: "8px", background: "#fff" }}
                    >
                      <option value="SP">SP</option>
                      <option value="RJ">RJ</option>
                      <option value="MG">MG</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "16px" }}>
                  <button
                    type="button"
                    onClick={() => setModalEnderecoAberto(false)}
                    style={{ padding: "10px 20px", borderRadius: "999px", border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontWeight: "600" }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    style={{ padding: "10px 20px", borderRadius: "999px", border: "none", background: "#8e1027", color: "#fff", fontWeight: "600", cursor: "pointer" }}
                  >
                    Salvar alterações
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DadosConfig;