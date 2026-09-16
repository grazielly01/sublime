const sequelize = require("./database");

async function testarConexao() {
    try {
        await sequelize.authenticate();

        console.log("Conexão com o banco funcionando!");
    } catch (erro) {
        console.error("Erro ao conectar:", erro.message);
    } finally {
        await sequelize.close();
    }
}

testarConexao();