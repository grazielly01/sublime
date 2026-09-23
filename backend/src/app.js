require('dotenv').config();
const express = require('express');
const cors = require('cors');

const usuarioRoutes = require('./routes/usuarioRoutes');
const estoqueRoutes = require('./routes/estoqueRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'API DO SUBLIME FUNCIONANDO!' });
});

app.use('/usuarios', usuarioRoutes);
app.use('/estoque', estoqueRoutes);
app.use('/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 3000;

// Esta instrução segura o processo do Node ativo:
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});