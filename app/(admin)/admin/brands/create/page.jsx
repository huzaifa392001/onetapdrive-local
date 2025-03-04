"use client";
import React, { useState } from "react";
import SecHeading from "@/Components/SecHeading/SecHeading";
import { pageName } from "@/Utils/Utils";
import Image from "next/image";
import { createBrands } from "@/Services/AdminServices/AdminServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

// function Page() {
//     // State variables for form fields
//     const [brandTitle, setBrandTitle] = useState('');
//     const [brandImage, setBrandImage] = useState(null);
//     const [pageHeading, setPageHeading] = useState('');
//     const [pageDescription, setPageDescription] = useState('');

//     // Handler for file input
//     const handleFileChange = (e) => {
//         if (e.target.files && e.target.files[0]) {
//             setBrandImage(URL.createObjectURL(e.target.files[0]));
//         }
//     };

//     return (
//         <>
//             <div className="headingCont">
//                 <SecHeading heading={`${pageName()}`} />
//             </div>
//             <div className="formWrapper">
//                 <form>
//                     <div className="inputCont">
//                         <label htmlFor="brandTitle">Brand Title</label>
//                         <input
//                             id="brandTitle"
//                             placeholder="Enter Brand Title"
//                             type="text"
//                             value={brandTitle}
//                             onChange={(e) => setBrandTitle(e.target.value)}
//                         />
//                     </div>
//                     <div className="inputCont">
//                         <label htmlFor="brandImage">Brand Image</label>
//                         <input
//                             id="brandImage"
//                             type="file"
//                             onChange={handleFileChange}
//                         />
//                     </div>
//                     <div className="divider" />
//                     <h3>Brand Page</h3>
//                     <div className="inputCont">
//                         <label htmlFor="pageHeading">Page Heading</label>
//                         <input
//                             id="pageHeading"
//                             placeholder="Enter Brand's Page heading"
//                             type="text"
//                             value={pageHeading}
//                             onChange={(e) => setPageHeading(e.target.value)}
//                         />
//                     </div>
//                     <div className="inputCont">
//                         <label htmlFor="pageDescription">Page Description</label>
//                         <textarea
//                             id="pageDescription"
//                             placeholder="Enter Brand's Page Description"
//                             type="text"
//                             value={pageDescription}
//                             onChange={(e) => setPageDescription(e.target.value)}
//                             rows={7}
//                         />
//                     </div>
//                     <div className="inputCont btnCont">
//                         <button type="button" className="themeBtn altr">
//                             Update
//                         </button>
//                         <button type="button" className="themeBtn altr">
//                             Delete
//                         </button>
//                     </div>
//                 </form>
//                 <div className="preview">
//                     <h2>Preview</h2>
//                     <div className="previewBox">
//                         <figure>
//                             {brandImage ? (
//                                 <Image src={brandImage} alt="Brand Image" fill />
//                             ) : (
//                                 <p>No Image Selected</p>
//                             )}
//                         </figure>
//                         <h2>{brandTitle || 'Brand Name'}</h2>
//                         <div className="headingLayout">
//                             <h3>{pageHeading || "Brand's Page Heading"}</h3>
//                             <p>{pageDescription || "Brand's Page Description"}</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Page;

