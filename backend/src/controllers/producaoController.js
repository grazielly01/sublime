const prisma = require('../config/database');

function normalizarStatus(status) {
  if (!status) return 'na_fila';
  const valor = String(status).toUpperCase().replace(/[- ]/g, '_');
  if (valor === 'EM_ANDAMENTO') return 'em_andamento';
  if (valor === 'CONCLUIDO' || valor === 'CONCLUIDA') return 'concluida';
  return 'na_fila';
}

function formatarStatus(status) {
  if (status === 'em_andamento') return 'EM_ANDAMENTO';
  if (status === 'concluida') return 'CONCLUIDO';
  return 'NA_FILA';
}

class ProducaoController {
  async index(req, res) {

     try {
      const ordens = await prisma.ordens_producao.findMany({
        orderBy: { id_ordem: 'desc' }
      });

      const fila = ordens.map((ordem) => ({
        id: ordem.id_ordem,
        produto: ordem.nome_produto_ordem,
        equipe: 'Equipe padrão',
        quantidadeTotal: ordem.quantidade_total,
        quantidadeFeita: ordem.quantidade_feita || 0,
        status: formatarStatus(ordem.status_ordem),
        tempoEstimado: 'Prazo: ' + new Date(ordem.prazo_ordem).toLocaleDateString('pt-BR')
      }));

      const emAndamento = fila.filter((ordem) => ordem.status === 'EM_ANDAMENTO').length;
      const naFila = fila.filter((ordem) => ordem.status === 'NA_FILA').length;
      const concluidas = fila.filter((ordem) => ordem.status === 'CONCLUIDO').length;
      const produzido = fila.reduce((total, ordem) => total + ordem.quantidadeFeita, 0);
      const metaTotal = fila.reduce((total, ordem) => total + ordem.quantidadeTotal, 0);

      return res.json({
        kpis: {
          metaDia: {
            produzido,
            metaTotal,
            percentualConcluido: metaTotal > 0 ? Math.round((produzido / metaTotal) * 100) : 0
          },
          ordensAtivas: { total: fila.length, emAndamento, naFila, concluidas },
          perdasHoje: { percentual: 0, dentroDoEsperado: true }
        },
        fila
      });
    } catch (error) {
      console.error('Erro ao listar produção:', error);
      return res.status(500).json({ error: 'Erro ao carregar produção do banco de dados.' });
    }
  }

   async criar(req, res) {

     try {
      const { produto, quantidadeTotal, prazo } = req.body;

      if (!produto || !quantidadeTotal) {
        return res.status(400).json({ error: 'Produto e quantidade são obrigatórios.' });
      }

      const ordem = await prisma.ordens_producao.create({
        data: {
          nome_produto_ordem: produto,
          quantidade_total: Number(quantidadeTotal),
          quantidade_feita: 0,
          status_ordem: 'na_fila',
          prazo_ordem: prazo ? new Date(prazo) : new Date()
        }
      });

      return res.status(201).json({
        id: ordem.id_ordem,
        produto: ordem.nome_produto_ordem,
        quantidadeTotal: ordem.quantidade_total,
        quantidadeFeita: 0,
        status: 'NA_FILA',
        tempoEstimado: 'A iniciar'
      });
    } catch (error) {
      console.error('Erro ao criar ordem:', error);
      return res.status(500).json({ error: 'Erro ao cadastrar ordem no banco de dados.' });
    }
  }

  async atualizarStatus(req, res) {

     try {
      const id = Number(req.params.id);
      const status = normalizarStatus(req.body.status);

      const atual = await prisma.ordens_producao.findUnique({
        where: { id_ordem: id }
      });

      if (!atual) {
        return res.status(404).json({ error: 'Ordem não encontrada.' });
      }


        const ordem = await prisma.ordens_producao.update({
        where: { id_ordem: id },
        data: {
          status_ordem: status,
          quantidade_feita: status === 'concluida'
            ? atual.quantidade_total
            : atual.quantidade_feita
        }
      });

         return res.json({
        id: ordem.id_ordem,
        produto: ordem.nome_produto_ordem,
        quantidadeTotal: ordem.quantidade_total,
        quantidadeFeita: ordem.quantidade_feita,
        status: formatarStatus(ordem.status_ordem)
      });
    } catch (error) {
      console.error('Erro ao atualizar ordem:', error);
      return res.status(500).json({ error: 'Erro ao atualizar ordem no banco de dados.' });
    }
  }
}
