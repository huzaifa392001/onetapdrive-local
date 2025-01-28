'use client';
import React, { useState } from 'react';
import SecHeading from '@/Components/SecHeading/SecHeading';
import { pageName } from '@/Utils/Utils';
import Image from 'next/image';

function Page() {
    // State variables for form fields
    const [categoryTitle, setCategoryTitle] = useState('');
    const [categoryImage, setCategoryImage] = useState(null);
    const [pageHeading, setPageHeading] = useState('');
    const [pageDescription, setPageDescription] = useState('');

    // Handler for file input
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setCategoryImage(URL.createObjectURL(e.target.files[0]));
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
                        <label htmlFor="categoryTitle">Category Title</label>
                        <input
                            id="categoryTitle"
                            placeholder="Enter Category Title"
                            type="text"
                            value={categoryTitle}
                            onChange={(e) => setCategoryTitle(e.target.value)}
                        />
                    </div>
                    <div className="inputCont">
                        <label htmlFor="categoryImage">Category Image</label>
                        <input
                            id="categoryImage"
                            type="file"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="divider" />
                    <h3>Category Page</h3>
                    <div className="inputCont">
                        <label htmlFor="pageHeading">Page Heading</label>
                        <input
                            id="pageHeading"
                            placeholder="Enter Category's Page heading"
                            type="text"
                            value={pageHeading}
                            onChange={(e) => setPageHeading(e.target.value)}
                        />
                    </div>
                    <div className="inputCont">
                        <label htmlFor="pageDescription">Page Description</label>
                        <textarea
                            id="pageDescription"
                            placeholder="Enter Category's Page Description"
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
                            {categoryImage ? (
                                <Image src={categoryImage} alt="Category Image" fill />
                            ) : (
                                <p>No Image Selected</p>
                            )}
                        </figure>
                        <h2>{categoryTitle || 'Category Name'}</h2>
                        <div className="headingLayout">
                            <h3>{pageHeading || "Category's Page Heading"}</h3>
                            <p>{pageDescription || "Category's Page Description"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
