
// Array que simula a tabela do banco de dados
let insumosMock = [
  {
    id: 1,
    nome: "Chocolate ao leite Callebaut 80g",
    categoria: "Cacau e chocolates",
    lote: "LT-0421",
    quantidade: 200,
    minimo: 250,
    validade: "2026-12-08T00:00:00.000Z",
    custo: 78.50
  },
  {
    id: 2,
    nome: "Açúcar refinado 2kg",
    categoria: "Doces",
    lote: "LT-0419",
    quantidade: 180,
    minimo: 120,
    validade: "2026-11-30T00:00:00.000Z",
    custo: 142.00
  },
  {
    id: 3,
    nome: "Leite Condensado Moça",
    categoria: "Laticínios",
    lote: "LT-0425",
    quantidade: 120,
    minimo: 100,
    validade: "2026-11-30T00:00:00.000Z",
    custo: 142.00
  },
  {
    id: 4,
    nome: "Ovos brancos tipo extra 12unid",
    categoria: "Ovos e derivados",
    lote: "LT-0426",
    quantidade: 104,
    minimo: 60,
    validade: "2026-11-30T00:00:00.000Z",
    custo: 0.55
  },
  {
    id: 5,
    nome: "Creme de leite UHT 400ml",
    categoria: "Laticínios",
    lote: "LT-0427",
    quantidade: 80,
    minimo: 90,
    validade: "2026-11-30T00:00:00.000Z",
    custo: 4.20
  },
  {
    id: 6,
    nome: "Farinha de trigo especial 300g",
    categoria: "Farinhas e massas",
    lote: "LT-0428",
    quantidade: 200,
    minimo: 100,
    validade: "2026-11-30T00:00:00.000Z",
    custo: 142.00
  },
  {
    id: 7,
    nome: "Açucar mascavo 300g",
    categoria: "Farinhas e massas",
    lote: "LT-0429",
    quantidade: 60,
    minimo: 40,
    validade: "2026-11-30T00:00:00.000Z",
    custo: 142.00
  },
  {
    id: 8,
    nome: "Chocolate branco callebaut 300g",
    categoria: "Cacau e chocolates",
    lote: "LT-0430",
    quantidade: 45,
    minimo: 20,
    validade: "2026-11-30T00:00:00.000Z",
    custo: 142.00
  },
  {
    id: 9,
    nome: "Fermento especial 300g",
    categoria: "Fermentos",
    lote: "LT-0431",
    quantidade: 100,
    minimo: 50,
    validade: "2026-11-30T00:00:00.000Z",
    custo: 142.00
  },
  {
    id: 10,
    nome: "Óleo Vegetal 300ml",
    categoria: "Gorduras/óleos",
    lote: "LT-0432",
    quantidade: 10,
    minimo: 6,
    validade: "2026-11-30T00:00:00.000Z",
    custo: 142.00
  },
  {
    id: 11,
    nome: "Morango congelado 300g",
    categoria: "Frutas",
    lote: "LT-0432",
    quantidade: 30,
    minimo: 15,
    validade: "2026-11-30T00:00:00.000Z",
    custo: 142.00
  },
  {
    id: 12,
    nome: "Granulado TOP 400g",
    categoria: "Confeitos e finalizações",
    lote: "LT-0432",
    quantidade: 20,
    minimo: 15,
    validade: "2026-11-30T00:00:00.000Z",
    custo: 142.00
  },
  {
    id: 13,
    nome: "Essência de baunilha 30ml",
    categoria: "Essências e aromatizantes",
    lote: "LT-0432",
    quantidade: 10,
    minimo: 15,
    validade: "2026-11-30T00:00:00.000Z",
    custo: 142.00
  },
  {
    id: 14,
    nome: "Corante ARCOLOR 10ml",
    categoria: "Corantes",
    lote: "LT-0432",
    quantidade: 25,
    minimo: 15,
    validade: "2026-11-30T00:00:00.000Z",
    custo: 142.00
  },
  {
    id: 15,
    nome: "Embalagem para Torta Redonda Alta S-50 ",
    categoria: "Embalagens",
    lote: "LT-0432",
    quantidade: 10,
    minimo: 15,
    validade: "2026-11-30T00:00:00.000Z",
    custo: 142.00
  },
  {
    id: 16,
    nome: "Bicos de confeitar",
    categoria: "Decorações",
    lote: "LT-0432",
    quantidade: 30,
    minimo: 15,
    validade: "2026-11-30T00:00:00.000Z",
    custo: 142.00
  },
  {
    id: 17,
    nome: "Palitos de madeira",
    categoria: "Outros",
    lote: "LT-0432",
    quantidade: 10,
    minimo: 15,
    validade: "2026-11-30T00:00:00.000Z",
    custo: 142.00
  }
];

