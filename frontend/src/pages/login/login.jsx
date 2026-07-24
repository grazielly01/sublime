import "./login.css";
import Input from "../../componentes/Input/Input.jsx";      /*Importando o componente input da pasta componentes*/
import Button from "../../componentes/Button/Button.jsx";   /*Importando o componente button da pasta componentes*/

function Login() {
    return (  /*já vai pro return pq nao precisa de nenhuma variavel ou nenhuma outra função ou nenhuma lógica por trás, só tem HTML (bagulhos visuais)*/
        <div className="tudoLogin">

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

                    <h1 className="tituloLogin">Login</h1>

                    {/*campo de e-mail*/}
                    <div className="campoLogin">
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

                    {/*campo de senha*/}
                    <div className="campoLogin">
                        <div className="linhaLabelSenha"> {/*"Senha:" e "Esqueci minha senha" ficam na mesma linha*/}
                            <label className="labelCampo">Senha:</label>
                            <span className="linkEsqueciSenha">Esqueci minha senha</span>
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

                    {/*botão de entrar, ainda sem onClick, sem backend/login de verdade ainda*/}
                    <div className="botaoEntrar"><Button texto="Entrar" /></div>

                    {/*link de cadastro*/}
                    <p className="primeiroAcesso">Primeiro acesso? 
                        <span className="linkCadastro">Cadastre-se</span>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Login;