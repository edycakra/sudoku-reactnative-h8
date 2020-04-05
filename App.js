import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux' //provider for redux
import { store } from './src/store/' //contain redux setting and reducers

import WelcomePage from './src/views/WelcomePage'
import Home from './src/views/Home';
import Finish from './src/views/Finish';

const Stack = createStackNavigator()

//contain available pages, and the name for its navigation
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={WelcomePage} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Finish" component={Finish} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
