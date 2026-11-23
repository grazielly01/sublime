
const API_URL = "http://localhost:3000/dashboard";

export async function buscarDashboard() {
  const resposta = await fetch(API_URL);

  const resultado = await resposta.json();

  if (!resposta.ok || !resultado.sucesso) {
    throw new Error(resultado.mensagem || "Não foi possível carregar o Dashboard.");
  }

  return resultado.dados;
}

export async function salvarMetas(metas) {
  const resposta = await fetch(`${API_URL}/metas`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ metas })
  });

  const resultado = await resposta.json();

  if (!resposta.ok || !resultado.sucesso) {
    throw new Error(resultado.mensagem || "Não foi possível atualizar as metas.");
  }

  return resultado.dados;
}
