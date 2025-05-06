import React, { useEffect, useRef } from "react";
import "./AboutUs.css";

const AboutUs = () => {
  const containersRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      { threshold: 0.3 },
    );

    // Use the array of refs we collect
    containersRef.current.forEach((container) => {
      if (container) observer.observe(container);
    });
  }, []);

  return (
    <section id="aboutus">
      <div className="container-2">
        <h1 className="aboutus-title">
          Innovating Smart Solutions for a Better Tomorrow
        </h1>
        <p className="aboutus-content">
          At ParkEz, we are a team of forward-thinkers dedicated to developing
          cutting-edge IoT and AI-driven solutions that enhance urban mobility.
          Our mission is to create seamless, technology-powered experiences that
          solve real-world challenges.
        </p>
        <img
          src="/images/Aboutusimg1.jpeg"
          alt="Innovation concept"
          className="aboutus-img4"
        />

        <h2 className="aboutus-title">Our Vision</h2>
        <p className="aboutus-content">
          To revolutionize the way people interact with smart infrastructure,
          making cities more efficient and sustainable.
        </p>

        <h2 className="aboutus-title">Our Mission</h2>
        <p className="aboutus-content">
          Leveraging technology to simplify everyday experiences, from smart
          parking to intelligent automation.
        </p>

        <h2 className="aboutus-title">Our Values</h2>
        <p className="aboutus-content">
          Innovation, Reliability, and Customer-Centricity.
        </p>

        <h1 className="aboutus-title2 center-title">
          Visionaries Taking On a Challenge
        </h1>

        <div className="aboutus-img">
          <div
            ref={(el) => (containersRef.current[0] = el)}
            className="image-text-container hidden"
          >
            <img
              src="/images/AayanMulla.jpeg"
              alt="Aayan Mulla"
              className="aboutus-img1"
            />
            <p className="image-text">Founder</p>
            <p className="a-text">Aayan Mulla</p>
          </div>
          <div
            ref={(el) => (containersRef.current[1] = el)}
            className="image-text-container hidden"
          >
            <img
              src="/images/AayanFriend1.jpeg"
              alt="Friend 1"
              className="aboutus-img2"
            />
            <p className="image-text">CEO</p>
            <p className="a-text">Om Donge</p>
          </div>
          <div
            ref={(el) => (containersRef.current[2] = el)}
            className="image-text-container hidden"
          >
            <img
              loading="lazy"
              src="/images/AayanFriend2.jpeg"
              alt="Friend 2"
              className="aboutus-img3"
            />
            <p className="image-text">CFO</p>
            <p className="a-text">Kapil Katte</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
