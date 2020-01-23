import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class Item extends Component {
  onPressDetail = () => {
    const { name } = this.props;
    const { navigation } = this.props

    this[name].measure((x, y, width, height, pageX, pageY) => {
      const position = { width, height, pageX, pageY }
      navigation.navigate('ItemDetail', { position, name });
    })
  };

  render() {
    const { name } = this.props;

    return (
      <TouchableOpacity
        onPress={this.onPressDetail}
        ref={component => this[name] = component}
        activeOpacity={0.9}>
        <View style={{
          width: 300,
          height: 150,
          backgroundColor: 'white',
          marginBottom: 20,
          borderRadius: 10,
          elevation: 2,
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
      </TouchableOpacity>
    )
  };
}

export { Item };
