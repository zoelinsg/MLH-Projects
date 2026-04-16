from pydantic import BaseModel
from typing import Optional, List


class CommandRequest(BaseModel):
    user_id: str
    command: str
    repo_name: Optional[str] = None
    issue_number: Optional[int] = None


class CommandResponse(BaseModel):
    status: str
    message: str
    action_id: Optional[str] = None
    data: Optional[List[str]] = None


class ApprovalRequest(BaseModel):
    action_id: str