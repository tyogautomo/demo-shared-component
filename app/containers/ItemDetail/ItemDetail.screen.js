import React, { Component } from 'react';
import { View, StatusBar, Text, BackHandler, Animated } from 'react-native';

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

  onBackPress = () => {
    this.intervalAnimatePageYOut();
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
    const { animatePageY, opacity } = this.state;
    const { navigation } = this.props;

    this.setState({ layerOpacity: 1 }, () => {
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0, duration: 200 }),
        Animated.timing(animatePageY, { toValue: 0, duration: 400 })
      ]).start(() => {
        setTimeout(() => {
          navigation.navigate('ItemList');
        }, 200);
      })
    })
  }

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
      <View style={{ flex: 1, opacity: layerOpacity, zIndex: 100 }}>
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
          elevation: 2,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 20
        }} >
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ backgroundColor: '#e3e3e3', width: 80, height: 80, borderRadius: 40 }} />
          </View>
          <View style={{ flex: 2, paddingLeft: 20, justifyContent: 'center' }}>
            <View style={{ width: 150, height: 20, backgroundColor: '#e3e3e3', borderRadius: 5, marginBottom: 10 }} />
            <View style={{ width: 80, height: 20, backgroundColor: '#e3e3e3', borderRadius: 5, marginBottom: 10 }} />
            <View style={{ width: 100, height: 20, backgroundColor: '#e3e3e3', borderRadius: 5 }} />
          </View>
        </Animated.View>
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
          elevation: 2,
          opacity: layerOpacity === 0 ? 1 : 0,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 20
        }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ backgroundColor: '#e3e3e3', width: 80, height: 80, borderRadius: 40 }} />
        </View>
        <View style={{ flex: 2, paddingLeft: 20, justifyContent: 'center' }}>
          <View style={{ width: 150, height: 20, backgroundColor: '#e3e3e3', borderRadius: 5, marginBottom: 10 }} />
          <View style={{ width: 80, height: 20, backgroundColor: '#e3e3e3', borderRadius: 5, marginBottom: 10 }} />
          <View style={{ width: 100, height: 20, backgroundColor: '#e3e3e3', borderRadius: 5 }} />
        </View>
      </View>
    )
  }

  render() {
    const { opacity, onBack } = this.state;
    return (
      <View>
        <StatusBar barStyle="light-content" backgroundColor='grey' />
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
