import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage from the correct package
import axios from 'axios';

export const BASE_URL = 'https://alharamstores.com/rest/V1/api/';
let savedToken;

export const loginAPI = async (email, password, store_id, token) => {
  console.log('User:', email);
  console.log('Password:', password);
  console.log('Store_id:', store_id);
  console.log('Token:', token);

  try {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    formData.append('store_id', store_id);

    const response = await axios.post(`${BASE_URL}loginUser`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;
    console.log('API Response:', data);

    if (data && data.status && data.status.data) {
      const { email, token, store_id } = data.status.data;
      console.log('Token:', token);

      // Store the token in AsyncStorage
      await AsyncStorage.setItem('userToken', token);

      // Rest of the user data can be stored if needed
      await AsyncStorage.setItem('userData', JSON.stringify({ email, store_id }));

      return {
        user: email,
        token: token,
        store_id: store_id,
        success: true,
      };
    } else {
      console.error('Invalid response structure:', data);
      throw new Error('Invalid response structure');
    }
  } catch (error) {
    console.error('Login failed:', error.message);
    throw new Error('Login failed');
  }
};





export const registerAPI = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}mobileOtpRegistrationMethod`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
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