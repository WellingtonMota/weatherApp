import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Weather = ({ weather, temperature, locality, description, icon, bgColor }) => (
  <View style={{ flex: 1, backgroundColor: bgColor }}>
    <View style={styles.headerContainer}>
      <Icon size={80} name={icon} color={'#fff'} />
      <Text style={styles.tempText}>{temperature}˚</Text>
    </View>
    <View style={styles.bodyContainer}>
      <Text style={styles.title}>{weather}</Text>
      <Text style={styles.subtitle}>{description}</Text>
      <Text style={styles.locality}>{locality}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    backgroundColor: '#f7b733'
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  tempText: {
    fontSize: 48,
    color: '#fff'
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40
  },
  title: {
    fontSize: 48,
    color: '#fff'
  },
  subtitle: {
    fontSize: 24,
    color: '#fff'
  },
  locality: {
    fontSize: 36,
    color: '#fff'
  }
});

export default Weather;
