import "./detalhesEvento.css";
import { Link } from "react-router-dom";
import Input from "../../componentes/Input/Input.jsx";      /*Importando o componente input da pasta componentes*/
import Button from "../../componentes/Button/Button.jsx";   /*Importando o componente button da pasta componentes*/
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";  /*Importando o componente sidebar da pasta componentes*/
import Header from "../../componentes/Header/Header.jsx";  /*Importando o componente header da pasta componentes*/
import Select from "../../componentes/Select/Select.jsx";  /*Importando o componente Select da pasta componentes*/

function DetalhesEvento() {

    /* 
    Dados do evento que o user clicou lá na tela de Calendário (dado de exemplo só pra visualizar a tela)
    Quando o backend existir, esses dados vão vir do banco de dados de acordo com o evento que foi clicado
    */
    const evento = {
        titulo: "45 Cupcake Red Velvet",
        categoria: "Entrega",
        prazo: "16/05/2026",
        descricao: "Produzir 45 cupcakes red velvet e entregar para a Padaria KiPao Gostoso",
    };

    return (
        <div className="tudoDetalhesEvento">  {/*Div q abriga tudo*/}

            <Sidebar paginaAtiva="Calendário" /> {/*Menu lateral, coloquei "Calendário" como página ativa para "Calendário" no menu lateral ficar clarinho*/}

            <div className="tudoMenosSidebar"> {/*Tudo menos o sidebar q ta acima*/}

                <Header nomeIndustria="Sweet Sunset" /> {/*componente header*/}

                <div className="conteudoDetalhesEvento"> {/*Div com o conteúdo da página*/}

                    <div className="tituloESetinha">
                        <svg className="svgSetinha" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#870B22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 8L2 12L6 16"/>
                            <path d="M2 12H22"/>
                        </svg>
                        <h1 className="tituloDetalhesEvento">Detalhes do evento</h1>
                    </div>

                    {/*"janela" branca com os dados do evento; os Inputs ficam disabled pq aqui é só pra visualizar, não pra editar*/}
                    <div className="janelaDetalhesEvento">

                        <div className="linhaDetalhes1">

                            <div className="campoDetalhe campoTitulo">
                                <label>Título do evento</label>
                                <Input value={evento.titulo} disabled={true} required={false} />
                            </div>

                            <div className="campoDetalhe campoCategoriaEvento">
                                <label>Categoria</label>
                                <Select id="selectCategoriaDetalhesEvento" value={evento.categoria} disabled={false} required={false} options={[
                                    "Produção",
                                    "Entrega",
                                    "Compra",
                                    "Pagamento",
                                    "Outro" ]} />
                            </div>

                        </div>

                        <div className="linhaDetalhes2">

                            <div className="campoDetalhe campoPrazoEvento">
                                <label>Prazo</label>
                                <div className="inputComIcone">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="5" width="18" height="16" rx="2" />
                                        <path d="M3 10h18M8 3v4M16 3v4" />
                                    </svg>
                                    <Input id="inputPrazo" value={evento.prazo} disabled={true} required={false} />
                                </div>
                            </div>

                            <div className="campoDetalhe campoDescricaoEvento">
                                <label>Descrição</label>
                                <Input value={evento.descricao} disabled={true} required={false} />
                            </div>

                        </div>

                    </div>

                    {/*botões: "Excluir" e "Editar" (preenchido)*/}
                    <div className="botoesDetalhesEvento">
                        <div className="botaoContorno">
                            <Link to="/calendario/apagar" className="botaoNovoPedido">
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

export default DetalhesEvento;