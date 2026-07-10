from typing import Dict, List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="GitHub Veto Agent API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MOCK_ISSUES = [
    {"id": "issue-12", "title": "Fix login bug", "status": "open"},
    {"id": "issue-18", "title": "Update README", "status": "open"},
]

PENDING_REQUESTS: Dict[str, Dict] = {}


class ActionRequest(BaseModel):
    action: str
    target: str


class ApprovalRequest(BaseModel):
    request_id: str
    approved: bool


@app.get("/")
def read_root():
    return {"message": "GitHub Veto Agent API is running."}


@app.get("/issues")
def get_issues():
    return {"issues": MOCK_ISSUES}


@app.post("/request-action")
def request_action(payload: ActionRequest):
    request_id = f"req-{len(PENDING_REQUESTS) + 1:03d}"

    PENDING_REQUESTS[request_id] = {
        "action": payload.action,
        "target": payload.target,
        "status": "approval_required",
    }

    return {
        "status": "approval_required",
        "request_id": request_id,
        "message": f"{payload.action} on {payload.target} requires approval.",
    }


@app.post("/approve-action")
def approve_action(payload: ApprovalRequest):
    request = PENDING_REQUESTS.get(payload.request_id)

    if not request:
        return {
            "status": "not_found",
            "message": "Approval request not found.",
        }

    if payload.approved:
        request["status"] = "completed"
        return {
            "status": "completed",
            "message": f'{request["action"]} on {request["target"]} has been approved and completed.',
        }

    request["status"] = "rejected"
    return {
        "status": "rejected",
        "message": f'{request["action"]} on {request["target"]} was rejected.',
    }