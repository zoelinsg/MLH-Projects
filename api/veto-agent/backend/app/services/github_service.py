def list_repositories(user_id: str):
    return [
        "mlh-projects",
        "auth0-login-demo",
        "privacy-aware-rag-bot",
    ]


def list_issues(user_id: str, repo_name: str):
    return [
        f"{repo_name} - Issue #12: Fix login bug",
        f"{repo_name} - Issue #18: Update README",
        f"{repo_name} - Issue #24: Improve UI styling",
    ]


def close_issue(user_id: str, repo_name: str, issue_number: int):
    return f"Issue #{issue_number} in repo '{repo_name}' has been closed."