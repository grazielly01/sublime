import { useState } from "react";
import "./fluxocaixaMovimentacao.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { useNavigate } from "react-router-dom";

const IconeSeta = ({ tipo }) =>
  tipo === "entrada" ? (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 7L7 17M7 17h9M7 17V8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

const IconeChevron = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function FluxoCaixaMovimentacao() {
  const navigate = useNavigate();

  const grupos = [
    {
      titulo: "Hoje",
      itens: [
        {
          tipo: "entrada",
          titulo: "Venda — Padaria Estrella",
          data: "03/05",
          itens: "15 Torta de Limão 22cm, 30 Cupcake Red Velvet, 28 Brownie Avelã, 40 Cupcake Morango",
          categoria: "Outros",
          valor: "R$ 2.700",
        },
        {
          tipo: "entrada",
          titulo: "Venda — Sonda Supermercado",
          data: "03/05",
          itens: "15 Bolo Formigueiro, 15 Bolo Chocolate Branco, 15 Bolo Sensação, 15 Bolo Meio Amargo, 15 Ninho",
          categoria: "Venda de produto",
          valor: "R$ 745",
        },
        {
          tipo: "saida",
          titulo: "Compra — Serviço encanador",
          data: "03/05",
          itens: "Conserto sanitário masculino",
          categoria: "Conserto/manutenção",
          valor: "R$ 1.200",
        },
      ],
    },
    {
      titulo: "Ontem",
      itens: [],
    },
    {
      titulo: "01/05",
      itens: [
        {
          tipo: "saida",
          titulo: "Compra — Embalagens Personalizadas",
          data: "01/05",
          itens: "Embalagens Personalizadas",
          categoria: "Compra de insumo",
          valor: "R$ 2.080",
        },
        {
          tipo: "entrada",
          titulo: "Venda — Tia Bete Doces",
          data: "01/05",
          itens: "16 Mousse Maracujá, 10 Pizza Brownie, 10 Copo Felicidade Surpresa de Uva, 15 Vulcão Chocolate",
          categoria: "Venda de produto",
          valor: "R$ 922",
        },
        {
          tipo: "saida",
          titulo: "Compra — Farinha de Trigo 30kg",
          data: "01/05",
          itens: "Farinha de trigo 30kg",
          categoria: "Compra de insumo",
          valor: "R$ 1.052",
        },
        {
          tipo: "entrada",
          titulo: "Venda — Doceria Super Magic",
          data: "01/05",
          itens: "Pedido personalizado",
          categoria: "Venda de produto",
          valor: "R$ 2.700",
        },
      ],
    },
  ];

  const [abertos, setAbertos] = useState({
    Hoje: true,
    Ontem: false,
    "01/05": true,
  });

  const alternarGrupo = (titulo) => {
    setAbertos((prev) => ({ ...prev, [titulo]: !prev[titulo] }));
  };

  return (
    <div className="tudoFluxoCaixaMovimentacao">
      <Sidebar paginaAtiva="Fluxo de Caixa" />

      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset Indústria B2B" />

        <main className="conteudoFluxoCaixaMovimentacao">

          {/* TÍTULO COM VOLTAR */}
          <div className="topoFluxoCaixaMovimentacao">
            <button
              type="button"
              className="botaoVoltarMovimentacao"
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

            <h1 className="tituloFluxoCaixaMovimentacao">Movimentações recentes</h1>
          </div>

          {/* LISTA */}
          <div className="listaCompletaMovimentacoes">
            {grupos.map((grupo) => {
              const aberto = abertos[grupo.titulo];
              return (
                <div className="grupoMovimentacoes" key={grupo.titulo}>
                  <button
                    type="button"
                    className={`cabecalhoGrupo ${aberto ? "" : "fechado"}`}
                    onClick={() => alternarGrupo(grupo.titulo)}
                  >
                    <h2>{grupo.titulo}</h2>
                    <IconeChevron />
                  </button>

                  {aberto && grupo.itens.length > 0 && (
                    <div className="itensGrupo">
                      {grupo.itens.map((item, i) => (
                        <div className="movimentacao" key={i}>
                          <div className="infoMovimentacaoCompleta">
                            <span className={`iconeMovimentacaoCompleta ${item.tipo === "entrada" ? "iconeEntrada" : "iconeSaida"}`}>
                              <IconeSeta tipo={item.tipo} />
                            </span>

                            <div className="textoMovimentacao">
                              <strong>{item.titulo}</strong>
                              <div className="metaMovimentacao">
                                <span className="tagTipo">
                                  {item.tipo === "entrada" ? "Entrada" : "Saída"}
                                </span>
                                <span className="separador">·</span>
                                <span>{item.data}</span>
                                <span className="separador">·</span>
                                <span>{item.itens}</span>
                                <span className="separador">·</span>
                                <span>{item.categoria}</span>
                              </div>
                            </div>
                          </div>

                          <span className={`valorMovimentacaoCompleta ${item.tipo}`}>
                            {item.tipo === "entrada" ? `+ ${item.valor}` : item.valor}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

export default FluxoCaixaMovimentacao;