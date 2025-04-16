import SecHeading from "@/Components/SecHeading/SecHeading";
import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCarModelsByBrand } from "@/Services/VendorServices/VendorAddCarServices";
import { toast } from "react-toastify";
import { Controller } from "react-hook-form";

const CarDetails = memo(function CarDetails({ edit, setCarDetails, control, errors }) {
    const brands = useSelector((state) => state.car.brands);
    const categories = useSelector((state) => state.car.categories);
    const years = useSelector((state) => state.car.makeYears);
    const cities = useSelector((state) => state.car.cities);
    const [models, setModels] = useState();
    const [carBrand, setCarBrand] = useState("");

    const generateCarName = () => {
        if (!brands || !models || !years) return "";

        const brandObj = brands.find((b) => String(b.brand_id) === String(carBrand));
        const modelObj = models.find((m) => String(m.id) === String(control._formValues.modelId));
        const yearObj = years.find((y) => String(y.id) === String(control._formValues.makeYearId));

        const brandName = brandObj ? brandObj.brand_name : "";
        const modelName = modelObj ? modelObj.name : "";
        const yearName = yearObj ? yearObj.name : "";

        return `${brandName} ${modelName} ${yearName}`.trim();
    };

    useEffect(() => {
        const name = generateCarName();
        setCarDetails({
            name
        });
    }, [carBrand, control._formValues.modelId, control._formValues.makeYearId, control._formValues.categoryId, control._formValues.cityId]);

    const handleBrandChange = (e) => {
        setCarBrand(e.target.value);
    };

    const getModel = async (brandId) => {
        try {
            const res = await getCarModelsByBrand(brandId);
            setModels(res?.data);
        } catch (e) {
            toast.error("Error Getting Models");
        }
    };

    useEffect(() => {
        if (carBrand) {
            getModel(carBrand);
        }
    }, [carBrand]);

    return (
        <div className="carDetails">
            <div className="headingCont">
                <SecHeading heading={edit ? "Update Car Details" : "Car Details"} />
            </div>
            <div className="inputContainer">
                <div className={`inputCont ${errors?.brandId ? "error" : ""}`}>
                    <select
                        value={carBrand}
                        onChange={handleBrandChange}
                        className={`inputCont ${errors?.brandId ? "error" : ""}`}
                    >
                        <option value="">Select Car Brand*</option>
                        {brands?.map((item, index) => (
                            <option key={index} value={item?.brand_id}>
                                {item?.brand_name}
                            </option>
                        ))}
                    </select>
                    {errors?.brandId && <p className="error">{errors?.brandId.message}</p>}
                </div>

                <div className={`inputCont ${errors?.modelId ? "error" : ""}`}>
                    <Controller
                        name="modelId"
                        control={control}
                        rules={{ required: "Please select a model" }}
                        render={({ field }) => (
                            <select
                                {...field}
                                disabled={!carBrand}
                                className={`inputCont ${errors?.modelId ? "error" : ""}`}
                            >
                                <option disabled value="">
                                    {carBrand ? "Select a Model*" : "Please select a brand first*"}
                                </option>
                                {carBrand && models ? (
                                    models.length > 0 ? (
                                        models.map((model, index) => (
                                            <option key={index} value={model?.id}>
                                                {model?.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>
                                            No Models Available
                                        </option>
                                    )
                                ) : null}
                            </select>
                        )}
                    />
                    {errors?.modelId && <p className="error">{errors?.modelId.message}</p>}
                </div>

                <div className={`inputCont ${errors?.categoryId ? "error" : ""}`}>
                    <Controller
                        name="categoryId"
                        control={control}
                        rules={{ required: "Please select a category" }}
                        render={({ field }) => (
                            <select {...field} className={`inputCont ${errors?.categoryId ? "error" : ""}`}>
                                <option value="">Select Car Category*</option>
                                {categories?.map((cat, index) => (
                                    <option key={index} value={cat?.category_id}>
                                        {cat.category_name}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                    {errors?.categoryId && <p className="error">{errors?.categoryId.message}</p>}
                </div>

                <div className={`inputCont ${errors?.makeYearId ? "error" : ""}`}>
                    <Controller
                        name="makeYearId"
                        control={control}
                        rules={{ required: "Please select a car make year" }}
                        render={({ field }) => (
                            <select {...field} className={`inputCont ${errors?.makeYearId ? "error" : ""}`}>
                                <option value="">Select Car Make*</option>
                                {years.map((year) => (
                                    <option key={year?.id} value={year?.id}>
                                        {year?.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                    {errors?.makeYearId && <p className="error">{errors?.makeYearId.message}</p>}
                </div>

                <div className={`inputCont ${errors?.cityId ? "error" : ""}`}>
                    <Controller
                        name="cityId"
                        control={control}
                        rules={{ required: "Please select a city" }}
                        render={({ field }) => (
                            <select {...field} className={`inputCont ${errors?.cityId ? "error" : ""}`}>
                                <option value="">Select City*</option>
                                {cities?.map((item, index) => (
                                    <option key={index} value={item?.id}>
                                        {item?.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                    {errors?.cityId && <p className="error">{errors?.cityId.message}</p>}
                </div>

                <div className={`inputCont full ${errors?.specialNoteForCustomer ? "error" : ""}`}>
                    <Controller
                        name="specialNoteForCustomer"
                        control={control}
                        render={({ field }) => (
                            <textarea {...field} rows={5} placeholder="Special Note for Customers"></textarea>
                        )}
                    />
                    {errors?.specialNoteForCustomer && (
                        <p className="error">{errors?.specialNoteForCustomer.message}</p>
                    )}
                </div>

                <div className={`inputCont full ${errors?.description ? "error" : ""}`}>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <textarea {...field} rows={5} placeholder="Enter Car Description"></textarea>
                        )}
                    />
                    {errors?.description && (
                        <p className="error">{errors?.description.message}</p>
                    )}
                </div>

            </div>
        </div>
    );
});

export default memo(CarDetails);
