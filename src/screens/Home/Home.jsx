import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import "./Home.css";
import Navbar from '../NavBar/NavBar.jsx';
import Process from '../Process/Process.jsx';
import Footer from '../Footer/Footer.jsx';
import Locations from "../Locations/Locations.jsx";
import Features from '../Features/Features.jsx';
import AboutUs from '../AboutUs/AboutUs.jsx';
import Join from "../Join/Join.jsx";
import FAQ from "../FAQ/FAQ.jsx";

const Home = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(titleRef.current, {
      strings: ["Revolutionizing Urban \n Parking Management with \n Ease"], // Only this line
      typeSpeed: 25,
      backSpeed: 10,
      showCursor: false,
      cursorChar: "|",
      loop: false,
    });

    return () => typed.destroy();
  }, []);

  return (
    <section id="home">
      <div className="home">
        <Navbar />
        <section className="home-body">
          <img src="images/home.jpeg" alt="home" className="home-img w-full max-w-[500px] h-auto object-cover" />
          <h1 className="title w-auto text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            <span ref={titleRef}></span>
          </h1>
          <p className="home-content">
            ParkEz simplifies your parking experience with innovative solutions
            tailored for modern urban living. Discover the convenience of real-time
            availability and online booking at your fingertips.
          </p>
          <button className="home-search-button">Search</button>
          <button className="home-learn-more-button">Learn More</button>
        </section>
        <Process />
        <Locations />
        <Features />
        <AboutUs />
        <Join />
        <FAQ />
        <Footer />
      </div>
    </section>
  );
};

export default Home;
