import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./esqueciSenha.css";
import Input from "../../componentes/Input/Input.jsx";
import Button from "../../componentes/Button/Button.jsx";

function EsqueciSenha() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    const emailLimpo = email.trim();
    if (!emailLimpo || !emailLimpo.includes("@")) {
      setErro("Digite um endereço de e-mail válido para receber o link de recuperação.");
      return;
    }

    setErro("");
    setEnviado(true);
  };

  return (
    <div className="tudoEsqueciSenha">
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

      {/* METADE DIREITA: recuperação de senha */}
      <div className="metadePratica">
        <div className="conteudoPratico">
          <button
            type="button"
            className="botaoVoltarLogin"
            onClick={() => navigate("/login")}
          >
            ← Voltar para o login
          </button>

          <h1 className="tituloEsqueciSenha">Esqueci minha senha</h1>
          <p className="subtituloEsqueciSenha">
            Informe o e-mail da sua conta e enviaremos as instruções para redefinir sua senha com segurança.
          </p>

          {!enviado ? (
            <form className="formEsqueciSenha" onSubmit={handleSubmit}>
              {erro && <p className="mensagemErroEsqueci">{erro}</p>}

              <div className="campoEsqueciSenha">
                <label htmlFor="inputEmailRecuperacao" className="labelCampo">
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

                  <Input
                    id="inputEmailRecuperacao"
                    placeholder="Digite seu e-mail cadastrado"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (erro) setErro("");
                    }}
                  />
                </div>
              </div>

              <div className="botaoEnviarLink">
                <Button texto="Enviar instruções" type="submit" onClick={handleSubmit} />
              </div>
            </form>
          ) : (
            <div className="cardConfirmacaoEnvio" role="status" aria-live="polite">
              <div className="iconeSucessoEnvio" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 6 9 17l-5-5"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h2 className="tituloConfirmacaoEnvio">E-mail enviado!</h2>
              <p className="textoConfirmacaoEnvio">
                Enviamos um link de redefinição para <strong>{email.trim()}</strong>. Verifique também sua caixa de spam.
              </p>

              <div className="acoesConfirmacaoEnvio">
                <button
                  type="button"
                  className="botaoReenviarEmail"
                  onClick={() => setEnviado(false)}
                >
                  Usar outro e-mail
                </button>
                <button
                  type="button"
                  className="botaoIrLogin"
                  onClick={() => navigate("/login")}
                >
                  Voltar ao login
                </button>
              </div>
            </div>
          )}

          <p className="lembrouSenha">
            Lembrou sua senha?{" "}
            <span
              role="button"
              tabIndex={0}
              className="linkVoltarLogin"
              onClick={() => navigate("/login")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate("/login");
                }
              }}
            >
              Entrar agora
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default EsqueciSenha;