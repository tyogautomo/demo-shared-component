import { createStackNavigator } from 'react-navigation-stack';

import { ItemDetail, ItemList } from '../screenConfig';

const MainAppNavigator = createStackNavigator(
  {
    ItemList: {
      screen: ItemList
    },
    ItemDetail: {
      screen: ItemDetail
    }
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
      animationEnabled: false
    }
  }
)

export { MainAppNavigator };
