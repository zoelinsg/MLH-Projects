from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from app.core.auth import get_current_user
from app.services.preferences_service import get_preferences_by_sub
from app.services.weather_service import get_weather

router = APIRouter(prefix="/api/assistant", tags=["assistant"])


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
def chat_with_assistant(
    request: ChatRequest,
    current_user: dict = Depends(get_current_user),
):
    sub = current_user.get("sub")
    if not sub:
        raise HTTPException(status_code=400, detail="User sub not found in token.")

    preferences = get_preferences_by_sub(sub)
    city = preferences["preferred_city"]
    unit = preferences["temperature_unit"]

    weather = get_weather(city)
    temperature = weather["temperature"]

    answer = (
        f"I found your saved preference: {city}, {unit}. "
        f"The current weather in {city} is {temperature}°C."
    )

    return {
        "user": {
            "sub": sub,
            "email": current_user.get("email"),
            "name": current_user.get("name"),
        },
        "preferences": preferences,
        "weather": weather,
        "answer": answer,
    }