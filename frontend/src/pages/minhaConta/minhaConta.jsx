import "./minhaConta.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";  /*Importando o componente sidebar da pasta componentes; APROVADO*/
import Header from "../../componentes/Header/Header.jsx";  /*Importando o componente header da pasta componentes. */
import Input from "../../componentes/Input/Input.jsx";      /*Importando o componente input da pasta componentes*/
import Button from "../../componentes/Button/Button.jsx";   /*Importando o componente button da pasta componentes*/

function MinhaConta() {
    return(
        <div className="tudoMinhaConta">
            <Sidebar paginaAtiva="Minha conta" /> {/*Menu lateral, coloquei "minhaConta" como página ativa para "Minha conta" no menu lateral ficar clarinho*/}
       
            <div className="tudoMenosSidebar tudoMenosSidebarMinhaConta"> {/*Tudo menos o sidebar q ta acima*/}

                <Header nomeIndustria="Sweet Sunset"/> 
                {/*componente header*/}
       
                <div className="conteudoMinhaConta conteudoMinhaConta2"> {/*Div com o conteúdo da página*/}

                    <h1 className="tituloMinhaConta">Minha conta</h1>
                    <p className="subtituloMinhaConta">Suas informações pessoais</p>

                    <div className="duasAbas">
                        <div className="abaEsquerda">
                            <div className="infosAbaEsquerda">
                                <div className="fotinhaENome">
                                    <div className="iconUser">
                                        <img src="../img/icon-user.png" alt="user" />
                                    </div>
                                    <h3>Mariana Oliveira</h3>
                                    <p>Gerente</p>
                                </div>

                                <div className="tarjaPlano">
                                    <h2>Sweet Sunset Indústria</h2>
                                    <p>Plano ERP Pro: Ativo</p>
                                </div>

                                <div className="alterarFoto">
                                    <input className="inputAlterarFoto" type="file" id="uploadImagemMinhaConta" accept=".jpg,.jpeg,.png"/>
                                    <label htmlFor="uploadImagemMinhaConta" className="botaoAlterarFoto">Alterar foto</label>
                                </div>


                                    
                            </div>
                        </div>

                        <div className="abaDireita">
                            <div className="infosAbaDireita">

                                <h2>Dados pessoais</h2>

                                <div className="outrosInputs">
                                    <div>
                                        <label className="labelsInputs">Nome completo</label>
                                        <Input type="text" placeholder="Mariana Oliveira Moraes"></Input>
                                    </div>


                                    <div>
                                        <label className="labelsInputs">Email</label>
                                        <Input type="email" placeholder="MarianaOlive077@gmail.com"></Input>
                                    </div>


                                    <div>
                                        <label className="labelsInputs">Telefone</label>
                                        <Input type="number" placeholder="(11) 9 8765-4321"></Input>
                                    </div>


                                    <div>
                                        <label className="labelsInputs">Cargo</label>
                                        <Input type="text" placeholder="Gerente"></Input>
                                    </div>
                                </div>

                                <div className="botoesDadosPessoais">
                                    <Button texto="Salvar" />
                                    <Button id="buttonAlterarSenha" texto="Alterar senha" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MinhaConta;
