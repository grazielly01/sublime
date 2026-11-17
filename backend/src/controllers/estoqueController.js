// Array que simula a tabela do banco de dados no Node.js - ADICIONADO CATEGORIA
let insumosMock = [
  {
    id: 1,
    nome: "Chocolate ao leite Callebaut 80g",
    categoria: "Cacau e chocolates", 
    lote: "LT-0421",
    quantidade: 52,
    minimo: 15,
    validade: "2026-12-08T00:00:00.000Z",
    custo: 78.50
  },
  {
    id: 2,
    nome: "Farinha de trigo especial 300g",
    categoria: "Farinhas e massas", 
    lote: "LT-0425",
    quantidade: 2,
    minimo: 6,
    validade: "2026-11-30T00:00:00.000Z",
    custo: 142.00
  }
];

class EstoqueController {
  // GET /estoque
  async listar(req, res) {
    let abaixoDoMinimoCount = 0;

    const resultado = insumosMock.map((item) => {
      const precisaRepor = item.quantidade <= item.minimo;
      if (precisaRepor) abaixoDoMinimoCount++;

      return {
        ...item,
        status: precisaRepor ? "Repor" : "OK" // Retorna exatamente "Repor" ou "OK"
      };
    });

    return res.json({
      abaixoDoMinimoCount,
      total: resultado.length,
      data: resultado
    });
  }

  // POST /estoque
  async criar(req, res) {
    // Adicionado 'categoria' na desestruturação
    const { nome, categoria, lote, quantidade, minimo, validade, custo } = req.body;

    const novoItem = {
      id: insumosMock.length + 1,
      nome,
      categoria: categoria || "Outros", // <-- Salva a categoria enviada ou joga em "Outros"
      lote,
      quantidade: Number(quantidade),
      minimo: Number(minimo),
      validade,
      custo: Number(custo)
    };

    insumosMock.push(novoItem);

    return res.status(201).json(novoItem);
  }
}

module.exports = new EstoqueController();
