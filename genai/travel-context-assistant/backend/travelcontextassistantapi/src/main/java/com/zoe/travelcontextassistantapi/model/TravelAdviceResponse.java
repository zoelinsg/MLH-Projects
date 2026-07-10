package com.zoe.travelcontextassistantapi.model;

public class TravelAdviceResponse {

    private String city;
    private String weatherSummary;
    private String message;

    public TravelAdviceResponse() {
    }

    public TravelAdviceResponse(String city, String weatherSummary, String message) {
        this.city = city;
        this.weatherSummary = weatherSummary;
        this.message = message;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getWeatherSummary() {
        return weatherSummary;
    }

    public void setWeatherSummary(String weatherSummary) {
        this.weatherSummary = weatherSummary;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}