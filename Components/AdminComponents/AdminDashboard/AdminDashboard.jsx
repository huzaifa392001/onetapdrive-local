import React from "react";
import "./AdminDashboard.scss";
// import UserChart from "@/Components/ui/UserChart";
// import CarChart from "@/Components/ui/CarChart";
import UserChart from "@/components/charts/UserChart";
import CarChart from "@/components/charts/CarListingChart";
import AdminCard from "@/DummyData/AdminCard.json";
import Link from "next/link";

export default function AdminDashboard() {
    const carListingData = [
        { month: "January", carListed: 186, carWithDriverListed: 80 },
        { month: "February", carListed: 105, carWithDriverListed: 76 },
        { month: "March", carListed: 210, carWithDriverListed: 199 },
        { month: "April", carListed: 503, carWithDriverListed: 278 },
        { month: "May", carListed: 367, carWithDriverListed: 170 },
        { month: "June", carListed: 357, carWithDriverListed: 150 }
    ];

    const vendorUserData = [
        { month: "January", Users: 186, Vendor: 80 },
        { month: "February", Users: 105, Vendor: 76 },
        { month: "March", Users: 210, Vendor: 199 },
        { month: "April", Users: 503, Vendor: 278 },
        { month: "May", Users: 367, Vendor: 170 },
        { month: "June", Users: 357, Vendor: 150 }
    ];

    return (
        <div className="customContainer">
            <div className="chartWrapper">
                <CarChart
                    title="Car Listing - Car With Driver Listing"
                    description="January - June 2025"
                    data={carListingData}
                />
                <UserChart
                    //  data={Data}
                    title="Vendors - Users"
                    description="January - June 2025"
                    data={vendorUserData}
                />
            </div>
            <div className="adminCardsWrapper">
                {AdminCard.map((card, index) => (
                    <Link key={index} href={card.link} passHref>
                        <div className="adminHomeCard">
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
                    </Link>
                ))}
            </div>
        </div>
    );
}
