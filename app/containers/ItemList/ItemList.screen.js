import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import { Item } from '../../modules/Item/Item.module'

class ItemList extends Component {
  state = {
    items: [
      {
        id: 1,
        name: 'item 1'
      },
      {
        id: 2,
        name: 'item 2'
      },
      {
        id: 3,
        name: 'item 3'
      },
      {
        id: 4,
        name: 'item 4'
      }
    ]
  }

  renderItemList = () => {
    const { items } = this.state;
    const { navigation } = this.props;

    return (
      <View style={{ alignItems: 'center', paddingTop: 20 }}>
        {items.map((item, index) => (
          <Item key={index} name={item.name} {...this.props} />
        ))}
      </View>
    )
  }

  render() {
    return (
      <ScrollView>
        {this.renderItemList()}
      </ScrollView>
    )
  }
}

export { ItemList };
