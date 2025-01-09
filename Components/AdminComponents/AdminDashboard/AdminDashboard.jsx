import React from "react";
import "./AdminDashboard.scss";
import UserChart from "@/components/ui/UserChart";
import CarChart from "@/components/ui/CarChart";
import AdminCard from "@/DummyData/AdminCard.json";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <>
      <div className="chartWrapper">
        <CarChart />
        <UserChart />
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
    </>
  );
}
