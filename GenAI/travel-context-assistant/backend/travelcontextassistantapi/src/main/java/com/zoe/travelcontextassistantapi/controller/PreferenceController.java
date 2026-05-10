package com.zoe.travelcontextassistantapi.controller;

import com.zoe.travelcontextassistantapi.model.TravelAdviceResponse;
import com.zoe.travelcontextassistantapi.model.UserPreference;
import com.zoe.travelcontextassistantapi.service.WeatherService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PreferenceController {

    private final WeatherService weatherService;

    public PreferenceController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/api/preferences")
    public UserPreference getPreferences() {
        return new UserPreference(
                "city",
                "celsius",
                "Taipei",
                "light travel"
        );
    }

    @GetMapping("/api/travel-advice")
    public TravelAdviceResponse getTravelAdvice(@RequestParam String city) {
        UserPreference preference = new UserPreference(
                "city",
                "celsius",
                "Taipei",
                "light travel"
        );

        WeatherService.WeatherInfo weatherInfo = weatherService.getWeatherByCity(city);

        String message = String.format(
                "You usually prefer %s trips and %s. %s is currently %s, which matches your %s preference.",
                preference.getPreferredDestinationType(),
                preference.getTemperatureUnit(),
                weatherInfo.cityName(),
                weatherInfo.weatherSummary(),
                preference.getTravelStyle()
        );

        return new TravelAdviceResponse(
                weatherInfo.cityName(),
                weatherInfo.weatherSummary(),
                message
        );
    }
}