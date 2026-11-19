//Calcula o fluxo de caixa

function calcularFluxoCaixa(movimentacoes = []) {
  const entradas = movimentacoes.filter(
    item => item.tipo === 'entrada'
  );

  const saidas = movimentacoes.filter(
    item => item.tipo === 'saida'
  );

  const totalEntradas = entradas.reduce(
    (total, item) => total + Number(item.valor), 0
  );

  const totalSaidas = saidas.reduce(
    (total, item) => total + Number(item.valor), 0
  );
  const despesasFixas = saidas
    .filter(item => item.categoriaDespesa === 'fixa')
    .reduce((total, item) => total + Number(item.valor), 0);

  const despesasVariaveis = saidas
    .filter(item => item.categoriaDespesa === 'variavel')
    .reduce((total, item) => total + Number(item.valor), 0);

  const saldoFinal = totalEntradas - totalSaidas;

  return {
    totalEntradas,
    totalSaidas,
    saldoFinal,
    despesasFixas,
    despesasVariaveis,
    quantidadeEntradas: entradas.length,
    quantidadeSaidas: saidas.length
  };
}

module.exports = { calcularFluxoCaixa };
