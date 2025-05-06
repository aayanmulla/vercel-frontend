import React, { useEffect } from "react";

const Payments = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => console.log("Razorpay SDK Loaded!");
        document.body.appendChild(script);
    }, []);

    const handlePayment = async () => {
        const options = {
            key: "rzp_test_BXkN5c2xpZvM66", // Replace with your Razorpay Test Key
            amount: 500 * 100, // Amount in paisa (500 INR)
            currency: "INR",
            name: "Your Company",
            description: "Test Transaction",
            order_id: "order_Q6N3TE8XjxAYHl", // Replace with actual order ID
            handler: function (response) {
                alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                console.log(response);
            },
            prefill: {
                name: "Karan Paigude",
                email: "karan@example.com",
                contact: "9999999999"
            },
            notes: {
                address: "Dy patil college, Pune"
            },
            theme: {
                color: "#3399cc"
            }
        };

        if (!window.Razorpay) {
            alert("Razorpay SDK failed to load. Check your internet connection.");
            return;
        }

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    return (
        <div>
            <h1>Payments</h1>
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default Payments;
