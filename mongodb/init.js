// Switch to or create a database called 'grade_analytics'
db = db.getSiblingDB('grade_analytics');

// Create the analytics collection if it doesn't exist
db.createCollection('analytics');

// Insert initial sample data
db.analytics.insertMany([
  { student: "Alice Johnson", avg_grade: 89.5, performance: "Excellent" },
  { student: "Bob Smith", avg_grade: 76.0, performance: "Good" }
]);