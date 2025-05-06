import React, { useState, useEffect, useRef } from 'react';
import StylePrimarySmall from "../../components/StylePrimarySmall/StylePrimarySmall.jsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./NavBar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);

    // Function to get user data
    const fetchUser = () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) { 
            const parsedUser = JSON.parse(storedUser);

            // ✅ Generate profile image if missing
            const firstLetter = parsedUser.username?.charAt(0).toUpperCase() || "U";
            const profileImageUrl = parsedUser.profileImage || 
                `https://ui-avatars.com/api/?name=${firstLetter}&background=random&color=fff&size=128`;

            setUser({
                ...parsedUser,
                profileImage: profileImageUrl
            });
        }
    };

    // ✅ Detect scroll and change navbar appearance
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50); // Change navbar when scrolled 50px
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // ✅ Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        fetchUser(); // ✅ Fetch when Navbar mounts

        // ✅ Listen for localStorage changes (fixes issue when data updates)
        window.addEventListener("storage", fetchUser);

        return () => {
            window.removeEventListener("storage", fetchUser);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
    
            // Wait for the scrolling to complete before making adjustments
            setTimeout(() => {
                requestAnimationFrame(() => {
                    if (sectionId === "services") {
                        window.scrollBy({ top: -70, behavior: "smooth" }); // Adjust as needed
                    } else if (sectionId === "aboutus") {
                        window.scrollBy({ top: -50, behavior: "smooth" }); // Adjust as needed
                    }
                });
            }, 700); // Adjust timeout duration to ensure smooth scrolling
        }
    };
    
    // Handlers for specific sections
    const handleHomeClick = () => scrollToSection("home");
    const handleServicesClick = () => scrollToSection("services");
    const handleAboutUsClick = () => scrollToSection("aboutus");

    const handleFillProfile = () =>{
        navigate("/fillprofile", {state: {goToFillProfile: true}});
    }

    return (
        <nav className={`navbar navbar-expand-lg navbar-light ${isScrolled ? "scrolled" : ""}`}>
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img
                        className="navbar-logo"
                        alt="Parkez Logo"
                        src="https://c.animaapp.com/BPgiiEYf/img/parkez-nobg-1.png"
                        style={{ cursor: "pointer" }}
                    />
                </Link>

                {/* Toggle button for mobile view */}
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarContent" 
                    aria-controls="navbarContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar content */}
                <div className="collapse navbar-collapse" id="navbarContent">
                    <div className="navbar-nav  mb-2 mb-lg-0">
                        <div className="nav-item" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                            <span className="nav-link">Home</span>
                        </div>
                        <div className="nav-item" onClick={handleServicesClick} style={{ cursor: 'pointer' }}>
                            <span className="nav-link">Our Services</span>
                        </div>
                        <div className="nav-item" onClick={handleAboutUsClick} style={{ cursor: 'pointer' }}>
                            <span className="nav-link">About Us</span>
                        </div>
                    </div>

                    {/* ✅ Show Profile if Logged In, Otherwise Show Sign Up */}
                    {user ? (
                        <div className="navbar-profile" ref={dropdownRef}>
                            <div className="profile-container">
                                <img 
                                    className="profile-image"
                                    src={user.profileImage || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                                    alt="User Profile"
                                    onClick={() => setDropdownOpen(!dropdownOpen)} // ✅ Toggle dropdown on click
                                />
                                {dropdownOpen && (
                                    <div className="profile-dropdown">
                                        <p className="dropdown-item logout" onClick={handleLogout}>Logout</p>
                                        <p className='dropdown-item fillprofile' onClick={handleFillProfile}>Update Profile</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="navbar-actions" onClick={() => navigate("/signup")}>
                            <StylePrimarySmall
                                className="navbar-signup-button"
                                text="Sign Up"
                            />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;