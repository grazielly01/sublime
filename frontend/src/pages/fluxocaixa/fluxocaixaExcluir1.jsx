import "./fluxocaixaExcluir1.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

function FluxoCaixaExcluir1() {
  const navigate = useNavigate();

  return (
    <div className="tudoFluxoCaixaExcluir1">
      <Sidebar paginaAtiva="Fluxo de Caixa" />

      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset Indústria B2B" />

        <main className="conteudoFluxoCaixaExcluir1">
          <h1 className="tituloFluxoCaixaExcluir1">Confirmar exclusão</h1>

          <div className="caixaConfirmacao">
            <p>
              Tem certeza de que deseja excluir a saída <br />
              <strong>"Compra - serviço encanador"</strong>?
            </p>

            <div className="acoesConfirmacao">
              <button
                type="button"
                className="botaoCancelar"
                onClick={() => navigate("/fluxocaixasaida")}
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

export default FluxoCaixaExcluir1;
