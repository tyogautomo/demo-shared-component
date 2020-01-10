import React, { Component } from 'react';
import { View, Animated } from 'react-native';

class ItemDetail extends Component {
  state = {
    opacity: new Animated.Value(0),
    interval: 0
  }

  componentDidMount() {
    this.intervalOpacity();
  };

  componentWillUnmount() {
    clearInterval(this.openTransition);
  }

  intervalOpacity = () => {
    this.openTransition = setInterval(() => {
      if (this.state.interval >= 1) {
        clearInterval(this.openTransition);
      }
      console.log(this.state.interval)
      this.setState(prevState => ({ interval: prevState.interval + 0.05 }), () => {
        this.state.opacity.setValue(this.state.interval)
      })
    }, 10);
  };

  renderLayerTransition = () => {
    const { navigation } = this.props;
    const { width, height, pageX, pageY } = navigation.getParam('position');
    return (
      <View style={{ flex: 1 }}>
        <View style={{
          position: 'absolute',
          backgroundColor: 'blue',
          width,
          height: height - 20,
          top: pageY,
          right: pageX,
          borderRadius: 10,
          elevation: 3
        }}></View>
      </View>
    )
  };

  renderBackground = () => {
    return (
      <View style={{ backgroundColor: 'grey', width: '100%', height: 150 }} />
    )
  }

  renderHeader = () => {

  }

  render() {
    const { opacity } = this.state;
    return (
      <View>
        {this.renderLayerTransition()}
        <Animated.View style={{
          opacity: opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          })
        }}>
          {this.renderBackground()}
        </Animated.View>
      </View >
    )
  }
}

export { ItemDetail };
