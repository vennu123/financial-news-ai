from pydantic import BaseModel
from typing import List, Dict, Optional


class KeyPoints(BaseModel):
    risks: List[str]
    opportunities: List[str]


class Insight(BaseModel):
    signal: str
    risk_level: str
    summary: str
    investment_thesis: str


class Report(BaseModel):
    company: str
    news: List[str]

    sentiment: str
    confidence_score: int
    recommendation: str

    key_points: KeyPoints
    insight: Insight

    last_updated: str