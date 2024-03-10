-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: rhdb
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `head1`
--

DROP TABLE IF EXISTS `head1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `head1` (
  `COMBO` varchar(17) NOT NULL,
  `LAT` varchar(10) NOT NULL,
  `SG` varchar(10) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `PHONE` varchar(8) NOT NULL,
  `FLOW` double NOT NULL,
  `HOURS` double NOT NULL,
  `EST_STRAT` datetime NOT NULL,
  `PRIME_DATE` date DEFAULT NULL,
  `PRIME_TIME` int DEFAULT NULL,
  `START_DATE` date DEFAULT NULL,
  `START_TIME` int DEFAULT NULL,
  `FINISH_DATE` date DEFAULT NULL,
  `FINISH_TIME` int DEFAULT NULL,
  `PRIME_TOTAL` int DEFAULT NULL,
  `TOTAL_HOURS` int DEFAULT NULL,
  `CALLED` varchar(1) DEFAULT NULL,
  `HEAD1col` varchar(45) DEFAULT NULL,
  `WDO_NOTES` varchar(255) DEFAULT NULL,
  `COMMENTS` varchar(255) DEFAULT NULL,
  `ABNORMAL` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`COMBO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `head1`
--

LOCK TABLES `head1` WRITE;
/*!40000 ALTER TABLE `head1` DISABLE KEYS */;
/*!40000 ALTER TABLE `head1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `head2`
--

DROP TABLE IF EXISTS `head2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `head2` (
  `COMBO` varchar(17) NOT NULL,
  `LAT` varchar(10) NOT NULL,
  `SG` varchar(10) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `PHONE` varchar(8) NOT NULL,
  `FLOW` double NOT NULL,
  `HOURS` double NOT NULL,
  `EST_STRAT` datetime NOT NULL,
  `PRIME_DATE` date DEFAULT NULL,
  `PRIME_TIME` int DEFAULT NULL,
  `START_DATE` date DEFAULT NULL,
  `START_TIME` int DEFAULT NULL,
  `FINISH_DATE` date DEFAULT NULL,
  `FINISH_TIME` int DEFAULT NULL,
  `PRIME_TOTAL` int DEFAULT NULL,
  `TOTAL_HOURS` int DEFAULT NULL,
  `CALLED` varchar(1) DEFAULT NULL,
  `HEAD1col` varchar(45) DEFAULT NULL,
  `WDO_NOTES` varchar(255) DEFAULT NULL,
  `COMMENTS` varchar(255) DEFAULT NULL,
  `ABNORMAL` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`COMBO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `head2`
--

LOCK TABLES `head2` WRITE;
/*!40000 ALTER TABLE `head2` DISABLE KEYS */;
/*!40000 ALTER TABLE `head2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `head3`
--

DROP TABLE IF EXISTS `head3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `head3` (
  `COMBO` varchar(17) NOT NULL,
  `LAT` varchar(10) NOT NULL,
  `SG` varchar(10) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `PHONE` varchar(8) NOT NULL,
  `FLOW` double NOT NULL,
  `HOURS` double NOT NULL,
  `EST_STRAT` datetime NOT NULL,
  `PRIME_DATE` date DEFAULT NULL,
  `PRIME_TIME` int DEFAULT NULL,
  `START_DATE` date DEFAULT NULL,
  `START_TIME` int DEFAULT NULL,
  `FINISH_DATE` date DEFAULT NULL,
  `FINISH_TIME` int DEFAULT NULL,
  `PRIME_TOTAL` int DEFAULT NULL,
  `TOTAL_HOURS` int DEFAULT NULL,
  `CALLED` varchar(1) DEFAULT NULL,
  `HEAD1col` varchar(45) DEFAULT NULL,
  `WDO_NOTES` varchar(255) DEFAULT NULL,
  `COMMENTS` varchar(255) DEFAULT NULL,
  `ABNORMAL` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`COMBO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `head3`
--

LOCK TABLES `head3` WRITE;
/*!40000 ALTER TABLE `head3` DISABLE KEYS */;
/*!40000 ALTER TABLE `head3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `head4`
--

DROP TABLE IF EXISTS `head4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `head4` (
  `COMBO` varchar(17) NOT NULL,
  `LAT` varchar(10) NOT NULL,
  `SG` varchar(10) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `PHONE` varchar(8) NOT NULL,
  `FLOW` double NOT NULL,
  `HOURS` double NOT NULL,
  `EST_STRAT` datetime NOT NULL,
  `PRIME_DATE` date DEFAULT NULL,
  `PRIME_TIME` int DEFAULT NULL,
  `START_DATE` date DEFAULT NULL,
  `START_TIME` int DEFAULT NULL,
  `FINISH_DATE` date DEFAULT NULL,
  `FINISH_TIME` int DEFAULT NULL,
  `PRIME_TOTAL` int DEFAULT NULL,
  `TOTAL_HOURS` int DEFAULT NULL,
  `CALLED` varchar(1) DEFAULT NULL,
  `HEAD1col` varchar(45) DEFAULT NULL,
  `WDO_NOTES` varchar(255) DEFAULT NULL,
  `COMMENTS` varchar(255) DEFAULT NULL,
  `ABNORMAL` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`COMBO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `head4`
--

LOCK TABLES `head4` WRITE;
/*!40000 ALTER TABLE `head4` DISABLE KEYS */;
/*!40000 ALTER TABLE `head4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `head5`
--

DROP TABLE IF EXISTS `head5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `head5` (
  `COMBO` varchar(17) NOT NULL,
  `LAT` varchar(10) NOT NULL,
  `SG` varchar(10) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `PHONE` varchar(8) NOT NULL,
  `FLOW` double NOT NULL,
  `HOURS` double NOT NULL,
  `EST_STRAT` datetime NOT NULL,
  `PRIME_DATE` date DEFAULT NULL,
  `PRIME_TIME` int DEFAULT NULL,
  `START_DATE` date DEFAULT NULL,
  `START_TIME` int DEFAULT NULL,
  `FINISH_DATE` date DEFAULT NULL,
  `FINISH_TIME` int DEFAULT NULL,
  `PRIME_TOTAL` int DEFAULT NULL,
  `TOTAL_HOURS` int DEFAULT NULL,
  `CALLED` varchar(1) DEFAULT NULL,
  `HEAD1col` varchar(45) DEFAULT NULL,
  `WDO_NOTES` varchar(255) DEFAULT NULL,
  `COMMENTS` varchar(255) DEFAULT NULL,
  `ABNORMAL` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`COMBO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `head5`
--

LOCK TABLES `head5` WRITE;
/*!40000 ALTER TABLE `head5` DISABLE KEYS */;
/*!40000 ALTER TABLE `head5` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `m`
--

DROP TABLE IF EXISTS `m`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `m` (
  `COMBO` varchar(17) NOT NULL,
  `LAT` varchar(10) NOT NULL,
  `SG` varchar(10) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `PHONE` varchar(8) NOT NULL,
  `FLOW` double NOT NULL,
  `HOURS` double NOT NULL,
  `EST_STRAT` datetime NOT NULL,
  `PRIME_DATE` date DEFAULT NULL,
  `PRIME_TIME` int DEFAULT NULL,
  `START_DATE` date DEFAULT NULL,
  `START_TIME` int DEFAULT NULL,
  `FINISH_DATE` date DEFAULT NULL,
  `FINISH_TIME` int DEFAULT NULL,
  `PRIME_TOTAL` int DEFAULT NULL,
  `TOTAL_HOURS` int DEFAULT NULL,
  `CALLED` varchar(1) DEFAULT NULL,
  `HEAD1col` varchar(45) DEFAULT NULL,
  `WDO_NOTES` varchar(255) DEFAULT NULL,
  `COMMENTS` varchar(255) DEFAULT NULL,
  `ABNORMAL` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`COMBO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m`
--

LOCK TABLES `m` WRITE;
/*!40000 ALTER TABLE `m` DISABLE KEYS */;
/*!40000 ALTER TABLE `m` ENABLE KEYS */;
UNLOCK TABLES;

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
  `NAME` varchar(45) NOT NULL,
  `PHONE` varchar(8) NOT NULL,
  `FLOW` double NOT NULL,
  `HOURS` double NOT NULL,
  `ACRE` double NOT NULL,
  `CROP` varchar(2) NOT NULL,
  `TYPE` varchar(2) NOT NULL,
  `DATE` date NOT NULL,
  `TRANTIME` int NOT NULL,
  `EX` varchar(1) DEFAULT NULL,
  `FINAL` varchar(1) NOT NULL,
  `COMMENT` varchar(225) DEFAULT NULL,
  `SBXCFS` double DEFAULT NULL,
  `DELETED` varchar(1) DEFAULT NULL,
  `SA` varchar(2) NOT NULL,
  `HEAD` varchar(4) DEFAULT NULL,
  `EST_START` datetime DEFAULT NULL,
  `EST_FINISH` datetime DEFAULT NULL,
  `WDO_NOTES` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`COMBO`)
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
-- Table structure for table `un`
--

