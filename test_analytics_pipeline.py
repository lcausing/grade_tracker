import mysql.connector
import requests
from pymongo import MongoClient
from pprint import pprint
import time

# ---------- CONFIGURATION ----------
MYSQL_CONFIG = {
    "host": "localhost",          # host from your local system (Docker exposes it)
    "user": "appuser",
    "password": "apppass",
    "database": "grade_tracker",
    "port": 3306
}

MONGO_URI = "mongodb://localhost:27017/"
ANALYTICS_URL = "http://localhost:5003/analytics"

# ---------- STEP 1: VERIFY MYSQL ----------
def check_mysql():
    print("\n[STEP 1] Checking MySQL for student grades...")
    try:
        conn = mysql.connector.connect(**MYSQL_CONFIG)
        cursor = conn.cursor()
        cursor.execute("SELECT name, grade FROM students;")
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        if not rows:
            print("⚠️ No grades found in MySQL. Inserting sample data...")
            conn = mysql.connector.connect(**MYSQL_CONFIG)
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO students (name, email, grade) VALUES ('Test Student', 'test@example.com', 90.0);"
            )
            conn.commit()
            cursor.close()
            conn.close()
            print("✅ Sample data inserted.")
        else:
            print(f"✅ Found {len(rows)} student records.")
    except Exception as e:
        print("❌ MySQL connection failed:", e)
        exit(1)

# ---------- STEP 2: CALL ANALYTICS SERVICE ----------
def test_analytics_api():
    print("\n[STEP 2] Calling Analytics Service API...")
    try:
        response = requests.get(ANALYTICS_URL, timeout=10)
        if response.status_code == 200:
            print("✅ Analytics API responded successfully:")
            pprint(response.json())
        else:
            print(f"❌ API returned status {response.status_code}: {response.text}")
            exit(1)
    except Exception as e:
        print("❌ Analytics API test failed:", e)
        exit(1)

# ---------- STEP 3: VERIFY MONGODB ----------
def check_mongo():
    print("\n[STEP 3] Checking MongoDB for stored analytics...")
    try:
        client = MongoClient(MONGO_URI)
        db = client["grade_tracker"]
        analytics_collection = db["analytics"]
        docs = list(analytics_collection.find().sort("_id", -1).limit(3))
        if docs:
            print(f"✅ Found {len(docs)} analytics entries (latest 3 shown):")
            for doc in docs:
                pprint(doc)
        else:
            print("⚠️ No analytics records found in MongoDB.")
    except Exception as e:
        print("❌ MongoDB connection failed:", e)
        exit(1)

# ---------- MAIN ----------
if __name__ == "__main__":
    print("🔍 Running Analytics Service End-to-End Test")
    check_mysql()
    # Give MySQL & Analytics a few seconds to sync
    time.sleep(3)
    test_analytics_api()
    time.sleep(2)
    check_mongo()
    print("\n🎉 Test completed successfully!")
