import SecHeading from '@/Components/SecHeading/SecHeading'
import React from 'react'

function CarSpecs({ errors, register, edit }) {
    return (
        <div className="carColors">
            <div className="headingCont">
                <SecHeading heading={edit ? "Update Car Specs" : "Car Specs"} />
            </div>
            <div className="inputContainer">
                <div className={`inputCont ${errors?.car_doors ? "error" : ''}`}>
                    {/* <label htmlFor="car_doors">Car Doors*</label> */}
                    <select
                        id="car_doors"
                        {...register('car_doors', {
                            required: 'Car Doors are required',
                        })}
                    >
                        <option disabled selected value="">Select Car Doors*</option>
                        <option value="2">2 Doors</option>
                        <option value="4">4 Doors</option>
                    </select>
                    {errors?.car_doors && (
                        <p className='errorText'>{errors.car_doors.message}</p>
                    )}
                </div>
                <div className={`inputCont ${errors?.car_transmission ? "error" : ''}`}>
                    {/* <label htmlFor="car_transmission">Car Transmission*</label> */}
                    <select
                        id="car_transmission"
                        {...register('car_transmission', {
                            required: 'Car Transmission is required',
                        })}
                    >
                        <option disabled selected value="">Select Car Transmission*</option>
                        <option value="manual">Manual</option>
                        <option value="automatic">Automatic</option>
                    </select>
                    {errors?.car_transmission && (
                        <p className='errorText'>{errors.car_transmission.message}</p>
                    )}
                </div>
                <div className={`inputCont ${errors?.bags_fit ? "error" : ''}`}>
                    {/* <label htmlFor="bags_fit">Bags Fit*</label> */}
                    <select
                        id="bags_fit"
                        {...register('bags_fit', {
                            required: 'Bag(s) Fits is required',
                        })}
                    >
                        <option disabled selected value="">Select Bags Limit*</option>
                        <option value="1">1 Bag</option>
                        <option value="2">3 Bags</option>
                        <option value="3">5 Bags</option>
                    </select>
                    {errors?.bags_fit && (
                        <p className='errorText'>{errors.bags_fit.message}</p>
                    )}
                </div>
                <div className={`inputCont ${errors?.fuel_type ? "error" : ''}`}>
                    {/* <label htmlFor="fuel_type">Fuel Type*</label> */}
                    <select
                        id="fuel_type"
                        {...register('fuel_type', {
                            required: 'Fuel Type is required',
                        })}
                    >
                        <option disabled selected value="">Select Fuel Type*</option>
                        <option value="petrol">Petrol</option>
                        <option value="diesel">Diesel</option>
                        <option value="electric">Electric</option>
                        <option value="hybrid">Hybrid</option>
                    </select>
                    {errors?.fuel_type && (
                        <p className='errorText'>{errors.fuel_type.message}</p>
                    )}
                </div>
                <div className={`inputCont ${errors?.seating_capacity ? "error" : ''}`}>
                    {/* <label htmlFor="seating_capacity">Seating Capacity*</label> */}
                    <select
                        id="seating_capacity"
                        {...register('seating_capacity', {
                            required: 'Seating Capacity is required',
                        })}
                    >
                        <option disabled selected value="">Select Seating Capacity*</option>
                        <option value="2">2 Seats</option>
                        <option value="4">4 Seats</option>
                        <option value="5">5 Seats</option>
                        <option value="7">7 Seats</option>
                    </select>
                    {errors?.seating_capacity && (
                        <p className='errorText'>{errors.seating_capacity.message}</p>
                    )}
                </div>
                <div className={`inputCont ${errors?.car_specs ? "error" : ''}`}>
                    {/* <label htmlFor="car_specs">Car Specs*</label> */}
                    <select
                        id="car_specs"
                        {...register('car_specs', {
                            required: 'Car Specs are required',
                        })}
                    >
                        <option disabled selected value="">Select Car Specs*</option>
                        <option value="american">American Specs</option>
                        <option value="asia">Asia Specs</option>
                        <option value="europe">Europe Specs</option>
                        <option value="gcc">GCC Specs</option>
                    </select>
                    {errors?.car_specs && (
                        <p className='errorText'>{errors.car_specs.message}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CarSpecs