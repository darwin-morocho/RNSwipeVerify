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
    onVerified: PropTypes.func.isRequired,
    textColor: PropTypes.string,
    borderColor: PropTypes.string,
    icon: PropTypes.any,
    okIcon: PropTypes.any
};

//default props value
const defaultProps = {
    backgroundColor: '#F50057',
    buttonColor: '#D50000',
    textColor: '#fff',
    borderColor: '#D50000',
    icon: require('./img/right.png'),
    okIcon: require('./img/tick.png'),
};


export default class RNSwipeVerify extends Component {

    constructor(props) {
        super(props)

        this.state = {
            drag: new Animated.ValueXY(),
            moving: false,
            verify: false,
            percent: 0,
            position: { x: 0, y: 0 },
            dimensions: { width: 0, height: 0 },
        }

    }

    componentWillMount() {


        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
            onPanResponderGrant: (evt, gestureState) => {

                const positionXY = this.state.drag.__getValue();
                this.state.drag.setOffset(positionXY);
                this.state.drag.setValue({ x: 0, y: 0 });
            },
            onPanResponderMove: Animated.event([
                null,
                { dx: this.state.drag.x }
            ], {
                    // limit sliding out of box
                    listener: (event, gestureState) => {

                        const { buttonSize, width } = this.props

                        const { drag } = this.state
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

                        drag.setValue({ x: toX, y: 0 })

                    }
                }),
            onPanResponderRelease: (evt, gestureState) => {
                if (this.state.percent >= 100) {
                    this.setState({ moving: false, verify: true });
                    this.props.onVerified();//communicate that the verification was successful
                } else if (!this.state.verify) {
                    this.reset();
                }
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // Another component has become the responder, so this gesture
                // should be cancelled
                console.log("onPanResponderTerminate", gestureState);
            },

        });
    }



    reset() {
        this.state.drag.setOffset({ x: 0, y: 0 });
        Animated.timing(this.state.drag, {
            toValue: { x: 0, y: 0 },
            duration: 300,
        }).start();

        this.setState({ moving: false, verify: false, percent: 0 });
    }




    render() {

        const { buttonColor, buttonSize, width, text, textColor, borderColor, backgroundColor, icon, okIcon } = this.props
        const { verify, moving, percent } = this.state
        const radius = buttonSize / 2;
        const iconSize = buttonSize / 1.9;

        const position = { transform: this.state.drag.getTranslateTransform() };
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
                        fontSize: 17, paddingLeft: !verify ? radius / 2 : 0
                    }}>{text}</Text>
                    <Animated.View {...this._panResponder.panHandlers} style={[
                        position,
                        { width: buttonSize, height: buttonSize, borderRadius: radius, backgroundColor: buttonColor, justifyContent: 'center', alignItems: 'center' }
                    ]}>
                        <Image source={verify ? okIcon : icon} style={{ width: iconSize, height: iconSize }} />

                    </Animated.View>
                </View>
            </View>
        );
    }
}

RNSwipeVerify.propTypes = propTypes;
RNSwipeVerify.defaultProps = defaultProps;