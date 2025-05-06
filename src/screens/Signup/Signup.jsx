import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";
import API_ENDPOINTS from "../../apiEndpoints";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        retypepassword: "",
    });

    const [otp, setOtp] = useState("");
    const [showOtpField, setShowOtpField] = useState(false);
    const [error, setError] = useState("");
    // const [emailVerified, setEmailVerified] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // ✅ Password validation regex
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
        // ✅ Check if password meets the criteria
        if (!passwordRegex.test(formData.password)) {
            alert("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.");
            return;
        }
    
        // ✅ Check if passwords match
        if (formData.password !== formData.retypepassword) {
            alert("Passwords do not match!");
            return;
        }
    
        try {
            // Send OTP to email
            const response = await axios.post(API_ENDPOINTS.SIGNUP, {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                retypepassword: formData.retypepassword
            });
    
            if (response.status === 200) {
                alert("OTP sent to your email. Please verify.");
                setShowOtpField(true); // Show OTP input field
            }
        } catch (error) {
            setError(error.response?.data?.msg || "Signup failed.");
        }
    };
    

    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post(API_ENDPOINTS.VERIFY_OTP, {
                email: formData.email,
                otp: otp,
                username: formData.username,
                password: formData.password,
            });
    
            if (response.status === 201) {
                alert("Email verified successfully! Account created.");
                // ✅ Get the first letter of the username
                const firstLetter = formData.username.charAt(0).toUpperCase();

                // ✅ Assign profile image
                const profileImageUrl = response.data.user.profileImage || 
                    `https://ui-avatars.com/api/?name=${firstLetter}&background=random&color=fff&size=128`;

         
                // ✅ Ensure user data is set properly
                // ✅ Store user data in localStorage
                const userData = {
                    username: response.data.user.username,
                    profileImage: profileImageUrl,  // ✅ Assign generated/returned profile image
                };
      
                localStorage.setItem("user", JSON.stringify(userData));
                localStorage.setItem("token", response.data.token);
    
                // ✅ Check if data is stored correctly
                console.log("Stored User:", localStorage.getItem("user"));
    
                // ✅ Notify other components of change
                window.dispatchEvent(new Event("storage"));
    
                navigate("/bookings"); // Redirect after successful signup
            }
        } catch (error) {
            setError(error.response?.data?.msg || "Invalid OTP. Try again.");
        }
    };
   
    
    
    
    return (
        <div className="signup-container">
            <div className="signup-card">
                <h1 className="logo">ParkEz</h1>
                <div className="top-right-links">
                    <span>New User? <a href="/login">Login</a></span>
                </div>
                <p>Register to continue</p>

                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            name="username"
                            placeholder="Full Name"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Id"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="retypepassword"
                            placeholder="Confirm Password"
                            value={formData.retypepassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {!showOtpField ? (
                        <button type="submit" className="signup-button">
                            SIGN UP
                        </button>
                    ) : (
                        <>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="button" className="signup-button" onClick={handleVerifyOtp}>
                                Verify OTP
                            </button>
                        </>
                    )}

                    {error && <p className="error-text">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Signup;
