'use client';
import React, { useState } from 'react';
import SecHeading from '@/components/SecHeading/SecHeading';
import { pageName } from '@/Utils/Utils';
import Image from 'next/image';

function Page() {
    // State variables for form fields
    const [brandTitle, setBrandTitle] = useState('');
    const [brandImage, setBrandImage] = useState(null);
    const [pageHeading, setPageHeading] = useState('');
    const [pageDescription, setPageDescription] = useState('');

    // Handler for file input
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setBrandImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <>
            <div className="headingCont">
                <SecHeading heading={`${pageName()}`} />
            </div>
            <div className="formWrapper">
                <form>
                    <div className="inputCont">
                        <label htmlFor="brandTitle">Brand Title</label>
                        <input
                            id="brandTitle"
                            placeholder="Enter Brand Title"
                            type="text"
                            value={brandTitle}
                            onChange={(e) => setBrandTitle(e.target.value)}
                        />
                    </div>
                    <div className="inputCont">
                        <label htmlFor="brandImage">Brand Image</label>
                        <input
                            id="brandImage"
                            type="file"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="divider" />
                    <h3>Brand Page</h3>
                    <div className="inputCont">
                        <label htmlFor="pageHeading">Page Heading</label>
                        <input
                            id="pageHeading"
                            placeholder="Enter Brand's Page heading"
                            type="text"
                            value={pageHeading}
                            onChange={(e) => setPageHeading(e.target.value)}
                        />
                    </div>
                    <div className="inputCont">
                        <label htmlFor="pageDescription">Page Description</label>
                        <textarea
                            id="pageDescription"
                            placeholder="Enter Brand's Page Description"
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
                            {brandImage ? (
                                <Image src={brandImage} alt="Brand Image" fill />
                            ) : (
                                <p>No Image Selected</p>
                            )}
                        </figure>
                        <h2>{brandTitle || 'Brand Name'}</h2>
                        <div className="headingLayout">
                            <h3>{pageHeading || "Brand's Page Heading"}</h3>
                            <p>{pageDescription || "Brand's Page Description"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
