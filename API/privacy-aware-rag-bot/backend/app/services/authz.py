def can_user_view_document(user_role: str, user_department: str, document: dict) -> bool:
    tags = document.get("tags", [])

    if "public" in tags:
        return True

    if "manager_only" in tags and user_role == "manager":
        return True

    return False