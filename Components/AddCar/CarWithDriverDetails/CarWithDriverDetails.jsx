import SecHeading from "@/Components/SecHeading/SecHeading";
import React, { memo } from "react";
import { Controller } from "react-hook-form";

const CarWithDriverDetails = memo(function CarWithDriverDetails({ control, edit, errors }) {
    return (
        <div className="carDetails">
            <div className="headingCont">
                <SecHeading heading={edit ? "Update Car With Driver" : "Car With Driver"} />
            </div>
            <div className="inputContainer">
                {/* Service Type */}
                <div className={`inputCont full ${errors?.serviceTypeId ? "error" : ""}`}>
                    <label>Service Type*</label>
                    <Controller
                        name="serviceTypeId"
                        control={control}
                        rules={{ required: "Service Type is required" }}
                        render={({ field }) => (
                            <input {...field} type="text" placeholder="Enter service type (e.g. Chauffeur)" />
                        )}
                    />
                    {errors?.serviceTypeId && (
                        <p className="error-message">{errors.serviceTypeId.message}</p>
                    )}
                </div>

                {/* Maximum Passengers */}
                <div className={`inputCont full ${errors?.maximumPassengersAllow ? "error" : ""}`}>
                    <label>Maximum Passengers Allowed*</label>
                    <Controller
                        name="maximumPassengersAllow"
                        control={control}
                        rules={{ required: "Max passengers allowed is required" }}
                        render={({ field }) => (
                            <input {...field} type="number" placeholder="Enter max passengers" />
                        )}
                    />
                    {errors?.maximumPassengersAllow && (
                        <p className="error-message">{errors.maximumPassengersAllow.message}</p>
                    )}
                </div>

                {/* Luggage */}
                <div className={`inputCont full ${errors?.luggage ? "error" : ""}`}>
                    <label>Luggage Capacity*</label>
                    <Controller
                        name="luggage"
                        control={control}
                        rules={{ required: "Luggage info is required" }}
                        render={({ field }) => (
                            <input {...field} type="text" placeholder="Enter luggage details" />
                        )}
                    />
                    {errors?.luggage && (
                        <p className="error-message">{errors.luggage.message}</p>
                    )}
                </div>
            </div>
        </div>
    );
});

export default CarWithDriverDetails;
