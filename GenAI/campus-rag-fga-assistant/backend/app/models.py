from typing import List
from pydantic import BaseModel


class SearchResult(BaseModel):
    id: str
    title: str
    content: str


class SearchResponse(BaseModel):
    role: str
    query: str
    total_results: int
    results: List[SearchResult]