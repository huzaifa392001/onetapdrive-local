import SecHeading from '@/Components/SecHeading/SecHeading';
import React from 'react';
import carData from '@/DummyData/carBrandsModels.json'; // Import carData from JSON
import carCategories from "@/DummyData/Categories.json"

function CarDetails({ register, watch, setValue, errors, edit }) {
    const selectedBrand = watch('car_brand');

    const handleBrandChange = (e) => {
        setValue('car_brand', e.target.value); // Update the selected brand
        setValue('car_model', ''); // Reset model field
    };

    return (
        <div className="carDetails">
            <div className="headingCont">
                <SecHeading heading={edit ? "Update Car Details" : "Car Details"} />
            </div>
            <div className="inputContainer">
                <div className={`inputCont ${errors?.car_brand ? "error" : ''}`}>
                    {/* <label htmlFor="car_brand">Car Brand*</label> */}
                    <select
                        id="car_brand"
                        value={selectedBrand || ''}
                        {...register('car_brand', {
                            required: 'Car Brand is required',
                        })}
                        onChange={handleBrandChange}
                        className="inputCont"
                    >
                        <option value="" disabled>
                            Select Car Brand*
                        </option>
                        {Object.keys(carData).map((brand) => (
                            <option key={brand} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </select>
                    {errors.car_brand && (
                        <p className='errorText'>{errors.car_brand.message}</p>
                    )}
                </div>

                <div className={`inputCont ${errors?.car_model ? "error" : ''}`}>
                    {/* <label htmlFor="car_model">Car Model*</label> */}
                    <select
                        id="car_model"
                        {...register('car_model', {
                            required: 'Car Model is required',
                        })}
                        disabled={!selectedBrand}
                    >
                        <option value="" disabled>
                            {selectedBrand
                                ? 'Select a Model'
                                : 'Please select a brand first'}
                        </option>
                        {selectedBrand &&
                            carData[selectedBrand]?.map((model) => (
                                <option key={model} value={model}>
                                    {model}
                                </option>
                            ))}
                    </select>
                    {errors.car_model && (
                        <p className='errorText'>{errors.car_model.message}</p>
                    )}
                </div>

                <div className={`inputCont ${errors?.car_category ? "error" : ''}`}>
                    {/* <label htmlFor="car_category">Category*</label> */}
                    <select
                        id="car_category"
                        {...register('car_category', {
                            required: 'Category is required',
                        })}
                    >
                        <option value="" disabled>
                            Select Car Category*
                        </option>
                        {carCategories?.map((cat, index) => (
                            <option key={index} value={cat?.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    {errors.car_category && (
                        <p className='errorText'>{errors.car_category.message}</p>
                    )}
                </div>

                <div className={`inputCont ${errors?.car_year ? "error" : ''}`}>
                    {/* <label htmlFor="car_year">Make (Year)*</label> */}
                    <select
                        id="car_year"
                        {...register('car_year', {
                            required: 'Make (Year) is required',
                        })}
                    >
                        <option value="" disabled>
                            Select Car Make*
                        </option>
                        <option value="2026">2026</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                    </select>
                    {errors.car_year && (
                        <p className='errorText'>{errors.car_year.message}</p>
                    )}
                </div>

                <div className={`inputCont ${errors?.city ? "error" : ''}`}>
                    {/* <label htmlFor="city">City*</label> */}
                    <select
                        id="city"
                        {...register('city', {
                            required: 'City is required',
                        })}
                    >
                        <option value="" disabled>
                            Select City*
                        </option>
                        {['Dubai', 'Abu Dhabi', 'Fujairah', 'Ajman', 'Al Ain', 'Sharjah', 'Ras Al Khaimah', 'Umm Al Quwain'].map((location) => (
                            <option key={location} value={location}>
                                {location}
                            </option>
                        ))}
                    </select>
                    {errors.city && (
                        <p className='errorText'>{errors.city.message}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CarDetails;
