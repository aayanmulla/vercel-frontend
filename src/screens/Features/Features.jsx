import React from "react";
import "./Features.css";
import { Card, CardContent, Typography } from "@mui/material";

const Features = () => {
    const features = [
        {
            image: "images/f1-img.jpeg",
            title: "Automated Parking System",
            description: "Experience seamless parking with our automated system.",
        },
        {
            image: "https://c.animaapp.com/BPgiiEYf/img/rectangle-329-1@2x.png",
            title: "Online Slot Booking",
            description: "Book your parking spot online with ease.",
        },
        {
            image: "https://c.animaapp.com/BPgiiEYf/img/rectangle-330@2x.png",
            title: "Real-time Space Availability",
            description: "Check available spaces in real-time for convenience.",
        },
        {
            image: "https://c.animaapp.com/BPgiiEYf/img/rectangle-331@2x.png",
            title: "EV Charging Station",
            description: "Charge your electric vehicle effortlessly.",
        },
        {
            image: "https://c.animaapp.com/BPgiiEYf/img/rectangle-332@2x.png",
            title: "Mobile App (Coming Soon)",
            description: "Access ParkEz features on the go.",
        },
    ];
    return (
        <section id="services">
            <div className="layout">
                <div className="f-container-2">
                    <div className="div-4">
                        <p className="heading-2">
                            Explore Our Innovative Parking Solutions
                        </p>

                        <p className="text-2">
                            Discover how ParkEz transforms urban parking with cutting-edge
                            technology. Our solutions are designed for convenience and
                            efficiency, making parking hassle-free.
                        </p>
                        <div className="features-container">
                            <div className="features-grid">
                                {features.map((feature, index) => (
                                    <Card key={index} className="feature-card shadow-lg rounded-lg">
                                        <CardContent className="feature-card-content">
                                            <div className="feature-icon-container">
                                                {feature.icon && feature.icon}
                                                {feature.image && (
                                                    <img src={feature.image} alt={feature.title} className="feature-image" />
                                                )}
                                            </div>
                                            <Typography variant="h6" className="feature-title">
                                                {feature.title}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" className="feature-description">
                                                {feature.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Features;