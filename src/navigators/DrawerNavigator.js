import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { TabNavigator } from '../navigators/TabNavigator';
import { Dashboard } from '../screens/Dashboard'
import AddFeedback from '../screens/AddFeedback';

const Drawer = createDrawerNavigator()

export default class DrawerNavigator extends Component {
    render() {
        return (
            <Drawer.Navigator initialRouteName="Dashboard">
                <Drawer.Screen name="Dashboard" component={Dashboard} />
                <Drawer.Screen name="Add Feedback" component={AddFeedback} />
            </Drawer.Navigator>
        )
    }
}