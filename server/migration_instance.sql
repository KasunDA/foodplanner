ALTER TABLE users ADD `instance` int NOT NULL;
UPDATE users SET instance = 1;
ALTER TABLE notificationList ADD `instance` int NOT NULL;
UPDATE notificationList SET instance = 1;
ALTER TABLE meals ADD `instance` int NOT NULL;
UPDATE meals SET instance = 1;
ALTER TABLE signups ADD `instance` int NOT NULL;
UPDATE signups SET instance = 1;
ALTER TABLE datefinder ADD `instance` int NOT NULL;
UPDATE datefinder SET instance = 1;