-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 23, 2024 at 06:35 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recipe_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `id` int(11) NOT NULL,
  `idMeal` varchar(255) DEFAULT NULL,
  `ingredient` varchar(255) DEFAULT NULL,
  `measure` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `meals`
--

CREATE TABLE `meals` (
  `idMeal` varchar(255) NOT NULL,
  `strMeal` varchar(255) DEFAULT NULL,
  `strCategory` varchar(255) DEFAULT NULL,
  `strArea` varchar(255) DEFAULT NULL,
  `strTags` varchar(255) DEFAULT NULL,
  `strInstructions` text DEFAULT NULL,
  `strMealThumb` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `saved_meals`
--

CREATE TABLE `saved_meals` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `meal_name` varchar(255) NOT NULL,
  `meal_description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `saved_meals` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '[]' CHECK (json_valid(`saved_meals`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`, `saved_meals`) VALUES
(1, 'asd', 'esayasbayisa11@gmail.com', '$2y$10$iItG.N9f7TuOR5AAWwhotuLzjfLUPeNz2dTyjzCbqZ3aX3e92DDt2', '2024-06-19 16:32:16', '[]'),
(12, 'abdd', 'asdasad@gmail.com', '$2y$10$SvNzBxn9xwD0rOwWosshFe6GXxCnCUzlQxFAeYX7oA6yKYbbfp..G', '2024-06-20 12:49:43', '[]'),
(13, 'sads', 'sada@dsfd', '$2y$10$EW73PnNFPyb64CLGP3o2XeYEfMG.g2yLuKrz5gxDohYNtYZGS13tu', '2024-06-20 13:46:48', '[]'),
(14, 'abdiesu', 'abdi.esayas@a2sv.org', '$2y$10$dqMMilEKW3BHlzvuBj6Yk.ju/XKv5rU3.JwiTee7M0VwYDe8AfeLO', '2024-06-21 09:31:27', '[]'),
(16, 'abdii', 'shdjkah@hadjsk', '$2y$10$wGCvv2EGKrU68trvWwsCuu/y.XIuogFR3La69mkpMQ7slTtkR4cNq', '2024-06-21 09:44:05', '[]'),
(17, 'rere', 'jdakldjkl@jkadljk', '$2y$10$D5EfjJdfRCgvskiiOMqV4eNVUlgOzNB6ryBTzdM1DAh7IbFD7VjDW', '2024-06-22 16:49:47', '[]'),
(18, 'tyty', 'qweyqw@dhsdkas.com', '$2y$10$upWDv42sm6H160Rxv00jIuhBBlZr5MFed1XgWvUwcKd42jIY8Prre', '2024-06-22 20:18:10', '[]'),
(19, 'werwer', 'werwer@gmail.com', '$2y$10$0ZDaiRG4J5CkZE4z1/wsF.xs2CdSAmZFcdQGN0OwUAnOdr1xxKQaO', '2024-06-22 20:42:08', '[]'),
(20, 'ertert', 'ert@ertrt', '$2y$10$CSaOyotCCa4cfi.Of.aSmejfijNjTQEo3a/4Q7MhRaUECbYPkPWxW', '2024-06-22 21:19:18', '[]'),
(21, 'abdi', 'asdsa@gmak', '$2y$10$qt3fNTncXZuDjPlQVt00IO5ZVp6.5gJrQv33Mkp90Wwoi3Pu7z0uG', '2024-06-23 11:19:37', '[]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idMeal` (`idMeal`);

--
-- Indexes for table `meals`
--
ALTER TABLE `meals`
  ADD PRIMARY KEY (`idMeal`);

--
-- Indexes for table `saved_meals`
--
ALTER TABLE `saved_meals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `saved_meals`
--
ALTER TABLE `saved_meals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD CONSTRAINT `ingredients_ibfk_1` FOREIGN KEY (`idMeal`) REFERENCES `meals` (`idMeal`);

--
-- Constraints for table `saved_meals`
--
ALTER TABLE `saved_meals`
  ADD CONSTRAINT `saved_meals_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
