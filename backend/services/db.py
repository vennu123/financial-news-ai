from google.cloud import firestore
from datetime import datetime
import os

db = firestore.Client(
    project=os.getenv(
        "GCP_PROJECT_ID"
    )
)


def save_report(
    user_id: str,
    company: str,
    data: dict
):

    company = (
        company.lower()
        .strip()
    )

    data["last_updated"] = (
        datetime.now()
        .isoformat()
    )

    # Save main report
    db.collection(
        "financial_reports"
    ).document(
        company
    ).set(data)

    # Save ONLY ONE history
    # item per company
    db.collection(
        "users"
    ).document(
        user_id
    ).collection(
        "history"
    ).document(
        company
    ).set(data)

    return True