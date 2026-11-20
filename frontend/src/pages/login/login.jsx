import "./login.css";
import Input from "../../componentes/Input/Input.jsx";
import Button from "../../componentes/Button/Button.jsx";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/visaogeral");
  };

  return (
    <div className="tudoLogin">
      {/* METADE ESQUERDA: apresentação da marca Sublime */}
      <div className="metadeBonita">
        <div className="topoMarca">
          <img src="/img/logo-icone.png" alt="Ícone Sublime" className="iconeMarca" />
          <div className="textoMarca">
            <img src="/img/logo-texto.png" alt="Sublime" className="palavraMarca" />
            <p className="industriaB2B">Indústria B2B</p>
          </div>
        </div>

        <div className="meioMarca">
          <img
            src="/img/frase-login.png"
            alt="Sublime - A receita para uma gestão mais doce"
            className="fraseMarca"
          />
          <p className="descricaoMarca">
            Gestão completa para indústrias de confeitaria: estoque de insumos, receitas, produção, pedidos B2B e financeiro: integrados em tempo real.
          </p>
        </div>

        <p className="direitosAutorais">© 2026 Sublime</p>
      </div>

      {/* METADE DIREITA: formulário de login */}
      <div className="metadePratica">
        <div className="conteudoPratico">
          <h1 className="tituloLogin">Login</h1>

          <form className="formLogin" onSubmit={handleLogin}>
            <div className="campoLogin">
              <label htmlFor="inputEmail" className="labelCampo">
                E-mail:
              </label>

              <div className="inputComIcone">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>

                <Input id="inputEmail" placeholder="Digite seu e-mail" type="email" />
              </div>
            </div>

            <div className="campoLogin">
              <label htmlFor="inputSenha" className="labelCampo">
                Senha:
              </label>

              <div className="inputComIcone">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>

                <Input id="inputSenha" placeholder="Digite sua senha" type="password" />
              </div>

              <div className="linhaAbaixoSenha">
                <span
                  role="button"
                  tabIndex={0}
                  className="linkEsqueciSenha"
                  onClick={() => navigate("/esqueci-senha")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      navigate("/esqueci-senha");
                    }
                  }}
                >
                  Esqueci minha senha
                </span>
              </div>
            </div>

            <div className="botaoEntrar">
              <Button texto="Entrar" type="submit" onClick={handleLogin} />
            </div>

            <p className="primeiroAcesso">
              Primeiro acesso?{" "}
              <span
                role="button"
                tabIndex={0}
                className="linkCadastro"
                onClick={() => navigate("/cadastro")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate("/cadastro");
                  }
                }}
              >
                Cadastre-se
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;