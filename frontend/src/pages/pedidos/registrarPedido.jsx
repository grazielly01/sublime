import "./registrarPedido.css";
import { useNavigate } from "react-router-dom";
import Input from "../../componentes/Input/Input.jsx";      /*Importando o componente input da pasta componentes*/
import Button from "../../componentes/Button/Button.jsx";   /*Importando o componente button da pasta componentes*/
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";  /*Importando o componente sidebar da pasta componentes*/
import Header from "../../componentes/Header/Header.jsx";  /*Importando o componente header da pasta componentes*/
import Select from "../../componentes/Select/Select.jsx";  /*Importando o componente Select da pasta componentes*/



function RegistrarPedido() {
    const navigate = useNavigate();

    return (
        <div className="tudoRegistrarPedido">  {/*Div q abriga tudo*/}

            <Sidebar paginaAtiva="Pedidos" /> {/*Menu lateral, coloquei "Pedidos" como página ativa para "Pedidos" no menu lateral ficar clarinho*/}

            <div className="tudoMenosSidebar"> {/*Tudo menos o sidebar q ta acima*/}

                <Header nomeIndustria="Sweet Sunset" /> {/*componente header*/}

                <div className="conteudoRegistrarPedido"> {/*Div com o conteúdo da página*/}

                    <div className="tituloESetinha">
                        <svg className="svgSetinha" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#870B22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 8L2 12L6 16"/>
                            <path d="M2 12H22"/>
                        </svg>
                        <h1 className="tituloRegistrarPedido">Registrar novo pedido</h1>
                    </div>

                    {/*janela branca com os dados do pedido*/}
                    <div className="janelaRegistrarPedido">

                        <div className="linha1">

                            <div className="campoRegistrar campoCliente">
                                <label>Cliente <span>*</span></label>
                                <Input placeholder="Escreva aqui o nome do cliente..." required={true} />
                            </div>

                            <div className="campoRegistrar campoStatus">
                                <label>Status (padrão inicial)</label>
                                {/*status inicial de um pedido novo já nasce como "Aguardando"*/}
                                <Select id="selectStatusPedido" required={false} options={[
                                    "Aguardando",
                                    "Em produção",
                                    "Pronto",
                                    "Entregue",
                                    "Cancelado" ]} />
                            </div>

                            <div className="campoRegistrar campoPrazo">
                                <label>Prazo <span>*</span></label>
                                <div className="inputComIcone">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="5" width="18" height="16" rx="2" />
                                        <path d="M3 10h18M8 3v4M16 3v4" />
                                    </svg>
                                    <Input id="inputPrazo" placeholder="dd/mm/aaaa      00:00hrs" required={true} />
                                </div>
                            </div>

                        </div>

                        <div className="linha2">

                            <div className="campoRegistrar campoQuantidade">
                                <label>Quantidade a ser entregue <span>*</span></label>
                                <Input placeholder="00" required={true} />
                            </div>

                            <div className="campoRegistrar campoDescricao">
                                <label>Descrição <span>*</span></label>
                                <Input placeholder="Escreva aqui a descrição..." required={true} />
                            </div>

                        </div>

                    </div>

                    {/*botões de ação: "Cancelar" (contorno) e "Registrar" (preenchido)*/}
                    <div className="botoesRegistrarPedido">
                        <div className="botaoContorno">
                            <Button texto="Cancelar" onClick={() => navigate("/pedidos")} />

                        </div>
                        <Button texto="Registrar" />
                    </div>

                </div>

            </div>

        </div>
    );
}

export default RegistrarPedido;