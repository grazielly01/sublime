const express = require('express');
const cors = require('cors');
const sequelize = require("./config/database");
const router = express.Router();

// 1. PRIMEIRO: Importe as rotas antes de usá-las

const usuarioRoutes = require("./routes/usuarioRoutes");
const estoqueRoutes = require("./routes/estoqueRoutes");
const app = express();

// 2. Middlewares essenciais

app.use(cors()); // Libera o CORS para qualquer origem
app.use(express.json()); // Habilita o recebimento de JSON

// 3. Registre as rotas da aplicação

app.use(estoqueRoutes); 
app.use(usuarioRoutes);


// 4. Rota raiz de teste

app.get("/", (req, res) => {
  res.json({
    mensagem: "API DO SUBLIME FUNCIONANDO!"
  });
});

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

// 5. ULTIMA LINHA: Exportação FORA de qualquer rota/função

module.exports = router; 