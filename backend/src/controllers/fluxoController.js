const prisma = require('../config/database');

class FluxoController {
  async getFluxoData(req, res) {
    try {
      const month = Number(req.query.month) || new Date().getMonth() + 1;
      const year = Number(req.query.year) || new Date().getFullYear();

      if (!Number.isInteger(month) || month < 1 || month > 12 || !Number.isInteger(year) || year < 1) {
        return res.status(400).json({ error: 'Mês ou ano inválido.' });
      }

      const inicio = new Date(year, month - 1, 1);
      const fim = new Date(year, month, 1);

      const [entradas, saidas] = await Promise.all([
        prisma.entradas.findMany({
          where: { data_entrada: { gte: inicio, lt: fim } },
          orderBy: { data_entrada: 'desc' }
        }),
        prisma.saidas.findMany({
          where: { data_saida: { gte: inicio, lt: fim } },
          orderBy: { data_saida: 'desc' }
        })
      ]);

      const monthTransactions = [
        ...entradas.map((item) => ({
          id: `entrada-${item.id_entrada}`,
          description: item.nome_entrada || 'Entrada',
          amount: Number(item.valor_entrada || 0),
          type: 'INCOME',
          category: null,
          date: item.data_entrada.toISOString().slice(0, 10)
        })),
        ...saidas.map((item) => ({
          id: `saida-${item.id_saida}`,
          description: item.nome_saida || 'Saída',
          amount: Number(item.valor_saida || 0),
          type: 'EXPENSE',
          category: item.tipo_saida === 'fixa' ? 'FIXED' : 'VARIABLE',
          date: item.data_saida.toISOString().slice(0, 10)
        }))
      ];

      const totalIncome = monthTransactions
        .filter((transaction) => transaction.type === 'INCOME')
        .reduce((sum, transaction) => sum + transaction.amount, 0);
      const totalExpenses = monthTransactions
        .filter((transaction) => transaction.type === 'EXPENSE')
        .reduce((sum, transaction) => sum + transaction.amount, 0);
      const netProfit = totalIncome - totalExpenses;
      const profitMargin = totalIncome > 0
        ? Number(((netProfit / totalIncome) * 100).toFixed(1))
        : 0;

      const recentTransactions = [...monthTransactions]
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 5);
      const topExpenses = monthTransactions
        .filter((transaction) => transaction.type === 'EXPENSE')
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5);
      const fixedList = monthTransactions.filter((transaction) => transaction.type === 'EXPENSE' && transaction.category === 'FIXED');
      const variableList = monthTransactions.filter((transaction) => transaction.type === 'EXPENSE' && transaction.category === 'VARIABLE');
      const totalFixed = fixedList.reduce((sum, transaction) => sum + transaction.amount, 0);
      const totalVariable = variableList.reduce((sum, transaction) => sum + transaction.amount, 0);
      const totalCategoryExpenses = totalFixed + totalVariable;

      const chart = { labels: [], income: [], expenses: [], balance: [] };
      let accumulatedBalance = 0;
      const daysInMonth = new Date(year, month, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const dayTransactions = monthTransactions.filter((transaction) => Number(transaction.date.split('-')[2]) === day);
        const income = dayTransactions.filter((transaction) => transaction.type === 'INCOME').reduce((sum, transaction) => sum + transaction.amount, 0);
        const expenses = dayTransactions.filter((transaction) => transaction.type === 'EXPENSE').reduce((sum, transaction) => sum + transaction.amount, 0);
        accumulatedBalance += income - expenses;
        chart.labels.push(day);
        chart.income.push(income);
        chart.expenses.push(expenses);
        chart.balance.push(accumulatedBalance);
      }

      return res.json({
        period: { month, year },
        kpis: { totalIncome, totalExpenses, netProfit, profitMargin, finalBalance: netProfit },
        chart,
        recentTransactions,
        topExpenses,
        expensesBreakdown: {
          totals: {
            fixed: totalFixed,
            variable: totalVariable,
            fixedPercentage: totalCategoryExpenses > 0 ? Number(((totalFixed / totalCategoryExpenses) * 100).toFixed(1)) : 0,
            variablePercentage: totalCategoryExpenses > 0 ? Number(((totalVariable / totalCategoryExpenses) * 100).toFixed(1)) : 0
          },
          fixedList,
          variableList
        }
      });
    } catch (error) {
      console.error('Erro no FluxoController:', error);
      return res.status(500).json({ error: 'Erro ao carregar dados do fluxo de caixa.' });
    }
  }
}

module.exports = new FluxoController();
