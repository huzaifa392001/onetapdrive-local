import SecHeading from '@/Components/SecHeading/SecHeading'
import React from 'react'

function CarPricing({ register, setValue, errors }) {
    return (
        <div className="carDetails">
            <div className="headingCont">
                <SecHeading heading="Car Pricing" />
            </div>
            <div className="inputContainer">
                <div className={`inputCont full ${errors?.daily && errors.daily_km ? "error" : ""}`}>
                    <label htmlFor="brand">Price Per Day</label>
                    <div className="multiInput">
                        <input
                            {...register("daily", {
                                required: "Daily Price is Required"
                            })}
                            type="number"
                            placeholder='AED Charges'
                        />
                        <input
                            {...register("daily_km", {
                                required: "Daily Price KM is Required"
                            })}
                            type="number"
                            placeholder='KMs'
                        />
                    </div>
                    {errors?.daily && errors?.daily_km && (<p className='errorText'>Daily Price OR Daily Milleage Is Required</p>)}
                </div>
                <div className={`inputCont full ${errors?.weekly && errors.weekly_km ? "error" : ""}`}>
                    <label htmlFor="brand">Price Per Week</label>
                    <div className="multiInput">
                        <input
                            {...register("weekly", {
                                required: "Weekly Price is Required"
                            })}
                            type="number"
                            placeholder='AED Charges'
                        />
                        <input
                            {...register("weekly_km", {
                                required: "Weekly Price KM is Required"
                            })}
                            type="number"
                            placeholder='KMs'
                        />
                    </div>
                    {errors?.weekly && errors?.weekly_km && (<p className='errorText'>Weekly Price OR Weekly Milleage Is Required</p>)}
                </div>
                <div className={`inputCont full ${errors?.monthly && errors.monthly_km ? "error" : ""}`}>
                    <label htmlFor="brand">Price Per Month</label>
                    <div className="multiInput">
                        <input
                            {...register("monthly", {
                                required: "Monthly Price is Required"
                            })}
                            type="number"
                            placeholder='AED Charges'
                        />
                        <input
                            {...register("monthly_km", {
                                required: "Monthly Price KM is Required"
                            })}
                            type="number"
                            placeholder='KMs'
                        />
                    </div>
                    {errors?.monthly && errors?.monthly_km && (<p className='errorText'>Monthly Price OR Monthly Milleage Is Required</p>)}
                </div>
            </div>
        </div>
    )
}

export default CarPricing