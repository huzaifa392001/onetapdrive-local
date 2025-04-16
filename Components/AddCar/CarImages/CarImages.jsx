import React, { useState, memo, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Controller } from "swiper/modules";
import SecHeading from "@/Components/SecHeading/SecHeading";
import Image from "next/image";
import CropImage from "./CropImage/CropImage";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import "./CarImages.scss";

// Define debounce outside the component to ensure it's not re-created
const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
};

// Sortable Item Component
function SortableItem({ id, image, index }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS?.Transform?.toString(transform),
        transition,
        ...(transform && { cursor: "move" })
    };

    return (
        <figure ref={setNodeRef} {...attributes} {...listeners} style={style}>
            <Image src={image} width={100} height={100} alt={`Uploaded ${index}`} />
            <span>{index + 1}</span>
        </figure>
    );
}

function CarImages({ carImages, oldImages, edit }) {
    const [images, setImages] = useState([]); // Final cropped images
    const [queue, setQueue] = useState([]); // Queue of images for cropping
    const [currentImage, setCurrentImage] = useState(null); // Image currently being cropped
    const [error, setError] = useState(null);

    // Inside the handleImageUpload, consider validating the file type and size
    const handleImageUpload = (e) => {
        if (e.target.files.length > 20) {
            setError({
                type: "manual",
                message: "You can upload a maximum of 20 images."
            });
        } else {
            const files = Array.from(e.target.files);
            const validImages = files.filter((file) => file.type.startsWith("image/") && file.size <= 5000000); // Max 5MB

            const newImages = validImages.map((file) => ({
                id: `${file.name}-${Date.now()}`,
                src: URL.createObjectURL(file),
                file: file
            }));

            setQueue((prev) => [...prev, ...newImages]);

            if (!currentImage) {
                setCurrentImage(newImages[0].src);
                setQueue((prev) => prev.slice(1));
            }
        }
    };

    const handleCropComplete = useCallback(async (croppedImage) => {
        try {
            const response = await fetch(croppedImage);
            const blob = await response.blob();
            const file = new File([blob], `cropped-image-${Date.now()}.png`, { type: blob.type });

            const croppedImageWithId = { id: `${Date.now()}`, src: URL.createObjectURL(file), file };
            setImages((prev) => [...prev, croppedImageWithId]); // Add converted file to state

            if (queue.length > 0) {
                setCurrentImage(queue[0]?.src || null);
                setQueue((prev) => prev.slice(1)); // Remove the first image from the queue
            } else {
                setCurrentImage(null); // Close the cropper if the queue is empty
            }
        } catch (error) {
            console.error("Error converting blob to file:", error);
        }
    }, [queue]);

    const handleCancelCrop = useCallback(() => {
        if (queue.length > 0) {
            // Start cropping the next image in the queue
            setCurrentImage(queue[0]);
            setQueue((prev) => prev.slice(1)); // Remove the first image from the queue
        } else {
            setCurrentImage(null); // Close the cropper if the queue is empty
        }
    }, [queue]);

    // Handle sorting
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = images.findIndex((item) => item.id === active.id);
            const newIndex = images.findIndex((item) => item.id === over.id);
            const updatedImages = [...images];
            const [movedImage] = updatedImages.splice(oldIndex, 1);
            updatedImages.splice(newIndex, 0, movedImage);
            setImages(updatedImages);
        }
    };

    const handleDelete = (id) => {
        const updatedImages = images.filter((img) => img.id !== id);
        setImages(updatedImages);
    };

    const handleDeleteAll = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete all images?");
        if (confirmDelete) {
            setImages([]); // Proceed with deletion if confirmed
        }
    };

    // In the useEffect for validation
    useEffect(() => {
        const debouncedCallback = debounce((imgs) => carImages(imgs), 500);
        const filteredImages = images.map((img) => img.file);
        debouncedCallback(filteredImages);

        if (filteredImages.length < 5) {
            setError({
                type: "manual",
                message: "Please upload at least 5 images."
            });
        } else {
            setError(null);
        }
    }, [images, carImages]);

    return (
        <>
            <div className="imgCont">
                <div className="imgPreview">
                    <div className="headingCont">
                        <SecHeading heading="Car Images Preview" />
                    </div>
                    {images.length > 0 ? (
                        <div className="imagesCont">
                            {/* Main Slider */}
                            <Swiper
                                modules={[Pagination, Autoplay, Controller]}
                                className="carImageSlider"
                                slidesPerView={1}
                                loop={true}
                                spaceBetween={10}
                                pagination={{
                                    dynamicBullets: true
                                }}
                            >
                                {images.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <figure>
                                            <Image src={img.src} fill alt={`Car ${index + 1}`} />
                                        </figure>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    ) : (
                        <>
                            <div className="noImgFound"></div>
                        </>
                    )}
                </div>

                <div className="uploadImg">
                    <div className="headingCont">
                        <SecHeading heading={edit ? "Update Car Images" : "Upload Car Images"} />
                        {images?.length > 0 && (
                            <>
                                <label className="themeBtn" htmlFor="#imageUpload">
                                    Click Add More Images
                                    <input
                                        id="imageUpload"
                                        type="file"
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                        multiple // Allow multiple file selection
                                    />
                                </label>
                                <button className="themeBtn delete" onClick={handleDeleteAll}>
                                    Delete All
                                </button>
                            </>
                        )}
                    </div>
                    {images.length > 0 ? (
                        <div className="uploader withImage">
                            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                <SortableContext
                                    items={images.map((image) => image.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="images">
                                        {images.map((img, index) => (
                                            <div key={img.id} className="imgWrapper">
                                                <SortableItem id={img.id} image={img.src} index={index} />
                                                <div className="controls">
                                                    <button className="delete" onClick={() => handleDelete(img.id)}>
                                                        <i className="fas fa-trash" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </SortableContext>
                            </DndContext>
                            {error && <p className="errorText">{error.message}</p>}
                            {/* <input
                                type="file"
                                onChange={handleImageUpload}
                                accept="image/*"
                                multiple // Allow multiple file selection
                            /> */}
                        </div>
                    ) : (
                        <div className={`uploader`}>
                            <i className="fad fa-images" />
                            <h3>Click to Upload Images</h3>
                            <input
                                type="file"
                                onChange={handleImageUpload}
                                accept="image/*"
                                multiple // Allow multiple file selection
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Cropper Modal */}
            {currentImage && (
                <CropImage
                    key={currentImage} // Add key to force new instance when image changes
                    image={currentImage}
                    onCropComplete={handleCropComplete}
                    onCancel={handleCancelCrop}
                />
            )}
        </>
    );
}

export default memo(CarImages);
