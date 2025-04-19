import React from "react";
import "./VendorDashboard.scss";
import VendorCards from "../../../DummyData/VendorCards";
import VendorHeading from "@/Components/VendorComponents/VendorHeading/VendorHeading";
import LeadsChart from "@/components/charts/LeadsChart";
import CarChart from "@/components/charts/CarListingChart";
export default function VendorDashboard() {
    const carListingData = [
        { month: "January", carListed: 10, carWithDriverListed: 6 },
        { month: "February", carListed: 5, carWithDriverListed: 16 },
        { month: "March", carListed: 12, carWithDriverListed: 19 },
        { month: "April", carListed: 13, carWithDriverListed: 28 },
        { month: "May", carListed: 27, carWithDriverListed: 17 },
        { month: "June", carListed: 57, carWithDriverListed: 15 }
    ];

    const leadsData = [
      { label: "Website Leads", value: 150 },
      { label: "Referral Leads", value: 90 },
      { label: "Social Media", value: 60 },
      { label: "Other", value: 30 },
    ];

    return (
        <>
            <VendorHeading headingText="Welcome To Vendor Dashboard" />
            <div className="chartWrapper">
                <CarChart
                    title="Your Listing"
                    description="January - June 2025"
                    data={carListingData}
                />
                <LeadsChart
                  title="Leads"
                  description=""
                  data={leadsData}
                />
                
            </div>
            <div className="vendorCardsWrapper">
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
            </div>
        </>
    );
}
