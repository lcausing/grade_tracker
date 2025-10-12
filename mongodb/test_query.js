use grade_analytics
show collections
db.analytics.find().pretty()

//sert a new record
db.analytics.insert({ student: "Charlie Brown", avg_grade: 92.0, performance: "Outstanding" })

// Verify the insertion
db.analytics.find().pretty()
