import React, { Component } from 'react';

import {
  View,
  TouchableOpacity, Text,
  Dimensions, Image
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

