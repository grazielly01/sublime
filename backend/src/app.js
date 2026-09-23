require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importação das rotas
const routes = require('./routes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const estoqueRoutes = require('./routes/estoqueRoutes');

const app = express();

// 1. Middlewares globais
app.use(cors());          // Permite requisições de outros domínios (Frontend)
app.use(express.json());  // Permite interpretar requisições com corpo em JSON

// 2. Rota raiz de teste
app.get('/', (req, res) => {
  res.json({
    mensagem: 'API DO SUBLIME FUNCIONANDO!'
  });
});

// 3. Registro de rotas com prefixos (Prática recomendada)
app.use('/usuarios', usuarioRoutes);
app.use('/estoque', estoqueRoutes);
app.use(routes);

// 4. Inicialização do servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});