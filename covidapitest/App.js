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
        this.setState({data: json.Global});
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  render(){
    console.disableYellowBox = true;
    const {data, isLoading} = this.state
    return(

      <SafeAreaView style = {styles.container}>
        <View>
          
      <Text>{"Total Confirmed Cases: " }</Text><Text>{this.state.data.TotalConfirmed}</Text>
        </View>
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
});