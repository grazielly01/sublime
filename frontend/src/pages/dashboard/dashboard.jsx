import "./dashboard.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { motion } from "motion/react";

function Dashboard() {
  const resumo = [
    {
      titulo: "Estoque",
      status: "OK",
      tipo: "ok",
      icone: "✓",
    },
    {
      titulo: "Produção",
      status: "Atenção",
      tipo: "atencao",
      icone: "!",
    },
    {
      titulo: "Pedidos",
      status: "Urgente",
      tipo: "urgente",
      icone: "×",
    },
    {
      titulo: "Financeiro",
      status: "Estável",
      tipo: "estavel",
      icone: "✓",
    },
  ];

  const kpis = [
    {
      titulo: "Lucro estimado (mês)",
      valor: "R$ 47.000",
      variacao: "+9,3%",
      tipo: "positivo",
      icone: "R$",
    },
    {
      titulo: "Perdas em R$",
      valor: "R$ 2.912",
      variacao: "-12,1%",
      tipo: "positivo",
      icone: "↓",
    },
    {
      titulo: "Faturamento (mês)",
      valor: "R$ 91.430",
      variacao: "+12,4%",
      tipo: "positivo",
      icone: "R$",
    },
    {
      titulo: "Inadimplência",
      valor: "1,8%",
      variacao: "-0,4pp",
      tipo: "positivo",
      icone: "%",
    },
  ];

  const metas = [
    {
      titulo: "Meta de faturamento",
      atual: "R$ 91k",
      meta: "R$ 100k",
      porcentagem: 91,
    },
    {
      titulo: "Pedidos do mês",
      atual: "142",
      meta: "160",
      porcentagem: 89,
    },
    {
      titulo: "Novos clientes B2B",
      atual: "7",
      meta: "10",
      porcentagem: 70,
    },
  ];

  const fluxoSemana = [
    { dia: "Seg", entrada: 12400, saida: 8200 },
    { dia: "Ter", entrada: 9800, saida: 6100 },
    { dia: "Qua", entrada: 15200, saida: 11400 },
    { dia: "Qui", entrada: 11000, saida: 7300 },
    { dia: "Sex", entrada: 18900, saida: 9200 },
    { dia: "Sáb", entrada: 22400, saida: 5800 },
  ];

  const produtos = [
    {
      nome: "Brigadeiro Gourmet",
      quantidade: 4200,
    },
    {
      nome: "Cupcake Sortido",
      quantidade: 3100,
    },
    {
      nome: "Torta de Limão",
      quantidade: 2400,
    },
    {
      nome: "Bolo Red Velvet",
      quantidade: 1900,
    },
    {
      nome: "Copo da Felicidade",
      quantidade: 1650,
    },
  ];

  const clientes = [
    {
      nome: "Padaria Pão Quente",
      pedidos: 28,
      ltv: "R$ 42.800",
      status: "Ativo",
    },
    {
      nome: "Mercado Vila Nova",
      pedidos: 22,
      ltv: "R$ 36.200",
      status: "Ativo",
    },
    {
      nome: "Rede Doce Mel",
      pedidos: 19,
      ltv: "R$ 31.900",
      status: "Atenção",
    },
    {
      nome: "Café Central",
      pedidos: 14,
      ltv: "R$ 18.400",
      status: "Ativo",
    },
    {
      nome: "Empório Sabor",
      pedidos: 11,
      ltv: "R$ 14.200",
      status: "Inativo",
    },
  ];

  const entregas = [
    {
      cliente: "Padaria Pão Quente",
      produto: "300 brigadeiros",
      quando: "Hoje 14h",
      urgente: true,
    },
    {
      cliente: "Mercado Vila Nova",
      produto: "80 tortas de limão",
      quando: "Amanhã 09h",
      urgente: false,
    },
    {
      cliente: "Café Central",
      produto: "120 cupcakes",
      quando: "Amanhã 16h",
      urgente: false,
    },
    {
      cliente: "Rede Doce Mel",
      produto: "Bolos sortidos (45kg)",
      quando: "Sex 08h",
      urgente: false,
    },
  ];

  const alertas = [
    {
      tipo: "Estoque",
      mensagem: "Chocolate ao leite — 2 dias de cobertura",
      nivel: "alta",
    },
    {
      tipo: "Validade",
      mensagem: "Lote #L2206 vence em 5 dias",
      nivel: "media",
    },
    {
      tipo: "Financeiro",
      mensagem: "3 faturas vencendo nesta semana",
      nivel: "media",
    },
    {
      tipo: "Produção",
      mensagem: "Forno 2 — manutenção preventiva atrasada",
      nivel: "alta",
    },
  ];

  const fornecedores = [
    {
      nome: "Distribuidora Açúcar & Cia",
      atraso: "12d",
      nota: "2,8",
      ultima: "10/06/2026",
    },
    {
      nome: "Laticínios Sul",
      atraso: "5d",
      nota: "3,2",
      ultima: "14/06/2026",
    },
    {
      nome: "Embalagens Rápido",
      atraso: "8d",
      nota: "2,5",
      ultima: "11/06/2026",
    },
  ];

  const indicadores = [
    {
      titulo: "Margem média",
      valor: "42%",
    },
    {
      titulo: "Ticket médio B2B",
      valor: "R$ 1.180",
    },
    {
      titulo: "Perdas de produção",
      valor: "3,2%",
    },
    {
      titulo: "Prazo médio entrega",
      valor: "2,4 dias",
    },
    {
      titulo: "Produção do dia",
      valor: "3.280 un.",
    },
  ];

  return (
    <div className="tudoDashboard">
      <Sidebar paginaAtiva="Dashboard" />

      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset" />

        <main className="conteudoDashboard">

          {/* CABEÇALHO */}
          <div className="topoDashboard">
            <div>
              <h1 className="tituloDashboard">Dashboard</h1>
              <p className="subtituloDashboard">
                Visão completa da operação industrial em tempo real.
              </p>
            </div>

            {/*Tava aq*/}

          </div>
          
          {/* PERÍODOS E EXPORTAR */}
          <div className=" divSeiLa">
          <div className="acoesDashboard">
              <button className="botaoPeriodo">7d</button>
              <button className="botaoPeriodo ativo">30d</button>
              <button className="botaoPeriodo">90d</button>
              <button className="botaoPeriodo">Ano</button>

              <button className="botaoDashboardSecundario">
                📅 Período
              </button>

              <button className="botaoDashboardSecundario">
                ↓ Exportar
              </button>
            </div>
            </div>

          {/* RESUMO POR SETOR */}
          <section className="secaoDashboard">
            <div className="cardsResumo">
              {resumo.map((item, i) => (
                <div
                  className={`cardResumo ${item.tipo}`}
                  key={i}
                >
                  <div className="iconeResumo">
                    {item.icone}
                  </div>

                  <div>
                    <span>{item.titulo}</span>
                    <strong>{item.status}</strong>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FINANCEIRO */}
          <section className="secaoDashboard">
            <div className="tituloSecaoDashboard">
              <span>R$</span>
              <h2>Financeiro</h2>
            </div>

            <div className="cardsKpiDashboard">
              {kpis.map((k, i) => (
                <div className="cardKpiDashboard" key={i}>
                  <div className="topoKpiDashboard">
                    <span className="iconeKpiDashboard">
                      {k.icone}
                    </span>

                    <span className={`badgeKpiDashboard ${k.tipo}`}>
                      ↗ {k.variacao}
                    </span>
                  </div>

                  <p className="tituloKpiDashboard">
                    {k.titulo}
                  </p>

                  <strong className="valorKpiDashboard">
                    {k.valor}
                  </strong>
                </div>
              ))}
            </div>

            <div className="gridFinanceiro">

              {/* GRÁFICO */}
              <div className="cardDashboard graficoReceita">
                <div className="cabecalhoCardDashboard">
                  <h3>Receita, custo e meta</h3>
                  <span className="badgeSucesso">
                    ↗ Acima da meta
                  </span>
                </div>

                <div className="graficoArea">
                  <div className="linhasGrafico">
                    <span>100k</span>
                    <span>75k</span>
                    <span>50k</span>
                    <span>25k</span>
                    <span>0</span>
                  </div>

                  <div className="graficoColunas">
                    {[52, 58, 67, 74, 84, 91].map((valor, i) => (
                      <div className="grupoGrafico" key={i}>
                        <div
                          className="barraReceita"
                          style={{ height: `${valor}%` }}
                        ></div>

                        <div
                          className="barraCusto"
                          style={{
                            height: `${(valor * 0.48)}%`,
                          }}
                        ></div>

                        <span>
                          {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="legendaGrafico">
                  <span>
                    <i className="legendaReceita"></i>
                    Receita
                  </span>

                  <span>
                    <i className="legendaCusto"></i>
                    Custo
                  </span>

                  <span>
                    <i className="legendaMeta"></i>
                    Meta
                  </span>
                </div>
              </div>

              {/* METAS */}
              <div className="cardDashboard cardMetasDashboard">
                <div className="cabecalhoCardDashboard">
                  <h3>Metas do mês</h3>
                </div>

                {metas.map((meta, i) => (
                  <div className="metaDashboard" key={i}>
                    <div className="linhaMeta">
                      <span>{meta.titulo}</span>
                      <strong>
                        {meta.atual}
                        <small> / {meta.meta}</small>
                      </strong>
                    </div>

                    <div className="barraMeta">
                      <div
                        style={{
                          width: `${meta.porcentagem}%`,
                        }}
                      ></div>
                    </div>

                    <span className="porcentagemMeta">
                      {meta.porcentagem}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* FLUXO + INSIGHTS */}
            <div className="gridDoisDashboard">

              <div className="cardDashboard">
                <div className="cabecalhoCardDashboard">
                  <h3>Fluxo da semana</h3>
                </div>

                <div className="fluxoDashboard">
                  {fluxoSemana.map((dia, i) => {
                    const maior = Math.max(
                      dia.entrada,
                      dia.saida
                    );

                    return (
                      <div className="diaFluxo" key={i}>
                        <div className="barrasFluxo">
                          <div
                            className="barraEntrada"
                            style={{
                              height: `${(dia.entrada / maior) * 100}%`,
                            }}
                          ></div>

                          <div
                            className="barraSaida"
                            style={{
                              height: `${(dia.saida / maior) * 75}%`,
                            }}
                          ></div>
                        </div>

                        <span>{dia.dia}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="legendaGrafico">
                  <span>
                    <i className="legendaReceita"></i>
                    Entrada
                  </span>

                  <span>
                    <i className="legendaCusto"></i>
                    Saída
                  </span>
                </div>
              </div>

              <div className="cardDashboard insightsDashboard">
                <div className="cabecalhoCardDashboard">
                  <h3>Insights financeiros</h3>
                </div>

                <div className="insight positivo">
                  <strong>↗ Oportunidade</strong>
                  <p>
                    Brigadeiro Gourmet cresceu
                    <b> +38%</b> em 30 dias.
                    Considere aumentar a produção em 15%.
                  </p>
                </div>

                <div className="insight atencao">
                  <strong>↘ Atenção</strong>
                  <p>
                    <b>Rede Doce Mel</b> reduziu pedidos
                    em 22%. Recomendamos contato comercial.
                  </p>
                </div>

                <div className="insight estoque">
                  <strong>Estoque</strong>
                  <p>
                    Compra sugerida:
                    <b> 40kg de chocolate ao leite</b>
                    para cobrir 30 dias.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* PRODUÇÃO */}
          <section className="secaoDashboard">

            <div className="tituloSecaoDashboard">
              <span>▣</span>
              <h2>Produção</h2>
            </div>

            <div className="gridProducaoDashboard">

              <div className="cardDashboard oeeDashboard">
                <h3>Eficiência industrial (OEE)</h3>

                <div className="circuloOee">
                  <div>
                    <strong>78%</strong>
                    <span>OEE</span>
                  </div>
                </div>

                <div className="indicadoresOee">
                  <div>
                    <strong>92%</strong>
                    <span>Disponib.</span>
                  </div>

                  <div>
                    <strong>88%</strong>
                    <span>Performance</span>
                  </div>

                  <div>
                    <strong>96%</strong>
                    <span>Qualidade</span>
                  </div>
                </div>
              </div>

              <div className="cardDashboard">
                <h3>Mix de produção</h3>

                <div className="mixDashboard">
                  <div
                    className="pizzaMix"
                  ></div>

                  <div className="legendaMix">
                    <span>
                      <i></i> Bolos <b>38%</b>
                    </span>
                    <span>
                      <i></i> Doces finos <b>27%</b>
                    </span>
                    <span>
                      <i></i> Tortas <b>19%</b>
                    </span>
                    <span>
                      <i></i> Sazonais <b>16%</b>
                    </span>
                  </div>
                </div>
              </div>

              <div className="cardDashboard">
                <h3>Top 5 produtos vendidos</h3>

                <div className="listaProdutosDashboard">
                  {produtos.map((produto, i) => (
                    <div
                      className="produtoDashboard"
                      key={i}
                    >
                      <div className="produtoNome">
                        <span>{produto.nome}</span>
                        <strong>
                          {produto.quantidade.toLocaleString("pt-BR")}
                        </strong>
                      </div>

                      <div className="barraProduto">
                        <div
                          style={{
                            width: `${(produto.quantidade / 4200) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* ESTOQUE */}
          <section className="secaoDashboard">

            <div className="tituloSecaoDashboard">
              <span>□</span>
              <h2>Estoque</h2>
            </div>

            <div className="gridDoisDashboard">

              <div className="cardDashboard">
                <div className="cabecalhoCardDashboard">
                  <h3>Alertas de estoque & validade</h3>
                </div>

                <div className="listaAlertas">
                  {alertas.slice(0, 2).map((alerta, i) => (
                    <div
                      className="alertaDashboard"
                      key={i}
                    >
                      <span
                        className={`pontoAlerta ${alerta.nivel}`}
                      ></span>

                      <div>
                        <small>{alerta.tipo}</small>
                        <p>{alerta.mensagem}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="sugestaoDashboard">
                  <b>Sugestão:</b> Comprar 40kg de
                  chocolate ao leite e 15kg de manteiga
                  nos próximos 3 dias.
                </div>
              </div>

              <div className="cardDashboard">
                <h3>Controle de lotes próximos ao vencimento</h3>

                <div className="tabelaDashboard">
                  <div className="linhaTabela cabecalhoTabela">
                    <span>Lote</span>
                    <span>Produto</span>
                    <span>Qtd</span>
                    <span>Vence</span>
                  </div>

                  <div className="linhaTabela">
                    <span>#L2206</span>
                    <span>Leite condensado</span>
                    <span>120 un</span>
                    <b className="badgeUrgente">5 dias</b>
                  </div>

                  <div className="linhaTabela">
                    <span>#L2198</span>
                    <span>Creme de leite</span>
                    <span>85 un</span>
                    <b className="badgeAtencao">12 dias</b>
                  </div>

                  <div className="linhaTabela">
                    <span>#L2185</span>
                    <span>Farinha de trigo</span>
                    <span>200 kg</span>
                    <b className="badgeNormal">28 dias</b>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* PEDIDOS */}
          <section className="secaoDashboard">

            <div className="tituloSecaoDashboard">
              <span>🛒</span>
              <h2>Pedidos</h2>
            </div>

            <div className="gridDoisDashboard">

              <div className="cardDashboard">
                <h3>Próximas entregas</h3>

                <div className="listaEntregas">
                  {entregas.map((entrega, i) => (
                    <div
                      className="entregaDashboard"
                      key={i}
                    >
                      <div>
                        <strong>{entrega.cliente}</strong>
                        <span>{entrega.produto}</span>
                      </div>

                      <div className="horarioEntrega">
                        <strong>{entrega.quando}</strong>

                        {entrega.urgente && (
                          <span className="badgeUrgente">
                            Urgente
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cardDashboard">
                <div className="cabecalhoCardDashboard">
                  <h3>Top clientes B2B</h3>
                  <button className="botaoLinkDashboard">
                    Ver todos
                  </button>
                </div>

                <div className="tabelaDashboard">
                  <div className="linhaTabela cabecalhoTabela">
                    <span>Cliente</span>
                    <span>Pedidos</span>
                    <span>LTV</span>
                    <span>Status</span>
                  </div>

                  {clientes.map((cliente, i) => (
                    <div
                      className="linhaTabela"
                      key={i}
                    >
                      <strong>{cliente.nome}</strong>
                      <span>{cliente.pedidos}</span>
                      <span>{cliente.ltv}</span>
                      <b
                        className={`statusCliente ${cliente.status
                          .toLowerCase()
                          .replace("ã", "a")}`}
                      >
                        {cliente.status}
                      </b>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* ALERTAS */}
          <section className="secaoDashboard">

            <div className="tituloSecaoDashboard">
              <span>⚠</span>
              <h2>Alertas</h2>
            </div>

            <div className="gridDoisDashboard">

              <div className="cardDashboard">
                <div className="cabecalhoCardDashboard">
                  <h3>Alertas críticos</h3>

                  <button className="botaoLinkDashboard">
                    Ver todos
                  </button>
                </div>

                <div className="listaAlertas">
                  {alertas.map((alerta, i) => (
                    <div
                      className="alertaDashboard"
                      key={i}
                    >
                      <span
                        className={`pontoAlerta ${alerta.nivel}`}
                      ></span>

                      <div>
                        <small>{alerta.tipo}</small>
                        <p>{alerta.mensagem}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cardDashboard">
                <div className="cabecalhoCardDashboard">
                  <h3>Fornecedores em atraso</h3>

                  <button className="botaoLinkDashboard">
                    Gerenciar
                  </button>
                </div>

                <div className="tabelaDashboard">
                  <div className="linhaTabela cabecalhoTabela">
                    <span>Fornecedor</span>
                    <span>Atraso</span>
                    <span>Nota</span>
                    <span>Última entrega</span>
                  </div>

                  {fornecedores.map((fornecedor, i) => (
                    <div
                      className="linhaTabela"
                      key={i}
                    >
                      <strong>{fornecedor.nome}</strong>

                      <b className="badgeUrgente">
                        {fornecedor.atraso}
                      </b>

                      <b className="notaFornecedor">
                        {fornecedor.nota}
                      </b>

                      <span>{fornecedor.ultima}</span>
                    </div>
                  ))}
                </div>

                <div className="recomendacaoDashboard">
                  <b>Recomendação:</b> Avalie substituir
                  Embalagens Rápido — nota 2,5 e 8 dias
                  de atraso médio nos últimos 3 meses.
                </div>
              </div>

            </div>
          </section>

          {/* INDICADORES FINAIS */}
          <div className="indicadoresFinaisDashboard">
            {indicadores.map((indicador, i) => (
              <div
                className="indicadorFinalDashboard"
                key={i}
              >
                <span>{indicador.titulo}</span>
                <strong>{indicador.valor}</strong>
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}

export default Dashboard;