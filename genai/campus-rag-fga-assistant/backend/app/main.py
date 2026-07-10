from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

from app.documents import DOCUMENTS
from app.models import SearchResponse, SearchResult

app = FastAPI(title="Campus RAG FGA Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

VALID_ROLES = {"student", "professor", "admin"}


@app.get("/")
def read_root():
    return {"message": "Campus RAG FGA Assistant API is running."}


@app.get("/search", response_model=SearchResponse)
def search_documents(
    q: str = Query(..., min_length=1, description="Search query"),
    role: str = Query(..., description="User role: student, professor, admin"),
):
    normalized_role = role.strip().lower()

    if normalized_role not in VALID_ROLES:
        return SearchResponse(
            role=normalized_role,
            query=q,
            total_results=0,
            results=[],
        )

    query_text = q.strip().lower()
    matched_results = []

    for doc in DOCUMENTS:
        if normalized_role not in doc["allowed_roles"]:
            continue

        searchable_text = f'{doc["title"]} {doc["content"]}'.lower()
        if query_text in searchable_text:
            matched_results.append(
                SearchResult(
                    id=doc["id"],
                    title=doc["title"],
                    content=doc["content"],
                )
            )

    return SearchResponse(
        role=normalized_role,
        query=q,
        total_results=len(matched_results),
        results=matched_results,
    )