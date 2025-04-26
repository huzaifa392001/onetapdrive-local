'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCategoryById, updateCategory, deleteCategory } from '@/Services/AdminServices/AdminServices';
import SecHeading from '@/Components/SecHeading/SecHeading';
import Image from 'next/image';

function EditCategoryPage() {
    const router = useRouter();
    const { id } = router.query;

    const [categoryTitle, setCategoryTitle] = useState('');
    const [categoryImage, setCategoryImage] = useState(null);
    const [existingImage, setExistingImage] = useState('');
    const [pageHeading, setPageHeading] = useState('');
    const [pageDescription, setPageDescription] = useState('');

    useEffect(() => {
        if (id) {
            fetchCategoryData(id);
        }
    }, [id]);

    const fetchCategoryData = async (id) => {
        try {
            const response = await getCategoryById(id);
            if (response?.data) {
                const { name, image, titles, description } = response.data;
                setCategoryTitle(name);
                setPageHeading(titles);
                setPageDescription(description);
                setExistingImage(image);
            }
        } catch (error) {
            console.error("Error fetching category data:", error);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setCategoryImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = {
            categoryTitle,
            pageHeading,
            pageDescription,
            categoryImage: categoryImage ? [categoryImage] : null,
        };
        try {
            const response = await updateCategory(id, updatedData);
            if (response?.data) {
                router.push('/admin/categories');
            }
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await deleteCategory(id);
            if (response?.data) {
                router.push('/admin/categories');
            }
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    if (!id) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="headingCont">
                <SecHeading heading={`Edit Category: ${categoryTitle}`} />
            </div>
            <div className="formWrapper">
                <form onSubmit={handleSubmit}>
                    <div className="inputCont">
                        <label htmlFor="categoryTitle">Category Title</label>
                        <input
                            id="categoryTitle"
                            type="text"
                            value={categoryTitle}
                            onChange={(e) => setCategoryTitle(e.target.value)}
                            placeholder="Enter Category Title"
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
                            type="text"
                            value={pageHeading}
                            onChange={(e) => setPageHeading(e.target.value)}
                            placeholder="Enter Category Page Heading"
                        />
                    </div>

                    <div className="inputCont">
                        <label htmlFor="pageDescription">Page Description</label>
                        <textarea
                            id="pageDescription"
                            rows={7}
                            value={pageDescription}
                            onChange={(e) => setPageDescription(e.target.value)}
                            placeholder="Enter Category Page Description"
                        />
                    </div>

                    <div className="inputCont btnCont">
                        <button type="submit" className="themeBtn altr">Update</button>
                        <button type="button" onClick={handleDelete} className="themeBtn altr">Delete</button>
                    </div>
                </form>

                <div className="preview">
                    <h2>Preview</h2>
                    <div className="previewBox">
                        <figure>
                            {categoryImage ? (
                                <Image src={categoryImage} alt="Category Image" width={200} height={200} />
                            ) : existingImage ? (
                                <Image src={existingImage} alt="Category Image" width={200} height={200} />
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

export default EditCategoryPage;