from datetime import datetime

from agents.news_agent import (
    fetch_financial_news
)

from agents.analyst_agent import (
    analyze_news
)

from agents.insight_agent import (
    generate_insight
)

from services.db import (
    save_report
)

from services.stock_service import (
    get_stock_data,
    get_stock_history
)


def run_pipeline(company: str):

    company = (
        company
        .lower()
        .strip()
    )

    # -----------------------------------
    # 1. FETCH NEWS
    # -----------------------------------
    news_items = (
        fetch_financial_news(
            company
        )
    )

    # -----------------------------------
    # 2. STOCK DATA
    # -----------------------------------
    stock_data = (
        get_stock_data(
            company
        )
    )

    # -----------------------------------
    # 3. STOCK CHART DATA
    # -----------------------------------
    stock_chart = (
        get_stock_history(
            company,
            period="1mo"
        )
    )

    print(
        "Stock chart:",
        stock_chart[:3]
    )

    # -----------------------------------
    # 4. ANALYZE NEWS
    # -----------------------------------
    analysis = (
        analyze_news(
            company,
            news_items
        )
    )

    # -----------------------------------
    # 5. GENERATE INSIGHT
    # -----------------------------------
    insight = (
        generate_insight(
            analysis
        )
    )

    # -----------------------------------
    # 6. FINAL RESPONSE
    # -----------------------------------
    result = {

        "company": company,

        "news": news_items,

        # sentiment
        "sentiment":
            analysis.get(
                "sentiment",
                "Neutral"
            ),

        "confidence_score":
            analysis.get(
                "confidence_score",
                0
            ),

        "recommendation":
            analysis.get(
                "recommendation",
                "HOLD"
            ),

        "reason":
            analysis.get(
                "reason",
                "No analysis available"
            ),

        # stock metrics
        "stock_data": {

            "ticker":
                stock_data.get(
                    "ticker",
                    "N/A"
                ),

            "current_price":
                stock_data.get(
                    "current_price"
                ),

            "market_cap":
                stock_data.get(
                    "market_cap"
                ),

            "daily_change":
                stock_data.get(
                    "daily_change"
                )
        },

        # stock chart
        "stock_chart":
            stock_chart,

        # risks/opportunities
        "key_points": {

            "risks":
                analysis.get(
                    "key_risks",
                    []
                ),

            "opportunities":
                analysis.get(
                    "key_opportunities",
                    []
                )
        },

        # insight
        "insight": {

            "signal":
                insight.get(
                    "signal",
                    "HOLD"
                ),

            "risk_level":
                insight.get(
                    "risk_level",
                    "MEDIUM"
                ),

            "summary":
                insight.get(
                    "summary",
                    "No insight available"
                ),

            "investment_thesis":
                insight.get(
                    "investment_thesis",
                    "No thesis available"
                )
        },

        "last_updated":
            datetime.now()
            .isoformat()
    }

    # -----------------------------------
    # 7. SAVE TO FIRESTORE
    # -----------------------------------
    save_report(
        company,
        result
    )

    return result