from google import genai
from dotenv import load_dotenv
import os
import json
import time
import re

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


# -----------------------------------
# SAFE JSON EXTRACTOR
# -----------------------------------
def extract_json(text: str):
    text = text.strip()

    # remove markdown
    text = text.replace("```json", "").replace("```", "")

    # try extracting JSON block
    match = re.search(r"\{.*\}", text, re.DOTALL)

    return match.group() if match else text


# -----------------------------------
# MAIN ANALYSIS FUNCTION
# -----------------------------------
def analyze_news(company, news):

    prompt = f"""
You are a senior financial analyst.

Return ONLY valid JSON.

DO NOT add explanation or markdown.

Rules:
- sentiment must be Positive, Neutral, or Negative
- confidence_score must be between 0-100
- reason must always be a string

Return format:

{{
  "sentiment": "Positive | Neutral | Negative",
  "confidence_score": 0-100,
  "reason": "short explanation",
  "key_risks": [],
  "key_opportunities": [],
  "recommendation": "BUY | HOLD | SELL"
}}

News:
{news}
"""

    for attempt in range(3):

        try:
            print("\n----------------------------")
            print(f"🔍 Attempt {attempt + 1}")
            print("----------------------------")

            response = client.models.generate_content(
                model="gemini-3.1-flash-lite",
                contents=prompt
            )

            raw_text = response.text.strip()

            # 🔥 DEBUG: RAW OUTPUT
            print("\n🧠 RAW GEMINI OUTPUT:")
            print(raw_text)

            cleaned = extract_json(raw_text)

            # 🔥 DEBUG: CLEANED OUTPUT
            print("\n🧹 CLEANED JSON STRING:")
            print(cleaned)

            parsed = json.loads(cleaned)

            # 🔥 DEBUG: PARSED OUTPUT
            print("\n✅ PARSED JSON:")
            print(json.dumps(parsed, indent=2))

            result = {
                "sentiment": parsed.get("sentiment", "Neutral"),
                "confidence_score": int(parsed.get("confidence_score", 50)),
                "reason": parsed.get("reason", "No reason available"),
                "key_risks": parsed.get("key_risks", []),
                "key_opportunities": parsed.get("key_opportunities", []),
                "recommendation": parsed.get("recommendation", "HOLD")
            }

            print("\n🎯 FINAL RETURN:")
            print(result)

            return result

        except Exception as e:
            print("\n❌ ERROR OCCURRED:")
            print(e)

            time.sleep(2)

    # -----------------------------------
    # FINAL FALLBACK (ONLY IF FAILS)
    # -----------------------------------
    print("\n🚨 USING FALLBACK RESPONSE")

    return {
        "sentiment": "Neutral",
        "confidence_score": 50,
        "reason": "Fallback due to repeated LLM parsing failure",
        "key_risks": [],
        "key_opportunities": [],
        "recommendation": "HOLD"
    }