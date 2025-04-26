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
            setFile(file);
        }
    };

    const handleRemoveImage = (setPreview, setFile) => {
        setPreview(null);
        setFile(null);
    };

    return (
        <div className="mulkiyaDetails">
            <div className="headingCont">
                <SecHeading heading={edit ? "Update Mulkiya Details" : "Mulkiya Details"} />
            </div>

            {/* Mulkiya Front */}
            <div className="inputContainer">
                <Controller
                    name="registrationCardFront"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <div className={`inputCont ${errors?.registrationCardFront ? "error" : ""}`}>
                            <div className="imgInput">
                                {!mulkiyaFrontPreview ? (
                                    <label>
                                        Mulkiya Front
                                        <input
                                            type="file"
                                            id="mulkiyaFront"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, setMulkiyaFrontPreview, onChange)}
                                        />
                                    </label>
                                ) : (
                                    <div className="imgBox">
                                        <Image
                                            src={mulkiyaFrontPreview || "/images/noImage.jpg"}
                                            alt="Mulkiya Front"
                                            fill
                                            style={{ objectFit: "cover" }}
                                        />
                                        <div className="actions">
                                            <span onClick={() => handleRemoveImage(setMulkiyaFrontPreview, onChange)}>
                                                <i className="fas fa-times" />
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                />
                <Controller
                    name="registrationCardBack"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <div className={`inputCont ${errors?.registrationCardBack ? "error" : ""}`}>
                            <div className="imgInput">
                                {!mulkiyaBackPreview ? (
                                    <label>
                                        Mulkiya Back
                                        <input
                                            type="file"
                                            id="mulkiyaBack"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, setMulkiyaBackPreview, onChange)}
                                        />
                                    </label>
                                ) : (
                                    <div className="imgBox">
                                        <Image
                                            src={mulkiyaBackPreview || "/images/noImage.jpg"}
                                            alt="Mulkiya Back"
                                            fill
                                            style={{ objectFit: "cover" }}
                                        />
                                        <div className="actions">
                                            <span onClick={() => handleRemoveImage(setMulkiyaBackPreview, onChange)}>
                                                <i className="fas fa-times" />
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                />
            </div>

            {/* Expiry Date */}
            <div className={`inputCont ${errors?.registrationCardExpiryDate ? "error" : ""}`}>
                <label>Mulkiya Expiry Date</label>
                <Controller
                    name="registrationCardExpiryDate"
                    control={control}
                    rules={{
                        required: "Mulkiya Expiry Date is required",
                        validate: (value) => {
                            const selectedDate = new Date(value);
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return selectedDate >= today || "Expiry date cannot be in the past";
                        }
                    }}
                    render={({ field }) => {
                        const today = new Date();
                        const yyyy = today.getFullYear();
                        const mm = String(today.getMonth() + 1).padStart(2, "0");
                        const dd = String(today.getDate()).padStart(2, "0");
                        const minDate = `${yyyy}-${mm}-${dd}`;

                        return <input {...field} type="date" placeholder="Mulkiya Expiry Date*" min={minDate} />;
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
