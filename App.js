import React from 'react';
import { View } from 'react-native';
import Gallery from './Screens/Cam'

export default class App extends React.Component{
  render(){
    return(
      <View style={{backgroundColor:"yellow"}}>
        <Gallery/>
      </View>
    )
  }
}
