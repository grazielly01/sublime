const prisma = require('../lib/prisma');

class caixaController {
  // Método para criar uma nova transação (Entrada ou Saída)
  async create(req, res) {
    try {
      const { description, amount, type, categoryId, date } = req.body;

      // Validação simples dos campos obrigatórios
      if (!description || !amount || !type || !date) {
        return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
      }

      // Regista a transação na base de dados
      const caixa = await prisma.caixa.create({
        data: {
          description,
          amount: parseFloat(amount), // Garante que é enviado como número decimal
          type,                       // 'INCOME' ou 'EXPENSE'
          categoryId: categoryId || null,
          date: new Date(date),       // Converte a string de data para objeto Date
        },
      });

      // Retorna a transação criada com código HTTP 201 (Created)
      return res.status(201).json(transaction);
    } catch (error) {
      console.error('Erro no caixaController:', error);
      return res.status(500).json({ error: 'Erro ao registrar a transação.' });
    }
  }
}

module.exports = new caixaController();