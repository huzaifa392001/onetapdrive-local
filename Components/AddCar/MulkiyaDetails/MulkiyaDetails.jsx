import SecHeading from '@/Components/SecHeading/SecHeading'
import Image from 'next/image';
import React, { memo, useState } from 'react'

function MulkiyaDetails({ register, setValue, errors, edit }) {
    const [mulkiyaFrontPreview, setMulkiyaFrontPreview] = useState(null);
    const [mulkiyaBackPreview, setMulkiyaBackPreview] = useState(null);

    const handleImageChange = (e, setPreview, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            // Convert the file to a blob and create a URL
            const blob = new Blob([file], { type: file.type });
            const url = URL.createObjectURL(blob);

            // Set the preview image as the URL of the Blob
            setPreview(url);

            // Manually set the value for the file input as a Blob
            setValue(fieldName, blob, { shouldValidate: true });
        }
    };

    return (
        <div className="mulkiyaDetails">
            <div className="headingCont">
                <SecHeading heading={edit ? "Update Mulkiya Details" : "Mulkiya Details"} />
            </div>
            <div className="inputContainer">
                <label htmlFor="mulkiyaFront">Mulkiya Front</label>
                <input
                    type="file"
                    id="mulkiyaFront"
                    {...register("mulkiyaFront", { required: "Mulkiya Front is required" })}
                    onChange={(e) => handleImageChange(e, setMulkiyaFrontPreview, "mulkiyaFront")}
                />
                {errors.mulkiyaFront && <p className="errorText">{errors.mulkiyaFront.message}</p>}
                {mulkiyaFrontPreview && (
                    <div className="imagePreview">
                        <Image src={mulkiyaFrontPreview} alt="Mulkiya Front Preview" width={100} height={100} />
                    </div>
                )}
            </div>
            <div className="inputContainer">
                <label htmlFor="mulkiyaBack">Mulkiya Back</label>
                <input
                    type="file"
                    id="mulkiyaBack"
                    {...register("mulkiyaBack", { required: "Mulkiya Back is required" })}
                    onChange={(e) => handleImageChange(e, setMulkiyaBackPreview, "mulkiyaBack")}
                />
                {errors.mulkiyaBack && <p className="errorText">{errors.mulkiyaBack.message}</p>}
                {mulkiyaBackPreview && (
                    <div className="imagePreview">
                        <Image src={mulkiyaBackPreview} alt="Mulkiya Back Preview" width={100} height={100} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default memo(MulkiyaDetails);