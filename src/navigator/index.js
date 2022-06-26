import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import screens from '../constants/screenNames';
import {NavigationServices} from '../utils';

import HomeContainer from '../screens/home/home.container';
import Splash from '../screens/Splash';

const StackFlow = createStackNavigator();
const MyStack = () => {
  return (
    <StackFlow.Navigator
      initialRouteParams={{transition: 'fade'}}
      initialRouteName={screens.SPLASH}>
      <StackFlow.Screen
        name={screens.SPLASH}
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <StackFlow.Screen
        name={screens.HOME_SCREEN}
        component={HomeContainer}
        options={{
          headerShown: false,
        }}
      />
    </StackFlow.Navigator>
  );
};

const AppContainer = props => {
  const routeNameRef = React.useRef();

  return (
    <NavigationContainer
      ref={NavigationServices.navigationRef}
      onReady={() => {
        routeNameRef.current =
          NavigationServices.navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={state => {}}>
      <MyStack />
    </NavigationContainer>
  );
};

export default AppContainer;
