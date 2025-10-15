import mysql.connector
import os

def get_grades():
    connection = mysql.connector.connect(
        host=os.getenv('MYSQL_HOST', 'mysql-db'),
        user=os.getenv('MYSQL_USER', 'appuser'),
        password=os.getenv('MYSQL_PASSWORD', 'apppass'),
        database=os.getenv('MYSQL_DB', 'grade_tracker')
    )
    cursor = connection.cursor()
    cursor.execute("SELECT grade FROM students;")
    grades = [row[0] for row in cursor.fetchall()]
    cursor.close()
    connection.close()
    return grades
