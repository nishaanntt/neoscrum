import React, { useState } from 'react';
import { 
  Alert, 
  Image, 
  Text, 
  View, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  ScrollView
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';

import {AuthContext} from '../components/Context';

export function Register ({ navigation }) {

  const { signUp } = React.useContext(AuthContext);

  const [regData, setRegData] = React.useState({
    name: '',
    email: '',
    check_nameInputChange: false,
    check_emailInputChange: false,
    isValidName: true,
    isValidImage: true,
    isValidEmail: true,
  });

  const [photo, setPhoto] = useState(null);

  const handleChooseImage = () => {
    let options = {}
    ImagePicker.launchImageLibrary(options ,(response) => {
        console.log(response.uri);
        if (response.uri) {
            setPhoto(response.uri)
        }
    });
}

  const nameInputChange = (val) => {
    if (val.trim().length >= 3) {
      setRegData({
        ...regData,
        name: val,
        check_nameInputChange: true
      });
    } else {
      setRegData({
        ...regData,
        name: val,
        check_nameInputChange: false
      });
    }
  }

  const emailInputChange = (val) => {
    var pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
    if (val.trim().length >= 3 && pattern.test(val)) {
      setRegData({
        ...regData,
        email: val,
        check_emailInputChange: true,
        isValidUser: true,
      });
    } else {
      setRegData({
        ...regData,
        email: val,
        check_emailInputChange: false,
        isValidEmail: false,
      });
    }
  }

  const registerHandle = () => {
    if(regData.email.trim().length == 0 || regData.name.trim().length == 0) {
      Alert.alert('Invalid Input!', 'Employee Name or Email cannot be empty', [
        {text: 'Okay'}
      ]);
      return;
    }
    signUp();
  }

  const pressHandler = () => {
    navigation.pop()
  }

  return (
    <View style={styles.container}>
    <ScrollView style={styles.scrollView}>
      <View>
        <Feather 
          name='x-circle'
          style={styles.modalClose}
          color='#2b2b2b'
          size={24}
          onPress={pressHandler}
        />
      </View>

      {/* Page Header */}
      <View style={styles.header}>
        <Image 
            source={require('../images/neoscrumLogo.png')}
        />
        <Text
          style={styles.title}
        >
          ENTER A NEW DEVELOPER
        </Text>
      </View>
      {/* Page Header End */}

      {/* User Image */}
        {photo != null ?
            <Image 
              elevation={8}
              source={{uri: photo}}
              style={{width:120, height:120,alignSelf:'center',borderRadius:60,resizeMode:'cover', marginBottom: 24,}}
            /> 
            : 
            <Image
              elevation={10}
              source={require('../images/profilePic2.jpeg')}
              style={{width:120, height:120,alignSelf:'center',borderRadius:60,resizeMode:'cover', marginBottom: 24,}}
            />
        }
      {/* User Image End */}

      <View style={styles.body}>
        <Text style={styles.fieldTitle}>Employee Name</Text>
        <View style={styles.action}>
          <Feather
            name='user'
            color='#2b2b2b'
            size={20}
          />
          <TextInput 
            style={styles.input} 
            placeholder='Enter Name'
            onChangeText={(val) => nameInputChange(val)}
          />
          { regData.check_nameInputChange ?
          <Animatable.View
            animation='bounceIn'
          >
            <Feather 
              name='check-circle'
              color='green'
              size={20}
            />
          </Animatable.View>
          : null }
        </View>

        <Text style={styles.fieldTitle}>Email</Text>
        <View style={styles.action}>
          <Feather
            name='mail'
            color='#2b2b2b'
            size={20}
          />
          <TextInput 
            style={styles.input} 
            placeholder='Enter Email'
            keyboardType='email-address'
            autoCapitalize='none'
            onChangeText={(val) => emailInputChange(val)}
          />
          { regData.check_emailInputChange ?
          <Animatable.View
            animation='bounceIn'
          >
            <Feather 
              name='check-circle'
              color='green'
              size={20}
            />
          </Animatable.View>
          : null }
        </View>

        <TouchableOpacity
          style={styles.imageButton}
          onPress={handleChooseImage}
        >
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => {registerHandle(regData.name, regData.email)}}
        >
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.pop()}
        >
          <Text style={styles.textButtonText}>Already a User? Login Here!</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  scrollView: {
    marginHorizontal: 20 
  },
  header: {
    marginTop: 30,
    alignItems: 'center',
  },
  modalClose: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  title: {
    fontSize: 24,
    marginVertical: 18,
  },
  body: {
    width: '100%',
  },
  fieldTitle: {
    fontSize: 18,
    color: '#8e0101'
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    marginTop: -10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    color: '#707070',
  },
  loginButton: {
    elevation: 10,
    marginVertical: 32,
    backgroundColor: '#1A1A1A',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    letterSpacing: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  imageButton: {
    elevation: 10,
    padding: 15,
    marginVertical: 10,
    width: '50%',
    backgroundColor: '#1A1A1A',
    alignItems: 'center'
  },
  textButtonText: {
    color: '#8e0101',
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 32,
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
  },
})