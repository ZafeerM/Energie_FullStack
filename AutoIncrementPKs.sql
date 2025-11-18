-- Step 1: Create temporary tables with auto-increment

CREATE TABLE Consumers_temp (
  ConsumerID int NOT NULL AUTO_INCREMENT,
  FName varchar(100) NOT NULL,
  LName varchar(100) NOT NULL,
  ContactNo varchar(11) NOT NULL,
  Address1 varchar(150) NOT NULL,
  Address2 varchar(150) DEFAULT NULL,
  PRIMARY KEY (ConsumerID)
);

CREATE TABLE Meters_temp (
  MeterID int NOT NULL AUTO_INCREMENT,
  Location varchar(100) NOT NULL,
  InstallationDate datetime NOT NULL,
  Status varchar(45) NOT NULL,
  PRIMARY KEY (MeterID)
);

CREATE TABLE Connections_temp (
  ConnectionID int NOT NULL AUTO_INCREMENT,
  Type varchar(45) NOT NULL,
  MeterID int NOT NULL,
  ConsumerID int NOT NULL,
  WarningCount int NOT NULL DEFAULT '0',
  BalancePayment decimal(65,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (ConnectionID)
);

CREATE TABLE Readings_temp (
  ReadingID int NOT NULL AUTO_INCREMENT,
  MeterID int NOT NULL,
  ReadingValue int NOT NULL,
  ReadingDate datetime NOT NULL,
  PRIMARY KEY (ReadingID)
);

CREATE TABLE Bills_temp (
  BillID int NOT NULL AUTO_INCREMENT,
  ConnectionID int NOT NULL,
  UnitsConsumed int NOT NULL DEFAULT '0',
  PerUnitRate decimal(65,2) NOT NULL DEFAULT '0.00',
  TotalAmount decimal(65,2) NOT NULL DEFAULT '0.00',
  DueDate datetime NOT NULL,
  Status varchar(45) NOT NULL,
  PRIMARY KEY (BillID)
);

CREATE TABLE Payments_temp (
  PaymentID int NOT NULL AUTO_INCREMENT,
  BillID int NOT NULL,
  Amount decimal(65,2) NOT NULL DEFAULT '0.00',
  Status varchar(45) NOT NULL,
  PaymentDate datetime NOT NULL,
  PRIMARY KEY (PaymentID)
);

CREATE TABLE Warnings_temp (
  WarningID int NOT NULL AUTO_INCREMENT,
  ConnectionID int NOT NULL,
  DateIssued datetime NOT NULL,
  NextActionOn datetime NOT NULL,
  PRIMARY KEY (WarningID)
);

CREATE TABLE Complaints_temp (
  ComplaintID int NOT NULL AUTO_INCREMENT,
  ComplaintType varchar(45) NOT NULL,
  ComplaintDate datetime NOT NULL,
  Severity int NOT NULL DEFAULT '1',
  ConsumerID int NOT NULL,
  ConnectionID int NOT NULL,
  PRIMARY KEY (ComplaintID)
);

CREATE TABLE ConnectionRequests_temp (
  RequestID int NOT NULL AUTO_INCREMENT,
  ConsumerID int NOT NULL,
  RequestDate datetime NOT NULL,
  Status varchar(45) NOT NULL,
  PRIMARY KEY (RequestID)
);

CREATE TABLE LoginDetails_temp (
  ConsumerID int NOT NULL,
  username varchar(100) NOT NULL,
  password varchar(50) NOT NULL,
  PRIMARY KEY (ConsumerID),
  UNIQUE KEY username_UNIQUE (username)
);

-- Step 2: Copy data to temporary tables (maintain existing IDs)
INSERT INTO Consumers_temp (ConsumerID, FName, LName, ContactNo, Address1, Address2)
SELECT ConsumerID, FName, LName, ContactNo, Address1, Address2 FROM Consumers;

INSERT INTO Meters_temp (MeterID, Location, InstallationDate, Status)
SELECT MeterID, Location, InstallationDate, Status FROM Meters;

INSERT INTO Connections_temp (ConnectionID, Type, MeterID, ConsumerID, WarningCount, BalancePayment)
SELECT ConnectionID, Type, MeterID, ConsumerID, WarningCount, BalancePayment FROM Connections;

INSERT INTO Readings_temp (ReadingID, MeterID, ReadingValue, ReadingDate)
SELECT ReadingID, MeterID, ReadingValue, ReadingDate FROM Readings;

INSERT INTO LoginDetails_temp (ConsumerID, username, password)
SELECT ConsumerID, username, password FROM LoginDetails;

-- Step 3: Create new Admin and MeterReaders tables
CREATE TABLE Admins (
  AdminID int NOT NULL AUTO_INCREMENT,
  AdminName varchar(100) NOT NULL,
  username varchar(100) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  Email varchar(150),
  Role varchar(50) DEFAULT 'Admin',
  CreatedDate datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (AdminID)
);

CREATE TABLE MeterReaders (
  MeterReaderID int NOT NULL AUTO_INCREMENT,
  MeterReaderName varchar(100) NOT NULL,
  username varchar(100) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  EmployeeID varchar(50) UNIQUE,
  AssignedZone varchar(100),
  ContactNo varchar(15),
  IsActive boolean DEFAULT TRUE,
  HireDate datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (MeterReaderID)
);

-- Step 4: Drop original tables and rename temporary ones
DROP TABLE Consumers, Meters, Connections, Readings, Bills, Payments, Warnings, Complaints, ConnectionRequests, LoginDetails;

RENAME TABLE 
  Consumers_temp TO Consumers,
  Meters_temp TO Meters, 
  Connections_temp TO Connections,
  Readings_temp TO Readings,
  Bills_temp TO Bills,
  Payments_temp TO Payments,
  Warnings_temp TO Warnings,
  Complaints_temp TO Complaints,
  ConnectionRequests_temp TO ConnectionRequests,
  LoginDetails_temp TO LoginDetails;

-- Step 5: Recreate foreign key constraints
ALTER TABLE Connections
  ADD CONSTRAINT fk_Connections_Consumer
  FOREIGN KEY (ConsumerID) REFERENCES Consumers (ConsumerID)
  ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT fk_Connections_Meter
  FOREIGN KEY (MeterID) REFERENCES Meters (MeterID)
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Readings
  ADD CONSTRAINT fk_Readings_Meter
  FOREIGN KEY (MeterID) REFERENCES Meters (MeterID)
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Bills
  ADD CONSTRAINT fk_Bills_Connection
  FOREIGN KEY (ConnectionID) REFERENCES Connections (ConnectionID)
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Payments
  ADD CONSTRAINT fk_Payments_Bill
  FOREIGN KEY (BillID) REFERENCES Bills (BillID)
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Warnings
  ADD CONSTRAINT fk_Warnings_Connection
  FOREIGN KEY (ConnectionID) REFERENCES Connections (ConnectionID)
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE ConnectionRequests
  ADD CONSTRAINT fk_ConnectionRequests_Consumer
  FOREIGN KEY (ConsumerID) REFERENCES Consumers (ConsumerID)
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Complaints
  ADD CONSTRAINT fk_Complaints_Consumer
  FOREIGN KEY (ConsumerID) REFERENCES Consumers (ConsumerID)
  ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT fk_Complaints_Connection
  FOREIGN KEY (ConnectionID) REFERENCES Connections (ConnectionID)
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE LoginDetails
  ADD CONSTRAINT fk_LoginDetails_Consumer
  FOREIGN KEY (ConsumerID) REFERENCES Consumers (ConsumerID)
  ON DELETE CASCADE ON UPDATE CASCADE;

-- Step 6: Insert sample admin and meter reader data
INSERT INTO Admins (AdminName, username, password, Email, Role) VALUES
('System Administrator', 'admin', 'admin123', 'admin@energie.com', 'SuperAdmin'),
('Billing Manager', 'billing.admin', 'billing123', 'billing@energie.com', 'BillingAdmin');

INSERT INTO MeterReaders (MeterReaderName, username, password, EmployeeID, AssignedZone, ContactNo) VALUES
('Ali Raza', 'ali.raza', 'meter123', 'MR001', 'Gulshan-e-Iqbal', '0300-1234567'),
('Sara Khan', 'sara.khan', 'meter123', 'MR002', 'North Nazimabad', '0300-7654321');

-- Step 7: Set auto-increment starting points to avoid conflicts
ALTER TABLE Consumers AUTO_INCREMENT = 100006;
ALTER TABLE Meters AUTO_INCREMENT = 4008;
ALTER TABLE Connections AUTO_INCREMENT = 50008;
ALTER TABLE Readings AUTO_INCREMENT = 8008;
ALTER TABLE Bills AUTO_INCREMENT = 1;
ALTER TABLE Payments AUTO_INCREMENT = 1;
ALTER TABLE Warnings AUTO_INCREMENT = 1;
ALTER TABLE Complaints AUTO_INCREMENT = 1;
ALTER TABLE ConnectionRequests AUTO_INCREMENT = 1;