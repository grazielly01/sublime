// Array de objetos simulando o banco/estoque de insumos
const insumo = [
  {
    nome: "Seda Rosa",
    lote: "L01",
    quantidade: 5,
    minimo: 10,
    validade: "2026-12-31",
    custo: 15.50,
  },
  {
    nome: "Embalagem P",
    lote: "L02",
    quantidade: 50,
    minimo: 20,
    validade: "2027-01-01",
    custo: 2.00,
  }
];

class EstoqueController {
  // Nome do método ajustado para "listar" (compatível com a rota)
  async listar(req, res) {
    const resultado = [];

    for (let i = 0; i < insumo.length; i++) {
      let status = "ok";

      if (insumo[i].quantidade <= insumo[i].minimo) {
        status = "repor";
      }

      resultado.push({
        nome: insumo[i].nome,
        lote: insumo[i].lote,
        quantidade: insumo[i].quantidade,
        minimo: insumo[i].minimo,
        validade: insumo[i].validade,
        custo: insumo[i].custo,
        status: status
      });
    }

    return res.json(resultado);
  }
}

// Agora sim a instância da classe é exportada corretamente!
module.exports = new EstoqueController();