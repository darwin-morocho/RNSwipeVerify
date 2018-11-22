RNSwipeVerify
=========

A small componenent to Swipe Verify

## Installation

  `npm install --save react-native-swipe-verify`

## Preview


|  |  |
| --- | --- |
| <img width="259" alt="lo" src="https://user-images.githubusercontent.com/15864336/48920913-d823c600-ee69-11e8-99d0-ff0fa2bb4c82.png"> | <img width="259" alt="lo" src="https://user-images.githubusercontent.com/15864336/48921011-93e4f580-ee6a-11e8-91ff-3ffc38243719.png"> |


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

import RNSwipeVerify from 'react-native-swipe-verify'

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


        <RNSwipeVerify 
          ref={ref => this.swipeVerify = ref} 
          puzzleSize={60} 
          width={width - 40} 
          onVerify={verify => this.setState({ verify })}
          text={verify ? "VERIFIED" : "Deslice para verificar"} 
          puzzleColor="#01579B" 
          borderColor={verify ? '#1DE9B6' : '#01579B'}
          textColor={verify ? '#1DE9B6' : '#01579B'} 
          backgroundColor="#fff"
          icon={require('../img/swipe.png')}      
        />

        
        {this.state.verify && (<TouchableOpacity onPress={() => this.swipeVerify.reset(false)} style={{ marginTop: 30 }}>
          <Text style={{ padding: 10, color: '#0091EA', fontSize: 25 }}>RESET</Text>
        </TouchableOpacity>)}

      </View>
    );
  }
}
```


## Props
| name | type | default | description |
| --- | --- | --- | --- |
| **width** (required) | number | required | the width of swipe-verify |
| **puzzleSize** (required) | number | required | the puzzle (Icon) size of swipe-verify |
| **backgroundColor** (optional) | string | #F50057 | background color |
| **puzzleColor** (optional) | string | #D50000 | puzzle background color |
| **icon** (optional) | image | arrow icon | image to puzzle (only .png or .jpg).<br> You can use  **icon={require('../img/swipe.png')}**    or  **icon={{ uri: 'http://images.com/swipe-icon.jpg'}}** |
| **text** (optional) | string | #D50000 | text to show |
| **textColor** (optional) | string | #FFFFFF | text color |
| **borderColor** (optional) | string | #D50000 | border color |



## Callbacks

| name | arguments | notes |
| --- | --- | --- |
| **onVerify** (required) | bool | listener to check if the swipe is verified (user has completed swipe) |



## Methods

| name | arguments | notes |
| --- | --- | --- |
| **reset(bool)** (required) | bool (animate) | reset the swipe-verify to default values |