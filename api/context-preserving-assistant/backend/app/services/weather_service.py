import requests

CITY_COORDS = {
    "Taipei": {"latitude": 25.0330, "longitude": 121.5654},
    "Tokyo": {"latitude": 35.6762, "longitude": 139.6503},
    "Seoul": {"latitude": 37.5665, "longitude": 126.9780},
}


def get_weather(city: str):
    coords = CITY_COORDS.get(city)

    if not coords:
        return {
            "city": city,
            "temperature": "N/A",
            "unit": "celsius",
            "description": "City not found in demo coordinate list.",
        }

    response = requests.get(
        "https://api.open-meteo.com/v1/forecast",
        params={
            "latitude": coords["latitude"],
            "longitude": coords["longitude"],
            "current": "temperature_2m",
        },
        timeout=10,
    )
    response.raise_for_status()

    data = response.json()
    current = data.get("current", {})

    return {
        "city": city,
        "temperature": current.get("temperature_2m"),
        "unit": "celsius",
        "description": "Current temperature retrieved from weather API.",
    }