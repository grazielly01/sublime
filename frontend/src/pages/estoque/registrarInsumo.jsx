import "./registrarInsumo.css";
import Input from "../../componentes/Input/Input.jsx";      /*Importando o componente input da pasta componentes*/
import Button from "../../componentes/Button/Button.jsx";   /*Importando o componente button da pasta componentes*/
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";  /*Importando o componente sidebar da pasta componentes*/
import Header from "../../componentes/Header/Header.jsx";  /*Importando o componente header da pasta componentes*/
import Select from "../../componentes/Select/Select.jsx";  /*Importando o componente Select da pasta componentes*/
import { motion } from "motion/react";

function RegistrarInsumo() {
   return (
        <div className="tudoRegistrarInsumo">  {/*Div q abriga tudo*/}

            <Sidebar paginaAtiva="Estoque" /> {/*Menu lateral, coloquei "Estoque" como página ativa para "Estoque" no menu lateral ficar clarinho*/}

            <div className="tudoMenosSidebar"> {/*Tudo menos o sidebar q ta acima*/}

                <Header nomeIndustria="Sweet Sunset" /> {/*componente header*/}

                <div className="conteudoRegistrarInsumo"> {/*Div com o conteúdo da página*/}

                    <div className="tituloESetinha">
                        <svg className="svgSetinha" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#870B22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 8L2 12L6 16"/>
                            <path d="M2 12H22"/>
                        </svg>
                        <h1 className="tituloRegistrarInsumo">Registrar novo insumo</h1>
                    </div>

                    {/*"janela" branca com os dados do insumo -- todos os campos ficam disabled, pq aqui é só pra visualizar, não pra editar*/}
                    <div className="janelaRegistrarInsumo">

                        <div className="linha1">

                            <div className="campoRegistrar campoNome">
                                <label>Nome do insumo</label>
                                <Input placeholder="Digite aqui o nome do insumo..." required={true} />
                            </div>

                            <div className="campoRegistrar campoValidade">
                                <label>Validade</label>
                                <div className="inputComIcone"> {/*mesma ideia do ícone dentro do Input que já usamos no Login e no Estoque*/}
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="5" width="18" height="16" rx="2" />
                                        <path d="M3 10h18M8 3v4M16 3v4" />
                                    </svg>
                                    <Input id="inputValidade" placeholder="DD/MM/AAAA" required={true} />
                                </div>
                            </div>

                            <div className="campoRegistrar campoLote">
                                <label>Lote</label>
                                <Input placeholder="LT-0 000" required={true} />
                            </div>

                        </div>

                        <div className="linha2">

                            <div className="campoRegistrar campoCategoria">
                                <label>Categoria</label>
                                <Select id="selectRegistrarInsumo" required={true} options={[
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

                            <div className="campoRegistrar campoValor">
                                <label>Custo unitário</label>
                                <Input placeholder="R$ 0,00" required={true} />
                            </div>

                            <div className="campoRegistrar campoValor">
                                <label>Quantidade</label>
                                <Input placeholder="00" required={true} />
                            </div>

                            <div className="campoRegistrar campoValor">
                                <label>Quantidade mínima</label>
                                <Input placeholder="00" required={true} />
                            </div>

                        </div>

                    </div>

                    {/*botões de ação: "Excluir" (contorno, leva pra tela de confirmação apagarInsumo) e "Editar" (preenchido)*/}
                    <div className="botoesRegistrarInsumo">
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


export default RegistrarInsumo;