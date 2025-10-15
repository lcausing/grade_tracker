from flask import Flask, jsonify
from mysql_connector import get_grades
from mongodb_connector import store_analytics
from utils import compute_stats

app = Flask(__name__)

@app.route('/analytics', methods=['GET'])
def analytics():
    grades = get_grades()
    stats = compute_stats(grades)

    # Store in MongoDB but ignore the inserted_id in response
    store_analytics(stats)
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003)
