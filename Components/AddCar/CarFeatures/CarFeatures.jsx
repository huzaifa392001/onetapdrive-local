import React, { useState, memo, useCallback } from 'react'
import carFeatures from "@/DummyData/CarFeatures.json"
import SecHeading from '@/Components/SecHeading/SecHeading'

const CarFeatures = memo(function CarFeatures({ errors, register, edit }) {
    const [showAll, setShowAll] = useState(false);

    const handleShowAll = useCallback(() => {
        setShowAll((prev) => !prev);
    }, []);

    const handleShowAllLi = useCallback(() => {
        setShowAll(true);
    }, []);
    return (
        <div className="carFeatures">
            <div className="headingCont">
                <SecHeading heading={edit ? "Update Car Features" : "Car Features*"} />
            </div>
            <div className="inputContainer full">
                <div className={`inputCont full ${errors?.car_features ? "error" : ''}`}>
                    {/* <label htmlFor="car_features">Car Features*</label> */}
                    <ul className="featuresList">
                        {carFeatures.slice(0, showAll ? carFeatures.length : 5).map((features) => (
                            <li onClick={handleShowAllLi} className={`${errors?.car_features ? "errorInput" : ""}`} key={features}>
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

                        {!showAll && (
                            <li> <button onClick={handleShowAll} className="showAllButton">Show All</button></li>
                        )}
                        {showAll && (
                            <li> <button onClick={handleShowAll} className="showAllButton">Hide All</button></li>
                        )}
                    </ul>
                    {errors?.car_features && (
                        <p className='errorText'>{errors.car_features.message}</p>
                    )}
                </div>
            </div>
        </div>
    )
})

export default CarFeatures