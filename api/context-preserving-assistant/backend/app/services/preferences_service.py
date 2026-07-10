USER_PREFERENCES = {
    "google-oauth2|114271617594786902931": {
        "preferred_city": "Taipei",
        "temperature_unit": "celsius",
    },
    "auth0|demo-user": {
        "preferred_city": "Tokyo",
        "temperature_unit": "celsius",
    },
}


def get_preferences_by_sub(sub: str):
    return USER_PREFERENCES.get(
        sub,
        {
            "preferred_city": "Taipei",
            "temperature_unit": "celsius",
        },
    )