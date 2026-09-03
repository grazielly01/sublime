import "./equipeConfig.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

function EquipeConfig() {
  const navigate = useNavigate();

  const colaboradores = [
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
  ];

  return (
    <div className="tudoEquipeConfig">
      <Sidebar paginaAtiva="Configurações" />

      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset" />

        <main className="conteudoEquipeConfig">

          <div className="topoEquipeConfig">

            {/* TÍTULO + SETA. -> APROVANDO*/}
            <div className="tituloComVoltarEquipe">
              <button
                className="botaoVoltarEquipe"
                onClick={() => navigate(-1)}
                title="Voltar"
              >
                ←
              </button>

              <h1 className="tituloEquipeConfig">
                Equipe
              </h1>
            </div>

            <button
  className="botaoRegistrarColaborador"
  onClick={() => navigate("/registrarconfig")}
>
  + Registrar colaborador
</button>

          </div>

          <div className="containerTabelaEquipe">
            <table className="tabelaEquipeConfig">

              <thead>
                <tr>
                  <th>Colaborador</th>
                  <th>Cargo</th>
                  <th>Salário</th>
                  <th>Horário</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {colaboradores.map((c, i) => (
                  <tr key={i}>

                    {/* FOTO + NOME */}
                    <td>
                      <div className="colaboradorInfo">

                        <div className="fotoColaborador">
                          <span>
                            {c.nome.charAt(0)}
                          </span>
                        </div>

                        <span className="nomeColaborador">
                          {c.nome}
                        </span>

                      </div>
                    </td>

                    <td>{c.cargo}</td>

                    <td>{c.salario}</td>

                    <td>{c.horario}</td>

                    <td className="celulaAcoes">

                      <button
                        className="acao editar"
                        title="Editar colaborador"
                      >
                        <span className="iconeEditar">✎</span>
                      </button>

                      <button
                        className="acao excluir"
                        title="Excluir colaborador"
                      >
                        <span className="iconeExcluir">×</span>
                      </button>

                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </main>
      </div>
    </div>
  );
}

export default EquipeConfig;
