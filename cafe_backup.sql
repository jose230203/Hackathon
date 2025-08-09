-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: cafe
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cafe_tables`
--

DROP TABLE IF EXISTS `cafe_tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cafe_tables` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `qr_code` varchar(255) NOT NULL,
  `location_description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `qr_code` (`qr_code`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cafe_tables`
--

LOCK TABLES `cafe_tables` WRITE;
/*!40000 ALTER TABLE `cafe_tables` DISABLE KEYS */;
INSERT INTO `cafe_tables` VALUES (1,'QR123','Esquina junto a la ventana');
/*!40000 ALTER TABLE `cafe_tables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `table_id` bigint DEFAULT NULL,
  `customer_name` text,
  `order_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pending','served','cancelled') DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `table_id` (`table_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`table_id`) REFERENCES `cafe_tables` (`id`)
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
-- Table structure for table `product_ratings`
--

DROP TABLE IF EXISTS `product_ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_ratings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `product_id` bigint DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `review` text,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_ratings_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `product_ratings_chk_1` CHECK (((`rating` >= 1) and (`rating` <= 5)))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_ratings`
--

LOCK TABLES `product_ratings` WRITE;
/*!40000 ALTER TABLE `product_ratings` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `product_type` enum('coffee','pastry') NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Muffin','Muffin de chocolate',50.00,'pastry','https://i.pinimg.com/736x/34/94/c2/3494c2b1572fe41c357aa5672609574e.jpg'),(2,'Cheesecake','Cheesecake Cremoso',80.00,'pastry','https://i.pinimg.com/736x/53/ff/e2/53ffe2ce6d416ba5dd9492580c4e8251.jpg'),(3,'cosa de horno','Cosa de  horno Dulce ',35.00,'pastry','https://i.pinimg.com/736x/12/33/c0/1233c02a73e094cd356d67048fd81d07.jpg'),(4,'Tiramisu','Tiramisu  ',35.00,'pastry','https://i.pinimg.com/736x/d1/d1/31/d1d1311badc41a24de8fdf024e9ff598.jpg'),(5,'Pastel Fresa','Trozo de  pastel  ',115.00,'pastry','https://i.pinimg.com/736x/d8/5d/19/d85d195719b4c0cca08f8024c2410511.jpg'),(6,'Pastel Chocolate','Trozo de  pastel  ',130.00,'pastry','https://i.pinimg.com/736x/87/90/c4/8790c4d93d127e89556a725780262bd3.jpg'),(7,'galleta  con chispas de Chocolate','Una Galleta con chispas de chocolate  ',65.00,'pastry','https://i.pinimg.com/736x/87/90/c4/8790c4d93d127e89556a725780262bd3.jpg'),(8,'flan','Flan de Vainilla  ',155.00,'pastry','https://i.pinimg.com/736x/93/a3/67/93a367d54a6f0f4b58220475a421f918.jpg'),(9,'Pancakes','Pancackes de Vainilla',185.00,'pastry','https://i.pinimg.com/736x/7d/75/bd/7d75bddb4303619dddd0318a0a7cec5c.jpg'),(10,'Croissant','Crujiente con mantequilla',80.00,'pastry','https://i.pinimg.com/736x/e0/2f/0f/e02f0f9bfdc3d938102d7edf792450c1.jpg'),(11,'Capuchino Clásico','Café con leche y espuma',98.50,'coffee','https://i.pinimg.com/736x/50/f1/7c/50f17c380525acf16c5ad8df185b1554.jpg'),(12,'Latte Vainilla','Café suave con esencia de vainilla',105.00,'coffee','https://i.pinimg.com/736x/a8/75/bd/a875bd2ef9ed3b4bd08b0120750ea915.jpg'),(13,'Mocha Chocolate','Café con chocolate y leche',110.00,'coffee','https://i.pinimg.com/736x/22/8b/72/228b72a03cb98c19063193cf0188a6a3.jpg'),(14,'Espresso Doble','Doble carga de café intenso',89.00,'coffee','https://i.pinimg.com/736x/71/79/45/717945c1498c91ac9af4cbd687ffc1e3.jpg'),(15,'Café Caramelo','Café dulce con sirope de caramelo',112.00,'coffee','https://i.pinimg.com/736x/70/d6/a7/70d6a7bac27b6fd90f8880e22cef25ce.jpg'),(16,'Café Helado','Refrescante café frío con hielo',95.00,'coffee','https://i.pinimg.com/736x/93/50/8d/93508dfce47fd1d677be051d6527a0b4.jpg'),(17,'Flat White','Café suave con leche al vapor',102.00,'coffee','https://i.pinimg.com/736x/16/42/64/164264001bf63969db510a284c941d17.jpg'),(18,'Americano','Café negro diluido con agua caliente',85.00,'coffee','https://i.pinimg.com/736x/83/28/b6/8328b6f35d523c0dced5872e3ed2624b.jpg'),(19,'Macchiato','Espresso con un toque de leche',90.00,'coffee','https://i.pinimg.com/736x/55/0a/cc/550accd803d018618e663ef259e365dd.jpg'),(20,'Affogato','Helado de vainilla bañado en espresso',120.00,'coffee','https://i.pinimg.com/736x/1e/b2/1a/1eb21a3394c70a1b23d1e6f9804bc3c1.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-09 20:34:10
