let alertasMock = [
  {
    id: 1,
    titulo: "Fermento Químico abaixo do minimo",
    descricao: "Apenas 2kg restantes (mínimo 5kg). Produção de bolos em risco para amanhã.",
    prioridade: "ALTA",
    categoria: "ESTOQUE",
    corBarra: "#d32f2f"
  },
  {
    id: 2,
    titulo: "Validade próxima - Ovos brancos ",
    descricao: "Lote LT-0422 (1.800 un) vence em 02/12/2026 — priorizar no PEPS.",
    prioridade: "ALTA",
    categoria: "ESTOQUE",
    corBarra: "#d32f2f"
  }, 
  {
    id: 3,
    titulo: "Margem caindo — Torta de Limão",
    descricao: "Custo dos ingredientes subiu 8% no mês. Revisar preço de venda.",
    prioridade: "MÉDIA",
    categoria: "FINANCEIRO",
    corBarra: "#fbc02d"
  }, 
  {
    id: 4,
    titulo: "Fermento  abaixo do minimo",
    descricao: "Apenas 2kg restantes (mínimo 5kg). Produção de bolos em risco para amanhã.",
    prioridade: "MÉDIA",
    categoria: "ESTOQUE",
    corBarra: "#fbc02d"
  }, 
  {
    id: 5,
    titulo: "Pedido -2340 sem confirmação do cliente",
    descricao: "Mercado Bom Preço não confirmou entrega de amanhã às 09h.",
    prioridade: "BAIXA",
    categoria: "PEDIDOS",
    corBarra: "#616161"
  },
];

class AlertasController {
  // GET /alertas - Lista alertas com suporte a filtro ?categoria=ESTOQUE
  async listar(req, res) {
    const { categoria } = req.query;

    let resultado = alertasMock;

    if (categoria && categoria.toUpperCase() !== 'TODOS') {
      resultado = alertasMock.filter(
        (a) => a.categoria.toUpperCase() === categoria.toUpperCase()
      );
    }

    return res.json({
      total: resultado.length,
      data: resultado
    });
  }

  // DELETE /alertas/:id - Dispensa/Remove um alerta da lista
  async dispensar(req, res) {
    const { id } = req.params;

    const index = alertasMock.findIndex((a) => a.id === Number(id));

    if (index === -1) {
      return res.status(404).json({ error: "Alerta não encontrado." });
    }

    alertasMock.splice(index, 1);
    return res.json({ mensagem: "Alerta dispensado com sucesso." });
  }
}

module.exports = new AlertasController();