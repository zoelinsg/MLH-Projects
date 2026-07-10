from fastapi import APIRouter
from app.models.schemas import ChatRequest, ChatResponse
from app.services.rag import retrieve_documents
from app.services.authz import can_user_view_document

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    retrieved_docs = retrieve_documents(request.question)

    authorized_docs = []
    denied_docs = []

    for doc in retrieved_docs:
        if can_user_view_document(
            user_role=request.user_role,
            user_department=request.user_department,
            document=doc,
        ):
            authorized_docs.append(doc)
        else:
            denied_docs.append(doc)

    if not authorized_docs:
        return ChatResponse(
            answer="I can only answer from documents you are authorized to access.",
            retrieved_documents=[doc["title"] for doc in retrieved_docs],
            authorized_documents=[],
            denied_documents=[doc["title"] for doc in denied_docs],
        )

    context = "\n\n".join(
        [f"{doc['title']}:\n{doc['content']}" for doc in authorized_docs]
    )

    answer = (
        f"Based on the authorized documents, here is a relevant answer:\n\n{context[:500]}"
    )

    return ChatResponse(
        answer=answer,
        retrieved_documents=[doc["title"] for doc in retrieved_docs],
        authorized_documents=[doc["title"] for doc in authorized_docs],
        denied_documents=[doc["title"] for doc in denied_docs],
    )