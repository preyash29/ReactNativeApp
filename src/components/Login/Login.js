import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
import {setLogin} from '../../redux/auth/authSlice';
import {loginAPI} from '../../redux/auth/authApi';
import {useDispatch} from 'react-redux'; // Import the useDispatch hook
import AsyncStorage from '@react-native-async-storage/async-storage';
// const Login = () => {
const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [store_id, setstoreId] = useState('1');
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Sign In With Email');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpResponse, setOtpResponse] = useState(null);
  const [error, setError] = useState(null);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const mobileNumberRef = useRef(null);

  const validateEmail = (email) => {
    // Use a regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const validatePassword = (password) => {
    // Add your password validation logic here
    // For example, you can check if the password meets certain criteria
    return password.length >= 6; // Minimum 6 characters for this example
  };



  const renderTab = tabName => {
    const isSelected = selectedTab === tabName;

    return (
      <TouchableOpacity
        key={tabName}
        style={[styles.tabButton, isSelected ? styles.selectedTab : null]}
        onPress={() => setSelectedTab(tabName)}>
        <Text style={[styles.tabText, isSelected ? {color: '#8b0000'} : null]}>
          {tabName}
        </Text>
      </TouchableOpacity>
    );
  };
  // const handleLogin = async () => {
  //   try {
  //     setLoading(true); 
  //     const loginResponse = await loginAPI(email, password, store_id);
  //     if (loginResponse.success) {
  //       console.log('Login successful:', loginResponse.user);
  //       const userToken = await AsyncStorage.getItem('userToken');
  //       console.log('User Token:', userToken);
  //       dispatch(setLogin({ token: userToken }));
  //       navigation.navigate('Tabs');
  //     } else {
  //       console.error('Login failed:', loginResponse);
  //       alert(loginResponse.message || 'Invalid username or password!');
  //     }
  //   } catch (error) {
  //     console.error('API call failed:', error.message);
  //     alert('An error occurred. Please try again later.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleLogin = async () => {
    try {
      setLoading(true);
  
      // Validate email
      if (!validateEmail(email)) {
        setLoading(false);
        return alert('Invalid email address');
      }
  
      // Validate password
      if (!validatePassword(password)) {
        setLoading(false);
        return alert('Invalid password. Minimum 6 characters required');
      }
  
      const loginResponse = await loginAPI(email, password, store_id);
      if (loginResponse.success) {
        console.log('Login successful:', loginResponse.user);
        const userToken = await AsyncStorage.getItem('userToken');
        console.log('User Token:', userToken);
        dispatch(setLogin({ token: userToken }));
        navigation.navigate('Tabs');
      } else {
        console.error('Login failed:', loginResponse);
        alert(loginResponse.message || 'Invalid username or password!');
      }
    } catch (error) {
      console.error('API call failed:', error.message);
      alert('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  const renderTabContent = () => {
    const navigation = useNavigation();
    if (selectedTab === 'Sign In With Email') {
      return (
        <View style={styles.tabContent}>
          <View style={styles.inputContainer}>
            <Image
              source={require('../../assests/iconEmail.png')}
              style={[styles.icon, {marginLeft: 15}]}
            />
            <TextInput
              ref={emailRef}
              style={[styles.input, {color: 'black'}]}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={text => setEmail(text)}
              value={email}
              placeholderTextColor={'black'}
              onSubmitEditing={() => passwordRef.current.focus()}
            />
          </View>

          <View style={styles.inputContainer}>
            <Image
              source={require('../../assests/iconPassword.png')}
              style={[styles.icon, {marginLeft: 15}]}
            />
            <TextInput
              ref={passwordRef}
              style={[styles.input, {color: 'black'}]}
              onChangeText={text => setPassword(text)}
              value={password}
              secureTextEntry={passwordVisibility}
              placeholder="Password"
              placeholderTextColor={'black'}
              onSubmitEditing={() => alert('Forgot Password pressed')}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisibility(!passwordVisibility)}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/3257/3257787.png',
                }}
                style={[
                  styles.icon,
                  {
                    justifyContent: 'flex-end',
                    tintColor: passwordVisibility ? '#8b0000' : '#9ADE7B',
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => alert('Forgot Password pressed')}>
            <Text style={{alignSelf: 'flex-end'}}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rememberMeButton}>
            <Image
              source={require('../../assests/iconChecked.png')}
              style={styles.checkIcon}
            />

            <View />

            <Text style={styles.rememberMeText}>Remember Me</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={handleLogin} style={styles.signInButton}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
          onPress={handleLogin}
          style={[styles.signInButton, loading && styles.signInButtonDisabled]}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.signInButtonText}>Sign In</Text>
          )}
        </TouchableOpacity>
        </View>
        
      );
    } else if (selectedTab === 'Use Mobile No') {
      return (
        <View style={styles.tabContent}>
          <View style={styles.inputContainer}>
            <Image
              source={require('../../assests/cellphone.png')}
              style={styles.icon}
            />
            <TextInput
              style={[styles.input, {color: 'black'}]}
              placeholder="Mobile number"
              keyboardType="phone-pad"
              value={mobileNumber}
              onChangeText={text => setMobileNumber(text)}
              placeholderTextColor={'black'}
            />
          </View>

          <TouchableOpacity onPress={() => alert('Forgot Password pressed')}>
            <Text style={{alignSelf: 'flex-end'}}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInButtonText}>Send OTP</Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '50%',
              }}>
              <View>
                <Image
                  source={require('../../assests/fbimg.png')}
                  style={styles.icon}
                />
              </View>
              <TouchableOpacity onPress={() => signIn()}>
                <Image
                  source={require('../../assests/google.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <Image
                source={require('../../assests/apple.png')}
                style={styles.icon}
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 50,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 17,
              }}>
              New Customer
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#00A300',
              paddingVertical: 7,
              borderRadius: 28,
              alignItems: 'center',
              width: '95%',
              bottom: 40,
              marginHorizontal: 10,
            }}
            onPress={() => navigation.navigate('Registor')}>
            <Text style={styles.signInButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View style={{backgroundColor: '#8b0000', height: '20%'}}></View>

      <View
        style={{
          backgroundColor: '#fff',
          width: (width * 50) / 100,
          height: (height * 15) / 100,
          alignSelf: 'center',
          bottom: '7%',
          justifyContent: 'center',
          borderColor: '#d3d3d3', // Set your desired border color
          borderWidth: 1,

          borderRadius: 20,
        }}>
        <Image
          source={require('../../assests/Logo.png')} // Replace with your splash image path
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={{}}>
        <View style={styles.tabBar}>
          {renderTab('Sign In With Email')}
          {renderTab('Use Mobile No')}
        </View>
        {renderTabContent()}
      </View>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  signInButtonDisabled: {
    backgroundColor: '#ccc', // Set a different color for the disabled state
  },
  buttonContainer: {
    top: 20,
    borderRadius: 20, // Set the border radius to 20
    overflow: 'hidden',
  },
  header: {
    height: '100%',
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  headerred: {
    height: 170,
    // backgroundColor:"red"
    backgroundColor: '#8b0000',
  },
  logocontainer: {
    borderColor: '#d3d3d3', // Set your desired border color
    borderWidth: 2,
    backgroundColor: '#fff',
    borderRadius: 40,
    // width: "75%",
    alignSelf: 'center',
    marginVertical: 70,
    height: '50%',
  },
  logo: {
    alignItems: 'center',
    width: 140, // Set the width of the image as needed
    height: 80,
    marginHorizontal: 20,
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },

  input: {
    width: '80%',
    marginBottom: 15,
    padding: 10,
    borderBottomWidth: 1,
  },
  headerContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 500,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  loginButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  googleButton: {
    backgroundColor: 'red', // You can set your desired color
  },
  facebookButton: {
    backgroundColor: '#1877F2', // Facebook blue color
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'lightgray',
    height: 50,
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderColor: '#8b0000',
    paddingVertical: 15,
  },
  tabText: {
    color: 'black',
    fontSize: 17,
  },

  icon: {
    width: 20,
    height: 20,
    marginRight: 50,
  },
  input: {
    flex: 1,
    height: 40,
    color: 'black',
  },
  tabContent: {
    width: '100%',
    marginVertical: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1, // Border Bottom Width for the underline
    borderBottomColor: 'lightgray', // Border Bottom Color
    // paddingHorizontal: 15,
    marginBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  checkboxPlaceholder: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#007bff',
    marginRight: 10,
  },
  checkIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  rememberMeText: {
    fontSize: 14,
    color: '#000',
  },
  signInButton: {
    backgroundColor: 'red',

    paddingVertical: 7,
    borderRadius: 28,
    alignItems: 'center',
    marginBottom: 20,
    width: '95%',
    marginHorizontal: 10,
    marginVertical: 20,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
