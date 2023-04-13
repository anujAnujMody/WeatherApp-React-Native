import React, {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform} from 'react-native';

type LocationData = {
  lattitude: number | null;
  longitude: number | null;
};

const checkAndroidPermission = async (): Promise<Boolean> => {
  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  return false;
};

const checkiOSPermission = async (): Promise<Boolean> => {
  let status = await Geolocation.requestAuthorization('whenInUse');
  if (status === 'granted') {
    return true;
  }
  return false;
};

const hasPermission = async () => {
  if (Platform.OS === 'ios') {
    let hasiOSPermission = await checkiOSPermission();
    return hasiOSPermission;
  } else {
    let hasAndroidPermission = await checkAndroidPermission();
    return hasAndroidPermission;
  }
};

export default function GetLocation(): LocationData {
  const [lat, setLat] = useState<number | null>(null);
  const [long, setLong] = useState<number | null>(null);

  const getLatLong = async () => {
    let isPermissionGranted = await hasPermission();
    if (isPermissionGranted) {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position.coords.latitude, position.coords.longitude);
          var absolute = Math.abs(position.coords.latitude);
          var degrees = Math.floor(absolute);
          console.log(degrees);
          setLat(degrees);
          var absolute = Math.abs(position.coords.longitude);
          var degrees = Math.floor(absolute);
          setLong(degrees);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  useEffect(() => {
    getLatLong();
  }, []);

  return {lattitude: lat, longitude: long} as LocationData;
}
