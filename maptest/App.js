/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
  SafeAreaView,
  FlatList
} from 'react-native';

import MapView, {PROVIDER_GOOGLE} from "react-native-maps";

export default class App extends Component {

  render(){
    console.disableYellowBox = true;
    return(

      <SafeAreaView style = {styles.container}>
        <MapView
        provider = {PROVIDER_GOOGLE}
        style = {styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      </SafeAreaView>
    );
    
  }
  
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center' 
  },
  title: {
    fontSize: 40
  },
  map:{
    height: '100%',
    width: '100%'
  }
});