/*
ESSE ARQUIVO É PARA A CRIAÇÃO DO COMPONENTE INPUT (SERÃO USADOS MUITOS INPUTS NO PROJETO):
Utilizado para o usuário escrever textos pequenos como "Nome completo", "Título da entrada", "Título da saída", "Nome do insumo", etc.
*/

import "./Input.css";  /*Importando CSS base dos inputs*/

function Input({ /*criei o componente aq como function*/
    /*Propriedades do input abaixo*/
    type = "text", /*Se ngm colocar outro type quando for usar, ent ele será "text" como padrão. */
    placeholder,
    value,
    onChange,
    name,
    id,
    required = true, /*required tá true pq a maioria dos inputs sao requeridos/obrigatórios sim. em caso de input nao obrigatório, coloca false quando for usar*/
    disabled = false, /*Disabled, a princípio, false pois nestes inputs, o usuário tem que digitar (em caso de inputs q o user nao puder digitar, coloca true quando for usar) */
}) {

    return ( 
        <div className="divInput"> {/*Essa div abaixo so serve como uma caixinha pra guardar esse componente input*/}
            <input
                className="input" /*classe pra usar no CSS na hora de estilizar*/
                type={type} /*{type} pq pega o valor q estiver na propriedade "type" */
                placeholder={placeholder} /*{placeholder} pq pega o valor q estiver na propriedade "placeholder" */
                value={value} /*{value} pq pega o valor q estiver na propriedade "value" */
                onChange={onChange} /*{onChange} pq pega o valor q estiver na propriedade "onChange" */
                name={name} /*{name} pq pega o valor q estiver na propriedade "name" */
                id={id} /*{id} pq pega o valor q estiver na propriedade "id" */
                required={required} /*{required} pq pega o valor q estiver na propriedade "required" */
                disabled={disabled} /*{disabled} pq pega o valor q estiver na propriedade "disabled" */
            />
        </div>
    );
}
  
export default Input;