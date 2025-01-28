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
                <div className={`inputCont img ${errors?.daily && errors.daily_km ? "error" : ""}`}>
                    <label htmlFor="mulkiya_front">Upload Registration Card (Mulkiya) Front*</label>
                    <div className="imgInput">
                        {mulkiyaFrontPreview ? (
                            <div className='imgBox'>
                                <Image src={mulkiyaFrontPreview} width={300} height={80} alt='Mulkiya Back' />
                                <div className="actions">
                                    <button onClick={() => setMulkiyaFrontPreview("")}>
                                        <i className="fas fa-trash" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <label htmlFor="mulkiya_front">
                                "Click to Upload"
                                <input {...register("mulkiya_front", {
                                    required: "Mulkiya Front Image is Required"
                                })}
                                    type="file"
                                    name=""
                                    id="mulkiya_front"
                                    onChange={(e) => handleImageChange(e, setMulkiyaFrontPreview, "mulkiya_front")}
                                />
                            </label>
                        )}
                    </div>
                    {errors?.mulkiya_front && (<p className='errorText'>{errors?.mulkiya_front?.message}</p>)}
                </div>
                <div className={`inputCont img ${errors?.daily && errors.daily_km ? "error" : ""}`}>
                    <label htmlFor="mulkiya_back">Upload Registration Card (Mulkiya) Back*</label>
                    <div className="imgInput">
                        {mulkiyaBackPreview ? (
                            <div className='imgBox'>
                                <Image src={mulkiyaBackPreview} width={300} height={80} alt='Mulkiya Back' />
                                <div className="actions">
                                    <button onClick={() => setMulkiyaBackPreview("")}>
                                        <i className="fas fa-trash" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <label htmlFor="mulkiya_back">
                                "Click to Upload"
                                <input {...register("mulkiya_back", {
                                    required: "Mulkiya Back Image is Required"
                                })}
                                    type="file"
                                    name=""
                                    id="mulkiya_back"
                                    onChange={(e) => handleImageChange(e, setMulkiyaBackPreview, "mulkiya_back")}
                                />
                            </label>
                        )}
                    </div>
                    {errors?.mulkiya_back && (<p className='errorText'>{errors?.mulkiya_back?.message}</p>)}
                </div>
            </div>
        </div>
    );
}

export default memo(MulkiyaDetails);
