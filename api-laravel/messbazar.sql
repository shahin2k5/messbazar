-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 07, 2021 at 05:14 PM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `messbazar`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
CREATE TABLE IF NOT EXISTS `carts` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) DEFAULT NULL,
  `device_id` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_qnty` int(11) DEFAULT NULL,
  `total_purchase_price` int(11) DEFAULT NULL,
  `total_sale_price` int(11) DEFAULT NULL,
  `total_discount` int(11) DEFAULT NULL,
  `total_final_price` int(11) DEFAULT NULL,
  `total_profit` int(11) DEFAULT NULL,
  `cart_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cart_by` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `customer_id`, `device_id`, `product_qnty`, `total_purchase_price`, `total_sale_price`, `total_discount`, `total_final_price`, `total_profit`, `cart_status`, `cart_by`, `notes`, `created_at`, `updated_at`) VALUES
(29, 1624909004, NULL, 1, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-28 13:36:44', '2021-06-28 13:36:44'),
(2, NULL, '1624217079', 10, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-20 13:24:39', '2021-06-20 13:24:39'),
(3, NULL, '1624217266', 10, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-20 13:27:46', '2021-06-20 13:27:46'),
(4, NULL, '1624217315', 10, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-20 13:28:35', '2021-06-20 13:28:35'),
(5, NULL, '1624217344', 10, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-20 13:29:04', '2021-06-20 13:29:04'),
(6, NULL, '1624217466', 10, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-20 13:31:06', '2021-06-20 13:31:06'),
(7, 5, '1624217711', 10, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-20 13:35:11', '2021-06-20 13:35:11'),
(8, 1624219236, '1624219236', 10, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-20 14:00:36', '2021-06-20 14:00:36'),
(9, 1624219236, '1624219236', 10, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-20 14:00:36', '2021-06-20 14:00:36'),
(10, 1624220350, '1624220350', 10, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-20 14:19:10', '2021-06-20 14:19:10'),
(11, 1624220474, '1624220474', 10, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-20 14:21:15', '2021-06-20 14:21:15'),
(12, 1624220511, '1624220511', 10, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-20 14:21:51', '2021-06-20 14:21:51'),
(13, 1624221684, '1624221684', 10, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-20 14:41:24', '2021-06-20 14:41:24'),
(14, 1624221851, '1624221851', 10, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-20 14:44:11', '2021-06-20 14:44:11'),
(15, 1624222005, '1624222005', 10, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-20 14:46:45', '2021-06-20 14:46:45'),
(16, 1624222108, '1624222108', 10, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-20 14:48:28', '2021-06-20 14:48:28'),
(17, 1624222162, '1624222162', 10, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-20 14:49:22', '2021-06-20 14:49:22'),
(18, 1624222434, '1624222434', 10, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-20 14:53:54', '2021-06-20 14:53:54'),
(19, 1624222862, '1624222862', 10, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-20 15:01:02', '2021-06-20 15:01:02'),
(20, 1624223003, '1624223003', 10, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-20 15:03:23', '2021-06-20 15:03:23'),
(21, 1624223940, '1624223940', 10, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-20 15:19:00', '2021-06-20 15:19:00'),
(22, 1624468717, '1624468717', 10, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-23 11:18:37', '2021-06-23 11:18:37'),
(23, 1624468727, '1624468727', 10, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-23 11:18:47', '2021-06-23 11:18:47'),
(24, 1624469304, '1624469304', 10, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-23 11:28:24', '2021-06-23 11:28:24'),
(25, 1624472695, '1624472695', 10, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-23 12:24:55', '2021-06-23 12:24:55'),
(26, 1624723762, '1624723762', 10, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-26 10:09:22', '2021-06-26 10:09:22'),
(27, 1624726030, '1624726030', 10, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-26 10:47:10', '2021-06-26 10:47:10'),
(28, 1624726030, '1624726030', 10, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-26 10:47:10', '2021-06-26 10:47:10'),
(30, 1624909029, NULL, 1, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-28 13:37:09', '2021-06-28 13:37:09'),
(31, 1624909254, NULL, 1, 500, 650, 50, 600, 100, 'pending', 'user name', '', '2021-06-28 13:40:54', '2021-06-28 13:40:54'),
(37, NULL, '15c278256d55e931', 4, 500, 650, 50, 600, 100, 'confirmed', 'user name', '', '2021-07-04 09:53:53', '2021-07-04 10:31:07'),
(38, NULL, '15c278256d55e931', 4, 500, 650, 50, 600, 100, 'confirmed', 'user name', '', '2021-07-04 10:34:10', '2021-07-05 11:12:45'),
(39, NULL, '15c278256d55e931', 7, 500, 650, 50, 600, 100, 'confirmed', 'user name', '', '2021-07-05 11:41:23', '2021-07-05 11:57:55');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
CREATE TABLE IF NOT EXISTS `cart_items` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) DEFAULT NULL,
  `cart_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `purchase_price` int(11) DEFAULT NULL,
  `sale_price` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `final_sale_price` int(11) DEFAULT NULL,
  `unit_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pcs` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_qnty` int(11) DEFAULT NULL,
  `product_pcs` int(11) DEFAULT NULL,
  `subtotal_price` int(11) DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`id`, `customer_id`, `cart_id`, `product_id`, `purchase_price`, `sale_price`, `discount`, `final_sale_price`, `unit_type`, `pcs`, `product_qnty`, `product_pcs`, `subtotal_price`, `status`, `created_at`, `updated_at`) VALUES
(1, 0, 0, 1, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-20 13:50:04', '2021-06-20 13:50:04'),
(2, 0, 0, 1, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-20 13:51:07', '2021-06-20 13:51:07'),
(3, 0, 0, 1, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-20 13:51:27', '2021-06-20 13:51:27'),
(4, 0, 0, 1, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-20 13:51:58', '2021-06-20 13:51:58'),
(5, 1624219236, 8, 1, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-20 14:00:36', '2021-06-20 14:00:36'),
(6, 1624219236, 8, 1, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-20 14:00:36', '2021-06-20 14:00:36'),
(7, 1624219236, 8, 1, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-20 14:00:36', '2021-06-20 14:00:36'),
(8, 1624220350, 10, 1, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-20 14:19:10', '2021-06-20 14:19:10'),
(9, 1624220474, 11, 1, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-20 14:21:15', '2021-06-20 14:21:15'),
(10, 1624220511, 12, 1, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-20 14:21:51', '2021-06-20 14:21:51'),
(11, 1624221684, 13, 1, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-20 14:41:24', '2021-06-20 14:41:24'),
(12, 1624221851, 14, 1, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-20 14:44:11', '2021-06-20 14:44:11'),
(13, 1624222005, 15, 1, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-20 14:46:45', '2021-06-20 14:46:45'),
(14, 1624222108, 16, 1, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-20 14:48:28', '2021-06-20 14:48:28'),
(15, 1624222162, 17, 1, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-20 14:49:22', '2021-06-20 14:49:22'),
(16, 1624222434, 18, 1, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-20 14:53:54', '2021-06-20 14:53:54'),
(17, 1624222862, 19, 1, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-20 15:01:02', '2021-06-20 15:01:02'),
(18, 1624223003, 20, 1, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-20 15:03:23', '2021-06-20 15:03:23'),
(19, 1624223940, 21, 1, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-20 15:19:00', '2021-06-20 15:19:00'),
(20, 1624468717, 22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 'pending', '2021-06-23 11:18:37', '2021-06-23 11:18:37'),
(21, 1624468727, 23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 'pending', '2021-06-23 11:18:47', '2021-06-23 11:18:47'),
(22, 1624469304, 24, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 'pending', '2021-06-23 11:28:24', '2021-06-23 11:28:24'),
(23, 1624472695, 25, 2, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-23 12:24:55', '2021-06-23 12:24:55'),
(24, 1624723762, 26, 2, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-26 10:09:22', '2021-06-26 10:09:22'),
(25, 1624726030, 27, 2, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-26 10:47:10', '2021-06-26 10:47:10'),
(110, NULL, 39, 5, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'confirmed', '2021-07-05 11:42:53', '2021-07-05 11:57:55'),
(45, 1624729049, 28, 1, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-27 04:51:06', '2021-06-27 04:51:06'),
(32, 1624729049, 28, 2, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-27 00:38:12', '2021-06-27 00:38:12'),
(41, 1624729049, 28, 1, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-27 01:55:31', '2021-06-27 01:55:31'),
(42, 1624729049, 28, 2, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-27 03:18:34', '2021-06-27 03:18:34'),
(43, 1624729049, 28, 2, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-27 03:58:00', '2021-06-27 03:58:00'),
(46, 1624909004, 29, 1, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-28 13:36:44', '2021-06-28 13:36:44'),
(47, 1624909029, 30, 2, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-28 13:37:09', '2021-06-28 13:37:09'),
(48, 1624909254, 31, 2, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-28 13:40:54', '2021-06-28 13:40:54'),
(49, 1624909465, 32, 2, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-06-28 13:44:25', '2021-06-28 13:44:25'),
(112, NULL, 39, 2, 320, 350, NULL, 350, NULL, NULL, 3, NULL, 1050, 'confirmed', '2021-07-05 11:43:49', '2021-07-05 11:57:55'),
(111, NULL, 39, 1, 320, 350, 5, 345, NULL, NULL, 6, 4, 2070, 'confirmed', '2021-07-05 11:43:41', '2021-07-05 11:57:55'),
(109, NULL, 39, 1, 320, 350, 5, 345, NULL, NULL, 6, 4, 2070, 'confirmed', '2021-07-05 11:42:48', '2021-07-05 11:57:55'),
(108, NULL, 39, 2, 320, 350, NULL, 350, NULL, NULL, 3, NULL, 1050, 'confirmed', '2021-07-05 11:42:37', '2021-07-05 11:57:55'),
(107, NULL, 39, 2, 320, 350, NULL, 350, NULL, NULL, 3, NULL, 1050, 'confirmed', '2021-07-05 11:41:32', '2021-07-05 11:57:55'),
(106, NULL, 39, 1, 320, 350, 5, 345, NULL, NULL, 4, 4, 1380, 'confirmed', '2021-07-05 11:41:23', '2021-07-05 11:57:55'),
(105, NULL, 38, 1, 320, 350, 5, 345, NULL, NULL, 4, 1, 1380, 'confirmed', '2021-07-05 11:11:42', '2021-07-05 11:12:45'),
(103, NULL, 38, 6, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'confirmed', '2021-07-04 13:26:22', '2021-07-05 11:12:45'),
(104, NULL, 38, 4, 320, 350, NULL, 350, NULL, NULL, 1, NULL, 350, 'confirmed', '2021-07-04 13:26:27', '2021-07-05 11:12:45'),
(102, NULL, 38, 1, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'confirmed', '2021-07-04 10:34:10', '2021-07-05 11:12:45'),
(101, NULL, 37, 1, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-07-04 10:31:07', '2021-07-04 10:31:07'),
(100, NULL, 37, 1, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-07-04 10:30:52', '2021-07-04 10:30:52'),
(99, NULL, 37, 1, 320, 350, 5, 345, NULL, NULL, 1, NULL, 345, 'pending', '2021-07-04 10:26:27', '2021-07-04 10:26:27'),
(98, NULL, 37, 1, 320, 350, 5, 345, NULL, NULL, 2, 1, 690, 'confirmed', '2021-07-04 09:53:53', '2021-07-04 10:14:25');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_title`, `image`, `parent_id`, `created_at`, `updated_at`) VALUES
(1, 'Radhoni', 'assets/images/categories/01.png', NULL, NULL, NULL),
(2, 'Mach & Mangso', 'assets/images/categories/02.png', NULL, NULL, NULL),
(3, 'Vegetables', 'assets/images/categories/03.png', NULL, NULL, NULL),
(4, 'Home', 'assets/images/categories/04.png', NULL, NULL, NULL),
(5, 'Medical', 'assets/images/categories/05.png', NULL, NULL, NULL),
(6, 'Drinks', 'assets/images/categories/06.png', NULL, NULL, NULL),
(7, 'Beauty', 'assets/images/categories/07.png', NULL, NULL, NULL),
(8, 'Masala', 'assets/images/categories/08.png', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `devlivery_addresses`
--

DROP TABLE IF EXISTS `devlivery_addresses`;
CREATE TABLE IF NOT EXISTS `devlivery_addresses` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) DEFAULT NULL,
  `cart_id` int(11) DEFAULT NULL,
  `receiver_full_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address1` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address2` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `delivery_by` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2019_08_19_000000_create_failed_jobs_table', 1),
(3, '2021_06_03_073242_create_categories_table', 1),
(4, '2021_06_03_073528_create_sub_categories_table', 1),
(5, '2021_06_03_073608_create_products_table', 1),
(6, '2021_06_03_073632_create_carts_table', 1),
(7, '2021_06_03_073648_create_cart_items_table', 1),
(8, '2021_06_03_073800_create_devlivery_addresses_table', 1),
(9, '2021_06_03_073920_create_orderable_lists_table', 1),
(15, '2021_06_28_075649_create_order_addresses_table', 2),
(14, '2021_06_28_075615_create_order_items_table', 2),
(13, '2021_06_28_075336_create_orders_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `orderable_lists`
--

DROP TABLE IF EXISTS `orderable_lists`;
CREATE TABLE IF NOT EXISTS `orderable_lists` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) DEFAULT NULL,
  `cartable_type` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_qnty` int(11) DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cart_by` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) DEFAULT NULL,
  `cart_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_qnty` int(11) DEFAULT NULL,
  `total_purchase_price` int(11) DEFAULT NULL,
  `total_sale_price` int(11) DEFAULT NULL,
  `total_discount` int(11) DEFAULT NULL,
  `total_final_price` int(11) DEFAULT NULL,
  `total_profit` int(11) DEFAULT NULL,
  `cart_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cart_by` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_id`, `cart_id`, `product_qnty`, `total_purchase_price`, `total_sale_price`, `total_discount`, `total_final_price`, `total_profit`, `cart_status`, `cart_by`, `notes`, `created_at`, `updated_at`) VALUES
