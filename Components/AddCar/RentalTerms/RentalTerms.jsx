import SecHeading from '@/Components/SecHeading/SecHeading'
import React from 'react'

function RentalTerms({ register, errors }) {
    return (
        <div className="carRentalTerms">
            <div className="headingCont">
                <SecHeading heading={"Rental Terms"} />
            </div>
            <div className="inputContainer">
                <div className={`inputCont ${errors?.security_deposit ? "error" : ''}`}>
                    <label htmlFor="security_deposit">Security Deposit</label>
                    <p class="small">Default Deposit is set to 0</p>
                    <input
                        id="security_deposit"
                        type="number"
                        name=""
                        value={0}
                        {...register("security_deposit", {
                            required: "Security Deposit is Required."
                        })}
                    />
                    {errors?.security_deposit && (
                        <p className='errorText'>{errors.security_deposit.message}</p>
                    )}
                </div>
                <div className={`inputCont ${errors?.delivery_charges ? "error" : ''}`}>
                    <label htmlFor="delivery_charges">Delivery & Pick up Charges</label>
                    <select
                        id="delivery_charges"
                        {...register('delivery_charges', {
                            required: 'Delivery & Pickup charges are required',
                        })}
                    >
                        <option value="" selected disabled>Select Deliver & Pickup Charges</option>
                        <option value="free_always">
                            Free Always
                        </option>
                        <option value="free_2_days_+" >
                            Free (2 Days +)
                        </option>
                        <option value="free_10_days_+" >
                            Free (10 Days +)
                        </option>
                        <option value="free_15_days_+" >
                            Free (15 Days +)
                        </option>
                        <option value="free_30_days_+" >
                            Free (30 Days +)
                        </option>
                    </select>
                    {errors?.delivery_charges && (
                        <p className='errorText'>{errors.delivery_charges.message}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RentalTerms