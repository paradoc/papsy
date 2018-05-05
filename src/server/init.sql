-- Create the database.
DROP DATABASE IF EXISTS is226;
CREATE DATABASE IF NOT EXISTS is226;

SET FOREIGN_KEY_CHECKS = 0;

-- Create the `doctors` table.
DROP TABLE IF EXISTS is226.doctors;
CREATE TABLE is226.doctors(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(16) NOT NULL,
  password CHAR(32) NOT NULL
);

-- Create the `patients` table.
DROP TABLE IF EXISTS is226.patients;
CREATE TABLE is226.patients(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  last_name VARCHAR(64) NOT NULL,
  first_name VARCHAR(128) NOT NULL,
  middle_name VARCHAR(64),
  mobile VARCHAR(11) NOT NULL,
  email TEXT
);

-- Create the `treatments` table.
DROP TABLE IF EXISTS is226.treatments;
CREATE TABLE is226.treatments(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  duration_mins INT UNSIGNED NOT NULL
);

-- Create the `appointments` table.
DROP TABLE IF EXISTS is226.appointments;
CREATE TABLE is226.appointments(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  secret CHAR(40) NOT NULL UNIQUE,
  patient_id INT NOT NULL,
  doctor_id INT NOT NULL,
  treatment_id INT NOT NULL,
  status VARCHAR(16) NOT NULL DEFAULT 'requested',
  schedule_from DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  -- schedule_to should be calculated

  INDEX (doctor_id, patient_id, treatment_id),
  FOREIGN KEY (doctor_id)
    REFERENCES is226.doctors(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY (patient_id)
    REFERENCES is226.patients(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY (treatment_id)
    REFERENCES is226.treatments(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

SET FOREIGN_KEY_CHECKS = 1;