(1, NULL, '28', 29, 500, 650, 50, 600, 100, 'processing', 'main user', '', '2021-06-28 13:22:23', '2021-06-28 13:22:23'),
(2, NULL, '32', 1, 500, 650, 50, 600, 100, 'processing', 'main user', '', '2021-06-28 13:46:16', '2021-06-28 13:46:16'),
(3, NULL, '33', 2, 500, 650, 50, 600, 100, 'processing', 'main user', '', '2021-06-28 13:54:03', '2021-06-28 13:54:03'),
(4, NULL, '34', 6, 500, 650, 50, 600, 100, 'processing', 'main user', '', '2021-06-29 08:47:04', '2021-06-29 08:47:04'),
(5, NULL, '35', 3, 500, 650, 50, 600, 100, 'processing', 'main user', '', '2021-06-29 09:12:20', '2021-06-29 09:12:20'),
(6, NULL, '36', 35, 500, 650, 50, 600, 100, 'processing', 'main user', '', '2021-07-04 08:27:04', '2021-07-04 08:27:04'),
(7, NULL, '37', 1, 500, 650, 50, 600, 100, 'processing', 'User', '', '2021-07-04 10:10:39', '2021-07-04 10:10:39'),
(8, NULL, '37', 1, 500, 650, 50, 600, 100, 'processing', 'User', '', '2021-07-04 10:11:58', '2021-07-04 10:11:58'),
(9, NULL, '37', 1, 500, 650, 50, 600, 100, 'processing', 'User', '', '2021-07-04 10:14:25', '2021-07-04 10:14:25'),
(10, NULL, '38', 4, 500, 650, 50, 600, 100, 'processing', 'User', '', '2021-07-05 11:12:45', '2021-07-05 11:12:45'),
(11, NULL, '39', 7, 500, 650, 50, 600, 100, 'processing', 'User', '', '2021-07-05 11:57:55', '2021-07-05 11:57:55');

