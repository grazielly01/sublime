import "./fluxocaixadespesa.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { useNavigate } from "react-router-dom";

const IconeSetaSaida = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17 7L7 17M7 17h9M7 17V8"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function FluxoCaixaDespesa() {
  const navigate = useNavigate();

  const despesas = [
    { nome: "Folha salarial", detalhe: "Pagamento de funcionário", valor: "R$ 8.400" },
    { nome: "Farinha e açúcar (lote mensal)", detalhe: "Compra de insumo", valor: "R$ 3.120" },
    { nome: "Energia elétrica industrial", detalhe: "Contas", valor: "R$ 1.950" },
    { nome: "Embalagens personalizadas", detalhe: "Compra de insumo", valor: "R$ 2.760" },
    { nome: "Manutenção de equipamentos industriais", detalhe: "Conserto/manutenção", valor: "R$ 4.300" },
    { nome: "Gás industrial", detalhe: "Contas", valor: "R$ 2.650" },
    { nome: "Fretes e entregas", detalhe: "Fretes/entregas", valor: "R$ 2.100" },
    { nome: "Ingredientes complementares e especiais", detalhe: "Compra de insumo", valor: "R$ 1.780" },
  ];

  return (
    <div className="tudoFluxoCaixaDespesa">
      <Sidebar paginaAtiva="Fluxo de Caixa" />

      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset Indústria B2B" />

        <main className="conteudoFluxoCaixaDespesa">

          {/* TÍTULO COM VOLTAR. APROVADO */}
          <div className="topoFluxoCaixaDespesa">
            <button
              type="button"
              className="botaoVoltarDespesa"
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

            <h1 className="tituloFluxoCaixaDespesa">Maiores despesas</h1>
          </div>

          {/* LISTA */}
          <div className="listaCompletaDespesas">
            {despesas.map((d, i) => (
              <div className="despesa" key={i}>
                <div className="infoDespesaWrapper">
                  <span className="iconeSaida">
                    <IconeSetaSaida />
                  </span>

                  <div className="infoDespesa">
                    <strong>{d.nome}</strong>
                    <p>
                      <span>Saída</span>
                      <span className="separador">·</span>
                      <span>{d.detalhe}</span>
                    </p>
                  </div>
                </div>

                <span className="valorSaida">{d.valor}</span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default FluxoCaixaDespesa;
