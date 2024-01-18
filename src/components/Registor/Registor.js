import React, {useState, useRef} from 'react';
import {
  Dimensions,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {registerAPI} from '../../redux/auth/authApi';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');
const Register = props => {
  const navigation = useNavigation();
  const [responseMessage, setResponseMessage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [ConfirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const focusNextInput = ref => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  };
  const handleRegistration = async () => {
    try {
      if (!validateInputs() || loading) {
        return;
      }
      setLoading(true);
      const userData = {
        mobile: phoneNumber,
        password: password,
        firstname: firstName,
        lastname: lastName,
        email: email,
        otptype: 'register',
        store_id: '1',
        auth: '',
        resend: 'register',
      };
      const response = await registerAPI(userData);
      console.log('API Response:', response.message);
      if (response.status === 'error' && response.message) {
        // console.log('Error Message:', response.message);
        if (response.message.toLowerCase().includes('already registered')) {
          Alert.alert(
            'Registration Error',
            'There is already an account registered with this email.',
          );
          console.log(
            'res',
            response.message.toLowerCase().includes('already registered'),
          );
        } else {
          Alert.alert('Registration Error', response.message);
          console.log('reg err', response.message);
        }
      } else {
        setResponseMessage(response.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert(
        'Registration Error',
        'An unexpected error occurred. Please try again later.',
      );
      setResponseMessage('Error during registration');
    } finally {
      setLoading(false);
    }
  };
  const validateInputs = () => {
    let isValid = true;

    if (!firstName.trim()) {
      setFirstNameError('First name is required');
      isValid = false;
    } else {
      setFirstNameError('');
    }

    if (!lastName.trim()) {
      setLastNameError('Last name is required');
      isValid = false;
    } else {
      setLastNameError('');
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!phoneNumber.trim()) {
      setPhoneNumberError('Mobile number is required');
      isValid = false;
    } else {
      setPhoneNumberError('');
    }

    if (!password.trim()) {
      setPasswordError(
        'Password is required and must be at least 6 characters',
      );
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    return isValid;
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
          borderColor: '#d3d3d3',
          borderWidth: 1,
          borderRadius: 20,
        }}>
        <Image
          source={require('../../assests/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <ScrollView>
        <View style={styles.tabContent}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              fontWeight: '700',
              color: 'black',
              textDecorationLine: 'underline',
            }}>
            CREATE
          </Text>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              fontWeight: '700',
              color: 'black',
              textDecorationLine: 'underline',
            }}>
            YOUR ACCOUNT
          </Text>
          <View style={styles.inputContainer}>
            <Image
              source={require('../../assests/iconUser1.png')}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="First name"
              keyboardType="default"
              onChangeText={text => setFirstName(text)}
              returnKeyType="next"
              onSubmitEditing={() => focusNextInput(lastNameRef)}
              value={firstName}
            />
          </View>
          <Text style={styles.errorText}>{firstNameError}</Text>
          <View style={styles.inputContainer}>
            <Image
              source={require('../../assests/iconUser1.png')}
              style={styles.icon}
            />
            <TextInput
              ref={lastNameRef}
              style={styles.input}
              placeholder="Last name"
              keyboardType="default"
              onChangeText={text => setLastName(text)}
              returnKeyType="next"
              onSubmitEditing={() => focusNextInput(emailRef)}
              value={lastName}
            />
          </View>
          <Text style={styles.errorText}>{lastNameError}</Text>
          <View style={styles.inputContainer}>
            <Image
              source={require('../../assests/iconEmail.png')}
              style={styles.icon}
            />
            <TextInput
              ref={emailRef}
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={text => setEmail(text)}
              returnKeyType="next"
              onSubmitEditing={() => focusNextInput(phoneNumberRef)}
              value={email}
            />
          </View>
          <Text style={styles.errorText}>{emailError}</Text>
          <View style={styles.inputContainer}>
            <Image
              source={require('../../assests/cellphone.png')}
              style={styles.icon}
            />
            <TextInput
              ref={phoneNumberRef}
              style={styles.input}
              placeholder="Mobile number"
              keyboardType="phone-pad"
              onChangeText={text => setPhoneNumber(text)}
              returnKeyType="next"
              onSubmitEditing={() => focusNextInput(passwordRef)}
              value={phoneNumber}
            />
          </View>
          <Text style={styles.errorText}>{phoneNumberError}</Text>
          <View style={styles.inputContainer}>
            <Image
              source={require('../../assests/iconPassword.png')}
              style={styles.icon}
            />
            <TextInput
              ref={passwordRef}
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
              onChangeText={text => setPassword(text)}
              returnKeyType="next"
              onSubmitEditing={() => focusNextInput(confirmPasswordRef)}
              value={password}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.errorText}>{passwordError}</Text>
          <View style={styles.inputContainer}>
            <Image
              source={require('../../assests/iconPassword.png')}
              style={styles.icon}
            />
            <TextInput
              ref={confirmPasswordRef}
              style={styles.input}
              placeholder="Re-enter password"
              secureTextEntry={!showConfirmPassword} // Toggle secureTextEntry based on showConfirmPassword state
              onChangeText={text => setConfirmPassword(text)}
              returnKeyType="done"
              value={confirmPassword}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons
                name={showConfirmPassword ? 'eye-off' : 'eye'}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.errorText}>{ConfirmPasswordError}</Text>
          <TouchableOpacity
            // style={styles.signInButton}
            onPress={handleRegistration}
            style={[
              styles.signInButton,
              loading && styles.signInButtonDisabled,
            ]}
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              // If loading, show a spinner or activity indicator
              <ActivityIndicator size="small" color="white" />
            ) : (
              // If not loading, show the regular Sign Up text
              <Text style={styles.signInButtonText}>Sign Up</Text>
            )}
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 60,
            }}>
            <Text style={{color: 'black', fontSize: 17}}>New Customer</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{
              backgroundColor: '#00A300',
              paddingVertical: 7,
              borderRadius: 28,
              alignItems: 'center',
              width: '95%',
              bottom: 40,
              marginHorizontal: 10,
            }}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  logo: {
    alignItems: 'center',
    width: 140,
    height: 80,
    marginHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingHorizontal: 15,
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
  tabContent: {
    width: '100%',
    backgroundColor: '#fff',
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
  signInButtonDisabled: {
    backgroundColor: '#ccc', // Set a different color for the disabled state
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
});
