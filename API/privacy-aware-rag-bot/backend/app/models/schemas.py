from pydantic import BaseModel


class ChatRequest(BaseModel):
    question: str
    user_id: str
    user_role: str
    user_department: str


class ChatResponse(BaseModel):
    answer: str
    retrieved_documents: list[str]
    authorized_documents: list[str]
    denied_documents: list[str]