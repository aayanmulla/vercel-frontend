import React, { useState } from "react";
import StyleSecondaryWrapper from "../../components/StyleSecondaryWrapper/StyleSecondaryWrapper.jsx";
import "./FAQ.css";

const FAQ = () => {
  // State to track which FAQ item is open
  const [activeIndex, setActiveIndex] = useState(null);

  // Toggle FAQ item
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // FAQ data
  const faqItems = [
    {
      question: "What is ParkEz?",
      answer: "ParkEz is an innovative parking management solution that simplifies the process of finding and booking parking spaces. Our system leverages IoT and cloud technology to provide real-time availability and efficient management. Experience seamless urban parking with ParkEz."
    },
    {
      question: "How to book slots?",
      answer: "Booking a parking slot is easy with ParkEz. Simply search for your desired location, select an available slot, and complete the booking process online. You'll receive a confirmation and details about your reservation."
    },
    {
      question: "Are EV stations available?",
      answer: "Yes, ParkEz offers EV charging stations at select locations. You can easily find these stations while searching for parking. Enjoy the convenience of charging your electric vehicle while you park."
    },
    {
      question: "What if no slots?",
      answer: "If no parking slots are available, you will receive a notification indicating that the location is full. We recommend checking back later or exploring alternative nearby locations. Our system is designed to keep you informed."
    },
    {
      question: "How to contact support?",
      answer: "You can contact our support team through the 'Contact' section on our website. We are here to assist you with any inquiries or issues you may have. Your satisfaction is our priority."
    }
  ];

  return (
    <div className="FAQ">
      <div className="container-3">
        <div className="section-title-2">
          <div className="heading-5">FAQs</div>
          <p className="text-5">
            Find answers to common questions about our innovative parking
            solutions and services.
          </p>
        </div>

        <div className="accordion-list">
          {faqItems.map((item, index) => (
            <div className="faq-div-4" key={index}>
              <div 
                className="question" 
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
              >
                <div className="question-2">{item.question}</div>
                <img
                  className="icon"
                  alt="Toggle icon"
                  src="https://c.animaapp.com/BPgiiEYf/img/icon-4.svg"
                  style={{ 
                    transform: activeIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                />
              </div>
              <div 
                className="answer" 
                style={{ display: activeIndex === index ? 'block' : 'none' }}
              >
                <p className="text-5">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="content-3">
          <div className="content-4">
            <div className="heading-6">Still have questions?</div>
            <p className="text-6">We're here to help you!</p>
          </div>
          <div className="style-secondary-small-false-alternate-false-icon-position-no-icon-wrapper">
            <StyleSecondaryWrapper
              className="style-secondary-instance"
              divClassName="design-component-instance-node"
              text="Contact"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;