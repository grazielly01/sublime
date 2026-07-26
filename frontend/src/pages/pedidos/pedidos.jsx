import "./pedidos.css";
import Button from "../../componentes/Button/Button.jsx";   /*Importando o componente button da pasta componentes*/
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";  /*Importando o componente sidebar da pasta componentes*/
import Header from "../../componentes/Header/Header.jsx";  /*Importando o componente header da pasta componentes*/

function Pedidos() {

    /*Lista de pedidos (só pra gente visualizar a tela). Quando o backend existir, essa lista vai vir do banco de dados responsável pelos 
    pedidos coletados do estabelecimento, e cadastrar essas infos.*/
    
    const pedidos = [
        { estabelecimento: "Padaria São José", itens: "4 itens", entrega: "entrega 19/05 16h", valor: "R$ 2.840", status: "producao", statusTexto: "Em produção" },
        { estabelecimento: "Mercado Bom Preço", itens: "7 itens", entrega: "entrega 20/05 09h", valor: "R$ 5.610", status: "aguardando", statusTexto: "Aguardando" },
        { estabelecimento: "Confeitaria Doce Lar", itens: "2 itens", entrega: "entrega 19/05 18h", valor: "R$ 3.120", status: "pronto", statusTexto: "Pronto" },
        { estabelecimento: "Tia Bete Bolos", itens: "3 itens", entrega: "entrega 18/05", valor: "R$ 1.450", status: "entregue", statusTexto: "Entregue" },
        { estabelecimento: "Empório Café & Cia", itens: "5 itens", entrega: "entrega 20/05 14h", valor: "R$ 2.210", status: "producao", statusTexto: "Em produção" },
        { estabelecimento: "Padaria Pão Quente", itens: "6 itens", entrega: "entrega —", valor: "R$ 4.180", status: "cancelado", statusTexto: "Cancelado" },
        { estabelecimento: "Doceria Flor de Açúcar", itens: "3 itens", entrega: "entrega 21/05 10h", valor: "R$ 1.890", status: "aguardando", statusTexto: "Aguardando" },
        { estabelecimento: "Padaria Trigo Dourado", itens: "8 itens", entrega: "entrega 21/05 15h", valor: "R$ 6.320", status: "producao", statusTexto: "Em produção" },
        { estabelecimento: "Café & Cia Express", itens: "2 itens", entrega: "entrega 22/05 08h", valor: "R$ 980", status: "pronto", statusTexto: "Pronto" },
        { estabelecimento: "Mercearia Sabor Caseiro", itens: "5 itens", entrega: "entrega 17/05", valor: "R$ 2.750", status: "entregue", statusTexto: "Entregue" },
        { estabelecimento: "Confeitaria Doce Encanto", itens: "4 itens", entrega: "entrega 22/05 17h", valor: "R$ 3.450", status: "aguardando", statusTexto: "Aguardando" },
        { estabelecimento: "Padaria Estrela Dourada", itens: "6 itens", entrega: "entrega —", valor: "R$ 5.100", status: "cancelado", statusTexto: "Cancelado" },
    ];

    return (
        <div className="tudoPedidos">  {/*Div q abriga tudo*/}

            <Sidebar paginaAtiva="Pedidos" /> {/*Menu lateral, coloquei "Pedidos" como página ativa para "Pedidos" no menu lateral ficar clarinho*/}

            <div className="tudoMenosSidebar"> {/*Tudo menos o sidebar q ta acima*/}

                <Header nomeIndustria="Sweet Sunset" /> {/*componente header*/}

                <div className="conteudoPedidos"> {/*Div com o conteúdo da página*/}

                    {/*linha de cima: título + subtítulo*/}
                    <div className="topoPedidos">
                        <div>
                            <h1 className="tituloPedidos">Pedidos</h1>
                            <p className="subtituloPedidos">Pedidos de padarias, mercados e lojas — controle de status e prazo.</p>
                        </div>

                        
                    </div>

                    {/*abas de filtro -- só visuais por enquanto, ainda não funcionam de verdade (sem backend)*/}
                    <div className="filtrosPedidosEButton">
                        <div className="filtroPedido ativo">Todos</div>
                        <div className="filtroPedido">Aguardando</div>
                        <div className="filtroPedido">Em produção</div>
                        <div className="filtroPedido">Pronto</div>
                        <div className="filtroPedido">Entregue</div>
                        <div className="filtroPedido">Cancelado</div>

                        <Button id="buttonNovoPedido" texto="+ Novo pedido" />
                    </div>

                    

                    {/*grade de cards -- .map() percorre a lista "pedidos" e cria um card pra cada posição, igual já fizemos no Select e no Estoque*/}
                    <div className="listaPedidos">
                        {pedidos.map((pedido, index) => (
                            <div className="cardPedido" key={index}>

                                {/*tarja do status, alinhada à direita do card*/}
                                <div className="topoCardPedido">
                                    <span className={"statusPedido " + pedido.status}>
                                        {pedido.statusTexto}
                                    </span>
                                </div>

                                <h2 className="nomeEstabelecimento">{pedido.estabelecimento}</h2>

                                <p className="infoPedido">{pedido.itens} · {pedido.entrega}</p>

                                <div className="rodapeCardPedido">
                                    <p className="valorPedido">{pedido.valor}</p>

                                    <div className="botaoDetalhes"> {/*ainda sem onClick -- vai abrir a tela de detalhes do pedido quando ela existir*/}
                                        <Button texto="Detalhes" />
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Pedidos;