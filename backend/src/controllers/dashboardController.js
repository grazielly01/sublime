const DashboardService = require('../services/dashboardService');

class DashboardController {
  static async obterVisaoGeral(req, res) {
    try {
      const dados = await DashboardService.obterDashboard();

      return res.status(200).json({
        sucesso: true,
        dados
      });
    } catch (error) {
      console.error('Erro no dashboard:', error);
      return res.status(500).json({
        sucesso: false,
        mensagem: 'Erro ao carregar o Dashboard.'
      });
    }
  }

  static async atualizarMetas(req, res) {
    try {
      const { metas } = req.body;

      if (!Array.isArray(metas)) {
        return res.status(400).json({
          sucesso: false,
          mensagem: 'Informe uma lista válida de metas.'
        });
      }

      const dados = await DashboardService.atualizarMetas(metas);

      return res.status(200).json({
        sucesso: true,
        mensagem: 'Metas atualizadas com sucesso.',
        dados: dados.metas
      });
    } catch (error) {
      console.error('Erro ao atualizar metas:', error);
      return res.status(500).json({
        sucesso: false,
        mensagem: 'Erro ao atualizar metas.'
      });
    }
  }
}

module.exports = DashboardController;
