const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static('public'));

let db;

async function connectDB() {
  try {
    db = await mysql.createConnection({
      host: 'localhost',
      user: 'appuser',
      password: 'apppass',
      database: 'grade_tracker'
    });
    console.log('Database connected successfully');
    return true;
  } catch (error) {
    console.log('Database connection failed - using demo mode');
    db = null;
    return false;
  }
}

app.get('/health', (req, res) => {
  res.json({ status: 'OK', database: db ? 'Connected' : 'Demo Mode' });
});

let students = [
  { name: 'Alice Johnson', email: 'alice@example.com', grade: 89, subject: 'Mathematics' },
  { name: 'Bob Smith', email: 'bob@example.com', grade: 76, subject: 'English' }
];

app.get('/api/students', async (req, res) => {
  try {
    let data;
    if (db) {
      const [rows] = await db.execute('SELECT name, email, subject, grade FROM students ORDER BY name');
      data = rows;
    } else {
      data = students;
    }
    res.json({ success: true, data });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

app.post('/api/grades', async (req, res) => {
  try {
    const { subject, studentName, studentEmail, grade } = req.body;
    
    if (db) {
      await db.execute(
        'INSERT INTO students (name, email, subject, grade) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE grade = VALUES(grade), subject = VALUES(subject)',
        [studentName, studentEmail, subject, grade]
      );
    } else {
      const existing = students.find(s => s.email === studentEmail);
      if (existing) {
        existing.grade = grade;
        existing.subject = subject;
      } else {
        students.push({ name: studentName, email: studentEmail, grade, subject });
      }
    }
    
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

app.listen(PORT, async () => {
  console.log('Server running on port', PORT);
  await connectDB();
});
