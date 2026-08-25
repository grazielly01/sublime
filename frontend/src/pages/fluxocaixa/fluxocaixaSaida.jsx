import { useState } from "react";
import "./fluxocaixaSaida.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { useNavigate } from "react-router-dom";

function FluxoCaixaSaida() {
  const navigate = useNavigate();
  const [nomeArquivo, setNomeArquivo] = useState("");

  const handleArquivo = (e) => {
    const arquivo = e.target.files?.[0];
    setNomeArquivo(arquivo ? arquivo.name : "");
  };

  return (
    <div className="tudoFluxoCaixaSaida">
      <Sidebar paginaAtiva="Fluxo de Caixa" />

      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset Indústria B2B" />

        <main className="conteudoFluxoCaixaSaida">

          {/* TÍTULO COM VOLTAR. APROVANDO */}
          <div className="topoFluxoCaixaSaida">
            <button
              type="button"
              className="botaoVoltarSaida"
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

            <h1 className="tituloFluxoCaixaSaida">Detalhes da saída</h1>
          </div>

          {/* CARD DE DETALHES */}
          <div className="detalhesSaida">

            {/* Linha 1: Título / Data / Categoria / Valor */}
            <div className="linhaSaida colunas4">
              <label>
                Título da saída
                <input type="text" value="Compra - serviço encanador" readOnly />
              </label>

              <label className="campoData">
                Data da saída
                <div className="wrapperInput">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M3 9h18" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  <input type="text" value="03/05/2026" readOnly />
                </div>
              </label>

              <label>
                Categoria
                <input type="text" value="Conserto/manutenção" readOnly />
              </label>

              <label className="campoValor">
                Valor
                <div className="wrapperInput">
                  <span className="prefixoValor">R$</span>
                  <input type="text" value="1.200,00" readOnly />
                </div>
              </label>
            </div>

            {/* Linha 2: Descrição / Fixa ou variável */}
            <div className="linhaSaida colunas2">
              <label>
                Descrição
                <input type="text" value="Conserto sanitário masculino" readOnly />
              </label>

              <label>
                Fixa ou variável
                <input type="text" value="Variável" readOnly />
              </label>
            </div>

            {/* Anexar comprovante */}
            <label>
              Anexar comprovante (opcional)
              <label className="areaUpload" htmlFor="comprovanteSaida">
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
                  id="comprovanteSaida"
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
              <textarea defaultValue="do seu Zé (o melhor)" readOnly />
            </label>

          </div>

          {/* Ações */}
         <div className="acoesSaida">
  <button
    type="button"
    className="botaoExcluir"
    onClick={() => navigate("/fluxocaixaexcluir1")}
  >
    Excluir
  </button>
  <button type="button" className="botaoEditar">Editar</button>
  <button
    type="button"
    className="botaoVoltar"
    onClick={() => navigate("/fluxocaixa")}
  >
    Voltar
  </button>
</div>

        </main>
      </div>
    </div>
  );
}

export default FluxoCaixaSaida;
