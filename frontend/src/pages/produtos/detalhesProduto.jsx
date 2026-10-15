import "./detalhesProduto.css";
import { Link } from "react-router-dom";
import Input from "../../componentes/Input/Input.jsx";      /*Importando o componente input da pasta componentes*/
import Button from "../../componentes/Button/Button.jsx";   /*Importando o componente button da pasta componentes*/
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";  /*Importando o componente sidebar da pasta componentes*/
import Header from "../../componentes/Header/Header.jsx";  /*Importando o componente header da pasta componentes*/
import Select from "../../componentes/Select/Select.jsx";  /*Importando o componente Select da pasta componentes*/
import Textarea from "../../componentes/TextArea/TextArea.jsx";  /*Importando o componente Textarea da pasta componentes*/
import { motion } from "motion/react";

function DetalhesProdutos() {

    /*
    Dados do produto que o user clicou lá na tela de Produtos, em "Ver receita" (exemplo só pra visualizar a tela)
    quando o backend existir de verdade, esses dados vão vir do banco de dados de acordo com o produto q foi clicado
    */
    const produto = {
        nome: "Cupcake Red Velvet",
        categoria: "Bolos",
        descricao: "Cupcake Red Velvet: bolinho de massa vermelha, macia e levemente achocolatada, coberto com creme de cream cheese.",
        receita: "INGREDIENTES - MASSA: Farinha de trigo, Açúcar, Manteiga, Ovos, Leite, Chocolate em pó, Corante vermelho alimentício, Fermento químico, Essência de baunilha. COBERTURA: Cream cheese, Manteiga, Açúcar de confeiteiro, Essência de baunilha. PREPARO - Misture os ingredientes da massa até obter uma mistura homogênea e distribua nas forminhas de cupcake. Asse em forno pré-aquecido a 180°C por aproximadamente 20 minutos. Enquanto os cupcakes esfriam, prepare a cobertura misturando cream cheese, manteiga, açúcar de confeiteiro e essência de baunilha até formar um creme uniforme. Após o resfriamento completo, decore os cupcakes com a cobertura.",
        imagem: "https://www.allrecipes.com/thmb/W5Ou0-fSTAHi5vM9FdJkplRzgNQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/212429-red-velvet-cupcakes-ddmfs-0178-3x4-hero-e5cd9e2684dd4d90b40d9aa0d42e3ee2.jpg",
        custo: "R$ 2,10",
        valor: "R$ 4,90",
    };

    return (
        <div className="tudoDetalhesProdutos">  {/*Div q abriga tudo*/}

            <Sidebar paginaAtiva="Produtos" /> {/*Menu lateral, coloquei "Produtos" como página ativa para "Produtos" no menu lateral ficar clarinho*/}

            <div className="tudoMenosSidebar"> {/*Tudo menos o sidebar q ta acima*/}

                <Header nomeIndustria="Sweet Sunset" /> {/*componente header*/}

                <div className="conteudoDetalhesProdutos"> {/*Div com o conteúdo da página*/}


                    {/*"janela" branca com os dados do produto; todos os campos ficam disabled pq aqui é só pra visualizar, não pra editar*/}
                    <div className="janelaDetalhesProdutos">

                    <div className="tituloESetinha">
                        <svg className="svgSetinha" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#870B22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 8L2 12L6 16"/>
                            <path d="M2 12H22"/>
                        </svg>
                        <h1 className="tituloDetalhesProdutos">Detalhes do produto</h1>
                    </div>


                        <div className="areaFormulario">

                            <div className="colunaEsquerda">

                                <div className="linha1">

                                    <div className="campoDetalhe campoNome">
                                        <label>Nome do produto</label>
                                        <Input value={produto.nome} disabled={true} required={false} />
                                    </div>

                                    <div className="campoDetalhe campoCategoria">
                                        <label>Categoria</label>
                                        <Select id="selectCategoriaDetalhes" value={produto.categoria} disabled={false} required={false} options={[
                                            "Doces finos",
                                            "Bolos",
                                            "Tortas",
                                            "Sazonais",
                                            "Mousses e cremosos",
                                            "Pavês e gelados",
                                            "Cupcakes",
                                            "Cookies/biscoitos",
                                            "Brownies",
                                            "Cheesecakes",
                                            "Doces de pote",
                                            "Trufas/bombons",
                                            "Brigadeiros/enrolados",
                                            "Macarons",
                                            "Donuts",
                                            "Muffins",
                                            "Pudins",
                                            "Pães de mel",
                                            "Rocamboles",
                                            "Kits festa",
                                            "Lançamentos",
                                            "Edição limitada",
                                            "Linha premium",
                                            "Congelados",
                                            "Outros" ]} />
                                    </div>

                                </div>

                                <div className="campoDetalhe campoDescricaoProduto">
                                    <label>Descrição</label>
                                    <Textarea id="textArea" value={produto.descricao} disabled={true} required={false} />
                                </div>

                                <div className="campoDetalhe campoReceitaProduto">
                                    <label>Receita (opcional)</label>
                                    <Textarea id="textArea" value={produto.receita} disabled={true} required={false} />
                                </div>

                            </div>

                            <div className="colunaDireita">

                                <div className="campoDetalhe campoImagem">
                                    <label>Registrar imagem (opcional)</label>
                                    {/*aqui já mostra a foto de verdade cadastrada, ao inves da área de upload*/}
                                    <div className="imagemProdutoDetalhes" style={{ backgroundImage: `url(${produto.imagem})` }}></div>
                                </div>

                                <div className="colunaValores">

                                    <div className="campoDetalhe campoValor">
                                        <label>Custo (un.)</label>
                                        <Input value={produto.custo} disabled={true} required={false} />
                                    </div>

                                    <div className="campoDetalhe campoValor">
                                        <label>Valor (un.)</label>
                                        <Input value={produto.valor} disabled={true} required={false} />
                                    </div>

                                </div>

                            </div>

                        </div>

                    {/*botões de ação: "Excluir": leva pra tela de confirmação apagarProduto, e "Editar" (nao funciona ainda)*/}
                    <div className="botoesDetalhesProdutos">
                        <div className="botaoContorno">
                            <Link to="/produtos/apagar" className="botaoDetalhesProduto">
                                <Button texto="Excluir" />
                            </Link>
                        </div>
                        <Button texto="Editar" />
                    </div>

                    </div>


                </div>

            </div>

        </div>
    );
}

export default DetalhesProdutos;