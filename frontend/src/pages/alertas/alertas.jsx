import "./alertas.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";  /*Importando o componente sidebar da pasta componentes*/
import Header from "../../componentes/Header/Header.jsx";  /*Importando o componente header da pasta componentes*/
import Alert from "../../componentes/Alerts/Alerts.jsx";  /*Importando o componente Alert (o cardzinho de alerta) da pasta componentes*/

function Alertas() {

    /* Lista (array) de alertas (por enquanto só pra gente visualizar a tela)
    Quando o backend existir, essa lista vai vir da API, calculada automaticamente a partir do estoque, validade, financeiro e pedidos*/

    const alertas = [
        {
            titulo: "Fermento químico abaixo do mínimo",
            descricao: "Apenas 2kg restantes (mínimo 5kg). Produção de bolos em risco para amanhã.",
            prioridade: "alta",
        },
        {
            titulo: "Validade próxima — Ovos brancos",
            descricao: "Lote LT-0422 (1.800 un) vence em 02/06/2026 — priorizar no PEPS.",
            prioridade: "alta",
        },
        {
            titulo: "Margem caindo — Torta de Limão",
            descricao: "Custo dos ingredientes subiu 8% no mês. Revisar preço de venda.",
            prioridade: "media",
        },
        {
            titulo: "Manteiga sem sal abaixo do mínimo",
            descricao: "18kg restantes (mínimo 20kg). Estoque suficiente para 4 dias.",
            prioridade: "media",
        },
        {
            titulo: "Pedido #2340 sem confirmação do cliente",
            descricao: "Mercado Bom Preço não confirmou entrega de amanhã às 09h.",
            prioridade: "baixa",
        },
    ];

    return (
        <div className="tudoAlertas">  {/*Div q abriga tudo*/}

            <Sidebar paginaAtiva="Alertas" /> {/*Menu lateral, coloquei "Alertas" como página ativa para "Alertas" no menu lateral ficar clarinho*/}

            <div className="tudoMenosSidebar"> {/*Tudo menos o sidebar q ta acima*/}

                <Header nomeIndustria="Sweet Sunset" /> {/*componente header*/}

                <div className="conteudoAlertas"> {/*Div com o conteúdo da página*/}

                    <h1 className="tituloAlertas">Alertas</h1>
                    <p className="subtituloAlertas">Notificações automáticas de estoque, validade, financeiro e pedidos.</p>

                    {/*abas de filtro -- só visuais por enquanto, ainda não funcionam de verdade (sem backend)*/}
                    <div className="filtrosAlertas">
                        <div className="filtroAlerta ativo">Todos</div>
                        <div className="filtroAlerta">Pedidos</div>
                        <div className="filtroAlerta">Estoque</div>
                        <div className="filtroAlerta">Financeiro</div>
                        <div className="filtroAlerta">Produção</div>
                    </div>

                    {/*lista de alertas -- .map() percorre o array "alertas" e cria um <Alert> pra cada posição, igual já fizemos no Select e no Estoque*/}
                    <div className="listaAlertas">
                        {alertas.map((alerta, index) => (
                            <Alert
                                key={index}
                                titulo={alerta.titulo}
                                descricao={alerta.descricao}
                                prioridade={alerta.prioridade}
                            />
                        ))}
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Alertas;