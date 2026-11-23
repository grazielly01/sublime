CREATE DATABASE  IF NOT EXISTS `sublime_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `sublime_db`;
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
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
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
  `nome_entrada` varchar(30) DEFAULT NULL,
  `data_entrada` date DEFAULT NULL,
  `categoria_entrada` varchar(40) DEFAULT NULL,
  `valor_entrada` decimal(10,0) DEFAULT NULL,
  `obs_entrada` varchar(90) DEFAULT NULL,
  PRIMARY KEY (`id_entrada`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entradas`
--

LOCK TABLES `entradas` WRITE;
/*!40000 ALTER TABLE `entradas` DISABLE KEYS */;
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
  `titulo_evento` varchar(30) DEFAULT NULL,
  `data_inicio_evento` datetime DEFAULT NULL,
  `data_fim_evento` datetime DEFAULT NULL,
  `categoria_evento` enum('produção','entrega','compra','pagamento','outro') DEFAULT NULL,
  `descricao_evento` varchar(90) DEFAULT NULL,
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
  PRIMARY KEY (`id_fabrica`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fabrica`
--

LOCK TABLES `fabrica` WRITE;
/*!40000 ALTER TABLE `fabrica` DISABLE KEYS */;
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
  `cnpj_fornecedor` varchar(14) DEFAULT NULL,
  PRIMARY KEY (`id_fornecedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fornecedores`
--

LOCK TABLES `fornecedores` WRITE;
/*!40000 ALTER TABLE `fornecedores` DISABLE KEYS */;
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
  `salario_funcionario` decimal(10,0) DEFAULT NULL,
  `turno_funcionario` enum('diurno','vespertino','noturno') DEFAULT NULL,
  `acesso_funcionario` enum('1','2','3') DEFAULT NULL,
  PRIMARY KEY (`id_funcionario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
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
  `custo_unit_insumo` decimal(10,0) DEFAULT NULL,
  `lote_insumo` varchar(20) DEFAULT NULL,
  `status_insumo` enum('ok','repor') DEFAULT NULL,
  `fornecedor_insumo` int(11) DEFAULT NULL,
  PRIMARY KEY (`idInsumo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insumos`
--

LOCK TABLES `insumos` WRITE;
/*!40000 ALTER TABLE `insumos` DISABLE KEYS */;
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
  `descricao_meta` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id_meta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meta`
--

LOCK TABLES `meta` WRITE;
/*!40000 ALTER TABLE `meta` DISABLE KEYS */;
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
  `data_movimentacao` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
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
  `prazo_pedido` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `forma_pagamento_pedido` varchar(30) DEFAULT NULL,
  `vlr_total_pedido` decimal(10,0) DEFAULT NULL,
  `descricao_pedido` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_pedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
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
  `nome_produto` char(80) DEFAULT NULL,
  `qtde_produto` decimal(10,0) DEFAULT NULL,
  `preco_unit_produto` decimal(10,0) DEFAULT NULL,
  `categ_produto` int(11) DEFAULT NULL,
  `descricao_produto` varchar(500) DEFAULT NULL,
  `receita_produto` varchar(2000) DEFAULT NULL,
  `margem_lucro_produto` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id_produto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
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
  `nome_saida` varchar(30) DEFAULT NULL,
  `data_saida` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `categoria_saida` varchar(40) DEFAULT NULL,
  `valor_saida` decimal(10,0) DEFAULT NULL,
  `tipo_saida` enum('fixa','variável') DEFAULT NULL,
  `obs_saida` varchar(90) DEFAULT NULL,
  PRIMARY KEY (`id_saida`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saidas`
--

LOCK TABLES `saidas` WRITE;
/*!40000 ALTER TABLE `saidas` DISABLE KEYS */;
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
  `email_usuario` varchar(30) DEFAULT NULL,
  `nome_fabrica_usuario` varchar(60) DEFAULT NULL,
  `cargo_usuario` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'sublime_db'
--

--
-- Dumping routines for database 'sublime_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-05 17:20:59


ALTER TABLE fabrica
ADD COLUMN razao_social_fabrica VARCHAR(120),
ADD COLUMN cnpj_fabrica VARCHAR(18),
ADD COLUMN inscricao_estadual_fabrica VARCHAR(30),
ADD COLUMN inscricao_municipal_fabrica VARCHAR(30),
ADD COLUMN data_fundacao_fabrica DATE,
ADD COLUMN telefone_fabrica VARCHAR(20),
ADD COLUMN email_fabrica VARCHAR(120),
ADD COLUMN cep_fabrica CHAR(9),
ADD COLUMN rua_fabrica VARCHAR(120),
ADD COLUMN numero_fabrica VARCHAR(15),
ADD COLUMN complemento_fabrica VARCHAR(80),
ADD COLUMN bairro_fabrica VARCHAR(80),
ADD COLUMN cidade_fabrica VARCHAR(80),
ADD COLUMN estado_fabrica CHAR(2);


CREATE TABLE ordens_producao (

    id_ordem INT AUTO_INCREMENT NOT NULL PRIMARY KEY,

    nome_produto_ordem VARCHAR(100) NOT NULL,

    quantidade_total INT NOT NULL,

    quantidade_feita INT DEFAULT 0,

    status_ordem ENUM(
        'na_fila',
        'em_andamento',
        'concluida'
    ) DEFAULT 'na_fila',

    prazo_ordem DATE NOT NULL

);


INSERT INTO entradas (
    nome_entrada,
    data_entrada,
    categoria_entrada,
    valor_entrada,
    obs_entrada
) VALUES

(
    'Venda - Padaria Estrella',
    '2026-05-03',
    'Outros',
    2700.00,
    '15 Torta de Limão 22cm, 30 Cupcake Red Velvet, 28 Brownie Avelã, 40 Cupcake Morango'
),

(
    'Venda - Sonda Supermercado',
    '2026-05-03',
    'Venda de produto',
    745.00,
    '15 Bolo Formigueiro, 15 Bolo Chocolate Branco, 15 Bolo Sensação, 15 Bolo Meio Amargo, 15 Ninho'
),

(
    'Venda - Tia Bete Doces',
    '2026-05-01',
    'Venda de produto',
    922.00,
    '16 Mousse Maracujá, 10 Pizza Brownie, 10 Copo Felicidade Surpresa de Uva, 15 Vulcão Chocolate'
),

(
    'Venda - Doceria Super Magic',
    '2026-05-01',
    'Venda de produto',
    2700.00,
    'Pedido personalizado'
);


INSERT INTO entradas (
    nome_entrada,
    data_entrada,
    categoria_entrada,
    valor_entrada,
    obs_entrada
) VALUES

(
    'Venda - Padaria Estrella',
    '2026-05-03',
    'Outros',
    2700.00,
    '15 Torta de Limão 22cm, 30 Cupcake Red Velvet, 28 Brownie Avelã, 40 Cupcake Morango'
),

(
    'Venda - Sonda Supermercado',
    '2026-05-03',
    'Venda de produto',
    745.00,
    '15 Bolo Formigueiro, 15 Bolo Chocolate Branco, 15 Bolo Sensação, 15 Bolo Meio Amargo, 15 Ninho'
),

(
    'Venda - Tia Bete Doces',
    '2026-05-01',
    'Venda de produto',
    922.00,
    '16 Mousse Maracujá, 10 Pizza Brownie, 10 Copo Felicidade Surpresa de Uva, 15 Vulcão Chocolate'
),

(
    'Venda - Doceria Super Magic',
    '2026-05-01',
    'Venda de produto',
    2700.00,
    'Pedido personalizado'
);