DROP TABLE IF EXISTS `un`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `un` (
  `COMBO` varchar(17) NOT NULL,
  `LAT` varchar(10) NOT NULL,
  `SG` varchar(10) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `PHONE` varchar(8) NOT NULL,
  `FLOW` double NOT NULL,
  `HOURS` double NOT NULL,
  `EST_STRAT` datetime NOT NULL,
  `PRIME_DATE` date DEFAULT NULL,
  `PRIME_TIME` int DEFAULT NULL,
  `START_DATE` date DEFAULT NULL,
  `START_TIME` int DEFAULT NULL,
  `FINISH_DATE` date DEFAULT NULL,
  `FINISH_TIME` int DEFAULT NULL,
  `PRIME_TOTAL` int DEFAULT NULL,
  `TOTAL_HOURS` int DEFAULT NULL,
  `CALLED` varchar(1) DEFAULT NULL,
  `HEAD1col` varchar(45) DEFAULT NULL,
  `WDO_NOTES` varchar(255) DEFAULT NULL,
  `COMMENTS` varchar(255) DEFAULT NULL,
  `ABNORMAL` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`COMBO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `un`
--

LOCK TABLES `un` WRITE;
/*!40000 ALTER TABLE `un` DISABLE KEYS */;
/*!40000 ALTER TABLE `un` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-08 14:44:48
