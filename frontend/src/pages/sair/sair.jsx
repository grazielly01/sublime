import "./sair.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import Button from "../../componentes/Button/Button.jsx";

function Sair() {
  return (
    <div className="tudoSair">
      <Sidebar paginaAtiva="Sair" />
      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset" />

        <div className="conteudoSair">
          <div className="caixaConfirmacao">
            <div className="iconeConfirmacaoSair" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 12h11m0 0-3.5-3.5M21 12l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p className="textoConfirmacao">Tem certeza de que deseja sair?</p>
            <p className="subtextoConfirmacao">
              Você será desconectado da sessão atual do sistema.
            </p>

            <div className="botoesConfirmacao">
              <div className="botaosair">
                <Button
                  texto="Sair"
                  onClick={() => (window.location.href = "/login")}
                />
              </div>
              <div className="botaocancelar">
                <Button
                  texto="Cancelar"
                  onClick={() => window.history.back()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sair;