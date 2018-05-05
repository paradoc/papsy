-- Clean all tables before inserting data.
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE is226.patients;
TRUNCATE TABLE is226.doctors;
TRUNCATE TABLE is226.treatments;
SET FOREIGN_KEY_CHECKS = 1;

-- Insert data to treatments.
INSERT INTO is226.treatments(name, duration_mins)
VALUES
  ('Oral Prophylaxis', 45),
  ('Extraction', 60),
  ('Filling', 75),
  ('Root Canal', 90),
  ('Dentures', 60),
  ('Check-up', 30)
;

-- Insert sample data into doctors.
INSERT INTO is226.doctors(username, password)
VALUES
  ('admin', md5('pw123'))
;

-- Insert sample data into patients.
INSERT INTO is226.patients(first_name, last_name, mobile, email)
VALUES
  ('coprada', 'mark', '09178221507', 'mccoprada1@up.edu.ph')
;
