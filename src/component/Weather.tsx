import React, {useState} from 'react';
import {StyleSheet, Text, TextStyle, View} from 'react-native';
import {Root, WeatherDegree} from '../model/WeatherData';

type WeatherProps = {
  data: Root;
};

const Weather = ({data}: WeatherProps) => {
  console.log('weather rendered');
  const [type, setWeatherDegreeType] = useState<WeatherDegree>(
    WeatherDegree.FARENHEIT,
  );

  const {
    container,
    mainContainer,
    weatherContainer,
    weatherText,
    degreeText,
    feelsLikeHeader,
    feelsLikeData,
  } = styles;

  const toggleDayNight = (style: {}): TextStyle => {
    if (data.current.is_day === 0) {
      return {
        ...style,
        color: 'white',
      };
    }
    return {
      ...style,
      color: 'black',
    };
  };

  return (
    <View style={container}>
      <View style={mainContainer}>
        <Text
          style={toggleDayNight(feelsLikeHeader)}
          numberOfLines={
            1
          }>{`${data.location.name}, ${data.location.country}`}</Text>
        <View style={weatherContainer}>
          <Text
            style={toggleDayNight(weatherText)}
            onPress={() => {
              setWeatherDegreeType(
                type === WeatherDegree.CELCIUS
                  ? WeatherDegree.FARENHEIT
                  : WeatherDegree.CELCIUS,
              );
            }}>
            {type === WeatherDegree.CELCIUS
              ? data.current.temp_c.toFixed(0)
              : data.current.temp_f.toFixed(0)}
          </Text>
          <Text style={toggleDayNight(degreeText)}>{'\u00b0'}</Text>
        </View>
        <Text style={toggleDayNight(feelsLikeData)}>
          {data.current.condition.text}
        </Text>
        <Text style={toggleDayNight(feelsLikeHeader)}>
          Feels like{' '}
          <Text style={toggleDayNight(feelsLikeData)}>
            {type === WeatherDegree.CELCIUS
              ? data.current.feelslike_c
              : data.current.feelslike_f}
            {'\u00b0'}
          </Text>{' '}
        </Text>
      </View>
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherContainer: {flexDirection: 'row'},
  weatherText: {fontSize: 160, includeFontPadding: false},
  degreeText: {fontSize: 30, marginTop: 20},
  feelsLikeHeader: {marginTop: 10},
  feelsLikeData: {fontWeight: '600'},
});
