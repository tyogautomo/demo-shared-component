import React, { Component } from 'react';
import { View, Animated } from 'react-native';

class ItemDetail extends Component {
  state = {
    opacity: new Animated.Value(0),
    layerOpacity: 1,
    interval: 0,
    animatePageY: new Animated.Value(0)
  }

  componentDidMount() {
    this.intervalOpacity();
    this.intervalAnimatePageY();
  };

  componentWillUnmount() {
    clearInterval(this.openTransition);
  }

  intervalAnimatePageY = () => {
    const { animatePageY } = this.state;
    Animated.timing(
      animatePageY,
      { toValue: 500, duration: 500, delay: 300 }
    ).start(_ => {
      this.setState({ layerOpacity: 0 })
    })
  };

  intervalOpacity = () => {
    const { opacity } = this.state;
    Animated.timing(
      opacity,
      { toValue: 2, duration: 500 }
    ).start()
  };

  renderLayerTransition = () => {
    const { navigation } = this.props;
    const { animatePageY, layerOpacity } = this.state;
    const { width, height, pageX, pageY } = navigation.getParam('position');
    return (
      <View style={{ flex: 1, opacity: layerOpacity }}>
        <Animated.View style={{
          position: 'absolute',
          backgroundColor: 'white',
          width,
          height: height - 20,
          top: animatePageY.interpolate({
            inputRange: [0, 500],
            outputRange: [pageY, 60]
          }),
          right: pageX,
          borderRadius: 10,
          elevation: 1
        }} />
      </View>
    )
  };

  renderBackground = () => {
    return (
      <View style={{ backgroundColor: 'grey', width: '100%', height: 130 }} />
    )
  }

  renderHeader = () => {
    const { navigation } = this.props;
    const { layerOpacity } = this.state;
    const { width, height, pageX } = navigation.getParam('position');

    return (
      <View style={{
        position: 'absolute',
        backgroundColor: 'white',
        width,
        height: height - 20,
        top: 60,
        right: pageX,
        borderRadius: 10,
        elevation: 1,
        opacity: layerOpacity === 0 ? 1 : 0
      }} />
    )
  }

  render() {
    const { opacity } = this.state;
    return (
      <View>
        {this.renderLayerTransition()}
        <Animated.View style={{
          opacity: opacity.interpolate({
            inputRange: [0, 2],
            outputRange: [0, 1]
          })
        }}>
          {this.renderBackground()}
          {this.renderHeader()}
        </Animated.View>
      </View >
    )
  }
}

export { ItemDetail };
