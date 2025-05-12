import SecHeading from "@/Components/SecHeading/SecHeading";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Controller } from "react-hook-form";

const CarSpecs = memo(function CarSpecs({ control, errors, cwd }) {
    const doorsData = useSelector((state) => state.car.doors);
    const transmissionData = useSelector((state) => state.car.transmission);
    const bagsData = useSelector((state) => state.car.bags);
    const fuelTypeData = useSelector((state) => state.car.fuelType);
    const specsData = useSelector((state) => state.car.specs);
    const seatingData = useSelector((state) => state.car.seating);

    return (
        <div className="carColors">
            <div className="headingCont">
                <SecHeading heading="Car Specs" />
            </div>
            <div className="inputContainer">
                {/* Car Doors */}
                <div className={`inputCont ${errors?.doorId ? "error" : ""}`}>
                    <Controller
                        name="doorId"
                        control={control}
                        rules={{ required: "Door specification is required" }}
                        render={({ field }) => (
                            <select {...field} id="car_doors">
                                <option value="">Select Car Doors*</option>
                                {doorsData?.map((item, index) => (
                                    <option key={index} value={item?.id}>
                                        {item?.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                    {errors?.doorId && <p className="error-message">{errors.doorId.message}</p>}
                </div>

                {/* Transmission */}
                <div className={`inputCont  ${errors?.transmissionId ? "error" : ""}`}>
                    <Controller
                        name="transmissionId"
                        control={control}
                        rules={{ required: "Transmission type is required" }}
                        render={({ field }) => (
                            <select {...field} id="car_transmission">
                                <option value="">Select Car Transmission*</option>
                                {transmissionData?.map((item, index) => (
                                    <option key={index} value={item?.id}>
                                        {item?.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                    {errors?.transmissionId && <p className="error-message">{errors.transmissionId.message}</p>}
                </div>

                {/* Bags */}
                <div className={`inputCont ${errors?.bagFitId ? "error" : ""}`}>
                    <Controller
                        name="bagFitId"
                        control={control}
                        rules={{ required: "Bag fit specification is required" }}
                        render={({ field }) => (
                            <select {...field} id="bags_fit">
                                <option value="">Select Bags Limit*</option>
                                {bagsData?.map((item, index) => (
                                    <option key={index} value={item?.id}>
                                        {item?.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                    {errors?.bagFitId && <p className="error-message">{errors.bagFitId.message}</p>}
                </div>

                {/* Fuel Type */}
                <div className={`inputCont ${errors?.fuelTypeId ? "error" : ""}`}>
                    <Controller
                        name="fuelTypeId"
                        control={control}
                        rules={{ required: "Fuel type is required" }}
                        render={({ field }) => (
                            <select {...field} id="fuel_type">
                                <option value="">Select Fuel Type*</option>
                                {fuelTypeData?.map((item, index) => (
                                    <option key={index} value={item?.id}>
                                        {item?.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                    {errors?.fuelTypeId && <p className="error-message">{errors.fuelTypeId.message}</p>}
                </div>

                {/* Seating Capacity */}
                <div className={`inputCont ${errors?.seatingCapacityId ? "error" : ""}`}>
                    <Controller
                        name="seatingCapacityId"
                        control={control}
                        rules={{ required: "Seating capacity is required" }}
                        render={({ field }) => (
                            <select {...field} id="seating_capacity">
                                <option value="">Select Seating Capacity*</option>
                                {seatingData?.map((item, index) => (
                                    <option key={index} value={item?.id}>
                                        {item?.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                    {errors?.seatingCapacityId && <p className="error-message">{errors.seatingCapacityId.message}</p>}
                </div>

                {/* Car Specs */}
                <div className={`inputCont ${errors?.specId ? "error" : ""}`}>
                    <Controller
                        name="specId"
                        control={control}
                        rules={{ required: "Car specification is required" }}
                        render={({ field }) => (
                            <select {...field} id="car_specs">
                                <option value="">Select Car Specs*</option>
                                {specsData?.map((item, index) => (
                                    <option key={index} value={item?.id}>
                                        {item?.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                    {errors?.specId && <p className="error-message">{errors.specId.message}</p>}
                </div>

                {cwd && (
                    <>
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
                            {errors?.serviceTypeId && <p className="error-message">{errors.serviceTypeId.message}</p>}
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
                            {errors?.luggage && <p className="error-message">{errors.luggage.message}</p>}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
});

export default CarSpecs;
