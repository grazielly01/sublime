/*
ESSE ARQUIVO É PARA A CRIAÇÃO DO COMPONENTE ALERT (SERÃO USADOS MUITOS ALERTAS NO PROJETO):
Utilizado para informar situações importantes da indústria, como estoque baixo, pedidos atrasados, produtos próximos do vencimento, etc.
*/

import "./Alerts.css"; /*Importando CSS base dos alerts*/

function Alert({ /*criando o componente como function*/
    titulo,
    descricao,
    prioridade = "baixa", /*Alta, Média ou Baixa, mas fica "baixa" como padrão*/
    onDispensar, /*função executada ao clicar em "Dispensar"*/
    onClick,     /*mantido caso algum outro lugar use onClick diretamente*/
}) {

    /*definindo algumas informações de acordo com a prioridade*/
    let cor; /*Para ser vermelho, amarelo ou cinza*/
    let icone; /*Para ser !!, ! ou ...*/
    let textoPrioridade; /*Para ser alta, média ou baixa*/

    if (prioridade === "alta") {
        cor = "#CF0003";  /*vermelha*/
        icone = "!!";
        textoPrioridade = "Alta";
    }

    else if (prioridade === "media") {
        cor = "#E8C30B"; /*amarela*/
        icone = "!";
        textoPrioridade = "Média";
    }

    else {
        cor = "#5B5B5B"; /*cinza*/
        icone = "...";
        textoPrioridade = "Baixa";
    }

    return (

        /*Essa div abaixo só serve como uma caixinha pra guardar esse componente Alert*/
        <div className="divAlert">

            <div
                className="alert"  /*class do alert pra fazer seu CSS*/
                style={{ borderLeft: `8px solid ${cor}` }}  /*ja definimos q terá uma borda a esquerda de 8px que sua cor varia */
            >

                {/*Ícone e círculo*/}
                <div className="circuloIcone" style={{ color: cor }}>  {/*circulo em volta do ícone */}
                    {icone}  {/*poe o ícone (a variavel) dentro, q varia de acordo com urgencia*/}
                </div>

                {/*conteúdo do alerta*/}
                <div className="conteudoAlert">  {/*Div mais geral para todo o conteúdo do alerta*/}

                    <div className="linhaTitulo"> {/*div da linha com o título */}

                        <h3 className="tituloAlert">{titulo}</h3> {/*h3 com o titulo q pode variar*/}

                        <span  //span colorido da prioridade
                            className="labelPrioridade"  //sua classe
                            style={{ backgroundColor: cor }} //ja definimos q terá uma cor q varia (vremelha, amarela ou cinza)
                        >
                            {textoPrioridade}  {/*Dentro, o texto q define prioridade (alta, média ou baixa) */}
                        </span>

                    </div>

                    <p className="descricaoAlert">{descricao}</p>  {/*p com a descricao do alerta (fica embaixo do titulo); e essa descrição varia*/}

                </div>

                {/*botao dispensar funcionando*/}
                <button className="dispensar" onClick={onDispensar || onClick}> 
                    ✕ Dispensar
                </button>
            </div>
        </div>
    );
}

export default Alert;