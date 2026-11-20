import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cadastro.css";
import Input from "../../componentes/Input/Input.jsx";
import Button from "../../componentes/Button/Button.jsx";
import Select from "../../componentes/Select/Select.jsx";

function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [erro, setErro] = useState("");

  const cadastrarUsuario = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!nome.trim() || !telefone.trim() || !email.trim() || !cargo) {
      setErro("Preencha todos os campos para concluir o cadastro.");
      return;
    }

    setErro("");
    navigate("/login");
  };

  return (
    <div className="tudoCadastro">
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

      {/* METADE DIREITA: formulário de cadastro */}
      <div className="metadePratica">
        <div className="conteudoPratico">
          <h1 className="tituloCadastro">Cadastre-se</h1>

          <form className="formCadastro" onSubmit={cadastrarUsuario}>
            {erro && <p className="mensagemErroCadastro">{erro}</p>}

            {/* Campo de nome */}
            <div className="campoCadastro">
              <label htmlFor="inputNome" className="labelCampo">
                Nome completo:
              </label>

              <div className="inputComIcone">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#870B22"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="8" r="5" />
                  <path d="M20 21a8 8 0 0 0-16 0" />
                </svg>

                <Input
                  id="inputNome"
                  placeholder="Digite seu nome completo"
                  type="text"
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value);
                    if (erro) setErro("");
                  }}
                />
              </div>
            </div>

            {/* Campo de telefone */}
            <div className="campoCadastro">
              <label htmlFor="inputTelefone" className="labelCampo">
                Telefone:
              </label>

              <div className="inputComIcone">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#870B22"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                </svg>

                <Input
                  id="inputTelefone"
                  placeholder="(DDD) 9 0000-0000"
                  type="text"
                  value={telefone}
                  onChange={(e) => {
                    setTelefone(e.target.value);
                    if (erro) setErro("");
                  }}
                />
              </div>
            </div>

            {/* Campo de e-mail */}
            <div className="campoCadastro">
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

                <Input
                  id="inputEmail"
                  placeholder="Digite seu e-mail"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (erro) setErro("");
                  }}
                />
              </div>
            </div>

            {/* Campo de selecionar cargo */}
            <div className="campoCadastro">
              <label htmlFor="selectCargo" className="labelCampo">
                Selecione seu cargo:
              </label>
              <Select
                id="selectCargo"
                options={[
                  "Gerente/sub-gerente",
                  "Gerente de produção",
                  "Gerente de estoque",
                  "Gerente comercial",
                ]}
                value={cargo}
                onChange={(e) => {
                  setCargo(e.target.value);
                  if (erro) setErro("");
                }}
              />
            </div>

            {/* Botão de cadastrar */}
            <div className="botaoCadastrar">
              <Button texto="Cadastrar" type="submit" onClick={cadastrarUsuario} />
            </div>

            <p className="jaTemConta">
              Já possui conta?{" "}
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
                Faça login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;