import statistics
from datetime import datetime

def compute_stats(grades):
    if not grades:
        return {"error": "No grades found"}
    # Ensure grades are floats, not Decimals
    grades = [float(g) for g in grades]

    mean_val = round(statistics.mean(grades), 1)
    median_val = round(statistics.median(grades), 1)
    try:
        mode_val = round(statistics.mode(grades), 1)
    except statistics.StatisticsError:
        mode_val = None  # no unique mode
    return {
        "mean": mean_val,
        "median": median_val,
        "mode": mode_val
    }
