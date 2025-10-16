CREATE DATABASE IF NOT EXISTS grade_tracker;
USE grade_tracker;

-- ensure user exists (in case container rebuilds)
CREATE USER IF NOT EXISTS 'appuser'@'%' IDENTIFIED BY 'apppass';

-- grant full privileges on this DB
GRANT ALL PRIVILEGES ON grade_tracker.* TO 'appuser'@'%';
FLUSH PRIVILEGES;


CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS grades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    subject VARCHAR(100),
    grade FLOAT CHECK (grade >= 0 AND grade <= 100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

INSERT INTO students (name, email, password_hash)
VALUES
    ('Alice Johnson', 'alice@example.com', '$2b$12$KIXg6hQ5bL6c2s8ajzq1oeQyGJZp2zv3nH9p9c0k2u9g/1Ywz8e6W
'),
    ('Bob Smith', 'bob@example.com', '$2b$12$KIXg6hQ5bL6c2s8ajzq1oeQyGJZp2zv3nH9p9c0k2u9g/1Ywz8e6W
'),
    ('Charlie Brown', 'charlie@example.com', '$2b$12$KIXg6hQ5bL6c2s8ajzq1oeQyGJZp2zv3nH9p9c0k2u9g/1Ywz8e6W
'),
    ('Diana Prince', 'diana@example.com', '$2b$12$KIXg6hQ5bL6c2s8ajzq1oeQyGJZp2zv3nH9p9c0k2u9g/1Ywz8e6W
'),
    ('Ethan Hunt', 'ethan@example.com', '$2b$12$KIXg6hQ5bL6c2s8ajzq1oeQyGJZp2zv3nH9p9c0k2u9g/1Ywz8e6W
'),
    ('Fiona Glenanne', 'fiona@example.com', '$2b$12$KIXg6hQ5bL6c2s8ajzq1oeQyGJZp2zv3nH9p9c0k2u9g/1Ywz8e6W
'),
    ('George Costanza', 'george@example.com', '$2b$12$KIXg6hQ5bL6c2s8ajzq1oeQyGJZp2zv3nH9p9c0k2u9g/1Ywz8e6W
'),
    ('Hannah Baker', 'hannah@example.com', '$2b$12$KIXg6hQ5bL6c2s8ajzq1oeQyGJZp2zv3nH9p9c0k2u9g/1Ywz8e6W
'),
    ('Ian Malcolm', 'ian@example.com', '$2b$12$KIXg6hQ5bL6c2s8ajzq1oeQyGJZp2zv3nH9p9c0k2u9g/1Ywz8e6W
')
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    password_hash = VALUES(password_hash);

INSERT INTO grades (student_id, subject, grade) VALUES
-- Alice Johnson
(1, 'Mathematics', 88.4),
(1, 'Science', 92.3),
(1, 'English', 85.7),
(1, 'History', 90.1),
(1, 'Art', 78.9),

-- Bob Smith
(2, 'Mathematics', 75.2),
(2, 'Science', 80.6),
(2, 'English', 72.4),
(2, 'History', 77.9),
(2, 'Computer Science', 83.5),

-- Charlie Brown
(3, 'Mathematics', 91.2),
(3, 'Science', 87.5),
(3, 'English', 84.0),
(3, 'History', 89.3),
(3, 'Geography', 88.1),
(3, 'Physical Education', 92.8),

-- Diana Prince
(4, 'Mathematics', 95.1),
(4, 'Science', 97.3),
(4, 'English', 93.5),
(4, 'History', 94.7),

-- Ethan Hunt
(5, 'Mathematics', 90.5),
(5, 'Science', 88.4),
(5, 'English', 91.6),
(5, 'History', 85.9),
(5, 'Computer Science', 94.2),

-- Fiona Glenanne
(6, 'Mathematics', 89.1),
(6, 'Science', 84.3),
(6, 'English', 86.8),
(6, 'History', 88.5),
(6, 'Art', 92.4),

-- George Costanza
(7, 'Mathematics', 81.2),
(7, 'Science', 79.4),
(7, 'English', 83.1),
(7, 'History', 80.8),
(7, 'Economics', 85.5),

-- Hannah Baker
(8, 'Mathematics', 87.6),
(8, 'Science', 89.2),
(8, 'English', 90.8),
(8, 'History', 91.3),
(8, 'Music', 88.9),

-- Ian Malcolm
(9, 'Mathematics', 74.3),
(9, 'Science', 79.6),
(9, 'English', 81.2),
(9, 'History', 77.5),
(9, 'Biology', 83.9);