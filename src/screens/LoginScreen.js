import React from 'react';
import { 
  View, 
  StyleSheet, 
  Image, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ScrollView
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';

import { AuthContext } from '../components/Context';
import Users from '../model/Users';

export function LoginScreen ({navigation}) {
  
  const { signIn } = React.useContext(AuthContext);
  
  const [data, setData] = React.useState({
    name: '',
    username: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const textInputChange = (val) => {
    var pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
    if (val.trim().length >= 3 && pattern.test(val)) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  }

  const handlePasswordChange = (val) => {
    if(val.trim().length >= 6){
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
        setData({
          ...data,
          password: val,
          isValidPassword: false,
        });
    }
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  }


  const handleValidUser = (val) => {
    if(val.trim().length >= 6) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
        setData({
          ...data,
          isValidUser: false,
        })
    }
  }

  const loginHandle = (userName, password) => {
    const foundUser = Users.filter( item => {
      return userName == item.email && password == item.password;
    } );

    if(data.username.length == 0 || data.password.length == 0) {
      Alert.alert('Invalid Input!', 'Username or Password field cannot be empty.', [
        {text:'Okay'}
      ]);
      return;
    }

    if(foundUser.length == 0) {
      Alert.alert('Invalid User!', 'Username or Password is incorrect.', [
        {text:'Okay'}
      ]);
      return;
    }
    signIn(foundUser);
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
              <Image 
                  source={require('../images/neoscrumLogo.png')}
              />
            <Text style={[styles.title, {marginTop: 10,}]} >LOGIN</Text>
          </View>

          <View style={styles.body}>
            <Text style={styles.fieldTitle}>Email</Text>
            <View style={styles.action}>
              <Feather
                name='user'
                color='#05375a'
                size={20}
              />
              <TextInput 
                style={styles.input} 
                placeholder='Your Email'
                autoCapitalize='none'
                onChangeText={(val) => textInputChange(val)}
                onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
              />
              { data.check_textInputChange ?
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
            { data.isValidUser ? null :
              <Animatable.View animation='fadeInLeft' duration={500}>
                <Text style={styles.errorMsg}>Please enter a valid email.</Text>
              </Animatable.View>
            }

            <Text style={styles.fieldTitle}>Password</Text>
            <View style={styles.action}>
              <Feather
                name='lock'
                color='#05375a'
                size={20}
              />
              <TextInput 
                style={styles.input} 
                placeholder='Your Password'
                secureTextEntry={data.secureTextEntry ? true : false}
                autoCapitalize='none'
                onChangeText={(val) => handlePasswordChange(val)}
              />
              <TouchableOpacity onPress={updateSecureTextEntry}>
                {data.secureTextEntry ?
                  <Feather 
                    name='eye-off'
                    color='grey'
                    size={20}
                  />
                :
                  <Feather 
                    name='eye'
                    color='grey'
                    size={20}
                  />
                }
              </TouchableOpacity>
            </View>
            { data.isValidPassword ? null :
              <Animatable.View animation='fadeInLeft' duration={500}>
                <Text style={styles.errorMsg}>Password should be at least 6 characters long.</Text>
              </Animatable.View>
            }
          </View>
          
          <View style={styles.buttonGroup}>
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={() => {loginHandle(data.username, data.password)}}
            >
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.textButtonText}>New to Neoscrum? REGISTER NOW!</Text>
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
  title: {
    fontSize: 32,
  },
  body: {
    flex: 1,
    width: '100%',
    marginTop: 60,
  },
  fieldTitle: {
    fontSize: 18,
    color: '#8e0101',
    marginTop: 35,
  },
  action: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    marginTop: -10,
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
  },
  buttonText: {
    letterSpacing: 1,
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  textButtonText: {
    color: '#8e0101',
    fontWeight: '500',
    fontSize: 14,
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
    marginTop: 70,
  },
  errorMsg: {
    color: '#bc0000'
  },
})