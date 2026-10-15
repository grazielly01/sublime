 import "./estoque.css";
import { Link } from "react-router-dom";
import Input from "../../componentes/Input/Input.jsx";      /*Importando o componente input da pasta componentes. APROVADO*/
import Button from "../../componentes/Button/Button.jsx";   /*Importando o componente button da pasta componentes*/
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";  /*Importando o componente sidebar da pasta componentes*/
import Header from "../../componentes/Header/Header.jsx";  /*Importando o componente header da pasta componentes*/
import { motion } from "motion/react";
import Select from "../../componentes/Select/Select.jsx";

function Estoque() {
    /*essa const abaixo é o array (lista) de insumos do estoque: ela contém alguns exemplos temporários de insumos. Quando o backend existir, essa lista vai vir da API (banco de dados) ao
    invés de ficar escrita fixa aqui. APROVADO */
    const insumos = [
        { nome: "Chocolate ao leite Callebaut 80g", lote: "LT-0421", quantidade: "52", minimo: "15", validade: "12/08/2026", custo: "R$ 78.50", status: "ok" },
        { nome: "Farinha de trigo especial 300g", lote: "LT-0425", quantidade: "2", minimo: "6", validade: "30/11/2026", custo: "R$ 142.00", status: "repor" },
        { nome: "Leite condensado Moça 395g", lote: "LT-0414", quantidade: "104", minimo: "60", validade: "20/01/2027", custo: "R$ 8.90", status: "ok" },
        { nome: "Ovos brancos tipo extra 12unid", lote: "LT-0428", quantidade: "1053", minimo: "1200", validade: "02/06/2026", custo: "R$ 0.55", status: "repor" },
        { nome: "Fermento químico 10g", lote: "LT-0410", quantidade: "28", minimo: "30", validade: "15/09/2026", custo: "R$ 36.00", status: "repor" },
        { nome: "Creme de leite UHT 400ml", lote: "LT-0416", quantidade: "82", minimo: "80", validade: "18/12/2026", custo: "R$ 4.20", status: "ok" },
        { nome: "Açúcar refinado 2kg", lote: "LT-0419", quantidade: "27", minimo: "8", validade: "05/03/2027", custo: "R$ 98.00", status: "ok" },
        { nome: "Manteiga sem sal 1kg", lote: "LT-0422", quantidade: "19", minimo: "20", validade: "25/07/2026", custo: "R$ 52.00", status: "repor" },
        { nome: "Leite condensado Moça 395g", lote: "LT-0426", quantidade: "104", minimo: "60", validade: "11/09/2026", custo: "R$ 8.90", status: "ok" },
        { nome: "Chocolate ao leite Callebaut 80g", lote: "LT-0421", quantidade: "52", minimo: "15", validade: "12/08/2026", custo: "R$ 78.50", status: "ok" },
        { nome: "Farinha de trigo especial 300g", lote: "LT-0425", quantidade: "2", minimo: "6", validade: "30/11/2026", custo: "R$ 142.00", status: "repor" },
        { nome: "Leite condensado Moça 395g", lote: "LT-0414", quantidade: "104", minimo: "60", validade: "20/01/2027", custo: "R$ 8.90", status: "ok" },
        { nome: "Ovos brancos tipo extra 12unid", lote: "LT-0413", quantidade: "1053", minimo: "1200", validade: "02/06/2026", custo: "R$ 0.55", status: "repor" },
        { nome: "Fermento químico 10g", lote: "LT-0410", quantidade: "28", minimo: "5", validade: "15/09/2026", custo: "R$ 36.00", status: "repor" },
        { nome: "Creme de leite UHT 400ml", lote: "LT-0416", quantidade: "82", minimo: "80", validade: "18/12/2026", custo: "R$ 4.20", status: "ok" },
        { nome: "Açúcar refinado 2kg", lote: "LT-0419", quantidade: "27", minimo: "8", validade: "05/03/2027", custo: "R$ 98.00", status: "ok" },
        { nome: "Manteiga sem sal 1kg", lote: "LT-0422", quantidade: "19", minimo: "20", validade: "25/07/2026", custo: "R$ 52.00", status: "repor" },
        { nome: "Leite condensado Moça 395g", lote: "LT-0426", quantidade: "104", minimo: "60", validade: "11/09/2026", custo: "R$ 8.90", status: "ok" },
    ];

    return (
        <div className="tudoEstoque"> {/*Div q abriga tudo*/}

            <Sidebar paginaAtiva="Estoque" /> {/*Menu lateral, coloquei "Estoque" como página ativa para "Estoque" no menu lateral ficar clarinho*/}

            <div className="tudoMenosSidebar"> {/*Tudo menos o sidebar q ta acima*/}

                <Header nomeIndustria="Sweet Sunset" /> {/*componente header*/}

                <div className="conteudoEstoque conteudoEstoque2"> {/*Div com o conteúdo da página*/}

                    <h1 className="tituloEstoque">Estoque de insumos</h1>
                    <p className="subtituloEstoque">Controle por lote e validade — sistema PEPS (usar primeiro o mais antigo)</p>

                    {/*Linha com a busca, o aviso de "abaixo do mínimo" e os botões da direita*/}
                    <div className="barraFiltros">

                        <div className="ladoEsquerdoFiltros">

                            {/*campo de busca (ícone dentro do Input que nem fiz no login)*/}
                            <div className="buscaComIcone">
                                {/*esse svg abaixo foi copiado do site do lucide react*/}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#870B22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search">
                                    <path d="m21 21-4.34-4.34"/>
                                    <circle cx="11" cy="11" r="8"/>
                                </svg>
                                <Input placeholder="Buscar insumo.." required={false} /> {/* required é false pq o user nao precisa obrigatoriamente digitar nada nesse input, pois ele é so um caixa de busca*/}
                            </div>

                            {/*aviso de quantos insumos estão abaixo do mínimo (número fixo por enquanto; viria calculado do backend depois)*/}
                            <div className="avisoMinimo">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert-icon lucide-triangle-alert">
                                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>
                                <path d="M12 9v4"/>
                                <path d="M12 17h.01"/>
                            </svg>
                                8 abaixo do mínimo
                            </div>
                        </div>

                        <div className="ladoDireitoFiltros">

                            {/*filtro de insumos usando o componente Select*/}
                            <Select id="selectFiltroInsumo" options={[ /*coloquei um id no select pra mudar um pouquinho o CSS desse componente select e deixar ele adaptado pra essa pagina estoque */
                                "Farinhas e massas",
                                "Cacau e chocolates",
                                "Laticínios",
                                "Ovos e derivados",
                                "Gorduras/óleos",
                                "Fermentos",
                                "Frutas" ,
                                "Confeitos e finalizações",
                                "Essências e aromatizantes",
                                "Corantes",
                                "Embalagens",
                                "Decorações",
                                "Outros"]}
                            />

                            <Link to="/estoque/registrar" className="botaoNovoInsumo">
                                <Button texto="+ Novo insumo"></Button>
                            </Link>
                        </div>
                    </div>

                    {/*tabela com os insumos do estoque*/}
                    <table className="tabelaEstoque">

                        <thead> {/*é como o cabeçalho da tabela, a primeira linha com os nomes das categorias*/}
                            <tr> {/*é cada categoria de insumo no cabeçalho*/}
                                <th>Insumo</th>
                                <th>Lote</th>
                                <th>Quantidade</th>
                                <th>Mínimo</th>
                                <th>Validade</th>
                                <th>Custo un.</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                           
                            {insumos.map((insumo, index) => (     /*.map() percorre a lista "insumos" e cria uma linha <tr> pra cada insumo, index conta o numero de insumos*/
                                <tr key={index}>    
                                <td>         {/*a key da tag <tr> vai ser o index (quantidade de insumos)*/}
                                <Link to="/estoque/detalhes" className="botaoDetalhesInsumo">
                                {insumo.nome} 
                                </Link>
                                </td>  {/*.nome: pega o valor do nome do insumo la no array*/}  {/*coloquei className so nesses 2 <td> pra mudar um pouco o CSS*/}
                                {/*.nome: pega o valor do nome do insumo la no array*/}  {/*coloquei className so nesses 2 <td> pra mudar um pouco o CSS*/}
                      
                                  
                                    <td className="loteInsumo">{insumo.lote}</td>  {/*.lote: pega o valor do lote do insumo la no array*/}  {/*coloquei className so nesses 2 <td> pra mudar um pouco o CSS*/}
                                    <td>{insumo.quantidade}</td>                   {/*.quantidade: pega o valor da quantidade do insumo la no array*/}
                                    <td>{insumo.minimo}</td>                       {/*.minimo: pega o valor do minimo de insumo la no array*/}
                                    <td>{insumo.validade}</td>                     {/*.validade: pega o valor da data de validade do insumo la no array*/}
                                    <td>{insumo.custo}</td>                        {/*.custo: pega o valor do custo do insumo la no array*/}
                                    <td>
                                        {/*a classe muda de acordo com o status ("ok" ou "repor"), pra pintar a tarjazinha da cor certa*/}
                                        <span className={"statusReposicao " + insumo.status}> {/*a classe é a variável statusReposicao concatenada a variavel status do insumo */}
                                            {insumo.status === "ok" ? "OK" : "Repor"} {/*variavel status do insumo SE (IF) for "ok" mostra OK, SE NÃO (ELSE) mostra Repor*/}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Estoque;
