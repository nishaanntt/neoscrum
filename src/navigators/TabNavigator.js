import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Dashboard } from '../screens/Dashboard'
import AddFeedback from '../screens/AddFeedback';

const Tab = createMaterialBottomTabNavigator();

export function TabNavigator () {
    return (
        <Tab.Navigator barStyle={styles.botBar}>
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