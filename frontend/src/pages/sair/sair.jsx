import "./sair.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import Button from "../../componentes/Button/Button.jsx";

function Sair() {
  return (
    <div className="tudoSair">
      <Sidebar paginaAtiva="Sair" />
      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset Indústria B2B" />

        <div className="conteudoSair">
          <div className="caixaConfirmacao">
            <p className="textoConfirmacao">Tem certeza de que deseja sair?</p>
            <div className="botoesConfirmacao">
  <Button
    texto="Sair"
    onClick={() => (window.location.href = "/login")}
  />
  <Button
    texto="Cancelar"
    onClick={() => window.history.back()}
  />
</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sair;
