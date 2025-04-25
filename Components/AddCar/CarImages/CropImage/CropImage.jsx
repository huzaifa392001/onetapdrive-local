import React, { memo, useState } from 'react';
import Cropper from 'react-easy-crop';
import './CropImage.scss';
import getCroppedImg from './GetCroppedImage';

function CropImage({ image, onCropComplete, onCancel }) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropCompleteHandler = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (croppedAreaPixels) {
            try {
                const croppedImg = await getCroppedImg(image, croppedAreaPixels); // Apply cropping
                onCropComplete(croppedImg); // Pass cropped image back to parent
            } catch (error) {
                console.error("Error cropping image", error);
            }
        }
    };

    return (
        <div className="imgCropModal">
            <div className="modalContent">
                <div className="cropperCont">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={4 / 3}
                        onCropChange={setCrop}
                        onCropComplete={onCropCompleteHandler}
                        onZoomChange={setZoom}
                    />
                </div>
                <div className="btnCont">
                    {/* <button className="themeBtn cancel" onClick={onCancel}>
                        Cancel
                    </button> */}
                    <button className="themeBtn" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default memo(CropImage);
