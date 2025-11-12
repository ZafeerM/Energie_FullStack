
CREATE TABLE `Bills` (
  `BillID` int NOT NULL,
  `ConnectionID` int NOT NULL,
  `UnitsConsumed` int NOT NULL DEFAULT '0',
  `PerUnitRate` decimal(65,2) NOT NULL DEFAULT '0.00',
  `TotalAmount` decimal(65,2) NOT NULL DEFAULT '0.00',
  `DueDate` datetime NOT NULL,
  `Status` varchar(45) NOT NULL,
  PRIMARY KEY (`BillID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Complaints` (
  `ComplaintID` int NOT NULL,
  `ComplaintType` varchar(45) NOT NULL,
  `ComplaintDate` datetime NOT NULL,
  `Severity` int NOT NULL DEFAULT '1',
  `ConsumerID` int NOT NULL,
  `ConnectionID` int NOT NULL,
  PRIMARY KEY (`ComplaintID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `ConnectionRequests` (
  `RequestID` int NOT NULL,
  `ConsumerID` int NOT NULL,
  `RequestDate` datetime NOT NULL,
  `Status` varchar(45) NOT NULL,
  PRIMARY KEY (`RequestID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Connections` (
  `ConnectionID` int NOT NULL,
  `Type` varchar(45) NOT NULL,
  `MeterID` int NOT NULL,
  `ConsumerID` int NOT NULL,
  `WarningCount` int NOT NULL DEFAULT '0',
  `BalancePayment` decimal(65,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`ConnectionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Consumers` (
  `ConsumerID` int NOT NULL,
  `FName` varchar(100) NOT NULL,
  `LName` varchar(100) NOT NULL,
  `ContactNo` varchar(11) NOT NULL,
  `Address1` varchar(150) NOT NULL,
  `Address2` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`ConsumerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `LoginDetails` (
  `ConsumerID` int NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`ConsumerID`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Meters` (
  `MeterID` int NOT NULL,
  `Location` varchar(100) NOT NULL,
  `InstallationDate` datetime NOT NULL,
  `Status` varchar(45) NOT NULL,
  PRIMARY KEY (`MeterID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Payments` (
  `PaymentID` int NOT NULL,
  `BillID` int NOT NULL,
  `Amount` decimal(65,2) NOT NULL DEFAULT '0.00',
  `Status` varchar(45) NOT NULL,
  `PaymentDate` datetime NOT NULL,
  PRIMARY KEY (`PaymentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Readings` (
  `ReadingID` int NOT NULL,
  `MeterID` int NOT NULL,
  `ReadingValue` int NOT NULL,
  `ReadingDate` datetime NOT NULL,
  PRIMARY KEY (`ReadingID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Warnings` (
  `WarningID` int NOT NULL,
  `ConnectionID` int NOT NULL,
  `DateIssued` datetime NOT NULL,
  `NextActionOn` datetime NOT NULL,
  PRIMARY KEY (`WarningID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


ALTER TABLE `Connections`
  ADD CONSTRAINT `fk_Connections_Consumer`
  FOREIGN KEY (`ConsumerID`) REFERENCES `Consumers` (`ConsumerID`)
  ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Connections_Meter`
  FOREIGN KEY (`MeterID`) REFERENCES `Meters` (`MeterID`)
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `Readings`
  ADD CONSTRAINT `fk_Readings_Meter`
  FOREIGN KEY (`MeterID`) REFERENCES `Meters` (`MeterID`)
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `Bills`
  ADD CONSTRAINT `fk_Bills_Connection`
  FOREIGN KEY (`ConnectionID`) REFERENCES `Connections` (`ConnectionID`)
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `Payments`
  ADD CONSTRAINT `fk_Payments_Bill`
  FOREIGN KEY (`BillID`) REFERENCES `Bills` (`BillID`)
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `Warnings`
  ADD CONSTRAINT `fk_Warnings_Connection`
  FOREIGN KEY (`ConnectionID`) REFERENCES `Connections` (`ConnectionID`)
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `ConnectionRequests`
  ADD CONSTRAINT `fk_ConnectionRequests_Consumer`
  FOREIGN KEY (`ConsumerID`) REFERENCES `Consumers` (`ConsumerID`)
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `Complaints`
  ADD CONSTRAINT `fk_Complaints_Consumer`
  FOREIGN KEY (`ConsumerID`) REFERENCES `Consumers` (`ConsumerID`)
  ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Complaints_Connection`
  FOREIGN KEY (`ConnectionID`) REFERENCES `Connections` (`ConnectionID`)
  ON DELETE CASCADE ON UPDATE CASCADE;
  
-- ---------------------------------------
-- CONSUMERS
-- ---------------------------------------
INSERT INTO Consumers (ConsumerID, FName, LName, ContactNo, Address1, Address2)
VALUES
(100001, 'Ahmed', 'Khan', '03001234567', 'House 12, Street 8, Gulshan-e-Iqbal', 'Karachi'),
(100002, 'Fatima', 'Ali', '03015678901', 'Flat 3B, Rufi Apartments, Gulistan-e-Jauhar', 'Karachi'),
(100003, 'Usman', 'Sheikh', '03121234567', 'Plot 22, Block H, North Nazimabad', 'Karachi'),
(100004, 'Ayesha', 'Qureshi', '03334567890', 'House 9, PECHS Block 6', 'Karachi'),
(100005, 'Bilal', 'Hassan', '03219876543', 'House 4, Street 11, Korangi', 'Karachi');

-- ---------------------------------------
-- LOGIN DETAILS
-- ---------------------------------------
INSERT INTO LoginDetails (ConsumerID, username, password)
VALUES
(100001, 'ahmed.khan@gmail.com', 'password123'),
(100002, 'fatima.ali@yahoo.com', 'password123'),
(100003, 'usman.sheikh@hotmail.com', 'password123'),
(100004, 'ayesha.qureshi@gmail.com', 'password123'),
(100005, 'bilal.hassan@outlook.com', 'password123');

-- ---------------------------------------
-- METERS
-- ---------------------------------------
INSERT INTO Meters (MeterID, Location, InstallationDate, Status)
VALUES
(4001, 'Gulshan-e-Iqbal', '2023-01-10 00:00:00', 'Active'),
(4002, 'Gulistan-e-Jauhar', '2023-02-15 00:00:00', 'Active'),
(4003, 'North Nazimabad', '2023-03-12 00:00:00', 'Active'),
(4004, 'PECHS Block 6', '2023-04-20 00:00:00', 'Active'),
(4005, 'Korangi', '2023-05-25 00:00:00', 'Active'),
(4006, 'Clifton', '2023-06-10 00:00:00', 'Active'),
(4007, 'DHA Phase 5', '2023-07-01 00:00:00', 'Active');

-- ---------------------------------------
-- CONNECTIONS
-- ---------------------------------------
INSERT INTO Connections (ConnectionID, Type, MeterID, ConsumerID, WarningCount, BalancePayment)
VALUES
(50001, 'Residential', 4001, 100001, 0, 0.00),
(50002, 'Commercial', 4002, 100002, 0, 0.00),
(50003, 'Residential', 4003, 100003, 0, 0.00),
(50004, 'Government', 4004, 100004, 0, 0.00),
(50005, 'Residential', 4005, 100005, 0, 0.00),
(50006, 'Commercial', 4006, 100001, 0, 0.00),  -- Ahmed Khan has 2 connections
(50007, 'Residential', 4007, 100002, 0, 0.00); -- Fatima Ali has 2 connections

-- ---------------------------------------
-- READINGS
-- ---------------------------------------
INSERT INTO Readings (ReadingID, MeterID, ReadingValue, ReadingDate)
VALUES
(8001, 4001, 2560, '2024-10-01 00:00:00'),
(8002, 4002, 4210, '2024-10-01 00:00:00'),
(8003, 4003, 3150, '2024-10-01 00:00:00'),
(8004, 4004, 1980, '2024-10-01 00:00:00'),
(8005, 4005, 2745, '2024-10-01 00:00:00'),
(8006, 4006, 3890, '2024-10-01 00:00:00'),
(8007, 4007, 2500, '2024-10-01 00:00:00');

-- ---------------------------------------
-- EMPTY TABLES (NO INSERTS)
-- ---------------------------------------
-- Bills
-- Payments
-- Warnings
-- ConnectionRequests
-- Complaints
  