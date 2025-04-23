"use client";

import FullProductCard from "@/Components/FullProductCard/FullProductCard";
import { useQueries } from "@tanstack/react-query";
import React, { useState } from "react";
import "./style.scss";
import { getUserViewedCars, getUserWishlistCars } from "@/Services/UserServices/UserServices";

function Page() {
    const [activeTab, setActiveTab] = useState("wishlist");

    const results = useQueries({
        queries: [
            {
                queryKey: ["wishlistedCars"],
                queryFn: getUserWishlistCars
            },
            {
                queryKey: ["ViewedCars"],
                queryFn: getUserViewedCars
            }
        ]
    });

    const [wishlistedCars, viewedCars] = results;

    const tabs = [
        { label: "Wishlist", key: "wishlist" },
        // { label: "Contacted", key: "contacted" },
        { label: "Viewed", key: "viewed" }
    ];

    const getActiveData = () => {
        switch (activeTab) {
            case "wishlist":
                if (wishlistedCars?.error?.response?.status === 404) return "no_data";
                return wishlistedCars?.data?.data || [];
            case "viewed":
                if (viewedCars?.error?.response?.status === 404) return "no_data";
                return viewedCars?.data?.data || [];
            // case "contacted":
            //     return [];
            default:
                return [];
        }
    };

    const activeData = getActiveData();

    return (
        <section className="userSec">
            <div className="dashboardCont">
                {/* Tabs */}
                <div className="tabsRow">
                    {tabs.map((tab) => (
                        <div
                            key={tab.key}
                            className={`tabCol ${activeTab === tab.key ? "active" : ""}`}
                            onClick={() => setActiveTab(tab.key)}
                        >
                            <h6>{tab.label}</h6>
                        </div>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="tabContent">
                    <div className="resultRow">
                        {activeData === "no_data" || activeData.length === 0 ? (
                            <div className="noResult">
                                <p>No cars found.</p>
                            </div>
                        ) : (
                            activeData.map((item, index) => <FullProductCard data={item} featured key={index} />)
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Page;
