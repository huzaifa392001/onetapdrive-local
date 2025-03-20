import SecHeading from '@/Components/SecHeading/SecHeading'
import React, { memo } from 'react'

const CarPricing = memo(function CarPricing({ register, errors, edit }) {
    return (
        <div className="carDetails">
            <div className="headingCont">
                <SecHeading heading={edit ? "Update Car Pricing" : "Car Pricing"} />
            </div>
            <div className="inputContainer">
                <div className={`inputCont full ${errors?.daily_price && errors.daily_milleage ? "error" : ""}`}>
                    <label htmlFor="brand">Price Per Day*</label>
                    <div className="multiInput">
                        <input
                            className={`${errors?.dailyPrice ? 'errorInput' : ""}`}
                            {...register("daily_price", {
                                required: "Daily Price is Required"
                            })}
                            type="number"
                            placeholder='AED Charges'
                        />
                        <input
                            className={`${errors?.daily_milleage ? 'errorInput' : ""}`}
                            {...register("daily_milleage", {
                                required: "Daily Price KM is Required"
                            })}
                            type="number"
                            placeholder='KMs'
                        />
                    </div>
                    {errors?.daily_price || errors?.daily_milleage ? (<p className='errorText'>Daily Price OR Daily Milleage Is Required</p>) : ""}
                </div>
                <div className={`inputCont full ${errors?.weekly_price && errors.weekly_milleage ? "error" : ""}`}>
                    <label htmlFor="weekly_price">Price Per Week <span className="small">(Optional)</span></label>
                    <div className="multiInput">
                        <input
                            className={`${errors?.weekly_price ? 'errorInput' : ""}`}
                            {...register("weekly_price", {

                            })}
                            type="number"
                            placeholder='AED Charges'
                        />
                        <input
                            className={`${errors?.weekly_milleage ? 'errorInput' : ""}`}
                            {...register("weekly_milleage", {

                            })}
                            type="number"
                            placeholder='KMs'
                        />
                    </div>
                    {errors?.weekly_price || errors?.weekly_milleage ? (<p className='errorText'>Weekly Price OR Weekly Milleage Is Required</p>) : ""}
                </div>
                <div className={`inputCont full ${errors?.monthly_price && errors.monthly_milleage ? "error" : ""}`}>
                    <label htmlFor="monthly_price">Price Per Month <span className="small">(Optional)</span></label>
                    <div className="multiInput">
                        <input
                            className={`${errors?.monthly_price ? 'errorInput' : ""}`}
                            id="monthly_price"
                            {...register("monthly_price", {

                            })}
                            type="number"
                            placeholder='AED Charges'
                        />
                        <input
                            className={`${errors?.monthly_milleage ? 'errorInput' : ""}`}
                            {...register("monthly_milleage", {

                            })}
                            type="number"
                            placeholder='KMs'
                        />
                    </div>
                    {errors?.monthly_price || errors?.monthly_milleage ? (<p className='errorText'>Monthly Price OR Monthly Milleage Is Required</p>) : ""}
                </div>
            </div>
        </div>
    )
})

export default CarPricing