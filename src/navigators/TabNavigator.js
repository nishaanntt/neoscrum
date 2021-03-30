import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from '../screens/Dashboard'
import AddFeedback from '../screens/AddFeedback';

const Tab = createBottomTabNavigator();

export function TabNavigator () {
    return (
        <Tab.Navigator
            tabBarOptions={{
                style: {
                    backgroundColor: '#eee',
                    paddingBottom: 18,
                    height: 60,
                },
                labelStyle: {
                    fontSize: 14,
                }
            }}
        >
            <Tab.Screen name={'Dashboard'} component={Dashboard} />
            <Tab.Screen name={'Add Feedback'} component={AddFeedback} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    botBar: {
      backgroundColor: '#000',
    },
  })