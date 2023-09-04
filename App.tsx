import React from 'react';
import {
  SafeAreaView,
  StatusBar
} from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from './src/HomeScreen';


function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{
      flex: 1,
    }}>
      <SafeAreaView style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff'
      }}>
        <StatusBar hidden />
        <HomeScreen />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
export default App;
