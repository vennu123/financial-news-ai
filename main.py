from backend.agents.news_agent import fetch_financial_news
from backend.agents.analyst_agent import analyze_news


company = input("Enter company name: ")

news = fetch_financial_news(company)

print("\nLATEST NEWS:\n")

for item in news:
    print("-", item["title"])

report = analyze_news(company, news)

print("\nFINANCIAL REPORT:\n")
print(report)