"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./CreateMyFleetLayout.scss";
import carData from "@/DummyData/carBrandsModels.json"; // Import carData from JSON
import SecHeading from "@/Components/SecHeading/SecHeading";
import ImageUploader from "../ImageUploader/ImageUploader";
import carFeatures from "@/DummyData/CarFeatures.json"
import carColors from "@/DummyData/CarColors.json"

function CreateMyFleetLayout() {
  ``
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const selectedBrand = watch("brand");
  const selectedColor = watch("color");
  const selectedFeatures = watch("features");


  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2));
  };

  const handleBrandChange = (e) => {
    setValue("brand", e.target.value); // Update the selected brand
    setValue("model", ""); // Reset model field
  };

  return (
    <>
      <div className="formWrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="detailsSection">
            <div className="carModel">
              <SecHeading heading="Car Details" />
              <div className="inputDiv">
                <div>
                  <label htmlFor="brand">Car Brand</label>
                  <select
                    id="brand"
                    {...register("brand", {
                      required: "Car Brand is required",
                    })}
                    onChange={handleBrandChange}
                    className="inputCont"
                  >
                    <option value="">Select a Brand</option>
                    {Object.keys(carData).map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                  {errors.brand && (
                    <p style={{ color: "red" }}>{errors.brand.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="model">Car Model</label>
                  <select
                    id="model"
                    {...register("model", {
                      required: "Car Model is required",
                    })}
                    disabled={!selectedBrand}
                    className="inputCont"
                  >
                    <option value="">
                      {selectedBrand
                        ? "Select a Model"
                        : "Please select a brand first"}
                    </option>
                    {selectedBrand &&
                      carData[selectedBrand]?.map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                  </select>
                  {errors.model && (
                    <p style={{ color: "red" }}>{errors.model.message}</p>
                  )}
                </div>
              </div>

              <div className="inputDiv">
                <div>
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    className="inputCont"
                    {...register("categories", {
                      required: "Car Category is required",
                    })}
                  >
                    <option value="">Select Category</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Convertible">Convertible</option>
                    <option value="Compact">Compact</option>
                    <option value="Suv">Suv</option>
                    <option value="Crossover">Crossover</option>
                    <option value="Pickup Truck">Pickup Truck</option>
                    <option value="Sports Car">Sports Car</option>
                    <option value="Luxury Car">Luxury Car</option>
                    <option value="Super Car">Super Car</option>
                    <option value="Electric Cars">Electric Cars</option>
                    <option value="7 Seater">7 Seater</option>
                  </select>
                  {errors.categories && (
                    <p style={{ color: "red" }}>{errors.categories.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="make_year">Make (Year)</label>
                  <select
                    id="make_year"
                    className="inputCont"
                    {...register("make_year", {
                      required: "Make Year is required",
                    })}
                  >
                    <option value="">Select Make (Year)</option>

                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                  </select>
                  {errors.make_year && (
                    <p style={{ color: "red" }}>{errors.make_year.message}</p>
                  )}
                </div>
              </div>

              <div className="inputDiv">
                <div>
                  <label htmlFor="city">City</label>
                  <select
                    id="city"
                    className="inputCont"
                    {...register("city", {
                      required: "City is required",
                    })}
                  >
                    <option value="">Select City</option>
                    <option value="Dubai">Dubai</option>
                    <option value="Abu Dhabi">Abu Dhabi</option>
                    <option value="Fujairah">Fujairah</option>
                    <option value="Ajman">Ajman</option>
                    <option value="Al Ain">Al Ain</option>
                    <option value="Sharjah">Sharjah</option>
                    <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                    <option value="Umm Al Qwain">Umm Al Qwain</option>
                  </select>
                  {errors.city && (
                    <p style={{ color: "red" }}>{errors.city.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="carPricing">
              <SecHeading heading="Car Pricing" />
              <label htmlFor="price_per_day">Price Per Day</label>
              <div className="inputDiv">
                <div>
                  <input
                    id="price_per_day"
                    placeholder="AED Charges"
                    type="number"
                    className="inputCont"
                    {...register("price_per_day", {
                      required: "Price Per Day is required",
                    })}
                  />
                  {errors.price_per_day && (
                    <p style={{ color: "red" }}>
                      {errors.price_per_day.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    id="per_day_kms"
                    placeholder="Kms"
                    type="number"
                    className="inputCont"
                    {...register("per_day_kms", {
                      required: "Kms Per Day is required",
                    })}
                  />
                  {errors.per_day_kms && (
                    <p style={{ color: "red" }}>{errors.per_day_kms.message}</p>
                  )}
                </div>
              </div>

              <label htmlFor="brand">Price Per Week (Optional)</label>
              <div className="inputDiv">
                <input
                  id="price_per_week"
                  placeholder="AED Charges"
                  type="number"
                  className="inputCont"
                  {...register("price_per_week")}
                />
                <input
                  id="per_week_kms"
                  placeholder="Kms"
                  type="number"
                  className="inputCont"
                  {...register("per_week_kms")}
                />
              </div>

              <label htmlFor="brand">Price Per Month (Optional)</label>
              <div className="inputDiv">
                <input
                  id="price_per_month"
                  placeholder="AED Charges"
                  type="number"
                  className="inputCont"
                  {...register("price_per_month")}
                />
                <input
                  id="per_month_kms"
                  placeholder="Kms"
                  type="number"
                  className="inputCont"
                  {...register("per_month_kms")}
                />
              </div>
            </div>
          </div>

          <div className="imageUploader">
            <SecHeading heading="Image Upload" />
            <ImageUploader />
          </div>

          <div className="carSpecs">
            <SecHeading heading="Car Specs" />
            <label htmlFor="car-colors">Car Colors:</label>
            <ul className="specs_list">
              {carColors.map((color) => (
                <li key={`car-color-${color}`}>
                  <input
                    type="radio"
                    id={`car-color-${color}`}
                    value={color}
                    className="btn-check clip-hidden"
                    {...register("color", {
                      required: "Please select a car color",
                    })}
                  />
                  <label htmlFor={`car-color-${color}`} className="btn-label">
                    {color}
                  </label>
                </li>
              ))}
            </ul>
            {errors.color && (
              <p style={{ color: "red" }}>{errors.color.message}</p>
            )}

            <label htmlFor="interior-colors">Interior Color:</label>
            <ul className="specs_list">
              {carColors.map((color) => (
                <li key={`interior-color-${color}`}>
                  <input
                    type="radio"
                    id={`interior-color-${color}`}
                    value={color}
                    className="btn-check clip-hidden"
                    {...register("interior_color", {
                      required: "Please select a car interior color",
                    })}
                  />
                  <label
                    htmlFor={`interior-color-${color}`}
                    className="btn-label"
                  >
                    {color}
                  </label>
                </li>
              ))}
            </ul>
            {errors.interior_color && (
              <p style={{ color: "red" }}>{errors.interior_color.message}</p>
            )}

            <label htmlFor="car-features">Car Features:</label>
            <ul className="specs_list">
              {carFeatures.map((features) => (
                <li key={features}>
                  <input
                    type="checkbox"
                    id={features}
                    value={features}
                    className="btn-check clip-hidden"
                    {...register("features", {
                      validate: (value) =>
                        value.length > 0 ||
                        "Please select at least one car feature",
                    })}
                  />
                  <label htmlFor={features} className="btn-label">
                    {features}
                  </label>
                </li>
              ))}
            </ul>
            {errors.features && (
              <p style={{ color: "red" }}>{errors.features.message}</p>
            )}
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default CreateMyFleetLayout;
