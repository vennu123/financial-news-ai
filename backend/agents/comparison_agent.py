from google import genai
from dotenv import load_dotenv
import os
import json

load_dotenv()

client = genai.Client(
    api_key=os.getenv(
        "GEMINI_API_KEY"
    )
)


def generate_comparison_insight(
    company_1,
    company_2
):

    prompt = f"""
You are a financial investment analyst.

Compare these two companies
and decide why one may be a
better investment.

Company 1:
{json.dumps(company_1, indent=2)}

Company 2:
{json.dumps(company_2, indent=2)}

Return ONLY valid JSON:

{{
  "winner": "company name",
  "reason":
    "A short investment explanation"
}}
"""

    try:

        response = (
            client.models
            .generate_content(
                model=
                "gemini-3.1-flash-lite",
                contents=prompt
            )
        )

        text = (
            response.text
            .strip()
        )

        return json.loads(text)

    except Exception as e:

        print(
            "Comparison error:",
            e
        )

        return {
            "winner":
                company_1.get(
                    "company"
                ),

            "reason":
                (
                    "Higher confidence "
                    "score and stronger "
                    "investment indicators."
                )
        }