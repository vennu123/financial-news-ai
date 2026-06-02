from orchestrator.adk.state import FinancialState

from agents.news_agent import fetch_financial_news
from agents.analyst_agent import analyze_news
from agents.insight_agent import generate_insight
from services.stock_service import get_stock_data, get_stock_history


def run_news(state: FinancialState):
    news = fetch_financial_news(state.company)
    state.news = news
    return state


def run_stock(state: FinancialState):
    state.stock_data = get_stock_data(state.company)
    state.stock_chart = get_stock_history(state.company, period="1mo")
    return state

def run_analyst(state):
    state.analysis = analyze_news(state.company, state.news)
    return state


def run_insight(state):
    state.insight = generate_insight(state.analysis)
    return state