import React from "react";
import "./Ticket.css";

const Ticket = () => {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <div className="ticket-image"></div>
        <div className="ticket-info">
          <h2>Slot P1</h2>
          <p>
            ParkEz Parking Space,
            <br />
            Ajeenkya DY Patil College,
            <br />
            Lohegaon, Pune
          </p>
          <p className="date">Friday, 29 November</p>
          <p className="time">4:00 PM to 5:00 PM</p>
        </div>
      </div>

      <button className="ticket-button">
        Tap for support, details & more actions
      </button>

      <p className="booking-id">
        Booking ID: <strong>AP119425</strong>
      </p>

      <div className="ticket-cancel">
        Cancellation unavailable: cut-off time of 20 minutes before showtime has
        passed
      </div>

      <div className="ticket-amount">
        <strong>Total Amount: Rs. 50</strong>
      </div>
    </div>
  );
};
export default Ticket;
