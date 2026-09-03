const express = require("express");
const usuarioRoutes = require("./routes/usuarioRoutes");

const app = express();

// O express.json() OBRIGATORIAMENTE precisa vir antes das rotas
app.use(express.json()); // commit

// Ativa as suas rotas de usuário
app.use(usuarioRoutes);

// Rota raiz para testar se a API está viva
app.get("/", (req, res) => {
  res.json({
    mensagem: "API DO SUBLIME FUNCIONANDO!" //http://localhost:300n0/
  });
});

module.exports = app;
