import statistics
from datetime import datetime

def compute_stats(grades):
    if not grades:
        return {"error": "No grades found"}
    return {
        "mean": statistics.mean(grades),
        "median": statistics.median(grades),
        "mode": statistics.mode(grades)
    }
