import "./registrarEvento.css";
import Input from "../../componentes/Input/Input.jsx";      /*Importando o componente input da pasta componentes*/
import Button from "../../componentes/Button/Button.jsx";   /*Importando o componente button da pasta componentes*/
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";  /*Importando o componente sidebar da pasta componentes*/
import Header from "../../componentes/Header/Header.jsx";  /*Importando o componente header da pasta componentes*/
import Select from "../../componentes/Select/Select.jsx";  /*Importando o componente Select da pasta componentes*/
import { motion } from "motion/react";

function RegistrarEvento() {
    return (
        <div className="tudoRegistrarEvento">  {/*Div q abriga tudo*/}

            <Sidebar paginaAtiva="Calendário" /> {/*Menu lateral, coloquei "Calendário" como página ativa para "Calendário" no menu lateral ficar clarinho*/}

            <div className="tudoMenosSidebar"> {/*Tudo menos o sidebar q ta acima*/}

                <Header nomeIndustria="Sweet Sunset" /> {/*componente header*/}

                <div className="conteudoRegistrarEvento"> {/*Div com o conteúdo da página*/}


                    {/*janela branca com os dados do evento*/}
                    <div className="janelaRegistrarEvento">

                    <div className="tituloESetinha">
                        <svg className="svgSetinha" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#870B22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 8L2 12L6 16"/>
                            <path d="M2 12H22"/>
                        </svg>
                        <h1 className="tituloRegistrarEvento">Registrar novo evento</h1>
                    </div>

                        <div className="linha1">

                            <div className="campoRegistrar campoTitulo">
                                <label>Título do evento <span>*</span></label>
                                <Input placeholder="Escreva aqui o título..." required={true} />
                            </div>

                            <div className="campoRegistrar campoCategoriaEvento">
                                <label>Categoria <span>*</span></label>
                                <Select id="selectCategoriaEvento" required={true} options={[
                                    "Produção",
                                    "Entrega",
                                    "Compra",
                                    "Pagamento",
                                    "Outro" ]} />
                            </div>

                        </div>

                        <div className="linha2">

                            <div className="campoRegistrar campoPrazoEvento">
                                <label>Prazo <span>*</span></label>
                                <div className="inputComIcone"> {/*mesma ideia do icone dentro do Input*/}
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="5" width="18" height="16" rx="2" />
                                        <path d="M3 10h18M8 3v4M16 3v4" />
                                    </svg>
                                    <Input id="inputPrazo" placeholder="dd/mm/aaaa" required={true} />
                                </div>
                            </div>

                            <div className="campoRegistrar campoDescricaoEvento">
                                <label>Descrição <span>*</span></label>
                                <Input placeholder="Escreva aqui a descrição..." required={true} />
                            </div>

                        </div>

                        {/*botões: "Cancelar" e "Registrar"*/}
                    <div className="botoesRegistrarEvento">
                        <div className="botaoContorno">
                            <Button texto="Cancelar" />
                        </div>
                        <Button texto="Registrar" />
                    </div>

                    </div>


                </div>

            </div>

        </div>
    );
}

export default RegistrarEvento;