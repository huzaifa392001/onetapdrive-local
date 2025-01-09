import React from "react";
import "./VendorDashboard.scss";
import VendorCards from "../../../DummyData/VendorCards";
import VendorHeading from "@/Components/VendorComponents/VendorHeading/VendorHeading";
export default function VendorDashboard() {
  return (
    <>
      <VendorHeading headingText="Welcome To Vendor Dashboard" />
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
