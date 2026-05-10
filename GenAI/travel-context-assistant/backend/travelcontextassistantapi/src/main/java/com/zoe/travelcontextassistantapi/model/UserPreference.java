package com.zoe.travelcontextassistantapi.model;

public class UserPreference {

    private String preferredDestinationType;
    private String temperatureUnit;
    private String homeCity;
    private String travelStyle;

    public UserPreference() {
    }

    public UserPreference(String preferredDestinationType, String temperatureUnit, String homeCity, String travelStyle) {
        this.preferredDestinationType = preferredDestinationType;
        this.temperatureUnit = temperatureUnit;
        this.homeCity = homeCity;
        this.travelStyle = travelStyle;
    }

    public String getPreferredDestinationType() {
        return preferredDestinationType;
    }

    public void setPreferredDestinationType(String preferredDestinationType) {
        this.preferredDestinationType = preferredDestinationType;
    }

    public String getTemperatureUnit() {
        return temperatureUnit;
    }

    public void setTemperatureUnit(String temperatureUnit) {
        this.temperatureUnit = temperatureUnit;
    }

    public String getHomeCity() {
        return homeCity;
    }

    public void setHomeCity(String homeCity) {
        this.homeCity = homeCity;
    }

    public String getTravelStyle() {
        return travelStyle;
    }

    public void setTravelStyle(String travelStyle) {
        this.travelStyle = travelStyle;
    }
}