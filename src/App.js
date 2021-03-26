import React, {useEffect} from 'react';
import { View } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { lightTheme } from './themes/light';
import { ActivityIndicator } from 'react-native-paper';
import { AuthContext } from './components/Context'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AuthStackNavigator} from './navigators/AuthStackNavigator';
import { TabNavigator } from './navigators/TabNavigator';
import DrawerNavigator from './navigators/DrawerNavigator';

const RootStack = createStackNavigator();

export default function App () {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch ( action.type ) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].email;
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGIN', id: userName, token: userToken })
    },
    signOut: async() => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' })
    },
    signUp: () => {
    },
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000)
  }, [])

  if( loginState.isLoading ) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
      }}> 
        <ActivityIndicator size='large' color='#bc0000' />
      </View>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={lightTheme}>
        { loginState.userToken !== null ? (
          <DrawerNavigator />
          //<TabNavigator />
        )
        : 
          <RootStack.Navigator screenOptions={{ headerShown: false, }}>
              <RootStack.Screen name={'AuthStack'} component={AuthStackNavigator} />
          </RootStack.Navigator>
        }
      </NavigationContainer>
    </AuthContext.Provider>
  )
}