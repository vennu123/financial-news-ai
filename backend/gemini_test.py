from google import genai

client = genai.Client(
    api_key="AIzaSyAe6ND5Q8xJ4WbawNyhlzoQBG-cTg4jxV8"
)

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Analyze Tesla stock sentiment in 2 lines."
)

print(response.text)