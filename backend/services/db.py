from google.cloud import firestore
from datetime import datetime
import os

db = firestore.Client(
    project=os.getenv("GCP_PROJECT_ID")
)


def save_report(company: str, data: dict):

    timestamp = datetime.now().strftime(
        "%Y%m%d_%H%M%S"
    )

    db.collection("financial_reports") \
        .document(company.lower()) \
        .collection("history") \
        .document(timestamp) \
        .set(data)

    return True