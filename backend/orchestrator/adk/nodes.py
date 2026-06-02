from orchestrator.adk.state import FinancialState

from agents.news_agent import (
    fetch_financial_news
)

from agents.analyst_agent import (
    analyze_news
)

from agents.insight_agent import (
    generate_insight
)

from services.stock_service import (
    get_stock_data,
    get_stock_history
)


# -----------------------------------
# NEWS NODE
# -----------------------------------
def news_node(
    state: FinancialState
):

    print(
        "📰 Running News Node"
    )

    state.news = (
        fetch_financial_news(
            state.company
        )
    )

    return state


# -----------------------------------
# STOCK NODE
# -----------------------------------
def stock_node(
    state: FinancialState
):

    print(
        "📈 Running Stock Node"
    )

    state.stock_data = (
        get_stock_data(
            state.company
        )
    )

    state.stock_chart = (
        get_stock_history(
            state.company,
            period="1mo"
        )
    )

    return state


# -----------------------------------
# ANALYST NODE
# -----------------------------------
def analyst_node(
    state: FinancialState
):

    print(
        "🧠 Running Analyst Node"
    )

    state.analysis = (
        analyze_news(
            state.company,
            state.news
        )
    )

    return state


# -----------------------------------
# INSIGHT NODE
# -----------------------------------
def insight_node(
    state: FinancialState
):

    print(
        "💡 Running Insight Node"
    )

    state.insight = (
        generate_insight(
            state.analysis
        )
    )

    return state