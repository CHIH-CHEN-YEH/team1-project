-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-11-06 21:47:23
-- 伺服器版本： 10.4.32-MariaDB
-- PHP 版本： 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `final_project`
--

-- --------------------------------------------------------

--
-- 資料表結構 `product_tags`
--

CREATE TABLE `product_tags` (
  `id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED DEFAULT NULL,
  `tag_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `product_tags`
--

INSERT INTO `product_tags` (`id`, `product_id`, `tag_id`) VALUES
(2, 1, 1),
(3, 1, 3),
(4, 2, 1),
(5, 2, 2),
(6, 2, 3),
(7, 2, 4),
(8, 3, 1),
(11, 3, 2),
(12, 3, 3),
(13, 3, 4),
(9, 3, 5),
(10, 3, 6),
(16, 4, 3),
(14, 4, 5),
(15, 4, 6),
(17, 5, 1),
(20, 5, 3),
(18, 5, 5),
(19, 5, 7),
(23, 6, 3),
(21, 6, 8),
(22, 6, 9),
(26, 7, 3),
(24, 7, 5),
(25, 7, 7),
(27, 7, 9),
(31, 8, 3),
(29, 8, 4),
(28, 8, 8),
(30, 8, 9),
(34, 9, 3),
(35, 9, 4),
(33, 9, 7),
(32, 9, 10),
(40, 10, 2),
(38, 10, 3),
(37, 10, 4),
(39, 10, 9),
(36, 10, 10),
(41, 11, 1),
(44, 11, 3),
(45, 11, 4),
(42, 11, 5),
(43, 11, 7),
(46, 12, 1),
(48, 12, 3),
(49, 12, 4),
(47, 12, 11),
(50, 13, 4),
(51, 14, 1),
(53, 14, 4),
(52, 14, 7),
(56, 15, 2),
(57, 15, 3),
(54, 15, 4),
(55, 15, 11),
(58, 16, 1),
(60, 16, 3),
(61, 16, 4),
(59, 16, 8),
(62, 17, 1),
(65, 17, 4),
(64, 17, 10),
(63, 17, 12),
(66, 18, 1),
(69, 18, 4),
(68, 18, 10),
(67, 18, 12),
(70, 19, 1),
(71, 19, 5),
(73, 20, 2),
(72, 20, 6),
(74, 21, 5),
(75, 21, 7),
(76, 21, 9),
(80, 22, 4),
(79, 22, 8),
(78, 22, 11),
(77, 22, 12),
(83, 23, 2),
(84, 23, 3),
(81, 23, 4),
(82, 23, 11),
(87, 24, 3),
(86, 24, 4),
(85, 24, 11),
(89, 25, 4),
(88, 25, 7),
(92, 26, 3),
(93, 26, 4),
(90, 26, 5),
(91, 26, 7),
(94, 27, 1),
(95, 27, 2),
(97, 27, 3),
(96, 27, 4),
(100, 28, 3),
(98, 28, 4),
(99, 28, 7),
(103, 29, 3),
(102, 29, 4),
(101, 29, 7),
(107, 30, 1),
(105, 30, 2),
(106, 30, 3),
(104, 30, 8),
(110, 31, 2),
(112, 31, 3),
(108, 31, 5),
(109, 31, 6),
(111, 31, 13),
(114, 32, 2),
(115, 32, 9),
(116, 32, 13),
(113, 32, 14),
(118, 33, 2),
(120, 33, 3),
(117, 33, 4),
(119, 33, 11),
(122, 34, 2),
(124, 34, 4),
(121, 34, 5),
(123, 34, 9),
(127, 35, 3),
(125, 35, 4),
(126, 35, 5),
(128, 36, 4),
(129, 36, 5),
(131, 36, 9),
(130, 36, 12),
(135, 37, 3),
(132, 37, 5),
(134, 37, 13),
(133, 37, 14),
(136, 38, 1),
(137, 38, 3),
(138, 38, 7),
(139, 39, 1),
(141, 39, 3),
(140, 39, 7),
(142, 40, 4),
(143, 40, 5),
(144, 40, 9),
(145, 41, 4),
(146, 41, 5),
(147, 41, 9),
(148, 42, 4),
(151, 43, 3),
(149, 43, 4),
(150, 43, 8),
(152, 44, 2),
(156, 44, 4),
(153, 44, 8),
(154, 44, 11),
(155, 44, 13),
(157, 45, 1),
(159, 45, 4),
(158, 45, 9),
(162, 46, 3),
(161, 46, 4),
(160, 46, 7),
(164, 47, 2),
(166, 47, 3),
(165, 47, 4),
(163, 47, 11),
(167, 48, 1),
(169, 48, 2),
(168, 48, 4),
(172, 49, 2),
(173, 49, 3),
(170, 49, 4),
(171, 49, 8),
(174, 50, 4),
(175, 50, 8),
(176, 51, 1),
(177, 51, 5),
(178, 51, 7),
(179, 52, 1),
(181, 52, 3),
(180, 52, 15),
(182, 53, 16),
(183, 54, 16),
(184, 55, 16),
(185, 56, 16),
(186, 57, 16),
(187, 58, 16),
(188, 59, 16),
(189, 60, 16),
(190, 61, 16),
(191, 62, 16),
(192, 63, 16),
(193, 64, 16),
(194, 65, 16),
(195, 66, 15),
(196, 67, 15),
(197, 68, 7),
(200, 69, 2),
(198, 69, 8),
(199, 69, 12),
(202, 70, 1),
(204, 70, 2),
(205, 70, 3),
(203, 70, 5),
(201, 70, 13),
(208, 71, 3),
(206, 71, 7),
(207, 71, 9),
(209, 72, 1),
(211, 72, 2),
(213, 72, 3),
(210, 72, 5),
(212, 72, 13),
(216, 73, 2),
(217, 73, 3),
(215, 73, 4),
(214, 73, 10),
(222, 74, 3),
(219, 74, 4),
(221, 74, 9),
(218, 74, 12),
(220, 74, 13),
(225, 75, 3),
(223, 75, 4),
(224, 75, 8),
(229, 76, 3),
(227, 76, 4),
(228, 76, 5),
(226, 76, 8),
(230, 77, 1),
(233, 77, 3),
(232, 77, 4),
(231, 77, 5),
(234, 78, 1),
(237, 78, 3),
(236, 78, 4),
(235, 78, 5),
(242, 79, 3),
(239, 79, 4),
(241, 79, 7),
(240, 79, 10),
(238, 79, 12),
(243, 80, 1),
(247, 80, 3),
(246, 80, 4),
(245, 80, 8),
(244, 80, 11),
(248, 81, 1),
(252, 81, 3),
(251, 81, 4),
(249, 81, 8),
(250, 81, 11),
(253, 82, 1),
(255, 82, 4),
(254, 82, 11),
(257, 83, 2),
(259, 83, 3),
(260, 83, 4),
(256, 83, 5),
(258, 83, 8),
(261, 84, 1),
(262, 84, 3),
(263, 84, 4),
(264, 85, 1),
(265, 85, 3),
(266, 85, 4),
(267, 86, 2),
(270, 86, 3),
(268, 86, 6),
(269, 86, 13),
(272, 87, 3),
(271, 87, 5),
(276, 88, 3),
(273, 88, 4),
(274, 88, 10),
(275, 88, 11),
(278, 89, 2),
(280, 89, 3),
(277, 89, 5),
(279, 89, 9),
(281, 90, 1),
(282, 90, 5),
(283, 90, 7),
(284, 91, 1),
(287, 91, 2),
(286, 91, 5),
(285, 91, 8),
(288, 91, 9),
(290, 92, 2),
(291, 92, 3),
(289, 92, 13),
(292, 93, 4),
(293, 93, 8),
(295, 94, 2),
(296, 94, 5),
(297, 94, 9),
(294, 94, 10),
(298, 95, 1),
(299, 95, 2),
(301, 95, 3),
(300, 95, 8),
(302, 96, 7),
(304, 97, 3),
(303, 97, 10),
(309, 98, 3),
(305, 98, 5),
(306, 98, 6),
(307, 98, 7),
(308, 98, 9),
(310, 99, 4),
(311, 99, 7),
(312, 100, 4),
(313, 100, 7),
(315, 101, 3),
(314, 101, 7),
(316, 102, 5),
(317, 103, 1),
(320, 103, 2),
(322, 103, 3),
(318, 103, 5),
(319, 103, 6),
(321, 103, 7),
(323, 104, 1),
(324, 104, 2),
(326, 104, 3),
(325, 104, 5),
(327, 105, 1),
(328, 105, 2),
(330, 105, 3),
(329, 105, 8),
(332, 106, 2),
(333, 106, 3),
(331, 106, 10),
(334, 107, 1),
(337, 107, 3),
(335, 107, 5),
(336, 107, 7),
(341, 108, 3),
(338, 108, 5),
(339, 108, 6),
(340, 108, 7),
(343, 109, 4),
(342, 109, 6),
(344, 110, 1),
(346, 110, 2),
(348, 110, 3),
(345, 110, 5),
(347, 110, 8),
(350, 111, 2),
(351, 111, 3),
(349, 111, 6),
(353, 112, 2),
(352, 112, 10),
(354, 112, 14),
(356, 113, 2),
(355, 113, 10),
(357, 114, 1),
(360, 114, 2),
(362, 114, 3),
(358, 114, 5),
(359, 114, 6),
(361, 114, 7),
(363, 115, 2),
(365, 115, 3),
(364, 115, 5),
(366, 116, 1),
(367, 116, 2),
(369, 116, 3),
(368, 116, 8),
(371, 117, 3),
(370, 117, 15),
(373, 118, 3),
(374, 118, 5),
(372, 118, 7),
(376, 119, 3),
(375, 119, 5),
(379, 120, 2),
(380, 120, 3),
(378, 120, 4),
(377, 120, 8),
(383, 121, 2),
(384, 121, 3),
(381, 121, 4),
(382, 121, 8),
(387, 122, 3),
(385, 122, 4),
(386, 122, 12),
(390, 123, 3),
(388, 123, 4),
(389, 123, 8),
(391, 123, 11),
(392, 124, 1),
(393, 124, 3),
(394, 124, 4),
(395, 125, 1),
(397, 125, 3),
(396, 125, 4),
(398, 126, 1),
(399, 126, 2),
(401, 126, 3),
(400, 126, 4),
(403, 127, 2),
(404, 127, 3),
(405, 127, 4),
(402, 127, 8),
(407, 128, 1),
(409, 128, 3),
(410, 128, 4),
(406, 128, 5),
(408, 128, 7),
(411, 129, 1),
(412, 129, 2),
(414, 129, 3),
(415, 129, 4),
(413, 129, 13),
(416, 130, 1),
(417, 130, 2),
(419, 130, 3),
(420, 130, 4),
(418, 130, 13),
(421, 131, 1),
(423, 131, 2),
(425, 131, 3),
(424, 131, 4),
(422, 131, 5),
(426, 132, 4),
(427, 132, 8),
(430, 133, 3),
(428, 133, 4),
(431, 133, 5),
(429, 133, 8),
(434, 134, 2),
(435, 134, 3),
(432, 134, 4),
(433, 134, 8),
(438, 135, 3),
(439, 135, 4),
(436, 135, 8),
(437, 135, 11),
(440, 136, 1),
(443, 136, 3),
(444, 136, 4),
(441, 136, 6),
(442, 136, 7),
(446, 137, 3),
(447, 137, 4),
(445, 137, 5),
(451, 138, 2),
(450, 138, 3),
(448, 138, 4),
(449, 138, 11),
(454, 139, 1),
(453, 139, 3),
(452, 139, 4),
(455, 139, 7),
(456, 140, 1),
(460, 140, 3),
(459, 140, 4),
(458, 140, 7),
(457, 140, 10),
(461, 141, 1),
(463, 141, 4),
(462, 141, 7),
(464, 142, 1),
(467, 142, 4),
(466, 142, 7),
(465, 142, 10),
(468, 143, 2),
(471, 143, 3),
(470, 143, 4),
(469, 143, 11),
(472, 144, 1),
(474, 144, 3),
(475, 144, 4),
(473, 144, 7),
(478, 145, 2),
(480, 145, 3),
(479, 145, 4),
(477, 145, 6),
(476, 145, 12),
(481, 146, 4),
(482, 146, 8),
(485, 147, 4),
(484, 147, 7),
(483, 147, 11),
(486, 148, 4),
(488, 148, 8),
(487, 148, 12),
(489, 149, 1),
(491, 149, 4),
(490, 149, 11),
(493, 150, 2),
(495, 150, 3),
(494, 150, 4),
(492, 150, 11),
(497, 151, 1),
(498, 151, 3),
(496, 151, 4),
(501, 152, 2),
(499, 152, 4),
(500, 152, 8),
(503, 153, 5),
(502, 153, 12),
(504, 154, 1),
(505, 154, 3),
(507, 155, 3),
(506, 155, 5),
(511, 156, 3),
(508, 156, 5),
(509, 156, 6),
(510, 156, 7),
(512, 157, 1),
(513, 157, 5),
(514, 157, 7),
(516, 158, 1),
(519, 158, 3),
(518, 158, 9),
(515, 158, 12),
(517, 158, 14),
(520, 159, 16),
(522, 160, 1),
(523, 160, 2),
(524, 160, 3),
(521, 160, 8),
(526, 161, 1),
(528, 161, 2),
(529, 161, 3),
(527, 161, 5),
(525, 161, 13),
(530, 162, 1),
(531, 162, 7),
(532, 163, 16),
(534, 164, 3),
(533, 164, 7),
(536, 165, 3),
(535, 165, 8),
(537, 166, 1),
(539, 166, 3),
(538, 166, 7),
(541, 167, 2),
(542, 167, 3),
(540, 167, 10),
(544, 168, 2),
(545, 168, 3),
(543, 168, 10),
(549, 169, 1),
(547, 169, 2),
(548, 169, 3),
(546, 169, 8),
(553, 170, 1),
(551, 170, 2),
(552, 170, 3),
(550, 170, 8),
(554, 171, 1),
(555, 171, 2),
(557, 171, 3),
(556, 171, 8),
(559, 172, 2),
(561, 172, 3),
(558, 172, 7),
(560, 172, 13),
(565, 173, 2),
(563, 173, 6),
(566, 173, 9),
(562, 173, 11),
(564, 173, 13),
(567, 174, 2),
(568, 174, 5),
(569, 175, 7),
(572, 176, 3),
(570, 176, 5),
(571, 176, 7),
(573, 177, 4),
(574, 177, 10),
(575, 178, 1),
(577, 178, 3),
(576, 178, 4),
(578, 179, 1),
(582, 179, 3),
(581, 179, 4),
(580, 179, 7),
(579, 179, 8),
(583, 180, 1),
(585, 180, 4),
(584, 180, 12),
(587, 181, 1),
(586, 181, 4),
(588, 181, 12),
(592, 182, 3),
(590, 182, 4),
(591, 182, 11),
(589, 182, 12),
(594, 183, 3),
(595, 183, 4),
(593, 183, 7),
(598, 184, 3),
(596, 184, 4),
(597, 184, 12),
(601, 185, 2),
(599, 185, 5),
(600, 185, 6),
(603, 186, 4),
(602, 186, 8),
(606, 187, 3),
(605, 187, 10),
(604, 187, 15),
(607, 188, 1),
(608, 188, 7),
(610, 189, 3),
(609, 189, 13),
(612, 190, 3),
(611, 190, 13),
(614, 191, 3),
(613, 191, 13),
(616, 192, 3),
(615, 192, 13),
(618, 193, 3),
(617, 193, 13),
(620, 194, 3),
(619, 194, 13),
(622, 195, 2),
(621, 195, 14),
(624, 196, 2),
(623, 196, 14),
(626, 197, 2),
(625, 197, 14),
(629, 198, 2),
(627, 198, 5),
(628, 198, 6),
(630, 199, 2),
(632, 199, 3),
(631, 199, 5),
(634, 200, 2),
(633, 200, 14),
(636, 201, 2),
(635, 201, 14),
(638, 202, 2),
(637, 202, 14),
(640, 203, 2),
(639, 203, 14),
(641, 204, 14),
(644, 205, 2),
(645, 205, 3),
(642, 205, 5),
(643, 205, 14),
(648, 206, 2),
(649, 206, 3),
(646, 206, 5),
(647, 206, 14),
(650, 207, 1),
(651, 207, 7),
(653, 208, 3),
(652, 208, 5),
(654, 209, 1),
(655, 209, 3),
(656, 210, 7),
(657, 210, 12),
(659, 211, 3),
(658, 211, 5),
(663, 212, 2),
(661, 212, 6),
(660, 212, 12),
(662, 212, 13),
(664, 213, 1),
(667, 213, 3),
(665, 213, 5),
(666, 213, 8),
(668, 214, 1),
(669, 214, 5),
(670, 214, 7),
(671, 215, 1),
(672, 215, 5),
(673, 215, 7),
(674, 216, 1),
(677, 216, 3),
(675, 216, 12),
(676, 216, 13),
(681, 217, 2),
(682, 217, 3),
(680, 217, 5),
(679, 217, 6),
(678, 217, 12),
(686, 218, 2),
(687, 218, 3),
(685, 218, 5),
(684, 218, 6),
(683, 218, 12),
(688, 219, 1),
(690, 219, 3),
(689, 219, 7),
(693, 220, 2),
(695, 220, 3),
(691, 220, 5),
(692, 220, 6),
(694, 220, 7),
(699, 221, 2),
(700, 221, 3),
(697, 221, 5),
(696, 221, 8),
(698, 221, 13),
(701, 222, 1),
(703, 222, 3),
(702, 222, 13),
(705, 223, 2),
(706, 223, 3),
(707, 223, 4),
(704, 223, 8),
(709, 224, 3),
(708, 224, 7),
(710, 225, 1),
(713, 225, 3),
(711, 225, 5),
(712, 225, 7),
(715, 226, 1),
(717, 226, 3),
(714, 226, 5),
(716, 226, 7),
(718, 227, 1),
(721, 227, 3),
(719, 227, 5),
(720, 227, 7),
(723, 228, 2),
(725, 228, 3),
(722, 228, 6),
(724, 228, 13),
(726, 229, 1),
(727, 229, 2),
(729, 229, 3),
(728, 229, 7),
(730, 230, 1),
(732, 230, 3),
(731, 230, 6),
(736, 231, 2),
(737, 231, 3),
(734, 231, 5),
(733, 231, 8),
(735, 231, 13),
(738, 232, 1),
(739, 232, 3),
(740, 233, 7),
(742, 234, 7),
(741, 234, 10),
(744, 235, 3),
(743, 235, 5),
(745, 236, 1),
(747, 236, 3),
(746, 236, 11),
(750, 237, 3),
(748, 237, 6),
(749, 237, 7),
(753, 238, 2),
(755, 238, 3),
(752, 238, 5),
(751, 238, 6),
(754, 238, 7),
(758, 239, 2),
(759, 239, 3),
(757, 239, 6),
(756, 239, 14),
(760, 240, 4),
(762, 241, 2),
(763, 241, 3),
(761, 241, 11),
(764, 242, 1),
(767, 242, 3),
(765, 242, 12),
(766, 242, 13),
(769, 243, 2),
(770, 243, 3),
(768, 243, 8),
(771, 244, 1),
(774, 244, 3),
(772, 244, 4),
(773, 244, 5),
(776, 245, 3),
(777, 245, 4),
(775, 245, 7),
(779, 246, 3),
(780, 246, 4),
(778, 246, 7),
(781, 247, 4),
(782, 247, 10),
(783, 248, 1),
(786, 248, 3),
(784, 248, 4),
(785, 248, 8),
(787, 249, 1),
(790, 249, 3),
(791, 249, 4),
(789, 249, 8),
(788, 249, 11),
(792, 250, 1),
(796, 250, 3),
(797, 250, 4),
(795, 250, 7),
(793, 250, 11),
(794, 250, 12),
(799, 251, 4),
(798, 251, 5),
(800, 252, 1),
(801, 252, 2),
(802, 252, 3),
(804, 252, 4),
(803, 252, 7),
(806, 253, 1),
(807, 253, 3),
(805, 253, 4),
(808, 253, 12),
(809, 254, 1),
(813, 254, 4),
(812, 254, 7),
(810, 254, 11),
(811, 254, 12),
(814, 255, 1),
(815, 255, 3),
(816, 255, 4),
(819, 256, 3),
(817, 256, 4),
(818, 256, 12),
(822, 257, 2),
(823, 257, 3),
(824, 257, 4),
(821, 257, 6),
(820, 257, 11),
(825, 258, 2),
(826, 258, 3),
(827, 258, 4),
(828, 259, 1),
(831, 259, 3),
(830, 259, 4),
(829, 259, 7),
(832, 260, 1),
(833, 260, 3),
(834, 261, 1),
(835, 261, 3),
(837, 262, 3),
(836, 262, 5),
(839, 263, 3),
(838, 263, 5),
(840, 264, 1),
(843, 264, 3),
(841, 264, 5),
(842, 264, 7),
(846, 265, 3),
(845, 265, 7),
(844, 265, 8),
(848, 266, 3),
(847, 266, 8),
(849, 267, 1),
(850, 267, 2),
(851, 267, 3),
(854, 268, 3),
(852, 268, 7),
(853, 268, 12),
(855, 269, 5),
(856, 269, 6),
(857, 269, 15),
(860, 270, 3),
(858, 270, 7),
(859, 270, 12),
(863, 271, 3),
(861, 271, 5),
(862, 271, 7),
(864, 272, 11),
(865, 272, 13),
(867, 273, 3),
(866, 273, 7),
(868, 274, 7),
(871, 275, 3),
(869, 275, 5),
(870, 275, 7),
(873, 276, 3),
(872, 276, 5),
(874, 277, 1),
(875, 277, 2),
(877, 277, 3),
(876, 277, 7),
(880, 278, 3),
(878, 278, 6),
(879, 278, 7),
(881, 279, 1),
(883, 279, 2),
(884, 279, 4),
(882, 279, 8),
(886, 280, 4),
(885, 280, 7),
(887, 281, 5),
(888, 281, 15),
(889, 282, 5),
(890, 282, 6),
(891, 282, 15),
(892, 283, 16),
(894, 284, 2),
(895, 284, 3),
(893, 284, 10),
(896, 285, 5),
(897, 285, 7),
(900, 286, 3),
(898, 286, 5),
(899, 286, 7),
(903, 287, 5),
(901, 287, 6),
(902, 287, 14),
(904, 288, 7),
(906, 289, 3),
(905, 289, 7),
(908, 290, 3),
(907, 290, 7),
(910, 291, 2),
(911, 291, 3),
(909, 291, 11),
(913, 292, 1),
(914, 292, 3),
(912, 292, 5),
(915, 293, 7),
(916, 294, 1),
(918, 294, 3),
(917, 294, 13),
(919, 295, 6),
(920, 295, 7),
(923, 296, 3),
(921, 296, 7),
(922, 296, 9),
(926, 297, 3),
(924, 297, 7),
(925, 297, 9),
(927, 298, 5),
(928, 298, 7),
(929, 299, 5),
(934, 300, 2),
(930, 300, 3),
(931, 300, 5),
(933, 300, 6),
(935, 300, 7),
(936, 300, 13),
(932, 300, 14),
(938, 301, 3),
(937, 301, 15),
(939, 302, 5),
(941, 303, 3),
(940, 303, 5),
(943, 303, 9),
(942, 303, 13),
(945, 304, 3),
(944, 304, 15),
(947, 305, 3),
(946, 305, 15),
(949, 306, 3),
(948, 306, 15),
(951, 307, 3),
(950, 307, 15),
(953, 308, 3),
(952, 308, 15),
(955, 309, 3),
(954, 309, 15),
(957, 310, 3),
(956, 310, 15),
(958, 311, 14),
(959, 312, 14),
(960, 313, 1),
(961, 313, 7),
(962, 314, 1),
(963, 314, 7),
(964, 315, 5),
(965, 316, 12),
(966, 316, 14),
(967, 317, 7),
(969, 318, 3),
(968, 318, 5),
(970, 319, 1),
(972, 319, 7),
(971, 319, 10),
(973, 320, 1),
(975, 320, 7),
(974, 320, 10),
(976, 321, 1),
(978, 321, 7),
(977, 321, 10),
(979, 322, 1),
(981, 322, 7),
(980, 322, 10),
(983, 323, 2),
(984, 323, 3),
(982, 323, 14),
(986, 324, 2),
(985, 324, 14),
(988, 325, 2),
(989, 325, 3),
(987, 325, 14),
(990, 326, 7),
(991, 327, 1),
(993, 327, 3),
(992, 327, 11),
(995, 328, 3),
(994, 328, 15),
(997, 329, 2),
(998, 329, 3),
(996, 329, 11),
(999, 330, 1),
(1001, 330, 3),
(1000, 330, 7),
(1002, 331, 1),
(1004, 331, 3),
(1003, 331, 7),
(1005, 332, 5),
(1006, 332, 15),
(1008, 333, 11),
(1007, 333, 12),
(1009, 334, 6),
(1010, 335, 1),
(1011, 335, 3),
(1013, 336, 3),
(1012, 336, 5),
(1014, 337, 1),
(1016, 337, 3),
(1015, 337, 6),
(1017, 338, 1),
(1018, 338, 2),
(1020, 338, 3),
(1019, 338, 7),
(1021, 339, 7),
(1022, 340, 1),
(1023, 340, 2),
(1024, 340, 3),
(1025, 341, 1),
(1028, 341, 3),
(1026, 341, 5),
(1027, 341, 7),
(1029, 342, 5),
(1030, 342, 7),
(1031, 343, 7),
(1034, 344, 3),
(1032, 344, 5),
(1033, 344, 15),
(1035, 345, 5),
(1036, 345, 7),
(1038, 346, 2),
(1039, 346, 3),
(1037, 346, 14),
(1041, 347, 2),
(1042, 347, 3),
(1040, 347, 13),
(1044, 348, 2),
(1043, 348, 3),
(1045, 348, 13),
(1047, 349, 2),
(1048, 349, 3),
(1046, 349, 13),
(1050, 350, 2),
(1051, 350, 3),
(1049, 350, 13),
(1053, 351, 2),
(1054, 351, 3),
(1052, 351, 13),
(1056, 352, 2),
(1057, 352, 3),
(1055, 352, 13),
(1059, 353, 2),
(1060, 353, 3),
(1058, 353, 13),
(1062, 354, 2),
(1063, 354, 3),
(1061, 354, 13),
(1065, 355, 1),
(1068, 355, 3),
(1066, 355, 8),
(1064, 355, 11),
(1067, 355, 13),
(1070, 356, 3),
(1069, 356, 10),
(1071, 357, 1),
(1072, 357, 6),
(1074, 358, 3),
(1073, 358, 7),
(1076, 359, 3),
(1075, 359, 7),
(1079, 360, 3),
(1077, 360, 4),
(1078, 360, 5),
(1082, 361, 3),
(1080, 361, 4),
(1081, 361, 5),
(1086, 362, 2),
(1084, 362, 4),
(1085, 362, 11),
(1083, 362, 12),
(1088, 363, 3),
(1089, 363, 4),
(1087, 363, 7),
(1092, 364, 2),
(1090, 364, 4),
(1091, 364, 11),
(1094, 365, 1),
(1093, 365, 4),
(1095, 365, 8),
(1096, 366, 4),
(1097, 367, 1),
(1101, 367, 3),
(1098, 367, 5),
(1099, 367, 6),
(1100, 367, 13),
(1103, 368, 2),
(1102, 368, 14),
(1104, 369, 15),
(1105, 370, 1),
(1107, 370, 2),
(1109, 370, 3),
(1108, 370, 11),
(1106, 370, 12),
(1110, 371, 1),
(1112, 371, 2),
(1114, 371, 3),
(1113, 371, 11),
(1111, 371, 12),
(1116, 372, 2),
(1117, 372, 3),
(1115, 372, 6),
(1119, 373, 2),
(1120, 373, 3),
(1118, 373, 6),
(1122, 374, 1),
(1123, 374, 3),
(1121, 374, 12),
(1125, 375, 2),
(1124, 375, 10),
(1126, 376, 1),
(1128, 376, 7),
(1127, 376, 8),
(1129, 377, 2),
(1130, 377, 5),
(1131, 377, 7),
(1134, 378, 2),
(1135, 378, 3),
(1133, 378, 6),
(1132, 378, 12),
(1136, 379, 1),
(1138, 379, 3),
(1137, 379, 7),
(1139, 380, 1),
(1140, 380, 5),
(1144, 381, 3),
(1141, 381, 5),
(1142, 381, 7),
(1143, 381, 13),
(1146, 382, 3),
(1145, 382, 5),
(1147, 383, 5),
(1148, 384, 1),
(1149, 384, 3),
(1150, 385, 16),
(1151, 386, 16),
(1152, 387, 16),
(1154, 388, 3),
(1153, 388, 7),
(1156, 389, 3),
(1155, 389, 7),
(1158, 390, 3),
(1157, 390, 7),
(1160, 391, 3),
(1159, 391, 7),
(1161, 392, 1),
(1163, 392, 3),
(1162, 392, 7),
(1164, 393, 7),
(1166, 394, 3),
(1165, 394, 7),
(1169, 395, 2),
(1171, 395, 3),
(1167, 395, 5),
(1168, 395, 6),
(1170, 395, 7),
(1173, 396, 3),
(1172, 396, 7),
(1175, 397, 2),
(1176, 397, 5),
(1174, 397, 14),
(1177, 398, 15),
(1178, 399, 15),
(1179, 400, 15),
(1180, 401, 15),
(1183, 402, 5),
(1181, 402, 6),
(1182, 402, 15),
(1185, 403, 3),
(1184, 403, 7),
(1186, 404, 1),
(1189, 404, 2),
(1188, 404, 6),
(1190, 404, 8),
(1187, 404, 12),
(1192, 405, 3),
(1191, 405, 7),
(1194, 406, 3),
(1193, 406, 7),
(1196, 407, 3),
(1195, 407, 7),
(1198, 408, 3),
(1197, 408, 7),
(1200, 409, 3),
(1199, 409, 7),
(1202, 410, 3),
(1201, 410, 7),
(1204, 411, 3),
(1203, 411, 7),
(1206, 412, 3),
(1205, 412, 7),
(1208, 413, 3),
(1207, 413, 7),
(1210, 414, 3),
(1209, 414, 7),
(1212, 415, 3),
(1211, 415, 7),
(1214, 416, 3),
(1213, 416, 7),
(1215, 417, 7),
(1216, 418, 16),
(1217, 419, 1),
(1218, 419, 16),
(1220, 420, 3),
(1219, 420, 7),
(1221, 421, 5),
(1222, 421, 7),
(1224, 422, 5),
(1223, 422, 6),
(1225, 422, 14),
(1227, 423, 6),
(1226, 423, 15),
(1229, 424, 12),
(1228, 424, 13),
(1230, 424, 15),
(1232, 425, 12),
(1231, 425, 13),
(1233, 425, 15),
(1235, 426, 12),
(1234, 426, 13),
(1236, 426, 15),
(1238, 427, 12),
(1237, 427, 13),
(1239, 427, 15),
(1240, 428, 5),
(1241, 428, 6),
(1242, 428, 7),
(1244, 429, 6),
(1243, 429, 14),
(1245, 430, 15),
(1248, 431, 3),
(1246, 431, 6),
(1247, 431, 7),
(1252, 432, 1),
(1250, 432, 2),
(1253, 432, 3),
(1249, 432, 5),
(1251, 432, 12),
(1254, 433, 1),
(1256, 433, 11),
(1255, 433, 12),
(1257, 433, 15),
(1259, 434, 2),
(1260, 434, 3),
(1258, 434, 5),
(1262, 435, 2),
(1263, 435, 3),
(1261, 435, 5),
(1264, 436, 15),
(1265, 437, 15),
(1267, 438, 3),
(1266, 438, 7),
(1268, 439, 1),
(1271, 439, 3),
(1269, 439, 6),
(1270, 439, 7),
(1272, 440, 1),
(1273, 440, 7),
(1278, 441, 2),
(1277, 441, 4),
(1275, 441, 7),
(1276, 441, 12),
(1274, 441, 13),
(1279, 442, 7),
(1281, 443, 3),
(1280, 443, 7),
(1282, 444, 15),
(1283, 445, 10),
(1284, 446, 10),
(1285, 447, 15),
(1286, 448, 15),
(1287, 449, 10),
(1289, 450, 2),
(1290, 450, 3),
(1288, 450, 14),
(1292, 451, 3),
(1291, 451, 13),
(1294, 452, 3),
(1293, 452, 13),
(1296, 453, 3),
(1295, 453, 15),
(1297, 454, 5),
(1298, 454, 15),
(1300, 455, 3),
(1299, 455, 7),
(1302, 456, 3),
(1301, 456, 7),
(1304, 457, 3),
(1303, 457, 7),
(1306, 458, 3),
(1305, 458, 7),
(1308, 459, 3),
(1307, 459, 7),
(1310, 460, 3),
(1309, 460, 7),
(1312, 461, 3),
(1311, 461, 7),
(1314, 462, 3),
(1313, 462, 7),
(1316, 463, 3),
(1315, 463, 7),
(1318, 464, 3),
(1317, 464, 7),
(1320, 465, 3),
(1319, 465, 7),
(1321, 466, 1),
(1324, 466, 3),
(1322, 466, 7),
(1323, 466, 13),
(1327, 467, 2),
(1328, 467, 3),
(1325, 467, 4),
(1326, 467, 8),
(1330, 468, 3),
(1329, 468, 8),
(1331, 469, 6),
(1332, 469, 9),
(1333, 470, 1),
(1336, 470, 4),
(1335, 470, 7),
(1334, 470, 12),
(1337, 471, 1),
(1340, 471, 6),
(1338, 471, 12),
(1339, 471, 14),
(1343, 472, 4),
(1342, 472, 9),
(1341, 472, 10),
(1346, 473, 4),
(1345, 473, 9),
(1344, 473, 10),
(1349, 474, 3),
(1347, 474, 4),
(1348, 474, 11),
(1352, 475, 2),
(1354, 475, 3),
(1353, 475, 4),
(1350, 475, 5),
(1351, 475, 14),
(1356, 476, 1),
(1355, 476, 5),
(1358, 477, 9),
(1357, 477, 14),
(1360, 478, 9),
(1359, 478, 14),
(1362, 479, 4),
(1361, 479, 5),
(1363, 479, 6),
(1365, 480, 1),
(1369, 480, 3),
(1368, 480, 4),
(1364, 480, 5),
(1366, 480, 8),
(1367, 480, 9),
(1371, 481, 1),
(1373, 481, 3),
(1375, 481, 4),
(1370, 481, 5),
(1372, 481, 8),
(1374, 481, 9),
(1378, 482, 3),
(1376, 482, 4),
(1377, 482, 7),
(1381, 483, 3),
(1379, 483, 4),
(1380, 483, 7),
(1383, 484, 3),
(1384, 484, 4),
(1382, 484, 7),
(1385, 485, 15),
(1386, 486, 16),
(1387, 487, 15),
(1388, 488, 15),
(1389, 489, 15),
(1390, 490, 15),
(1391, 491, 15),
(1392, 492, 7),
(1394, 493, 3),
(1393, 493, 7),
(1395, 494, 15),
(1396, 495, 14),
(1397, 496, 14),
(1398, 497, 16),
(1399, 498, 1),
(1400, 498, 7),
(1401, 499, 1),
(1402, 499, 15),
(1403, 500, 1),
(1404, 500, 15),
(1406, 501, 3),
(1405, 501, 15),
(1407, 502, 15),
(1408, 503, 15),
(1410, 504, 3),
(1409, 504, 7),
(1411, 505, 10),
(1413, 506, 3),
(1412, 506, 5),
(1416, 507, 3),
(1414, 507, 5),
(1415, 507, 12),
(1417, 508, 15),
(1418, 509, 15),
(1419, 510, 15),
(1421, 511, 3),
(1420, 511, 15),
(1423, 512, 3),
(1422, 512, 15),
(1424, 513, 15),
(1426, 514, 3),
(1425, 514, 15),
(1428, 515, 1),
(1429, 515, 3),
(1427, 515, 5),
(1430, 516, 1),
(1432, 516, 3),
(1433, 516, 4),
(1431, 516, 8),
(1435, 517, 12),
(1434, 517, 16),
(1436, 518, 15),
(1437, 519, 15),
(1438, 520, 6),
(1439, 520, 15),
(1440, 521, 15),
(1441, 522, 16),
(1442, 523, 16),
(1443, 524, 15),
(1444, 525, 15),
(1445, 526, 15),
(1447, 527, 1),
(1449, 527, 2),
(1450, 527, 3),
(1448, 527, 5),
(1446, 527, 13),
(1451, 528, 1),
(1453, 528, 4),
(1452, 528, 5),
(1454, 529, 1),
(1455, 529, 4),
(1457, 530, 1),
(1459, 530, 2),
(1460, 530, 3),
(1458, 530, 5),
(1456, 530, 13),
(1461, 531, 1),
(1462, 531, 7),
(1465, 532, 3),
(1463, 532, 5),
(1464, 532, 7),
(1466, 533, 1),
(1467, 534, 1),
(1470, 534, 4),
(1469, 534, 5),
(1468, 534, 8),
(1471, 535, 1),
(1472, 535, 4),
(1473, 536, 1),
(1474, 536, 5),
(1475, 536, 12),
(1476, 536, 13),
(1478, 537, 1),
(1480, 537, 2),
(1481, 537, 3),
(1479, 537, 5),
(1477, 537, 13),
(1482, 538, 1),
(1485, 538, 3),
(1483, 538, 11),
(1484, 538, 13),
(1486, 539, 1),
(1489, 539, 3),
(1487, 539, 11),
(1488, 539, 13),
(1490, 540, 1),
(1492, 540, 3),
(1491, 540, 8),
(1493, 541, 1),
(1496, 541, 3),
(1495, 541, 8),
(1494, 541, 11),
(1499, 542, 3),
(1497, 542, 7),
(1498, 542, 9),
(1500, 543, 1),
(1501, 543, 5),
(1502, 543, 12),
(1503, 543, 13),
(1504, 544, 1),
(1505, 544, 5),
(1506, 544, 12),
(1507, 544, 13),
(1508, 545, 1),
(1509, 545, 5),
(1510, 545, 12),
(1511, 545, 13),
(1513, 546, 2),
(1516, 546, 3),
(1514, 546, 6),
(1515, 546, 7),
(1512, 546, 14),
(1517, 547, 1),
(1519, 547, 3),
(1518, 547, 7),
(1520, 548, 4),
(1521, 548, 8);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `product_tags`
--
ALTER TABLE `product_tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_id` (`product_id`,`tag_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `product_tags`
--
ALTER TABLE `product_tags`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1522;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `product_tags`
--
ALTER TABLE `product_tags`
  ADD CONSTRAINT `product_tags_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
