import React from "react";
import "./Reservation.css";

const Reservation = () => {
    return (
        <div className="reservation-container">
            <h1 className="reservation-heading">Reserve Your Parking Slot Using 3 Simple Steps</h1>

            <div className="reservation-steps">
                <div className="step-item">
                    <img src="images/r-1.jpeg" alt="Step 1" className="step-img" />
                    <h3 className="step-title">1. Select a Slot</h3>
                    <p className="step-description">Choose an available parking space</p>
                </div>
                
                <div className="step-item">
                    <img src="images/r-2.jpeg" alt="Step 2" className="step-img" />
                    <h3 className="step-title">2. Confirm Date & Time</h3>
                    <p className="step-description">Verify and finalize your booking schedule</p>
                </div>
                
                <div className="step-item">
                    <img src="images/r-3.jpeg" alt="Step 3" className="step-img" />
                    <h3 className="step-title">3. Complete Payment</h3>
                    <p className="step-description">Make the payment to secure your reservation</p>
                </div>
            </div>
            
            <button className="reservation-button">Book Now</button>
        </div>
    );
};

export default Reservation;