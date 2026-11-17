let pedidosMock = [
  {
    id: 1,
    cliente: "Padaria São José",
    itensCount: 4,
    entrega: "19/05 16h",
    valorTotal: 2840.00,
    status: "EM_PRODUCAO"
  },
  {
    id: 2,
    cliente: "Mercado Bom Preço",
    itensCount: 7,
    entrega: "20/05 09h",
    valorTotal: 5610.00,
    status: "AGUARDANDO"
  },
  {
    id: 3,
    cliente: "Confeitaria Doce Lar",
    itensCount: 2,
    entrega: "19/05 18h",
    valorTotal: 3120.00,
    status: "PRONTO"
  },
  {
    id: 4,
    cliente: "Tia Bete Bolos",
    itensCount: 3,
    entrega: "18/05",
    valorTotal: 1450.00,
    status: "ENTREGUE"
  },
  {
    id: 5,
    cliente: "Empório Café & Cia",
    itensCount: 5,
    entrega: "20/05 14h",
    valorTotal: 2210.00,
    status: "EM_PRODUCAO"
  },
  {
    id: 6,
    cliente: "Padaria Pão Quente",
    itensCount: 6,
    entrega: "A definir",
    valorTotal: 4180.00,
    status: "CANCELADO"
  },
  {
    id: 7,
    cliente: "Doceria Flor de açúcar",
    itensCount: 3,
    entrega: "A definir",
    valorTotal: 1890.00,
    status: "AGUARDANDO"
  },
  {
    id: 8,
    cliente: "Padaria Trigo Dourado",
    itensCount: 8,
    entrega: "A definir",
    valorTotal: 6300.00,
    status: "EM_PRODUCAO"
  },
  {
    id: 9,
    cliente: "Café & Cia Express",
    itensCount: 2,
    entrega: "A definir",
    valorTotal: 980.00,
    status: "PRONTO"
  },
  {
    id: 10,
    cliente: "Padaria Pão Mercearia Sabor Caseiro",
    itensCount: 5,
    entrega: "A definir",
    valorTotal: 2750.00,
    status: "ENTREGUE"
  },
  {
    id: 11,
    cliente: "Confeitaria Doce Encanto",
    itensCount: 4,
    entrega: "A definir",
    valorTotal: 3450.00,
    status: "AGUARDANDO"
  },
  {
    id: 12,
    cliente: "Padaria Estrela Dourada",
    itensCount: 6,
    entrega: "A definir",
    valorTotal: 5100.00,
    status: "CANCELADO"
  }
];

class PedidoController {
  // GET /pedidos - Aceita filtro por Query Param: ?status=AGUARDANDO
  async listar(req, res) {

    console.log("pppppppppppppppppppppppppppppppppp");

    const { status } = req.query;

    let resultado = pedidosMock;

    // Se um filtro de status for enviado e não for 'TODOS'
    if (status && status.toUpperCase() !== 'TODOS') {
      resultado = pedidosMock.filter(
        (p) => p.status.toUpperCase() === status.toUpperCase()
      );
    }

    return res.json({
      total: resultado.length,
      data: resultado
    });
  }

  // POST /pedidos - Cadastra um novo pedido (+ Novo pedido)
  async criar(req, res) {
    const { cliente, itensCount, entrega, valorTotal } = req.body;

    if (!cliente || !valorTotal) {
      return res.status(400).json({ error: "Cliente e valor são obrigatórios." });
    }

    const novoPedido = {
      id: pedidosMock.length + 1,
      cliente,
      itensCount: Number(itensCount) || 1,
      entrega: entrega || "A definir",
      valorTotal: Number(valorTotal),
      status: "AGUARDANDO" // Novo pedido entra como Aguardando por padrão
    };

    pedidosMock.push(novoPedido);
    return res.status(201).json(novoPedido);
  }

  // PATCH /pedidos/:id/status - Altera o status (ex: de AGUARDANDO para EM_PRODUCAO)
  async atualizarStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    const pedido = pedidosMock.find((p) => p.id === Number(id));

    if (!pedido) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }

    pedido.status = status.toUpperCase();
    return res.json(pedido);
  }
}

module.exports = new PedidoController();