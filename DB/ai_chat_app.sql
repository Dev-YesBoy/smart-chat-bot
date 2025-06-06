-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2025 at 09:01 AM
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
-- Database: `ai_chat_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

CREATE TABLE `content` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `function_field` varchar(255) DEFAULT NULL,
  `prompts` text DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `content`
--

INSERT INTO `content` (`id`, `title`, `message`, `function_field`, `prompts`, `createdAt`) VALUES
(5, 'Run node server', 'How to run node server \r\nin package.json You can set your own run script \r\nEx\r\n  \"scripts\": {\r\n    \"start\": \"react-scripts start\",\r\n    \"build\": \"react-scripts build\",\r\n    \"test\": \"react-scripts test\",\r\n    \"eject\": \"react-scripts eject\"\r\n  },', 'npm start or npm run', '[\"Run node server\"]', '2025-05-18 08:26:17'),
(6, 'Pack React site to html', 'If you want to \"pack\" your React site into static HTML files, this usually refers to building your React application for production deployment. This process generates optimized static files, including HTML, CSS, and JavaScript, that you can serve via a static hosting service.\r\n\r\nHere’s how you can do it:\r\n 1. Build Your React App\r\nNavigate to your React project\'s directory in the terminal.\r\nRun the following command to build your project:\r\n<pre>npm run build</pre>\r\nThis command will create a build folder in your project\'s root directory. It contains the static files (index.html, CSS, JavaScript, etc.) for your app.', NULL, '', '2025-05-18 08:35:12'),
(7, 'Lazada Server', 'Login To Lazada Server cPanel', 'https://47.239.171.224:8090/\nUser: admin\nPass: Jsuxl87C7hdda9bO', '[\"Afw\",\"Afeff\"]', '2025-05-19 10:43:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `content`
--
ALTER TABLE `content`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `content`
--
ALTER TABLE `content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
