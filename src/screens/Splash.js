import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationServices} from '../utils';
import React, {Component} from 'react';
import {View} from 'react-native';
import screens from '../constants/screenNames';
import AnimatedLottieView from 'lottie-react-native';
import {splashScreen} from '../assets/images';
import colors from '../constants/colors';
import {StyleSheet} from 'react-native';

const Splash = () => {
  const onAnimationFinish = () => {
    NavigationServices.replace(screens.HOME_SCREEN);
  };

  return (
    <View style={styles.view}>
      <AnimatedLottieView
        source={splashScreen}
        autoPlay
        loop={false}
        speed={1.05}
        onAnimationFinish={onAnimationFinish}
      />
    </View>
  );
};

export default Splash;
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: colors.green,
  },
});
