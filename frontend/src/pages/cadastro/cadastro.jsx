import { useState } from "react";
import "./cadastro.css";
import Input from "../../componentes/Input/Input.jsx";      /*Importando o componente input da pasta componentes*/
import Button from "../../componentes/Button/Button.jsx";   /*Importando o componente button da pasta componentes*/
import Select from "../../componentes/Select/Select.jsx";   /*Importando o componente select da pasta componentes*/


function Cadastro() {
    return (  /*já vai pro return pq nao precisa de nenhuma variavel ou nenhuma outra função ou nenhuma lógica por trás, só tem HTML (bagulhos visuais)*/
        <div className="tudoCadastro">

            {/* METADE ESQUERDA: parte bonita: foto de fundo + coisas da marca Sublime*/}
            <div className="metadeBonita">

                {/*topo: logo + palavra "Sublime" bonita + "Indústria B2B"*/}
                <div className="topoMarca">
                    <img src="/img/logo-icone.png" alt="Ícone Sublime" className="iconeMarca" /> {/*Pega a logo na pasta img em public*/}
                    <div className="textoMarca">
                        <img src="/img/logo-texto.png" alt="Sublime" className="palavraMarca" />  {/*Pega o nome Sublime bonito na pasta img em public*/}
                        <p className="industriaB2B">Indústria B2B</p>
                    </div>
                </div>

                {/*meio: frase de efeito + descrição do sistema*/}
                <div className="meioMarca">
                    <img src="/img/frase-login.png" alt="Sublime - A receita para uma gestão mais doce" className="fraseMarca"/> {/*Pega a frase bonita na pasta img em public*/}

                    <p className="descricaoMarca">
                        Gestão completa para indústrias de confeitaria: estoque de insumos, receitas, produção, pedidos B2B e financeiro: integrados em tempo real.
                    </p>
                </div>

                {/*rodapé: direitos autorais*/}
                <p className="direitosAutorais">© 2026 Sublime</p>

            </div>

            {/* METADE DIREITA: parte de fzer login */}
            <div className="metadePratica">

                <div className="conteudoPratico"> {/*essa div é so pra encaixar tudo dentro e definir a largura do formulário*/}

                    <h1 className="tituloCadastro">Cadastre-se</h1>

                    {/*campo de nome*/}
                    <div className="campoCadastro">
                        <label className="labelCampo">Nome completo:</label>

                        <div className="inputComIcone"> {/*essa div "embrulha" o Input pra dar pra por o ícone dentro dele*/}

                            {/*ícone copiado do site do lucide-react*/}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#870B22" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-icon lucide-user-round">
                                <circle cx="12" cy="8" r="5"/>
                                <path d="M20 21a8 8 0 0 0-16 0"/>
                            </svg>

                            <Input id="inputNome" placeholder="Digite seu nome completo" type="text"/>

                        </div>
                    </div>

                    <div className="espacoEntreInputs"></div>

                    {/*campo de telefone*/}
                    <div className="campoCadastro">
                        <label className="labelCampo">Telefone:</label>

                        <div className="inputComIcone"> {/*essa div "embrulha" o Input pra dar pra por o ícone dentro dele*/}

                            {/*ícone copiado do site do lucide-react*/}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#870B22" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone-icon lucide-phone">
                                <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>
                            </svg>

                            <Input id="inputTelefone" placeholder="(DDD) 9 0000-0000" type="text"/>
                        </div>
                    </div>

                    <div className="espacoEntreInputs"></div>

                    {/*campo de e-mail*/}
                    <div className="campoCadastro">
                        <label className="labelCampo">E-mail:</label>

                        <div className="inputComIcone"> {/*essa div "embrulha" o Input pra dar pra por o ícone dentro dele*/}

                            {/*ícone copiado do site do lucide-react*/}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>

                            <Input id="inputEmail" placeholder="Digite seu e-mail" type="email" />
                        </div>
                    </div>
                    
                    <div className="espacoEntreInputs"></div>

                    {/*campo do nome da fábrica ou empresa*/}
                    <div className="campoCadastro">
                        <label className="labelCampo">Nome da fábrica ou empresa:</label>

                        <div className="inputComIcone"> {/*essa div "embrulha" o Input pra dar pra por o ícone dentro dele*/}

                            {/*ícone copiado do site do lucide-react*/}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#870B22" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-factory-icon lucide-factory">
                                <path d="M12 16h.01"/>
                                <path d="M16 16h.01"/>
                                <path d="M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"/>
                                <path d="M8 16h.01"/>
                            </svg>

                            <Input id="inputNomeFabrica" placeholder="Digite o nome da fábrica ou empresa" type="email" />
                        </div>
                    </div>

                    <div className="espacoEntreInputs"></div>

                    {/*campo de selecionar cargo*/}
                    <div className="campoCadastro">
                    <label className="labelCampo">Selecione seu cargo:</label>
                        <Select id="selectCargo" options={[
                            "Gerente/sub-gerente",
                            "Gerente de produção",
                            "Gerente de estoque",
                            "Gerente comercial"
                        ]} />
                    </div>

                    <div className="espacoEntreInputs"></div>

                    {/*campo de senha*/}
                    <div className="campoCadastro">
                        <div className="linhaLabelSenha">
                            <label className="labelCampo">Senha:</label>
                        </div>

                        <div className="inputComIcone">
                            {/*ícone copiado do site do lucide react*/}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>

                            <Input id="inputSenha" placeholder="Digite sua senha" type="password" />
                        </div>
                    </div>

                    <div className="espacoEntreInputs"></div>

                    {/*campo de confirmar senha*/}
                    <div className="campoCadastro">
                        <div className="linhaLabelSenha">
                            <label className="labelCampo">Confirmar senha:</label>
                        </div>

                        <div className="inputComIcone">
                            {/*ícone copiado do site do lucide react*/}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>

                            <Input id="inputSenha" placeholder="Digite sua senha novamente" type="password" />
                        </div>
                    </div>

                    <div className="espacoEntreInputs"></div>

                    {/*botão de entrar, ainda sem onClick, sem backend/login de verdade ainda*/}
                    <div className="botaoCadastrar"><Button texto="Cadastrar" /></div>


                </div>
            </div>
        </div>
    );
}

export default Cadastro;