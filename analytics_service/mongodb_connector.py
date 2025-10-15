from pymongo import MongoClient
import os

def store_analytics(stats):
    client = MongoClient(os.getenv('MONGO_URI', 'mongodb://mongo-db:27017/'))
    db = client['grade_tracker']
    collection = db['analytics']
    collection.insert_one(stats)
