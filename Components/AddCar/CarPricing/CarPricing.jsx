import SecHeading from "@/Components/SecHeading/SecHeading";
import React, { memo } from "react";
import { Controller } from "react-hook-form";

const CarPricing = memo(function CarPricing({ control, edit, errors }) {
    return (
        <div className="carDetails">
            <div className="headingCont">
                <SecHeading heading={edit ? "Update Car Pricing" : "Car Pricing"} />
            </div>
            <div className="inputContainer">
                {/* Daily */}
                <div
                    className={`inputCont full ${
                        errors?.prices?.[0]?.price || errors?.prices?.[0]?.kilometers ? "error" : ""
                    }`}
                >
                    <label>Price Per Day*</label>
                    <div className="multiInput">
                        <Controller
                            name="prices.0.price"
                            control={control}
                            rules={{ required: "Daily price is required" }}
                            render={({ field }) => <input {...field} type="number" placeholder="AED Charges*" />}
                        />
                        <Controller
                            name="prices.0.kilometers"
                            control={control}
                            rules={{ required: "Daily kilometers is required" }}
                            render={({ field }) => <input {...field} type="number" placeholder="KMs*" />}
                        />
                    </div>
                    {(errors?.prices?.[0]?.price || errors?.prices?.[0]?.kilometers) && (
                        <div className="error-container">
                            {errors?.prices?.[0]?.price && (
                                <p className="error-message">{errors.prices[0].price.message}</p>
                            )}
                            {errors?.prices?.[0]?.kilometers && (
                                <p className="error-message">{errors.prices[0].kilometers.message}</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Weekly */}
                <div
                    className={`inputCont full ${
                        errors?.prices?.[1]?.price || errors?.prices?.[1]?.kilometers ? "error" : ""
                    }`}
                >
                    <label>
                        Price Per Week <span className="small">(Optional)</span>
                    </label>
                    <div className="multiInput">
                        <Controller
                            name="prices.1.price"
                            control={control}
                            render={({ field }) => <input {...field} type="number" placeholder="AED Charges" />}
                        />
                        <Controller
                            name="prices.1.kilometers"
                            control={control}
                            render={({ field }) => <input {...field} type="number" placeholder="KMs" />}
                        />
                    </div>
                    {(errors?.prices?.[1]?.price || errors?.prices?.[1]?.kilometers) && (
                        <div className="error-container">
                            {errors?.prices?.[1]?.price && (
                                <p className="error-message">{errors.prices[1].price.message}</p>
                            )}
                            {errors?.prices?.[1]?.kilometers && (
                                <p className="error-message">{errors.prices[1].kilometers.message}</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Monthly */}
                <div
                    className={`inputCont full ${
                        errors?.prices?.[2]?.price || errors?.prices?.[2]?.kilometers ? "error" : ""
                    }`}
                >
                    <label>
                        Price Per Month <span className="small">(Optional)</span>
                    </label>
                    <div className="multiInput">
                        <Controller
                            name="prices.2.price"
                            control={control}
                            render={({ field }) => <input {...field} type="number" placeholder="AED Charges" />}
                        />
                        <Controller
                            name="prices.2.kilometers"
                            control={control}
                            render={({ field }) => <input {...field} type="number" placeholder="KMs" />}
                        />
                    </div>
                    {(errors?.prices?.[2]?.price || errors?.prices?.[2]?.kilometers) && (
                        <div className="error-container">
                            {errors?.prices?.[2]?.price && (
                                <p className="error-message">{errors.prices[2].price.message}</p>
                            )}
                            {errors?.prices?.[2]?.kilometers && (
                                <p className="error-message">{errors.prices[2].kilometers.message}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

export default CarPricing;
