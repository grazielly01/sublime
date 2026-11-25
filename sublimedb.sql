-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sublime_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria_evento`
--

DROP TABLE IF EXISTS `categoria_evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria_evento` (
  `id_categoria_evento` int(11) NOT NULL AUTO_INCREMENT,
  `nome_categoria_evento` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id_categoria_evento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_evento`
--

LOCK TABLES `categoria_evento` WRITE;
/*!40000 ALTER TABLE `categoria_evento` DISABLE KEYS */;
/*!40000 ALTER TABLE `categoria_evento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria_insumos`
--

DROP TABLE IF EXISTS `categoria_insumos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria_insumos` (
  `id_categoria_insumos` int(11) NOT NULL AUTO_INCREMENT,
  `nome_categoria_insumos` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id_categoria_insumos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_insumos`
--

LOCK TABLES `categoria_insumos` WRITE;
/*!40000 ALTER TABLE `categoria_insumos` DISABLE KEYS */;
/*!40000 ALTER TABLE `categoria_insumos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `nome_cliente` varchar(80) DEFAULT NULL,
  `endereco_cliente` varchar(180) DEFAULT NULL,
  `documento_cliente` char(20) DEFAULT NULL,
  `telefone_cliente` varchar(20) DEFAULT NULL,
  `email_cliente` varchar(120) DEFAULT NULL,
  `status_cliente` enum('ativo','atencao','inativo') DEFAULT NULL,
  `data_cadastro_cliente` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Padaria Pão Quente',NULL,NULL,NULL,NULL,'ativo','2026-11-23 17:00:31'),(2,'Mercado Vila Nova',NULL,NULL,NULL,NULL,'ativo','2026-11-23 17:00:31'),(3,'Rede Doce Mel',NULL,NULL,NULL,NULL,'atencao','2026-11-23 17:00:31'),(4,'Café Central',NULL,NULL,NULL,NULL,'ativo','2026-11-23 17:00:31'),(5,'Empório Sabor',NULL,NULL,NULL,NULL,'inativo','2026-11-23 17:00:31');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entradas`
--

DROP TABLE IF EXISTS `entradas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entradas` (
  `id_entrada` int(11) NOT NULL AUTO_INCREMENT,
  `nome_entrada` varchar(100) DEFAULT NULL,
  `data_entrada` date DEFAULT NULL,
  `categoria_entrada` varchar(60) DEFAULT NULL,
  `valor_entrada` decimal(12,2) DEFAULT NULL,
  `obs_entrada` varchar(255) DEFAULT NULL,
  `comprovante_entrada` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_entrada`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entradas`
--

LOCK TABLES `entradas` WRITE;
/*!40000 ALTER TABLE `entradas` DISABLE KEYS */;
INSERT INTO `entradas` VALUES (1,'Venda - Padaria Estrella','2026-05-03','Outros',2700.00,'15 Torta de Limão 22cm, 30 Cupcake Red Velvet, 28 Brownie Avelã, 40 Cupcake Morango',NULL),(2,'Venda - Sonda Supermercado','2026-05-03','Venda de produto',745.00,'15 Bolo Formigueiro, 15 Bolo Chocolate Branco, 15 Bolo Sensação, 15 Bolo Meio Amargo, 15 Ninho',NULL),(3,'Venda - Tia Bete Doces','2026-05-01','Venda de produto',922.00,'16 Mousse Maracujá, 10 Pizza Brownie, 10 Copo Felicidade Surpresa de Uva, 15 Vulcão Chocolate',NULL),(4,'Venda - Doceria Super Magic','2026-05-01','Venda de produto',2700.00,'Pedido personalizado',NULL),(5,'Resumo diário - Segunda-feira','2026-06-15','Fluxo diário',12400.00,'Valor consolidado do dashboard',NULL),(6,'Resumo diário - Terça-feira','2026-06-16','Fluxo diário',9800.00,'Valor consolidado do dashboard',NULL),(7,'Resumo diário - Quarta-feira','2026-06-17','Fluxo diário',15200.00,'Valor consolidado do dashboard',NULL),(8,'Resumo diário - Quinta-feira','2026-06-18','Fluxo diário',11000.00,'Valor consolidado do dashboard',NULL),(9,'Resumo diário - Sexta-feira','2026-06-19','Fluxo diário',18900.00,'Valor consolidado do dashboard',NULL),(10,'Resumo diário - Sábado','2026-06-20','Fluxo diário',22400.00,'Valor consolidado do dashboard',NULL);
/*!40000 ALTER TABLE `entradas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evento`
--

DROP TABLE IF EXISTS `evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evento` (
  `id_evento` int(11) NOT NULL AUTO_INCREMENT,
  `titulo_evento` varchar(80) DEFAULT NULL,
  `data_inicio_evento` datetime DEFAULT NULL,
  `data_fim_evento` datetime DEFAULT NULL,
  `categoria_evento` enum('produção','entrega','compra','pagamento','outro') DEFAULT NULL,
  `descricao_evento` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_evento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evento`
--

LOCK TABLES `evento` WRITE;
/*!40000 ALTER TABLE `evento` DISABLE KEYS */;
/*!40000 ALTER TABLE `evento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fabrica`
--

DROP TABLE IF EXISTS `fabrica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fabrica` (
  `id_fabrica` int(11) NOT NULL AUTO_INCREMENT,
  `nome_fabrica` varchar(80) DEFAULT NULL,
  `razao_social_fabrica` varchar(120) DEFAULT NULL,
  `cnpj_fabrica` varchar(18) DEFAULT NULL,
  `inscricao_estadual_fabrica` varchar(30) DEFAULT NULL,
  `inscricao_municipal_fabrica` varchar(30) DEFAULT NULL,
  `data_fundacao_fabrica` date DEFAULT NULL,
  `telefone_fabrica` varchar(20) DEFAULT NULL,
  `email_fabrica` varchar(120) DEFAULT NULL,
  `cep_fabrica` char(9) DEFAULT NULL,
  `rua_fabrica` varchar(120) DEFAULT NULL,
  `numero_fabrica` varchar(15) DEFAULT NULL,
  `complemento_fabrica` varchar(80) DEFAULT NULL,
  `bairro_fabrica` varchar(80) DEFAULT NULL,
  `cidade_fabrica` varchar(80) DEFAULT NULL,
  `estado_fabrica` char(2) DEFAULT NULL,
  PRIMARY KEY (`id_fabrica`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fabrica`
--

LOCK TABLES `fabrica` WRITE;
/*!40000 ALTER TABLE `fabrica` DISABLE KEYS */;
INSERT INTO `fabrica` VALUES (1,'Sweet Sunset','Sweet Sunset Indústria de Confeitaria LTDA','12.345.678/9000-90','12.345.678/9000-90','12.345.678/9000-90','2021-02-01','(11) 98765-4321','Contato@SweetSunset.com.br',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `fabrica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fornecedores`
--

DROP TABLE IF EXISTS `fornecedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fornecedores` (
  `id_fornecedor` int(11) NOT NULL AUTO_INCREMENT,
  `cnpj_fornecedor` varchar(18) DEFAULT NULL,
  `nome_fornecedor` varchar(100) DEFAULT NULL,
  `telefone_fornecedor` varchar(20) DEFAULT NULL,
  `email_fornecedor` varchar(120) DEFAULT NULL,
  `nota_fornecedor` decimal(3,1) DEFAULT NULL,
  `atraso_dias_fornecedor` int(11) DEFAULT NULL,
  `data_ultima_movimentacao_fornecedor` date DEFAULT NULL,
  PRIMARY KEY (`id_fornecedor`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fornecedores`
--

LOCK TABLES `fornecedores` WRITE;
/*!40000 ALTER TABLE `fornecedores` DISABLE KEYS */;
INSERT INTO `fornecedores` VALUES (1,NULL,'Distribuidora Açúcar & Cia',NULL,NULL,2.8,12,'2026-06-10'),(2,NULL,'Laticínios Sul',NULL,NULL,3.2,5,'2026-06-14'),(3,NULL,'Embalagens Rápido',NULL,NULL,2.5,8,'2026-06-11');
/*!40000 ALTER TABLE `fornecedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionarios`
--

DROP TABLE IF EXISTS `funcionarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcionarios` (
  `id_funcionario` int(11) NOT NULL AUTO_INCREMENT,
  `cargo_funcionario` varchar(50) DEFAULT NULL,
  `salario_funcionario` decimal(12,2) DEFAULT NULL,
  `turno_funcionario` enum('diurno','vespertino','noturno') DEFAULT NULL,
  `acesso_funcionario` enum('1','2','3') DEFAULT NULL,
  `nome_funcionario` varchar(100) DEFAULT NULL,
  `horario_funcionario` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id_funcionario`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
INSERT INTO `funcionarios` VALUES (1,'Gerente de produção',5500.00,'diurno',NULL,'João Carvalho Moraes','Seg-Sex 7:00-16:00'),(2,'Auxiliar de limpeza',2800.00,'diurno',NULL,'Amanda Ferreira Fenix','Seg-Sex 7:00-16:00'),(3,'Confeiteiro',4700.00,'diurno',NULL,'Sebastião Pinheiro Santos','Seg-Sex 7:00-13:00'),(4,'Gerente de estoque',6300.00,'diurno',NULL,'Lívia Stenberg Amorim','Seg-Sex 7:00-14:00'),(5,'Gerente de pedidos',5700.00,'diurno',NULL,'Pedro da Silva Guimarães','Seg-Sex 7:00-15:00');
/*!40000 ALTER TABLE `funcionarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `insumos`
--

DROP TABLE IF EXISTS `insumos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `insumos` (
  `idInsumo` int(11) NOT NULL AUTO_INCREMENT,
  `nome_insumo` varchar(80) DEFAULT NULL,
  `qtde_em_estoque_insumo` int(11) DEFAULT NULL,
  `qtde_minima_insumo` int(11) DEFAULT NULL,
  `data_validade_insumo` date DEFAULT NULL,
  `categoria_insumo` int(11) DEFAULT NULL,
  `custo_unit_insumo` decimal(12,2) DEFAULT NULL,
  `lote_insumo` varchar(20) DEFAULT NULL,
  `status_insumo` enum('ok','repor') DEFAULT NULL,
  `fornecedor_insumo` int(11) DEFAULT NULL,
  `unidade_medida_insumo` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idInsumo`),
  KEY `fk_insumo_categoria` (`categoria_insumo`),
  KEY `fk_insumo_fornecedor` (`fornecedor_insumo`),
  CONSTRAINT `fk_insumo_categoria` FOREIGN KEY (`categoria_insumo`) REFERENCES `categoria_insumos` (`id_categoria_insumos`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_insumo_fornecedor` FOREIGN KEY (`fornecedor_insumo`) REFERENCES `fornecedores` (`id_fornecedor`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insumos`
--

LOCK TABLES `insumos` WRITE;
/*!40000 ALTER TABLE `insumos` DISABLE KEYS */;
INSERT INTO `insumos` VALUES (1,'Chocolate ao leite Callebaut 80g',52,15,'2026-08-12',NULL,78.50,'LT-0421','ok',NULL,NULL),(2,'Farinha de trigo especial 300g',2,6,'2026-11-30',NULL,142.00,'LT-0425','repor',NULL,NULL),(3,'Leite condensado Moça 395g',104,60,'2027-01-20',NULL,8.90,'LT-0414','ok',NULL,NULL),(4,'Creme de leite UHT 400ml',82,80,'2026-12-18',NULL,4.20,'LT-0416','ok',NULL,NULL),(5,'Açúcar refinado 2kg',27,8,'2027-03-05',NULL,98.00,'LT-0419','ok',NULL,NULL),(6,'Manteiga sem sal 1kg',19,20,'2026-07-25',NULL,52.00,'LT-0422','repor',NULL,NULL),(7,'Leite condensado Moça 395g',104,60,'2026-09-11',NULL,8.90,'LT-0426','ok',NULL,NULL);
/*!40000 ALTER TABLE `insumos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meta`
--

DROP TABLE IF EXISTS `meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meta` (
  `id_meta` int(11) NOT NULL AUTO_INCREMENT,
  `titulo_meta` varchar(60) DEFAULT NULL,
  `prazo_meta` date DEFAULT NULL,
  `qtde_meta` int(11) DEFAULT NULL,
  `descricao_meta` varchar(255) DEFAULT NULL,
  `qtde_atual_meta` int(11) DEFAULT NULL,
  `valor_atual_meta` decimal(12,2) DEFAULT NULL,
  `valor_alvo_meta` decimal(12,2) DEFAULT NULL,
  `tipo_meta` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id_meta`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meta`
--

LOCK TABLES `meta` WRITE;
/*!40000 ALTER TABLE `meta` DISABLE KEYS */;
INSERT INTO `meta` VALUES (1,'Faturamento do mês',NULL,NULL,NULL,NULL,91000.00,100000.00,'faturamento'),(2,'Pedidos do mês',NULL,160,NULL,142,NULL,NULL,'pedidos'),(3,'Novos clientes B2B',NULL,10,NULL,7,NULL,NULL,'clientes');
/*!40000 ALTER TABLE `meta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movimentacoes`
--

DROP TABLE IF EXISTS `movimentacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movimentacoes` (
  `id_movimentacao` int(11) NOT NULL AUTO_INCREMENT,
  `titulo_movimentacao` varchar(20) DEFAULT NULL,
  `data_movimentacao` datetime NOT NULL DEFAULT current_timestamp(),
  `tipo_movimentacao` enum('E','S') DEFAULT NULL,
  PRIMARY KEY (`id_movimentacao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movimentacoes`
--

LOCK TABLES `movimentacoes` WRITE;
/*!40000 ALTER TABLE `movimentacoes` DISABLE KEYS */;
/*!40000 ALTER TABLE `movimentacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordens_producao`
--

DROP TABLE IF EXISTS `ordens_producao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordens_producao` (
  `id_ordem` int(11) NOT NULL AUTO_INCREMENT,
  `nome_produto_ordem` varchar(100) NOT NULL,
  `quantidade_total` int(11) NOT NULL,
  `quantidade_feita` int(11) DEFAULT 0,
  `status_ordem` enum('na_fila','em_andamento','concluida') DEFAULT 'na_fila',
  `prazo_ordem` date NOT NULL,
  PRIMARY KEY (`id_ordem`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordens_producao`
--

LOCK TABLES `ordens_producao` WRITE;
/*!40000 ALTER TABLE `ordens_producao` DISABLE KEYS */;
/*!40000 ALTER TABLE `ordens_producao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL AUTO_INCREMENT,
  `cliente_pedido` int(11) DEFAULT NULL,
  `nome_produto_pedido` varchar(100) DEFAULT NULL,
  `data_solicitacao_pedido` date DEFAULT NULL,
  `data_entrega_pedido` date DEFAULT NULL,
  `qtde_produto_pedido` int(11) DEFAULT NULL,
  `status_pedido` enum('em produção','entregue','pronto','aguardando','cancelado') DEFAULT NULL,
  `prazo_pedido` datetime DEFAULT NULL,
  `forma_pagamento_pedido` varchar(50) DEFAULT NULL,
  `vlr_total_pedido` decimal(12,2) DEFAULT NULL,
  `descricao_pedido` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `fk_pedido_cliente` (`cliente_pedido`),
  CONSTRAINT `fk_pedido_cliente` FOREIGN KEY (`cliente_pedido`) REFERENCES `cliente` (`id_cliente`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (1,1,'Brigadeiros',NULL,'2026-06-15',300,NULL,'2026-06-15 14:00:00',NULL,NULL,'Pedido urgente'),(2,2,'Torta de Limão',NULL,'2026-06-16',80,NULL,'2026-06-16 09:00:00',NULL,NULL,NULL),(3,4,'Cupcakes',NULL,'2026-06-16',120,NULL,'2026-06-16 16:00:00',NULL,NULL,NULL),(4,3,'Bolos sortidos',NULL,'2026-06-19',45,NULL,'2026-06-19 08:00:00',NULL,NULL,'Quantidade em kg');
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido_item`
--

DROP TABLE IF EXISTS `pedido_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido_item` (
  `id_item_pedido` int(11) NOT NULL AUTO_INCREMENT,
  `id_pedido` int(11) NOT NULL,
  `id_produto` int(11) DEFAULT NULL,
  `nome_produto_item` varchar(100) NOT NULL,
  `quantidade_item` int(11) NOT NULL,
  `preco_unitario_item` decimal(12,2) DEFAULT NULL,
  `subtotal_item` decimal(12,2) DEFAULT NULL,
  `descricao_item` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_item_pedido`),
  KEY `fk_item_pedido` (`id_pedido`),
  KEY `fk_item_produto` (`id_produto`),
  CONSTRAINT `fk_item_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_item_produto` FOREIGN KEY (`id_produto`) REFERENCES `produtos` (`id_produto`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_item`
--

LOCK TABLES `pedido_item` WRITE;
/*!40000 ALTER TABLE `pedido_item` DISABLE KEYS */;
INSERT INTO `pedido_item` VALUES (1,1,NULL,'Brigadeiros',300,NULL,NULL,'Pedido urgente'),(2,2,3,'Torta de Limão',80,NULL,NULL,NULL),(3,3,NULL,'Cupcakes',120,NULL,NULL,NULL),(4,4,NULL,'Bolos sortidos',45,NULL,NULL,'Quantidade em kg');
/*!40000 ALTER TABLE `pedido_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `id_produto` int(11) NOT NULL AUTO_INCREMENT,
  `data_validade_produto` date DEFAULT NULL,
  `nome_produto` varchar(100) DEFAULT NULL,
  `qtde_produto` decimal(10,0) DEFAULT NULL,
  `preco_unit_produto` decimal(12,2) DEFAULT NULL,
  `categ_produto` enum('Doces finos','Bolos','Tortas','Sazonais','Mousses e cremosos','Pavês e gelados','Cupcakes','Cookies/biscoitos','Brownies','Cheesecakes','Doces de pote','Trufas/bombons','Brigadeiros/enrolados','Macarons','Donuts','Muffins','Pudins','Pães de mel','Rocamboles','Kits festa','Lançamentos','Edição limitada','Linha premium','Congelados','Outros') DEFAULT NULL,
  `descricao_produto` text DEFAULT NULL,
  `receita_produto` text DEFAULT NULL,
  `margem_lucro_produto` decimal(5,2) DEFAULT NULL,
  `custo_unit_produto` decimal(12,2) DEFAULT NULL,
  `imagem_produto` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id_produto`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (1,NULL,'Brigadeiro Gourmet',NULL,NULL,'Brigadeiros/enrolados',NULL,NULL,NULL,NULL,NULL),(2,NULL,'Cupcake Sortido',NULL,NULL,'Cupcakes',NULL,NULL,NULL,NULL,NULL),(3,NULL,'Torta de Limão',NULL,NULL,'Tortas',NULL,NULL,NULL,NULL,NULL),(4,NULL,'Bolo Red Velvet',NULL,NULL,'Bolos',NULL,NULL,NULL,NULL,NULL),(5,NULL,'Copo da Felicidade',NULL,NULL,'Doces de pote',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saidas`
--

DROP TABLE IF EXISTS `saidas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saidas` (
  `id_saida` int(11) NOT NULL AUTO_INCREMENT,
  `nome_saida` varchar(100) DEFAULT NULL,
  `data_saida` datetime DEFAULT current_timestamp(),
  `categoria_saida` varchar(60) DEFAULT NULL,
  `valor_saida` decimal(12,2) DEFAULT NULL,
  `tipo_saida` enum('fixa','variável') DEFAULT NULL,
  `obs_saida` varchar(255) DEFAULT NULL,
  `comprovante_saida` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_saida`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saidas`
--

LOCK TABLES `saidas` WRITE;
/*!40000 ALTER TABLE `saidas` DISABLE KEYS */;
INSERT INTO `saidas` VALUES (1,'Compra - Serviço encanador','2026-05-03 00:00:00','Conserto/manutenção',1200.00,'variável','Conserto sanitário masculino',NULL),(2,'Compra - Embalagens Personalizadas','2026-05-01 00:00:00','Compra de insumo',2080.00,NULL,'Embalagens Personalizadas',NULL),(3,'Compra - Farinha de Trigo 30kg','2026-05-01 00:00:00','Compra de insumo',1052.00,NULL,'Farinha de trigo 30kg',NULL),(4,'Resumo diário - Segunda-feira','2026-06-15 00:00:00','Fluxo diário',8200.00,NULL,'Valor consolidado do dashboard',NULL),(5,'Resumo diário - Terça-feira','2026-06-16 00:00:00','Fluxo diário',6100.00,NULL,'Valor consolidado do dashboard',NULL),(6,'Resumo diário - Quarta-feira','2026-06-17 00:00:00','Fluxo diário',11400.00,NULL,'Valor consolidado do dashboard',NULL),(7,'Resumo diário - Quinta-feira','2026-06-18 00:00:00','Fluxo diário',7300.00,NULL,'Valor consolidado do dashboard',NULL),(8,'Resumo diário - Sexta-feira','2026-06-19 00:00:00','Fluxo diário',9200.00,NULL,'Valor consolidado do dashboard',NULL),(9,'Resumo diário - Sábado','2026-06-20 00:00:00','Fluxo diário',5800.00,NULL,'Valor consolidado do dashboard',NULL);
/*!40000 ALTER TABLE `saidas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome_usuario` varchar(60) DEFAULT NULL,
  `telefone_usuario` char(15) DEFAULT NULL,
  `plano_usuario` char(15) DEFAULT NULL,
  `email_usuario` varchar(100) DEFAULT NULL,
  `nome_fabrica_usuario` varchar(80) DEFAULT NULL,
  `cargo_usuario` varchar(40) DEFAULT NULL,
  `id_fabrica_usuario` int(11) DEFAULT NULL,
  `senha_usuario` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `fk_usuario_fabrica` (`id_fabrica_usuario`),
  CONSTRAINT `fk_usuario_fabrica` FOREIGN KEY (`id_fabrica_usuario`) REFERENCES `fabrica` (`id_fabrica`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-23 17:10:56
