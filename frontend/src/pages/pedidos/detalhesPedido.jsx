import "./detalhesPedido.css";
import { Link } from "react-router-dom";
import Input from "../../componentes/Input/Input.jsx";      /*Importando o componente input da pasta componentes*/
import Button from "../../componentes/Button/Button.jsx";   /*Importando o componente button da pasta componentes*/
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";  /*Importando o componente sidebar da pasta componentes*/
import Header from "../../componentes/Header/Header.jsx";  /*Importando o componente header da pasta componentes*/
import Select from "../../componentes/Select/Select.jsx";  /*Importando o componente Select da pasta componentes*/

function DetalhesPedido() {
    

    /*Dados do pedido que o user clicou lá na tela de Pedidos, em "Detalhes" (dado de exemplo, "mockado", só pra visualizar a tela). Quando o backend existir, esses dados 
    vão vir do banco de dados de acordo com o pedido que foi clicado.*/
    const pedido = {
        cliente: "Empório Café & Cia",
        status: "Em produção",
        prazo: "20/05/2026      14:00hrs",
        quantidade: "05",
        descricao: "5 Bolo de Limão, 5 Bolo de Cenoura, 5 Bolo de Abacaxi, 5 Bolo de Chocolate, 5 Bolo Prestígio",
    };

    return (
        <div className="tudoDetalhesPedido">  {/*Div q abriga tudo*/}

            <Sidebar paginaAtiva="Pedidos" /> {/*Menu lateral, coloquei "Pedidos" como página ativa para "Pedidos" no menu lateral ficar clarinho*/}

            <div className="tudoMenosSidebar"> {/*Tudo menos o sidebar q ta acima*/}

                <Header nomeIndustria="Sweet Sunset" /> {/*componente header*/}

                <div className="conteudoDetalhesPedido"> {/*Div com o conteúdo da página*/}

                    <div className="tituloESetinha">
                        <svg className="svgSetinha" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#870B22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 8L2 12L6 16"/>
                            <path d="M2 12H22"/>
                        </svg>
                        <h1 className="tituloDetalhesPedido">Detalhes do pedido</h1>
                    </div>

                    {/*"janela" branca com os dados do pedido; os Inputs ficam disabled, pq aqui é só pra visualizar, não pra editar*/}
                    <div className="janelaDetalhesPedido">

                        <div className="linhaDetalhes1">

                            <div className="campoDetalhe campoCliente">
                                <label>Cliente</label>
                                <Input value={pedido.cliente} disabled={true} required={false} />
                            </div>

                            <div className="campoDetalhe campoStatus">
                                <label>Status</label>
                                <Select id="selectStatusDetalhesPedido" value={pedido.status} disabled={false} required={false} options={[
                                    "Aguardando",
                                    "Em produção",
                                    "Pronto",
                                    "Entregue",
                                    "Cancelado" ]} />
                            </div>

                            <div className="campoDetalhe campoPrazo">
                                <label>Prazo</label>
                                <div className="inputComIcone">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="5" width="18" height="16" rx="2" />
                                        <path d="M3 10h18M8 3v4M16 3v4" />
                                    </svg>
                                    <Input id="inputPrazo" value={pedido.prazo} disabled={true} required={false} />
                                </div>
                            </div>

                        </div>

                        <div className="linhaDetalhes2">

                            <div className="campoDetalhe campoQuantidade">
                                <label>Quantidade a ser entregue</label>
                                <Input value={pedido.quantidade} disabled={true} required={false} />
                            </div>

                            <div className="campoDetalhe campoDescricao">
                                <label>Descrição</label>
                                <Input value={pedido.descricao} disabled={true} required={false} />
                            </div>

                        </div>

                    </div>

                    {/*botões de ação: "Excluir" (contorno, leva pra tela de confirmação apagarPedido) e "Editar" (preenchido)*/}
                    <div className="botoesDetalhesPedido">
                        <div className="botaoContorno">
                            <Link to="/pedidos/apagar" className="botaoApagarPedido">
                                <Button texto="Excluir" />
                            </Link>
                        </div>
                        <Button texto="Editar" />
                    </div>

                </div>

            </div>

        </div>
    );
}

export default DetalhesPedido;