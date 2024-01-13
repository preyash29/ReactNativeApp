export const BASE_URL = 'https://alharamstores.com/rest/V1/api/';

// export const loginAPI = async (email, password) => {
//   try {
//     // Simulating a login request, replace this with your actual login logic
//     const response = await fetch(`${BASE_URL}loginUser`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email: email,
//         password: password,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error('Invalid credentials');
//     }

//     const data = await response.json();
//     console.log('API Response:', data);

//     return {
//       user: data.user, 
//       token: data.token, 
//     };
//   } catch (error) {
//     console.error('Login failed:', error.message);
//     throw new Error('Login failed:---');
//   }
// };
export const loginAPI = async (email, password, token) => {
  console.log('User:', email);
  console.log('Token:', token);

  try {
    const response = await fetch(`${BASE_URL}loginUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    console.log("API Response:", data); // Log the entire API response

    // Check if the response has the expected structure
    if (data && data.status && data.status.data) {
      // Extract user and token from the response
      const { email, token } = data.status.data;
      console.log("token--",data)

      return {
        user: email,
        token: token,
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
