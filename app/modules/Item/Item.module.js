import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class Item extends Component {
  onPressDetail = () => {
    const { name } = this.props;
    const { navigation } = this.props

    this[name].measure((x, y, width, height, pageX, pageY) => {
      const position = { x, y, width, height, pageX, pageY }
      navigation.navigate('ItemDetail', { position });
    })
  };

  render() {
    const { name } = this.props;

    return (
      <TouchableOpacity onPress={this.onPressDetail} ref={component => this[name] = component} activeOpacity={0.9}>
        <View style={{
          width: 300,
          height: 150,
          backgroundColor: 'blue',
          marginBottom: 20,
          borderRadius: 10,
          elevation: 3,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ color: 'white' }}>{name}</Text>
        </View>
      </TouchableOpacity>
    )
  };
}

export { Item };
