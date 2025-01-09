'use client';
import React, { useState } from 'react';
import SecHeading from '@/Components/SecHeading/SecHeading';
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
                <SecHeading heading={`Edit ${pageName()}'s Blog`} />
            </div>
            <div className="formWrapper">
                <form>
                    <div className="inputCont">
                        <label htmlFor="brandTitle">Blog Title</label>
                        <input
                            id="brandTitle"
                            placeholder="Enter Blog Title"
                            type="text"
                            value={brandTitle}
                            onChange={(e) => setBrandTitle(e.target.value)}
                        />
                    </div>
                    <div className="inputCont">
                        <label htmlFor="brandImage">Blog Image</label>
                        <input
                            id="brandImage"
                            type="file"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="inputCont content">
                        <label htmlFor="pageDescription">Min Content</label>
                        <textarea
                            id="pageDescription"
                            placeholder="Enter Brand's Min Content"
                            type="text"
                            value={pageDescription}
                            onChange={(e) => setPageDescription(e.target.value)}
                            rows={7}
                        />
                    </div>
                    <div className="inputCont content">
                        <label htmlFor="pageDescription">Content</label>
                        <textarea
                            id="pageDescription"
                            placeholder="Enter Brand's Content"
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
            </div>
        </>
    );
}

export default Page;
