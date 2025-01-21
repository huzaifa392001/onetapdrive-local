import SecHeading from '@/Components/SecHeading/SecHeading'
import Image from 'next/image';
import React, { useState } from 'react'

function MulkiyaDetails({ register, setValue, errors }) {
    const [mulkiyaFrontPreview, setMulkiyaFrontPreview] = useState(null);
    const [mulkiyaBackPreview, setMulkiyaBackPreview] = useState(null);

    const handleImageChange = (e, setPreview, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result); // Set the preview image
            };
            reader.readAsDataURL(file);
            setValue(fieldName, file, { shouldValidate: true }); // Manually set the value for the file input
        }
    };

    return (
        <div className="mulkiyaDetails">
            <div className="headingCont">
                <SecHeading heading={"Mulkiya Details"} />
            </div>
            <div className="inputContainer">
                <div className={`inputCont img ${errors?.daily && errors.daily_km ? "error" : ""}`}>
                    <label htmlFor="mulkiya_front">Upload Registration Card (Mulkiya) Front</label>
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
                                    onChange={(e) => handleImageChange(e, setMulkiyaFrontPreview)}
                                />
                            </label>
                        )}
                    </div>
                    {errors?.mulkiya_front && (<p className='errorText'>{errors?.mulkiya_front?.message}</p>)}
                </div>
                <div className={`inputCont img ${errors?.daily && errors.daily_km ? "error" : ""}`}>
                    <label htmlFor="mulkiya_back">Upload Registration Card (Mulkiya) Back</label>
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
                                    onChange={(e) => handleImageChange(e, setMulkiyaBackPreview)}
                                />
                            </label>
                        )}
                    </div>
                    {errors?.mulkiya_back && (<p className='errorText'>{errors?.mulkiya_back?.message}</p>)}
                </div>
            </div>
        </div>
    )
}

export default MulkiyaDetails;
