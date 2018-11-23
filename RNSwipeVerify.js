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
    buttonSize: PropTypes.number.isRequired,
    backgroundColor: PropTypes.string,
    buttonColor: PropTypes.string,
    text: PropTypes.string,
    onVerify: PropTypes.func.isRequired,
    textColor: PropTypes.string,
    borderColor: PropTypes.string,
    icon: PropTypes.any
};

//default props value
const defaultProps = {
    backgroundColor: '#F50057',
    buttonColor: '#D50000',
    textColor: '#fff',
    borderColor: '#D50000',
    icon: require('./img/right.png')
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

    }

    componentWillMount() {


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
            onPanResponderMove: Animated.event([
                null,
                { dx: this.state.offsetXAnim }
            ], {
                    // limit sliding out of box
                    listener: (event, gestureState) => {

                        const { buttonSize, width } = this.props

                        const { offsetXAnim } = this.state
                        const maxMoving = width - buttonSize

                        var toX = gestureState.dx;

                        if (toX < 0) toX = 0;
                        if (toX > maxMoving) toX = maxMoving;
                        const percent = ((toX * 100) / maxMoving).toFixed();
                        this.setState({ percent })

                        //
                        if (!this.props.text) {
                            const text = `${percent} %`;
                            this.setState({ text })
                        }

                        offsetXAnim.setValue(toX)

                    }
                }),
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded

                //console.log("onPanResponderRelease", gestureState);
                if (this.state.percent >= 100) {
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
            duration: animate ? 300 : 0,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
        this.setState({ moving: false, verify: false, percent: 0 });
        this.props.onVerify(false);//communicate that the verification was unsuccessful
    }




    render() {

        const { buttonColor, buttonSize, width, text, textColor, borderColor, backgroundColor, icon } = this.props
        const { verify, moving, percent } = this.state
        const radius = buttonSize / 2;
        const iconSize = buttonSize / 1.9;

        const position = {
            transform: [
                {
                    translateX: this.state.offsetXAnim
                }
            ]
        };
        return (
            <View style={{ borderColor: borderColor, borderWidth: 2, borderRadius: radius + 4, padding: 2, width: width + 8 }}>
                <View onLayout={(event) => {
                    var { x, y, width, height } = event.nativeEvent.layout;
                    this.setState({ dimensions: { width, height }, position: { x, y } })

                }} style={{ backgroundColor: backgroundColor, height: buttonSize, borderRadius: radius, position: 'relative', width, justifyContent: 'center' }}>
                    <Text style={{
                        position: 'absolute',
                        alignSelf: 'center',

                        color: textColor,
                        fontWeight: 'bold',
                        fontSize: 17, paddingLeft: !verify ? radius : 0
                    }}>{text}</Text>
                    {!verify && (<Animated.View {...this._panResponder.panHandlers} style={[
                        position,
                        { width: buttonSize, height: buttonSize, borderRadius: radius, backgroundColor: buttonColor, justifyContent: 'center', alignItems: 'center' }
                    ]}>
                        <Image source={icon} style={{ width: iconSize, height: iconSize }} />

                    </Animated.View>)}
                </View>
            </View>
        );
    }
}

RNSwipeVerify.propTypes = propTypes;
RNSwipeVerify.defaultProps = defaultProps;