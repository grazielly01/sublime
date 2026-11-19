import React, { useState } from "react";
import "./equipeConfig.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { useNavigate } from "react-router-dom";

function EquipeConfig() {
  const navigate = useNavigate();

  // Estados dos modais de equipe
  const [modalColaboradoresAberto, setModalColaboradoresAberto] = useState(false);
  const [modalCargosAberto, setModalCargosAberto] = useState(false);

  // Estado para edição do cargo selecionado
  const [cargoEditando, setCargoEditando] = useState(null);
  const [permissoesSelecionadas, setPermissoesSelecionadas] = useState({
    producao: false,
    estoque: false,
    financeiro: false,
    pedidos: false,
    configuracoes: false,
  });

  // Lista completa com todos os colaboradores originais
  const [colaboradores] = useState([
    {
      nome: "João Carvalho Moraes",
      cargo: "Gerente de produção",
      salario: "R$ 5.500,00",
      horario: "Seg à Sex: 7:00 - 16:00",
    },
    {
      nome: "Amanda Ferreira Fenix",
      cargo: "Auxiliar de limpeza",
      salario: "R$ 2.800,00",
      horario: "Seg à Sex: 7:00 - 16:00",
    },
    {
      nome: "Sebastião Pinheiro Santos",
      cargo: "Confeiteiro",
      salario: "R$ 4.700,00",
      horario: "Seg à Sex: 7:00 - 13:00",
    },
    {
      nome: "Lívia Stenberg Amorim",
      cargo: "Gerente de estoque",
      salario: "R$ 6.300,00",
      horario: "Seg à Sex: 7:00 - 14:00",
    },
    {
      nome: "Pedro da Silva Guimarães",
      cargo: "Gerente de pedidos",
      salario: "R$ 5.700,00",
      horario: "Seg à Sex: 7:00 - 15:00",
    },
  ]);

  // Lista de cargos para o modal interativo
  const [cargos, setCargos] = useState([
    { id: 1, nome: "Gerente de Produção", descricao: "Acesso total à produção e estoque", permissoes: { producao: true, estoque: true, financeiro: false, pedidos: true, configuracoes: false } },
    { id: 2, nome: "Confeiteiro", descricao: "Acesso a receitas e pedidos", permissoes: { producao: true, estoque: false, financeiro: false, pedidos: true, configuracoes: false } },
    { id: 3, nome: "Auxiliar de Limpeza", descricao: "Acesso restrito", permissoes: { producao: false, estoque: false, financeiro: false, pedidos: false, configuracoes: false } },
    { id: 4, nome: "Gerente de Estoque", descricao: "Controle total de insumos e armazém", permissoes: { producao: false, estoque: true, financeiro: false, pedidos: false, configuracoes: false } },
  ]);

  const abrirEdicaoCargo = (cargoObj) => {
    setCargoEditando(cargoObj);
    setPermissoesSelecionadas({ ...cargoObj.permissoes });
  };

  const salvarPermissoes = () => {
    setCargos(cargos.map(c => c.id === cargoEditando.id ? { ...c, permissoes: { ...permissoesSelecionadas } } : c));
    setCargoEditando(null);
  };

  return (
    <div className="tudoEquipeConfig">
      <Sidebar paginaAtiva="Configurações" />

      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset" />

        <main className="conteudoEquipeConfig">
          <div className="topoEquipeConfig">
            <div className="tituloComVoltarEquipe">
              <button
                className="botaoVoltarEquipe"
                onClick={() => navigate("/configuracoes")}
                title="Voltar"
              >
                ←
              </button>
              <h1 className="tituloEquipeConfig">Equipe</h1>
            </div>
          </div>

          {/* Cards / Botões divididos */}
          <div className="cardsEquipeConfigLista">
            <div
              className="cardOpcaoEquipe"
              onClick={() => setModalColaboradoresAberto(true)}
            >
              <h2>Colaboradores</h2>
              <p>Gerenciar funcionários, cadastros, salários e contatos...</p>
            </div>

            <div
              className="cardOpcaoEquipe"
              onClick={() => setModalCargosAberto(true)}
            >
              <h2>Cargos e Permissões</h2>
              <p>Definir funções, níveis de acesso e departamentos...</p>
            </div>
          </div>
        </main>
      </div>

      {/* =====================================================
         POP-UP MODAL: GERENCIAR COLABORADORES (Maior e mais legível)
      ===================================================== */}
      {modalColaboradoresAberto && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "1050px", width: "90%", padding: "32px" }}>
            <div className="modalCabecalho" style={{ marginBottom: "20px" }}>
              <h2 style={{ fontSize: "22px" }}>Gerenciar colaboradores</h2>
              <button
                type="button"
                className="botaoFecharModal"
                onClick={() => setModalColaboradoresAberto(false)}
                style={{ fontSize: "24px" }}
              >
                &times;
              </button>
            </div>

            <div className="modalCorpo">
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
                <button
                  type="button"
                  className="botaoRegistrarColaborador"
                  onClick={() => navigate("/registrarconfig")}
                  style={{ padding: "10px 20px", fontSize: "14px" }}
                >
                  + Registrar colaborador
                </button>
              </div>

              <div className="containerTabelaEquipe" style={{ maxHeight: "450px", overflowY: "auto" }}>
                <table className="tabelaEquipeConfig" style={{ fontSize: "15px" }}>
                  <thead>
                    <tr>
                      <th style={{ padding: "16px" }}>Colaborador</th>
                      <th style={{ padding: "16px" }}>Cargo</th>
                      <th style={{ padding: "16px" }}>Salário</th>
                      <th style={{ padding: "16px" }}>Horário</th>
                    </tr>
                  </thead>
                  <tbody>
                    {colaboradores.map((c, i) => (
                      <tr key={i}>
                        <td style={{ padding: "16px" }}>
                          <div className="colaboradorInfo" style={{ gap: "16px" }}>
                            <div className="fotoColaborador" style={{ width: "42px", height: "42px", fontSize: "16px" }}>
                              <span>{c.nome.charAt(0)}</span>
                            </div>
                            <span className="nomeColaborador" style={{ fontSize: "15px" }}>{c.nome}</span>
                          </div>
                        </td>
                        <td style={{ padding: "16px" }}>{c.cargo}</td>
                        <td style={{ padding: "16px" }}>{c.salario}</td>
                        <td style={{ padding: "16px" }}>{c.horario}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
                <button
                  type="button"
                  onClick={() => setModalColaboradoresAberto(false)}
                  style={{ padding: "12px 24px", borderRadius: "999px", border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontWeight: "600", fontSize: "15px" }}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
         POP-UP MODAL: CARGOS E PERMISSÕES (Com edição funcional)
      ===================================================== */}
      {modalCargosAberto && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "750px", width: "90%", padding: "32px" }}>
            <div className="modalCabecalho" style={{ marginBottom: "20px" }}>
              <h2 style={{ fontSize: "22px" }}>
                {cargoEditando ? `Editar Permissões: ${cargoEditando.nome}` : "Cargos e Permissões"}
              </h2>
              <button
                type="button"
                className="botaoFecharModal"
                onClick={() => { setCargoEditando(null); setModalCargosAberto(false); }}
                style={{ fontSize: "24px" }}
              >
                &times;
              </button>
            </div>

            <div className="modalCorpo" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {!cargoEditando ? (
                <>
                  <p style={{ color: "#7A6E6C", fontSize: "15px" }}>
                    Selecione um cargo abaixo para ajustar interativamente as permissões de acesso ao sistema:
                  </p>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "380px", overflowY: "auto" }}>
                    {cargos.map((cargo) => (
                      <div key={cargo.id} style={{ padding: "16px 20px", background: "#fff", border: "1px solid #EDE3E1", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <strong style={{ fontSize: "16px", color: "#2B2B2B" }}>{cargo.nome}</strong>
                          <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#7A6E6C" }}>{cargo.descricao}</p>
                        </div>
                        <button 
                          onClick={() => abrirEdicaoCargo(cargo)}
                          style={{ background: "#8e1027", color: "#fff", border: "none", padding: "8px 18px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "14px" }}
                        >
                          Editar
                        </button>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
                    <button
                      type="button"
                      onClick={() => setModalCargosAberto(false)}
                      style={{ padding: "12px 24px", borderRadius: "999px", border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontWeight: "600", fontSize: "15px" }}
                    >
                      Concluir
                    </button>
                  </div>
                </>
              ) : (
                /* Tela interna de seleção de permissões ao clicar em Editar */
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <p style={{ color: "#7A6E6C", fontSize: "15px" }}>
                    Marque os módulos que este cargo pode acessar:
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", background: "#fff", padding: "20px", borderRadius: "10px", border: "1px solid #EDE3E1" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", cursor: "pointer" }}>
                      <input 
                        type="checkbox" 
                        checked={permissoesSelecionadas.producao}
                        onChange={(e) => setPermissoesSelecionadas({...permissoesSelecionadas, producao: e.target.checked})}
                        style={{ width: "18px", height: "18px", accentColor: "#8e1027" }}
                      />
                      Módulo de Produção
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", cursor: "pointer" }}>
                      <input 
                        type="checkbox" 
                        checked={permissoesSelecionadas.estoque}
                        onChange={(e) => setPermissoesSelecionadas({...permissoesSelecionadas, estoque: e.target.checked})}
                        style={{ width: "18px", height: "18px", accentColor: "#8e1027" }}
                      />
                      Módulo de Estoque
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", cursor: "pointer" }}>
                      <input 
                        type="checkbox" 
                        checked={permissoesSelecionadas.financeiro}
                        onChange={(e) => setPermissoesSelecionadas({...permissoesSelecionadas, financeiro: e.target.checked})}
                        style={{ width: "18px", height: "18px", accentColor: "#8e1027" }}
                      />
                      Módulo Financeiro
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", cursor: "pointer" }}>
                      <input 
                        type="checkbox" 
                        checked={permissoesSelecionadas.pedidos}
                        onChange={(e) => setPermissoesSelecionadas({...permissoesSelecionadas, pedidos: e.target.checked})}
                        style={{ width: "18px", height: "18px", accentColor: "#8e1027" }}
                      />
                      Módulo de Pedidos
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", cursor: "pointer" }}>
                      <input 
                        type="checkbox" 
                        checked={permissoesSelecionadas.configuracoes}
                        onChange={(e) => setPermissoesSelecionadas({...permissoesSelecionadas, configuracoes: e.target.checked})}
                        style={{ width: "18px", height: "18px", accentColor: "#8e1027" }}
                      />
                      Configurações do Sistema
                    </label>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "16px" }}>
                    <button
                      type="button"
                      onClick={() => setCargoEditando(null)}
                      style={{ padding: "10px 20px", borderRadius: "999px", border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontWeight: "600" }}
                    >
                      Voltar
                    </button>
                    <button
                      type="button"
                      onClick={salvarPermissoes}
                      style={{ padding: "10px 24px", borderRadius: "999px", border: "none", background: "#8e1027", color: "#fff", fontWeight: "600", cursor: "pointer" }}
                    >
                      Salvar Permissões
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EquipeConfig;