/*
ESSE ARQUIVO É PARA A CRIAÇÃO DO COMPONENTE BUTTON (SERÃO USADOS MUITOS BOTÕES NO PROJETO):
Utilizado para ocorrer uma ação quando o usuário clicar, como "+ Saída", "+ Entrada", "Cadastrar", "Salvar", "Ver todos", etc.
*/

import "./Button.css";  /*Importando CSS base dos buttons*/

function Button({ /*criei o componente aq como function*/
    /*Propriedades do botão abaixo*/
    texto,
    id,
    onClick, /*função executada quando o botão for clicado*/
    type = "button", /*se ninguém informar outro tipo (no lugar q ele for colocado), será um botão comum*/
    disabled = false, /*por padrão o botao fica habilitado para o user poder clicar sim*/
}) {

    return (
        <div className="divButton"> {/*essa div abaixo so serve como uma caixinha pra guardar esse componente Button*/}

            <button
                id={id}
                className="button" /*Classe pra usar no CSS na hora de estilizar*/
                type={type} /*{type} pq pega o valor da propriedade "type"*/
                onClick={onClick} /*{onClick} pq pega o valor da propriedade "onClick"*/
                disabled={disabled} /*{disabled} pq pega o valor da propriedade "disabled"*/
            >
                {texto} {/*Texto que aparecerá dentro do botão*/}
            </button>

        </div>
    );
}
  
export default Button;