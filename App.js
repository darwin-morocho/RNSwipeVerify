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


        <RNSwipeVerify ref={ref => this.swipeVerify = ref}
          width={width - 50}
          puzzleSize={60}
          text="Deslice para verificar"
          onVerify={verify => {
            this.setState({ verify })
          }} />

        {this.state.verify && (<TouchableOpacity onPress={() => this.swipeVerify.reset(false)} style={{ marginTop: 30 }}>
          <Text style={{ padding: 10, color: '#0091EA', fontSize: 25 }}>RESET</Text>
        </TouchableOpacity>)}

      </View>
    );
  }
}

