"use client";

import FullProductCard from "@/Components/FullProductCard/FullProductCard";
import { getAllCars, getViewedCars, getWishlistedCars } from "@/Services/FrontServices/GeneralServices";
import { useQueries } from "@tanstack/react-query";
import React, { useState } from "react";
import "./style.scss";

function Page() {
    const [activeTab, setActiveTab] = useState("wishlist");

    const results = useQueries({
        queries: [
            {
                queryKey: ["allCars"],
                queryFn: getAllCars
            },
            {
                queryKey: ["viewedCars"],
                queryFn: getViewedCars
            },
            {
                queryKey: ["wishlistedCars"],
                queryFn: getWishlistedCars
            }
        ]
    });

    const [allCars, viewedCars, wishlistedCars] = results;

    const tabs = [
        { label: "Wishlist", key: "wishlist" },
        { label: "Contacted", key: "contacted" }, // You can connect this later
        { label: "Viewed", key: "viewed" }
    ];

    // Select data based on activeTab
    const getActiveData = () => {
        switch (activeTab) {
            case "wishlist":
                return wishlistedCars?.data?.data?.data || [];
            case "viewed":
                return viewedCars?.data?.data?.data || [];
            case "contacted":
                return allCars?.data?.data?.data || []; // Placeholder
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
                            <h3>{tab.label}</h3>
                        </div>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="tabContent">
                    <div className="resultRow">
                        {activeData.map((item, index) => (
                            <FullProductCard data={item} featured key={index} />
                        ))}
                    </div>

                    <div className="totalResult">
                        <p>
                            Showing <span>1</span> - <span>{activeData.length}</span> of{" "}
                            <span>{activeData.length}</span> Cars
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Page;
