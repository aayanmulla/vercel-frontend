import React from "react";
import IconFacebook from "../../icons/IconFacebook/IconFacebook.jsx";
import IconInstagram from "../../icons/IconInstagram/IconInstagram.jsx";
import IconLinkedin from "../../icons/IconLinkedin/IconLinkedin.jsx";
import IconX from "../../icons/IconX/IconX.jsx";
import IconYoutube1 from "../../icons/IconYoutube1/IconYoutube1.jsx";
import "../Footer/Footer.css";

const Footer = () => {
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
    
    const handleServicesClick = () => scrollToSection("services");
    const handleAboutUsClick = () => scrollToSection("aboutus");

    return (
        <footer className="footer">
            {/* Logo Section */}
            <img
                className="footer-logo"
                alt="ParkEz Logo"
                src="https://c.animaapp.com/BPgiiEYf/img/parkez-nobg-2@2x.png"
            />

            {/* Footer Content */}
            <div className="footer-content">
                {/* Contact & Social Media */}
                <div className="footer-contact">
                    {/* Address */}
                    <div className="footer-address">
                        <h3 className="footer-title">Address:</h3>
                        <p className="footer-text">
                            ADYPSOE, Lohegaon, Pune - 412105
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="footer-contact-details">
                        <h3 className="footer-title">Contact:</h3>
                        <p className="footer-text">
                            1800 123 4567
                        </p>
                        <p className="footer-text">
                            info@parkez.in
                        </p>
                    </div>
                    
                    {/* Social Media Links */}
                    <div className="footer-social-icons">
                        <IconFacebook className="w-6 h-6 transition-transform transform hover:scale-110" />
                        <IconInstagram className="w-6 h-6 transition-transform transform hover:scale-110" />
                        <IconX className="w-6 h-6 transition-transform transform hover:scale-110" />
                        <IconLinkedin className="w-6 h-6 transition-transform transform hover:scale-110" />
                        <IconYoutube1 className="w-6 h-6 transition-transform transform hover:scale-110" />
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="footer-links">
                    <div className="footer-links-column">
                        <p className="footer-link">Contact Us</p>
                        <p className="footer-link" onClick={handleAboutUsClick}>About Us</p>
                        <p className="footer-link" onClick={handleServicesClick}>Services</p>
                        <p className="footer-link">Support</p>
                        <p className="footer-link">Blog</p>
                    </div>

                    <div className="footer-links-column">
                        <p className="footer-link">FAQs</p>
                        <p className="footer-link">Careers</p>
                        <p className="footer-link">Feedback</p>
                        <p className="footer-link">Partners</p>
                        <p className="footer-link">Events</p>
                    </div>
                </div>
            </div>

            {/* Footer Bottom Section */}
            <div className="footer-bottom">
                <hr />
                <div className="footer-bottom-content">
                    <p>© 2024 ParkEz. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <p className="footer-bottom-link">Privacy Policy</p>
                        <p className="footer-bottom-link">Terms of Service</p>
                        <p className="footer-bottom-link">Cookies Settings</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;