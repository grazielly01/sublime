import "./configuracoes.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { useNavigate } from "react-router-dom";

function Configuracoes() {
  const navigate = useNavigate();

  return (
    <div className="tudoConfiguracoes">
      <Sidebar paginaAtiva="Configurações" />

      <div className="tudoMenosSidebar">
        {/* Cabeçalho branco no topo */}
        <Header nomeIndustria="Sweet Sunset" />

        <div className="conteudoConfiguracoes">
          <div className="topoConfiguracoes">
            <h1 className="tituloConfiguracoes">Configurações</h1>
            <p className="subtituloConfiguracoes">
              Preferências da indústria e do sistema.
            </p>
          </div>

          {/* Cards de configuração */}
          <div className="cardsConfiguracoes">
            <div
              className="cardConfiguracao"
              onClick={() => navigate("/dadosconfig")}
              style={{ cursor: "pointer" }}
            >
              <h2>Dados da Indústria</h2>
              <p>Razão social, CNPJ, IE, Endereço...</p>
            </div>

            <div
              className="cardConfiguracao"
              onClick={() => navigate("/equipeconfig")}
              style={{ cursor: "pointer" }}
            >
              <h2>Equipe</h2>
              <p>Colaboradores, Funcionários, Equipes...</p>
            </div>

            <div
              className="cardConfiguracao"
              onClick={() => navigate("/sistemaconfig")}
              style={{ cursor: "pointer" }}
            >
              <h2>Sistema</h2>
              <p>Idioma, Backup, Aparência do sistema...</p>
            </div>

            <div
              className="cardConfiguracao"
              onClick={() => navigate("/segurancaconfig")}
              style={{ cursor: "pointer" }}
            >
              <h2>Segurança</h2>
              <p>
                Login e autenticação, Controle de acesso, Histórico de
                atividades, Backup e recuperação...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Configuracoes;
//aprovando arquivo correto.
