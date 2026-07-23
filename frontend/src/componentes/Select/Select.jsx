/*
ESSE ARQUIVO É PARA A CRIAÇÃO DO COMPONENTE SELECT (SERÃO USADOS MUITOS SELECTS NO PROJETO):
Utilizado para o usuário selecionar uma opção dentre várias disponíveis, como: "Categoria de saída", "Categoria de entrada", "Categoria de produto", "Fixa ou variável", etc.
*/

import "./Select.css"; /*Importando CSS base dos Selects*/

function Select({ /*criando o componente como function*/
    /*propriedades do Select abaixo*/
    options = [], /*Lista de opções que aparecerão no select (é um array vazio, por padrão)*/
    value,
    onChange,
    name,
    id,
    required = true, /*A maioria dos selects será obrigatória; em caso de opcional, põe false*/
    disabled = false, /*Por padrão o usuário poderá selecionar normalmente; caso nao puder, poe true*/
}) {

    return (
        /*Essa div abaixo só serve como uma caixinha pra guardar esse componente Select*/
        <div className="divSelect">

            <select
                className="select" /*Classe pra usar no CSS na hora de estilizar*/
                value={value} /*{value} pq pega o valor da propriedade "value"*/
                onChange={onChange} /*{onChange} pq pega o valor da propriedade "onChange"*/
                name={name} /*{name} pq pega o valor da propriedade "name"*/
                id={id} /*{id} pq pega o valor da propriedade "id"*/
                required={required} /*{required} pq pega o valor da propriedade "required"*/
                disabled={disabled} /*{disabled} pq pega o valor da propriedade "disabled"*/
            >

                {/*opção inicial básica*/}
                <option value="">Selecione uma opção</option> {/*value="" ta assim vazio pq é assim mesmo, pq é a opção inicial*/}

                {/*percorre todas as opções da lista e cria um <option> para cada uma, ou: "para cada item da lista Options, crie uma <option>"*/}
                {/* 1-options: pega as options da propriedade "options"; 
                    2- ".map": percorre todas essas as opções e cria um <option> para cada uma; 
                    3- ((OPTION, INDEX =>: lista as opções tipo assim: "Bolos" 0, "Tortas" 1, "Sorvetes" 2, etc.;
                    4- option key={index}: chave de identificação da option (pra diferenciar elas). em {index} recebe esse valor numérico como chave de identificação;
                    5- value={option}: o valor da option é oq foi colocado na variável "option" la de cima;
                    6- {option}: pega oq foi colocado na variável "option" la de cima e deixa mostrando na lista do select;
                    logo abaixo:*/}
                {options.map((option, index) => ( 
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}

            </select>

        </div>
    );
}

export default Select;