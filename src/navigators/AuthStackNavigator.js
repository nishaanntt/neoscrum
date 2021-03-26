import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screens/LoginScreen'
import {Register} from '../screens/Register';

const AuthStack = createStackNavigator();

export function AuthStackNavigator () {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false, }}>
        <AuthStack.Screen name={'LoginScreen'} component={LoginScreen} />
        <AuthStack.Screen name={'Register'} component={Register} />
    </AuthStack.Navigator>
  )
}