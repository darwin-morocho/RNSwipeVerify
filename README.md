RNSwipeVerify
=========

A small componenent to Swipe Verify

## Installation

  `npm install --save react-native-swipe-verify`

## Preview


<img width="259" alt="lo" src="https://user-images.githubusercontent.com/15864336/48955616-ba636900-ef1c-11e8-915b-5fa53939ffb3.png"> 


## Important
If the **RNSwipeVerify** is inside another component with PanResponder the  RNSwipeVerify will be cancelled.


## Usage


```JSX
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
```


## Props
| name | type | default | description |
| --- | --- | --- | --- |
| **width** (required) | number | required | the width of swipe-verify |
| **buttonSize** (required) | number | required | the button (Icon) size of swipe-verify |
| **backgroundColor** (optional) | string | #F50057 | background color |
| **buttonColor** (optional) | string | #D50000 | button background color |
| **icon** (optional) | component |  | see the example to more information |
| **borderColor** (optional) | string | #D50000 | border color |
| **borderRadius** (optional) | number | 0 | border radius to the button and container |
| **okButton** (optional) | object | { visible: true, duration: 300 } | if  visible is true the icon button will be hidden, duration (number) is the animation duration in miliseconds |



## Callbacks

| name | arguments | notes |
| --- | --- | --- |
| **onVerified** (required) | bool | listener to check if the swipe is verified (user has completed swipe) |



## Methods

| name | arguments | notes |
| --- | --- | --- |
| **reset()** | none | reset the swipe-verify to default values |