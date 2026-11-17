// src/controllers/producaoController.js

let ordensMock = [
  {
    id: 1,
    produto: "Brigadeiro Gourmet",
    equipe: "Equipe A",
    quantidadeTotal: 480,
    quantidadeFeita: 360,
    status: "EM_ANDAMENTO",
    tempoEstimado: "45 min restantes"
  },
  {
    id: 2,
    produto: "Cupcake Red Velvet",
    equipe: "Equipe B",
    quantidadeTotal: 200,
    quantidadeFeita: 200,
    status: "CONCLUIDO",
    tempoEstimado: "Finalizado às 10h12"
  },
  {
    id: 3,
    produto: "Torta de Limão 22cm",
    equipe: "Equipe A",
    quantidadeTotal: 18,
    quantidadeFeita: 6,
    status: "EM_ANDAMENTO",
    tempoEstimado: "1h 30min restantes"
  },
  {
    id: 4,
    produto: "Copo da Felicidade",
    equipe: "Equipe C",
    quantidadeTotal: 120,
    quantidadeFeita: 0,
    status: "NA FILA",
    tempoEstimado: "iniciar às 14h00"
  },
  {
    id: 5,
    produto: "Bolo de Chocolate 1kg",
    equipe: "Equipe B",
    quantidadeTotal: 30,
    quantidadeFeita: 0,
    status: "NA FILA",
    tempoEstimado: "Iniciar às 15h30"
  },
];

class ProducaoController {
  async index(req, res) {
    return res.json({
      kpis: {
        metaDia: { produzido: 1420, metaTotal: 1500, percentualConcluido: 87 },
        ordensAtivas: { total: 5, emAndamento: 2, naFila: 2, concluidas: 1 },
        perdasHoje: { percentual: 2.1, dentroDoEsperado: true }
      },
      fila: ordensMock
    });
  }

  async criar(req, res) {
    const { produto, equipe, quantidadeTotal, tempoEstimado } = req.body;
    const novaOrdem = {
      id: ordensMock.length + 1,
      produto,
      equipe,
      quantidadeTotal: Number(quantidadeTotal),
      quantidadeFeita: 0,
      status: "NA_FILA",
      tempoEstimado: tempoEstimado || "A iniciar"
    };
    ordensMock.push(novaOrdem);
    return res.status(201).json(novaOrdem);
  }

  async atualizarStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    
    const ordem = ordensMock.find(o => o.id === Number(id));
    if (!ordem) return res.status(404).json({ error: "Ordem não encontrada" });

    ordem.status = status;
    if (status === "CONCLUIDO") ordem.quantidadeFeita = ordem.quantidadeTotal;

    return res.json(ordem);
  }
}

module.exports = new ProducaoController();