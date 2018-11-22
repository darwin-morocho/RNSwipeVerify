/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';

import {
  View,
  TouchableOpacity, Text,
  Dimensions
} from 'react-native';


const { width } = Dimensions.get('window')

import RNSwipeVerify from './RNSwipeVerify'

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      verify: false
    }






  }





  render() {

    const { verify } = this.state
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>


        <RNSwipeVerify ref={ref => this.swipeVerify = ref} puzzleSize={60} width={width - 40} onVerify={verify => this.setState({ verify })}
          text={verify ? "VERIFICADO" : "Deslice para verificar"} puzzleColor="#01579B" borderColor={verify ? '#1DE9B6' : '#01579B'}
          textColor={verify ? '#1DE9B6' : '#01579B'} backgroundColor="#fff"
        />

        {this.state.verify && (<TouchableOpacity onPress={() => this.swipeVerify.reset(false)} style={{ marginTop: 30 }}>
          <Text style={{ padding: 10, color: '#0091EA', fontSize: 25 }}>RESET</Text>
        </TouchableOpacity>)}

      </View>
    );
  }
}

