import "./minhaConta.css";
import { useState } from "react";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";  /*Importando o componente sidebar da pasta componentes; APROVADO*/
import Header from "../../componentes/Header/Header.jsx";  /*Importando o componente header da pasta componentes. */
import Input from "../../componentes/Input/Input.jsx";      /*Importando o componente input da pasta componentes*/
import Button from "../../componentes/Button/Button.jsx";   /*Importando o componente button da pasta componentes*/
import { motion } from "motion/react";

function MinhaConta() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cargo, setCargo] = useState("");

    // Função de salvar alterada para PUT/PATCH e disparada no clique
    const salvarUsuario = async () => {
        try {
            // Substitua '1' pelo ID dinâmico do usuário logado se houver
            const resposta = await fetch("http://localhost:3000/usuarios", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome,
                    email,
                    telefone,
                    cargo
                })
            });

            const dados = await resposta.json();
            console.log("Dados atualizados com sucesso:", dados);
            alert("Informações salvas com sucesso!");
        } catch (error) {
            console.error("ERRO AO SALVAR USUÁRIO.", error);
        }
    };

    return (
        <div className="tudoMinhaConta">
            <Sidebar paginaAtiva="Minha conta" />

            <div className="tudoMenosSidebar tudoMenosSidebarMinhaConta">
                <Header nomeIndustria="Sweet Sunset" />

                <div className="conteudoMinhaConta conteudoMinhaConta2">
                    <h1 className="tituloMinhaConta">Minha conta</h1>
                    <p className="subtituloMinhaConta">Suas informações pessoais</p>

                    <div className="duasAbas">
                        <div className="abaEsquerda">
                            <div className="infosAbaEsquerda">
                                <div className="fotinhaENome">
                                    <div className="iconUser">
                                        <img src="../img/icon-user.png" alt="user" />
                                    </div>
                                    <h3>{nome || "Mariana Oliveira"}</h3>
                                    <p>{cargo || "Gerente"}</p>
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
                                        <Input 
                                            type="text" 
                                            placeholder="Mariana Oliveira Moraes" 
                                            value={nome} 
                                            onChange={(e) => setNome(e.target.value)} 
                                        />
                                    </div>

                                    <div>
                                        <label className="labelsInputs">Email</label>
                                        <Input 
                                            type="email" 
                                            placeholder="MarianaOlive077@gmail.com" 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)} 
                                        />
                                    </div>

                                    <div>
                                        <label className="labelsInputs">Telefone</label>
                                        <Input 
                                            type="text" 
                                            placeholder="(11) 9 8765-4321" 
                                            value={telefone} 
                                            onChange={(e) => setTelefone(e.target.value)} 
                                        />
                                    </div>

                                    <div>
                                        <label className="labelsInputs">Cargo</label>
                                        <Input 
                                            type="text" 
                                            placeholder="Gerente" 
                                            value={cargo} 
                                            onChange={(e) => setCargo(e.target.value)} 
                                        />
                                    </div>
                                </div>

                                <div className="botoesDadosPessoais">
                                    {/* Adicionado o onClick apontando para a função salvarUsuario */}
                                    <Button texto="Salvar" onClick={salvarUsuario} />
                                    <Button id="buttonAlterarSenha" type="button" texto="Alterar senha" />
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
