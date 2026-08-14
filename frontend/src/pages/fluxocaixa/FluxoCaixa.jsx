import "./fluxocaixa.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";

function FluxoCaixa() {
  const movimentos = [
    {
      tipo: "entrada",
      descricao: "Venda – Padaria São José",
      valor: "R$ 2.760",
    },
    {
      tipo: "saida",
      descricao: "Compra – Chocolate Callebaut 10kg",
      valor: "R$ 1.240",
    },
    {
      tipo: "saida",
      descricao: "Compra – Farinha de trigo 25kg",
      valor: "R$ 615",
    },
    {
      tipo: "entrada",
      descricao: "Venda – Vila Bela Bolos",
      valor: "R$ 1.840",
    },
    {
      tipo: "saida",
      descricao: "Compra – Chocolate Callebaut 5kg",
      valor: "R$ 625",
    },
  ];

  const maioresDespesas = [
    { nome: "Folha de salários", valor: "R$ 4.500" },
    { nome: "Matéria-prima", valor: "R$ 3.120" },
    { nome: "Energia elétrica", valor: "R$ 1.950" },
    { nome: "Embalagens personalizadas", valor: "R$ 1.250" },
    { nome: "Manutenção de equipamentos", valor: "R$ 850" },
  ];

  const despesasFixas = [
    ["Aluguel", "R$ 3.500,00"],
    ["Salários", "R$ 5.000,00"],
    ["Internet", "R$ 200,00"],
    ["Sistema/assinaturas", "R$ 300,00"],
    ["Energia base", "R$ 800,00"],
    ["Manutenção", "R$ 300,00"],
  ];

  const despesasVariaveis = [
    ["Matéria-prima", "R$ 3.500,00"],
    ["Embalagens", "R$ 5.000,00"],
    ["Fretes", "R$ 200,00"],
    ["Taxas de entrega", "R$ 300,00"],
    ["Horas extras", "R$ 800,00"],
    ["Produção extra", "R$ 300,00"],
  ];

  return (
    <div className="tudoFluxoCaixa">
      <Sidebar paginaAtiva="Fluxo de caixa" />

      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset" />

        <main className="conteudoFluxoCaixa">

          {/* CABEÇALHO */}
          <div className="topoFluxoCaixa">
            <h1 className="tituloFluxoCaixa">Fluxo de caixa</h1>

            <p className="subtituloFluxoCaixa">
              Entradas, saídas e saldo consolidado de setembro/2026.
            </p>
          </div>

          {/* CARDS SUPERIORES */}
          <section className="resumoFluxo">

            <div className="cardFluxo">
              <span className="labelFluxo">
                Entradas Totais
              </span>

              <strong className="valorFluxo">
                R$ 52.430,00
              </strong>
            </div>

            <div className="cardFluxo">
              <span className="labelFluxo">
                Despesas Totais
              </span>

              <strong className="valorFluxo">
                R$ 18.220,00
              </strong>
            </div>

            <div className="cardFluxo">
              <span className="labelFluxo">
                Lucro Líquido
              </span>

              <strong className="valorFluxo">
                R$ 34.210,00
              </strong>
            </div>

            <div className="cardFluxo cardSaldoFinal">
              <span className="labelFluxo">
                Margem de Lucro
              </span>

              <strong className="valorFluxo">
                65,2%
              </strong>
            </div>

          </section>

          {/* GRÁFICO DE BARRAS */}
          <section className="cardGraficoFluxo">

            <div className="cabecalhoCardFluxo">
              <h2>Fluxo de Caixa (Mês)</h2>

              <div className="legendaGrafico">
                <span>
                  <i className="legendaEntrada"></i>
                  Entradas
                </span>

                <span>
                  <i className="legendaSaida"></i>
                  Saídas
                </span>
              </div>
            </div>

            <div className="graficoBarras">

              <div className="eixoY">
                <span>60k</span>
                <span>40k</span>
                <span>20k</span>
                <span>0</span>
              </div>

              <div className="areaBarras">

                <div className="linhaGrafico linha60"></div>
                <div className="linhaGrafico linha40"></div>
                <div className="linhaGrafico linha20"></div>
                <div className="linhaGrafico linha0"></div>

                <div className="grupoBarras">
                  <div className="parBarras">
                    <div className="barra entrada" style={{ height: "68%" }}></div>
                    <div className="barra saida" style={{ height: "46%" }}></div>
                  </div>
                  <span>07/09</span>
                </div>

                <div className="grupoBarras">
                  <div className="parBarras">
                    <div className="barra entrada" style={{ height: "76%" }}></div>
                    <div className="barra saida" style={{ height: "43%" }}></div>
                  </div>
                  <span>08/09</span>
                </div>

                <div className="grupoBarras">
                  <div className="parBarras">
                    <div className="barra entrada" style={{ height: "64%" }}></div>
                    <div className="barra saida" style={{ height: "39%" }}></div>
                  </div>
                  <span>15/09</span>
                </div>

                <div className="grupoBarras">
                  <div className="parBarras">
                    <div className="barra entrada" style={{ height: "70%" }}></div>
                    <div className="barra saida" style={{ height: "44%" }}></div>
                  </div>
                  <span>22/09</span>
                </div>

                <div className="grupoBarras">
                  <div className="parBarras">
                    <div className="barra entrada" style={{ height: "82%" }}></div>
                    <div className="barra saida" style={{ height: "45%" }}></div>
                  </div>
                  <span>29/09</span>
                </div>

              </div>
            </div>

          </section>

          {/* EVOLUÇÃO DO SALDO */}
          <section className="cardGraficoFluxo">

            <div className="cabecalhoCardFluxo">
              <h2>Evolução do saldo</h2>
            </div>

            <div className="graficoLinha">

              <div className="linhasLinha">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="eixoLinhaY">
                <span>32k</span>
                <span>24k</span>
                <span>16k</span>
                <span>8k</span>
                <span>0</span>
              </div>

              <svg
                className="svgLinha"
                viewBox="0 0 1000 250"
                preserveAspectRatio="none"
              >
                <polyline
                  points="20,205 190,180 360,185 530,145 700,125 850,88 980,52"
                  fill="none"
                  stroke="#9d0926"
                  strokeWidth="3"
                />

                <circle cx="20" cy="205" r="5" />
                <circle cx="190" cy="180" r="5" />
                <circle cx="360" cy="185" r="5" />
                <circle cx="530" cy="145" r="5" />
                <circle cx="700" cy="125" r="5" />
                <circle cx="850" cy="88" r="5" />
                <circle cx="980" cy="52" r="5" />
              </svg>

              <div className="datasLinha">
                <span>01/09</span>
                <span>05</span>
                <span>10</span>
                <span>15</span>
                <span>20</span>
                <span>25</span>
                <span>30</span>
              </div>

            </div>

          </section>

          {/* DUAS COLUNAS */}
          <section className="duasColunasFluxo">

            {/* MOVIMENTAÇÕES */}
            <div className="cardMovimentacoes">

              <div className="cabecalhoCardFluxo cabecalhoLista">
                <h2>Movimentações recentes</h2>

                <button>Ver todas</button>
              </div>

              <div className="listaMovimentacoes">

                {movimentos.map((m, i) => (
                  <div className="movimentacao" key={i}>

                    <div className="infoMovimentacao">

                      <span
                        className={
                          m.tipo === "entrada"
                            ? "iconeMovimentacao entradaIcone"
                            : "iconeMovimentacao saidaIcone"
                        }
                      >
                        {m.tipo === "entrada" ? "↓" : "↑"}
                      </span>

                      <strong>{m.descricao}</strong>

                    </div>

                    <span
                      className={
                        m.tipo === "entrada"
                          ? "valorEntrada"
                          : "valorSaida"
                      }
                    >
                      {m.tipo === "entrada" ? "+" : "-"}
                      {m.valor}
                    </span>

                  </div>
                ))}

              </div>

            </div>

            {/* MAIORES DESPESAS */}
            <div className="cardMovimentacoes">

              <div className="cabecalhoCardFluxo cabecalhoLista">
                <h2>Maiores despesas (mês)</h2>

                <button>Ver todas</button>
              </div>

              <div className="listaMovimentacoes">

                {maioresDespesas.map((d, i) => (
                  <div className="movimentacao" key={i}>

                    <div className="infoMovimentacao">
                      <span className="iconeDespesa">
                        -
                      </span>

                      <strong>{d.nome}</strong>
                    </div>

                    <span className="valorSaida">
                      {d.valor}
                    </span>

                  </div>
                ))}

              </div>

            </div>

          </section>

          {/* RESUMO INFERIOR */}
          <section className="resumoInferior">

            <div className="miniCard">
              <span>Lucro do mês</span>
              <strong>R$ 32.210,00</strong>
              <small>+12,4% em relação ao mês anterior</small>
            </div>

            <div className="miniCard">
              <span>Lucro da semana</span>
              <strong>R$ 5.338,60</strong>
              <small>+6,2% em relação à semana anterior</small>
            </div>

            <div className="miniCard">
              <span>Lucro do dia</span>
              <strong>R$ 982,00</strong>
              <small>+4,3% em relação a ontem</small>
            </div>

          </section>

          {/* DESPESAS FIXAS E VARIÁVEIS */}
          <section className="cardDespesas">

            <div className="cabecalhoCardFluxo">
              <h2>Despesas fixas x despesas variáveis (mês)</h2>
            </div>

            <div className="conteudoDespesas">

              {/* DONUT */}
              <div className="areaPizza">

                <div className="pizza">
                  <div className="centroPizza">
                    <strong>R$ 20.500,00</strong>
                    <span>Total de despesas</span>
                  </div>
                </div>

                <div className="legendaPizza">
                  <div>
                    <i className="pontoFixo"></i>
                    Despesas fixas (58,5%)
                  </div>

                  <div>
                    <i className="pontoVariavel"></i>
                    Despesas variáveis (41,5%)
                  </div>
                </div>

              </div>

              {/* TABELA FIXAS */}
              <div className="tabelaDespesa">

                <h3>Despesas fixas</h3>

                {despesasFixas.map((item, i) => (
                  <div className="linhaDespesa" key={i}>
                    <span>{item[0]}</span>
                    <strong>{item[1]}</strong>
                  </div>
                ))}

                <div className="totalDespesa">
                  <span>Total fixas</span>
                  <strong>R$ 12.000,00</strong>
                </div>

              </div>

              {/* TABELA VARIÁVEIS */}
              <div className="tabelaDespesa">

                <h3>Despesas variáveis</h3>

                {despesasVariaveis.map((item, i) => (
                  <div className="linhaDespesa" key={i}>
                    <span>{item[0]}</span>
                    <strong>{item[1]}</strong>
                  </div>
                ))}

                <div className="totalDespesa">
                  <span>Total variáveis</span>
                  <strong>R$ 8.500,00</strong>
                </div>

              </div>

            </div>

          </section>

        </main>
      </div>
    </div>
  );
}

export default FluxoCaixa;