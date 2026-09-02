import "./registrarProduto.css";
import Input from "../../componentes/Input/Input.jsx";      /*Importando o componente input da pasta componentes*/
import Button from "../../componentes/Button/Button.jsx";   /*Importando o componente button da pasta componentes*/
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";  /*Importando o componente sidebar da pasta componentes*/
import Header from "../../componentes/Header/Header.jsx";  /*Importando o componente header da pasta componentes*/
import Select from "../../componentes/Select/Select.jsx";  /*Importando o componente Select da pasta componentes*/
import Textarea from "../../componentes/TextArea/TextArea.jsx";  /*Importando o componente Textarea da pasta componentes*/
import { motion } from "motion/react";

function RegistrarProdutos() {
    return (
        <div className="tudoRegistrarProdutos">  {/*Div q abriga tudo*/}

            <Sidebar paginaAtiva="Produtos" /> {/*Menu lateral, coloquei "Produtos" como página ativa para "Produtos" no menu lateral ficar clarinho*/}

            <div className="tudoMenosSidebar"> {/*Tudo menos o sidebar q ta acima*/}

                <Header nomeIndustria="Sweet Sunset" /> {/*componente header*/}

                <div className="conteudoRegistrarProdutos"> {/*Div com o conteúdo da página*/}

                    <div className="tituloESetinha">
                        <svg className="svgSetinha" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#870B22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 8L2 12L6 16"/>
                            <path d="M2 12H22"/>
                        </svg>
                        <h1 className="tituloRegistrarProdutos">Registrar novo produto</h1>
                    </div>

                    {/*"janela" branca com os dados do produto*/}
                    <div className="janelaRegistrarProdutos">

                        <div className="areaFormulario"> {/*divide a janela em 2 colunas: campos (esquerda) e imagem + valores (direita)*/}

                            {/*coluna esquerda: nome + categoria, descrição, receita*/}
                            <div className="colunaEsquerda">

                                <div className="linha1">

                                    <div className="campoRegistrar campoNome">
                                        <label>Nome do produto <span>*</span></label>
                                        <Input placeholder="Escreva aqui o nome..." required={true} />
                                    </div>

                                    <div className="campoRegistrar campoCategoria">
                                        <label>Categoria <span>*</span></label>
                                        <Select id="selectCategoriaRegistrar" required={true} options={[
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

                                <div className="campoRegistrar campoDescricaoProduto">
                                    <label>Descrição <span>*</span></label>
                                    <Textarea id="textArea" placeholder="Escreva aqui a descrição..." required={true} />
                                </div>

                                <div className="campoRegistrar campoReceitaProduto">
                                    <label>Receita (opcional)</label>
                                    <Textarea id="textArea" placeholder="Escreva aqui a receita..." required={false} />
                                </div>

                            </div>

                            {/*coluna direita: upload de imagem + custo/*/}
                            <div className="colunaDireita">

                                <div className="campoRegistrar campoImagem">
                                    <label>Registrar imagem (opcional)</label>

                                    {/*area de upload: só visual por enquanto, ainda nn guarda a imagem de verdade pous nao tem backend)*/}
                                    <label htmlFor="uploadImagemProduto" className="areaUpload">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="#870B22" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 16V4" />
                                            <path d="M7 9l5-5 5 5" />
                                            <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
                                        </svg>
                                        <p className="textoUpload">Clique aqui para anexar ou arraste o arquivo aqui</p>
                                        <p className="textoUploadPequeno">JPG, JPEG ou PNG (máx. 10MB)</p>
                                    </label>

                                    {/*input de arquivo escondido: so o basiquinho pra quando tiver backend*/}
                                    <input type="file" id="uploadImagemProduto" accept=".jpg,.jpeg,.png" hidden />
                                </div>

                                <div className="colunaValores">

                                    <div className="campoRegistrar campoValor">
                                        <label>Custo (un.) <span>*</span></label>
                                        <Input placeholder="R$ 00,00" required={true} />
                                    </div>

                                    <div className="campoRegistrar campoValor">
                                        <label>Valor (un.) <span>*</span></label>
                                        <Input placeholder="R$ 00,00" required={true} />
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/*botoes Cancelar e Registrar (preenchido)*/}
                    <div className="botoesRegistrarProdutos">
                        <div className="botaoContorno">
                            <Button texto="Cancelar" />
                        </div>
                        <Button texto="Registrar" />
                    </div>

                </div>

            </div>

        </div>
    );
}

export default RegistrarProdutos;