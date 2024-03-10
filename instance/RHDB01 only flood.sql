-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (x86_64)
--
-- Host: localhost    Database: RHDB
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
-- Table structure for table `HEAD1`
--

DROP TABLE IF EXISTS `HEAD1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HEAD1` (
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
  `WDO_NOTES` varchar(255) DEFAULT NULL,
  `COMMENTS` varchar(255) DEFAULT NULL,
  `ABNORMAL` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`COMBO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HEAD1`
--

LOCK TABLES `HEAD1` WRITE;
/*!40000 ALTER TABLE `HEAD1` DISABLE KEYS */;
/*!40000 ALTER TABLE `HEAD1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HEAD2`
--

DROP TABLE IF EXISTS `HEAD2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HEAD2` (
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
  `WDO_NOTES` varchar(255) DEFAULT NULL,
  `COMMENTS` varchar(255) DEFAULT NULL,
  `ABNORMAL` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`COMBO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HEAD2`
--

LOCK TABLES `HEAD2` WRITE;
/*!40000 ALTER TABLE `HEAD2` DISABLE KEYS */;
/*!40000 ALTER TABLE `HEAD2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HEAD3`
--

DROP TABLE IF EXISTS `HEAD3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HEAD3` (
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
  `WDO_NOTES` varchar(255) DEFAULT NULL,
  `COMMENTS` varchar(255) DEFAULT NULL,
  `ABNORMAL` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`COMBO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HEAD3`
--

LOCK TABLES `HEAD3` WRITE;
/*!40000 ALTER TABLE `HEAD3` DISABLE KEYS */;
/*!40000 ALTER TABLE `HEAD3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HEAD4`
--

DROP TABLE IF EXISTS `HEAD4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HEAD4` (
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
  `WDO_NOTES` varchar(255) DEFAULT NULL,
  `COMMENTS` varchar(255) DEFAULT NULL,
  `ABNORMAL` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`COMBO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HEAD4`
--

LOCK TABLES `HEAD4` WRITE;
/*!40000 ALTER TABLE `HEAD4` DISABLE KEYS */;
/*!40000 ALTER TABLE `HEAD4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HEAD5`
--

DROP TABLE IF EXISTS `HEAD5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HEAD5` (
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
  `WDO_NOTES` varchar(255) DEFAULT NULL,
  `COMMENTS` varchar(255) DEFAULT NULL,
  `ABNORMAL` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`COMBO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HEAD5`
--

LOCK TABLES `HEAD5` WRITE;
/*!40000 ALTER TABLE `HEAD5` DISABLE KEYS */;
/*!40000 ALTER TABLE `HEAD5` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `M`
--

DROP TABLE IF EXISTS `M`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `M` (
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
  `WDO_NOTES` varchar(255) DEFAULT NULL,
  `COMMENTS` varchar(255) DEFAULT NULL,
  `ABNORMAL` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`COMBO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `M`
--

LOCK TABLES `M` WRITE;
/*!40000 ALTER TABLE `M` DISABLE KEYS */;
/*!40000 ALTER TABLE `M` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Orders` (
  `COMBO` varchar(18) NOT NULL,
  `LAT` varchar(10) NOT NULL,
  `SG` varchar(10) NOT NULL,
  `NAME` varchar(45) NOT NULL,
  `PHONE` varchar(11) NOT NULL,
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
-- Dumping data for table `Orders`
--

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UN`
--

DROP TABLE IF EXISTS `UN`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UN` (
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
  `WDO_NOTES` varchar(255) DEFAULT NULL,
  `COMMENTS` varchar(255) DEFAULT NULL,
  `ABNORMAL` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`COMBO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UN`
--

LOCK TABLES `UN` WRITE;
/*!40000 ALTER TABLE `UN` DISABLE KEYS */;
/*!40000 ALTER TABLE `UN` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-10 11:35:49
