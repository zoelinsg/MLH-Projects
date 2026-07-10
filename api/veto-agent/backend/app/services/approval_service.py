import uuid

PENDING_ACTIONS = {}


def create_pending_action(user_id: str, repo_name: str, issue_number: int):
    action_id = str(uuid.uuid4())

    PENDING_ACTIONS[action_id] = {
        "user_id": user_id,
        "repo_name": repo_name,
        "issue_number": issue_number,
        "status": "pending",
    }

    return action_id


def get_action(action_id: str):
    return PENDING_ACTIONS.get(action_id)


def approve_action(action_id: str):
    action = PENDING_ACTIONS.get(action_id)
    if not action:
        return None

    action["status"] = "approved"
    return action


def deny_action(action_id: str):
    action = PENDING_ACTIONS.get(action_id)
    if not action:
        return None

    action["status"] = "denied"
    return action