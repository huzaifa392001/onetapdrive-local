import React from 'react'
import carFeatures from "@/DummyData/CarFeatures.json"
import SecHeading from '@/Components/SecHeading/SecHeading'

function CarFeatures({ errors, register }) {
    return (
        <div className="carFeatures">
            <div className="headingCont">
                <SecHeading heading={"Car Specs"} />
            </div>
            <div className="inputContainer full">
                <div className={`inputCont full ${errors?.car_doors ? "error" : ''}`}>
                    <label htmlFor="car_doors">Car Doors</label>
                    <ul className="featuresList">
                        {carFeatures.map((features) => (
                            <li key={features}>
                                <input
                                    type="checkbox"
                                    id={features}
                                    value={features}
                                    className="btn-check clip-hidden"
                                    {...register("features", {
                                        validate: (value) =>
                                            value.length > 0 ||
                                            "Please select at least one car feature",
                                    })}
                                />
                                <label htmlFor={features} className="btn-label">
                                    {features}
                                </label>
                            </li>
                        ))}
                    </ul>
                    {errors?.car_doors && (
                        <p className='errorText'>{errors.car_doors.message}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CarFeatures