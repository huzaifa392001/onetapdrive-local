"use client";
import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Cropper from "react-easy-crop";
import { Button, Modal, Spin } from "antd";
import "./ImageUploader.scss";

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [isCroppingModalVisible, setIsCroppingModalVisible] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);

  // Handle file upload
  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file),
      file,
    }));

    setImages((prev) => [...prev, ...newImages]);
    setCurrentImageIndex(images.length); // Start cropping the first new image
    setIsCroppingModalVisible(true);
  };

  // Cropper utility
  const getCroppedImg = (imageSrc, crop) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = 500;
        canvas.height = 500;

        ctx.drawImage(
          image,
          crop.x,
          crop.y,
          crop.width,
          crop.height,
          0,
          0,
          500,
          500
        );

        canvas.toBlob((blob) => {
          const croppedImageUrl = URL.createObjectURL(blob);
          resolve(croppedImageUrl);
        }, "image/jpeg");
      };
      image.onerror = (err) => reject(err);
    });
  };

  // Apply the crop to the image
  const applyCrop = async () => {
    if (currentImageIndex !== null && croppedAreaPixels) {
      setIsCropping(true);
      const croppedImage = await getCroppedImg(
        images[currentImageIndex].id,
        croppedAreaPixels
      );
      const updatedImages = [...images];
      updatedImages[currentImageIndex] = {
        ...updatedImages[currentImageIndex],
        id: croppedImage,
      };
      setImages(updatedImages);

      // Move to the next image or close the modal
      if (currentImageIndex < images.length - 1) {
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
      } else {
        setCurrentImageIndex(null);
        setIsCroppingModalVisible(false);
      }
      setIsCropping(false);
    }
  };

  // Handle image edit
  const editImage = (index) => {
    setCurrentImageIndex(index);
    setIsCroppingModalVisible(true);
  };

  // Handle image delete
  const deleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle sorting
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setImages((prev) => {
        const oldIndex = prev.findIndex((item) => item.id === active.id);
        const newIndex = prev.findIndex((item) => item.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  return (
    <div>
      <input type="file" multiple accept="image/*" onChange={handleUpload} />
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={images.map((image) => image.id)}
          strategy={verticalListSortingStrategy}
        >
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {images.map((img, index) => (
              <SortableItem
                key={img.id}
                id={img.id}
                image={img}
                index={index}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Cropper Modal */}
      <Modal
        open={isCroppingModalVisible}
        footer={null}
        closable={false}
        centered
        width={600}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isCropping ? (
          <div style={{ textAlign: "center" }}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            {images[currentImageIndex]?.id && (
              <Cropper
                image={images[currentImageIndex].id}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, croppedAreaPixels) =>
                  setCroppedAreaPixels(croppedAreaPixels)
                }
              />
            )}
            <div style={{ marginTop: "1rem", textAlign: "center" }}>
              <Button type="primary" onClick={applyCrop}>
                Confirm Crop
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

// Sortable Item Component
function SortableItem({ id, image, index, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: "relative",
    border: "1px solid #ccc",
    borderRadius: "8px",
    overflow: "hidden",
    width: "150px",
    height: "150px",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <img
        src={image.id}
        alt={`Uploaded ${index}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <span
        style={{
          position: "absolute",
          top: "5px",
          left: "5px",
          background: "rgba(0, 0, 0, 0.7)",
          color: "white",
          padding: "2px 5px",
          borderRadius: "50%",
          fontSize: "12px",
        }}
      >
        {index + 1}
      </span>
      <div
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          display: "flex",
          gap: "5px",
        }}
        onClick={(e) => e.stopPropagation()} // Isolate buttons
      >
        <Button
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(index);
          }}
        >
          Edit
        </Button>
        <Button
          size="small"
          danger
          onClick={(e) => {
            e.stopPropagation();
            onDelete(index);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}



export default ImageUploader;
