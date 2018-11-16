import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { API_KEY } from '../utils/WeatherAPIKey';

import Weather from './Weather';

export default class Home extends React.Component {
  state = {
    bgColor: '',
    isLoading: false,
    iconWeather: '',
    locality: 0,
    temperature: 0,
    weatherCondition: null,
    error: null
  };

  componentDidMount() {
    // eslint-disable-next-line no-undef
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: `Error Gettig Weather Condtions ${error}`
        });
      }
    );
  }

  setWeatherIcon(weather) {
    switch (weather) {
      case 'Clouds':
        this.setState.iconWeather = 'weather-cloudy';
        break;
      case 'Clear':
        this.setState.iconWeather = 'weather-sunny';
        break;
      case 'Rain':
        this.setState.iconWeather = 'weather-rainy';
        break;
      case 'Snow':
        this.setState.iconWeather = 'weather-snowy';
        break;
      case 'Sand':
        this.setState.iconWeather = 'weather-windy';
        break;
      case 'Mist':
        this.setState.iconWeather = 'weather-windy';
        break;
      case 'Dust':
        this.setState.iconWeather = 'weather-windy';
        break;
      case 'Extreme':
        this.setState.iconWeather = 'weather-sunny';
        break;
      case 'Haze':
        this.setState.iconWeather = 'weather-windy-variant';
        break;
      case 'Smoke':
        this.setState.iconWeather = 'weather-windy';
        break;
      case 'Fog':
        this.setState.iconWeather = 'weather-fog';
        break;
      case 'Thunderstorm':
        this.setState.iconWeather = 'weather-lightning-rainy';
        break;
      case 'Drizzle':
        this.setState.iconWeather = 'weather-hail';
        break;
      default:
        this.setState.iconWeather = 'weather-sunny';
        break;
    }
  }

  setWeatherBgColor(weather) {
    switch (weather) {
      case 'Clouds':
        this.setState.bgColor = '#dfe6e9';
        break;
      case 'Clear':
        this.setState.bgColor = '#fdcb6e';
        break;
      case 'Rain':
        this.setState.bgColor = '#b2bec3';
        break;
      case 'Snow':
        this.setState.bgColor = '#dfe6e9';
        break;
      case 'Sand':
        this.setState.bgColor = '#ffeaa7';
        break;
      case 'Mist':
        this.setState.bgColor = '#81ecec';
        break;
      case 'Dust':
        this.setState.bgColor = '#74b9ff';
        break;
      case 'Extreme':
        this.setState.bgColor = '#d63031';
        break;
      case 'Haze':
        this.setState.bgColor = '#55efc4';
        break;
      case 'Smoke':
        this.setState.bgColor = '#636e72';
        break;
      case 'Fog':
        this.setState.bgColor = '#0984e3';
        break;
      case 'Thunderstorm':
        this.setState.bgColor = '#2d3436';
        break;
      case 'Drizzle':
        this.setState.bgColor = '#fab1a0';
        break;
      default:
        this.setState.bgColor = '#ff7675';
        break;
    }
  }

  fetchWeather(lat = 25, lon = 25) {
    // eslint-disable-next-line no-undef
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        this.setWeatherIcon(json.weather[0].main);

        this.setWeatherBgColor(json.weather[0].main);

        this.setState({
          temperature: json.main.temp,
          description: json.weather[0].description,
          weatherCondition: json.weather[0].main,
          locality: json.name,
          isLoading: false,
          icon: this.setState.iconWeather,
          bgColor: this.setState.bgColor
        });
      });
  }

  render() {
    const {
      isLoading,
      weatherCondition,
      temperature,
      locality,
      description,
      icon,
      bgColor
    } = this.state;
    return (
      <View style={styles.container}>
        {isLoading 
          ? <Text>Fetching The Weather</Text> 
          : <Weather 
              weather={weatherCondition} 
              temperature={temperature} 
              locality={locality} 
              description={description}
              icon={icon}
              bgColor={bgColor}
          />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
