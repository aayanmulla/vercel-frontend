import React from "react";
import { useNavigate } from "react-router-dom";
import PinFill from "../../components/PinFill/PinFill.jsx";
import { Card, CardContent, Typography } from "@mui/material";
import "./Locations.css";

const Locations = () => {
    const navigate = useNavigate();
    
    const handleNavigation = (path) => {
        navigate(path);
        window.scrollTo(0, 0); // This will scroll to the top after navigation
    };
    
    return (
        <div className="location-layout">
            <div className="location-container">
                <div className="content">
                    <div className="location-div-0">
                        <p className="location-heading-1">
                            Explore Our Convenient Parking Solutions at Key Locations
                        </p>
                        <p className="location-text">
                            Discover hassle-free parking with our innovative system. Book
                            your spot with ease and enjoy real-time updates.
                        </p>

                        <div className="row-wrapper">
                            <div className="cards-container">
                                {/* Card 1 */}
                                <Card 
                                    className="locations-card shadow-lg rounded-lg"
                                >
                                    <CardContent>
                                        <div className="location-card-header">
                                            <PinFill />
                                            <Typography
                                                variant="h6"
                                                className="cursor-pointer text-blue-600 font-semibold"
                                            >
                                                Ajeenkya DY Patil
                                            </Typography>
                                        </div>
                                        <Typography variant="body2" color="textSecondary">
                                            Available parking spaces and online booking at your fingertips.
                                            <button className="loc-button" 
                                            onClick={() => handleNavigation("/bookings")}
                                            >Book Now!</button>
                                        </Typography>
                                    </CardContent>
                                </Card>

                                {/* Card 2 */}
                                <Card className="locations-card shadow-lg rounded-lg">
                                    <CardContent>
                                        <div className="location-card-header">
                                            <PinFill />
                                            <Typography variant="h6" className="font-semibold">
                                                Baner 
                                            </Typography>
                                        </div>
                                        <Typography variant="body2" color="textSecondary">
                                            Stay tuned for future parking solutions in this area.
                                            <button className="loc-button">Comming Soon!</button>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="location-image">
                                <img
                                    alt="Parking location"
                                    src="https://c.animaapp.com/BPgiiEYf/img/placeholder-image.png"
                                    className="location-img"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Locations;