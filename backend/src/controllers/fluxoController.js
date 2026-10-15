// Importamos a instância do Prisma Client configurada
const prisma = require('../lib/prisma');

class fluxoController {
  // Método responsável por procurar e calcular os dados do dashboard
  async getFluxodData(req, res) {
    try {
      // Obtém o mês e ano da query string ou define o mês/ano atual por padrão
      const month = parseInt(req.query.month) || new Date().getMonth() + 1;
      const year = parseInt(req.query.year) || new Date().getFullYear();

      // Cria a data inicial (dia 1 às 00:00:00) e final (último dia do mês às 23:59:59)
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);

      // -----------------------------------------------------------------
      // 1. Procura as transações do mês filtrado com as respetivas categorias
      // -----------------------------------------------------------------
      const monthTransactions = await prisma.transaction.findMany({
        where: {
          date: {
            gte: startDate, // Maior ou igual ao primeiro dia do mês
            lte: endDate,   // Menor ou igual ao último dia do mês
          },
        },
        include: {
          category: true, // Inclui os dados da categoria vinculada
        },
      });

      // -----------------------------------------------------------------
      // 2. Cálculo dos KPIs Principais (Entradas, Saídas, Lucro e Margem)
      // -----------------------------------------------------------------
      let totalIncome = 0;
      let totalExpenses = 0;

      // Percorre as transações do mês para somar entradas e saídas
      monthTransactions.forEach((transaction) => {
        const val = Number(transaction.amount);
        if (transaction.type === 'INCOME') {
          totalIncome += val;
        } else if (transaction.type === 'EXPENSE') {
          totalExpenses += val;
        }
      });

      // Cálculos de Lucro Líquido e Margem de Lucro (%)
      const netProfit = totalIncome - totalExpenses;
      const profitMargin = totalIncome > 0 
        ? Number(((netProfit / totalIncome) * 100).toFixed(1)) 
        : 0;

      // -----------------------------------------------------------------
      // 3. Procura as 5 Movimentações Mais Recentes
      // -----------------------------------------------------------------
      const recentTransactions = await prisma.transaction.findMany({
        take: 5,
        orderBy: { date: 'desc' }, // Mais recentes primeiro
        select: {
          id: true,
          description: true,
          amount: true,
          type: true,
          date: true,
        },
      });

      // -----------------------------------------------------------------
      // 4. Procura as 5 Maiores Despesas Recentes
      // -----------------------------------------------------------------
      const topExpenses = await prisma.transaction.findMany({
        where: { type: 'EXPENSE' },
        take: 5,
        orderBy: { amount: 'desc' }, // Maiores valores primeiro
        select: {
          id: true,
          description: true,
          amount: true,
          date: true,
        },
      });

      // -----------------------------------------------------------------
      // 5. Separação das Despesas em Fixas e Variáveis
      // -----------------------------------------------------------------
      const fixedList = [];
      const variableList = [];
      let totalFixed = 0;
      let totalVariable = 0;

      // Filtra apenas despesas com categoria associada
      monthTransactions
        .filter((t) => t.type === 'EXPENSE' && t.category)
        .forEach((t) => {
          const val = Number(t.amount);
          if (t.category.type === 'FIXED') {
            fixedList.push({ name: t.category.name, amount: val });
            totalFixed += val;
          } else if (t.category.type === 'VARIABLE') {
            variableList.push({ name: t.category.name, amount: val });
            totalVariable += val;
          }
        });

      const totalCategoryExpenses = totalFixed + totalVariable;

      // -----------------------------------------------------------------
      // 6. Envia a resposta organizada para o React (Frontend)
      // -----------------------------------------------------------------
      return res.json({
        kpis: {
          totalIncome,
          totalExpenses,
          netProfit,
          profitMargin,
        },
        recentTransactions: {
          all: recentTransactions.map((t) => ({ ...t, amount: Number(t.amount) })),
          topExpenses: topExpenses.map((t) => ({ ...t, amount: Number(t.amount) })),
        },
        expensesBreakdown: {
          totals: {
            fixed: totalFixed,
            variable: totalVariable,
            fixedPercentage: totalCategoryExpenses > 0 ? Number(((totalFixed / totalCategoryExpenses) * 100).toFixed(1)) : 0,
            variablePercentage: totalCategoryExpenses > 0 ? Number(((totalVariable / totalCategoryExpenses) * 100).toFixed(1)) : 0,
          },
          fixedList,
          variableList,
        },
      });
    } catch (error) {
      console.error('Erro no DashboardController:', error);
      return res.status(500).json({ error: 'Erro ao carregar dados do dashboard.' });
    }
  }
}

// Exporta uma instância única do controller
module.exports = new fluxoController();