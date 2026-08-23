import "./minhaConta.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";  /*Importando o componente sidebar da pasta componentes*/
import Header from "../../componentes/Header/Header.jsx";  /*Importando o componente header da pasta componentes*/
import Input from "../../componentes/Input/Input.jsx";      /*Importando o componente input da pasta componentes*/
import Button from "../../componentes/Button/Button.jsx";   /*Importando o componente button da pasta componentes*/


function MinhaConta() {
    return(
        <div className="tudoMinhaConta">
            <Sidebar paginaAtiva="Minha conta" /> {/*Menu lateral, coloquei "minhaConta" como página ativa para "Minha conta" no menu lateral ficar clarinho*/}
       
            <div className="tudoMenosSidebar"> {/*Tudo menos o sidebar q ta acima*/}


                <Header nomeIndustria="Sweet Sunset" /> {/*componente header*/}
       
                <div className="conteudoMinhaConta"> {/*Div com o conteúdo da página*/}


                    <h1 className="tituloMinhaConta">Minha conta</h1>
                    <p className="subtituloMinhaConta">Suas informações pessoais</p>


                    <div className="duasAbas">
                        <div className="abaEsquerda">
                            <div className="infosAbaEsquerda">
                                <div className="fotinhaENome">
                                    <div className="iconUser">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="103" height="103" viewBox="-05.5 -05 25 25" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-user-round-icon lucide-user-round" color="#ffffff">
                                            <circle cx="12" cy="8" r="5"/>
                                            <path d="M20 21a8 8 0 0 0-16 0"/>
                                        </svg> 
                                    </div>


                                    <h3>Mariana Oliveira</h3>


                                    <p>Gerente</p>
                                </div>


                                <div className="tarjaPlano">
                                    <h2>Sweet Sunset Indústria</h2>
                                    <p>Plano ERP Pro: Ativo</p>
                                </div>


                                    <Button texto="Alterar foto" />
                               
                            </div>
                        </div>


                        <div className="abaDireita">
                            <div className="infosAbaDireita">


                                <h2>Dados pessoais</h2>

                                <div className="doisInputs">
                                    <div className="input1">
                                        <label>Nome</label>
                                        <Input type="text" placeholder="Mariana"></Input>
                                    </div>

                                    <div className="input2">
                                        <label>Sobrenome</label>
                                        <Input type="text" placeholder="Oliveira Moraes"></Input>
                                    </div>

                                    </div>

                                    <div className="outrosInputs">    
                                        <label>Email</label>


                                    <div>
                                        <Input type="email" placeholder="MarianaOlive077@gmail.com"></Input>
                                    </div>


                                    <div>
                                        <label>Telefone</label>
                                        <Input type="number" placeholder="(11) 9 8765-4321"></Input>
                                    </div>


                                    <div>
                                        <label>Cargo</label>
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
