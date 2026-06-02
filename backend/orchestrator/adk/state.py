from dataclasses import dataclass, field
from typing import Any, Dict, List


@dataclass
class FinancialState:
    company: str = ""
    news: list = field(default_factory=list)
    analysis: dict = field(default_factory=dict)
    insight: dict = field(default_factory=dict)

    stock_data: dict = field(default_factory=dict)
    stock_chart: list = field(default_factory=list)