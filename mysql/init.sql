CREATE DATABASE IF NOT EXISTS grade_tracker;
USE grade_tracker;

-- ensure user exists (in case container rebuilds)
CREATE USER IF NOT EXISTS 'appuser'@'%' IDENTIFIED BY 'apppass';

-- grant full privileges on this DB
GRANT ALL PRIVILEGES ON grade_tracker.* TO 'appuser'@'%';
FLUSH PRIVILEGES;

-- now create table + seed data
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    grade FLOAT
);

INSERT INTO students (name, email, grade)
VALUES ('Alice Johnson', 'alice@example.com', 89.5),
       ('Bob Smith', 'bob@example.com', 76.0);