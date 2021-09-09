-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 09, 2021 at 01:16 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.3.28

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
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
  `current_meal_manager` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `current_meal_manager_mobile` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `current_rice_manager` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `current_rice_manager_mobile` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `house_mess_name`, `user_full_name`, `mess_member`, `email`, `branch_name`, `email_verified_at`, `password`, `full_address`, `user_mobile`, `user_type`, `current_meal_manager`, `current_meal_manager_mobile`, `current_rice_manager`, `current_rice_manager_mobile`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Mess Manjil', 'Mess Bazar', 5, 'messbazar@gmail.com', 'Khulna', NULL, '$2y$10$GolG6MZAYc.BB.uGqXX.x.qON5Zx/tKKzGv7tABihAcDsK75/eJ9e', 'Farm View Market', '01905793801', 'admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'Shah Monjil', 'Shahin Alam', NULL, 'abc5@gmail.com', 'Dhaka', NULL, '$2y$10$3DuZErhTCu4KWST8VXDXCeFiFWyLxNgGWCaI1DX5D3QxijS0aBine', 'Sanarpar, Siddirgonj', '01977801', 'Mess', NULL, NULL, NULL, NULL, NULL, '2021-06-24 11:29:38', '2021-06-24 11:29:38'),
(5, NULL, NULL, NULL, 'shahin@gmail.com', NULL, NULL, '$2y$10$OStWAXeiIomAvmJCik8douAR0nis0iMYbxDWZQfQlAF1cpEMAlbki', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-07-05 09:51:20', '2021-07-05 09:51:20'),
(6, NULL, NULL, NULL, 'shahin5@gmail.com', NULL, NULL, '$2y$10$xtcsNwK3LJo8KOFmUMqz5eWq6ofPgqlSH8bd6NXiMReQDud3eR42C', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-07-05 09:52:34', '2021-07-05 09:52:34'),
(7, NULL, NULL, NULL, 'abc6@gmail.com', NULL, NULL, '$2y$10$rIforYM3ARTF9OT9nIBGGeFXSGfEysiMOBXKODV8IIa9lb1fBqBv.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-07-05 10:00:08', '2021-07-05 10:00:08'),
(8, 'alam mess', 'alam manager', 6, 'tar@abc.com', NULL, NULL, '$2y$10$A4A8EJFpgd8yyvHmDOncxeSopS8sZF8HUDJh2Jx1gaPw9xB/Wb10y', 'holod-98, Kawran Bazar', '555', 'mess', NULL, NULL, NULL, NULL, '$2y$10$aO2.CEIsuV66dzbcMFZLe.80qslCnKuBOzIj2GZFFGIVqB7JZjrdy', '2021-07-05 10:11:43', '2021-07-05 10:11:43'),
(9, 'Ahsan Manjil', 'Ahsan Ullah', NULL, 'kamal@gmail.com', NULL, NULL, '$2y$10$DnQLkWvOGbAIZ3xh315oUuHvGWtYPxvY4olNoT9jPZB.sHorjlfnG', '7666', '6666', 'house', NULL, NULL, NULL, NULL, '$2y$10$i2RgDojhyyUDd72mW5JeH.LlJNE1gbIahJPQaodkV87pf72xju59e', '2021-07-05 10:21:21', '2021-07-05 10:21:21'),
(10, 'Eeeeee', 'Ddd', NULL, 'ddd@ddd.com', NULL, NULL, '$2y$10$MJgkWnTdwVQtZs/E.iPBUe0IL2vWWUXvy6Ot5GNWN/fE37e3n8feS', 'Eee', '444', 'house', NULL, NULL, NULL, NULL, '$2y$10$Pap8jsrKcjJIK4Vn13DZKOv7WoJ8ibGZpG8bBGFzEC9aUB7VJKcIq', '2021-07-26 11:32:35', '2021-07-26 11:32:35'),
(11, 'aaaa', 'aaa', NULL, 'aa@aa.com', NULL, NULL, '$2y$10$yfBSsgBzhdXpbsltq9RwreK3rToT4DEFjGM2LH0sF4rOyNIF6T6l2', 'aaa', 'aa', 'house', NULL, NULL, NULL, NULL, '$2y$10$4ItPLqLQCmcTL5z.VGG5R.dinAK41.v5g8mmqxrpwfY1q7gZjyLfi', '2021-07-26 11:36:16', '2021-07-26 11:36:16'),
(12, 'ff', 'ff', NULL, 'fff@gf.ff', NULL, NULL, '$2y$10$OskepAWh7pTXaOhkz97ldeyTllGLcxZHXswnrglUDNT90k2XW0kly', 'fff', 'fff', 'house', NULL, NULL, NULL, NULL, '$2y$10$8ZxEp5cKu.QOKb5.XZcNgekKlTSBC8h3OMY/z0dVhZbGlOPOLABuK', '2021-07-26 11:39:40', '2021-07-26 11:39:40'),
(13, 'ff', 'ff', NULL, 'fff@gf.ffs', NULL, NULL, '$2y$10$Qu2eq77GoSNm/hajxEEPsu8rKPyYo5tqycjLlQonCNnQnr5nscElK', 'fff', 'fff', 'house', NULL, NULL, NULL, NULL, '$2y$10$Sp5Mw/kN0PeTGhTUsJJnZ.X5F75pqozLTQvz4Wpg2Ij15D.5yCJqq', '2021-07-26 11:40:02', '2021-07-26 11:40:02'),
(14, 'hh', 'hh', NULL, 'jp,e@jp/cp,', NULL, NULL, '$2y$10$8vqvMj3gACHHuECM1Nfe/OlGsPM5REZsPNOF1FiaT7YimTsNjXtW2', 'hh', 'hhh', 'house', NULL, NULL, NULL, NULL, '$2y$10$odbsRM1BQQHPS.YxmSrFDeFHFygkaxgG/eZrTS7qzm2Nxpcgi5kOO', '2021-07-26 11:47:37', '2021-07-26 11:47:37'),
(15, 'jj', 'jj', NULL, 'jj@jj.com', NULL, NULL, '$2y$10$qF8QtqQyngAGwAM7ZH/A/.Hgio2wXOqBF/E7Bw2Rdw4lRpSjzmKxu', 'jj', 'jj', 'house', NULL, NULL, NULL, NULL, '$2y$10$BaUsaTmTn7FPPDMUGtE4ju0m.suUIQtyz3TqeuPItXZycJjO0UD.i', '2021-07-26 11:57:48', '2021-07-26 11:57:48'),
(16, 'jjjj', 'jjj', NULL, 'lll@hg.vvv', NULL, NULL, '$2y$10$u4byavIfBy5rWgrIITXqUeiYXNJfFtrRlqst6Yp.XIOo8szN.DDIu', 'jj', 'jj', 'house', NULL, NULL, NULL, NULL, '$2y$10$5Ohw5UA4fLNR7P414M92jeaaA/LNX/0v9AkFisLvoA4D3FcqTBzV.', '2021-07-26 11:59:19', '2021-07-26 11:59:19'),
(17, 'mess name', 'manager', 10, 'faltu@abc.com', 'পায়রা চত্তর, রংপুর', NULL, '$2y$10$w4cNAjQyqMUVgU9qCzqrx.Fv3PqphqNOIItI6ftFoSrgSm91WcJli', 'mirpur', 'mobile', 'mess', NULL, NULL, NULL, NULL, '$2y$10$9FkA6SV/Yzf8SH.ef76tm.HqkOeJw8e8pTs4RLL2BAhMcqpei1O8m', '2021-08-01 12:49:12', '2021-08-01 12:49:12'),
(18, 'mess name', 'manager', 555, 'hello@hellobd.com', 'পায়রা চত্তর, রংপুর', NULL, '$2y$10$xuPxLBTw4x7ffodYv0KuB.1bdRJ6bpD07.5qsVmu0ozvBPNt0tkd2', 'ok address', '00000', 'mess', NULL, NULL, NULL, NULL, '$2y$10$75Y.2q01ShlKpN3at99ipevO4YL9FRMLwNKRj1qWkr39GhbCh43LW', '2021-08-05 13:31:58', '2021-08-05 13:31:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
