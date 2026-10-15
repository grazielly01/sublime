import "./produtos.css";
import { Link } from "react-router-dom";
import Button from "../../componentes/Button/Button.jsx";   /*Importando o componente button da pasta componentes*/
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";  /*Importando o componente sidebar da pasta componentes*/
import Header from "../../componentes/Header/Header.jsx";  /*Importando o componente header da pasta componentes*/
import Select from "../../componentes/Select/Select.jsx";  /*Importando o componente Select da pasta componentes*/
import { motion } from "motion/react";

function Produtos(){

    /*Lista de produtos (por enquanto é assim só pra gente visualizar a tela). quando o backend existir: nome, categoria, ingredientes e imagem são cadastrados pelo user, e aparecem na tela pelo BD.
    já custo e margem são CALCULADOS pelo próprio sistema (backedn) e guardados no BD tbm, aí aparece na tela tb
    "imagem: null" simula um produto q ainda n teve foto cadastrada (aí o retangulo da tela fica rosa)*/
    
    const produtos = [
        { nome: "Brigadeiro Gourmet", categoria: "Doces finos", ingredientes: 4, custo: "R$ 0.84", venda: "R$ 1.80", margem: "53%", imagem: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiCnI_a5G2wJKRRvcKJj-BPMK6eM0WC89XP6Fth7r_sX3P8dLF8Up-cRVrYvp8pA6ENIf1hog-vgmL3S6uzxbWXBw0sNu1iLFa1i0Elwom4vT1_xrXFo0MGj9-9z5WtHNm2LJ2GLNOOghqI/s1600/receita-brigadeiro-gourmet-para-vender-presentear.JPG" },
        { nome: "Cupcake Red Velvet", categoria: "Bolos", ingredientes: 9, custo: "R$ 2.10", venda: "R$ 4.90", margem: "57%", imagem: "https://guiadacozinha.com.br/wp-content/uploads/2018/03/cupcake-red-velvet.jpg" },
        { nome: "Torta de Limão 22cm", categoria: "Tortas", ingredientes: 7, custo: "R$ 18.20", venda: "R$ 42.00", margem: "57%", imagem: null },
        { nome: "Cookie com Gotas de Chocolate", categoria: "Cookies/biscoitos", ingredientes: 6, custo: "R$ 1.10", venda: "R$ 2.50", margem: "56%", imagem: "https://www.bettycrocker.com/_next/image?url=https%3A%2F%2Fmojo.generalmills.com%2Fapi%2Fpublic%2Fcontent%2F_pLFRXFETcuXWg_Z0MhZPw_gmi_hi_res_jpeg.jpeg%3Fv%3D693b292b%26t%3D4c5a749111ad462d9f0355ce09ad5134&w=3840&q=75" },
        { nome: "Bolo de Chocolate 1kg", categoria: "Bolos", ingredientes: 8, custo: "R$ 12.40", venda: "R$ 28.00", margem: "56%", imagem: "https://i.ytimg.com/vi/QFMxJWh3mqE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB1oMv5Lz2emS2zXD6_wdvaNWfNEg" },
        { nome: "Ovo de Páscoa 250g", categoria: "Sazonais", ingredientes: 5, custo: "R$ 9.80", venda: "R$ 22.00", margem: "55%", imagem: null },
        { nome: "Pudim de Leite Condensado", categoria: "Pudins", ingredientes: 5, custo: "R$ 3.50", venda: "R$ 8.00", margem: "56%", imagem: "https://cdn0.tudoreceitas.com/pt/posts/3/0/2/pudim_de_leite_condensado_203_orig.jpg" },
        { nome: "Camafeu de Nozes", categoria: "Trufas/bombons", ingredientes: 6, custo: "R$ 2.80", venda: "R$ 6.50", margem: "57%", imagem: "https://anamariabrogui.com.br/assets/uploads/receitas/fotos/usuario-2114-5a55fe2a33f8a09494272e9f67af7c3a.jpg" },
        { nome: "Brownie de Chocolate", categoria: "Brownies", ingredientes: 7, custo: "R$ 4.20", venda: "R$ 9.50", margem: "56%", imagem: "https://s04.video.glbimg.com/x720/13097763.jpg" },
    ];

    return(
       <div className="pagina-produtos tudoProdutos"> {/* <-- Adicionada a classe pagina-produtos */}
            <Sidebar paginaAtiva="Produtos" /> {/*Menu lateral, coloquei "Produtos" como página ativa para "Produtos" no menu lateral ficar clarinho*/}

            <div className="tudoMenosSidebar">
                <Header nomeIndustria="Sweet Sunset" /> {/*componente header*/}

                <div className="conteudoProdutos conteudoProdutos2"> {/*Div com o conteúdo da página*/}

                    {/*linha de cima: título + subtítulo*/}
                    <div className="topoProdutos">
                        <div>
                            <h1 className="tituloProdutos">Produtos</h1>
                            <p className="subtituloProdutos">Cadastro de receitas com cálculo automático de custo e margem.</p>
                        </div>
                    </div>

                    {/*select de filtro de categoria e o botão "+ Novo produto"*/}
                    <div className="barraFiltroProdutos">

                        <div className="filtroCategoria">
                            <Select id="selectCategoriaProdutos" required={false} options={[
                                "Todos",
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
                        
                        <Link to="/produtos/registrar" className="botaoNovoProduto"> 
                            <Button texto="+ Novo produto" />
                        </Link>

                    </div>

                    {/*quadradinhos com os produtos. .map() percorre a lista "produtos" e cria um card pra cada um*/}
                    <div className="listaProdutos">
                        {produtos.map((produto, index) => (
                            <div className="cardProduto" key={index}>

                                {/*se "imagem" for null, o fundo rosa do CSS aparece no lugar*/}
                                <div
                                    className="imagemProduto"
                                    style={produto.imagem ? { backgroundImage: `url(${produto.imagem})` } : {}}
                                >
                                    <span className="tarjaCategoria">{produto.categoria}</span>
                                </div>

                                <div className="infoProduto">

                                    <h2 className="nomeProduto">{produto.nome}</h2>
                                    <p className="qtdIngredientes">{produto.ingredientes} ingredientes na ficha técnica</p>

                                    <div className="valoresProduto">
                                        <div className="valorProduto">
                                            <p className="labelValor">Custo</p>
                                            <p className="numeroValor">{produto.custo}</p>
                                        </div>
                                        <div className="valorProduto">
                                            <p className="labelValor">Venda</p>
                                            <p className="numeroValor numeroVenda">{produto.venda}</p>
                                        </div>
                                        <div className="valorProduto">
                                            <p className="labelValor">Margem</p>
                                            <p className="numeroValor">{produto.margem}</p>
                                        </div>
                                    </div>

                                    <div className="botaoVerReceita"> {/*ainda sem onClick pq nao tem backend*/}
                                        <Link to="/produtos/detalhes" className="botaoDetalhesProduto">
                                            <Button texto="Ver receita" />
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Produtos;