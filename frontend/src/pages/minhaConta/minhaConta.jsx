import "./minhaConta.css";
import { useState, useEffect } from "react";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import Input from "../../componentes/Input/Input.jsx";
import Button from "../../componentes/Button/Button.jsx";
import { motion } from "motion/react";

const STORAGE_FOTO_KEY = "sweet_sunset_minha_conta_foto";

const IconeBonecoBranco = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="8.2" r="3.8" fill="#FFFFFF" />
        <path
            d="M5 19.6C5 16.5 8.13 14.2 12 14.2C15.87 14.2 19 16.5 19 19.6"
            fill="#FFFFFF"
        />
    </svg>
);

function MinhaConta() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cargo, setCargo] = useState("");
    const [fotoUrl, setFotoUrl] = useState("");
    const [fotoBase64, setFotoBase64] = useState("");

    useEffect(() => {
        const fotoSalva = localStorage.getItem(STORAGE_FOTO_KEY);
        if (fotoSalva) {
            setFotoUrl(fotoSalva);
            setFotoBase64(fotoSalva);
        }
    }, []);

    const handleTrocarFoto = (e) => {
        const arquivo = e.target.files?.[0];
        if (!arquivo) return;

        if (!arquivo.type.startsWith("image/")) {
            alert("Selecione uma imagem válida (JPG, JPEG ou PNG).");
            return;
        }

        const leitor = new FileReader();
        leitor.onload = () => {
            const resultado = leitor.result;
            if (typeof resultado === "string") {
                setFotoUrl(resultado);
                setFotoBase64(resultado);
                try {
                    localStorage.setItem(STORAGE_FOTO_KEY, resultado);
                } catch {
                    // Mantém na sessão caso exceda o limite do localStorage
                }
            }
        };
        leitor.readAsDataURL(arquivo);
        e.target.value = "";
    };

    const salvarUsuario = async () => {
        try {
            const resposta = await fetch("http://localhost:3000/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome,
                    email,
                    telefone,
                    cargo,
                    foto: fotoBase64 || null
                })
            });

            const dados = await resposta.json();
            console.log("Dados atualizados com sucesso:", dados);
            alert("Informações salvas com sucesso!");
        } catch (error) {
            console.error("ERRO AO SALVAR USUÁRIO.", error);
            alert("Não foi possível conectar ao servidor local, mas sua foto e dados na tela foram mantidos.");
        }
    };

    return (
        <div className="tudoMinhaConta">
            <Sidebar paginaAtiva="Minha conta" />

            <div className="tudoMenosSidebar tudoMenosSidebarMinhaConta">
                <Header nomeIndustria="Sweet Sunset" />

                <div className="conteudoMinhaConta conteudoMinhaConta2">
                    <div className="cabecalhoMinhaConta">
                        <h1 className="tituloMinhaConta">Minha conta</h1>
                        <p className="subtituloMinhaConta">Suas informações pessoais</p>
                    </div>

                    <div className="duasAbas">
                        <div className="abaEsquerda">
                            <div className="infosAbaEsquerda">
                                <div className="fotinhaENome">
                                    <div className="iconUser">
                                        {fotoUrl ? (
                                            <img
                                                src={fotoUrl}
                                                alt="Foto de perfil do usuário"
                                                className="fotoUsuarioReal"
                                            />
                                        ) : (
                                            <div className="avatarPadraoCirculo">
                                                <IconeBonecoBranco />
                                            </div>
                                        )}
                                    </div>
                                    <h3>{nome || "Mariana Oliveira"}</h3>
                                    <p>{cargo || "Gerente"}</p>
                                </div>

                                <div className="tarjaPlano">
                                    <h2>Sweet Sunset Indústria</h2>
                                    <p>Plano ERP Pro: Ativo</p>
                                </div>

                                <div className="alterarFoto">
                                    <input
                                        className="inputAlterarFoto"
                                        type="file"
                                        id="uploadImagemMinhaConta"
                                        accept="image/png,image/jpeg,image/jpg,image/webp"
                                        onChange={handleTrocarFoto}
                                    />
                                    <label htmlFor="uploadImagemMinhaConta" className="botaoAlterarFoto">
                                        Alterar foto
                                    </label>
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