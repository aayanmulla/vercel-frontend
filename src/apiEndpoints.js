const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? process.env.REACT_APP_LOCAL_API_BASE_URL 
  : process.env.REACT_APP_API_BASE_URL;

const API_ENDPOINTS = {
    SIGNUP: `${API_BASE_URL}/api/signup`,           // Signup (Send OTP)
    VERIFY_OTP: `${API_BASE_URL}/api/signup/verifyOTP`,  // OTP Verification
    LOGIN: `${API_BASE_URL}/api/login`,       // Login
    FORGOT_PASSWORD: `${API_BASE_URL}/api/auth/forgot-password`, // Forgot Password
};

console.log("API_BASE_URL:", API_BASE_URL);
console.log("NODE_ENV:", process.env.NODE_ENV);


export default API_ENDPOINTS;
