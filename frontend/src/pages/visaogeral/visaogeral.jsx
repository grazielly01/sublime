import "./visaogeral.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import Button from "../../componentes/Button/Button.jsx";
import { useNavigate } from "react-router-dom";

function VisaoGeral() {
  const navigate = useNavigate();

  const kpis = [
    { titulo: "Faturamento (mês)", valor: "R$ 84.320,80", variacao: "+12,4%", tipo: "positivo", icone: "💰" },
    { titulo: "Pedidos abertos", valor: "23", variacao: "+5 hoje", tipo: "positivo", icone: "🧾" },
    { titulo: "Produção do dia", valor: "238 un.", variacao: "-24 hoje", tipo: "negativo", icone: "📦" },
    { titulo: "Itens em baixa", valor: "4", variacao: "Reposição urgente", tipo: "negativo", icone: "⚠️" },
  ];

  const pedidosRecentes = [
    { cliente: "Padaria Seu Zé", itens: "45 bolos formigueiro", status: "Em produção", horario: "Hoje 16:30h" },
    { cliente: "Padaria Estrella", itens: "30 donuts m., 30 donuts c.", status: "Não iniciado", horario: "13/06 09h" },
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
      status: "Não iniciado",
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
      status: "Em andamento",
      horario: "18/09 13h",
    },
  ];

  const atalhos = [
    { texto: "Nova ordem", icone: "🗓️" },
    { texto: "Iniciar produção", icone: "👨‍🍳" },
    { texto: "Entrada de insumos", icone: "📥" },
    { texto: "Relatórios", icone: "📊" },
  ];

  const classeStatus = (status) =>
    "status" +
    status
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "");

  return (
    <div className="tudoVisaoGeral">
      <Sidebar paginaAtiva="Visão geral" />

      <div className="tudoMenosSidebar tudoMenosSidebarVisaoGeral">
        <Header nomeIndustria="Sweet Sunset" />

        <div className="conteudoVisaoGeral">

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
                        <span className={`statusPedido ${classeStatus(m.status)}`}>
                          {m.status}
                        </span>
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
                {atalhos.map((a, i) => (
                  <Button key={i} texto={a.texto} icone={a.icone} />
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default VisaoGeral;
