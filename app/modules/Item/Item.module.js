import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export class Item extends Component {
  render() {
    return (
      <TouchableOpacity>
        <View style={{ width: 40, height: 40, backgroundColor: 'blue' }}>
          <Text>Item</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export { Item };