-- --------------------------------------------------------

--
-- Table structure for table `order_addresses`
--

DROP TABLE IF EXISTS `order_addresses`;
CREATE TABLE IF NOT EXISTS `order_addresses` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) DEFAULT NULL,
  `cart_id` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `house_mess_name` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_full_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `full_address` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_mobile` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_type` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `branch_name` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_addresses`
--

INSERT INTO `order_addresses` (`id`, `customer_id`, `cart_id`, `order_id`, `house_mess_name`, `user_full_name`, `full_address`, `user_mobile`, `user_type`, `branch_name`, `notes`, `created_at`, `updated_at`) VALUES
(1, NULL, 32, 2, NULL, 'shahin alam', 'Sanarpar, Siddirgonj', '01977801', NULL, NULL, 'unverified', '2021-06-28 13:46:16', '2021-06-28 13:46:16'),
(2, NULL, 33, 3, NULL, 'Farid', 'Kalkini', '01977893801', NULL, NULL, 'unverified', '2021-06-28 13:54:03', '2021-06-28 13:54:03'),
(3, NULL, 34, 4, NULL, 'hasan rahman', 'Raja bazar', '0197780331', NULL, NULL, 'unverified', '2021-06-29 08:47:04', '2021-06-29 08:47:04'),
(4, NULL, 35, 5, NULL, 'shahin alam', 'Sanarpar, Siddirgonj', '01977801', NULL, NULL, 'unverified', '2021-06-29 09:12:20', '2021-06-29 09:12:20'),
(5, NULL, 36, 6, NULL, NULL, NULL, NULL, NULL, NULL, 'unverified', '2021-07-04 08:27:04', '2021-07-04 08:27:04'),
(6, NULL, 37, 7, NULL, NULL, NULL, NULL, NULL, NULL, 'unverified', '2021-07-04 10:10:39', '2021-07-04 10:10:39'),
(7, NULL, 37, 8, NULL, NULL, NULL, NULL, NULL, NULL, 'unverified', '2021-07-04 10:11:58', '2021-07-04 10:11:58'),
(8, NULL, 37, 9, NULL, NULL, NULL, NULL, NULL, NULL, 'unverified', '2021-07-04 10:14:25', '2021-07-04 10:14:25'),
(9, NULL, 38, 10, NULL, NULL, NULL, NULL, NULL, NULL, 'unverified', '2021-07-05 11:12:45', '2021-07-05 11:12:45'),
(10, NULL, 39, 11, NULL, NULL, NULL, NULL, NULL, NULL, 'unverified', '2021-07-05 11:57:55', '2021-07-05 11:57:55');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `cart_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `purchase_price` int(11) DEFAULT NULL,
  `sale_price` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `final_sale_price` int(11) DEFAULT NULL,
  `product_qnty` int(11) DEFAULT NULL,
  `subtotal_price` int(11) DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `customer_id`, `cart_id`, `product_id`, `purchase_price`, `sale_price`, `discount`, `final_sale_price`, `product_qnty`, `subtotal_price`, `status`, `created_at`, `updated_at`) VALUES
