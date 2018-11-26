RNSwipeVerify
=========

A small componenent to Swipe Verify

## Installation

  `npm install --save react-native-swipe-verify`

## Preview


<img width="259" alt="lo" src="https://user-images.githubusercontent.com/15864336/48955616-ba636900-ef1c-11e8-915b-5fa53939ffb3.png">
<img width="259" alt="lo" src="https://user-images.githubusercontent.com/15864336/49022236-5a5e0400-f162-11e8-9c71-50f21cd999e1.png">



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

import LottieView from 'lottie-react-native';

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = { isUnlocked: false, isUploaded: false }

  }

  render() {


    const { isUnlocked, isUploaded } = this.state

    const lottieSizeIcon = isUploaded ? 60 : 40;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#fff', paddingBottom: 40 }}>


        {/** Lottie example */}
        <View style={{ marginTop: 20 }}>
          <RNSwipeVerify ref={ref => this.swipeVerify2 = ref}
            width={width - 50}
            buttonSize={60}
            buttonColor="#2962FF"
            borderColor="#2962FF"
            backgroundColor="#fff"
            textColor="#37474F"
            borderRadius={30}
            okButton={{ visible: true, duration: 400 }}
            onVerified={() => {
              this.setState({ isUploaded: true })
            }}
            icon={
              <View style={{ width: lottieSizeIcon, height: lottieSizeIcon }}>
                <LottieView
                  source={isUploaded ? require('./lottie_files/ready_to_upload.json') : require('./lottie_files/cloud_upload.json')}
                  autoPlay

                  resizeMode='contain'
                  loop={!isUploaded}
                />
              </View>
            }
          >

            <Text>{isUploaded ? 'UPLOADED' : 'slide to upload'}</Text>

          </RNSwipeVerify>
        </View>
        {/** end Lottie example */}






        <View style={{ marginTop: 20 }}>
          <RNSwipeVerify ref={ref => this.swipeVerify3 = ref}
            width={width - 50}
            buttonSize={60}
            borderColor="#fff"
            buttonColor="#37474F"
            backgroundColor="#ececec"
            textColor="#37474F"
            okButton={{ visible: false, duration: 400 }}
            onVerified={() => {
              this.setState({ isUnlocked: true })
            }}
            icon={<Image source={isUnlocked ? require('./img/unlocked.png') : require('./img/locked.png')} style={{ width: 40, height: 40 }} />}
          >

            <Text>{isUnlocked ? 'UNLOCKED' : 'slide to unlock'}</Text>

          </RNSwipeVerify>
        </View>


        <TouchableOpacity onPress={() => {

          this.swipeVerify2.reset()
          this.swipeVerify3.reset()
          this.setState({ isUnlocked: false, isUploaded: false })
        }} style={{ marginTop: 30 }}>
          <Text style={{ padding: 10, color: '#f00', fontSize: 25 }}>RESET</Text>
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