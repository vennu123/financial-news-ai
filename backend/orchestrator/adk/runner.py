from orchestrator.adk.state import FinancialState
from orchestrator.adk.graph import financial_graph


def run_adk_pipeline(company: str):

    state = FinancialState(
        company=company
    )

    # graph execution
    state = financial_graph.run(state)

    return {
        "company": state.company,
        "news": state.news,
        "analysis": state.analysis,
        "insight": state.insight,
        "stock_data": state.stock_data,
        "stock_chart": state.stock_chart
    }