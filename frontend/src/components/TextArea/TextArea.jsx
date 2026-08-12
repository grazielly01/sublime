/*
ESSE ARQUIVO É PARA A CRIAÇÃO DO COMPONENTE TEXTAREA (SERÃO USADOS MUITOS TEXTAREAS NO PROJETO):
Utilizado para o usuário escrever textos grandes, como: descrições de saídas, descrições de entradas, receitas de produtos, descrições de metas, etc.
*/

import "./TextArea.css"; /*Importando CSS base dos TextAreas*/

function TextArea({ /*criando o componente como function*/
    /*Propriedades do TextArea abaixo*/
    placeholder,
    value,
    onChange,
    name,
    id,
    rows = 3, /*se ninguém informar a quantidade de linhas, serão 5 por padrão*/
    required = true, /*A maioria dos textareas é obrigatória, no caso dos opcionais, põe false*/
    disabled = false, /*Por padrão o usuário poderá escrever*/
}) {

    return (
        /*Essa div abaixo só serve como uma caixinha pra guardar esse componente TextArea*/
        <div className="divTextArea">

            <textarea
                className="textArea" /*Classe pra usar no CSS na hora de estilizar*/
                placeholder={placeholder} /*{placeholder} pq pega o valor da propriedade "placeholder"*/
                value={value} /*{value} pq pega o valor da propriedade "value"*/
                onChange={onChange} /*{onChange} pq pega o valor da propriedade "onChange"*/
                name={name} /*{name} pq pega o valor da propriedade "name"*/
                id={id} /*{id} pq pega o valor da propriedade "id"*/
                rows={rows} /*{rows} pq pega o valor da propriedade "rows"*/
                required={required} /*{required} pq pega o valor da propriedade "required"*/
                disabled={disabled} /*{disabled} pq pega o valor da propriedade "disabled"*/
            >
            </textarea>

        </div>
    );
}

export default TextArea;