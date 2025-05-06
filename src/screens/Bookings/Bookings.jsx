import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Bookings.css";
import Navbar from "../NavBar/NavBar";
import Reservation from "../Reservations/Reservation";
import Footer from "../Footer/Footer";
import { FaCalendarAlt } from "react-icons/fa"; // Import calendar icon
import { renderTicketToHTML } from "../Ticket/helper.tsx";

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
      const [parkingRes, latestRes, reservedRes] = await Promise.all([
        fetch("http://localhost:5001/api/parking/slots"),
        fetch("http://localhost:5001/api/slots/latest-booked-slot"),
        fetch("http://localhost:5001/api/reserved/slots"),
      ]);

      if (!parkingRes.ok || !latestRes.ok || !reservedRes.ok) {
        throw new Error("Failed to fetch one or more data sources");
      }

      const parkingData = await parkingRes.json();
      const latestData = await latestRes.json();
      const reservedData = await reservedRes.json();

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
      console.error("Error fetching data:", error);
      setError(error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 180000);
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

          const slotRes = await fetch(
            `http://localhost:5001/api/reserved/slotNumber/${slotId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          );
          if (!slotRes.ok) {
            console.log("succeeded");
          }

          if (!slotRes.ok) {
            const errorText = await slotRes.text();
            console.error("Error fetching slot:", slotRes.status, errorText);
            throw new Error("Slot not found");
          }

          // if (!slotRes.ok) {
          //   console.log("succeeded");
          // }
          //
          const slotData = await slotRes.json();
          if (!slotData._id) {
            alert("Slot not found. Please try again.");
            return;
          }

          const objectId = slotData._id;
          console.log("Fetched objectId:", objectId);

          const updateRes = await fetch(
            `http://localhost:5001/api/reserved/${objectId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({
                isOccupied: true,
                paymentId: response.razorpay_payment_id,
                timeSlot: selectedTimeSlot,
                bookedAt: bookingDate.toISOString(),
                status: "occupied",
              }),
            },
          );

          if (!updateRes.ok) {
            const errorText = await updateRes.text();
            console.error("Error updating slot:", updateRes.status, errorText);
            throw new Error("Failed to update slot status");
          }

          console.log("Slot successfully updated!");
          await fetchAllData();

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
            console.log("Generated ticket HTML:", ticketHTML);

            await fetch("http://localhost:5001/api/send-email", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                to: userEmail,
                subject: "Booking Confirmation",
                html: ticketHTML,
              }),
            });
          } else {
            console.error("Email not found in localStorage.");
          }
          alert(
            `Payment successful! Your slot has been reserved for ${bookingDate.toLocaleDateString()} ${selectedTimeSlot}`,
          );
        } catch (error) {
          console.error("Payment processing error:", error);
          alert(
            "Payment succeeded but error updating reservation. Contact support.",
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