let proximoId = Math.max(...insumosMock.map(item => item.id)) + 1;

class EstoqueController {

  // GET /estoque
  async listar(req, res) {
    const resultado = insumosMock.map(item => {
      const precisaRepor =
        Number(item.quantidade) <= Number(item.minimo);

      return {
        ...item,
        status: precisaRepor ? "Repor" : "OK"
      };
    });

    const abaixoDoMinimoCount = resultado.filter(
      item => item.status === "Repor"
    ).length;

    return res.json({
      abaixoDoMinimoCount,
      total: resultado.length,
      data: resultado
    });
  }

  // POST /estoque
  async criar(req, res) {
    try {
      const {
        nome,
        categoria,
        lote,
        quantidade,
        minimo,
        validade,
        custo
      } = req.body;

      if (
        !nome ||
        !lote ||
        !validade ||
        quantidade === undefined ||
        minimo === undefined ||
        custo === undefined
      ) {
        return res.status(400).json({
          mensagem: "Preencha todos os campos obrigatórios."
        });
      }

      const novoItem = {
        id: proximoId++,
        nome,
        categoria: categoria || "Outros",
        lote,
        quantidade: Number(quantidade),
        minimo: Number(minimo),
        validade,
        custo: Number(custo)
      };

      insumosMock.push(novoItem);

      return res.status(201).json(novoItem);

    } catch (erro) {
      return res.status(500).json({
        mensagem: "Erro ao cadastrar insumo."
      });
    }
  }

  // PUT /estoque/:id
  async atualizar(req, res) {
    try {
      const id = Number(req.params.id);

      const indice = insumosMock.findIndex(
        item => item.id === id
      );

      if (indice === -1) {
        return res.status(404).json({
          mensagem: "Insumo não encontrado."
        });
      }

      const dados = req.body;

      insumosMock[indice] = {
        ...insumosMock[indice],
        ...dados,
        id,
        quantidade:
          dados.quantidade !== undefined
            ? Number(dados.quantidade)
            : insumosMock[indice].quantidade,
        minimo:
          dados.minimo !== undefined
            ? Number(dados.minimo)
            : insumosMock[indice].minimo,
        custo:
          dados.custo !== undefined
            ? Number(dados.custo)
            : insumosMock[indice].custo
      };

      return res.json({
        mensagem: "Insumo atualizado com sucesso!",
        data: insumosMock[indice]
      });

    } catch (erro) {
      return res.status(500).json({
        mensagem: "Erro ao atualizar insumo."
      });
    }
  }

  // DELETE /estoque/:id
  async excluir(req, res) {
    try {
      const id = Number(req.params.id);

      const indice = insumosMock.findIndex(
        item => item.id === id
      );

      if (indice === -1) {
        return res.status(404).json({
          mensagem: "Insumo não encontrado."
        });
      }

      insumosMock.splice(indice, 1);

      return res.json({
        mensagem: "Insumo excluído com sucesso!"
      });

    } catch (erro) {
      return res.status(500).json({
        mensagem: "Erro ao excluir insumo."
      });
    }
  }
}

module.exports = new EstoqueController();
