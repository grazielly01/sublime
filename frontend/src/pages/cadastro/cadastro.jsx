import { useState } from "react";
import "./cadastro.css";
import Input from "../../componentes/Input/Input.jsx";      /*Importando o componente input da pasta componentes*/
import Button from "../../componentes/Button/Button.jsx";   /*Importando o componente button da pasta componentes*/
import Select from "../../componentes/Select/Select.jsx";   /*Importando o componente select da pasta componentes*/

function Cadastro() {

    return (
        <div className="tudoCadastro">

            {/* METADE ESQUERDA: parte bonita: foto de fundo + coisas da marca Sublime*/}
            <div className="metadeBonita">

                {/*topo: logo + palavra "Sublime" bonita + "Indústria B2B"*/}
                <div className="topoMarca">
                    <img src="/img/logo-icone.png" alt="Ícone Sublime" className="iconeMarca" />
                    <div className="textoMarca">
                        <img src="/img/logo-texto.png" alt="Sublime" className="palavraMarca" />
                        <p className="industriaB2B">Indústria B2B</p>
                    </div>
                </div>

                {/*meio: frase de efeito + descrição do sistema*/}
                <div className="meioMarca">
                    <img src="/img/frase-login.png" alt="Sublime - A receita para uma gestão mais doce" className="fraseMarca"/>

                    <p className="descricaoMarca">
                        Gestão completa para indústrias de confeitaria: estoque de insumos, receitas, produção, pedidos B2B e financeiro: integrados em tempo real.
                    </p>
                </div>

                {/*rodapé: direitos autorais*/}
                <p className="direitosAutorais">© 2026 Sublime</p>

            </div>

            {/* METADE DIREITA: parte de cadastro */}
            <div className="metadePratica">

                <div className="conteudoPratico"> {/*essa div é so pra encaixar tudo dentro e definir a largura do formulário*/}

                    <h1 className="tituloCadastro">Cadastre-se</h1>

                    {/*campo de nome*/}
                    <div className="campoCadastro">
                        <label className="labelCampo">Nome completo:</label>

                        <div className="inputComIcone">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#870B22" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round">
                                <circle cx="12" cy="8" r="5"/>
                                <path d="M20 21a8 8 0 0 0-16 0"/>
                            </svg>

                            <Input id="inputNome" placeholder="Digite seu nome completo" type="text" value={nome} onChange={(e) => setNome(e.target.value)}/> 
                        </div>
                    </div>

                    <div className="espacoEntreInputs"></div>

                    {/*campo de telefone*/}
                    <div className="campoCadastro">
                        <label className="labelCampo">Telefone:</label>

                        <div className="inputComIcone">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#870B22" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone">
                                <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>
                            </svg>

                            <Input id="inputTelefone" placeholder="(DDD) 9 0000-0000" type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)}/>
                        </div>
                    </div>

                    <div className="espacoEntreInputs"></div>

                    {/*campo de e-mail*/}
                    <div className="campoCadastro">
                        <label className="labelCampo">E-mail:</label>

                        <div className="inputComIcone">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>

                            <Input id="inputEmail" placeholder="Digite seu e-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>

                    <div className="espacoEntreInputs"></div>

                    {/*campo de selecionar cargo*/}
                    <div className="campoCadastro">
                        <label className="labelCampo">Selecione seu cargo:</label>
                        <Select 
                            id="selectCargo" 
                            options={[
                                "Gerente/sub-gerente",
                                "Gerente de produção",
                                "Gerente de estoque",
                                "Gerente comercial"
                            ]}
                            value={cargo} 
                            onChange={(e) => setCargo(e.target.value)}
                        />
                    </div>

                    <div className="espacoEntreInputs"></div>

                    {/*botão de cadastrar chamando a requisição*/}
                    <div className="botaoCadastrar">
                        <Button texto="Cadastrar" onClick={cadastrarUsuario} />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Cadastro;