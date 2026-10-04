require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

// Esta instrução segura o processo do Node ativo:
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});