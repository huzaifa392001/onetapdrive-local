import React from "react";
import "./AdminDashboard.scss";
import AdminCard from '../../../DummyData/AdminCard';

export default function AdminDashboard() {
  return (
      <div className="adminCardsWrapper">
      {AdminCard.map((card, index) => (
        <div key={index} className="adminHomeCard">
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
  );
}
