import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  ImageSourcePropType,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';
import ErrorView from '../component/ErrorView';
import Weather from '../component/Weather';
import {ErrorResponse, Root} from '../model/WeatherData';
import Constants from '../utils/Constants';

const Home = () => {
  console.log('home rendered');

  const {
    container,
    textInput,
    mainContainer,
    progress,
    emptyDataContainer,
    emptyData,
    bgImage,
  } = styles;
  const [isLoading, toggleLoading] = useState(false);
  const [data, setData] = useState<Root | null>(null);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const test = useRef(null);

  const onSearchClick = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    e.persist();
    let city = e.nativeEvent.text;
    if (city) {
      getWeather(e.nativeEvent.text);
    }
  };

  const getWeather = async (query: string) => {
    try {
      toggleLoading(true);
      const url = `${Constants.api_url}&q=${query}`;
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        setData(json as Root);
      } else {
        setData(null);
        setError(json as ErrorResponse);
      }

      toggleLoading(false);
    } catch (ex) {
      console.log(`errorssss ${ex}`);
      toggleLoading(false);
    }
  };

  const getImageBG = (): ImageSourcePropType => {
    // console.log(data?.current.is_day);
    if (data?.current.is_day === 0) {
      return require('../assets/images/night.jpeg');
    } else if (data?.current.is_day === 1) {
      return require('../assets/images/day.jpg');
    }
    return {};
  };

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <View style={container}>
        <View>
          <TextInput
            autoFocus={true}
            placeholder="Enter City"
            style={textInput}
            returnKeyType="search"
            onSubmitEditing={onSearchClick}
          />
        </View>
        <View style={mainContainer}>
          {isLoading ? (
            <ActivityIndicator size={'large'} style={progress} />
          ) : data ? (
            <Weather data={data} />
          ) : error ? (
            <ErrorView data={error} />
          ) : (
            <View style={emptyDataContainer}>
              <View>
                <Text style={emptyData}>Please enter city name</Text>
              </View>
            </View>
          )}
        </View>
      </View>
      {data ? (
        <ImageBackground
          source={getImageBG()}
          resizeMethod="resize"
          style={bgImage}
        />
      ) : null}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    zIndex: 2,
  },
  textInput: {
    borderWidth: 2,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
  },
  mainContainer: {flex: 1},
  progress: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  emptyDataContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  emptyData: {fontSize: 20},
  bgImage: {
    height: '100%',
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
  },
});
