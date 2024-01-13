import React, { useState, useRef } from 'react';
import { Dimensions, View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { registerAsync, selectRegisterMessage, selectRegisterStatus } from '../../redux/auth/registerSlice';

const { width, height } = Dimensions.get('window');

const Register = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const registerMessage = useSelector(selectRegisterMessage);
  const registerStatus = useSelector(selectRegisterStatus);

  const focusNextInput = (ref) => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  };

  const validateInputs = () => {
    // Implement your validation logic here
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Invalid email address');
      return false;
    }

    setEmailError('');
    return true;
  };

  const handleRegister = async () => {
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setPhoneNumberError('');
    setPasswordError('');
    setConfirmPasswordError('');

    const isInputsValid = validateInputs();

    if (isInputsValid) {
      const userData = {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        confirmPassword,
      };

      try {
        await dispatch(registerAsync(userData));
        console.log('Registration message ---:', registerMessage);
        console.log('Registration status:', registerStatus);
      } catch (error) {
        console.error('Registration error:', error.message);
      }
    }
  };

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <View style={{ backgroundColor: '#8b0000', height: '20%' }}></View>
      <View style={{
        backgroundColor: '#fff',
        width: width * 50 / 100,
        height: height * 15 / 100,
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
          <Text style={{
            fontSize: 25,
            textAlign: 'center', fontWeight: '700', color: 'black', textDecorationLine: 'underline'
          }}>
            CREATE
          </Text>
          <Text style={{
            fontSize: 25,
            textAlign: 'center', fontWeight: '700', color: 'black', textDecorationLine: 'underline',
          }}>
            YOUR ACCOUNT
          </Text>
          <View style={styles.inputContainer}>
            <Image source={require('../../assests/iconUser1.png')} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="First name"
              keyboardType="default"
              onChangeText={(text) => setFirstName(text)}
              returnKeyType="next"
              onSubmitEditing={() => focusNextInput(lastNameRef)}
            />
          </View>
          <Text style={styles.errorText}>{firstNameError}</Text>
          <View style={styles.inputContainer}>
            <Image source={require('../../assests/iconUser1.png')} style={styles.icon} />
            <TextInput
              ref={lastNameRef}
              style={styles.input}
              placeholder="Last name"
              keyboardType="default"
              onChangeText={(text) => setLastName(text)}
              returnKeyType="next"
              onSubmitEditing={() => focusNextInput(emailRef)}
            />
          </View>
          <Text style={styles.errorText}>{lastNameError}</Text>
          <View style={styles.inputContainer}>
            <Image source={require('../../assests/iconEmail.png')} style={styles.icon} />
            <TextInput
              ref={emailRef}
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
              returnKeyType="next"
              onSubmitEditing={() => focusNextInput(phoneNumberRef)}
            />
          </View>
          <Text style={styles.errorText}>{emailError}</Text>
          <View style={styles.inputContainer}>
            <Image source={require('../../assests/cellphone.png')} style={styles.icon} />
            <TextInput
              ref={phoneNumberRef}
              style={styles.input}
              placeholder="Mobile number"
              keyboardType="phone-pad"
              onChangeText={(text) => setPhoneNumber(text)}
              returnKeyType="next"
              onSubmitEditing={() => focusNextInput(passwordRef)}
            />
          </View>
          <Text style={styles.errorText}>{phoneNumberError}</Text>
          <View style={styles.inputContainer}>
            <Image source={require('../../assests/iconPassword.png')} style={styles.icon} />
            <TextInput
              ref={passwordRef}
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
              returnKeyType="next"
              onSubmitEditing={() => focusNextInput(confirmPasswordRef)}
            />
          </View>
          <Text style={styles.errorText}>{passwordError}</Text>
          <View style={styles.inputContainer}>
            <Image source={require('../../assests/iconPassword.png')} style={styles.icon} />
            <TextInput
              ref={confirmPasswordRef}
              style={styles.input}
              placeholder="Re-enter password"
              secureTextEntry
              onChangeText={(text) => setConfirmPassword(text)}
              returnKeyType="done"
            />
          </View>
          <Text style={styles.errorText}>{confirmPasswordError}</Text>
          <TouchableOpacity style={styles.signInButton} onPress={() => handleRegister()}>
            <Text style={styles.signInButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 60 }}>
            <Text style={{ color: 'black', fontSize: 17 }}>New Customer</Text>
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
           >
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