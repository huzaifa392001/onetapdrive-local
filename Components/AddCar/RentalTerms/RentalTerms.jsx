import SecHeading from "@/Components/SecHeading/SecHeading";
import React, { memo } from "react";
import { Controller } from "react-hook-form";

const RentalTerms = memo(function RentalTerms({ edit, control, errors }) {
    return (
        <div className="carRentalTerms">
            <div className="headingCont">
                <SecHeading heading={edit ? "Update Rental Terms" : "Rental Terms"} />
            </div>
            <div className="inputContainer">
                <div className={`inputCont ${errors?.securityDepositAmount ? "error" : ""}`}>
                    <Controller
                        name="securityDepositAmount"
                        control={control}
                        rules={{ 
                            required: "Security deposit amount is required",
                            min: { value: 0, message: "Amount must be positive" }
                        }}
                        render={({ field }) => (
                            <input 
                                {...field} 
                                type="number" 
                                placeholder="Security Deposit Amount*" 
                            />
                        )}
                    />
                    <p className="small">Default Deposit is set to 0</p>
                    {errors?.securityDepositAmount && (
                        <p className="error-message">{errors.securityDepositAmount.message}</p>
                    )}
                </div>

                <div className={`inputCont ${errors?.deliveryPickupCharge ? "error" : ""}`}>
                    <Controller
                        name="deliveryPickupCharge"
                        control={control}
                        rules={{ required: "Delivery pickup charge is required" }}
                        render={({ field }) => (
                            <select id="delivery_charges" {...field}>
                                <option value="">
                                    Select Delivery & Pickup Charges*
                                </option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                                <option value="300">300</option>
                                <option value="400">400</option>
                                <option value="500">500</option>
                                <option value="600">600</option>
                                <option value="700">700</option>
                            </select>
                        )}
                    />
                    {errors?.deliveryPickupCharge && (
                        <p className="error-message">{errors.deliveryPickupCharge.message}</p>
                    )}
                </div>
            </div>
        </div>
    );
});

export default RentalTerms;
