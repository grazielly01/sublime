import { useState } from "react";
import "./fluxocaixaRegistrar.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { useNavigate } from "react-router-dom";

function FluxoCaixaRegistrar() {
  const navigate = useNavigate();
  const [nomeArquivo, setNomeArquivo] = useState("");

  const handleArquivo = (e) => {
    const arquivo = e.target.files?.[0];
    setNomeArquivo(arquivo ? arquivo.name : "");
  };

  return (
    <div className="tudoFluxoCaixaRegistrar">
      <Sidebar paginaAtiva="Fluxo de Caixa" />

      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset Indústria B2B" />

        <main className="conteudoFluxoCaixaRegistrar">

          {/* TÍTULO COM VOLTAR */}
          <div className="topoFluxoCaixaRegistrar">
            <button
              type="button"
              className="botaoVoltarRegistrar"
              onClick={() => navigate("/fluxocaixa")}
              aria-label="Voltar"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <h1 className="tituloFluxoCaixaRegistrar">Registrar nova saída</h1>
          </div>

          {/* FORMULÁRIO */}
          <form className="formFluxoCaixaRegistrar">

            {/* Linha 1: Título / Data / Categoria / Valor */}
            <div className="linhaFormRegistrar colunas4">
              <label>
                Título da saída<span className="obrigatorio">*</span>
                <input type="text" placeholder="Escreva aqui o título..." required />
              </label>

              <label className="campoData">
                Data da saída<span className="obrigatorio">*</span>
                <div className="wrapperInput">
                 <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
                 <path d="M3 9h18" stroke="currentColor" strokeWidth="1.6" />
                 <path d="M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                         </svg>
                 <input type="date" required />
                                  </div>
                    </label>

              <label>
                Categoria<span className="obrigatorio">*</span>
                <select defaultValue="">
                  <option value="" disabled>Selecione uma categoria</option>
                  <option value="insumos">Insumos</option>
                  <option value="folha">Folha de pagamento</option>
                  <option value="custo-fixo">Custo fixo</option>
                  <option value="manutencao">Manutenção</option>
                  <option value="outros">Outros</option>
                </select>
              </label>

            <label className="campoValor">
                Valor<span className="obrigatorio">*</span>
                <div className="wrapperInput">
                <span className="prefixoValor">R$</span>
                     <input type="text" placeholder="0,0" required />
                             </div>
                                </label>
            </div>

            {/* Linha 2: Descrição / Fixa ou variável */}
            <div className="linhaFormRegistrar colunas2">
              <label>
                Descrição<span className="obrigatorio">*</span>
                <input type="text" placeholder="Escreva aqui a descrição..." required />
              </label>

              <label>
                Fixa ou variável<span className="obrigatorio">*</span>
                <select defaultValue="">
                  <option value="" disabled>Selecione</option>
                  <option value="fixa">Fixa</option>
                  <option value="variavel">Variável</option>
                </select>
              </label>
            </div>

            {/* Anexar comprovante */}
            <label>
              Anexar comprovante (opcional)
              <label className="areaUpload" htmlFor="comprovante">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 16V4M12 4l-4 4M12 4l4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Clique aqui para anexar ou arraste o arquivo aqui</span>
                <span>PDF, JPG, JPEG ou PNG (máx. 10MB)</span>
                <input
                  id="comprovante"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleArquivo}
                />
              </label>
              {nomeArquivo && (
                <span className="nomeArquivo">Arquivo selecionado: {nomeArquivo}</span>
              )}
            </label>

            {/* Observações */}
            <label>
              Observações (opcional)
              <textarea placeholder="Informações adicionais sobre esta saída..." />
            </label>

            {/* Ações */}
            <div className="acoesFluxoCaixaRegistrar">
              <button
                type="button"
                className="botaoCancelar"
                onClick={() => navigate("/fluxocaixa")}
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

export default FluxoCaixaRegistrar;