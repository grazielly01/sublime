import React, { useState } from "react";
import "./registrarProducao.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { useNavigate } from "react-router-dom";

function RegistrarProducao() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    quantidade: "",
    prazo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ordem de produção registrada:", form);
    navigate("/producao");
  };

  return (
    <div className="tudoRegistrarProducao">
      <Sidebar paginaAtiva="Produção" />

      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset Indústria B2B" />

        <main className="conteudoRegistrarProducao">
          {/* Topo alinhado no canto superior esquerdo */}
          <div className="topoRegistrarProducao">
            <button
              type="button"
              className="botaoVoltarProducao"
              onClick={() => navigate(-1)}
              title="Voltar"
            >
              ←
            </button>
            <h1 className="tituloRegistrarProducao">Registrar nova ordem</h1>
          </div>

          {/* Formulário expandido para a tela */}
          <form className="formRegistrarProducao" onSubmit={handleSubmit}>
            <div className="cardFormProducao">
              {/* Nome do produto */}
              <label className="campoNomeProducao">
                <span>
                  Nome do produto a ser produzido <b>*</b>
                </span>
                <input
                  type="text"
                  name="nome"
                  placeholder="Escreva aqui o nome..."
                  value={form.nome}
                  onChange={handleChange}
                  required
                />
              </label>

              {/* Quantidade e Prazo */}
              <div className="linhaDuplaProducao">
                <label className="campoQuantidadeProducao">
                  <span>
                    Quantidade a ser produzido (unidade) <b>*</b>
                  </span>
                  <input
                    type="text"
                    name="quantidade"
                    placeholder="00"
                    value={form.quantidade}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="campoPrazoProducao">
                  <span>
                    Prazo <b>*</b>
                  </span>
                  <input
                    type="date"
                    name="prazo"
                    value={form.prazo}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
            </div>

            {/* Botões alinhados no canto inferior direito do formulário */}
            <div className="acoesFormProducao">
              <button
                type="button"
                className="botaoCancelar"
                onClick={() => navigate("/producao")}
              >
                Cancelar
              </button>
              <button type="submit" className="botaoRegistrar">
                Registrar
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default RegistrarProducao;