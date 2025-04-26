"use client";
import React, { useState } from "react";
import SecHeading from "@/Components/SecHeading/SecHeading";
import { pageName } from "@/Utils/Utils";
import Image from "next/image";

function Page() {
    // State variables for form fields
    const [bodyTypeTitle, setBodyTypeTitle] = useState("");
    const [bodyTypeImage, setBodyTypeImage] = useState(null);
    const [pageHeading, setPageHeading] = useState("");
    const [pageDescription, setPageDescription] = useState("");

    // Handler for file input
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setBodyTypeImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <>
            <div className="headingCont">
                <SecHeading heading={`Edit ${pageName()}`} />
            </div>
            <div className="formWrapper">
                <form>
                    <div className="inputCont">
                        <label htmlFor="bodyTypeTitle">bodyType Title</label>
                        <input
                            id="bodyTypeTitle"
                            placeholder="Enter bodyType Title"
                            type="text"
                            value={bodyTypeTitle}
                            onChange={(e) => setBodyTypeTitle(e.target.value)}
                        />
                    </div>
                    <div className="inputCont">
                        <label htmlFor="bodyTypeImage">bodyType Image</label>
                        <input id="bodyTypeImage" type="file" onChange={handleFileChange} />
                    </div>
                    <div className="divider" />
                    <h3>bodyType Page</h3>
                    <div className="inputCont">
                        <label htmlFor="pageHeading">Page Heading</label>
                        <input
                            id="pageHeading"
                            placeholder="Enter bodyType's Page heading"
                            type="text"
                            value={pageHeading}
                            onChange={(e) => setPageHeading(e.target.value)}
                        />
                    </div>
                    <div className="inputCont">
                        <label htmlFor="pageDescription">Page Description</label>
                        <textarea
                            id="pageDescription"
                            placeholder="Enter bodyType's Page Description"
                            type="text"
                            value={pageDescription}
                            onChange={(e) => setPageDescription(e.target.value)}
                            rows={7}
                        />
                    </div>
                    <div className="inputCont btnCont">
                        <button type="button" className="themeBtn altr">
                            Update
                        </button>
                        <button type="button" className="themeBtn altr">
                            Delete
                        </button>
                    </div>
                </form>
                <div className="preview">
                    <h2>Preview</h2>
                    <div className="previewBox">
                        <figure>
                            {bodyTypeImage ? <Image src={bodyTypeImage} alt="bodyType Image" fill /> : <p>No Image Selected</p>}
                        </figure>
                        <h2>{bodyTypeTitle || "bodyType Name"}</h2>
                        <div className="headingLayout">
                            <h3>{pageHeading || "bodyType's Page Heading"}</h3>
                            <p>{pageDescription || "bodyType's Page Description"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
