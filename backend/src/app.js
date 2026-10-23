const express = require('express');
const cors = require('cors');

// Importação das rotas
const usuarioRoutes = require('./routes/usuarioRoutes');
const estoqueRoutes = require('./routes/estoqueRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const producaoRoutes = require('./routes/producaoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes'); 

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota raiz / teste
app.get('/', (req, res) => {
  res.json({ mensagem: 'API DO SUBLIME FUNCIONANDO!' });
});

// Registo das rotas da aplicação
app.use('/usuarios', usuarioRoutes);
app.use('/estoque', estoqueRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/producao', producaoRoutes);
app.use('/pedidos', pedidoRoutes); 

// Exporta a aplicação configurada
module.exports = app;