"use client"
import React, { useState } from "react";
import "./CreateForm.scss";
import AdminButton from "@/Components/AdminComponents/AdminButton/AdminButton";
import Image from "next/image";

function page() {
    const [image, setImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        if (file && file.type.startsWith("image/")) {
            setImage(URL.createObjectURL(file));
        } else {
            alert("Please upload a valid image file.");
        }
    };

    return (
        <div className="createWrapper">
            <p className="inputName">Title</p>
            <input type="text" placeholder="Enter Title Here" />

            <p className="inputName">Upload Images</p>
            <div className="imageContainer">
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                {image ? (
                    <Image src={image} className="previewImage" alt="preview" width={200} height={200} />
                ) : null}
            </div>
            <div className="btnWrapper">
                <AdminButton href="./" buttonText={"Add"} />
                <AdminButton href="./" buttonText={"Cancel"} />
            </div>
        </div>
    );
}

export default page;
