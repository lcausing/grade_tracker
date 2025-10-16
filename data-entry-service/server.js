const express = require('express');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static('public'));

// JWT Secret - should match the auth service
const JWT_SECRET = process.env.JWT_SECRET;

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

let db;

async function connectDB() {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'appuser',
      password: process.env.DB_PASSWORD || 'apppass',
      database: process.env.DB_NAME || 'grade_tracker'
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

// Proxy login requests to auth service
app.post('/api/login', async (req, res) => {
  try {
    const authUrl = process.env.AUTH_SERVICE_URL || 'http://auth-service:4000';
    const response = await axios.post(authUrl + '/login', req.body, {
      timeout: 5000
    });
    res.json(response.data);
  } catch (error) {
    console.error('Auth service error:', error.message);
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      res.status(503).json({ message: 'Authentication service is currently unavailable' });
    } else {
      res.status(500).json({ message: 'Auth service error: ' + error.message });
    }
  }
});

let students = [
  { name: 'Alice Johnson', email: 'alice.johnson@school.com', value: 89.5, type: 'Mathematics' },
  { name: 'Bob Smith', email: 'bob.smith@school.com', value: 76.0, type: 'English Literature' },
  { name: 'Charlie Brown', email: 'charlie.brown@school.com', value: 91.2, type: 'Biology' },
  { name: 'Diana Prince', email: 'diana.prince@school.com', value: 85.3, type: 'World History' },
  { name: 'Emma Wilson', email: 'emma.wilson@school.com', value: 94.7, type: 'Chemistry' },
  { name: 'Frank Davis', email: 'frank.davis@school.com', value: 78.9, type: 'Physics' }
];

app.get('/api/students', authenticateToken, async (req, res) => {
  try {
    let data;
    if (db) {
      const [rows] = await db.execute('SELECT name, email, grade as value, "General" as type FROM students ORDER BY name');
      data = rows;
    } else {
      data = students;
    }
    res.json({ success: true, data });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

app.post('/api/grades', authenticateToken, async (req, res) => {
  try {
    const { studentName, studentEmail, dataType, dataValue } = req.body;
    
    if (db) {
      await db.execute(
        'INSERT INTO students (name, email, grade) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE grade = VALUES(grade)',
        [studentName, studentEmail, parseFloat(dataValue)]
      );
    } else {
      const existing = students.find(s => s.email === studentEmail);
      if (existing) {
        existing.value = parseFloat(dataValue);
        existing.type = dataType;
      } else {
        students.push({ name: studentName, email: studentEmail, value: parseFloat(dataValue), type: dataType });
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
