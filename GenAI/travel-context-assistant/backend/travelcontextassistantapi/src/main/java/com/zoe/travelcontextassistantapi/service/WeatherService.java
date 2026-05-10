package com.zoe.travelcontextassistantapi.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class WeatherService {

    private final WebClient webClient = WebClient.builder().build();

    public WeatherInfo getWeatherByCity(String city) {
        Map<String, Object> geoResponse = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .scheme("https")
                        .host("geocoding-api.open-meteo.com")
                        .path("/v1/search")
                        .queryParam("name", city)
                        .queryParam("count", 1)
                        .build())
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        if (geoResponse == null || geoResponse.get("results") == null) {
            throw new RuntimeException("City not found");
        }

        List<Map<String, Object>> results = (List<Map<String, Object>>) geoResponse.get("results");
        if (results.isEmpty()) {
            throw new RuntimeException("City not found");
        }

        Map<String, Object> firstResult = results.get(0);
        double latitude = ((Number) firstResult.get("latitude")).doubleValue();
        double longitude = ((Number) firstResult.get("longitude")).doubleValue();
        String resolvedName = (String) firstResult.get("name");

        Map<String, Object> weatherResponse = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .scheme("https")
                        .host("api.open-meteo.com")
                        .path("/v1/forecast")
                        .queryParam("latitude", latitude)
                        .queryParam("longitude", longitude)
                        .queryParam("current", "temperature_2m,weather_code")
                        .queryParam("temperature_unit", "celsius")
                        .build())
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        if (weatherResponse == null || weatherResponse.get("current") == null) {
            throw new RuntimeException("Weather data not available");
        }

        Map<String, Object> current = (Map<String, Object>) weatherResponse.get("current");
        double temperature = ((Number) current.get("temperature_2m")).doubleValue();
        int weatherCode = ((Number) current.get("weather_code")).intValue();

        String weatherDescription = mapWeatherCode(weatherCode);
        String weatherSummary = String.format("%.1f°C, %s", temperature, weatherDescription);

        return new WeatherInfo(resolvedName, weatherSummary, temperature, weatherCode);
    }

    private String mapWeatherCode(int code) {
        return switch (code) {
            case 0 -> "clear sky";
            case 1, 2, 3 -> "partly cloudy";
            case 45, 48 -> "fog";
            case 51, 53, 55 -> "drizzle";
            case 61, 63, 65 -> "rain";
            case 71, 73, 75 -> "snow";
            case 80, 81, 82 -> "rain showers";
            case 95 -> "thunderstorm";
            default -> "variable conditions";
        };
    }

    public record WeatherInfo(String cityName, String weatherSummary, double temperature, int weatherCode) {
    }
}