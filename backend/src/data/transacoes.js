
let transacoes = [];
let proximoId = 1;

function getAll() {
  return transacoes.map(t => ({ ...t }));
}

function getById(id) {
  const t = transacoes.find(t => t.id === Number(id));
  return t ? { ...t } : null;
}

function add(dados) {
  const novaTransacao = {
    id: proximoId++,
    description: dados.description,
    amount: Number(dados.amount),
    type: dados.type,
    category: dados.category || null,
    date: dados.date
  };

  transacoes.push(novaTransacao);
  return { ...novaTransacao };
}

function update(id, dados) {
  const index = transacoes.findIndex(t => t.id === Number(id));

  if (index === -1) return null;

  transacoes[index] = {
    ...transacoes[index],
    ...dados,
    id: transacoes[index].id
  };

  return { ...transacoes[index] };
}

function remove(id) {
  const index = transacoes.findIndex(t => t.id === Number(id));

  if (index === -1) return false;

  transacoes.splice(index, 1);
  return true;
}

function clear() {
  transacoes = [];
  proximoId = 1;
  return true;
}

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
  clear
};
