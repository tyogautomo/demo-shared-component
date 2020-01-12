import React, { Component } from 'react';
import { View, StatusBar, Text, BackHandler, Animated } from 'react-native';
// import Animated from 'react-native-reanimated';
// const {
//   Clock,
//   Value,
//   set,
//   cond,
//   startClock,
//   clockRunning,
//   timing,
//   debug,
//   stopClock,
//   block,
// } = Animated

class ItemDetail extends Component {
  state = {
    opacity: new Animated.Value(0),
    layerOpacity: 1,
    interval: 0,
    animatePageY: new Animated.Value(0)
  }

  componentDidMount() {
    this.handleBackHandler();
    this.intervalOpacity();
    this.intervalAnimatePageYIn();
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackHandler = () => {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.onBackPress();
      return true;
    })
  }

  intervalAnimatePageYIn = () => {
    const { animatePageY } = this.state;
    Animated.timing(
      animatePageY,
      { toValue: 500, duration: 500, delay: 300 }
    ).start(_ => {
      this.setState({ layerOpacity: 0 })
    })
  };

  intervalAnimatePageYOut = () => {

  }

  intervalOpacity = () => {
    const { opacity } = this.state;
    Animated.timing(
      opacity,
      { toValue: 2, duration: 500 }
    ).start()
  };

  renderLayerTransitionIn = () => {
    const { navigation } = this.props;
    const { animatePageY, layerOpacity } = this.state;
    const { width, height, pageX, pageY } = navigation.getParam('position');
    const name = navigation.getParam('name');
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
          elevation: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }} >
          <Text>{name}</Text>
        </Animated.View>
      </View>
    )
  };

  onBackPress = () => {
    const { navigation } = this.props;

    navigation.navigate('ItemList')
  }

  renderBackground = () => {
    return (
      <View style={{ backgroundColor: 'grey', width: '100%', height: 130 }} />
    )
  }

  renderHeader = () => {
    const { navigation } = this.props;
    const { layerOpacity } = this.state;
    const { width, height, pageX } = navigation.getParam('position');
    const name = navigation.getParam('name');

    return (
      <View
        ref={component => this.headerContainer = component}
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          width,
          height: height - 20,
          top: 60,
          right: pageX,
          borderRadius: 10,
          elevation: 1,
          opacity: layerOpacity === 0 ? 1 : 0,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text>{name}</Text>
      </View>
    )
  }

  render() {
    const { opacity, onBack } = this.state;
    return (
      <View>
        <StatusBar barStyle="light-content" backgroundColor='grey' />
        {this.renderLayerTransitionIn()}
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
