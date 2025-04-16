import SecHeading from "@/Components/SecHeading/SecHeading";
import Image from "next/image";
import React, { memo, useState } from "react";
import { Controller } from "react-hook-form";

const MulkiyaDetails = memo(function MulkiyaDetails({ edit, control, errors }) {
    const [mulkiyaFrontPreview, setMulkiyaFrontPreview] = useState(null);
    const [mulkiyaBackPreview, setMulkiyaBackPreview] = useState(null);

    const handleImageChange = (e, setPreview, setFile) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
            setFile(file); // Store the actual file
        }
    };

    return (
        <div className="mulkiyaDetails">
            <div className="headingCont">
                <SecHeading heading={edit ? "Update Mulkiya Details" : "Mulkiya Details"} />
            </div>

            <div className="inputContainer">
                <label htmlFor="mulkiyaFront">Mulkiya Front</label>
                <Controller
                    name="registrationCardFront"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <>
                            <input
                                type="file"
                                id="mulkiyaFront"
                                onChange={(e) => {
                                    handleImageChange(e, setMulkiyaFrontPreview, onChange); // Set the actual file
                                }}
                            />
                            {mulkiyaFrontPreview && (
                                <div className="imagePreview">
                                    <Image
                                        src={mulkiyaFrontPreview}
                                        alt="Mulkiya Front Preview"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            )}
                        </>
                    )}
                />
            </div>

            <div className="inputContainer">
                <label htmlFor="mulkiyaBack">Mulkiya Back</label>
                <Controller
                    name="registrationCardBack"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <>
                            <input
                                type="file"
                                id="mulkiyaBack"
                                onChange={(e) => {
                                    handleImageChange(e, setMulkiyaBackPreview, onChange); // Set the actual file
                                }}
                            />
                            {mulkiyaBackPreview && (
                                <div className="imagePreview">
                                    <Image
                                        src={mulkiyaBackPreview}
                                        alt="Mulkiya Back Preview"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            )}
                        </>
                    )}
                />
            </div>

            <div className={`inputCont ${errors?.registrationCardExpiryDate ? "error" : ""}`}>
                <Controller
                    name="registrationCardExpiryDate"
                    control={control}
                    rules={{
                        required: "Mulkiya Expiry Date is required",
                        validate: value => {
                            const selectedDate = new Date(value);
                            const today = new Date();
                            today.setHours(0, 0, 0, 0); // Reset time to start of day for proper comparison

                            return selectedDate >= today || "Expiry date cannot be in the past";
                        }
                    }}
                    render={({ field }) => {
                        // Get today's date in YYYY-MM-DD format to use as min attribute
                        const today = new Date();
                        const yyyy = today.getFullYear();
                        const mm = String(today.getMonth() + 1).padStart(2, '0');
                        const dd = String(today.getDate()).padStart(2, '0');
                        const minDate = `${yyyy}-${mm}-${dd}`;

                        return (
                            <input
                                {...field}
                                type="date"
                                placeholder="Mulkiya Expiry Date*"
                                min={minDate}
                            />
                        );
                    }}
                />
                {errors?.registrationCardExpiryDate && (
                    <p className="error-message">{errors.registrationCardExpiryDate.message}</p>
                )}
            </div>

        </div>
    );
});

export default MulkiyaDetails;
