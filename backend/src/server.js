const app = require('./app');

const PORT = process.env.PORT || 3000;

// O servidor só abre a escuta localmente; no Vercel ele é executado sob demanda
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Servidor a rodar na porta ${PORT}`);
  });
}

module.exports = app;