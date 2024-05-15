-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 15, 2024 at 09:41 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `educationclick`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` bigint(20) NOT NULL,
  `booking_date` datetime(6) NOT NULL,
  `payment` int(11) NOT NULL,
  `timeslot_id` bigint(20) DEFAULT NULL,
  `teacher_id` bigint(20) DEFAULT NULL,
  `student_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `booking_date`, `payment`, `timeslot_id`, `teacher_id`, `student_id`) VALUES
(1, '2024-05-06 01:56:00.000000', 29101, 1, 1, 2),
(2, '2024-05-06 04:56:00.000000', 5000, 2, 1, 4),
(3, '2024-05-05 16:29:24.000000', 11882, NULL, NULL, NULL),
(4, '2024-05-05 21:58:46.000000', 31651, NULL, NULL, NULL),
(5, '2024-05-06 04:05:36.000000', 27869, NULL, NULL, NULL),
(6, '2024-05-05 16:35:03.000000', 6792, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `databasechangelog`
--

CREATE TABLE `databasechangelog` (
  `ID` varchar(255) NOT NULL,
  `AUTHOR` varchar(255) NOT NULL,
  `FILENAME` varchar(255) NOT NULL,
  `DATEEXECUTED` datetime NOT NULL,
  `ORDEREXECUTED` int(11) NOT NULL,
  `EXECTYPE` varchar(10) NOT NULL,
  `MD5SUM` varchar(35) DEFAULT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `COMMENTS` varchar(255) DEFAULT NULL,
  `TAG` varchar(255) DEFAULT NULL,
  `LIQUIBASE` varchar(20) DEFAULT NULL,
  `CONTEXTS` varchar(255) DEFAULT NULL,
  `LABELS` varchar(255) DEFAULT NULL,
  `DEPLOYMENT_ID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `databasechangelog`
--

INSERT INTO `databasechangelog` (`ID`, `AUTHOR`, `FILENAME`, `DATEEXECUTED`, `ORDEREXECUTED`, `EXECTYPE`, `MD5SUM`, `DESCRIPTION`, `COMMENTS`, `TAG`, `LIQUIBASE`, `CONTEXTS`, `LABELS`, `DEPLOYMENT_ID`) VALUES
('00000000000001', 'jhipster', 'config/liquibase/changelog/00000000000000_initial_schema.xml', '2024-05-11 13:53:05', 1, 'EXECUTED', '9:efdff6f85c9b59fb7dcac658d983d6be', 'createTable tableName=jhi_user; createTable tableName=jhi_authority; createTable tableName=jhi_user_authority; addPrimaryKey tableName=jhi_user_authority; addForeignKeyConstraint baseTableName=jhi_user_authority, constraintName=fk_authority_name, ...', '', NULL, '4.24.0', NULL, NULL, '5415784329'),
('20240506084014-1', 'jhipster', 'config/liquibase/changelog/20240506084014_added_entity_Teacher.xml', '2024-05-11 13:53:05', 2, 'EXECUTED', '9:4383e446296b1df068419d3307ff9e62', 'createTable tableName=teacher', '', NULL, '4.24.0', NULL, NULL, '5415784329'),
('20240506084014-1-data', 'jhipster', 'config/liquibase/changelog/20240506084014_added_entity_Teacher.xml', '2024-05-11 13:53:05', 3, 'EXECUTED', '9:0aebda1f9a110a0b141b11c3ae156b2e', 'loadData tableName=teacher', '', NULL, '4.24.0', 'faker', NULL, '5415784329'),
('20240506084016-1', 'jhipster', 'config/liquibase/changelog/20240506084016_added_entity_Student.xml', '2024-05-11 13:53:05', 4, 'EXECUTED', '9:91ef6e2636d6cc0e99ac99e5c82966bd', 'createTable tableName=student', '', NULL, '4.24.0', NULL, NULL, '5415784329'),
('20240506084016-1-data', 'jhipster', 'config/liquibase/changelog/20240506084016_added_entity_Student.xml', '2024-05-11 13:53:05', 5, 'EXECUTED', '9:9638ff23e88a1d85c5572cc2ab9b3b24', 'loadData tableName=student', '', NULL, '4.24.0', 'faker', NULL, '5415784329'),
('20240506084017-1', 'jhipster', 'config/liquibase/changelog/20240506084017_added_entity_Booking.xml', '2024-05-11 13:53:05', 6, 'EXECUTED', '9:55bee1d9db60b1980dd08586e5851623', 'createTable tableName=booking; dropDefaultValue columnName=booking_date, tableName=booking', '', NULL, '4.24.0', NULL, NULL, '5415784329'),
('20240506084017-1-data', 'jhipster', 'config/liquibase/changelog/20240506084017_added_entity_Booking.xml', '2024-05-11 13:53:06', 7, 'EXECUTED', '9:7f34464f89a49b03796629992addf8a8', 'loadData tableName=booking', '', NULL, '4.24.0', 'faker', NULL, '5415784329'),
('20240506084018-1', 'jhipster', 'config/liquibase/changelog/20240506084018_added_entity_Subject.xml', '2024-05-11 13:53:06', 8, 'EXECUTED', '9:a0d74376d3e5e6f0110db7ed0ba2b99c', 'createTable tableName=subject', '', NULL, '4.24.0', NULL, NULL, '5415784329'),
('20240506084018-1-data', 'jhipster', 'config/liquibase/changelog/20240506084018_added_entity_Subject.xml', '2024-05-11 13:53:06', 9, 'EXECUTED', '9:195d3cabccad27cf96c63342a6486364', 'loadData tableName=subject', '', NULL, '4.24.0', 'faker', NULL, '5415784329'),
('20240506093033-1', 'jhipster', 'config/liquibase/changelog/20240506093033_added_entity_Timeslot.xml', '2024-05-11 13:53:06', 10, 'EXECUTED', '9:02ce2fadc28ae0da54682222d1a6da2c', 'createTable tableName=timeslot; dropDefaultValue columnName=start_time, tableName=timeslot; dropDefaultValue columnName=end_time, tableName=timeslot', '', NULL, '4.24.0', NULL, NULL, '5415784329'),
('20240506093033-1-data', 'jhipster', 'config/liquibase/changelog/20240506093033_added_entity_Timeslot.xml', '2024-05-11 13:53:06', 11, 'EXECUTED', '9:da2ad7198b9904bfc3a6e5423733112d', 'loadData tableName=timeslot', '', NULL, '4.24.0', 'faker', NULL, '5415784329'),
('20240506161244-1', 'jhipster', 'config/liquibase/changelog/20240506161244_added_entity_Meeting.xml', '2024-05-11 13:53:06', 12, 'EXECUTED', '9:7e82deeebb7d123ae4998e2a60941bb7', 'createTable tableName=meeting', '', NULL, '4.24.0', NULL, NULL, '5415784329'),
('20240506161244-1-data', 'jhipster', 'config/liquibase/changelog/20240506161244_added_entity_Meeting.xml', '2024-05-11 13:53:06', 13, 'EXECUTED', '9:646723ff71af3815d45adcd45b839bb3', 'loadData tableName=meeting', '', NULL, '4.24.0', 'faker', NULL, '5415784329'),
('20240506173445-1', 'jhipster', 'config/liquibase/changelog/20240506173445_added_entity_StudyMaterial.xml', '2024-05-11 13:53:06', 14, 'EXECUTED', '9:3c5ee1c504b6954f2dfaecce4b0705b7', 'createTable tableName=study_material; dropDefaultValue columnName=upload_date, tableName=study_material', '', NULL, '4.24.0', NULL, NULL, '5415784329'),
('20240506173445-1-data', 'jhipster', 'config/liquibase/changelog/20240506173445_added_entity_StudyMaterial.xml', '2024-05-11 13:53:06', 15, 'EXECUTED', '9:11253bd698ca3a2cbfce351a766dd827', 'loadData tableName=study_material', '', NULL, '4.24.0', 'faker', NULL, '5415784329'),
('20240506093033-2', 'jhipster', 'config/liquibase/changelog/20240506093033_added_entity_constraints_Timeslot.xml', '2024-05-11 13:53:06', 16, 'EXECUTED', '9:3a498100ac2330bfb0eabc526c6021f8', 'addForeignKeyConstraint baseTableName=timeslot, constraintName=fk_timeslot__teacher_id, referencedTableName=teacher', '', NULL, '4.24.0', NULL, NULL, '5415784329'),
('20240506161244-2', 'jhipster', 'config/liquibase/changelog/20240506161244_added_entity_constraints_Meeting.xml', '2024-05-11 13:53:07', 17, 'EXECUTED', '9:3cae686fc270df7084d3be4fe0111c05', 'addForeignKeyConstraint baseTableName=meeting, constraintName=fk_meeting__teacher_id, referencedTableName=teacher; addForeignKeyConstraint baseTableName=meeting, constraintName=fk_meeting__timeslot_id, referencedTableName=timeslot; addForeignKeyCo...', '', NULL, '4.24.0', NULL, NULL, '5415784329'),
('20240506173445-2', 'jhipster', 'config/liquibase/changelog/20240506173445_added_entity_constraints_StudyMaterial.xml', '2024-05-11 13:53:07', 18, 'EXECUTED', '9:717d978c19dcf5d47a6279214653cb24', 'addForeignKeyConstraint baseTableName=study_material, constraintName=fk_study_material__teacher_id, referencedTableName=teacher', '', NULL, '4.24.0', NULL, NULL, '5415784329'),
('20240506084017-2', 'jhipster', 'config/liquibase/changelog/20240506084017_added_entity_constraints_Booking.xml', '2024-05-11 13:53:07', 19, 'EXECUTED', '9:b75e6758a03f898a4d8958868be2d2d0', 'addForeignKeyConstraint baseTableName=booking, constraintName=fk_booking__timeslot_id, referencedTableName=timeslot; addForeignKeyConstraint baseTableName=booking, constraintName=fk_booking__teacher_id, referencedTableName=teacher; addForeignKeyCo...', '', NULL, '4.24.0', NULL, NULL, '5415784329'),
('20240510120000-add-contact-no-to-user', 'jhipster', 'config/liquibase/changelog/20240510120000_add_contact_no_to_user.xml', '2024-05-11 14:14:51', 20, 'EXECUTED', '9:adc494e2ab7383f0ba1995941b5fef3a', 'addColumn tableName=jhi_user', '', NULL, '4.24.0', NULL, NULL, '5417091453'),
('add_new_fields_to_user_entity', 'jhipster', 'config/liquibase/changelog/20240510120001_added_fields_to_user_and_subject.xml', '2024-05-11 14:14:51', 21, 'EXECUTED', '9:899824a72b8098d2bc6912b43929dac4', 'addColumn tableName=jhi_user', '', NULL, '4.24.0', NULL, NULL, '5417091453'),
('add_user_subject_relationship', 'your_name', 'config/liquibase/changelog/20240510120002_add_user_subject_relationship.xml', '2024-05-11 14:14:51', 22, 'EXECUTED', '9:56b7ef41a4f2b7930c231829e74d99ea', 'createTable tableName=user_subject; addForeignKeyConstraint baseTableName=user_subject, constraintName=fk_user_subject_user, referencedTableName=jhi_user; addForeignKeyConstraint baseTableName=user_subject, constraintName=fk_user_subject_subject, ...', '', NULL, '4.24.0', NULL, NULL, '5417091453');

-- --------------------------------------------------------

--
-- Table structure for table `databasechangeloglock`
--

CREATE TABLE `databasechangeloglock` (
  `ID` int(11) NOT NULL,
  `LOCKED` tinyint(1) NOT NULL,
  `LOCKGRANTED` datetime DEFAULT NULL,
  `LOCKEDBY` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `databasechangeloglock`
--

INSERT INTO `databasechangeloglock` (`ID`, `LOCKED`, `LOCKGRANTED`, `LOCKEDBY`) VALUES
(1, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `jhi_authority`
--

CREATE TABLE `jhi_authority` (
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jhi_authority`
--

INSERT INTO `jhi_authority` (`name`) VALUES
('ROLE_ADMIN'),
('ROLE_STUDENT'),
('ROLE_TEACHER'),
('ROLE_USER');

-- --------------------------------------------------------

--
-- Table structure for table `jhi_user`
--

CREATE TABLE `jhi_user` (
  `id` bigint(20) NOT NULL,
  `login` varchar(50) NOT NULL,
  `password_hash` varchar(60) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `image_url` varchar(256) DEFAULT NULL,
  `activated` tinyint(1) NOT NULL,
  `lang_key` varchar(10) DEFAULT NULL,
  `activation_key` varchar(20) DEFAULT NULL,
  `reset_key` varchar(20) DEFAULT NULL,
  `created_by` varchar(50) NOT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `reset_date` timestamp NULL DEFAULT NULL,
  `last_modified_by` varchar(50) DEFAULT NULL,
  `last_modified_date` timestamp NULL DEFAULT NULL,
  `contact_no` varchar(15) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `guardian_name` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `guardian_contact` varchar(50) DEFAULT NULL,
  `guardian_email` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jhi_user`
--

INSERT INTO `jhi_user` (`id`, `login`, `password_hash`, `first_name`, `last_name`, `email`, `image_url`, `activated`, `lang_key`, `activation_key`, `reset_key`, `created_by`, `created_date`, `reset_date`, `last_modified_by`, `last_modified_date`, `contact_no`, `date_of_birth`, `gender`, `guardian_name`, `address`, `guardian_contact`, `guardian_email`) VALUES
(1, 'admin', '$2a$10$gSAhZrxMllrbgj/kkK9UceBPpChGWJA7SYIb1Mqo.n5aNLq1/oRrC', 'Pramodya', 'Deshan', 'admin@localhost.com', '', 1, 'en', NULL, NULL, 'system', NULL, NULL, 'admin', '2024-05-14 18:47:27', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'user', '$2a$10$VEjxo0jq2YG9Rbk2HmX9S.k1uZBGYUHdUcid3g/vfiEl7lwWgOH/K', 'User', 'User', 'user@localhost', '', 0, 'en', NULL, NULL, 'system', NULL, NULL, 'admin', '2024-05-13 08:10:20', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `jhi_user_authority`
--

CREATE TABLE `jhi_user_authority` (
  `user_id` bigint(20) NOT NULL,
  `authority_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jhi_user_authority`
--

INSERT INTO `jhi_user_authority` (`user_id`, `authority_name`) VALUES
(1, 'ROLE_ADMIN'),
(1, 'ROLE_USER'),
(2, 'ROLE_USER');

-- --------------------------------------------------------

--
-- Table structure for table `meeting`
--

CREATE TABLE `meeting` (
  `id` bigint(20) NOT NULL,
  `meeting_link` varchar(255) NOT NULL,
  `teacher_id` bigint(20) DEFAULT NULL,
  `timeslot_id` bigint(20) DEFAULT NULL,
  `student_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `meeting`
--

INSERT INTO `meeting` (`id`, `meeting_link`, `teacher_id`, `timeslot_id`, `student_id`) VALUES
(1, 'wwww', 1, 1, 1),
(2, 'grounded', NULL, NULL, NULL),
(3, 'blah who', NULL, NULL, NULL),
(4, 'spy exude', NULL, NULL, NULL),
(5, 'agile interpolate worrisome', NULL, NULL, NULL),
(6, 'however checkbook wonderfully', NULL, NULL, NULL),
(7, 'out', NULL, NULL, NULL),
(8, 'yawningly drat mmm', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` bigint(20) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `contact_no` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `guardian_name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `guardian_contact` varchar(255) DEFAULT NULL,
  `guardian_email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `first_name`, `last_name`, `contact_no`, `date_of_birth`, `gender`, `email`, `subject`, `password`, `username`, `guardian_name`, `address`, `guardian_contact`, `guardian_email`) VALUES
(1, 'Gayan', 'Perera', '0779707981', '2024-05-05', 'Male', 'Otis.Beatty@yahoo.com', 'finally gosh', 'meaty', 'lark', 'transfer parole concerning', 'readily', 'whimsical ha', 'however as yieldingly'),
(2, 'Kallie', 'Ryan', '0779707981', '2024-05-05', 'about ew who', 'Ramon_Turcotte@yahoo.com', 'fatherly', 'dazzle', 'busy regarding', 'loftily pioneer difficult', 'pleasure deadly upset', 'woodshed phew', 'aw whose'),
(4, 'Coy', 'Gulgowski', 'board', '2024-05-05', 'sans intensely', 'Germaine_Hane69@hotmail.com', 'flower', 'dearly', 'yesterday', 'beneath oh cephalopod', 'short-term', 'landmine unbearably webbed', 'continually'),
(5, 'Alejandra', 'Armstrong', 'meanwhile ham', '2024-05-05', 'indeed radio committee', 'Lauretta41@hotmail.com', 'lanky choker nor', 'uniform since huzzah', 'coolly', 'whether', 'instead till vastly', 'uh-huh whether though', 'past buzzing'),
(6, 'Michaela', 'Parisian', 'pfft install', '2024-05-06', 'limited for', 'Reva68@gmail.com', 'jogging', 'what only', 'brr frankly', 'duh complicated', 'maniac atop ick', 'sans indeed squat', 'unwrap ha politicize'),
(1500, 'Pramodya', 'Deshan', '0779707981', '2024-05-15', 'Male', 'pramodyadeshan1996@gmail.com', 'ICT', '123123', 'pramodya', 'Janaka', 'Matara', '0779707822', 'asdsadsad@clk.lk');

-- --------------------------------------------------------

--
-- Table structure for table `study_material`
--

CREATE TABLE `study_material` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `file` longblob NOT NULL,
  `file_content_type` varchar(255) NOT NULL,
  `upload_date` datetime(6) NOT NULL,
  `teacher_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`id`, `name`) VALUES
(1, 'ICT'),
(2, 'Science For Technology'),
(3, 'Mathematics '),
(4, 'Sinhala'),
(5, 'History'),
(8, 'sleepily slip'),
(1500, 'History'),
(1501, 'Engineering Technology');

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fee_per_hour` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`id`, `name`, `subject`, `email`, `fee_per_hour`) VALUES
(1, 'Taniya', 'ICT', 'Lucas37@gmail.com', 1386.65),
(6, 'elated pro whoa', 'drat', 'Rowena67@gmail.com', 206.11),
(7, 'verge', 'aircraft', 'Domenico96@yahoo.com', 1394.41),
(8, 'concerning', 'whose because tempt', 'Rashad_Muller44@gmail.com', 17868.06);

-- --------------------------------------------------------

--
-- Table structure for table `timeslot`
--

CREATE TABLE `timeslot` (
  `id` bigint(20) NOT NULL,
  `start_time` datetime(6) NOT NULL,
  `end_time` datetime(6) NOT NULL,
  `availability` tinyint(1) NOT NULL,
  `teacher_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `timeslot`
--

INSERT INTO `timeslot` (`id`, `start_time`, `end_time`, `availability`, `teacher_id`) VALUES
(1, '2024-05-06 01:15:00.000000', '2024-05-05 10:42:00.000000', 1, 1),
(2, '2024-05-05 23:19:00.000000', '2024-05-06 05:59:31.000000', 1, NULL),
(3, '2024-05-05 15:54:00.000000', '2024-05-05 20:12:00.000000', 0, 1),
(4, '2024-05-06 00:52:00.000000', '2024-05-05 11:27:00.000000', 0, 1),
(5, '2024-05-06 07:54:48.000000', '2024-05-05 15:00:04.000000', 1, NULL),
(6, '2024-05-06 03:09:11.000000', '2024-05-06 08:00:34.000000', 1, NULL),
(7, '2024-05-05 10:26:04.000000', '2024-05-05 19:24:52.000000', 0, NULL),
(8, '2024-05-05 18:14:50.000000', '2024-05-05 11:59:31.000000', 1, NULL),
(9, '2024-05-06 06:58:33.000000', '2024-05-06 07:04:34.000000', 0, NULL),
(1500, '2024-05-14 18:30:00.000000', '2024-05-14 18:30:00.000000', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_subject`
--

CREATE TABLE `user_subject` (
  `user_id` bigint(20) NOT NULL,
  `subject_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_booking__timeslot_id` (`timeslot_id`),
  ADD KEY `fk_booking__teacher_id` (`teacher_id`),
  ADD KEY `fk_booking__student_id` (`student_id`);

--
-- Indexes for table `databasechangeloglock`
--
ALTER TABLE `databasechangeloglock`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `jhi_authority`
--
ALTER TABLE `jhi_authority`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `jhi_user`
--
ALTER TABLE `jhi_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ux_user_login` (`login`),
  ADD UNIQUE KEY `ux_user_email` (`email`);

--
-- Indexes for table `jhi_user_authority`
--
ALTER TABLE `jhi_user_authority`
  ADD PRIMARY KEY (`user_id`,`authority_name`),
  ADD KEY `fk_authority_name` (`authority_name`);

--
-- Indexes for table `meeting`
--
ALTER TABLE `meeting`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_meeting__teacher_id` (`teacher_id`),
  ADD KEY `fk_meeting__timeslot_id` (`timeslot_id`),
  ADD KEY `fk_meeting__student_id` (`student_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `study_material`
--
ALTER TABLE `study_material`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_study_material__teacher_id` (`teacher_id`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `timeslot`
--
ALTER TABLE `timeslot`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_timeslot__teacher_id` (`teacher_id`);

--
-- Indexes for table `user_subject`
--
ALTER TABLE `user_subject`
  ADD KEY `fk_user_subject_user` (`user_id`),
  ADD KEY `fk_user_subject_subject` (`subject_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1501;

--
-- AUTO_INCREMENT for table `jhi_user`
--
ALTER TABLE `jhi_user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1053;

--
-- AUTO_INCREMENT for table `meeting`
--
ALTER TABLE `meeting`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1502;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1501;

--
-- AUTO_INCREMENT for table `study_material`
--
ALTER TABLE `study_material`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1501;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1502;

--
-- AUTO_INCREMENT for table `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1500;

--
-- AUTO_INCREMENT for table `timeslot`
--
ALTER TABLE `timeslot`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1501;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `fk_booking__student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`),
  ADD CONSTRAINT `fk_booking__teacher_id` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`),
  ADD CONSTRAINT `fk_booking__timeslot_id` FOREIGN KEY (`timeslot_id`) REFERENCES `timeslot` (`id`);

--
-- Constraints for table `jhi_user_authority`
--
ALTER TABLE `jhi_user_authority`
  ADD CONSTRAINT `fk_authority_name` FOREIGN KEY (`authority_name`) REFERENCES `jhi_authority` (`name`),
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `jhi_user` (`id`);

--
-- Constraints for table `meeting`
--
ALTER TABLE `meeting`
  ADD CONSTRAINT `fk_meeting__student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`),
  ADD CONSTRAINT `fk_meeting__teacher_id` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`),
  ADD CONSTRAINT `fk_meeting__timeslot_id` FOREIGN KEY (`timeslot_id`) REFERENCES `timeslot` (`id`);

--
-- Constraints for table `study_material`
--
ALTER TABLE `study_material`
  ADD CONSTRAINT `fk_study_material__teacher_id` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`);

--
-- Constraints for table `timeslot`
--
ALTER TABLE `timeslot`
  ADD CONSTRAINT `fk_timeslot__teacher_id` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`);

--
-- Constraints for table `user_subject`
--
ALTER TABLE `user_subject`
  ADD CONSTRAINT `fk_user_subject_subject` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`),
  ADD CONSTRAINT `fk_user_subject_user` FOREIGN KEY (`user_id`) REFERENCES `jhi_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
