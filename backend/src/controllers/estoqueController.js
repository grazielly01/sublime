const prisma = require('../config/database');

class EstoqueController {
  async listar(req, res) {
    try {
      const insumos = await prisma.insumos.findMany({
        include: { categoria_insumos: true, fornecedores: true },
        orderBy: { idInsumo: 'desc' }
      });

      const resultado = insumos.map((item) => {
        const quantidade = Number(item.qtde_em_estoque_insumo || 0);
        const minimo = Number(item.qtde_minima_insumo || 0);
        return {
          id: item.idInsumo,
          nome: item.nome_insumo || '',
          categoria: item.categoria_insumos?.nome_categoria_insumos || 'Outros',
          lote: item.lote_insumo || '',
          quantidade,
          minimo,
          validade: item.data_validade_insumo
            ? item.data_validade_insumo.toISOString()
            : null,
          custo: item.custo_unit_insumo ? Number(item.custo_unit_insumo) : 0,
          status: quantidade <= minimo ? 'Repor' : 'OK'
        };
      });

      const abaixoDoMinimoCount = resultado.filter((item) => item.status === 'Repor').length;
      return res.json({ abaixoDoMinimoCount, total: resultado.length, data: resultado });
    } catch (error) {
      console.error('Erro ao listar estoque:', error);
      return res.status(500).json({ mensagem: 'Erro ao carregar estoque do banco de dados.' });
    }
  }

  async criar(req, res) {
    try {
      const { nome, categoria, lote, quantidade, minimo, validade, custo } = req.body;

      if (!nome || !lote || !validade || quantidade === undefined || minimo === undefined || custo === undefined) {
        return res.status(400).json({ mensagem: 'Preencha todos os campos obrigatórios.' });
      }

      let categoriaDb = null;
      if (categoria) {
        categoriaDb = await prisma.categoria_insumos.findFirst({
          where: { nome_categoria_insumos: categoria }
        });

        if (!categoriaDb) {
          categoriaDb = await prisma.categoria_insumos.create({
            data: { nome_categoria_insumos: categoria }
          });
        }
      }

      const item = await prisma.insumos.create({
        data: {
          nome_insumo: nome,
          qtde_em_estoque_insumo: Number(quantidade),
          qtde_minima_insumo: Number(minimo),
          data_validade_insumo: new Date(validade),
          categoria_insumo: categoriaDb?.id_categoria_insumos || null,
          custo_unit_insumo: Number(custo),
          lote_insumo: lote,
          status_insumo: Number(quantidade) <= Number(minimo) ? 'repor' : 'ok'
        },
        include: { categoria_insumos: true }
      });

      return res.status(201).json({
        id: item.idInsumo,
        nome: item.nome_insumo,
        categoria: item.categoria_insumos?.nome_categoria_insumos || 'Outros',
        lote: item.lote_insumo,
        quantidade: Number(item.qtde_em_estoque_insumo),
        minimo: Number(item.qtde_minima_insumo),
        validade: item.data_validade_insumo?.toISOString(),
        custo: Number(item.custo_unit_insumo)
      });
    } catch (error) {
      console.error('Erro ao criar insumo:', error);
      return res.status(500).json({ mensagem: 'Erro ao cadastrar insumo no banco de dados.' });
    }
  }

  async atualizar(req, res) {
    try {
      const id = Number(req.params.id);
      const dados = req.body;

      const atual = await prisma.insumos.findUnique({ where: { idInsumo: id } });
      if (!atual) return res.status(404).json({ mensagem: 'Insumo não encontrado.' });

      const quantidade = dados.quantidade !== undefined ? Number(dados.quantidade) : atual.qtde_em_estoque_insumo;
      const minimo = dados.minimo !== undefined ? Number(dados.minimo) : atual.qtde_minima_insumo;

      let categoriaInsumo = atual.categoria_insumo;
      if (dados.categoria) {
        let categoria = await prisma.categoria_insumos.findFirst({
          where: { nome_categoria_insumos: dados.categoria }
        });
        if (!categoria) {
          categoria = await prisma.categoria_insumos.create({
            data: { nome_categoria_insumos: dados.categoria }
          });
        }
        categoriaInsumo = categoria.id_categoria_insumos;
      }

      const item = await prisma.insumos.update({
        where: { idInsumo: id },
        data: {
          nome_insumo: dados.nome ?? atual.nome_insumo,
          lote_insumo: dados.lote ?? atual.lote_insumo,
          qtde_em_estoque_insumo: quantidade,
          qtde_minima_insumo: minimo,
          custo_unit_insumo: dados.custo !== undefined ? Number(dados.custo) : atual.custo_unit_insumo,
          data_validade_insumo: dados.validade ? new Date(dados.validade) : atual.data_validade_insumo,
          categoria_insumo: categoriaInsumo,
          status_insumo: Number(quantidade) <= Number(minimo) ? 'repor' : 'ok'
        },
        include: { categoria_insumos: true }
      });

      return res.json({
        mensagem: 'Insumo atualizado com sucesso!',
        data: {
          id: item.idInsumo,
          nome: item.nome_insumo,
          categoria: item.categoria_insumos?.nome_categoria_insumos || 'Outros',
          lote: item.lote_insumo,
          quantidade: Number(item.qtde_em_estoque_insumo),
          minimo: Number(item.qtde_minima_insumo),
          validade: item.data_validade_insumo?.toISOString(),
          custo: Number(item.custo_unit_insumo),
          status: Number(item.qtde_em_estoque_insumo) <= Number(item.qtde_minima_insumo) ? 'Repor' : 'OK'
        }
      });
    } catch (error) {
      console.error('Erro ao atualizar insumo:', error);
      return res.status(500).json({ mensagem: 'Erro ao atualizar insumo no banco de dados.' });
    }
  }

  async excluir(req, res) {
    try {
      await prisma.insumos.delete({ where: { idInsumo: Number(req.params.id) } });
      return res.json({ mensagem: 'Insumo excluído com sucesso!' });
    } catch (error) {
      if (error?.code === 'P2025') {
        return res.status(404).json({ mensagem: 'Insumo não encontrado.' });
      }
      console.error('Erro ao excluir insumo:', error);
      return res.status(500).json({ mensagem: 'Erro ao excluir insumo no banco de dados.' });
    }
  }
}

module.exports = new EstoqueController();
