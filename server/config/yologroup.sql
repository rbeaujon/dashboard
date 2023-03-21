-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 21, 2023 at 12:23 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `yologroup`
--

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `id` int(5) NOT NULL,
  `name` varchar(100) NOT NULL,
  `category` varchar(200) NOT NULL,
  `image` varchar(500) NOT NULL,
  `creation` varchar(20) NOT NULL,
  `ranges` int(2) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`id`, `name`, `category`, `image`, `creation`, `ranges`, `status`) VALUES
(1, 'bingo', 'casino', 'https://img.freepik.com/premium-vector/bingo-lotto-keno-lottery-balls-with-numbers_53500-46.jpg?w=1380', '02/01/2022', 18, 1),
(2, 'blackjack', 'casino', 'https://pbs.twimg.com/profile_images/839861884291526657/9KH-7V5p_400x400.jpg', '03/02/2021', 18, 1),
(3, 'dices', 'board', 'https://as1.ftcdn.net/v2/jpg/02/51/39/02/1000_F_251390200_HpnWE9F08alVK7rjflyQKKP8RYt1Vlpd.jpg', '04/03/2020', 12, 1),
(4, 'fortnite', 'shooter', 'https://assets-prd.ignimgs.com/2022/09/26/21br-vibing-keyartsocial-motd-1920x1080-1920x1080-aefef36dd221-1664214396468.jpg?width=1920', '05/04/2019', 16, 1),
(5, 'halo', 'shooter', 'https://media.npr.org/assets/img/2022/03/22/halo_105_0792_rt-46c374e1b2872235e833a0eded1be39dc3e2cd07-s800-c85.webp', '06/05/2018', 16, 1),
(6, 'lostark', 'adventure', 'https://cdn5.idcgames.com/storage/image/1260/game_home_bg_section_2/default.jpg', '07/06/2017', 12, 1),
(7, 'ludo', 'board', 'https://avatars.mds.yandex.net/get-games/1881371/2a0000017c17ba863b5f98432f0438651f6e/orig', '08/07/2016', 8, 1),
(8, 'mario', 'platformer', 'https://www.boxofficepro.com/wp-content/uploads/2023/03/mario775x970-copy.png', '09/08/2015', 8, 1),
(9, 'minecraft', 'sandbox', 'https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000033696/be89eb9c1c6a57cf58e8d14b03d26b4c42d988e02c082fd0fe368417c43b959e', '10/09/2014', 12, 1),
(10, 'roller', 'roller', 'https://cdn.vox-cdn.com/thumbor/Q0tM4_8oHibX99P5n1NRwX_Gjok=/0x0:1024x576/1200x800/filters:focal(504x94:666x256)/cdn.vox-cdn.com/uploads/chorus_image/image/63907657/roller_champions.0.jpg', '11/10/2013', 8, 1),
(11, 'spyderman', 'action', 'https://img.republicworld.com/republic-prod/stories/promolarge/xhdpi/7n7jgupdqcg32iah_1660301109.jpeg', '12/11/2012', 12, 1),
(12, 'assassins creed', 'adventure', 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/449BBgnc3Q1ha2IN9rh3bR/e1077125021162ce2d59820739c316e7/ACEC_Keyart_00_00_00_mobile.jpg', '13/12/2011', 16, 1),
(13, 'fifa', 'sports', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa-FqUXusqkNv09bwTpd7XpORKzFAXNEO8MA&usqp=CAU', '14/01/2010', 8, 1),
(14, 'gta', 'sandbox', 'https://www.svg.com/img/gallery/the-entire-gta-5-story-explained/intro-1570823825.jpg', '15/02/2009', 18, 1),
(15, 'need for speed', 'racing', 'https://media.contentapi.ea.com/content/dam/ea/need-for-speed-unbound/common/nfs-franchise-hub-update-oct-31st/nfs-heat-1x1.png.adapt.crop1x1.767w.png', '16/03/2008', 16, 1),
(16, 'tetris', 'puzzle', 'https://qrios.it/wp-content/uploads/2021/03/tetris-2973518_1920-1068x1232.jpg', '17/04/2007', 8, 1),
(44, 'Honor', 'adventure', 'https://www.gaming.net/wp-content/uploads/2022/05/fh6.jpg', '02/01/2022', 18, 1),
(58, 'ratcher', 'adventure', 'https://www.lavanguardia.com/files/og_thumbnail/files/fp/uploads/2021/06/08/60bf5b37ceb91.r_d.902-429-7500.jpeg', '21/03/2023', 1, 1),
(59, 'god war ragnorok', 'adventure', 'https://i.blogs.es/53a7f3/los-mejores-juegos-de-ps5/1366_2000.png', '14/03/2023', 16, 1),
(60, 'elden ring', 'adventure', 'https://assets.reedpopcdn.com/elden-ring_q1Y4XuN.jpg/BROK/resize/1200x1200%3E/format/jpg/quality/70/elden-ring_q1Y4XuN.jpg', '21/03/2023', 5, 1),
(61, 'superman', 'adventure', 'https://www.aroged.com/wp-content/uploads/2023/03/Superman-game-for-PS5-revealed-by-Microsoft-at-CMA-Dont.jpg', '03/05/2023', 12, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(4) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` varchar(200) NOT NULL,
  `pic` int(4) NOT NULL,
  `level` varchar(20) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `address`, `pic`, `level`, `status`) VALUES
(1, 'John Doe', 'johndoe@example.com', '123 Main St, Anytown USA', 1, 'admin', 1),
(2, 'Jane Smith', 'janesmith@example.com', '456 Oak Ave, Anytown USA', 2, 'user', 1),
(3, 'Bob Johnson', 'bjohnson@example.com', '789 Elm St, Anytown USA', 3, 'ux/ui', 1),
(4, 'Samantha Lee', 'samanthalee@example.com', '111 Maple Dr, Anytown USA', 4, 'dev', 1),
(5, 'Alex Chen', 'alexchen@example.com', '222 Pine Rd, Anytown USA', 5, 'admin', 1),
(6, 'Emily Kim', 'emilykim@example.com', '333 Oak Dr, Anytown USA', 1, 'user', 1),
(7, 'David Lee', 'davidlee@example.com', '444 Maple Rd, Anytown USA', 2, 'ux/ui', 1),
(8, 'Sarah Park', 'sarahpark@example.com', '555 Elm Dr, Anytown USA', 3, 'dev', 1),
(9, 'Michael Brown', 'michaelbrown@example.com', '666 Oak Rd, Anytown USA', 4, 'admin', 1),
(10, 'Jessica Davis', 'jessicadavis@example.com', '777 Pine Dr, Anytown USA', 5, 'user', 1),
(11, 'Brian Lee', 'brianlee@example.com', '888 Maple Rd, Anytown USA', 1, 'ux/ui', 1),
(12, 'Linda Kim', 'lindakim@example.com', '999 Elm Dr, Anytown USA', 2, 'dev', 1),
(13, 'Daniel Johnson', 'danieljohnson@example.com', '1010 Pine Rd, Anytown USA', 3, 'admin', 1),
(14, 'Amy Smith', 'amysmith@example.com', '1111 Oak Dr, Anytown USA', 4, 'user', 1),
(15, 'Peter Chen', 'peterchen@example.com', '1212 Maple Rd, Anytown USA', 5, 'ux/ui', 1),
(16, 'Michelle Lee', 'michellelee@example.com', '1313 Elm Dr, Anytown USA', 1, 'dev', 1),
(17, 'Kevin Brown', 'kevinbrown@example.com', '1414 Pine Rd, Anytown USA', 2, 'admin', 1),
(18, 'Hannah Davis', 'hannahdavis@example.com', '1515 Oak Dr, Anytown USA', 3, 'user', 1),
(19, 'Jason Lee', 'jasonlee@example.com', '1616 Maple Rd, Anytown USA', 4, 'ux/ui', 1),
(20, 'Ashley Kim', 'ashleykim@example.com', '1717 Elm Dr, Anytown USA', 5, 'dev', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
