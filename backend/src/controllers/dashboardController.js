
const DashboardService = require('../services/dashboardService');

class DashboardController {
  static obterVisaoGeral(req, res) {
    try {
      const dados = DashboardService.obterDashboard();

      return res.status(200).json({
        sucesso: true,
        dados
      });
    } catch (error) {
      return res.status(500).json({
        sucesso: false,
        mensagem: 'Erro ao carregar o Dashboard.'
      });
    }
  }

  static atualizarMetas(req, res) {
    try {
      const { metas } = req.body;

      if (!Array.isArray(metas)) {
        return res.status(400).json({
          sucesso: false,
          mensagem: 'Informe uma lista válida de metas.'
        });
      }

      const metasAtualizadas =
        DashboardService.atualizarMetas(metas);

      return res.status(200).json({
        sucesso: true,
        mensagem: 'Metas atualizadas com sucesso.',
        dados: metasAtualizadas
      });
    } catch (error) {
      return res.status(500).json({
        sucesso: false,
        mensagem: 'Erro ao atualizar metas.'
      });
    }
  }
}

module.exports = DashboardController;
