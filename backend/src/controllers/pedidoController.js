class PedidoController {
  // GET /pedidos - Aceita filtro por Query Param: ?status=AGUARDANDO
  async listar(req, res) {

    const { status } = req.query;

    // PARAMOS AQUI! CHAME O PROFESSOR PARA CONTINUAR
    let resultado = await prisma.pedido.findMany();

    // Se um filtro de status for enviado e não for 'TODOS'
    if (status && status.toUpperCase() !== 'TODOS') {
      resultado = resultado.filter(
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
module.exports = new PedidoController();
