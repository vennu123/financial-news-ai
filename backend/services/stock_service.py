import yfinance as yf


# -----------------------------------
# COMPANY → TICKER MAP
# -----------------------------------
KNOWN_TICKERS = {
    "google": "GOOGL",
    "alphabet": "GOOGL",
    "microsoft": "MSFT",
    "tesla": "TSLA",
    "amazon": "AMZN",
    "apple": "AAPL",
    "nvidia": "NVDA",
    "meta": "META",
    "facebook": "META",
    "optum": "UNH",
    "akamai": "AKAM",
    "ibm": "IBM",

    # Indian Stocks
    "tcs": "TCS.NS",
    "infosys": "INFY.NS",
    "reliance": "RELIANCE.NS",
    "wipro": "WIPRO.NS",
    "hdfc": "HDFCBANK.NS",
    "icici": "ICICIBANK.NS",
    "paytm": "PAYTM.NS",
    "zomato": "ZOMATO.NS"
}


# -----------------------------------
# FIND TICKER
# -----------------------------------
def find_ticker(company: str):

    company = (
        company
        .lower()
        .strip()
    )

    # -------------------------
    # 1. Known ticker aliases
    # -------------------------
    if company in KNOWN_TICKERS:

        ticker = (
            KNOWN_TICKERS[company]
        )

        print(
            f"Known ticker: {ticker}"
        )

        return ticker

    # -------------------------
    # 2. Auto search ticker
    # -------------------------
    try:

        print(
            f"Searching ticker "
            f"for {company}"
        )

        search = yf.Search(
            query=company,
            max_results=1
        )

        quotes = (
            search.quotes
        )

        if not quotes:

            print(
                f"No ticker found "
                f"for {company}"
            )

            return None

        ticker = (
            quotes[0]
            .get("symbol")
        )

        if not ticker:

            print(
                f"No symbol returned "
                f"for {company}"
            )

            return None

        print(
            f"Auto-found ticker: "
            f"{ticker}"
        )

        return ticker

    except Exception as e:

        print(
            f"Ticker search error: "
            f"{e}"
        )

        return None


# -----------------------------------
# PUBLIC / PRIVATE CHECK
# -----------------------------------
def is_public_company(
    company: str
):

    ticker = find_ticker(
        company
    )

    return (
        ticker is not None
    )


# -----------------------------------
# STOCK METRICS
# -----------------------------------
def get_stock_data(
    company: str
):

    ticker = (
        find_ticker(company)
    )

    # -------------------------
    # PRIVATE COMPANY
    # -------------------------
    if not ticker:

        print(
            f"{company} appears "
            f"to be private"
        )

        return {
            "ticker": "PRIVATE",
            "current_price": None,
            "daily_change": None,
            "market_cap": None,
            "is_public": False,
            "message":
                "This company is privately "
                "held or not listed publicly."
        }

    # -------------------------
    # FETCH PUBLIC STOCK
    # -------------------------
    try:

        stock = yf.Ticker(
            ticker
        )

        info = stock.info

        current_price = (
            info.get(
                "currentPrice"
            )
            or
            info.get(
                "regularMarketPrice"
            )
        )

        previous_close = (
            info.get(
                "previousClose"
            )
        )

        market_cap = (
            info.get(
                "marketCap"
            )
        )

        # -------------------------
        # DAILY CHANGE %
        # -------------------------
        daily_change = None

        if (
            current_price
            and previous_close
        ):

            daily_change = round(
                (
                    (
                        current_price
                        - previous_close
                    )
                    / previous_close
                ) * 100,
                2
            )

        # -------------------------
        # FORMAT MARKET CAP
        # -------------------------
        formatted_market_cap = None

        if market_cap:

            if (
                market_cap >=
                1_000_000_000_000
            ):

                formatted_market_cap = (
                    f"{market_cap / 1_000_000_000_000:.2f}T"
                )

            elif (
                market_cap >=
                1_000_000_000
            ):

                formatted_market_cap = (
                    f"{market_cap / 1_000_000_000:.2f}B"
                )

            else:

                formatted_market_cap = (
                    f"{market_cap:,}"
                )

        result = {

            "ticker":
                ticker,

            "current_price":
                current_price,

            "daily_change":
                daily_change,

            "market_cap":
                formatted_market_cap,

            "is_public":
                True
        }

        print(
            f"Stock data loaded "
            f"for {ticker}"
        )

        return result

    except Exception as e:

        print(
            f"Stock fetch failed: "
            f"{e}"
        )

        return {

            "ticker":
                ticker,

            "current_price":
                None,

            "daily_change":
                None,

            "market_cap":
                None,

            "is_public":
                True
        }


# -----------------------------------
# STOCK CHART HISTORY
# -----------------------------------
def get_stock_history(
    company: str,
    period="1mo"
):

    try:

        ticker = (
            find_ticker(
                company
            )
        )

        # -------------------------
        # PRIVATE COMPANY
        # -------------------------
        if not ticker:

            print(
                f"No chart available "
                f"for private company: "
                f"{company}"
            )

            return []

        stock = yf.Ticker(
            ticker
        )

        history = stock.history(
            period=period
        )

        if history.empty:

            print(
                f"No chart data "
                f"for {ticker}"
            )

            return []

        chart_data = []

        for index, row in (
            history.iterrows()
        ):

            chart_data.append({

                "date":
                    index.strftime(
                        "%Y-%m-%d"
                    ),

                "price":
                    round(
                        float(
                            row["Close"]
                        ),
                        2
                    )
            })

        print(
            f"Loaded "
            f"{len(chart_data)} "
            f"chart points for "
            f"{ticker}"
        )

        return chart_data

    except Exception as e:

        print(
            f"Chart fetch failed: "
            f"{e}"
        )

        return []