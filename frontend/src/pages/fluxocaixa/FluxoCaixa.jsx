import "./fluxocaixa.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useState } from "react";

// Ícones auxiliares para os modais
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

const IconeSetaSaida = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 7L7 17M7 17h9M7 17V8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function FluxoCaixa() {
  const navigate = useNavigate();

  // Estados dos modais inferiores
  const [modalMovimentacoesAberto, setModalMovimentacoesAberto] = useState(false);
  const [modalDespesasAberto, setModalDespesasAberto] = useState(false);

  // Estados para os modais superiores (+ Saída e + Entrada)
  const [modalRegistrarSaidaAberto, setModalRegistrarSaidaAberto] = useState(false);
  const [modalRegistrarEntradaAberto, setModalRegistrarEntradaAberto] = useState(false);

  // Estados de arquivos para os formulários dos novos modais
  const [nomeArquivoSaida, setNomeArquivoSaida] = useState("");
  const [nomeArquivoEntrada, setNomeArquivoEntrada] = useState("");

  const handleArquivoSaida = (e) => {
    const arquivo = e.target.files?.[0];
    setNomeArquivoSaida(arquivo ? arquivo.name : "");
  };

  const handleArquivoEntrada = (e) => {
    const arquivo = e.target.files?.[0];
    setNomeArquivoEntrada(arquivo ? arquivo.name : "");
  };

  const [abertosGrupos, setAbertosGrupos] = useState({
    Hoje: true,
    Ontem: false,
    "01/05": true,
  });

  const alternarGrupo = (titulo) => {
    setAbertosGrupos((prev) => ({ ...prev, [titulo]: !prev[titulo] }));
  };

  const movimentos = [
    { tipo: "entrada", descricao: "Venda – Padaria São José", valor: "R$ 2.760" },
    { tipo: "saida", descricao: "Compra – Chocolate Callebaut 10kg", valor: "R$ 1.240" },
    { tipo: "saida", descricao: "Compra – Farinha de trigo 25kg", valor: "R$ 615" },
    { tipo: "entrada", descricao: "Venda – Vila Bela Bolos", valor: "R$ 1.840" },
    { tipo: "saida", descricao: "Compra – Chocolate Callebaut 5kg", valor: "R$ 625" },
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

  const gruposMovimentacoesCompleto = [
    {
      titulo: "Hoje",
      itens: [
        { tipo: "entrada", titulo: "Venda — Padaria Estrella", data: "03/05", itens: "15 Torta de Limão 22cm, 30 Cupcake Red Velvet", categoria: "Outros", valor: "R$ 2.700" },
        { tipo: "entrada", titulo: "Venda — Sonda Supermercado", data: "03/05", itens: "15 Bolo Formigueiro, 15 Bolo Chocolate Branco", categoria: "Venda de produto", valor: "R$ 745" },
        { tipo: "saida", titulo: "Compra — Serviço encanador", data: "03/05", itens: "Conserto sanitário masculino", categoria: "Conserto/manutenção", valor: "R$ 1.200" },
      ],
    },
    { titulo: "Ontem", itens: [] },
    {
      titulo: "01/05",
      itens: [
        { tipo: "saida", titulo: "Compra — Embalagens Personalizadas", data: "01/05", itens: "Embalagens Personalizadas", categoria: "Compra de insumo", valor: "R$ 2.080" },
        { tipo: "entrada", titulo: "Venda — Tia Bete Doces", data: "01/05", itens: "16 Mousse Maracujá, 10 Pizza Brownie", categoria: "Venda de produto", valor: "R$ 922" },
      ],
    },
  ];

  const despesasCompletas = [
    { nome: "Folha salarial", detalhe: "Pagamento de funcionário", valor: "R$ 8.400" },
    { nome: "Farinha e açúcar (lote mensal)", detalhe: "Compra de insumo", valor: "R$ 3.120" },
    { nome: "Energia elétrica industrial", detalhe: "Contas", valor: "R$ 1.950" },
    { nome: "Embalagens personalizadas", detalhe: "Compra de insumo", valor: "R$ 2.760" },
    { nome: "Manutenção de equipamentos industriais", detalhe: "Conserto/manutenção", valor: "R$ 4.300" },
    { nome: "Gás industrial", detalhe: "Contas", valor: "R$ 2.650" },
    { nome: "Fretes e entregas", detalhe: "Fretes/entregas", valor: "R$ 2.100" },
    { nome: "Ingredientes complementares e especiais", detalhe: "Compra de insumo", valor: "R$ 1.780" },
  ];

  const voltar = () => {
    window.history.back();
  };

  return (
    <div className="tudoFluxoCaixa">
      <Sidebar paginaAtiva="Fluxo de caixa" />

      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset" />

        <main className="conteudoFluxoCaixa">

          {/* CABEÇALHO */}
          <div className="topoFluxoCaixa">
            <div className="tituloComVoltar">
              <button
                className="botaoVoltar"
                onClick={voltar}
                aria-label="Voltar"
                type="button"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 18l-6-6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <h1 className="tituloFluxoCaixa">Fluxo de caixa</h1>
            </div>

            <p className="subtituloFluxoCaixa">
              Entradas, saídas e saldo consolidado de setembro/2026.
            </p>
          </div>

          {/* CARDS SUPERIORES */}
          <section className="resumoFluxo">
            <div className="cardFluxo">
              <span className="labelFluxo">Entradas Totais</span>
              <strong className="valorFluxo">R$ 52.430,00</strong>
            </div>

            <div className="cardFluxo">
              <span className="labelFluxo">Despesas Totais</span>
              <strong className="valorFluxo">R$ 18.220,00</strong>
            </div>

            <div className="cardFluxo">
              <span className="labelFluxo">Lucro Líquido</span>
              <strong className="valorFluxo">R$ 34.210,00</strong>
            </div>

            <div className="cardFluxo cardSaldoFinal">
              <span className="labelFluxo">Margem de Lucro</span>
              <strong className="valorFluxo">65,2%</strong>
            </div>
          </section>

          {/* GRÁFICO DE BARRAS */}
          <section className="cardGraficoFluxo">
            <div className="cabecalhoCardFluxo">
              <h2>Fluxo de Caixa (Mês)</h2>

              <div className="acoesGrafico">
                <div className="botoesFluxo">
                  <button
                    className="botaoSaida"
                    type="button"
                    onClick={() => setModalRegistrarSaidaAberto(true)}
                  >
                    + Saída
                  </button>

                  <button
                    className="botaoEntrada"
                    type="button"
                    onClick={() => setModalRegistrarEntradaAberto(true)}
                  >
                    + Entrada
                  </button>
                </div>

                <div className="legendaGrafico">
                  <span><i className="legendaEntrada"></i>Entradas</span>
                  <span><i className="legendaSaida"></i>Saídas</span>
                </div>
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
                <span></span><span></span><span></span><span></span>
              </div>

              <div className="eixoLinhaY">
                <span>32k</span><span>24k</span><span>16k</span><span>8k</span><span>0</span>
              </div>

              <svg className="svgLinha" viewBox="0 0 1000 250" preserveAspectRatio="none">
                <polyline points="20,205 190,180 360,185 530,145 700,125 850,88 980,52" fill="none" stroke="#9d0926" strokeWidth="3" />
                <circle cx="20" cy="205" r="5" />
                <circle cx="190" cy="180" r="5" />
                <circle cx="360" cy="185" r="5" />
                <circle cx="530" cy="145" r="5" />
                <circle cx="700" cy="125" r="5" />
                <circle cx="850" cy="88" r="5" />
                <circle cx="980" cy="52" r="5" />
              </svg>

              <div className="datasLinha">
                <span>01/09</span><span>05</span><span>10</span><span>15</span><span>20</span><span>25</span><span>30</span>
              </div>
            </div>
          </section>

          {/* DUAS COLUNAS */}
          <section className="duasColunasFluxo">

            {/* MOVIMENTAÇÕES */}
            <div className="cardMovimentacoes">
              <div className="cabecalhoCardFluxo cabecalhoLista">
                <h2>Movimentações recentes</h2>
                <button onClick={() => setModalMovimentacoesAberto(true)}>
                  Ver todas
                </button>
              </div>

              <div className="listaMovimentacoes">
                {movimentos.map((m, i) => (
                  <div className="movimentacao" key={i}>
                    <div className="infoMovimentacao">
                      <span className={m.tipo === "entrada" ? "iconeMovimentacao entradaIcone" : "iconeMovimentacao saidaIcone"}>
                        {m.tipo === "entrada" ? "↓" : "↑"}
                      </span>
                      <strong>{m.descricao}</strong>
                    </div>

                    <span className={m.tipo === "entrada" ? "valorEntrada" : "valorSaida"}>
                      {m.tipo === "entrada" ? "+" : "-"}{m.valor}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* MAIORES DESPESAS */}
            <div className="cardMovimentacoes">
              <div className="cabecalhoCardFluxo cabecalhoLista">
                <h2>Maiores despesas</h2>
                <button onClick={() => setModalDespesasAberto(true)}>
                  Ver todas
                </button>
              </div>

              <div className="listaMovimentacoes">
                {maioresDespesas.map((d, i) => (
                  <div className="movimentacao" key={i}>
                    <div className="infoMovimentacao">
                      <span className="iconeDespesa">-</span>
                      <strong>{d.nome}</strong>
                    </div>
                    <span className="valorSaida">{d.valor}</span>
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
              <div className="areaPizza">
                <div className="pizza">
                  <div className="centroPizza">
                    <strong>R$ 20.500,00</strong>
                    <span>Total de despesas</span>
                  </div>
                </div>

                <div className="legendaPizza">
                  <div><i className="pontoFixo"></i>Despesas fixas (58,5%)</div>
                  <div><i className="pontoVariavel"></i>Despesas variáveis (41,5%)</div>
                </div>
              </div>

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

      {/* POP-UP: MOVIMENTAÇÕES RECENTES */}
      {modalMovimentacoesAberto && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "750px" }}>
            <div className="modalCabecalho">
              <h2>Movimentações recentes</h2>
              <button className="botaoFecharModal" onClick={() => setModalMovimentacoesAberto(false)}>&times;</button>
            </div>
            <div className="modalCorpo">
              <div className="listaCompletaMovimentacoes" style={{ background: "transparent", border: "none", boxShadow: "none", padding: 0 }}>
                {gruposMovimentacoesCompleto.map((grupo) => {
                  const aberto = abertosGrupos[grupo.titulo];
                  return (
                    <div className="grupoMovimentacoes" key={grupo.titulo}>
                      <button type="button" className={`cabecalhoGrupo ${aberto ? "" : "fechado"}`} onClick={() => alternarGrupo(grupo.titulo)}>
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
                                    <span className="tagTipo">{item.tipo === "entrada" ? "Entrada" : "Saída"}</span>
                                    <span className="separador">·</span>
                                    <span>{item.data}</span>
                                    <span className="separador">·</span>
                                    <span>{item.itens}</span>
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
            </div>
          </div>
        </div>
      )}

      {/* POP-UP: MAIORES DESPESAS */}
      {modalDespesasAberto && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "700px" }}>
            <div className="modalCabecalho">
              <h2>Maiores despesas</h2>
              <button className="botaoFecharModal" onClick={() => setModalDespesasAberto(false)}>&times;</button>
            </div>
            <div className="modalCorpo">
              <div className="listaCompletaDespesas" style={{ background: "transparent", border: "none", boxShadow: "none", padding: 0 }}>
                {despesasCompletas.map((d, i) => (
                  <div className="despesa" key={i}>
                    <div className="infoDespesaWrapper">
                      <span className="iconeSaida"><IconeSetaSaida /></span>
                      <div className="infoDespesa">
                        <strong>{d.nome}</strong>
                        <p><span>Saída</span><span className="separador">·</span><span>{d.detalhe}</span></p>
                      </div>
                    </div>
                    <span className="valorSaida">{d.valor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POP-UP: REGISTRAR NOVA SAÍDA */}
      {modalRegistrarSaidaAberto && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "800px" }}>
            <div className="modalCabecalho">
              <h2>Registrar nova saída</h2>
              <button className="botaoFecharModal" onClick={() => setModalRegistrarSaidaAberto(false)}>&times;</button>
            </div>
            <div className="modalCorpo">
              <form className="formFluxoCaixaRegistrar" onSubmit={(e) => { e.preventDefault(); setModalRegistrarSaidaAberto(false); }}>
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

                <label>
                  Anexar comprovante (opcional)
                  <label className="areaUpload" htmlFor="comprovanteSaidaModal">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 16V4M12 4l-4 4M12 4l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Clique aqui para anexar ou arraste o arquivo aqui</span>
                    <span>PDF, JPG, JPEG ou PNG (máx. 10MB)</span>
                    <input id="comprovanteSaidaModal" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleArquivoSaida} />
                  </label>
                  {nomeArquivoSaida && <span className="nomeArquivo">Arquivo selecionado: {nomeArquivoSaida}</span>}
                </label>

                <label>
                  Observações (opcional)
                  <textarea placeholder="Informações adicionais sobre esta saída..." />
                </label>

                <div className="acoesFluxoCaixaRegistrar">
                  <button type="button" className="botaoCancelar" onClick={() => setModalRegistrarSaidaAberto(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="botaoRegistrar">
                    Registrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* POP-UP: REGISTRAR NOVA ENTRADA */}
      {modalRegistrarEntradaAberto && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "800px" }}>
            <div className="modalCabecalho">
              <h2>Registrar nova entrada</h2>
              <button className="botaoFecharModal" onClick={() => setModalRegistrarEntradaAberto(false)}>&times;</button>
            </div>
            <div className="modalCorpo">
              <form className="formFluxoCaixaEntrada" onSubmit={(e) => { e.preventDefault(); setModalRegistrarEntradaAberto(false); }}>
                <div className="linhaFormEntrada colunas4">
                  <label>
                    Título da entrada<span className="obrigatorio">*</span>
                    <input type="text" placeholder="Escreva aqui o título..." required />
                  </label>
                  <label className="campoData">
                    Data da entrada<span className="obrigatorio">*</span>
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
                      <option value="venda">Venda</option>
                      <option value="servico">Prestação de serviço</option>
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

                <label>
                  Descrição<span className="obrigatorio">*</span>
                  <input type="text" placeholder="Escreva aqui a descrição..." required />
                </label>

                <label>
                  Anexar comprovante (opcional)
                  <label className="areaUpload" htmlFor="comprovanteEntradaModal">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 16V4M12 4l-4 4M12 4l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Clique aqui para anexar ou arraste o arquivo aqui</span>
                    <span>PDF, JPG, JPEG ou PNG (máx. 10MB)</span>
                    <input id="comprovanteEntradaModal" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleArquivoEntrada} />
                  </label>
                  {nomeArquivoEntrada && <span className="nomeArquivo">Arquivo selecionado: {nomeArquivoEntrada}</span>}
                </label>

                <label>
                  Observações (opcional)
                  <textarea placeholder="Informações adicionais sobre esta entrada..." />
                </label>

                <div className="acoesFluxoCaixaEntrada">
                  <button type="button" className="botaoCancelar" onClick={() => setModalRegistrarEntradaAberto(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="botaoRegistrar">
                    Registrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FluxoCaixa;