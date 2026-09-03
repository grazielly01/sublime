const express = require('express');
const cors = require('cors');

// 1. PRIMEIRO: Importe as rotas antes de usá-las
const usuarioRoutes = require("./routes/usuarioRoutes");

const app = express();

// 2. Middlewares essenciais
app.use(cors()); // Libera o CORS para qualquer origem
app.use(express.json()); // Habilita o recebimento de JSON

// 3. Registre as rotas da aplicação
app.use(usuarioRoutes);

// 4. Rota raiz de teste
app.get("/", (req, res) => {
  res.json({
    mensagem: "API DO SUBLIME FUNCIONANDO!"
  });
});

// 5. ULTIMA LINHA: Exportação FORA de qualquer rota/função
module.exports = app;