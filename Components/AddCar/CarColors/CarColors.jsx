import SecHeading from "@/Components/SecHeading/SecHeading";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Controller } from "react-hook-form";

const CarColors = memo(function CarColors({ edit, control, errors }) {
    const colors = useSelector((state) => state.car.colors);
    return (
        <div className="carColors">
            <div className="headingCont">
                <SecHeading heading={edit ? "Update Car Colors" : "Car Colors"} />
            </div>
            <div className="inputContainer">
                <div className={`inputCont ${errors?.colorId ? "error" : ""}`}>
                    <Controller
                        control={control}
                        name="colorId"
                        rules={{ required: "Exterior color is required" }}
                        render={({ field }) => (
                            <select {...field} id="colors.exterior">
                                <option disabled value="">
                                    Select Car Exterior Color*
                                </option>
                                {colors?.map((color, index) => (
                                    <option value={color?.id} key={index}>
                                        {color?.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                    {errors?.colorId && <p className="error-message">{errors.colorId.message}</p>}
                </div>

                <div className={`inputCont ${errors?.interiorColor ? "error" : ""}`}>
                    <Controller
                        control={control}
                        name="interiorColor"
                        rules={{ required: "Interior color is required" }}
                        render={({ field }) => (
                            <select {...field} id="colors.interior">
                                <option disabled value="">
                                    Select Car Interior Color*
                                </option>
                                {colors?.map((color, index) => (
                                    <option value={color?.name} key={index}>
                                        {color?.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                    {errors?.interiorColor && <p className="error-message">{errors.interiorColor.message}</p>}
                </div>
            </div>
        </div>
    );
});

export default CarColors;
