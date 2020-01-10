import { createAppContainer } from 'react-navigation';

import { MainAppNavigator } from './MainAppNavigator/MainAppNavigator';

const RootNavigation = createAppContainer(MainAppNavigator);

export { RootNavigation };
