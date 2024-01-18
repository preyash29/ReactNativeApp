import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const BASE_URL = 'https://alharamstores.com/rest/V1/api/';

export const loginAPI = async (email, password, store_id) => {
  console.log('User:', email);
  console.log('Password:', password);
  console.log('Store_id:', store_id);

  try {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    formData.append('store_id', store_id);
    console.log('Form Data:', formData); // Log the form data

    const response = await axios.post(`${BASE_URL}loginUser`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const data = response.data;
    console.log('API Response:', data);

    if (data && data.data && data.data) {
      const { email, token } = data.data;
      console.log('Token:', token);

      // Store the token in AsyncStorage
      await AsyncStorage.setItem('userToken', token);
      console.log('Token stored in AsyncStorage:', token);

      // Rest of the user data can be stored if needed
      await AsyncStorage.setItem('userData', JSON.stringify({ email, store_id }));

      return {
        user: email,
        store_id: store_id,
        success: true,
      };
    } else {
      console.error('Invalid response structure:--------------', data);
      throw new Error('Invalid response structure=========');
    }
  } catch (error) {
    console.error('Login failed====:', error.message);
    throw new Error('Login failed');
  }
};

// export const registerAPI = async (userData) => {
//   try {
//     const response = await fetch(`${BASE_URL}mobileOtpRegistrationMethod`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userData),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Registration failed');
//     }

//     const responseData = await response.json();
//     return responseData;
//   } catch (error) {
//     throw error;
//   }
// };
export const registerAPI = async (userData) => {
  try {
    const formData = new FormData();
    formData.append('mobile', userData.mobile);
    formData.append('firstname', userData.firstname);
    formData.append('lastname', userData.lastname);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    formData.append('otptype', userData.otptype);
    formData.append('store_id', userData.store_id);
    formData.append('auth', userData.auth);
    formData.append('resend', userData.resend);
console.log("form data:",formData);
    const response = await fetch(`${BASE_URL}mobileOtpRegistrationMethod`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};