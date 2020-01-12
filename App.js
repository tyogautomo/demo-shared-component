/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar
} from 'react-native';

import { RootNavigation } from './app/navigations/rootNavigation';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content"/>
      <SafeAreaView style={{ flex: 1 }}>
        <RootNavigation />
      </SafeAreaView>
    </>
  );
};

export default App;
