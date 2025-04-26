import React, { useState, memo, useCallback } from "react";
import SecHeading from "@/Components/SecHeading/SecHeading";
import { useSelector } from "react-redux";
import { Controller } from "react-hook-form";

const CarFeatures = memo(function CarFeatures({ control, errors }) {
    const features = useSelector((state) => state.car.features);
    const [showAll, setShowAll] = useState(false);

    const handleShowAll = useCallback(() => {
        setShowAll((prev) => !prev);
    }, []);

    return (
        <div className="carFeatures">
            <div className="headingCont">
                <SecHeading heading="Car Features*" />
            </div>
            <div className="inputContainer full">
                <div className={`inputCont full ${errors?.featureIds ? "error" : ""}`}>
                    <Controller
                        name="featureIds"
                        control={control}
                        defaultValue={[]}
                        rules={{
                            required: "At least one feature is required",
                            validate: (value) => value.length > 0 || "Please select at least one feature"
                        }}
                        render={({ field: { value, onChange } }) => (
                            <>
                                <ul className="featuresList">
                                    {features.slice(0, showAll ? features.length : 5).map((feature) => {
                                        const isChecked = value?.includes(feature.id);
                                        return (
                                            <li key={feature.id}>
                                                <input
                                                    type="checkbox"
                                                    id={feature.id}
                                                    value={feature.id}
                                                    className="btn-check clip-hidden"
                                                    checked={isChecked}
                                                    onChange={() => {
                                                        const updated = isChecked
                                                            ? value.filter((id) => id !== feature.id)
                                                            : [...(value || []), feature.id];
                                                        onChange(updated);
                                                    }}
                                                />
                                                <label htmlFor={feature.id} className="btn-label">
                                                    {feature.name}
                                                </label>
                                            </li>
                                        );
                                    })}
                                    {features.length > 5 && (
                                        <li>
                                            <button onClick={handleShowAll} className="showAllButton" type="button">
                                                {showAll ? "Hide All" : "Show All"}
                                            </button>
                                        </li>
                                    )}
                                </ul>
                                {errors?.features && <p className="error-message">{errors.features.message}</p>}
                            </>
                        )}
                    />
                </div>
            </div>
        </div>
    );
});

export default CarFeatures;
