import SecHeading from '@/Components/SecHeading/SecHeading';
import React from 'react';
import carData from '@/DummyData/carBrandsModels.json'; // Import carData from JSON
import carCategories from "@/DummyData/Categories.json"

function CarDetails({ register, watch, setValue, errors }) {
    const selectedBrand = watch('brand');

    const handleBrandChange = (e) => {
        setValue('brand', e.target.value); // Update the selected brand
        setValue('model', ''); // Reset model field
    };

    return (
        <div className="carDetails">
            <div className="headingCont">
                <SecHeading heading="Car Details" />
            </div>
            <div className="inputContainer">
                <div className={`inputCont ${errors?.brand ? "error" : ''}`}>
                    <label htmlFor="brand">Car Brand</label>
                    <select
                        id="brand"
                        {...register('brand', {
                            required: 'Car Brand is required',
                        })}
                        onChange={handleBrandChange}
                        className="inputCont"
                    >
                        <option selected disabled value="">
                            Select Car Brand
                        </option>
                        {Object.keys(carData).map((brand) => (
                            <option key={brand} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </select>
                    {errors.brand && (
                        <p className='errorText'>{errors.brand.message}</p>
                    )}
                </div>
                <div className={`inputCont ${errors?.model ? "error" : ''}`}>
                    <label htmlFor="model">Car Model</label>
                    <select
                        id="model"
                        {...register('model', {
                            required: 'Car Model is required',
                        })}
                        disabled={!selectedBrand}
                    >
                        <option selected disabled value="">
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
                    {errors.model && (
                        <p className='errorText'>{errors.model.message}</p>
                    )}
                </div>
                <div className={`inputCont ${errors?.category ? "error" : ''}`}>
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        {...register('category', {
                            required: 'Category is required',
                        })}
                    >
                        <option disabled selected value="">Select Category</option>
                        {carCategories?.map((cat, index) => (
                            <option key={index} value={cat?.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    {errors.category && (
                        <p className='errorText'>{errors.category.message}</p>
                    )}
                </div>
                <div className={`inputCont ${errors?.year ? "error" : ''}`}>
                    <label htmlFor="year">Make (Year)</label>
                    <select
                        id="year"
                        {...register('year', {
                            required: 'Make (Year) is required',
                        })}
                    >
                        <option disabled selected value="">Select Car Make</option>
                        <option value="2026">2026</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                    </select>
                    {errors.year && (
                        <p className='errorText'>{errors.year.message}</p>
                    )}
                </div>
                <div className={`inputCont ${errors?.city ? "error" : ''}`}>
                    <label htmlFor="city">City</label>
                    <select
                        id="city"
                        {...register('city', {
                            required: 'City is required',
                        })}
                    >
                        <option disabled selected value="">Select City</option>
                        {['Dubai', 'Abu Dhabi', 'Fujairah', 'Ajman', 'Al Ain', 'Sharjah', 'Ras Al Khaimah', 'Umm Al Quwain'].map((location) => (
                            <option key={location} >
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
