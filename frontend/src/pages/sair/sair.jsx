import "./sair.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import Button from "../../componentes/Button/Button.jsx";
import { motion } from "motion/react";

function Sair() {
  return (
    <div className="tudoSair">
      <Sidebar paginaAtiva="Sair" />
      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset" />

        <div className="conteudoSair">
          <div className="caixaConfirmacao">
            <p className="textoConfirmacao">Tem certeza de que deseja sair?</p>
    <div className="botaosair">
  <Button 
    texto="Sair"
    onClick={() => (window.location.href = "/login")}
  />
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