(1, NULL, 1624729049, 28, 1, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-28 13:03:47', '2021-06-28 13:03:47'),
(2, NULL, 1624729049, 28, 2, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-28 13:03:47', '2021-06-28 13:03:47'),
(3, NULL, 1624729049, 28, 1, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-28 13:03:47', '2021-06-28 13:03:47'),
(4, NULL, 1624729049, 28, 2, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-28 13:03:47', '2021-06-28 13:03:47'),
(5, NULL, 1624729049, 28, 2, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-28 13:03:47', '2021-06-28 13:03:47'),
(6, NULL, 1624729049, 28, 1, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-28 13:03:56', '2021-06-28 13:03:56'),
(7, NULL, 1624729049, 28, 2, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-28 13:03:56', '2021-06-28 13:03:56'),
(8, NULL, 1624729049, 28, 1, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-28 13:03:56', '2021-06-28 13:03:56'),
(9, NULL, 1624729049, 28, 2, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-28 13:03:56', '2021-06-28 13:03:56'),
(10, NULL, 1624729049, 28, 2, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-28 13:03:56', '2021-06-28 13:03:56'),
(11, NULL, 1624729049, 28, 1, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-28 13:05:03', '2021-06-28 13:05:03'),
(12, NULL, 1624729049, 28, 2, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-28 13:05:03', '2021-06-28 13:05:03'),
(13, NULL, 1624729049, 28, 1, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-28 13:05:03', '2021-06-28 13:05:03'),
(14, NULL, 1624729049, 28, 2, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-28 13:05:03', '2021-06-28 13:05:03'),
(15, NULL, 1624729049, 28, 2, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-28 13:05:03', '2021-06-28 13:05:03'),
(16, NULL, 1624729049, 28, 1, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-28 13:22:23', '2021-06-28 13:22:23'),
(17, NULL, 1624729049, 28, 2, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-28 13:22:23', '2021-06-28 13:22:23'),
(18, NULL, 1624729049, 28, 1, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-28 13:22:23', '2021-06-28 13:22:23'),
(19, NULL, 1624729049, 28, 2, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-28 13:22:23', '2021-06-28 13:22:23'),
(20, NULL, 1624729049, 28, 2, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-28 13:22:23', '2021-06-28 13:22:23'),
(21, NULL, 1624909465, 32, 2, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-28 13:46:16', '2021-06-28 13:46:16'),
(22, NULL, 1624909917, 33, 1, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-28 13:54:03', '2021-06-28 13:54:03'),
(23, NULL, 1624909917, 33, 1, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-28 13:54:03', '2021-06-28 13:54:03'),
(24, NULL, 1624977478, 34, 2, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-29 08:47:04', '2021-06-29 08:47:04'),
(25, NULL, 1624977478, 34, 6, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-29 08:47:04', '2021-06-29 08:47:04'),
(26, NULL, 1624977478, 34, 1, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-29 08:47:04', '2021-06-29 08:47:04'),
(27, NULL, 1624977478, 34, 5, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-29 08:47:04', '2021-06-29 08:47:04'),
(28, NULL, 1624978122, 35, 1, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-29 09:12:20', '2021-06-29 09:12:20'),
(29, NULL, 1624978122, 35, 2, 320, 350, 5, 345, 1, 345, 'processing', '2021-06-29 09:12:20', '2021-06-29 09:12:20'),
(30, NULL, 1624979992, 36, 2, 320, 350, NULL, 350, 4, 1400, 'processing', '2021-07-04 08:27:04', '2021-07-04 08:27:04'),
(31, NULL, 1624979992, 36, 1, 320, 350, 5, 345, 2, 690, 'processing', '2021-07-04 08:27:04', '2021-07-04 08:27:04'),
(32, NULL, 1624979992, 36, 1, 320, 350, 5, 345, 2, 690, 'processing', '2021-07-04 08:27:04', '2021-07-04 08:27:04'),
(33, NULL, NULL, 37, 1, 320, 350, 5, 345, 2, 690, 'processing', '2021-07-04 10:10:39', '2021-07-04 10:10:39'),
(34, NULL, NULL, 37, 1, 320, 350, 5, 345, 2, 690, 'processing', '2021-07-04 10:11:58', '2021-07-04 10:11:58'),
(35, NULL, NULL, 37, 1, 320, 350, 5, 345, 2, 690, 'processing', '2021-07-04 10:14:25', '2021-07-04 10:14:25'),
(36, NULL, NULL, 38, 1, 320, 350, 5, 345, 4, 1380, 'processing', '2021-07-05 11:12:45', '2021-07-05 11:12:45'),
(37, NULL, NULL, 38, 6, 320, 350, 5, 345, 1, 345, 'processing', '2021-07-05 11:12:45', '2021-07-05 11:12:45'),
(38, NULL, NULL, 38, 4, 320, 350, NULL, 350, 1, 350, 'processing', '2021-07-05 11:12:45', '2021-07-05 11:12:45'),
(39, NULL, NULL, 38, 1, 320, 350, 5, 345, 1, 345, 'processing', '2021-07-05 11:12:45', '2021-07-05 11:12:45'),
(40, NULL, NULL, 39, 5, 320, 350, 5, 345, 1, 345, 'processing', '2021-07-05 11:57:55', '2021-07-05 11:57:55'),
(41, NULL, NULL, 39, 2, 320, 350, NULL, 350, 3, 1050, 'processing', '2021-07-05 11:57:55', '2021-07-05 11:57:55'),
(42, NULL, NULL, 39, 1, 320, 350, 5, 345, 6, 2070, 'processing', '2021-07-05 11:57:55', '2021-07-05 11:57:55'),
(43, NULL, NULL, 39, 1, 320, 350, 5, 345, 6, 2070, 'processing', '2021-07-05 11:57:55', '2021-07-05 11:57:55'),
(44, NULL, NULL, 39, 2, 320, 350, NULL, 350, 3, 1050, 'processing', '2021-07-05 11:57:55', '2021-07-05 11:57:55'),
(45, NULL, NULL, 39, 2, 320, 350, NULL, 350, 3, 1050, 'processing', '2021-07-05 11:57:55', '2021-07-05 11:57:55'),
(46, NULL, NULL, 39, 1, 320, 350, 5, 345, 4, 1380, 'processing', '2021-07-05 11:57:55', '2021-07-05 11:57:55');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `subcategory_id` int(11) DEFAULT NULL,
  `product_title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_description` text COLLATE utf8mb4_unicode_ci,
  `unit_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `purchase_price` int(11) DEFAULT NULL,
  `sale_price` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `final_sale_price` int(11) DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hot_product` tinyint(4) DEFAULT NULL,
  `new_arrival` tinyint(4) DEFAULT NULL,
  `discount_product` tinyint(4) DEFAULT NULL,
  `show_pcs_box` tinyint(4) DEFAULT NULL,
  `product_qnty` int(11) DEFAULT NULL,
  `product_pcs` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `subcategory_id`, `product_title`, `short_description`, `unit_type`, `purchase_price`, `sale_price`, `discount`, `final_sale_price`, `image`, `hot_product`, `new_arrival`, `discount_product`, `show_pcs_box`, `product_qnty`, `product_pcs`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Chocolate blue berry', 'এই পৃথিবীতে ঘটে যাওয়া যতসব ভয়ঙ্কর ভিডিও পেতে অবশ্যই \"Ghost Killer\" চ্যানেলটিকে সাবস্ক্রাইব করে রাখবেন এবং এই চ্যানেলটি সাথে থাকলে অবশ্যই জানতে পারবেন যে কোথায় কখন কিভাবে কার ', 'pcs', 320, 350, 5, 345, 'assets/images/products/01.jpg', 1, 1, NULL, 1, NULL, NULL, NULL, NULL),
(2, 1, 1, 'Chair NF95', 'Ghost Attack the Most Haunted School Horror ghost hunter video স্কুলে অ্যাটাক করলো আত্মা Ghost Kille', 'kgs', 320, 350, NULL, 350, 'assets/images/products/02.jpg', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 1, 2, 'Mori Najirshail', 'Ghost Attack the Most Haunted School Horror ghost hunter video স্কুলে অ্যাটাক করলো আত্মা Ghost Kille', 'ltr', 320, 350, 5, 345, 'assets/images/products/03.jpg', 1, 1, 1, 1, NULL, NULL, NULL, NULL),
(4, 1, 2, 'Chanachor BD', 'Ghost Attack the Most Haunted School Horror ghost hunter video স্কুলে অ্যাটাক করলো আত্মা Ghost Kille', 'bag', 320, 350, NULL, 350, 'assets/images/products/04.jpg', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL),
(5, 1, 1, 'Daal', 'এই পৃথিবীতে ঘটে যাওয়া যতসব ভয়ঙ্কর ভিডিও পেতে অবশ্যই \"Ghost Killer\" চ্যানেলটিকে সাবস্ক্রাইব করে রাখবেন এবং এই চ্যানেলটি সাথে থাকলে অবশ্যই জানতে পারবেন যে কোথায় কখন কিভাবে কার ', 'pack', 320, 350, 5, 345, 'assets/images/products/01.jpg', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL),
(6, 1, 1, 'Gora Doud', 'Ghost Attack the Most Haunted School Horror ghost hunter video স্কুলে অ্যাটাক করলো আত্মা Ghost Kille', 'doz', 320, 350, 5, 345, 'assets/images/products/06.jpg', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL),
(7, 1, 2, 'Lichu', 'Ghost Attack the Most Haunted School Horror ghost hunter video স্কুলে অ্যাটাক করলো আত্মা Ghost Kille', 'box', 320, 350, 5, 345, 'assets/images/products/03.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 1, 2, 'Banana', 'Ghost Attack the Most Haunted School Horror ghost hunter video স্কুলে অ্যাটাক করলো আত্মা Ghost Kille', 'bag', 320, 350, 5, 345, 'assets/images/products/04.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sub_categories`
--

DROP TABLE IF EXISTS `sub_categories`;
CREATE TABLE IF NOT EXISTS `sub_categories` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `category_title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sub_categories`
--

INSERT INTO `sub_categories` (`id`, `category_id`, `category_title`, `image`, `created_at`, `updated_at`) VALUES
(1, 1, 'Mosalla', 'assets/images/categories/sub-01.png', NULL, NULL),
(2, 1, 'Daal', 'assets/images/categories/sub-02.png', NULL, NULL),
(3, 2, 'Soyaben Oild', 'assets/images/categories/sub-03.png', NULL, NULL),
(4, 2, 'Onion', 'assets/images/categories/sub-04.png', NULL, NULL),
(5, 1, 'Mosalla', 'assets/images/categories/sub-01.png', NULL, NULL),
(6, 1, 'Ilish Mach', 'assets/images/categories/sub-02.png', NULL, NULL),
(7, 2, 'Telaphia Mach', 'assets/images/categories/sub-03.png', NULL, NULL),
(8, 2, 'Pabda Mach', 'assets/images/categories/sub-04.png', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `house_mess_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_full_name` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mess_member` int(11) DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `branch_name` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_address` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_mobile` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `house_mess_name`, `user_full_name`, `mess_member`, `email`, `branch_name`, `email_verified_at`, `password`, `full_address`, `user_mobile`, `user_type`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Mess Manjil', 'Mess Bazar', 5, 'messbazar@gmail.com', 'Khulna', NULL, '$2y$10$GolG6MZAYc.BB.uGqXX.x.qON5Zx/tKKzGv7tABihAcDsK75/eJ9e', 'Farm View Market', '01905793801', 'admin', NULL, NULL, NULL),
(4, 'Shah Monjil', 'Shahin Alam', NULL, 'abc5@gmail.com', 'Dhaka', NULL, '$2y$10$3DuZErhTCu4KWST8VXDXCeFiFWyLxNgGWCaI1DX5D3QxijS0aBine', 'Sanarpar, Siddirgonj', '01977801', 'Mess', NULL, '2021-06-24 11:29:38', '2021-06-24 11:29:38'),
(5, NULL, NULL, NULL, 'shahin@gmail.com', NULL, NULL, '$2y$10$OStWAXeiIomAvmJCik8douAR0nis0iMYbxDWZQfQlAF1cpEMAlbki', NULL, NULL, NULL, NULL, '2021-07-05 09:51:20', '2021-07-05 09:51:20'),
(6, NULL, NULL, NULL, 'shahin5@gmail.com', NULL, NULL, '$2y$10$xtcsNwK3LJo8KOFmUMqz5eWq6ofPgqlSH8bd6NXiMReQDud3eR42C', NULL, NULL, NULL, NULL, '2021-07-05 09:52:34', '2021-07-05 09:52:34'),
(7, NULL, NULL, NULL, 'abc6@gmail.com', NULL, NULL, '$2y$10$rIforYM3ARTF9OT9nIBGGeFXSGfEysiMOBXKODV8IIa9lb1fBqBv.', NULL, NULL, NULL, NULL, '2021-07-05 10:00:08', '2021-07-05 10:00:08'),
(8, 'alam mess', 'alam manager', 6, 'tar@abc.com', NULL, NULL, '$2y$10$A4A8EJFpgd8yyvHmDOncxeSopS8sZF8HUDJh2Jx1gaPw9xB/Wb10y', 'holod-98, Kawran Bazar', '555', 'mess', '$2y$10$aO2.CEIsuV66dzbcMFZLe.80qslCnKuBOzIj2GZFFGIVqB7JZjrdy', '2021-07-05 10:11:43', '2021-07-05 10:11:43'),
(9, 'Ahsan Manjil', 'Ahsan Ullah', NULL, 'kamal@gmail.com', NULL, NULL, '$2y$10$DnQLkWvOGbAIZ3xh315oUuHvGWtYPxvY4olNoT9jPZB.sHorjlfnG', '7666', '6666', 'house', '$2y$10$i2RgDojhyyUDd72mW5JeH.LlJNE1gbIahJPQaodkV87pf72xju59e', '2021-07-05 10:21:21', '2021-07-05 10:21:21');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
