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

INSERT IGNORE INTO students (name, email, grade)
VALUES ('Alice Johnson', 'alice@example.com', 89.5),
       ('Bob Smith', 'bob@example.com', 76.0),
       ('Charlie Brown', 'charlie@example.com',91.2),
       ('Diana Prince', 'diana@example.com', 85.3),
       ('Ethan Hunt', 'ethan@example.com', 92.7),
       ('Fiona Glenanne', 'fiona@example.com', 92.7),
       ('George Costanza', 'george@example.com', 81.6),
       ('Hannah Baker', 'hannah@example.com', 88.9),
       ('Ian Malcolm', 'ian@example.com', 73.5);

-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user credentials
INSERT IGNORE INTO users (username, password, email)
VALUES ('admin', 'password123', 'admin@gradetracker.com'),
       ('teacher', 'teacher123', 'teacher@gradetracker.com'),
       ('demo', 'demo123', 'demo@gradetracker.com');