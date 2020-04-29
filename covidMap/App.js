/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

const latlong = require('./data/latlong.json')

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

import MapView, {PROVIDER_GOOGLE, Marker} from "react-native-maps";

function getLat(countryCode){
  countryCode = countryCode.toLowerCase()
  if(latlong[countryCode].lat == undefined){
    console.log(countryCode);
    return("ERROR");
  }
  else{
    return(latlong[countryCode].lat);
  }
}

function getLong(countryCode){
  countryCode = countryCode.toLowerCase()
  if(latlong[countryCode].long == undefined){
    console.log(countryCode);
    return("ERROR");
  }
  else{
    return(latlong[countryCode].long);
  }
}


export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      data:[],
      isLoading: true
    };
  }

  componentDidMount(){
    fetch("https://api.covid19api.com/summary")
      .then(response => response.json())
      .then((json) => {
        this.setState({data: json.Countries});
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  render(){
    console.disableYellowBox = true;
    const {data, isLoading} = this.state
    
    Countries = []
    numbers = []

    class countryData {
      constructor(name, code, cases) {
        this.name = name;
        this.code = code;
        this.cases = cases;
      }
    }

    var test = 5
    var i;
    for (x in data){
      name = data[x].Country
      code = data[x].CountryCode
      cases = "Total confirmed cases: " + data[x].TotalConfirmed.toString()
      Countries.push(new countryData(name,code,cases));
    }

    return(
      <SafeAreaView style = {styles.container}>
        <MapView
        provider = {PROVIDER_GOOGLE}
        style = {styles.map}
        initialRegion={{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 60,
          longitudeDelta: 60,
        }}
        >
        {Countries.map((val, index) => {
            return(<MapView.Marker
              image = {require('./assets/icon.png')}
              coordinate={{latitude: parseFloat(getLat(val.code)),
              longitude: parseFloat(getLong(val.code))}}
              title={val.name}
              description={val.cases}
            />)
        })}
        </MapView>
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