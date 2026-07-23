/*
ESSE ARQUIVO É PARA A CRIAÇÃO DO COMPONENTE CARD (SERÃO USADOS MUITOS CARDS NO PROJETO):
Utilizado para agrupar informações dentro de uma caixa, como: gráficos, listas, indicadores,relatórios, metas, pedidos recentes, etc.
*/

import "./Card.css"; /*Importando CSS base dos cards*/

function Card({ children, }) { /*criei o componente aq como function, em seguida sua propriedade é "children": propriedade do react que representa o que estiver entre <Card> e </Card> (serão colocados onde o card estiver)*/

    return (
        <div className="divCard"> {/*Essa div só serve como uma caixinha pra guardar esse componente Card*/}

            <div className="card"> {/*o card em si*/}
                {children} {/*tudooo o que estiver entre <Card> e </Card> aparecerá aqui*/}
            </div>

        </div>
    );
}

export default Card;