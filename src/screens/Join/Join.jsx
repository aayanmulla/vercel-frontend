import React from 'react';
import "./Join.css";
const Join = () => {
    return (
        <div className="Cta">
            <div className="column-5">
                <div className="div-3">
                    <div className="heading-4">Join the Parking Revolution</div>
                    <p className="text-4">
                        Experience hassle-free parking with our innovative solutions
                        tailored for urban environments.
                    </p>
                </div>

                <div className="actions-2">
                    <div className="form">
                        <input
                            type="email"
                            placeholder="Your Email Here"
                            className="email-input"
                        />
                        <button className="submit-button">Get Started</button>
                    </div>

                    <p className="by-clicking-sign-up">
                        By clicking Get Started, you agree to our Terms and Conditions.
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Join;