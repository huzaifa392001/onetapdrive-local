import SecHeading from '@/Components/SecHeading/SecHeading'
import React from 'react'
import carColors from "@/DummyData/CarColors.json"

function CarColors({ register, errors }) {
    return (
        <div className="carColors">
            <div className="headingCont">
                <SecHeading heading={"Car Colors"} />
            </div>
            <div className="inputContainer">
                <div className={`inputCont ${errors?.colors?.exterior ? "error" : ''}`}>
                    <label htmlFor="colors.exterior">Car Exterior</label>
                    <select
                        id="colors.exterior"
                        {...register('colors.exterior', {
                            required: 'Car exterior color is required',
                        })}
                    >
                        <option disabled selected value="">Select Car Exterior Color</option>
                        {carColors?.map((color, index) => (
                            <option style={{ backgroundColor: color, color: color === 'Black' || color === "Blue" || color === "Purple" || color === "Green" || color === "Brown" ? "#fff" : "" }} value={color} key={index}>{color}</option>
                        ))}
                    </select>
                    {errors?.colors?.exterior && (
                        <p className='errorText'>{errors.colors.exterior.message}</p>
                    )}
                </div>
                <div className={`inputCont ${errors?.colors?.interior ? "error" : ''}`}>
                    <label htmlFor="colors.interior">Car Interior</label>
                    <select
                        id="colors.interior"
                        {...register('colors.interior', {
                            required: 'Car interior color is required',
                        })}
                    >
                        <option disabled selected value="">Select Car Interior Color</option>
                        {carColors?.map((color, index) => (
                            <option style={{ backgroundColor: color, color: color === 'Black' || color === "Blue" || color === "Purple" || color === "Green" || color === "Brown" ? "#fff" : "" }} value={color} key={index}>{color}</option>
                        ))}
                    </select>
                    {errors?.colors?.interior && (
                        <p className='errorText'>{errors.colors.interior.message}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CarColors