-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: mobile-hour-jin
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `changelog`
--

DROP TABLE IF EXISTS `changelog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `changelog` (
  `changelog_id` int NOT NULL AUTO_INCREMENT,
  `changelog_change_date` datetime NOT NULL,
  `changelog_change_description` varchar(100) NOT NULL,
  `changelog_staff_id` int NOT NULL,
  PRIMARY KEY (`changelog_id`),
  KEY `fk_user_changelogs_idx` (`changelog_staff_id`),
  CONSTRAINT `fk_user_changelogs` FOREIGN KEY (`changelog_staff_id`) REFERENCES `staff` (`staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `changelog`
--

LOCK TABLES `changelog` WRITE;
/*!40000 ALTER TABLE `changelog` DISABLE KEYS */;
INSERT INTO `changelog` VALUES (1,'2022-10-26 13:48:38','Product: iPhone 15 has been updated',2),(2,'2022-10-26 13:48:44','Product: iPhone 16 has been updated',2),(3,'2022-10-27 13:48:48','Product: Pixel 9 has been updated',2),(4,'2022-10-28 13:48:53','Staff memeber Jin has been updated',2),(5,'2022-10-29 13:49:05','Order ID: 18 status has been change to cancelled',2),(6,'2022-10-31 13:49:07','Order ID: 19 status has been change to complete',2),(7,'2022-10-31 13:53:26','Product: Window Phone 2022 has been created',2),(8,'2022-10-31 13:53:45','Product: Windows Phone 2022 has been updated',2),(9,'2022-10-31 13:54:30','Product: Windows Phone 2022 has been updated',2);
/*!40000 ALTER TABLE `changelog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `features`
--

DROP TABLE IF EXISTS `features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `features` (
  `feature_id` int NOT NULL AUTO_INCREMENT,
  `feature_weight_g` int NOT NULL,
  `feature_height_mm` int NOT NULL,
  `feature_width_mm` int NOT NULL,
  `feature_depth_mm` int NOT NULL,
  `feature_operating_system` varchar(60) NOT NULL,
  `feature_screen_size` varchar(45) NOT NULL,
  `feature_screen_resolution` varchar(45) NOT NULL,
  `feature_cpu` varchar(80) NOT NULL,
  `feature_ram` varchar(45) NOT NULL,
  `feature_storage` varchar(45) NOT NULL,
  `feature_battery` varchar(45) NOT NULL,
  `feature_rear_camera` varchar(45) NOT NULL,
  `feature_front_camera` varchar(45) NOT NULL,
  PRIMARY KEY (`feature_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `features`
--

LOCK TABLES `features` WRITE;
/*!40000 ALTER TABLE `features` DISABLE KEYS */;
INSERT INTO `features` VALUES (1,340,120,60,10,'IOS20','7.6 inch','1920 x 1080 pixels','M 21','16GB','1TB','6000mAh','13MP','10MP'),(2,350,130,65,13,'IOS20','7inch','1920 x 1080 pixels','M20','16GB','1TB','6000mAh','15MP','12MP'),(3,300,125,66,15,'Andord 14','7.0 inch','1920 x 1080 pixels','CPU200','16GB','1TB','8000mAh','16MP','12MP'),(15,0,0,0,0,'z','xZx','dasd','dasd','asd','dasd','dasd','dasd','dasd'),(16,0,0,0,0,'asd','dasd','dasd','dasd','asd','dasd','dasd','dasd','dasd'),(17,260,110,50,9,'Windows','6.6 inch','1920 x 1080 pixels','cpu 2022','32GB','1TB','8000mAh','14MP','13MP');
/*!40000 ALTER TABLE `features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `order_date` datetime NOT NULL,
  `order_status` varchar(45) NOT NULL,
  `order_customer_first_name` varchar(45) NOT NULL,
  `order_customer_last_name` varchar(45) NOT NULL,
  `order_customer_address` varchar(100) NOT NULL,
  `order_customer_email` varchar(100) NOT NULL,
  `order_customer_phone` varchar(45) NOT NULL,
  `order_product_id` int NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `order_product_id_idx` (`order_product_id`),
  CONSTRAINT `order_product_id` FOREIGN KEY (`order_product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2022-10-14 13:27:59','cancelled','1','sdasd','1eweqe','a@q.com','213213123123',1),(2,'2022-10-19 10:04:20','complete','asda','sdasd','1eweqe','a@q.com','213213123123',1),(3,'2022-10-19 10:06:38','complete','asda','sdasd','1eweqe','a@q.com','213213123123',1),(4,'2022-10-19 10:07:43','complete','asdasd','dasd','1eweqe','a@q.com','213213123123',1),(5,'2022-10-19 10:16:29','complete','5','sdasd','1eweqe','a@q.com','213213123123',1),(6,'2022-10-19 10:23:59','complete','6','dasd','1eweqe','a@q.com','213213123123',1),(7,'2022-10-19 10:24:43','cancelled','asdasd','sdasd','1eweqe','a@q.com','213213123123',1),(8,'2022-10-19 10:25:34','complete','asda','sdasd','1eweqe','asd@fas.com','213213123123',1),(9,'2022-10-19 10:28:30','complete','asdasd','test','1eweqe','a@q.com','213213123123',1),(10,'2022-10-19 10:29:08','complete','asda','dasd','1eweqe','a@q.com','213213123123',2),(11,'2022-10-19 10:30:08','cancelled','akhsd','sdasd','1eweqe','a@q.com','213213123123',1),(12,'2022-10-19 10:32:37','complete','asdasd','test','1eweqe','asd@fas.com','213213123123',1),(13,'2022-10-19 21:09:42','complete','Jin','L','1','1212@qq.com','213213123123',1),(14,'2022-10-20 14:35:15','complete','asdasd','sdasd','1eweqe','a@q.com','213213123123',1),(15,'2022-10-24 20:35:21','complete','312','132','eqweqe','qeq@qq.com','123132133123',1),(16,'2022-10-24 21:39:05','complete','deqwe','deqwe','dasd','dasd@qq.com','1221232111',2),(17,'2022-10-25 09:03:34','complete','dasd','dasd','dasdasd','a@q.com','213213123123',2),(18,'2022-10-25 09:06:17','cancelled','asdasd','dasd','1eweqe','a@q.com','213213123123',2),(19,'2022-10-25 09:07:47','complete','deqwe','sdasd','1eweqe','a@q.com','213213123123',1),(20,'2022-10-25 09:11:30','pending','deqwe','dasd','1eweqe','a@q.com','213213123123',2),(21,'2022-10-25 09:12:13','pending','asda','sdasd','1eweqe','a@q.com','213213123123',2),(22,'2022-10-25 12:47:09','pending','asdasd','qdwd','21','a@q.com','123131312312',2),(23,'2022-10-25 14:15:08','pending','dD','adad','dasd','dsa@q.com','131231231233',3),(24,'2022-10-26 10:20:42','pending','asdasd','dasd','1eweqe','a@q.com','213213123123',2);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(80) NOT NULL,
  `product_model` varchar(45) NOT NULL,
  `product_manufacturer` varchar(45) NOT NULL,
  `product_price` decimal(10,2) NOT NULL,
  `product_stock` int NOT NULL,
  `product_feature_id` int NOT NULL,
  `product_picture` varchar(45) NOT NULL,
  `product_exist` tinyint(1) NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `fk_feature_products_idx` (`product_feature_id`),
  CONSTRAINT `fk_feature_products` FOREIGN KEY (`product_feature_id`) REFERENCES `features` (`feature_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'iPhone 15','Model 15','Apple',889.99,1118,1,'iphone15',1),(2,'iPhone 16','Model 16','Apple',999.89,97,2,'iphone16',1),(3,'Pixel 9','Model 9','Google',1000.89,11110,3,'pixel9',1),(12,'adasd','dad','adad',0.00,0,1,'default-phone-pic',0),(14,'dasd','das','dasd',0.00,0,1,'default-phone-pic',0),(15,'adsd','dasd','das',0.00,0,1,'default-phone-pic',0),(16,'adasd','dasd','dasd',0.00,0,15,'default-phone-pic',0),(17,'dasd','dasd','dasdas',0.00,0,16,'default-phone-pic',0),(18,'Windows Phone 2022','Model 2022','Microsoft',1899.99,999,17,'default-phone-pic',1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `staff_id` int NOT NULL AUTO_INCREMENT,
  `staff_first_name` varchar(50) NOT NULL,
  `staff_last_name` varchar(60) NOT NULL,
  `staff_role` varchar(45) NOT NULL,
  `staff_username` varchar(45) NOT NULL,
  `staff_password` varchar(80) NOT NULL,
  `staff_exist` tinyint NOT NULL,
  PRIMARY KEY (`staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,'Jin','test','sales','sales','$2a$10$IBPaOIMH0kHpXItt6LAdYutO5aekoQSGwY.l10utHLINiUXvO4v5W',1),(2,'Jin','user','manager','jin','$2a$10$N./lpCpv9ajF3/P7N1/ozeV4j2e6jmjlwOS8ijvrK8JWvj9SotbEK',1),(3,'abc','abc','manager','user','$2a$10$7XyqKLAiqPGiD7N7xO45deoeQj34Q6BK2JaXLGZdmysGkF3c/uzne',1),(4,'sd','dasd','stock','stock','$2a$10$m.KUEkiyeERtnLSgkAqrOOOq/tZtfnh77C/Z30cM9xNUEo9ntZr7K',0),(5,'test','user','manager','test2','$2a$10$ZcqGTkj6W1RoNiZXpw81le/QY5yCJc67pFyOfa/L27hlmBjQkpT/O',1);
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-01  8:19:49
