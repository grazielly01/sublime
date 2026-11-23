// Importa a conexão com o banco de dados
//const db = require("../config/database");

// Busca os totais que aparecem nos cards da Visão Geral
async function obterResumoKpis(req, res) {
    try {
        // Usa a versão com Promises quando o database.js disponibiliza esse recurso
        const conexao = typeof db.promise === "function" ? db.promise() : db;

        // Busca os status de todos os pedidos cadastrados
        const [pedidos] = await conexao.query("SELECT status FROM pedidos");

        // Busca os status de todos os insumos cadastrados
        const [insumos] = await conexao.query("SELECT status FROM insumos");

        // Conta apenas os pedidos que ainda estão abertos
        const pedidosAbertos = pedidos.filter((pedido) => {
            // Padroniza o status para comparar com os códigos usados no sistema
            const status = String(pedido.status || "")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .trim()
                .toUpperCase()
                .replace(/\s+/g, "_");

            // Aguardando, Em produção e Pronto continuam sendo pedidos abertos
            return ["AGUARDANDO", "EM_PRODUCAO", "PRONTO"].includes(status);
        }).length;

        // Conta quantos insumos estão com o status Repor
        const itensEmBaixa = insumos.filter((insumo) => {
            // Compara ignorando diferenças entre maiúsculas e minúsculas
            return String(insumo.status || "").trim().toUpperCase() === "REPOR";
        }).length;

        // Devolve os dois números para o frontend
        return res.status(200).json({
            data: {
                pedidosAbertos,
                itensEmBaixa
            }
        });

    } catch (erro) {
        // Mostra o erro no terminal do backend para facilitar a identificação
        console.error("Erro ao buscar os indicadores da Visão Geral:", erro);

        // Informa ao frontend que não foi possível carregar os números
        return res.status(500).json({
            message: "Não foi possível carregar os indicadores da Visão Geral."
        });
    }
}

// Exporta a função para ser utilizada na rota do dashboard
module.exports = { obterResumoKpis };