/**
 * RNSwipeVerify
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, PanResponder, Animated, UIManager } from 'react-native'

// Enable LayoutAnimation on Android
if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const propTypes = {
  buttonSize: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
  buttonColor: PropTypes.string,
  text: PropTypes.string,
  onVerified: PropTypes.func.isRequired,
  textColor: PropTypes.string,
  borderColor: PropTypes.string,
  icon: PropTypes.node,
  okIcon: PropTypes.any,
  okButton: PropTypes.object,
  borderRadius: PropTypes.number
}

//default props value
const defaultProps = {
  backgroundColor: '#fff',
  buttonColor: '#D50000',
  textColor: '#000',
  borderColor: 'rgba(0,0,0,0)',
  okButton: { visible: true, duration: 300 },
  borderRadius: 0
}

export default class RNSwipeVerify extends Component {
  constructor(props) {
    super(props)

    this.state = {
      drag: new Animated.ValueXY(),
      buttonOpacity: new Animated.Value(1),
      moving: false,
      verify: false,
      percent: 0,
      position: { x: 0, y: 0 },
      dimensions: { width: 0, height: 0 }
    }

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        const positionXY = this.state.drag.__getValue()
        this.state.drag.setOffset(positionXY)
        this.state.drag.setValue({ x: 0, y: 0 })
      },
      onPanResponderMove: Animated.event([null, { dx: this.state.drag.x }], {
        // limit sliding out of box
        listener: (event, gestureState) => {
          const { buttonSize } = this.props

          const {
            drag,
            verify,
            dimensions: { width }
          } = this.state
          const maxMoving = width - buttonSize

          var toX = gestureState.dx

          if (toX < 0) toX = 0
          if (toX > maxMoving) toX = maxMoving
          const percent = ((toX * 100) / maxMoving).toFixed()
          this.setState({ percent })

          if (verify) {
            drag.setValue({ x: 0, y: 0 })
            return
          }
          drag.setValue({ x: toX, y: 0 })
        }
      }),
      onPanResponderRelease: () => {
        if (this.state.verify) return
        if (this.state.percent >= 100) {
          this.setState({ moving: false, verify: true })
          this.props.onVerified() //communicate that the verification was successful

          const { visible, duration } = this.props.okButton
          if (!visible) {
            this.toggleShowAnimation(false, duration)
          }
        } else if (!this.state.verify) {
          this.reset()
        }
      },
      onPanResponderTerminate: () => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        // console.log("onPanResponderTerminate", gestureState);
      }
    })
  }

  reset() {
    this.state.drag.setOffset({ x: 0, y: 0 })
    Animated.timing(this.state.drag, {
      toValue: { x: 0, y: 0 },
      duration: 300
    }).start()
    this.toggleShowAnimation(true, this.props.okButton.duration)
    this.setState({ moving: false, verify: false, percent: 0 })
  }

  toggleShowAnimation(visible, duration) {
    Animated.timing(
      // Animate over time
      this.state.buttonOpacity, // The animated value to drive
      {
        toValue: visible ? 1 : 0, // Animate to opacity: 1 (opaque)
        duration: duration // Make it take a while
      }
    ).start()
  }

  render() {
    const {
      buttonColor,
      buttonSize,
      borderColor,
      backgroundColor,
      icon,
      borderRadius
    } = this.props
    const { buttonOpacity } = this.state

    const position = { transform: this.state.drag.getTranslateTransform() }

    return (
      <View
        style={{
          borderColor: borderColor,
          borderWidth: 2,
          borderRadius: borderRadius + 4,
          padding: 2,
          flex: 1
        }}
      >
        <View
          onLayout={event => {
            var { x, y, width, height } = event.nativeEvent.layout
            this.setState({ dimensions: { width, height }, position: { x, y } })
          }}
          style={{
            backgroundColor,
            height: buttonSize,
            borderRadius,
            justifyContent: 'center'
          }}
        >
          {this.props.children && (
            <View
              style={{
                position: 'absolute',
                alignSelf: 'center'
              }}
            >
              {this.props.children}
            </View>
          )}

          <Animated.View
            {...this._panResponder.panHandlers}
            style={[
              position,
              {
                width: buttonSize,
                height: buttonSize,
                borderRadius: borderRadius,
                backgroundColor: buttonColor,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: buttonOpacity
              }
            ]}
          >
            {icon}
          </Animated.View>
        </View>
      </View>
    )
  }
}

RNSwipeVerify.propTypes = propTypes
RNSwipeVerify.defaultProps = defaultProps
