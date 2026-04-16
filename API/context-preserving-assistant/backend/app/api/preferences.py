from fastapi import APIRouter, Depends, HTTPException
from app.core.auth import get_current_user
from app.services.preferences_service import get_preferences_by_sub

router = APIRouter(prefix="/api/preferences", tags=["preferences"])


@router.get("/me")
def get_my_preferences(current_user: dict = Depends(get_current_user)):
    sub = current_user.get("sub")

    if not sub:
        raise HTTPException(status_code=400, detail="User sub not found in token.")

    preferences = get_preferences_by_sub(sub)

    return {
        "user": {
            "sub": sub,
            "email": current_user.get("email"),
            "name": current_user.get("name"),
        },
        "preferences": preferences,
    }