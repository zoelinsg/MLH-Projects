from fastapi import APIRouter, HTTPException
from app.models.schemas import CommandRequest, CommandResponse, ApprovalRequest
from app.services.github_service import list_repositories, list_issues, close_issue
from app.services.approval_service import (
    create_pending_action,
    get_action,
    approve_action,
    deny_action,
)

router = APIRouter()


@router.post("/command", response_model=CommandResponse)
def run_command(request: CommandRequest):
    command = request.command.lower().strip()

    if command == "list_repos":
        repos = list_repositories(request.user_id)
        return CommandResponse(
            status="completed",
            message="Repositories fetched successfully.",
            data=repos,
        )

    if command == "list_issues":
        if not request.repo_name:
            raise HTTPException(status_code=400, detail="repo_name is required.")
        issues = list_issues(request.user_id, request.repo_name)
        return CommandResponse(
            status="completed",
            message=f"Issues fetched from '{request.repo_name}'.",
            data=issues,
        )

    if command == "close_issue":
        if not request.repo_name or request.issue_number is None:
            raise HTTPException(
                status_code=400,
                detail="repo_name and issue_number are required.",
            )

        action_id = create_pending_action(
            user_id=request.user_id,
            repo_name=request.repo_name,
            issue_number=request.issue_number,
        )

        return CommandResponse(
            status="approval_required",
            message=(
                f"Closing issue #{request.issue_number} in '{request.repo_name}' "
                f"requires out-of-band approval."
            ),
            action_id=action_id,
        )

    raise HTTPException(status_code=400, detail="Unsupported command.")


@router.post("/approve", response_model=CommandResponse)
def approve(request: ApprovalRequest):
    action = approve_action(request.action_id)
    if not action:
        raise HTTPException(status_code=404, detail="Action not found.")

    result = close_issue(
        user_id=action["user_id"],
        repo_name=action["repo_name"],
        issue_number=action["issue_number"],
    )

    return CommandResponse(
        status="approved_and_executed",
        message=result,
        action_id=request.action_id,
    )


@router.post("/deny", response_model=CommandResponse)
def deny(request: ApprovalRequest):
    action = deny_action(request.action_id)
    if not action:
        raise HTTPException(status_code=404, detail="Action not found.")

    return CommandResponse(
        status="denied",
        message="The requested action was denied and was not executed.",
        action_id=request.action_id,
    )


@router.get("/pending/{action_id}", response_model=CommandResponse)
def get_pending_action(action_id: str):
    action = get_action(action_id)
    if not action:
        raise HTTPException(status_code=404, detail="Action not found.")

    return CommandResponse(
        status=action["status"],
        message=(
            f"Action for closing issue #{action['issue_number']} "
            f"in '{action['repo_name']}' is currently {action['status']}."
        ),
        action_id=action_id,
    )