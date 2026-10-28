import "./visaogeral.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import Button from "../../componentes/Button/Button.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

function VisaoGeral() {
  const navigate = useNavigate();

  const kpis = [
  {
    titulo: "Faturamento (mês)",
    valor: "R$ 84.320,80",
    variacao: "+12,4%",
    tipo: "positivo",
    icone: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2v20" />
        <path d="M17 5.5C16.2 4.5 14.8 4 13.2 4h-2.1C8.8 4 7 5.5 7 7.5S8.8 11 11.1 11h1.8c2.3 0 4.1 1.5 4.1 3.5S15.2 18 12.9 18h-2.1c-1.6 0-3-.5-3.8-1.5" />
      </svg>
    ),
  },
  {
    titulo: "Pedidos abertos",
    valor: "23",
    variacao: "+5 hoje",
    tipo: "positivo",
    icone: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 3h12v18H6z" />
        <path d="M9 7h6" />
        <path d="M9 11h6" />
        <path d="M9 15h4" />
      </svg>
    ),
  },
  {
    titulo: "Produção do dia",
    valor: "238 un.",
    variacao: "-24 hoje",
    tipo: "negativo",
    icone: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 7h18v14H3z" />
        <path d="M7 7V4h10v3" />
        <path d="M3 12h18" />
        <path d="M10 12v2h4v-2" />
      </svg>
    ),
  },
  {
    titulo: "Itens em baixa",
    valor: "4",
    variacao: "Reposição urgente",
    tipo: "negativo",
    icone: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3L22 20H2L12 3z" />
        <path d="M12 9v5" />
        <path d="M12 17h.01" />
      </svg>
    ),
  },
];

  const pedidosRecentes = [
    { cliente: "Padaria Seu Zé", itens: "45 bolos formigueiro", status: "Em produção", horario: "Hoje 16:30h" },
    { cliente: "Padaria Estrella", itens: "30 donuts m., 30 donuts c.", status: "Aguardando", horario: "13/06 09h" },
    { cliente: "Delícias da Cidinha", itens: "30 ovos de páscoa", status: "Pronto", horario: "Hoje 17h" },
    { cliente: "Confeitaria Arco-Íris", itens: "15 cupcakes, 20 cookies", status: "Entregue", horario: "Ontem 08h" },
  ];

  const produtosLucrativos = [
    { posicao: "1º", nome: "Bolo Red Velvet", vendidos: "310", produzidos: "340", lucro: "R$ 1.208,00" },
    { posicao: "2º", nome: "Cookies Caramelo", vendidos: "302", produzidos: "335", lucro: "R$ 936,00" },
    { posicao: "3º", nome: "Mousse Maracujá", vendidos: "254", produzidos: "254", lucro: "R$ 905,00" },
    { posicao: "4º", nome: "Torta Prestígio", vendidos: "204", produzidos: "230", lucro: "R$ 841,00" },
  ];

  const metas = [
    {
      titulo: "Zerar todos os pedidos atrasados em 4 dias",
      descricao: "Zerar os 5 pedidos atrasados: Mousse de limão, Donuts Formigueiro, Bolos de Cenoura e Copos da Felicidade",
      status: "Aguardando",
      horario: "15/09 09h",
    },
    {
      titulo: "Planejar produção",
      descricao: "Planejar produção do mês em até 2 dias",
      status: "Pronto",
      horario: "Hoje",
    },
    {
      titulo: "Produzir 200 bolos de cenoura",
      descricao: "Produzir 200 bolos de cenoura até o final da semana",
      status: "Em produção",
      horario: "18/09 13h",
    },
  ];

