import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Producao.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { motion } from "motion/react";

const initialOrders = [
  { id: 1, name: "Brigadeiro Gourmet", team: "Equipe A", total: 480, done: 360, status: "Em andamento", time: "45 min restantes", kind: "progressing" },
  { id: 2, name: "Cupcake Red Velvet", team: "Equipe B", total: 200, done: 200, status: "Concluído", time: "Finalizado às 10h12", kind: "finished" },
  { id: 3, name: "Torta de Limão 22cm", team: "Equipe A", total: 18, done: 6, status: "Em andamento", time: "1h 20min restantes", kind: "progressing" },
  { id: 4, name: "Copo da Felicidade 250ml", team: "Equipe C", total: 120, done: 0, status: "Na fila", time: "Iniciar 14h00", kind: "queued" },
  { id: 5, name: "Bolo de Chocolate 1kg", team: "Equipe B", total: 30, done: 0, status: "Na fila", time: "Iniciar 15h30", kind: "queued" },
];

//testando
export default function Producao() {
  const [orders, setOrders] = useState(initialOrders);
  const navigate = useNavigate();

  function updateOrder(index, changes) {
    setOrders((current) =>
      current.map((order, pos) =>
        pos === index ? { ...order, ...changes } : order
      )
    );
  }

  function startOrder(index) {
    updateOrder(index, {
      kind: "progressing",
      status: "Em andamento",
      time: "1h 30min restantes",
    });
  }

  function finishOrder(index) {
    const order = orders[index];
    updateOrder(index, {
      done: order.total,
      kind: "finished",
      status: "Concluído",
      time: "Finalizado agora",
    });
  }

  return (
    <div className="production-page">
      <Sidebar paginaAtiva="Produção" />
      <Header nomeIndustria="Sweet Sunset" />

      <main>
        {/* título + botão */}
        <section className="title-row">
          <div>
            <h1 className="page-title">Produção</h1>
            <p className="page-lead">
              Planejamento e acompanhamento das ordens de produção de hoje.
            </p>
          </div>
          <button
            className="btnnovaordem"
            onClick={() => navigate("/registrarproducao")}
          >
            Nova ordem
          </button>
        </section>

        {/* cards resumo */}
        <section className="metrics">
          <article className="metric">
            <div className="metric-label">META DO DIA</div>
            <div className="metric-number">1.420 un</div>
            <div className="mini-track"><span /></div>
            <div className="metric-text complete-rate">87% concluído</div>
          </article>

          <article className="metric">
            <div className="metric-label">ORDENS ATIVAS</div>
            <div className="metric-number wine">5</div>
            <div className="metric-text">
              2 em andamento · 2 na fila · 1 concluída
            </div>
          </article>

          <article className="metric">
            <div className="metric-label">PERDAS HOJE</div>
            <div className="metric-number">2,1%</div>
            <div className="metric-text">Dentro do esperado (≤ 4%)</div>
          </article>
        </section>

        {/* fila de produção */}
        <section className="queue">
          <h2>Fila de produção</h2>
          <div className="orders">
            {orders.map((order, index) => {
              const percent = Math.round((order.done / order.total) * 100);
              return (
                <article
                  className="order"
                  key={order.name}
                  onClick={() => navigate(`/detalhesordem/${order.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="order-main">
                    <div>
                      <h3>{order.name}</h3>
                      <div className="team">
                        {order.team} · {order.total} unidades
                      </div>
                    </div>
                    <span className={`status ${order.kind}`}>{order.status}</span>
                  </div>

                  <div className="progress">
                    <span style={{ width: `${percent}%` }} />
                  </div>

                  <div className="details">
                    <span className="time">{order.time}</span>
                    <span>{order.done} / {order.total} ({percent}%)</span>
                  </div>

                  {order.kind === "progressing" && (
                    <button className="action complete" onClick={(e) => { e.stopPropagation(); finishOrder(index); }}>
                      Concluir lote
                    </button>
                  )}
                  {order.kind === "queued" && (
                    <button className="action start" onClick={(e) => { e.stopPropagation(); startOrder(index); }}>
                      Iniciar
                    </button>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
