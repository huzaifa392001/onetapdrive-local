import React from "react";
import "./VendorDashboard.scss";
import VendorCards from "../../../DummyData/VendorCards";
import VendorHeading from "@/Components/VendorComponents/VendorHeading/VendorHeading";
import LeadsChart from "@/Components/charts/LeadsChart";
import CarChart from "@/Components/charts/CarListingChart";
export default function VendorDashboard() {
    const carListingData = [
        { month: "January", carListed: 85, carWithDriverListed: 62 },
        { month: "February", carListed: 72, carWithDriverListed: 79 },
        { month: "March", carListed: 91, carWithDriverListed: 88 },
        { month: "April", carListed: 96, carWithDriverListed: 105 },
        { month: "May", carListed: 108, carWithDriverListed: 94 },
        { month: "June", carListed: 121, carWithDriverListed: 101 },
        { month: "July", carListed: 113, carWithDriverListed: 98 },
        { month: "August", carListed: 109, carWithDriverListed: 106 },
        { month: "September", carListed: 97, carWithDriverListed: 103 },
        { month: "October", carListed: 92, carWithDriverListed: 95 },
        { month: "November", carListed: 88, carWithDriverListed: 77 },
        { month: "December", carListed: 93, carWithDriverListed: 84 }
    ];

    const leadsData = [
        { label: "Website Leads", value: 150 },
        { label: "Referral Leads", value: 90 },
        { label: "Social Media", value: 60 },
        { label: "Other", value: 30 }
    ];

    return (
        <>
            <VendorHeading headingText="Welcome To Vendor Dashboard" />
            <div className="chartWrapper">
                <CarChart title="Your Listing" description="January - June 2025" data={carListingData} />
                <LeadsChart title="Leads" description="" data={leadsData} />
            </div>
            {/* <div className="vendorCardsWrapper">
                {VendorCards.map((card, index) => (
                    <div key={index} className="vendorHomeCard">
                        <div className="bgIcon">
                            <i className={card.icon}></i>
                        </div>
                        <div className="cardBody">
                            <i className={card.icon}></i>
                            <div className="cardContent">
                                <div className="cardNameDiv">
                                    <p className="cardNamePara">{card.title}</p>
                                    <div className="cardCount">
                                        <p className="cardCountPara">{card.count}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div> */}
        </>
    );
}
