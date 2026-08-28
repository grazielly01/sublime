import "./fluxocaixaExcluir2.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { useNavigate } from "react-router-dom";

function FluxoCaixaExcluir2() {
  const navigate = useNavigate();

  return (
    <div className="tudoFluxoCaixaExcluir2">
      <Sidebar paginaAtiva="Fluxo de Caixa" />

      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset Indústria B2B" />

        <main className="conteudoFluxoCaixaExcluir2">
          <h1 className="tituloFluxoCaixaExcluir2">Confirmar exclusão</h1>

          <div className="caixaConfirmacao">
            <p>
              Tem certeza de que deseja excluir a entrada <br />
              <strong>"Venda - Padaria Estrella"</strong>?
            </p>

            <div className="acoesConfirmacao">
              <button
                type="button"
                className="botaoCancelar"
                onClick={() => navigate("/fluxocaixadetalhes")}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="botaoExcluir"
                onClick={() => navigate("/fluxocaixa")}
              >
                Excluir
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default FluxoCaixaExcluir2;
