-- MySQL dump 10.17  Distrib 10.3.25-MariaDB, for Linux (x86_64)
--
-- Host: db    Database: ualinventarium
-- ------------------------------------------------------
-- Server version	10.7.1-MariaDB-1:10.7.1+maria~focal

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `ualinventarium`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `ualinventarium` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `ualinventarium`;

--
-- Table structure for table `configuracion`
--

DROP TABLE IF EXISTS `configuracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `configuracion` (
  `idConfiguracion` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(45) DEFAULT NULL,
  `mac` varchar(45) DEFAULT NULL,
  `boca` varchar(45) DEFAULT NULL,
  `armario` varchar(45) DEFAULT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `contrasena` varchar(45) DEFAULT NULL,
  `Objeto_idObjeto` int(11) NOT NULL,
  PRIMARY KEY (`idConfiguracion`),
  KEY `fk_Configuracion_Objeto1_idx` (`Objeto_idObjeto`),
  CONSTRAINT `fk_Configuracion_Objeto1` FOREIGN KEY (`Objeto_idObjeto`) REFERENCES `objeto` (`idObjeto`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuracion`
--

LOCK TABLES `configuracion` WRITE;
/*!40000 ALTER TABLE `configuracion` DISABLE KEYS */;
INSERT INTO `configuracion` VALUES (4,'192.168.0.1','','4A','','','',14);
/*!40000 ALTER TABLE `configuracion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupoobjetos`
--

DROP TABLE IF EXISTS `grupoobjetos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grupoobjetos` (
  `idGrupoObjetos` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) DEFAULT 0,
  `nombre` varchar(45) DEFAULT NULL,
  `imagen` varchar(45) DEFAULT NULL,
  `marca` varchar(45) DEFAULT NULL,
  `modelo` varchar(45) DEFAULT NULL,
  `cantidadDisponible` int(11) DEFAULT 0,
  `tipo` tinyint(4) DEFAULT NULL,
  `eliminado` tinyint(4) DEFAULT 0,
  PRIMARY KEY (`idGrupoObjetos`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupoobjetos`
--

LOCK TABLES `grupoobjetos` WRITE;
/*!40000 ALTER TABLE `grupoobjetos` DISABLE KEYS */;
INSERT INTO `grupoobjetos` VALUES (1,2,'Iphone 2','../../images/objects/1613063787.jpg','Apple','11 Pro',2,0,0),(2,18,'Alexa','1641056599921','Amazon','2020',17,0,0),(3,1,'Raspberry Kit','1641227456785','Raspberry','V3 2021 16GB RAM',1,2,0);
/*!40000 ALTER TABLE `grupoobjetos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `objeto`
--

DROP TABLE IF EXISTS `objeto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `objeto` (
  `idObjeto` int(11) NOT NULL AUTO_INCREMENT,
  `mejorasEquipo` varchar(45) DEFAULT NULL,
  `codigo` int(11) DEFAULT -1,
  `disponible` tinyint(4) DEFAULT 0,
  `eliminado` tinyint(4) DEFAULT 0,
  `fechaAdquisicion` date DEFAULT NULL,
  `observaciones` varchar(255) DEFAULT NULL,
  `organizativa` int(11) DEFAULT 0,
  `etiqueta` varchar(45) DEFAULT NULL,
  `Ubicacion_idUbicacion` int(11) DEFAULT NULL,
  `GrupoObjetos_idGrupoObjetos` int(11) NOT NULL,
  PRIMARY KEY (`idObjeto`,`GrupoObjetos_idGrupoObjetos`),
  KEY `fk_Objeto_Ubicacion1_idx` (`Ubicacion_idUbicacion`),
  KEY `fk_Objeto_GrupoObjetos1_idx` (`GrupoObjetos_idGrupoObjetos`),
  CONSTRAINT `fk_Objeto_GrupoObjetos1` FOREIGN KEY (`GrupoObjetos_idGrupoObjetos`) REFERENCES `grupoobjetos` (`idGrupoObjetos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Objeto_Ubicacion1` FOREIGN KEY (`Ubicacion_idUbicacion`) REFERENCES `ubicacion` (`idUbicacion`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objeto`
--

LOCK TABLES `objeto` WRITE;
/*!40000 ALTER TABLE `objeto` DISABLE KEYS */;
INSERT INTO `objeto` VALUES (14,'Altavoces',123412,1,0,'2022-01-04','Pequeño rasguño en la base',0,'A7',1,2),(15,'Pantalla',5765685,0,0,'2021-12-14','La pantalla tiene una raja en una esquina',2,'A11',1,2),(21,'Lleva incorporado una tarjeta gráfica',1231231512,0,0,'2021-12-10','Necesita una fuente de alimentación',0,'A4',2,3);
/*!40000 ALTER TABLE `objeto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `objetokit`
--

DROP TABLE IF EXISTS `objetokit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `objetokit` (
  `idObjetoKit` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `imagen` varchar(45) DEFAULT NULL,
  `observaciones` varchar(45) DEFAULT NULL,
  `GrupoObjetos_idGrupoObjetos` int(11) NOT NULL,
  PRIMARY KEY (`idObjetoKit`),
  KEY `fk_ObjetoKit_GrupoObjetos1_idx` (`GrupoObjetos_idGrupoObjetos`),
  CONSTRAINT `fk_ObjetoKit_GrupoObjetos1` FOREIGN KEY (`GrupoObjetos_idGrupoObjetos`) REFERENCES `grupoobjetos` (`idGrupoObjetos`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objetokit`
--

LOCK TABLES `objetokit` WRITE;
/*!40000 ALTER TABLE `objetokit` DISABLE KEYS */;
INSERT INTO `objetokit` VALUES (1,'Tarjeta SD 400GB',1,'1641245341745','SD XC 1 I',3);
/*!40000 ALTER TABLE `objetokit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prestado`
--

DROP TABLE IF EXISTS `prestado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prestado` (
  `idPrestado` int(11) NOT NULL AUTO_INCREMENT,
  `retiradoPor` varchar(45) DEFAULT NULL,
  `fechaSalida` date DEFAULT NULL,
  `fechaEntrega` date DEFAULT NULL,
  `fechaEstimadaEntrega` date DEFAULT NULL,
  `Usuario_idUsuario` int(11) NOT NULL COMMENT 'Enviado por\n',
  `Objeto_idObjeto` int(11) NOT NULL,
  `solicitado` date DEFAULT NULL,
  `estado` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`idPrestado`,`Usuario_idUsuario`),
  KEY `fk_Prestado_Usuario1_idx` (`Usuario_idUsuario`),
  KEY `fk_Prestado_Objeto1_idx` (`Objeto_idObjeto`),
  CONSTRAINT `fk_Prestado_Objeto1` FOREIGN KEY (`Objeto_idObjeto`) REFERENCES `objeto` (`idObjeto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Prestado_Usuario1` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestado`
--

LOCK TABLES `prestado` WRITE;
/*!40000 ALTER TABLE `prestado` DISABLE KEYS */;
INSERT INTO `prestado` VALUES (1,'Alejo','2022-01-03','2022-01-03','2021-12-08',1,14,'2022-01-02',-1),(2,'Juan',NULL,'2022-01-03','2022-01-20',1,14,'2022-01-03',-2),(5,'Carlos','2022-01-03',NULL,'2021-12-22',1,14,'2022-01-03',1),(6,'Manuel',NULL,NULL,'2022-01-21',1,14,'2022-01-03',0);
/*!40000 ALTER TABLE `prestado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ubicacion`
--

DROP TABLE IF EXISTS `ubicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ubicacion` (
  `idUbicacion` int(11) NOT NULL AUTO_INCREMENT,
  `ubicacion` varchar(45) NOT NULL,
  `planta` varchar(45) NOT NULL,
  `edificio` varchar(45) NOT NULL,
  PRIMARY KEY (`idUbicacion`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ubicacion`
--

LOCK TABLES `ubicacion` WRITE;
/*!40000 ALTER TABLE `ubicacion` DISABLE KEYS */;
INSERT INTO `ubicacion` VALUES (1,'Despacho 13','Planta 1','CITE III'),(2,'Despacho 15','Planta 3','CITE IV');
/*!40000 ALTER TABLE `ubicacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `contrasena` varchar(60) DEFAULT NULL,
  `correoElectronico` varchar(60) DEFAULT NULL,
  `rango` int(1) DEFAULT NULL,
  `departamento` int(1) DEFAULT NULL,
  `telefono` int(15) DEFAULT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'admin','$2a$10$xiwA88Jcs8csY3sAS5CG6evMRl2X0IhdSEKK8Y88fCXRFwYRF7bi2','ualinventarium@gmail.com',0,0,674915779),(4,'ualinventarium@gmail.com','$2a$10$kpfW8zGwHFjvEOAQxznWre5STGt1H4XDy5ZE4rMccE9hhLjJ2w4fG','aaf842@inlumine.ual.es',1,0,674915779),(5,'Delegación ESI','$2a$10$gnngjwrdZEtVUFAOxGgU2eUAfTUzSoPGNCLc7c9Y/pN4ata.opOG6','epsilon@ual.es',0,0,674915779),(6,'Juan Francisco Sanjuan Estrada','$2a$10$C4A3DReNOAKnbR5fnRU9GuFUJErG/nTaM82YZuRqR8dY8e7PplRZe','jsanjuan@ual.es',-1,0,674915779);
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

-- Dump completed on 2022-01-04 13:14:00
