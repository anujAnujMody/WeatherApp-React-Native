/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {SafeAreaView, StyleSheet, useColorScheme} from 'react-native';
import Home from './src/screens/Home';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'light';

  const {container} = styles;
  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'white' : 'white',
  };

  return (
    <SafeAreaView style={[container, backgroundStyle]}>
      <Home />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
