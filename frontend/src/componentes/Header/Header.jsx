/*
ESSE ARQUIVO É PARA A CRIAÇÃO DO COMPONENTE HEADER (SERÁ USADO EM TODAS AS PÁGINAS DO PROJETO):
Utilizado para mostrar a logo da indústria e seu nome no topo do sistema
*/

import "./Header.css"; /*Importando CSS base do Header*/

function Header({ /*criando o componente como function*/

    nomeIndustria = "Nome da indústria", /*variável para nome da industria; e caso nenhum nome seja informado, aparecerá esse como padrão*/
    logoIndustria, /*imagem da logo da indústria*/

}) {

    return (
        /*Essa div abaixo só serve como uma caixinha pra guardar esse componente Header*/
        <div className="divHeader">

            <header className="header">  {/*criando o header em si*/}
                <div className="logoIndustria">  {/*Bolinha onde ficará a logo da indústria*/}

                    {logoIndustria ? (   /* ?: SE existir algo em logoIndustria, então... */
                        <img src={logoIndustria} className="imagemLogo" /> ) /*src: busca a logo da indústria; className: classe da imagem */

                    : (   /*: SENÃO, então... */
                        <div className="logoVazia"></div> )}   {/*Aparece logo vazio (pq é caso a empresa ainda não tenha cadastrado uma logo)*/}
                    
                </div>

                <h2 className="nomeIndustria">{nomeIndustria}</h2>  {/*Nome da indústria*/}
                    
            </header>
        </div>
    );
}

export default Header;