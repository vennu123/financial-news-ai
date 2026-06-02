from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from datetime import datetime, timedelta
import math

from orchestrator.adk.runner import run_adk_pipeline

from services.db import db
from services.stock_service import get_stock_data
from agents.comparison_agent import generate_comparison_insight
from services.response_normalizer import normalize_pipeline_output
#from utils.ticker_mapper import find_ticker


app = FastAPI()


# -----------------------------------
# CLEAN NaN / Infinity
# -----------------------------------
def clean_nan(obj):
    """
    Recursively replace NaN and Infinity
    with None so FastAPI can serialize JSON.
    """

    if isinstance(obj, dict):
        return {
            key: clean_nan(value)
            for key, value in obj.items()
        }

    elif isinstance(obj, list):
        return [clean_nan(item) for item in obj]

    elif isinstance(obj, float):
        if math.isnan(obj) or math.isinf(obj):
            return None

    return obj


# -----------------------------------
# CORS
# -----------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------------
# HOME
# -----------------------------------
@app.get("/")
def home():
    return {"message": "Financial News AI API running"}


# -----------------------------------
# RUN PIPELINE (ADK)
# -----------------------------------
@app.get("/run/{company}")
def run(company: str):

    company = company.lower().strip()

    doc_ref = db.collection(
        "financial_reports"
    ).document(company)

    doc = doc_ref.get()

    # -------------------------------
    # CACHE CHECK
    # -------------------------------
    if doc.exists:

        cached_data = doc.to_dict()

        # Clean cached NaN values
        cached_data = clean_nan(cached_data)

        last_updated = cached_data.get(
            "last_updated"
        )

        if last_updated:

            last_updated = datetime.fromisoformat(
                last_updated
            )

            age = datetime.now() - last_updated

            if age < timedelta(hours=6):

                print(
                    f"Returning cached data for {company}"
                )

                return cached_data

    # -------------------------------
    # RUN ADK PIPELINE
    # -------------------------------
    print(
        f"Running ADK pipeline for {company}"
    )

    raw_data = run_adk_pipeline(company)

    data = normalize_pipeline_output(
        raw_data
    )

    # -------------------------------
    # STOCK DATA
    # -------------------------------
    data["stock_data"] = get_stock_data(
        company
    )

    # -------------------------------
    # TIMESTAMP
    # -------------------------------
    data["last_updated"] = (
        datetime.now().isoformat()
    )

    # -------------------------------
    # CLEAN NaN BEFORE SAVE
    # -------------------------------
    data = clean_nan(data)

    # -------------------------------
    # SAVE MAIN REPORT
    # -------------------------------
    doc_ref.set(data)

    # -------------------------------
    # SAVE HISTORY
    # -------------------------------
    doc_ref.collection(
        "history"
    ).document(
        datetime.now().strftime(
            "%Y%m%d_%H%M%S"
        )
    ).set(data)

    return data


# -----------------------------------
# DB FETCH
# -----------------------------------
@app.get("/db/{company}")
def get_from_db(company: str):

    company = company.lower().strip()

    doc = db.collection(
        "financial_reports"
    ).document(company).get()

    if doc.exists:

        data = doc.to_dict()

        return clean_nan(data)

    return {
        "message": "Company not found"
    }


# -----------------------------------
# HISTORY
# -----------------------------------
@app.get("/history")
def get_history():

    docs = db.collection(
        "financial_reports"
    ).stream()

    reports = [
        clean_nan(doc.to_dict())
        for doc in docs
    ]

    reports.sort(
        key=lambda x: x.get(
            "last_updated", ""
        ),
        reverse=True
    )

    return {
        "total_reports": len(reports),
        "reports": reports
    }


# -----------------------------------
# COMPANY HISTORY
# -----------------------------------
@app.get("/history/{company}")
def get_company_history(
    company: str
):

    company = company.lower().strip()

    docs = (
        db.collection(
            "financial_reports"
        )
        .document(company)
        .collection("history")
        .stream()
    )

    history = [
        {
            "id": doc.id,
            "data": clean_nan(
                doc.to_dict()
            )
        }
        for doc in docs
    ]

    history.sort(
        key=lambda x: x["id"],
        reverse=True
    )

    return history


# -----------------------------------
# COMPANY STATUS
# -----------------------------------

#@app.get(
#    "/company-status/{company}"
#)
#def company_status(
#    company: str
#):

#    ticker = find_ticker(company)
#
#    return {
#        "company": company,
#        "ticker": ticker,
#        "is_public":
#            ticker is not None
#    }


# -----------------------------------
# COMPARE COMPANIES
# -----------------------------------
@app.get(
    "/compare/{company1}/{company2}"
)
def compare_companies(
    company1: str,
    company2: str
):

    company_1_data = run(company1)
    company_2_data = run(company2)

    # Ensure stock data exists
    if not company_1_data.get(
        "stock_data"
    ):
        company_1_data[
            "stock_data"
        ] = get_stock_data(
            company1
        )

    if not company_2_data.get(
        "stock_data"
    ):
        company_2_data[
            "stock_data"
        ] = get_stock_data(
            company2
        )

    comparison_result = (
        generate_comparison_insight(
            company_1_data,
            company_2_data
        )
    )

    return clean_nan({
        "company_1":
            company_1_data,
        "company_2":
            company_2_data,
        "winner":
            comparison_result.get(
                "winner"
            ),
        "comparison_reason":
            comparison_result.get(
                "reason"
            )
    })
