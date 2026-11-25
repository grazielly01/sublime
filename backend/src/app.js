
const express = require('express');
const cors = require('cors');

const usuarioRoutes = require('./routes/usuarioRoutes');
const estoqueRoutes = require('./routes/estoqueRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const producaoRoutes = require('./routes/producaoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const alertasRoutes = require('./routes/alertasRoutes');
const caixaRoutes = require('./routes/caixaRoutes');
const visaoGeralRoutes = require('./routes/visaoGeralRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    mensagem: 'API DO SUBLIME FUNCIONANDO!'
  });
});

app.use('/usuarios', usuarioRoutes);
app.use('/estoque', estoqueRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/producao', producaoRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/alertas', alertasRoutes);
app.use('/caixa', caixaRoutes);
app.use('/visaoGeral', visaoGeralRoutes);

module.exports = app;
