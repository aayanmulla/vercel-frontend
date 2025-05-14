import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Bookings.css";
import Navbar from "../NavBar/NavBar";
import Reservation from "../Reservations/Reservation";
import Footer from "../Footer/Footer";
import { FaCalendarAlt } from "react-icons/fa";
import { renderTicketToHTML } from "../Ticket/helper.tsx";

// Create consistent API configuration based on environment
const BACKEND_URL = 
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_LOCAL_API_BASE_URL || "http://localhost:5001"
    : process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add request and response interceptors for logging
api.interceptors.request.use(
  (config) => {
    // Add token to headers if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Bookings API Request:", config);
    return config;
  },
  (error) => {
    console.error("Bookings Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Bookings API Response:", response);
    return response;
  },
  (error) => {
    console.error("Bookings Response Error:", error);
    if (error.response) {
      console.error("Error data:", error.response.data);
      console.error("Error status:", error.response.status);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    return Promise.reject(error);
  }
);

// API endpoints
const API_ENDPOINTS = {
  PARKING_SLOTS: "/api/parking/slots",
  LATEST_BOOKED_SLOT: "/api/slots/latest-booked-slot",
  RESERVED_SLOTS: "/api/reserved/slots",
  SLOT_DETAILS: (slotId) => `/api/reserved/slotNumber/${slotId}`,
  UPDATE_RESERVATION: (objectId) => `/api/reserved/${objectId}`,
  SEND_EMAIL: "/api/send-email",
};

const Bookings = () => {
  const [parkingSlots, setParkingSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookedSlotId] = useState(null);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  // Custom input component that shows calendar icon and selected date
  const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
    <div className="custom-date-input" onClick={onClick} ref={ref}>
      <FaCalendarAlt className="calendar-icon" />
      {value && <span className="selected-date">{value}</span>}
    </div>
  ));

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Use Promise.all with the new API setup
      const [parkingRes, latestRes, reservedRes] = await Promise.all([
        api.get(API_ENDPOINTS.PARKING_SLOTS),
        api.get(API_ENDPOINTS.LATEST_BOOKED_SLOT),
        api.get(API_ENDPOINTS.RESERVED_SLOTS),
      ]);

      const parkingData = parkingRes.data;
      const latestData = latestRes.data;
      const reservedData = reservedRes.data;

      const parkingSlots = parkingData.parkingSlots || [];
      const reservedSlots = reservedData.parkingSlots || [];
      const latestBookedSlotId = latestData.latestBookedSlotId;

      const reservedMap = new Map(reservedSlots.map((slot) => [slot.id, slot]));

      const updatedSlots = parkingSlots.map((slot) => {
        if (reservedMap.has(slot.id)) {
          return reservedMap.get(slot.id); // Use reserved slot data (includes timeSlot)
        }
        return slot;
      });

      if (latestBookedSlotId) {
        const slotIndex = updatedSlots.findIndex(
          (slot) => slot.id === latestBookedSlotId,
        );
        if (slotIndex !== -1) {
          updatedSlots[slotIndex] = {
            ...updatedSlots[slotIndex],
            isOccupied: true,
            status: "occupied",
          };
        } else {
          updatedSlots.push({
            id: latestBookedSlotId,
            isOccupied: true,
            status: "occupied",
          });
        }
      }

      setParkingSlots(updatedSlots);
      return updatedSlots;
    } catch (error) {
      console.error("Error fetching booking data:", error);
      setError("Failed to load parking slots. Please try again later.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 180000); // Refresh every 3 minutes
    return () => clearInterval(interval);
  }, []);

  const handlePayment = async (slotId) => {
    const bookingDate = selectedDate || new Date();

    if (!selectedTimeSlot) {
      alert("Please select a time slot before proceeding with payment.");
      return;
    }

    const options = {
      key: "rzp_test_8aHz8s9WnoELui",
      amount: 50 * 100,
      currency: "INR",
      name: "ParkEz",
      description: `Parking Slot Payment: ${bookingDate.toLocaleDateString()} ${selectedTimeSlot}`,
      handler: async function (response) {
        try {
          console.log("Fetching slot details for slotId:", slotId);

          // Get slot details
          const slotRes = await api.get(API_ENDPOINTS.SLOT_DETAILS(slotId));
          const slotData = slotRes.data;
          
          if (!slotData._id) {
            alert("Slot not found. Please try again.");
            return;
          }

          const objectId = slotData._id;
          console.log("Fetched objectId:", objectId);

          // Update the reserved slot
          await api.patch(
            API_ENDPOINTS.UPDATE_RESERVATION(objectId),
            {
              isOccupied: true,
              paymentId: response.razorpay_payment_id,
              timeSlot: selectedTimeSlot,
              bookedAt: bookingDate.toISOString(),
              status: "occupied",
            }
          );

          console.log("Slot successfully updated!");
          await fetchAllData();

          // Send confirmation email
          const user = JSON.parse(localStorage.getItem("user"));
          const userEmail = user?.email;

          if (userEmail) {
            const bookingData = {
              slotId: slotId,
              date: bookingDate.toLocaleDateString(),
              timeSlot: selectedTimeSlot,
              paymentId: response.razorpay_payment_id,
            };
            const ticketHTML = renderTicketToHTML(bookingData);
            
            await api.post(API_ENDPOINTS.SEND_EMAIL, {
              to: userEmail,
              subject: "Booking Confirmation",
              html: ticketHTML,
            });
          } else {
            console.error("Email not found in localStorage.");
          }
          
          alert(
            `Payment successful! Your slot has been reserved for ${bookingDate.toLocaleDateString()} ${selectedTimeSlot}`
          );
        } catch (error) {
          console.error("Payment processing error:", error);
          alert(
            "Payment succeeded but error updating reservation. Contact support."
          );
        }
      },
      prefill: {
        name: "Aayan Mulla",
        email: "aayanmulla10@gmail.com",
        contact: "7083076077",
      },
      theme: {
        color: "#3399cc",
      },
    };

    try {
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error opening payment dialog:", error);
      alert("Failed to initialize payment. Please try again.");
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlotId(null);
    setSelectedTimeSlot("");
  };

  return (
    <div className="bookings-container">
      <Navbar />
      <div className="bookings-content">
        <h1 className="bookings-heading">Ajeenkya DY Patil Parking Zone</h1>

        {loading ? (
          <p>Loading parking slots...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div>
            <div className="date-picker-container">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                minDate={new Date()}
                customInput={<CustomDateInput />}
                dateFormat="MMMM d, yyyy"
                placeholderText=""
                withPortal
              />
            </div>

            <div className="bookings-grid">
              {parkingSlots.map((slot) => {
                const isOccupied = slot.isOccupied || bookedSlotId === slot.id;

                return (
                  <div
                    key={slot.id}
                    className={`parking-slot ${
                      slot.isOccupied === null
                        ? "under-construction"
                        : isOccupied
                          ? "occupied"
                          : "available"
                    }`}
                    onClick={() => {
                      if (!slot.isOccupied && slot.isOccupied !== null) {
                        setSelectedSlotId(slot.id);
                      }
                    }}
                  >
                    <span>Slot {slot.id}</span>
                    <span>
                      {slot.isOccupied === null
                        ? "Under Construction"
                        : isOccupied
                          ? slot.timeSlot
                            ? `Booked for ${slot.timeSlot}`
                            : "Occupied"
                          : "Available"}
                    </span>

                    {selectedSlotId === slot.id && !isOccupied && (
                      <div className="time-slot-selection">
                        <label>Select Time Slot:</label>
                        <select
                          value={selectedTimeSlot}
                          onChange={(e) => setSelectedTimeSlot(e.target.value)}
                        >
                          <option value="">-- Select --</option>
                          <option value="9 AM - 12 PM">9 AM - 12 PM</option>
                          <option value="12 PM - 3 PM">12 PM - 3 PM</option>
                          <option value="3 PM - 6 PM">3 PM - 6 PM</option>
                          <option value="6 PM - 9 PM">6 PM - 9 PM</option>
                        </select>
                        <button onClick={() => handlePayment(slot.id)}>
                          Book Now
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <Reservation />
      <Footer />
    </div>
  );
};

export default Bookings;