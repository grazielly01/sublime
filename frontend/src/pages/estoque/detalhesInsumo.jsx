import "./detalhesInsumo.css";
import { Link } from "react-router-dom";
import Input from "../../componentes/Input/Input.jsx";      /*Importando o componente input da pasta componentes*/
import Button from "../../componentes/Button/Button.jsx";   /*Importando o componente button da pasta componentes*/
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";  /*Importando o componente sidebar da pasta componentes*/
import Header from "../../componentes/Header/Header.jsx";  /*Importando o componente header da pasta componentes*/
import Select from "../../componentes/Select/Select.jsx";
import { motion } from "motion/react";

function DetalhesInsumo() {

    /*
    Dados do insumo que o user clicou lá na tela de Estoque (dado de exemplo, "mockado", só pra visualizar a tela).
    Quando o backend existir de verdade, esses dados vão vir da API de acordo com o insumo que foi clicado.
    */
    const insumo = {
        nome: "Leite condensado Moça",
        validade: "11/09/2026",
        lote: "LT-0 426",
        categoria: "Outros",
        custo: "R$ 8,90",
        quantidade: "78",
        quantidadeMinima: "60",
    };

    return (
        <div className="tudoDetalhesInsumo">  {/*Div q abriga tudo*/}

            <Sidebar paginaAtiva="Estoque" /> {/*Menu lateral, coloquei "Estoque" como página ativa para "Estoque" no menu lateral ficar clarinho*/}

            <div className="tudoMenosSidebar"> {/*Tudo menos o sidebar q ta acima*/}

                <Header nomeIndustria="Sweet Sunset" /> {/*componente header*/}

                <div className="conteudoDetalhesInsumo"> {/*Div com o conteúdo da página*/}

                    <div className="tituloESetinha">
                        <svg className="svgSetinha" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#870B22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 8L2 12L6 16"/>
                            <path d="M2 12H22"/>
                        </svg>
                        <h1 className="tituloDetalhesInsumo">Detalhes do insumo</h1>
                    </div>

                    {/*"janela" branca com os dados do insumo -- todos os campos ficam disabled, pq aqui é só pra visualizar, não pra editar*/}
                    <div className="janelaDetalhesInsumo">

                        <div className="linhaDetalhes1">

                            <div className="campoDetalhe campoNome">
                                <label>Nome do insumo</label>
                                <Input value={insumo.nome} disabled={true} required={false} />
                            </div>

                            <div className="campoDetalhe campoValidade">
                                <label>Validade</label>
                                <div className="inputComIcone"> {/*mesma ideia do ícone dentro do Input que já usamos no Login e no Estoque*/}
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="5" width="18" height="16" rx="2" />
                                        <path d="M3 10h18M8 3v4M16 3v4" />
                                    </svg>
                                    <Input id="inputValidade" value={insumo.validade} disabled={true} required={false} />
                                </div>
                            </div>

                            <div className="campoDetalhe campoLote">
                                <label>Lote</label>
                                <Input value={insumo.lote} disabled={true} required={false} />
                            </div>

                        </div>

                        <div className="linhaDetalhes2">

                            <div className="campoDetalhe campoCategoria">
                                <label>Categoria</label>
                                <Select id="selectDetalhesInsumo" value={insumo.categoria} disabled={false} required={false} options={[
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
                                    "Outros" ]} />
                            </div>

                            <div className="campoDetalhe campoValor">
                                <label>Custo unitário</label>
                                <Input value={insumo.custo} disabled={true} required={false} />
                            </div>

                            <div className="campoDetalhe campoValor">
                                <label>Quantidade</label>
                                <Input value={insumo.quantidade} disabled={true} required={false} />
                            </div>

                            <div className="campoDetalhe campoValor">
                                <label>Quantidade mínima</label>
                                <Input value={insumo.quantidadeMinima} disabled={true} required={false} />
                            </div>

                        </div>

                    </div>

                    {/*botões de ação: "Excluir" (contorno, leva pra tela de confirmação apagarInsumo) e "Editar" (preenchido)*/}
                    <div className="botoesDetalhesInsumo">
                        <div className="botaoContorno">
                            <Link to="/estoque/apagar" className="botaoApagarInsumo">
                                <Button texto="Excluir" />
                            </Link>
                        </div>
                        <Button texto="Editar" />
                    </div>

                </div>

            </div>

        </div>
    );
}

export default DetalhesInsumo;