/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `leads_status` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `origins` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `platforms` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `prefix` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `rol_unique` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `staff` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `roleId` bigint unsigned NOT NULL DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `email` (`email`) USING BTREE,
  KEY `role` (`roleId`),
  CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE SET DEFAULT
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `city` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `reason` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `contact_status` bigint NOT NULL DEFAULT '0',
  `date_contact` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `note` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `staffId` bigint unsigned DEFAULT NULL COMMENT 'asigned_to',
  `originId` bigint unsigned DEFAULT NULL,
  `platformId` bigint unsigned DEFAULT NULL,
  UNIQUE KEY `id` (`id`),
  KEY `staffId` (`staffId`),
  KEY `originId` (`originId`),
  KEY `platformId` (`platformId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`staffId`) REFERENCES `staff` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`originId`) REFERENCES `origins` (`id`) ON DELETE SET NULL,
  CONSTRAINT `users_ibfk_3` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



INSERT INTO `origins` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Campaña Colima', NULL, NULL);
INSERT INTO `origins` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(2, 'Campaña Guadalajara', NULL, NULL);
INSERT INTO `origins` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(3, 'Manual', NULL, NULL);

INSERT INTO `platforms` (`id`, `name`, `createdAt`, `updatedAt`, `prefix`) VALUES
(1, 'Web', NULL, NULL, '');
INSERT INTO `platforms` (`id`, `name`, `createdAt`, `updatedAt`, `prefix`) VALUES
(2, 'WhatsApp', NULL, NULL, '');
INSERT INTO `platforms` (`id`, `name`, `createdAt`, `updatedAt`, `prefix`) VALUES
(3, 'Facebook', NULL, NULL, 'fb');
INSERT INTO `platforms` (`id`, `name`, `createdAt`, `updatedAt`, `prefix`) VALUES
(4, 'Instagram', NULL, NULL, 'ig'),
(5, 'Llamada Telefónica', NULL, NULL, ''),
(6, 'Visita al Módulo de Ventas', NULL, NULL, ''),
(7, 'Otro', NULL, NULL, NULL);

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Vendedor', NULL, NULL);
INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(2, 'Gerente', NULL, NULL);
INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(3, 'Administrador', NULL, NULL);

INSERT INTO `staff` (`id`, `name`, `email`, `password`, `status`, `roleId`, `createdAt`, `updatedAt`) VALUES
(2, 'David Alejandro Ayala Rizo', 'dev@alowee.com', '$2a$10$O5IqozS7w.W5GliiGDHau.DRbMuCyxTHtvHwWIYUemFbm8SOu.TtK', 1, 1, '2022-12-22 10:27:22', '2023-05-06 12:27:03');
INSERT INTO `staff` (`id`, `name`, `email`, `password`, `status`, `roleId`, `createdAt`, `updatedAt`) VALUES
(3, 'Alex Rizo', 'dev@alejandro.com', '$2a$10$5HPclzloLxytKtRO10opmOaAEphJgaG6bJCwbM00saRJGAGfPzHzu', 1, 2, '2022-12-22 10:27:22', '2023-03-27 14:12:32');
INSERT INTO `staff` (`id`, `name`, `email`, `password`, `status`, `roleId`, `createdAt`, `updatedAt`) VALUES
(5, 'Usuario Inactivo', 'david@andarah.com', '$2a$10$KFZfjUGlpHhoEJGUxJEnK.enyAo2FOO10btIBwfzuX1foBLg5re36', 1, 1, '2023-01-23 11:14:24', '2023-03-27 14:06:18');
INSERT INTO `staff` (`id`, `name`, `email`, `password`, `status`, `roleId`, `createdAt`, `updatedAt`) VALUES
(35, 'David Ayala', 'david@ayala.com', '$2a$10$VEi9Pp59.xm7FtUTdj/6oOPgHOOigpJKKTX4q8rkaVQSRuIBBynv6', 1, 2, '2023-04-14 11:11:35', '2023-04-14 11:11:35'),
(36, 'Alejandro Rizo', 'alejandro@dev.com', '$2a$10$03vJ20f7APbfgNtO8Gt3pueMiUOanYgKfuIW7qDPH1vXbGNqVqDv6', 1, 2, '2023-04-14 11:17:22', '2023-04-14 11:17:22');

INSERT INTO `users` (`id`, `name`, `email`, `city`, `phone_number`, `reason`, `contact_status`, `date_contact`, `note`, `createdAt`, `updatedAt`, `staffId`, `originId`, `platformId`) VALUES
(12, 'Usuario 1', 'test@gmail.com', 'Guadalajara', '+523121156565', 'Precio de los terrenos', 0, '2023-01-24', 'Nota de prueba', '2023-01-24 11:39:43', '2023-04-17 10:15:44', NULL, 2, 6);
INSERT INTO `users` (`id`, `name`, `email`, `city`, `phone_number`, `reason`, `contact_status`, `date_contact`, `note`, `createdAt`, `updatedAt`, `staffId`, `originId`, `platformId`) VALUES
(13, 'Usuario 2', 'test@outlook.com', 'Guadalajara', '+523121156565', 'Terrenos en venta', 0, '2023-01-24', 'Nota de prueba', '2023-01-24 11:39:43', '2023-04-17 12:53:58', NULL, 2, 2);
INSERT INTO `users` (`id`, `name`, `email`, `city`, `phone_number`, `reason`, `contact_status`, `date_contact`, `note`, `createdAt`, `updatedAt`, `staffId`, `originId`, `platformId`) VALUES
(16, 'Usuario 4', 'usuario4@test.com', 'Colima', '3122249802', 'Terrenos en venta', 0, '2023-02-14', 'Nota para probar', '2023-02-14 08:49:03', '2023-04-27 10:08:40', 2, 3, 3);
INSERT INTO `users` (`id`, `name`, `email`, `city`, `phone_number`, `reason`, `contact_status`, `date_contact`, `note`, `createdAt`, `updatedAt`, `staffId`, `originId`, `platformId`) VALUES
(17, 'Usuario 4', 'usuario4@test.com', 'Colima', '3122249802', 'Terrenos en venta', 0, '2023-02-14', 'Nota para probar', '2023-02-14 08:49:03', '2023-04-27 10:08:32', 2, 3, 2),
(19, 'Alejandro', 'test@test.com', 'Colima', '3122249802', 'De prueba', 0, '2023-03-29', 'Nota para probar form de ledas', '2023-03-29 11:49:02', '2023-04-17 12:57:34', NULL, 1, 5),
(20, 'David', 'david@a.com', 'Colima', '3125547870', 'De prueba', 0, '2023-03-29', 'de prueba', '2023-03-29 11:55:47', '2023-04-17 12:45:08', NULL, 2, 6),
(21, 'Cheko', 'sergio@c.com', 'Colima', '3121662332', 'de prueba', 0, '2023-04-08', 'asdasdasd', '2023-03-29 11:59:00', '2023-04-20 09:05:10', NULL, 1, 2),
(22, 'Pablo Calavera', 'pablo@c.com', 'Colima', '3122233344', 'De prueba', 0, '2023-03-22', 'Cambiaremos la nota ', '2023-03-29 12:01:39', '2023-04-17 12:56:37', NULL, 2, 5);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;