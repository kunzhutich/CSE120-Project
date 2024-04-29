-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (x86_64)
--
-- Host: localhost    Database: rhdb
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `COMBO` varchar(17) NOT NULL,
  `LAT` varchar(10) NOT NULL,
  `SG` varchar(10) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `PHONE` varchar(10) NOT NULL,
  `FLOW` double NOT NULL,
  `HOURS` double NOT NULL,
  `ACRE` double NOT NULL,
  `CROP` varchar(2) NOT NULL,
  `TYPE` varchar(2) NOT NULL,
  `DATE` date NOT NULL,
  `TRANTIME` int NOT NULL,
  `EX` varchar(1) DEFAULT NULL,
  `FINAL` varchar(1) NOT NULL,
  `COMMENT` varchar(255) DEFAULT NULL,
  `SBXCFS` double DEFAULT NULL,
  `DELETED` varchar(1) DEFAULT NULL,
  `SA` varchar(2) NOT NULL,
  `HEAD` varchar(4) DEFAULT NULL,
  `EST_START` datetime DEFAULT NULL,
  `EST_FINISH` datetime DEFAULT NULL,
  `WDO_NOTES` varchar(255) DEFAULT NULL,
  `PRIME_DATETIME` datetime DEFAULT NULL,
  `START_DATETIME` datetime DEFAULT NULL,
  `FINISH_DATETIME` datetime DEFAULT NULL,
  `PRIME_TOTAL` int DEFAULT NULL,
  `TOTAL_HOURS` int DEFAULT NULL,
  `CALLED` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`COMBO`),
  UNIQUE KEY `COMBO_UNIQUE` (`COMBO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wdo`
--

DROP TABLE IF EXISTS `wdo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wdo` (
  `username` varchar(20) NOT NULL,
  `password` varchar(10) NOT NULL,
  `sa` varchar(2) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wdo`
--

LOCK TABLES `wdo` WRITE;
/*!40000 ALTER TABLE `wdo` DISABLE KEYS */;
INSERT INTO `wdo` VALUES ('bappoeattaco','1234','01'),('liliwillow','1234','03'),('paperpika','1234','01'),('sesame','1234','05'),('standingemoji','1234','03');
/*!40000 ALTER TABLE `wdo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-28 18:05:20
