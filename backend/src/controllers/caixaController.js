
const transacoes = require('../data/transacoes');

class CaixaController {

  // Cadastrar entrada ou saída
  async create(req, res) {
    try {
      const {
        description,
        amount,
        type,
        category,
        date
      } = req.body;

      if (
        !description ||
        amount === undefined ||
        amount === null ||
        !type ||
        !date
      ) {
        return res.status(400).json({
          error: 'Preencha todos os campos obrigatórios.'
        });
      }

      const valor = Number(amount);

      if (!Number.isFinite(valor) || valor <= 0) {
        return res.status(400).json({
          error: 'Informe um valor válido maior que zero.'
        });
      }

      if (!['INCOME', 'EXPENSE'].includes(type)) {
        return res.status(400).json({
          error: 'Tipo de transação inválido.'
        });
      }

      if (
        type === 'EXPENSE' &&
        !['FIXED', 'VARIABLE'].includes(category)
      ) {
        return res.status(400).json({
          error: 'Informe uma categoria válida.'
        });
      }

      const dataValida =
        /^\d{4}-\d{2}-\d{2}$/.test(date) &&
        !Number.isNaN(Date.parse(`${date}T00:00:00`)) &&
        new Date(`${date}T00:00:00`).toISOString().slice(0, 10) === date;

      if (!dataValida) {
        return res.status(400).json({
          error: 'Data da transação inválida.'
        });
      }

      const caixa = transacoes.add({
        description: description.trim(),
        amount: valor,
        type,
        category: type === 'EXPENSE' ? category : null,
        date
      });

      return res.status(201).json({
        message: 'Transação registrada com sucesso!',
        transaction: caixa
      });

    } catch (error) {
      console.error('Erro no caixaController:', error);

      return res.status(500).json({
        error: 'Erro ao registrar a transação.'
      });
    }
  }

  // Listar transações
  async getAll(req, res) {
    return res.json(transacoes.getAll());
  }

  // Buscar por ID
  async getById(req, res) {
    const caixa = transacoes.getById(req.params.id);

    if (!caixa) {
      return res.status(404).json({
        error: 'Transação não encontrada.'
      });
    }

    return res.json(caixa);
  }

  // Excluir transação
  async delete(req, res) {
    const removida = transacoes.remove(req.params.id);

    if (!removida) {
      return res.status(404).json({
        error: 'Transação não encontrada.'
      });
    }

    return res.json({
      message: 'Transação excluída com sucesso!'
    });
  }
}

module.exports = new CaixaController();
