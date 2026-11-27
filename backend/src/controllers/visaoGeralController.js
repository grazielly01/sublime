// Importa a conexão com o banco de dados
const prisma = require('../config/database');

// Busca os totais que aparecem nos cards da Visão Geral
async function obterResumoKpis(req, res) {
    try {
         const [pedidosAbertos, itensEmBaixa] = await Promise.all([
            prisma.pedido.count({
                where: {
                    status_pedido: {
                        in: ['aguardando', 'em_produ__o', 'pronto']
                    }
                }
            }),
            prisma.insumos.count()
        ]);

        const insumos = await prisma.insumos.findMany({
            select: {
                qtde_em_estoque_insumo: true,
                qtde_minima_insumo: true
            }
        });

           const totalItensEmBaixa = insumos.filter((insumo) =>
            Number(insumo.qtde_em_estoque_insumo || 0) <= Number(insumo.qtde_minima_insumo || 0)
        ).length;

           return res.status(200).json({
            data: {
                pedidosAbertos,
                 itensEmBaixa: totalItensEmBaixa,
                totalInsumos: itensEmBaixa
            }
        });
          } catch (erro) {
            console.error('Erro ao buscar indicadores da Visão Geral:', erro);
        return res.status(500).json({
              message: 'Não foi possível carregar os indicadores da Visão Geral.'        });    }}
