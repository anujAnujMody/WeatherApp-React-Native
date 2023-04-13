import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ErrorResponse} from '../model/WeatherData';

type Props = {
  data: ErrorResponse;
};

const ErrorView = ({data}: Props) => {
  const {container, oopsText, errorText} = styles;

  return (
    <View style={container}>
      <Text style={oopsText}>Oops....</Text>
      <Text style={errorText}>{data.error.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  oopsText: {color: 'red', fontSize: 30, fontWeight: '500'},
  errorText: {fontSize: 20},
});

export default ErrorView;
