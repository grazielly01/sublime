import "./apagarProduto.css";
import Button from "../../componentes/Button/Button.jsx";   /*Importando o componente button da pasta componentes*/
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";  /*Importando o componente sidebar da pasta componentes*/
import Header from "../../componentes/Header/Header.jsx";  /*Importando o componente header da pasta componentes*/
import { motion } from "motion/react";

function ApagarProduto() {
    return (
        <div className="tudoApagarProduto">  {/*Div q abriga tudo*/}

            <Sidebar paginaAtiva="Produtos" /> {/*Menu lateral, coloquei "Produtos" como página ativa para "Produtos" no menu lateral ficar clarinho*/}

            <div className="tudoMenosSidebar"> {/*Tudo menos o sidebar q ta acima*/}

                <Header nomeIndustria="Sweet Sunset" /> {/*componente header*/}

                <div className="conteudoApagarProduto"> {/*Div com o conteúdo da página*/}

                    <div className="tituloESetinha">
                        <svg className="svgSetinha" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#870B22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 8L2 12L6 16"/>
                            <path d="M2 12H22"/>
                        </svg>
                        <h1 className="tituloApagarProduto">Detalhes do produto</h1>
                    </div>

                    {/*"janela" branca de confirmaçao centralizada na pagina*/}
                    <div className="janelaConfirmacao">

                        <p className="perguntaConfirmacao">Tem certeza de que deseja excluir<br />este produto?</p>

                        <div className="botoesConfirmacao">
                            <div className="botaoContorno">
                                <Button texto="Cancelar" />
                            </div>
                            <Button texto="Excluir" />
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ApagarProduto;