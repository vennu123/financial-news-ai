import feedparser
import requests


def get_original_link(google_news_link):
    """
    Resolve Google News redirect URL
    to actual news article URL
    """

    try:
        response = requests.get(
            google_news_link,
            allow_redirects=True,
            headers={
                "User-Agent":
                "Mozilla/5.0"
            },
            timeout=10
        )

        return response.url

    except Exception as e:
        print(
            "Failed to resolve URL:",
            str(e)
        )

        return google_news_link


def fetch_financial_news(company):

    url = (
        f"https://news.google.com/rss/search?"
        f"q={company}+stock&hl=en-IN&gl=IN&ceid=IN:en"
    )

    print("Fetching news for:", company)

    feed = feedparser.parse(url)

    news_list = []

    if not feed.entries:
        print("No news found!")
        return []

    for entry in feed.entries[:5]:

        try:
            original_link = get_original_link(
                entry.link
            )

            news_list.append({
                "title": entry.title,
                "link": original_link
            })

        except Exception as e:
            print(
                "News parsing error:",
                str(e)
            )

    print("Fetched News:", news_list)

    return news_list