function Page() {
    const [brandTitle, setBrandTitle] = useState("");
    const [brandImage, setBrandImage] = useState(null);
    const [brandImageFile, setBrandImageFile] = useState(null);
    const [pageHeading, setPageHeading] = useState("");
    const [pageDescription, setPageDescription] = useState("");
    const [loading, setLoading] = useState(false);

    // Handler for file input
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
    
            console.log("Selected File:", file); // Debugging
            console.log("File Name:", file.name);
            console.log("File Type:", file.type);
            console.log("File Size:", file.size);
    
            setBrandImage(URL.createObjectURL(file));
            setBrandImageFile(file); 
        }
    };
    

    // ✅ API request to create brand
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // formData.append(image[], {
        //     uri: image.uri,
        //     name: image.jpg,
        //     type: 'image/jpeg',
        //   });

        try {
            // FormData for image upload
            const formData = new FormData();
            formData.append("title", pageHeading);
            formData.append("name", brandTitle);
            formData.append("description", pageDescription);
            if (brandImageFile) {
                formData.append("file", brandImageFile);
                console.log("images appended successfully:", brandImageFile);
                // console.log("images append successfully", brandImageFile);
            } else {
                console.log("No file selected.");
            }
            createBrands(formData);
        } catch (error) {
            console.error("Error Creating Brand:", error.message);
            alert("Failed to create brand. Please try again.");
        } finally {
            console.log("finallly");

            setLoading(false);
        }
    };

    
    

    return (
        <>
            <div className="headingCont">
                <SecHeading heading={`${pageName()}`} />
            </div>
            <div className="formWrapper">
                <form onSubmit={handleSubmit}>
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
                            accept="image/*"
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
                        <label htmlFor="pageDescription">
                            Page Description
                        </label>
                        <textarea
                            id="pageDescription"
                            placeholder="Enter Brand's Page Description"
                            value={pageDescription}
                            onChange={(e) => setPageDescription(e.target.value)}
                            rows={7}
                        />
                    </div>
                    <div className="inputCont btnCont">
                        <button
                            type="submit"
                            className="themeBtn altr"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create"}
                        </button>
                    </div>
                </form>
                <div className="preview">
                    <h2>Preview</h2>
                    <div className="previewBox">
                        <figure>
                            {brandImage ? (
                                <Image
                                    src={brandImage}
                                    alt="Brand Image"
                                    width={100}
                                    height={100}
                                />
                            ) : (
                                <p>No Image Selected</p>
                            )}
                        </figure>
                        <h2>{brandTitle || "Brand Name"}</h2>
                        <div className="headingLayout">
                            <h3>{pageHeading || "Brand's Page Heading"}</h3>
                            <p>
                                {pageDescription || "Brand's Page Description"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// const Page = () => {
//     const [brandTitle, setBrandTitle] = useState("");
//     const [brandImage, setBrandImage] = useState(null);
//     const [brandImageFile, setBrandImageFile] = useState(null);
//     const [pageHeading, setPageHeading] = useState("");
//     const [pageDescription, setPageDescription] = useState("");
//     const [loading, setLoading] = useState(false);

//     // Handler for file input
//     const handleFileChange = (e) => {
//         if (e.target.files && e.target.files[0]) {
//             setBrandImage(URL.createObjectURL(e.target.files[0])); // Preview image
//             setBrandImageFile(e.target.files[0]); // Store file for API
//         }
//     };

//     // React Query Mutation
//     const createBrandMutation = useMutation({
//         mutationFn: createBrands, // Your API call function
//         onSuccess: () => {
//             toast.success("Brand Created Successfully!");
//             // Reset form after success
//             setBrandTitle("");
//             setBrandImage(null);
//             setBrandImageFile(null);
//             setPageHeading("");
//             setPageDescription("");
//         },
//         onError: (error) => {
//             console.error("Error Creating Brand:", error.message);
//             toast.error(error.message || "Failed to create brand. Please try again.");
//         },
//     });

//     // Form submission handler
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         const formData = new FormData();
//         formData.append("title", pageHeading);
//         formData.append("name", brandTitle);
//         formData.append("description", pageDescription);
//         if (brandImageFile) {
//             formData.append("file", brandImageFile);
//         }

//         // Log form data for debugging
//         for (let [key, value] of formData.entries()) {
//             console.log(key, value);
//         }

//         // Trigger mutation
//         createBrandMutation.mutate(formData);
//         setLoading(false);
//     };

//     return (
//         <>
//             <div className="headingCont">
//                 <SecHeading heading={`${pageName()}`} />
//             </div>
//             <div className="formWrapper">
//                 <form onSubmit={handleSubmit}>
//                     <div className="inputCont">
//                         <label htmlFor="brandTitle">Brand Title</label>
//                         <input
//                             id="brandTitle"
//                             placeholder="Enter Brand Title"
//                             type="text"
//                             value={brandTitle}
//                             onChange={(e) => setBrandTitle(e.target.value)}
//                         />
//                     </div>
//                     <div className="inputCont">
//                         <label htmlFor="brandImage">Brand Image</label>
//                         <input
//                             id="brandImage"
//                             type="file"
//                             accept="image/*"
//                             onChange={handleFileChange}
//                         />
//                     </div>
//                     <div className="divider" />
//                     <h3>Brand Page</h3>
//                     <div className="inputCont">
//                         <label htmlFor="pageHeading">Page Heading</label>
//                         <input
//                             id="pageHeading"
//                             placeholder="Enter Brand's Page heading"
//                             type="text"
//                             value={pageHeading}
//                             onChange={(e) => setPageHeading(e.target.value)}
//                         />
//                     </div>
//                     <div className="inputCont">
//                         <label htmlFor="pageDescription">Page Description</label>
//                         <textarea
//                             id="pageDescription"
//                             placeholder="Enter Brand's Page Description"
//                             value={pageDescription}
//                             onChange={(e) => setPageDescription(e.target.value)}
//                             rows={7}
//                         />
//                     </div>
//                     <div className="inputCont btnCont">
//                         <button type="submit" className="themeBtn altr" disabled={loading}>
//                             {loading ? "Creating..." : "Create"}
//                         </button>
//                     </div>
//                 </form>
//                 <div className="preview">
//                     <h2>Preview</h2>
//                     <div className="previewBox">
//                         <figure>
//                             {brandImage ? (
//                                 <Image src={brandImage} alt="Brand Image" width={100} height={100} />
//                             ) : (
//                                 <p>No Image Selected</p>
//                             )}
//                         </figure>
//                         <h2>{brandTitle || "Brand Name"}</h2>
//                         <div className="headingLayout">
//                             <h3>{pageHeading || "Brand's Page Heading"}</h3>
//                             <p>{pageDescription || "Brand's Page Description"}</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

export default Page;
