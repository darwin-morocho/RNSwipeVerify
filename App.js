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

    this.state = {}

  }

  render() {


    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>


        <RNSwipeVerify ref={ref => this.swipeVerify = ref}
          width={width - 50}
          buttonSize={60}
          text="Deslice para verificar"
          onVerified={() => {
            alert("Verified 1")
          }} />



        <View style={{ marginTop: 20 }}>
          <RNSwipeVerify ref={ref => this.swipeVerify2 = ref}
            width={width - 50}
            buttonSize={60}
            borderColor="#2962FF"
            buttonColor="#2962FF"
            backgroundColor="#fff"
            textColor="#2962FF"
            text="Deslice para verificar"
            onVerified={() => {
              alert("Verified 2")
            }} />
        </View>



        <View style={{ marginTop: 20 }}>
          <RNSwipeVerify ref={ref => this.swipeVerify3 = ref}
            width={width - 50}
            buttonSize={60}
            borderColor="#fff"
            buttonColor="#37474F"
            backgroundColor="#f5f5f5"
            textColor="#37474F"
            text="Deslice para verificar"
            onVerified={() => {
              alert("Verified 3")
            }} />
        </View>


        <TouchableOpacity onPress={() => {
          this.swipeVerify.reset()
          this.swipeVerify2.reset()
          this.swipeVerify3.reset()
        }} style={{ marginTop: 30 }}>
          <Text style={{ padding: 10, color: '#0091EA', fontSize: 25 }}>RESET</Text>
        </TouchableOpacity>



      </View>
    );
  }
}

