require("dotenv").config();

const app = require("./app");
const sequelize = require("../database");

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
.then(() => {
    console.log("Banco conectado com sucesso!");
    app.listen(PORT,() => {
   console.log(`Servidor rodando na porta ${PORT}`);

});
})

.catch((error) => {
console.error("ERRO AO CONECTAR COM O BANCO:", error);
});