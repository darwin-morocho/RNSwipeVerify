/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    Text, View, PanResponder,
    Animated, UIManager,
    Easing, Image
} from 'react-native';


// Enable LayoutAnimation on Android
if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}





const propTypes = {
    width: PropTypes.number.isRequired,
    puzzleSize: PropTypes.number.isRequired,
    backgroundColor: PropTypes.string,
    puzzleColor: PropTypes.string,
    text: PropTypes.string,
    onVerify: PropTypes.func.isRequired,
    textColor: PropTypes.string,
    borderColor: PropTypes.string,
};

//default props value
const defaultProps = {
    backgroundColor: '#F50057',
    puzzleColor: '#D50000',
    textColor: '#fff',
    borderColor: '#D50000',
};


export default class RNSwipeVerify extends Component {

    constructor(props) {
        super(props)

        this.state = {
            offsetXAnim: new Animated.Value(0),
            moving: false,
            verify: false,
            percent: 0,
            position: { x: 0, y: 0 },
            dimensions: { width: 0, height: 0 }, 

        }




        lastDx = 0

        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                // The gesture has started. Show visual feedback so the user knows
                // what is happening!

                // gestureState.d{x,y} will be set to zero now
                this.setState({ moving: true })
            },
            onPanResponderMove: (evt, gestureState) => {
                // The most recent move distance is gestureState.move{X,Y}

                // The accumulated gesture distance since becoming responder is
                // gestureState.d{x,y}

                const { puzzleSize, width } = this.props

                const { offsetXAnim, moving } = this.state
                const maxMoving = width - puzzleSize





                if (!moving) return

                var toX = gestureState.dx;



                // console.log("mi dx", this.lastDx - toX);
                // console.log("maxMoving", maxMoving);
                // console.log("this.lastDx", this.lastDx);


                if (toX < 0) toX = 0;
                if (toX > maxMoving) toX = maxMoving;
                const percent = ((toX * 100) / maxMoving).toFixed();
                this.setState({ percent })
                if (!this.props.text) {
                    const text = `${percent} %`;
                    this.setState({ text })
                }

                Animated.timing(offsetXAnim, {
                    toValue: toX,
                    duration: 10,
                    easing: Easing.linear
                }).start();



            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded

                //console.log("onPanResponderRelease", gestureState);
                if (this.state.percent > 98) {

                    this.setState({ moving: false, verify: true });
                    this.props.onVerify(true);//communicate that the verification was successful
                } else {
                    this.reset(true);
                }


            },
            onPanResponderTerminate: (evt, gestureState) => {
                // Another component has become the responder, so this gesture
                // should be cancelled
                // console.log("onPanResponderTerminate", gestureState);
            },

        });


    }



    reset(animate) {
        //reset to default values
        Animated.timing(this.state.offsetXAnim, {
            toValue: 0,
            duration: animate ? 500 : 0,
            easing: Easing.linear
        }).start();
        this.setState({ moving: false, verify: false, percent: 0 });
        this.props.onVerify(false);//communicate that the verification was unsuccessful
    }




    render() {

        const { puzzleColor, puzzleSize, width, text, textColor, borderColor, backgroundColor } = this.props
        const { verify, moving } = this.state
        const radius = puzzleSize / 2;
        const iconSize = puzzleSize / 1.9;

        const position = {
            transform: [
                {
                    translateX: this.state.offsetXAnim
                }
            ]
        };
        return (
            <View style={{ borderColor: borderColor, borderWidth: 2, borderRadius: radius + 4, padding: 2 }}>
                <View onLayout={(event) => {
                    var { x, y, width, height } = event.nativeEvent.layout;
                    this.setState({ dimensions: { width, height }, position: { x, y } })

                }} style={{ backgroundColor: backgroundColor, height: puzzleSize, borderRadius: radius, position: 'relative', width, justifyContent: 'center' }}>
                    <Text style={{
                        position: 'absolute',
                        alignSelf: 'center',

                        color: textColor,
                        fontWeight: 'bold',
                        fontSize: 17, paddingLeft: !verify ? radius : 0
                    }}>{text}</Text>
                    {!verify && (<Animated.View {...this._panResponder.panHandlers} style={[
                        position,
                        { width: puzzleSize, height: puzzleSize, borderRadius: radius, backgroundColor: puzzleColor, justifyContent: 'center', alignItems: 'center' }
                    ]}>
                        <Image source={require('./img/right.png')} style={{ width: iconSize, height: iconSize }} />

                    </Animated.View>)}
                </View>
            </View>
        );
    }
}

RNSwipeVerify.propTypes = propTypes;
RNSwipeVerify.defaultProps = defaultProps;