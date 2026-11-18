import { useState } from "react";
import "./produtos.css";
import "./registrarProduto.css";
import "./detalhesProduto.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import Select from "../../componentes/Select/Select.jsx";
import Button from "../../componentes/Button/Button.jsx";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

function Produtos() {
    const [produtos, setProdutos] = useState([
        { id: 1, nome: "Brigadeiro Gourmet", categoria: "Doces finos", ingredientes: 4, custo: "R$ 0,84", venda: "R$ 1,80", margem: "53%", descricao: "Brigadeiro gourmet tradicional feito com chocolate belo.", receita: "Leite condensado, creme de leite, cacau em pó e manteiga.", imagem: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiCnI_a5G2wJKRRvcKJj-BPMK6eM0WC89XP6Fth7r_sX3P8dLF8Up-cRVrYvp8pA6ENIf1hog-vgmL3S6uzxbWXBw0sNu1iLFa1i0Elwom4vT1_xrXFo0MGj9-9z5WtHNm2LJ2GLNOOghqI/s1600/receita-brigadeiro-gourmet-para-vender-presentear.JPG" },
        { id: 2, nome: "Cupcake Red Velvet", categoria: "Bolos", ingredientes: 9, custo: "R$ 2,10", venda: "R$ 4,90", margem: "57%", descricao: "Cupcake Red Velvet: bolinho de massa vermelha.", receita: "Farinha, açúcar, manteiga, ovos, cacau e cream cheese.", imagem: "https://guiadacozinha.com.br/wp-content/uploads/2018/03/cupcake-red-velvet.jpg" },
        { id: 3, nome: "Torta de Limão 22cm", categoria: "Tortas", ingredientes: 7, custo: "R$ 18,20", venda: "R$ 42,00", margem: "57%", descricao: "Torta de limão com massa crocante.", receita: "Farinha, manteiga, leite condensado e limão.", imagem: null },
        { id: 4, nome: "Cookie com Gotas de Chocolate", categoria: "Cookies/biscoitos", ingredientes: 6, custo: "R$ 1,10", venda: "R$ 2,50", margem: "56%", descricao: "Cookie amanteigado com gotas de chocolate.", receita: "Farinha, açúcar mascavo, manteiga e gotas de chocolate.", imagem: "https://www.bettycrocker.com/_next/image?url=https%3A%2F%2Fmojo.generalmills.com%2Fapi%2Fpublic%2Fcontent%2F_pLFRXFETcuXWg_Z0MhZPw_gmi_hi_res_jpeg.jpeg%3Fv%3D693b292b%26t%3D4c5a749111ad462d9f0355ce09ad5134&w=3840&q=75" },
        { id: 5, nome: "Bolo de Chocolate 1kg", categoria: "Bolos", ingredientes: 8, custo: "R$ 12,40", venda: "R$ 28,00", margem: "56%", descricao: "Bolo fofinho de chocolate.", receita: "Farinha, chocolate em pó, ovos, óleo e fermento.", imagem: "https://i.ytimg.com/vi/QFMxJWh3mqE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB1oMv5Lz2emS2zXD6_wdvaNWfNEg" },
        { id: 6, nome: "Ovo de Páscoa 250g", categoria: "Sazonais", ingredientes: 5, custo: "R$ 9,80", venda: "R$ 22,00", margem: "55%", descricao: "Ovo recheado artesanal.", receita: "Chocolate nobre e recheio cremoso.", imagem: null },
    ]);

    // Estados do pop-up Registrar Novo Produto
    const [modalNovoProdutoAberto, setModalNovoProdutoAberto] = useState(false);
    const [novoProdutoForm, setNovoProdutoForm] = useState({
        nome: "",
        categoria: "Doces finos",
        descricao: "",
        receita: "",
        custo: "",
        venda: "",
    });

    // Estados do pop-up Detalhes / Ver Receita do Produto
    const [modalDetalhesAberto, setModalDetalhesAberto] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [editandoProduto, setEditandoProduto] = useState(false);

    // Estado do pop-up Confirmar Exclusão do Produto
    const [modalConfirmarExclusaoAberto, setModalConfirmarExclusaoAberto] = useState(false);

    const handleRegistrarProduto = (e) => {
        e.preventDefault();
        const novoItem = {
            id: Date.now(),
            nome: novoProdutoForm.nome,
            categoria: novoProdutoForm.categoria,
            ingredientes: 5,
            custo: `R$ ${novoProdutoForm.custo || "0,00"}`,
            venda: `R$ ${novoProdutoForm.venda || "0,00"}`,
            margem: "55%",
            descricao: novoProdutoForm.descricao,
            receita: novoProdutoForm.receita,
            imagem: null,
        };

        setProdutos((prev) => [novoItem, ...prev]);
        setNovoProdutoForm({
            nome: "",
            categoria: "Doces finos",
            descricao: "",
            receita: "",
            custo: "",
            venda: "",
        });
        setModalNovoProdutoAberto(false);
    };

    const abrirDetalhesProduto = (produto) => {
        setProdutoSelecionado({
            id: produto.id,
            nome: produto.nome,
            categoria: produto.categoria,
            descricao: produto.descricao || "Sem descrição informada.",
            receita: produto.receita || "Sem receita informada.",
            custo: produto.custo,
            venda: produto.venda,
            imagem: produto.imagem,
        });
        setEditandoProduto(false);
        setModalDetalhesAberto(true);
    };

    const salvarEdicaoProduto = () => {
        if (!produtoSelecionado) return;
        setProdutos((prev) =>
            prev.map((p) =>
                p.id === produtoSelecionado.id
                    ? {
                        ...p,
                        nome: produtoSelecionado.nome,
                        categoria: produtoSelecionado.categoria,
                        descricao: produtoSelecionado.descricao,
                        receita: produtoSelecionado.receita,
                        custo: produtoSelecionado.custo,
                        venda: produtoSelecionado.venda,
                        imagem: produtoSelecionado.imagem,
                    }
                    : p
            )
        );
        setEditandoProduto(false);
    };

    // Abre o pop-up de confirmação de exclusão mantendo o padrão visual
    const solicitarExclusaoProduto = () => {
        setModalDetalhesAberto(false);
        setModalConfirmarExclusaoAberto(true);
    };

    // Remove o produto definitivamente da lista
    const confirmarExclusaoProduto = () => {
        if (produtoSelecionado) {
            setProdutos((prev) => prev.filter((p) => p.id !== produtoSelecionado.id));
        }
        setModalConfirmarExclusaoAberto(false);
        setProdutoSelecionado(null);
    };

    return(
       <div className="pagina-produtos tudoProdutos">
            <Sidebar paginaAtiva="Produtos" />

            <div className="tudoMenosSidebar">
                <Header nomeIndustria="Sweet Sunset" />

                <div className="conteudoProdutos conteudoProdutos2">

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
                        
                        <div onClick={() => setModalNovoProdutoAberto(true)} className="botaoNovoProduto"> 
                            <Button texto="+ Novo produto" />
                        </div>
                    </div>

                    {/*quadradinhos com os produtos*/}
                    <div className="listaProdutos">
                        {produtos.map((produto) => (
                            <div className="cardProduto" key={produto.id}>
                                <div
                                    className="imagemProduto"
                                    style={produto.imagem ? { backgroundImage: `url(${produto.imagem})` } : {}}
                                >
                                    <span className="tarjaCategoria">{produto.categoria}</span>
                                </div>

                                <div className="infoProduto">
                                    <h2 className="nomeProduto">{produto.nome}</h2>
                                    <p className="qtdIngredientes">{produto.ingredientes || 5} ingredientes na ficha técnica</p>

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

                                    <div
                                        className="botaoVerReceita"
                                        onClick={() => abrirDetalhesProduto(produto)}
                                    >
                                        <Button texto="Ver receita" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* =====================================================
               POP-UP 1: DETALHES / VER RECEITA DO PRODUTO
            ===================================================== */}
            {modalDetalhesAberto && produtoSelecionado && (
                <div className="modalOverlay">
                    <div className="modalConteudo" style={{ maxWidth: "860px" }}>
                        <div className="modalCabecalho">
                            <h2>Detalhes do produto</h2>
                            <button
                                type="button"
                                className="botaoFecharModal"
                                onClick={() => setModalDetalhesAberto(false)}
                            >
                                &times;
                            </button>
                        </div>

                        <div className="modalCorpo">
                            <div className="formDetalhesProdutosModal">
                                <div className="areaFormularioDetalhesModal">
                                    
                                    {/* Coluna Esquerda */}
                                    <div className="colunaEsquerdaDetalhesModal">
                                        <div className="linhaDetalhesModal">
                                            <div className="campoDetalheModal campoNomeDetalhesModal">
                                                <label>Nome do produto</label>
                                                <input
                                                    type="text"
                                                    value={produtoSelecionado.nome}
                                                    disabled={!editandoProduto}
                                                    onChange={(e) =>
                                                        setProdutoSelecionado({ ...produtoSelecionado, nome: e.target.value })
                                                    }
                                                />
                                            </div>

                                            <div className="campoDetalheModal campoCategoriaDetalhesModal">
                                                <label>Categoria</label>
                                                <select
                                                    id="selectCategoriaDetalhes"
                                                    value={produtoSelecionado.categoria}
                                                    disabled={!editandoProduto}
                                                    onChange={(e) =>
                                                        setProdutoSelecionado({ ...produtoSelecionado, categoria: e.target.value })
                                                    }
                                                >
                                                    {[
                                                        "Doces finos", "Bolos", "Tortas", "Sazonais",
                                                        "Mousses e cremosos", "Pavês e gelados", "Cupcakes",
                                                        "Cookies/biscoitos", "Brownies", "Cheesecakes",
                                                        "Doces de pote", "Trufas/bombons", "Brigadeiros/enrolados",
                                                        "Macarons", "Donuts", "Muffins", "Pudins", "Pães de mel",
                                                        "Rocamboles", "Kits festa", "Lançamentos", "Edição limitada",
                                                        "Linha premium", "Congelados", "Outros"
                                                    ].map((cat) => (
                                                        <option key={cat} value={cat}>{cat}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="campoDetalheModal campoDescricaoDetalhesModal">
                                            <label>Descrição</label>
                                            <textarea
                                                value={produtoSelecionado.descricao}
                                                disabled={!editandoProduto}
                                                onChange={(e) =>
                                                    setProdutoSelecionado({ ...produtoSelecionado, descricao: e.target.value })
                                                }
                                            />
                                        </div>

                                        <div className="campoDetalheModal campoReceitaDetalhesModal">
                                            <label>Receita (opcional)</label>
                                            <textarea
                                                value={produtoSelecionado.receita}
                                                disabled={!editandoProduto}
                                                onChange={(e) =>
                                                    setProdutoSelecionado({ ...produtoSelecionado, receita: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>

                                    {/* Coluna Direita (Imagem Dinâmica) */}
                                    <div className="colunaDireitaDetalhesModal">
                                        <div className="campoDetalheModal campoImagemDetalhesModal">
                                            <label>Registrar imagem (opcional)</label>
                                            
                                            {!editandoProduto ? (
                                                <div
                                                    className="imagemProdutoDetalhesModal"
                                                    style={produtoSelecionado.imagem ? { backgroundImage: `url(${produtoSelecionado.imagem})` } : {}}
                                                />
                                            ) : (
                                                <>
                                                    <label htmlFor="uploadImagemEdit" className="areaUploadDetalhesEdit">
                                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M12 16V4" />
                                                            <path d="M7 9l5-5 5 5" />
                                                            <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
                                                        </svg>
                                                        <p className="textoUploadDetalhes">Clique para trocar a imagem</p>
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id="uploadImagemEdit"
                                                        accept=".jpg,.jpeg,.png"
                                                        hidden
                                                        onChange={(e) => {
                                                            if (e.target.files && e.target.files[0]) {
                                                                const urlTemp = URL.createObjectURL(e.target.files[0]);
                                                                setProdutoSelecionado({ ...produtoSelecionado, imagem: urlTemp });
                                                            }
                                                        }}
                                                    />
                                                </>
                                            )}
                                        </div>

                                        <div className="colunaValoresDetalhesModal">
                                            <div className="campoDetalheModal">
                                                <label>Custo (un.)</label>
                                                <input
                                                    type="text"
                                                    value={produtoSelecionado.custo}
                                                    disabled={!editandoProduto}
                                                    onChange={(e) =>
                                                        setProdutoSelecionado({ ...produtoSelecionado, custo: e.target.value })
                                                    }
                                                />
                                            </div>

                                            <div className="campoDetalheModal">
                                                <label>Valor (un.)</label>
                                                <input
                                                    type="text"
                                                    value={produtoSelecionado.venda}
                                                    disabled={!editandoProduto}
                                                    onChange={(e) =>
                                                        setProdutoSelecionado({ ...produtoSelecionado, venda: e.target.value })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="botoesDetalhesProdutosModal">
                                    <button
                                        type="button"
                                        className="botaoContornoDetalhesModal"
                                        onClick={solicitarExclusaoProduto}
                                    >
                                        Excluir
                                    </button>
                                    <button
                                        type="button"
                                        className="botaoPreenchidoDetalhesModal"
                                        onClick={() => {
                                            if (editandoProduto) {
                                                salvarEdicaoProduto();
                                            } else {
                                                setEditandoProduto(true);
                                            }
                                        }}
                                    >
                                        {editandoProduto ? "Salvar" : "Editar"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* =====================================================
               POP-UP 2: CONFIRMAR EXCLUSÃO DO PRODUTO
            ===================================================== */}
            {modalConfirmarExclusaoAberto && produtoSelecionado && (
                <div className="modalOverlay">
                    <div className="modalConteudo" style={{ maxWidth: "460px" }}>
                        <div
                            className="modalCabecalho"
                            style={{ borderBottom: "none", marginBottom: 0, paddingBottom: 0 }}
                        >
                            <span />
                            <button
                                type="button"
                                className="botaoFecharModal"
                                onClick={() => {
                                    setModalConfirmarExclusaoAberto(false);
                                    setModalDetalhesAberto(true);
                                }}
                            >
                                &times;
                            </button>
                        </div>

                        <div className="conteudoConfirmacaoApagarEvento">
                            <div className="iconeAlertaApagarEvento">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>

                            <h3 className="tituloConfirmacaoApagarEvento">
                                Excluir produto?
                            </h3>

                            <p className="textoConfirmacaoApagarEvento">
                                Tem certeza de que deseja excluir o produto{" "}
                                <strong>{produtoSelecionado.nome}</strong>?
                            </p>

                            <p className="subtextoConfirmacaoApagarEvento">
                                Esta ação não poderá ser desfeita e o produto será removido do catálogo.
                            </p>

                            <div className="botoesConfirmacaoEvento">
                                <button
                                    type="button"
                                    className="botaoCancelarEvento"
                                    onClick={() => {
                                        setModalConfirmarExclusaoAberto(false);
                                        setModalDetalhesAberto(true);
                                    }}
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="button"
                                    className="botaoConfirmarApagarEvento"
                                    onClick={confirmarExclusaoProduto}
                                >
                                    Sim, excluir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* =====================================================
               POP-UP 3: REGISTRAR NOVO PRODUTO
            ===================================================== */}
            {modalNovoProdutoAberto && (
                <div className="modalOverlay">
                    <div className="modalConteudo" style={{ maxWidth: "860px" }}>
                        <div className="modalCabecalho">
                            <h2>Registrar novo produto</h2>
                            <button
                                type="button"
                                className="botaoFecharModal"
                                onClick={() => setModalNovoProdutoAberto(false)}
                            >
                                &times;
                            </button>
                        </div>

                        <div className="modalCorpo">
                            <form className="formRegistrarProdutosModal" onSubmit={handleRegistrarProduto}>
                                <div className="areaFormularioModal">
                                    
                                    {/* Coluna Esquerda */}
                                    <div className="colunaEsquerdaModal">
                                        <div className="linha1Modal">
                                            <div className="campoRegistrarModal campoNomeModal">
                                                <label>Nome do produto <span>*</span></label>
                                                <input
                                                    type="text"
                                                    placeholder="Escreva aqui o nome..."
                                                    required
                                                    value={novoProdutoForm.nome}
                                                    onChange={(e) =>
                                                        setNovoProdutoForm({ ...novoProdutoForm, nome: e.target.value })
                                                    }
                                                />
                                            </div>

                                            <div className="campoRegistrarModal campoCategoriaModal">
                                                <label>Categoria <span>*</span></label>
                                                <select
                                                    id="selectCategoriaRegistrar"
                                                    value={novoProdutoForm.categoria}
                                                    onChange={(e) =>
                                                        setNovoProdutoForm({ ...novoProdutoForm, categoria: e.target.value })
                                                    }
                                                >
                                                    {[
                                                        "Doces finos", "Bolos", "Tortas", "Sazonais",
                                                        "Mousses e cremosos", "Pavês e gelados", "Cupcakes",
                                                        "Cookies/biscoitos", "Brownies", "Cheesecakes",
                                                        "Doces de pote", "Trufas/bombons", "Brigadeiros/enrolados",
                                                        "Macarons", "Donuts", "Muffins", "Pudins", "Pães de mel",
                                                        "Rocamboles", "Kits festa", "Lançamentos", "Edição limitada",
                                                        "Linha premium", "Congelados", "Outros"
                                                    ].map((cat) => (
                                                        <option key={cat} value={cat}>{cat}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="campoRegistrarModal campoDescricaoProdutoModal">
                                            <label>Descrição <span>*</span></label>
                                            <textarea
                                                placeholder="Escreva aqui a descrição..."
                                                required
                                                value={novoProdutoForm.descricao}
                                                onChange={(e) =>
                                                    setNovoProdutoForm({ ...novoProdutoForm, descricao: e.target.value })
                                                }
                                            />
                                        </div>

                                        <div className="campoRegistrarModal campoReceitaProdutoModal">
                                            <label>Receita (opcional)</label>
                                            <textarea
                                                placeholder="Escreva aqui a receita..."
                                                value={novoProdutoForm.receita}
                                                onChange={(e) =>
                                                    setNovoProdutoForm({ ...novoProdutoForm, receita: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>

                                    {/* Coluna Direita */}
                                    <div className="colunaDireitaModal">
                                        <div className="campoRegistrarModal campoImagemModal">
                                            <label>Registrar imagem (opcional)</label>
                                            <label htmlFor="uploadImagemProdutoModal" className="areaUploadModal">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M12 16V4" />
                                                    <path d="M7 9l5-5 5 5" />
                                                    <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
                                                </svg>
                                                <p className="textoUploadModal">Clique aqui para anexar</p>
                                                <p className="textoUploadPequenoModal">JPG, PNG (máx. 10MB)</p>
                                            </label>
                                            <input type="file" id="uploadImagemProdutoModal" accept=".jpg,.jpeg,.png" hidden />
                                        </div>

                                        <div className="colunaValoresModal">
                                            <div className="campoRegistrarModal">
                                                <label>Custo (un.) <span>*</span></label>
                                                <input
                                                    type="text"
                                                    placeholder="0,00"
                                                    required
                                                    value={novoProdutoForm.custo}
                                                    onChange={(e) =>
                                                        setNovoProdutoForm({ ...novoProdutoForm, custo: e.target.value })
                                                    }
                                                />
                                            </div>

                                            <div className="campoRegistrarModal">
                                                <label>Valor (un.) <span>*</span></label>
                                                <input
                                                    type="text"
                                                    placeholder="0,00"
                                                    required
                                                    value={novoProdutoForm.venda}
                                                    onChange={(e) =>
                                                        setNovoProdutoForm({ ...novoProdutoForm, venda: e.target.value })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="botoesRegistrarProdutosModal">
                                    <button
                                        type="button"
                                        className="botaoContornoModal"
                                        onClick={() => setModalNovoProdutoAberto(false)}
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit" className="botaoPreenchidoModal">
                                        Registrar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
       </div>
    );
}

export default Produtos;