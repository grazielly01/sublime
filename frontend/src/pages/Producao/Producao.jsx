import { useState } from "react";
import "./producao.css";
import Button from "../../componentes/Button/Button.jsx"; 
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";



const initialOrders = [
  { name: "Brigadeiro Gourmet", team: "Equipe A", total: 480, done: 360, status: "Em andamento", time: "45 min restantes", kind: "progressing" },
  { name: "Cupcake Red Velvet", team: "Equipe B", total: 200, done: 200, status: "Concluído", time: "Finalizado às 10h12", kind: "finished" },
  { name: "Torta de Limão 22cm", team: "Equipe A", total: 18, done: 6, status: "Em andamento", time: "1h 20min restantes", kind: "progressing" },
  { name: "Copo da Felicidade 250ml", team: "Equipe C", total: 120, done: 0, status: "Na fila", time: "Iniciar 14h00", kind: "queued" },
  { name: "Bolo de Chocolate 1kg", team: "Equipe B", total: 30, done: 0, status: "Na fila", time: "Iniciar 15h30", kind: "queued" },
];



export default function Producao() {
  const [orders, setOrders] = useState(initialOrders);

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
            onClick={() => window.alert("Nova ordem criada")}
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
                <article className="order" key={order.name}>
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
                    <button className="action complete" onClick={() => finishOrder(index)}>
                      Concluir lote
                    </button>
                  )}
                  {order.kind === "queued" && (
                    <button className="action start" onClick={() => startOrder(index)}>
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
