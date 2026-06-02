from google import genai
import os
import json

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def generate_insight(analysis):

    prompt = f"""
You are an investment strategist.

Return ONLY JSON:

{{
  "signal": "BUY | HOLD | SELL",
  "risk_level": "LOW | MEDIUM | HIGH",
  "summary": "...",
  "investment_thesis": "..."
}}

Analysis:
{analysis}
"""

    response = client.models.generate_content(
        model="gemini-3.1-flash-lite",
        contents=prompt
    )

    return json.loads(response.text)