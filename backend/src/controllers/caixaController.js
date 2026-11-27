const prisma = require('../config/database');

function formatarTransacaoEntrada(item) {
  return {
    id: `entrada-${item.id_entrada}`,
    numericId: item.id_entrada,
    source: 'entradas',
    description: item.nome_entrada || 'Entrada',
    amount: Number(item.valor_entrada || 0),
    type: 'INCOME',
    category: null,
    date: item.data_entrada ? item.data_entrada.toISOString().slice(0, 10) : null,
    observation: item.obs_entrada,
    comprovante: item.comprovante_entrada
  };
}

function formatarTransacaoSaida(item) {
  return {
    id: `saida-${item.id_saida}`,
    numericId: item.id_saida,
    source: 'saidas',
    description: item.nome_saida || 'Saída',
    amount: Number(item.valor_saida || 0),
    type: 'EXPENSE',
    category: item.tipo_saida === 'fixa' ? 'FIXED' : 'VARIABLE',
    date: item.data_saida ? item.data_saida.toISOString().slice(0, 10) : null,
    observation: item.obs_saida,
    comprovante: item.comprovante_saida
  };
}

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

     if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  return res.status(400).json({
    error: 'Data da transação inválida.'
  });
}

        if (type === 'INCOME') {
        const item = await prisma.entradas.create({
          data: {
            nome_entrada: description.trim(),
            data_entrada: new Date(`${date}T00:00:00`),
            categoria_entrada: category || null,
            valor_entrada: valor
          }
        });
        return res.status(201).json({
          message: 'Transação registrada com sucesso!',
          transaction: formatarTransacaoEntrada(item)
        });
      }

        if (type === 'EXPENSE') {
        if (!['FIXED', 'VARIABLE'].includes(category)) {
          return res.status(400).json({
            error: 'Informe uma categoria válida.'
          });
        }

        const item = await prisma.saidas.create({
          data: {
            nome_saida: description.trim(),
            data_saida: new Date(`${date}T00:00:00`),
           tipo_saida: category === 'FIXED' ? 'fixa' : 'variável',
            valor_saida: valor
          }
        });
        return res.status(201).json({
          message: 'Transação registrada com sucesso!',
          transaction: formatarTransacaoSaida(item)
        });
      }

      return res.status(400).json({
        error: 'Tipo de transação inválido.'
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

 try {
      const [entradas, saidas] = await Promise.all([
        prisma.entradas.findMany({ orderBy: { id_entrada: 'desc' } }),
        prisma.saidas.findMany({ orderBy: { id_saida: 'desc' } })
      ]);

      const transacoes = [
        ...entradas.map(formatarTransacaoEntrada),
        ...saidas.map(formatarTransacaoSaida)
      ].sort((a, b) => (b.date || '').localeCompare(a.date || ''));

      return res.json(transacoes);
    } catch (error) {
      console.error('Erro ao listar caixa:', error);
      return res.status(500).json({ error: 'Erro ao carregar transações do banco de dados.' });
    }
  }

  // Buscar por ID
  async getById(req, res) {
    try {
      const rawId = String(req.params.id);
      const [source, id] = rawId.includes('-') ? rawId.split('-') : ['', 
        rawId];

       if (source === 'entrada') {
        const item = await prisma.entradas.findUnique({ where: { id_entrada: Number(id) } });
        return item ? res.json(formatarTransacaoEntrada(item)) : res.status(404).json({ error: 'Transação não encontrada.' });
      }

      if (source === 'saida') {
        const item = await prisma.saidas.findUnique({ where: { id_saida: Number(id) } });
        return item ? res.json(formatarTransacaoSaida(item)) : res.status(404).json({ error: 'Transação não encontrada.' });
      }

      const numericId = Number(rawId);
      const entrada = await prisma.entradas.findUnique({ where: { 
        id_entrada: numericId } });
      if (entrada) return res.json(formatarTransacaoEntrada(entrada));
      const saida = await prisma.saidas.findUnique({ where: { id_saida:
      numericId } });
      return saida ? res.json(formatarTransacaoSaida(saida)) : res.status(404).json({ error: 'Transação não encontrada.' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar transação.' 

      });
    }
  }

  // Excluir transação
  async delete(req, res) {
      try {
      const rawId = String(req.params.id);
      const [source, id] = rawId.includes('-') ? rawId.split('-') : ['', rawId];

      if (source === 'entrada') {
        await prisma.entradas.delete({ where: { id_entrada: Number(id) } });
      } else if (source === 'saida') {
        await prisma.saidas.delete({ where: { id_saida: Number(id) } });
      } else {
        const numericId = Number(rawId);
        try {
          await prisma.entradas.delete({ where: { id_entrada: numericId } });
        } catch {
          await prisma.saidas.delete({ where: { id_saida: numericId } });
        }
      }

        return res.json({ message: 'Transação excluída com sucesso!' });
    } catch (error) {
      if (error?.code === 'P2025') return res.status(404).json({ error: 'Transação não encontrada.' });
      return res.status(500).json({ error: 'Erro ao excluir transação.' });
    }
    }
}