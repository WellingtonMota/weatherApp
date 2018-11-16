import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { API_KEY } from '../utils/WeatherAPIKey';

import Weather from './Weather';

export default class Home extends React.Component {
  state = {
    isLoading: false,
    locality: '',
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

  fetchWeather(lat = 25, lon = 25) {
    // eslint-disable-next-line no-undef
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          temperature: json.main.temp,
          description: json.weather[0].description,
          weatherCondition: json.weather[0].main,
          locality: json.name,
          isLoading: false
        });
      });
  }

  render() {
    const { isLoading, weatherCondition, temperature, locality, description } = this.state;
    return (
      <View style={styles.container}>
        {isLoading 
          ? <Text>Fetching The Weather</Text> 
          : <Weather 
              weather={weatherCondition} 
              temperature={temperature} 
              locality={locality} 
              description={description}
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
