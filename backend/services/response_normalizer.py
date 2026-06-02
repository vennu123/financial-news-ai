def safe_number(value, default=0):
    try:
        if value is None:
            return default
        return float(value)
    except:
        return default


def normalize_pipeline_output(data: dict):

    analysis = data.get("analysis", {})
    insight = data.get("insight", {})
    stock = data.get("stock_data", {})

    return {
        "company": data.get("company", "N/A"),

        # -------------------------
        # ANALYSIS (FIXED SOURCE)
        # -------------------------
        "sentiment": analysis.get("sentiment", "Neutral"),

        "confidence_score": safe_number(
            analysis.get("confidence_score", 50)
        ),

        "recommendation": analysis.get("recommendation", "HOLD"),

        "reason": analysis.get("reason", "No analysis available"),

        # -------------------------
        # STOCK
        # -------------------------
        "stock_data": {
            "ticker": stock.get("ticker", "N/A"),
            "current_price": stock.get("current_price"),
            "market_cap": stock.get("market_cap"),
            "daily_change": stock.get("daily_change"),
        },

        # IMPORTANT FIX
        "stock_chart": data.get("stock_chart", []),

        # -------------------------
        # KEY POINTS
        # -------------------------
        "key_points": {
            "risks": analysis.get("key_risks", []),
            "opportunities": analysis.get("key_opportunities", [])
        },

        # -------------------------
        # INSIGHT
        # -------------------------
        "insight": {
            "signal": insight.get("signal", "HOLD"),
            "risk_level": insight.get("risk_level", "MEDIUM"),
            "summary": insight.get("summary", ""),
            "investment_thesis": insight.get("investment_thesis", "")
        },

        # -------------------------
        # NEWS
        # -------------------------
        "news": data.get("news", []),

        "last_updated": data.get("last_updated")
    }