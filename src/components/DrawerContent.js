import React, { useState } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer'
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
} from 'react-native-paper'
import Feather from 'react-native-vector-icons/Feather'
import { AuthContext } from '../components/Context';
import Octicons from 'react-native-vector-icons/Octicons'

const DrawerContent = (props) => {
  
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={{flex: 1,}}>
      <DrawerContentScrollView {...props} style={{backgroundColor: '#2b2d42'}}>
        <View style={styles.drawerContent}>
        <View style={styles.userInfo}>
          <View style={{
              flex: 1,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
            }}
          >
            <Avatar.Image 
              source={require('../images/profilePic2.jpeg')}
              size={80}
              style={{borderRadius: 80,}}
            />
            <Title style={styles.title}>Nishant Parashar</Title>
          </View>
        </View>
          <Drawer.Section>
            <DrawerItem
              icon={(color, size) => (
                <Feather 
                  name='home'
                  color='#f0ffff'
                  size={20}
                />
              )}
              label="Dashboard"
              onPress={() => props.navigation.navigate('Dashboard')}
              labelStyle={{color: '#f0ffff'}}
            />
            <DrawerItem
              icon={(color, size) => (
                <Octicons 
                  name='note'
                  color='#f0ffff'
                  size={20}
                />
              )}
              label="Add Feedback"
              onPress={() => props.navigation.navigate('Add Feedback')}
              labelStyle={{color: '#f0ffff'}}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem 
          icon={(color, size) => (
            <Feather 
              name='user'
              color='#1a1a1a'
              size={20}
            />
          )}
          label='Sign Out'
          onPress={() => signOut()}
        />
      </Drawer.Section>
    </View>
  )
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  bottomDrawerSection: {
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  title: {
    color: '#f4f4f4',
    marginTop: 10,
    marginBottom: 20,
  }
})

export default DrawerContent