const classeStatus = (status) =>
  "status" +
  status
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") /*remove os acentos*/
    .replace(/\s+(.)/g, (correspondencia, letra) => letra.toUpperCase()); /*remove o espaço e ja deixa a letra seguinte maiúscula, pra bater certinho com o nome da classe no css*/

  return (
    <div className="tudoVisaoGeral">
      <Sidebar paginaAtiva="Visão geral" />

      <div className="tudoMenosSidebar tudoMenosSidebarVisaoGeral">
        <Header nomeIndustria="Sweet Sunset" />

        <div className="conteudoVisaoGeral conteudoVisaoGeral2">

          {/* Título */}
          <div className="topoVisaoGeral">
            <h1 className="tituloVisaoGeral">Visão geral</h1>
            <p className="subtituloVisaoGeral">Resumo da sua indústria hoje</p>
          </div>

          {/* KPIs */}
          <div className="cardsKpi">
            {kpis.map((k, i) => (
              <div className="cardKpi" key={i}>
                <div className="topoCardKpi">
                  <span className="iconeKpi">{k.icone}</span>
                  <p className="tituloKpi">{k.titulo}</p>
                </div>
                <p className="valorKpi">{k.valor}</p>
                <span className={`badgeKpi ${k.tipo}`}>{k.variacao}</span>
              </div>
            ))}
          </div>

          {/* PRIMEIRA LINHA */}
          <div className="linhaPrincipal">

            {/* Pedidos recentes */}
            <div className="pedidosRecentes">
              <div className="cabecalhoSecao">
                <h2>Pedidos recentes</h2>
                <button className="botaoVerTodos">Ver todos</button>
              </div>

              <div className="listaPedidosRecentes">
                {pedidosRecentes.map((p, i) => (
                  <div className="cardPedidoRecente" key={i}>
                    <div className="dadosPedido">
                      <h3>{p.cliente}</h3>
                      <p>{p.itens}</p>
                    </div>
                    <div className="ladoDireitoPedido">
                      <span className={`statusPedido ${classeStatus(p.status)}`}>
                        {p.status}
                      </span>
                      <span className="horarioPedido">{p.horario}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Produtos mais lucrativos */}
            <div className="produtosLucrativos">
              <h2>Produtos mais lucrativos</h2>
              <div className="listaProdutos">
                {produtosLucrativos.map((p, i) => (
                  <div className="cardProduto" key={i}>
                    <div className="dadosPedido">
                      <h3>
                        <span className="posicaoProduto">{p.posicao}</span> {p.nome}
                      </h3>
                      <p>{p.vendidos} vendidos | Produzidos: {p.produzidos}</p>
                      <p className="lucroProduto">Lucro: {p.lucro}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* SEGUNDA LINHA */}
          <div className="linhaInferior">

            {/* Metas */}
            <div className="metas">
              <h2>Metas</h2>
              <ul className="listaMetas">
                {metas.map((m, i) => (
                  <li key={i} className="itemMeta">
                    <div className="topoItemMeta">
                    <div className="flexRow">
                      <h3>{m.titulo}</h3>
                      {m.status && ( /*coloquei pra só mostrar a tarja se esse item tiver um status definudo*/
                      <span className={`statusPedido ${classeStatus(m.status)}`}>
                        {m.status}
                      </span>
                      )}
                    </div>
                      <p className="descricaoMeta">{m.descricao}</p>
                      <span className="horarioPedido" style={{ marginTop: "4px" }}>
                        {m.horario}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Botão Ver mais com navegação */}
              <button
                className="botaoVerMais"
                onClick={() => navigate("/metavisaogeral")}
              >
                Ver mais
              </button>
            </div>

            {/* Atalhos rápidos */}
            <div className="atalhosRapidos">
              <h2>Atalhos rápidos</h2>
              <div className="listaAtalhos">

                <button className="botaoAtalho" onClick={() => navigate("/pedidos")}> {/*ajusta a rota se o nome de vocês for diferente*/}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-shopping-bag">
                <path d="M16 10a4 4 0 0 1-8 0" />
                <path d="M3.103 6.034h17.794" />
                <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
                </svg>
                  Nova ordem
                </button>

                <button className="botaoAtalho" onClick={() => navigate("/producao")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-chef-hat">
                <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
                <path d="M6 17h12" />
              </svg>
                  Iniciar produção
                </button>

                <button className="botaoAtalho" onClick={() => navigate("/estoque")}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
                    <path d="M3 8l9 5 9-5M12 13v8" />
                  </svg>
                  Entrada de insumos
                </button>

                <button className="botaoAtalho" onClick={() => navigate("/dashboard")}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="12" width="4" height="8" rx="1" />
                    <rect x="10" y="7" width="4" height="13" rx="1" />
                    <rect x="16" y="3" width="4" height="17" rx="1" />
                  </svg>
                  Relatórios
                </button>

              </div>
            </div>




          </div>

        </div>
      </div>
    </div>
  );
}

export default VisaoGeral;
