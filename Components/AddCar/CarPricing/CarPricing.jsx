import SecHeading from '@/Components/SecHeading/SecHeading'
import React from 'react'

function CarPricing({ register, errors }) {
    return (
        <div className="carDetails">
            <div className="headingCont">
                <SecHeading heading="Car Pricing" />
            </div>
            <div className="inputContainer">
                <div className={`inputCont full ${errors?.daily_price && errors.daily_milleage ? "error" : ""}`}>
                    <label htmlFor="brand">Price Per Day</label>
                    <div className="multiInput">
                        <input
                            {...register("daily_price", {
                                required: "Daily Price is Required"
                            })}
                            type="number"
                            placeholder='AED Charges'
                        />
                        <input
                            {...register("daily_milleage", {
                                required: "Daily Price KM is Required"
                            })}
                            type="number"
                            placeholder='KMs'
                        />
                    </div>
                    {errors?.daily_price && errors?.daily_milleage && (<p className='errorText'>Daily Price OR Daily Milleage Is Required</p>)}
                </div>
                <div className={`inputCont full ${errors?.weekly_price && errors.weekly_milleage ? "error" : ""}`}>
                    <label htmlFor="weekly_price">Price Per Week</label>
                    <div className="multiInput">
                        <input
                            {...register("weekly_price", {
                                required: "Weekly Price is Required"
                            })}
                            type="number"
                            placeholder='AED Charges'
                        />
                        <input
                            {...register("weekly_milleage", {
                                required: "Weekly Price KM is Required"
                            })}
                            type="number"
                            placeholder='KMs'
                        />
                    </div>
                    {errors?.weekly_price && errors?.weekly_milleage && (<p className='errorText'>Weekly Price OR Weekly Milleage Is Required</p>)}
                </div>
                <div className={`inputCont full ${errors?.monthly_price && errors.monthly_milleage ? "error" : ""}`}>
                    <label htmlFor="monthly_price">Price Per Month</label>
                    <div className="multiInput">
                        <input
                            id="monthly_price"
                            {...register("monthly_price", {
                                required: "Monthly Price is Required"
                            })}
                            type="number"
                            placeholder='AED Charges'
                        />
                        <input
                            {...register("monthly_milleage", {
                                required: "Monthly Price KM is Required"
                            })}
                            type="number"
                            placeholder='KMs'
                        />
                    </div>
                    {errors?.monthly_price && errors?.monthly_milleage && (<p className='errorText'>Monthly Price OR Monthly Milleage Is Required</p>)}
                </div>
            </div>
        </div>
    )
}

export default CarPricing