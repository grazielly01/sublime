
const transacoes = require('../data/transacoes');

class FluxoController {

  async getFluxoData(req, res) {
    try {
      const month = Number(req.query.month) || new Date().getMonth() + 1;
      const year = Number(req.query.year) || new Date().getFullYear();

      if (
        !Number.isInteger(month) || month < 1 || month > 12 ||
        !Number.isInteger(year) || year < 1
      ) {
        return res.status(400).json({
          error: 'Mês ou ano inválido.'
        });
      }

      // Filtrar transações do mês
      const monthTransactions = transacoes.getAll().filter(t => {
        const [ano, mes] = t.date.split('-').map(Number);
        return ano === year && mes === month;
      });

      // KPIs
      let totalIncome = 0;
      let totalExpenses = 0;

      monthTransactions.forEach(t => {
        if (t.type === 'INCOME') {
          totalIncome += t.amount;
        } else if (t.type === 'EXPENSE') {
          totalExpenses += t.amount;
        }
      });

      const netProfit = totalIncome - totalExpenses;

      const profitMargin = totalIncome > 0
        ? Number(((netProfit / totalIncome) * 100).toFixed(1))
        : 0;

      // Movimentações recentes do mês
      const recentTransactions = [...monthTransactions]
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 5);

      // Maiores despesas do mês
      const topExpenses = monthTransactions
        .filter(t => t.type === 'EXPENSE')
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5);

      // Despesas fixas e variáveis
      const fixedList = monthTransactions
        .filter(t => t.type === 'EXPENSE' && t.category === 'FIXED');

      const variableList = monthTransactions
        .filter(t => t.type === 'EXPENSE' && t.category === 'VARIABLE');

      const totalFixed = fixedList.reduce((sum, t) => sum + t.amount, 0);

      const totalVariable = variableList.reduce((sum, t) => sum + t.amount, 0);

      const totalCategoryExpenses = totalFixed + totalVariable;

      // Gráfico: entradas e saídas por dia
      const daysInMonth = new Date(year, month, 0).getDate();

      const chart = {
        labels: [],
        income: [],
        expenses: [],
        balance: []
      };

      let accumulatedBalance = 0;

      for (let day = 1; day <= daysInMonth; day++) {
        const dayTransactions = monthTransactions.filter(t => {
          const dia = Number(t.date.split('-')[2]);
          return dia === day;
        });

        const income = dayTransactions
          .filter(t => t.type === 'INCOME')
          .reduce((sum, t) => sum + t.amount, 0);

        const expenses = dayTransactions
          .filter(t => t.type === 'EXPENSE')
          .reduce((sum, t) => sum + t.amount, 0);

        accumulatedBalance += income - expenses;

        chart.labels.push(day);
        chart.income.push(income);
        chart.expenses.push(expenses);
        chart.balance.push(accumulatedBalance);
      }

      // Resposta
      return res.json({
        period: { month, year },

        kpis: {
          totalIncome,
          totalExpenses,
          netProfit,
          profitMargin,
          finalBalance: netProfit
        },

        chart,

        recentTransactions,

        topExpenses,

        expensesBreakdown: {
          totals: {
            fixed: totalFixed,
            variable: totalVariable,

            fixedPercentage: totalCategoryExpenses > 0
              ? Number(((totalFixed / totalCategoryExpenses) * 100).toFixed(1))
              : 0,

            variablePercentage: totalCategoryExpenses > 0
              ? Number(((totalVariable / totalCategoryExpenses) * 100).toFixed(1))
              : 0
          },

          fixedList,
          variableList
        }
      });

    } catch (error) {
      console.error('Erro no FluxoController:', error);

      return res.status(500).json({
        error: 'Erro ao carregar dados do fluxo de caixa.'
      });
    }
  }
}

module.exports = new FluxoController();
