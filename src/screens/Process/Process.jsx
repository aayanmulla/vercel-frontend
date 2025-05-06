import React from "react";
import GpsFixed from '../../components/GpsFixed/GpsFixed.jsx';
import "./Process.css";
const Process = () => {
    return (
        <div className="layout w-100">
            <div className="container-2 w-100">
                <div class="container-fluid">
                    <div class="col-12 d-flex flex-column gap-4 mb-5">
                        <div class="d-flex align-items-start gap-4 ">
                            <GpsFixed class="me-3" />
                            <div class="w-100 ms-3">
                                <h5 class="heading">Find Nearby Parking</h5>
                                <p class="text">
                                    Use our search feature to find the nearest ParkEz location
                                    with available parking spots. Enter your location or let our
                                    website detect it for you automatically.
                                </p>
                            </div>
                        </div>

                        <div class="d-flex align-items-start gap-4">
                            <img
                                class="img-fluid me-3"
                                alt="Rectangle"
                                src="https://c.animaapp.com/BPgiiEYf/img/rectangle-329-1@2x.png"
                            />
                            <div>
                                <h5 class="heading">Book Your Spot</h5>
                                <p class="text">
                                    Select your preferred parking slot and book it online. Enjoy
                                    the convenience of reserving your spot in advance, ensuring
                                    a hassle-free experience when you arrive.
                                </p>
                            </div>
                        </div>

                        <div class="d-flex align-items-start gap-4">
                            <img
                                class="img-fluid me-3"
                                alt="Group"
                                src="https://c.animaapp.com/BPgiiEYf/img/group@2x.png"
                            />
                            <div>
                                <h5 class="heading">Find And Go</h5>
                                <p class="text">
                                    Upon arrival, follow the directions to your reserved spot.
                                    Our automated system ensures a smooth parking experience.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Process;