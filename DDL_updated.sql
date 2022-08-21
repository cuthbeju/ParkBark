-- MySQL documentation recommends to turn off foreign key checks and autocommits at the beginning of SQL file.
SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;


-- --------------------------------------------------------

--
-- Create `Breeds` Table
--

DROP TABLE IF EXISTS `Breeds`;
CREATE TABLE `Breeds` (
  `breedID` int(11) NOT NULL AUTO_INCREMENT,
  `breed_name` varchar(45) NULL,
  PRIMARY KEY (`breedID`)
);

--
-- Dumping data for table `Breeds`
--

INSERT INTO `Breeds` (`breed_name`) VALUES
('American Pit Bull Terrier'),
('Labrador Retriever'),
('Australian Shepherd'),
('Rottweiler');

-- --------------------------------------------------------

--
-- Create `DogHumanRelations` Table
--

DROP TABLE IF EXISTS `DogHumanRelations`;
CREATE TABLE `DogHumanRelations` (
  `relationID` int(11) NOT NULL AUTO_INCREMENT,
  `relation_typeID` int(11) NOT NULL,
  `dogID` int(11) NOT NULL,
  `humanID` int(11) NOT NULL,
  PRIMARY KEY (`relationID`),
  FOREIGN KEY (`dogID`) REFERENCES `Dogs`(`dogID`) ON DELETE CASCADE,
  FOREIGN KEY (`humanID`) REFERENCES `Humans` (`humanID`) ON DELETE CASCADE,
  FOREIGN KEY (`relation_typeID`) REFERENCES `RelationTypes` (`relation_typeID`) ON DELETE CASCADE
);

--
-- Dumping data for table `DogHumanRelations`
--

INSERT INTO `DogHumanRelations` (`relation_typeID`, `dogID`, `humanID`) VALUES
(1, 1, 1),
(2, 2, 2),
(2, 3, 3),
(1, 4, 4),
(1, 5, 4);

-- --------------------------------------------------------

--
-- Create `Dogs` Table
--
DROP TABLE IF EXISTS `Dogs`;
CREATE TABLE `Dogs` (
  `dogID` int(11) NOT NULL AUTO_INCREMENT,
  `dog_name` varchar(100) NOT NULL,
  `birthday` date NOT NULL,
  `breedID` int(11) NULL,
  PRIMARY KEY (`dogID`),
  FOREIGN KEY (`breedID`) REFERENCES `Breeds`(`breedID`)
);

--
-- Dumping data for table `Dogs`
--

INSERT INTO `Dogs` (`dog_name`, `birthday`, `breedID`) VALUES
('Buddy', '2016-06-20', 2),
('Bella', '2017-12-05', 1),
('Milo', '2018-12-08', 3),
('Luna', '2020-02-01', 4),
('Max', '2017-12-26', 4);

-- --------------------------------------------------------

--
-- Create `Humans` Table
--

DROP TABLE IF EXISTS `Humans`;
CREATE TABLE `Humans` (
  `humanID` int(11) NOT NULL AUTO_INCREMENT,
  `human_name` varchar(100) NOT NULL,
  `phone` varchar(14) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`humanID`)
);

--
-- Dumping data for table `Humans`
--

INSERT INTO `Humans` (`human_name`, `phone`, `email`) VALUES
('Dwayne Bishop', '(329) 456-9661', 'bishopd@gmail.com'),
('Bethany Brady', '(775) 797-3205', 'beth.brady@yahoo.com'),
('Emilio Walters', '(999) 606-3906', 'walters.em@hotmail.com'),
('Denise Kim', '(884) 408-9583', 'denise.kim7@gmail.com');

-- --------------------------------------------------------

--
-- Create `RelationTypes` Table
--

DROP TABLE IF EXISTS `RelationTypes`;
CREATE TABLE `RelationTypes` (
  `relation_typeID` int(11) NOT NULL AUTO_INCREMENT,
  `relationship` varchar(45) NOT NULL,
  PRIMARY KEY (`relation_typeID`)
);

--
-- Dumping data for table `RelationTypes`
--

INSERT INTO `RelationTypes` (`relationship`) VALUES
('Owner'),
('Sitter');

-- --------------------------------------------------------

--
-- Create `Visits` Table
--

DROP TABLE IF EXISTS `Visits`;
CREATE TABLE `Visits` (
  `visitID` int(11) NOT NULL AUTO_INCREMENT,
  `entry_time` datetime NOT NULL,
  `exit_time` datetime DEFAULT NULL,
  `relationID` int(11) NOT NULL,
  PRIMARY KEY (`visitID`),
  FOREIGN KEY (`relationID`) REFERENCES `DogHumanRelations`(`relationID`) ON DELETE CASCADE
);

--
-- Dumping data for table `Visits`
--

INSERT INTO `Visits` (`entry_time`, `exit_time`, `relationID`) VALUES
('2022-07-05 12:28:18', '2022-07-05 13:11:15', 5),
('2022-07-05 12:28:18', '2022-07-05 13:11:15', 4),
('2022-07-07 13:52:25', '2022-07-07 14:40:27', 3),
('2022-07-08 07:18:55', '2022-07-08 07:58:31', 2),
('2022-07-10 09:34:56', '2022-07-10 10:37:23', 1);


-- Foreign key checks and autocommits turned back on at end of file.
SET FOREIGN_KEY_CHECKS = 1;
COMMIT;