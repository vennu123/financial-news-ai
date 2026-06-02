from fastapi import FastAPI
from fastapi.middleware.cors import (
    CORSMiddleware
)

from datetime import (
    datetime,
    timedelta
)

import math

from orchestrator.adk.runner import (
    run_adk_pipeline
)

from services.db import (
    db,
    save_report
)

from services.stock_service import (
    get_stock_data
)

from agents.comparison_agent import (
    generate_comparison_insight
)

from services.response_normalizer import (
    normalize_pipeline_output
)


app = FastAPI()


# -----------------------------------
# CLEAN NaN / Infinity
# -----------------------------------
def clean_nan(obj):

    if isinstance(obj, dict):
        return {
            key: clean_nan(value)
            for key, value in obj.items()
        }

    elif isinstance(obj, list):
        return [
            clean_nan(item)
            for item in obj
        ]

    elif isinstance(obj, float):

        if (
            math.isnan(obj)
            or math.isinf(obj)
        ):
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

    return {
        "message":
        "Financial News AI API running"
    }


# -----------------------------------
# RUN PIPELINE
# -----------------------------------
@app.get("/run/{company}")
def run(
    company: str,
    user_id: str = None
):

    company = (
        company.lower()
        .strip()
    )

    doc_ref = db.collection(
        "financial_reports"
    ).document(company)

    doc = doc_ref.get()

    # -------------------------------
    # CACHE CHECK (3 HOURS)
    # -------------------------------
    if doc.exists:

        cached_data = (
            doc.to_dict()
        )

        cached_data = clean_nan(
            cached_data
        )

        last_updated = (
            cached_data.get(
                "last_updated"
            )
        )

        if last_updated:

            last_updated = (
                datetime.fromisoformat(
                    last_updated
                )
            )

            age = (
                datetime.now()
                - last_updated
            )

            # CACHE LIMIT
            if age < timedelta(
                hours=3
            ):

                print(
                    f"Returning cached data for {company}"
                )

                # Save to user history
                if user_id:

                    save_report(
                        user_id=user_id,
                        company=company,
                        data=cached_data
                    )

                return cached_data

    # -------------------------------
    # RUN PIPELINE
    # -------------------------------
    print(
        f"Running ADK pipeline for {company}"
    )

    raw_data = (
        run_adk_pipeline(company)
    )

    data = (
        normalize_pipeline_output(
            raw_data
        )
    )

    # -------------------------------
    # STOCK DATA
    # -------------------------------
    data[
        "stock_data"
    ] = get_stock_data(
        company
    )

    # -------------------------------
    # TIMESTAMP
    # -------------------------------
    data[
        "last_updated"
    ] = (
        datetime.now()
        .isoformat()
    )

    # -------------------------------
    # CLEAN
    # -------------------------------
    data = clean_nan(data)

    # -------------------------------
    # SAVE CACHE
    # -------------------------------
    doc_ref.set(data)

    # -------------------------------
    # SAVE USER HISTORY
    # -------------------------------
    if user_id:

        save_report(
            user_id=user_id,
            company=company,
            data=data
        )

    return data


# -----------------------------------
# DB FETCH
# -----------------------------------
@app.get("/db/{company}")
def get_from_db(
    company: str
):

    company = (
        company.lower()
        .strip()
    )

    doc = db.collection(
        "financial_reports"
    ).document(
        company
    ).get()

    if doc.exists:

        data = (
            doc.to_dict()
        )

        return clean_nan(data)

    return {
        "message":
        "Company not found"
    }


# -----------------------------------
# USER HISTORY
# -----------------------------------
@app.get("/history")
def get_history(
    user_id: str
):

    docs = (
        db.collection("users")
        .document(user_id)
        .collection("history")
        .stream()
    )

    reports = []

    for doc in docs:

        report = (
            doc.to_dict()
        )

        report["doc_id"] = (
            doc.id
        )

        reports.append(
            clean_nan(report)
        )

    # NEWEST FIRST
    reports.sort(
        key=lambda x:
        x.get(
            "last_updated",
            ""
        ),
        reverse=True
    )

    return {
        "total_reports":
            len(reports),
        "reports":
            reports
    }


# -----------------------------------
# COMPANY HISTORY
# -----------------------------------
@app.get(
    "/history/{company}"
)
def get_company_history(
    company: str,
    user_id: str
):

    company = (
        company.lower()
        .strip()
    )

    doc = (
        db.collection("users")
        .document(user_id)
        .collection("history")
        .document(company)
        .get()
    )

    if doc.exists:

        return [{
            "id":
                doc.id,
            "data":
                clean_nan(
                    doc.to_dict()
                )
        }]

    return []


# -----------------------------------
# COMPARE
# -----------------------------------
@app.get(
    "/compare/{company1}/{company2}"
)
def compare_companies(
    company1: str,
    company2: str,
    user_id: str = None
):

    company_1_data = run(
        company1,
        user_id
    )

    company_2_data = run(
        company2,
        user_id
    )

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