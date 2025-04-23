'use client';
import React, { useState } from "react";
import "./style.scss";

const Page = () => {
    const [name, setName] = useState("John Doe");
    const [email, setEmail] = useState("john@example.com");
    const [phone, setPhone] = useState("1234567890");
    const [dob, setDob] = useState("1990-01-01");
    const [nationality, setNationality] = useState("Pakistani");

    const handleEdit = (field) => {
        alert(`Edit Clicked for: ${field}`);
    };

    return (
        <div className="profileWrapper">
            <h2>Profile Details</h2>
            <div className="profileField">
                <span className="label">Name</span>
                <span className="value">{name || "-"}</span>
                <button className="editBtn" onClick={() => handleEdit("name")}>Edit</button>
            </div>
            <div className="profileField">
                <span className="label">Email</span>
                <span className="value">{email || "-"}</span>
                <button className="editBtn" onClick={() => handleEdit("email")}>Edit</button>
            </div>
            <div className="profileField">
                <span className="label">Mobile no.</span>
                <span className="value">{phone || "-"}</span>
                <button className="editBtn" onClick={() => handleEdit("phone")}>Edit</button>
            </div>
            <div className="profileField">
                <span className="label">Date of birth</span>
                <span className="value">{dob || "-"}</span>
                <button className="editBtn" onClick={() => handleEdit("dob")}>Edit</button>
            </div>
            <div className="profileField">
                <span className="label">Nationality</span>
                <span className="value">{nationality || "-"}</span>
                <button className="editBtn" onClick={() => handleEdit("nationality")}>Edit</button>
            </div>
        </div>
    );
};

export default Page;
