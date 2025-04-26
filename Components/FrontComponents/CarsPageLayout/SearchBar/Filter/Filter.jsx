import React, { useEffect, useState } from "react";
import { useQueries, useMutation } from "@tanstack/react-query";
import { SearchServices } from "@/Services/FrontServices/SearchServices";
import {
    getBags,
    getCarBodyTypes,
    getCarBrands,
    getCarCategories,
    getCarModelsByBrand,
    getCities,
    getColors,
    getDoors,
    getFeatures,
    getFuelTypes,
    getLuggages,
    getMakeYears,
    getSeating,
    getService,
    getSpecs,
    getTransmission
} from "@/Services/VendorServices/VendorAddCarServices";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { store } from "@/Redux/Store";
import { SET_SEARCH_RESULT } from "@/Redux/Slices/Search";
import { useRouter } from "next/navigation";

function Filter({ handle, filterState }) {
    const router = useRouter()
    const queries = useQueries({
        queries: [
            { queryKey: ["carBrands"], queryFn: getCarBrands },
            { queryKey: ["carBodyTypes"], queryFn: getCarBodyTypes },
            { queryKey: ["cities"], queryFn: getCities },
            { queryKey: ["makeYears"], queryFn: getMakeYears },
            { queryKey: ["carCategories"], queryFn: getCarCategories },
            { queryKey: ["colors"], queryFn: getColors },
            { queryKey: ["features"], queryFn: getFeatures },
            { queryKey: ["transmissions"], queryFn: getTransmission },
            { queryKey: ["specs"], queryFn: getSpecs },
            { queryKey: ["seating"], queryFn: getSeating },
            { queryKey: ["bags"], queryFn: getBags },
            { queryKey: ["doors"], queryFn: getDoors },
            { queryKey: ["fuelTypes"], queryFn: getFuelTypes },
            { queryKey: ["luggages"], queryFn: getLuggages },
            { queryKey: ["service"], queryFn: getService }
        ]
    });

    // Redux States
    const brands = useSelector((state) => state.car.brands);
    const categories = useSelector((state) => state.car.categories);
    const years = useSelector((state) => state.car.makeYears);
    const cities = useSelector((state) => state.car.cities);
    const bodyTypes = useSelector((state) => state.car.bodyTypes);
    const doorsData = useSelector((state) => state.car.doors);
    const transmissionData = useSelector((state) => state.car.transmission);
    const bagsData = useSelector((state) => state.car.bags);
    const fuelTypeData = useSelector((state) => state.car.fuelType);
    const specsData = useSelector((state) => state.car.specs);
    const seatingData = useSelector((state) => state.car.seating);
    const features = useSelector((state) => state.car.features);
    const colors = useSelector((state) => state.car.colors);

    // local States
    const [filterActive, setFilterActive] = useState(false);
    const [activeAccordions, setActiveAccordions] = useState([]);
    const [models, setModels] = useState();
    const [carBrand, setCarBrand] = useState("");

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

    useEffect(() => {
        setFilterActive(filterState);
    }, [filterState]);

    const handleFilterState = (state) => {
        setFilterActive(state);
        handle(state);
    };

    useEffect(() => {
        const html = document?.querySelector("html");
        if (filterActive) {
            html.classList.add("lenis-stopped");
        } else {
            html.classList.remove("lenis-stopped");
        }

        return () => {
            html.classList.remove("lenis-stopped"); // Cleanup on unmount
        };
    }, [filterActive]);

    const handleAccordionToggle = (acc) => {
        setActiveAccordions((prev) => (prev.includes(acc) ? prev.filter((item) => item !== acc) : [...prev, acc]));
    };

    // Set up search mutation
    const searchMutation = useMutation({
        mutationFn: (searchParams) => SearchServices.filterCars(searchParams),
        onSuccess: (data) => {
            console.log("Search results:", data);
            store.dispatch(SET_SEARCH_RESULT(data?.data));
            handleFilterState(false);
            router.push("/search"); // Redirect to search results page
            // toast.success("Search completed successfully");
        },
        onError: (error) => {
            console.error("Search error:", error);
            toast.error("Failed to apply filters. Please try again.");
        }
    });

    // Helper function to get selected checkbox values as comma-separated string
    const getSelectedCheckboxValues = (name) => {
        const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
        return Array.from(checkboxes).map(cb => cb.value).join(',');
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // Get checkbox values for fields that allow multiple selections
        const featureIds = getSelectedCheckboxValues('feature_id');
        const seatingIds = getSelectedCheckboxValues('seating_id');
        const doorIds = getSelectedCheckboxValues('door_id');
        const bagIds = getSelectedCheckboxValues('bag_id');
        const fuelTypeIds = getSelectedCheckboxValues('fuel_type_id');
        const colorIds = getSelectedCheckboxValues('color_id');
        const bodyTypeIds = getSelectedCheckboxValues('body_type');

        // Structure data to match API query parameters
        const apiQueryParams = {
            category: formData.get('category_id') || null,
            brand: formData.get('brand_id') || null,
            body: bodyTypeIds || null,
            model: formData.get('model_id') || null,
            city: formData.get('city_id') || null,
            maxPrice: formData.get('max_day_budget') || null,
            specId: formData.get('spec_id') || null,
            featureId: featureIds || null,
            transmissionId: getSelectedCheckboxValues('transmission_id') || null,
            doorId: doorIds || null,
            bagFitId: bagIds || null,
            fuelTypeId: fuelTypeIds || null,
            colorId: colorIds || null,
            seatingCapacityId: seatingIds || null,
            makeYearId: formData.get('year_id') || null,
            perPage: '10',
            page: '1'
        };

        // Execute the search mutation with our query parameters
        searchMutation.mutate(apiQueryParams);
    };

    // Function to handle clearing filters
    const clearFilters = () => {
        // Reset form
        document.getElementById('filterForm').reset();

        // Reset carBrand state
        setCarBrand("");
        setModels(null);

        // Reset filters in parent component with empty search
        searchMutation.mutate({
            perPage: '10',
            page: '1'
        });
    };

    return (
        <div className={`filtersCont ${filterActive ? "active" : ""}`} data-lenis-prevent>
            <div className="backDrop" onClick={() => handleFilterState(false)} />
            <form id="filterForm" onSubmit={onSubmit} className="filterMenu">
                <div className="filterHeader">
                    <h3>Filters</h3>
                    <button type="button" onClick={() => handleFilterState(false)} className="closeBtn">
                        <i className="fas fa-times" />
                    </button>
                </div>
                <div className="filterBody">
                    <ul>
                        {/* location */}
                        <li>
                            <button type="button" onClick={() => handleAccordionToggle("location")}>
                                <span>location</span>
                                <i className={`fas ${activeAccordions.includes("location") ? "fa-chevron-down" : "fa-chevron-right"} `} />
                            </button>
                            {activeAccordions.includes("location") && (
                                <div className="menuContainer">
                                    <div className="inputCont">
                                        <select name="city_id" id="city">
                                            <option selected disabled value="">
                                                Select a City from below
                                            </option>
                                            {cities?.map((item, index) => (
                                                <option key={index} value={item?.name.toLowerCase()}>
                                                    {item?.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}
                        </li>

                        {/* category */}
                        <li>
                            <button type="button" onClick={() => handleAccordionToggle("category")}>
                                <span>category</span>
                                <i className={`fas ${activeAccordions.includes("category") ? "fa-chevron-down" : "fa-chevron-right"} `} />
                            </button>
                            {activeAccordions.includes("category") && (
                                <div className="menuContainer">
                                    <div className="inputCont">
                                        <select name="category_id" id="category">
                                            <option selected disabled value="">
                                                Select a Category from below
                                            </option>
                                            {categories?.map((cat, index) => (
                                                <option key={index} value={cat?.id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}
                        </li>

                        {/* car brand / model */}
                        <li>
                            <button type="button" onClick={() => handleAccordionToggle("brand")}>
                                <span>Car Brand / Model</span>
                                <i className={`fas ${activeAccordions.includes("brand") ? "fa-chevron-down" : "fa-chevron-right"} `} />
                            </button>
                            {activeAccordions.includes("brand") && (
                                <div className="menuContainer">
                                    <div className="inputCont">
                                        <select name="brand_id" id="brand" onChange={handleBrandChange}>
                                            <option selected disabled value="">
                                                Select Car Brand
                                            </option>
                                            {brands?.map((item, index) => (
                                                <option key={index} value={item?.id}>
                                                    {item?.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="inputCont">
                                        <select name="model_id" id="model">
                                            <option selected disabled value="">
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
                                    </div>
                                </div>
                            )}
                        </li>

                        {/* model year */}
                        <li>
                            <button type="button" onClick={() => handleAccordionToggle("year")}>
                                <span>Model Year</span>
                                <i className={`fas ${activeAccordions.includes("year") ? "fa-chevron-down" : "fa-chevron-right"} `} />
                            </button>
                            {activeAccordions.includes("year") && (
                                <div className="menuContainer">
                                    <div className="inputCont">
                                        <select name="year_id" id="year">
                                            <option selected disabled value="">
                                                Select Model Year
                                            </option>
                                            {years.map((year) => (
                                                <option key={year?.id} value={year?.id}>
                                                    {year?.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}
                        </li>

                        {/* no of seats */}
                        <li>
                            <button type="button" onClick={() => handleAccordionToggle("seats")}>
                                <span>No. of Seats</span>
                                <i className={`fas ${activeAccordions.includes("seats") ? "fa-chevron-down" : "fa-chevron-right"} `} />
                            </button>
                            {activeAccordions.includes("seats") && (
                                <div className="menuContainer">
                                    {seatingData?.map((item, index) => (
                                        <div className="inputCont checkbox" key={index}>
                                            <div className="checkBoxCont">
                                                <label htmlFor={`seating-${item?.id}`} className="checkBoxHolder">
                                                    <i className="fas fa-check"></i>
                                                    <input
                                                        id={`seating-${item?.id}`}
                                                        name="seating_id"
                                                        value={item.id}
                                                        type="checkbox"
                                                    />
                                                </label>
                                                <label htmlFor={`seating-${item?.id}`}>{item?.name}</label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </li>

                        {/* price range */}
                        <li>
                            <button type="button" onClick={() => handleAccordionToggle("price")}>
                                <span>Price Range</span>
                                <i className={`fas ${activeAccordions.includes("price") ? "fa-chevron-down" : "fa-chevron-right"} `} />
                            </button>
                            {activeAccordions.includes("price") && (
                                <div className="menuContainer">
                                    <div className="priceInputRow">
                                        <div className="inputCont">
                                            <label htmlFor="max_day_budget">Max Day Budget</label>
                                            <input placeholder="AED" type="text" name="max_day_budget" id="max_day_budget" />
                                        </div>
                                        <div className="inputCont">
                                            <label htmlFor="max_monthly_budget">Max Monthly Budget</label>
                                            <input placeholder="AED" type="text" name="max_monthly_budget" id="max_monthly_budget" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>

                        {/* body type */}
                        <li>
                            <button type="button" onClick={() => handleAccordionToggle("bodyType")}>
                                <span>Body Type</span>
                                <i className={`fas ${activeAccordions.includes("bodyType") ? "fa-chevron-down" : "fa-chevron-right"} `} />
                            </button>
                            {activeAccordions.includes("bodyType") && (
                                <div className="menuContainer">
                                    {bodyTypes?.map((item, index) => {
                                        return (
                                            <div className="inputCont checkbox" key={index}>
                                                <div className="checkBoxCont">
                                                    <label htmlFor={`type-${item?.id}`} className="checkBoxHolder">
                                                        <i className="fas fa-check"></i>
                                                        <input
                                                            id={`type-${item?.id}`}
                                                            name="body_type"
                                                            value={item.id}
                                                            type="checkbox"
                                                        />
                                                    </label>
                                                    <label htmlFor={`type-${item?.id}`}>
                                                        {item.name}
                                                    </label>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </li>

                        {/* Car Specs */}
                        <li>
                            <button type="button" onClick={() => handleAccordionToggle("carSpecs")}>
                                <span>Car Specs</span>
                                <i className={`fas ${activeAccordions.includes("carSpecs") ? "fa-chevron-down" : "fa-chevron-right"} `} />
                            </button>
                            {activeAccordions.includes("carSpecs") && (
                                <div className="menuContainer">
                                    <div className="inputCont">
                                        <select name="spec_id" id="spec">
                                            <option selected disabled value="">
                                                Select Car Specs
                                            </option>
                                            {specsData?.map((item, index) => (
                                                <option key={index} value={item?.id}>
                                                    {item?.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}
                        </li>

                        {/* features */}
                        <li>
                            <button type="button" onClick={() => handleAccordionToggle("features")}>
                                <span>Car Features</span>
                                <i className={`fas ${activeAccordions.includes("features") ? "fa-chevron-down" : "fa-chevron-right"} `} />
                            </button>
                            {activeAccordions.includes("features") && (
                                <div className="menuContainer">
                                    {features?.map((item, index) => {
                                        return (
                                            <div className="inputCont checkbox" key={index}>
                                                <div className="checkBoxCont">
                                                    <label htmlFor={`feature-${item?.id}`} className="checkBoxHolder">
                                                        <i className="fas fa-check"></i>
                                                        <input
                                                            id={`feature-${item?.id}`}
                                                            name="feature_id"
                                                            value={item.id}
                                                            type="checkbox"
                                                        />
                                                    </label>
                                                    <label htmlFor={`feature-${item?.id}`}>{item?.name}</label>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </li>

                        {/* transmission */}
                        <li>
                            <button type="button" onClick={() => handleAccordionToggle("transmission")}>
                                <span>Car transmission</span>
                                <i className={`fas ${activeAccordions.includes("transmission") ? "fa-chevron-down" : "fa-chevron-right"} `} />
                            </button>
                            {activeAccordions.includes("transmission") && (
                                <div className="menuContainer">
                                    {transmissionData?.map((item, index) => (
                                        <div className="inputCont checkbox" key={index}>
                                            <div className="checkBoxCont">
                                                <label htmlFor={`transmission-${item?.id}`} className="checkBoxHolder">
                                                    <i className="fas fa-check"></i>
                                                    <input
                                                        id={`transmission-${item?.id}`}
                                                        name="transmission_id"
                                                        value={item.id}
                                                        type="checkbox"
                                                    />
                                                </label>
                                                <label htmlFor={`transmission-${item?.id}`}>{item?.name}</label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </li>

                        {/* Fuel Type */}
                        <li>
                            <button type="button" onClick={() => handleAccordionToggle("fueltype")}>
                                <span>Fuel Type</span>
                                <i className={`fas ${activeAccordions.includes("fueltype") ? "fa-chevron-down" : "fa-chevron-right"} `} />
                            </button>
                            {activeAccordions.includes("fueltype") && (
                                <div className="menuContainer">
                                    {fuelTypeData?.map((item, index) => {
                                        return (
                                            <div className="inputCont checkbox" key={index}>
                                                <div className="checkBoxCont">
                                                    <label htmlFor={`fuel-${item?.id}`} className="checkBoxHolder">
                                                        <i className="fas fa-check"></i>
                                                        <input
                                                            id={`fuel-${item?.id}`}
                                                            name="fuel_type_id"
                                                            value={item.id}
                                                            type="checkbox"
                                                        />
                                                    </label>
                                                    <label htmlFor={`fuel-${item?.id}`}>
                                                        {item.name}
                                                    </label>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </li>

                        {/* Car Doors */}
                        <li>
                            <button type="button" onClick={() => handleAccordionToggle("carDoors")}>
                                <span>Car Doors</span>
                                <i className={`fas ${activeAccordions.includes("carDoors") ? "fa-chevron-down" : "fa-chevron-right"} `} />
                            </button>
                            {activeAccordions.includes("carDoors") && (
                                <div className="menuContainer">
                                    {doorsData?.map((item, index) => {
                                        return (
                                            <div className="inputCont checkbox" key={index}>
                                                <div className="checkBoxCont">
                                                    <label htmlFor={`door-${item?.id}`} className="checkBoxHolder">
                                                        <i className="fas fa-check"></i>
                                                        <input
                                                            id={`door-${item?.id}`}
                                                            name="door_id"
                                                            value={item.id}
                                                            type="checkbox"
                                                        />
                                                    </label>
                                                    <label htmlFor={`door-${item?.id}`}>
                                                        {item.name}
                                                    </label>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </li>

                        {/* colors */}
                        <li>
                            <button type="button" onClick={() => handleAccordionToggle("colors")}>
                                <span>Car Exterior Colors</span>
                                <i className={`fas ${activeAccordions.includes("colors") ? "fa-chevron-down" : "fa-chevron-right"} `} />
                            </button>
                            {activeAccordions.includes("colors") && (
                                <div className="menuContainer">
                                    {colors?.map((item, index) => {
                                        return (
                                            <div className="inputCont checkbox" key={index}>
                                                <div className="checkBoxCont">
                                                    <label htmlFor={`color-${item?.id}`} className="checkBoxHolder">
                                                        <i className="fas fa-check"></i>
                                                        <input
                                                            id={`color-${item?.id}`}
                                                            name="color_id"
                                                            value={item.id}
                                                            type="checkbox"
                                                        />
                                                    </label>
                                                    <label htmlFor={`color-${item?.id}`}>{item?.name}</label>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </li>

                        {/* luggage */}
                        <li>
                            <button type="button" onClick={() => handleAccordionToggle("luggage")}>
                                <span>Luggage</span>
                                <i className={`fas ${activeAccordions.includes("luggage") ? "fa-chevron-down" : "fa-chevron-right"} `} />
                            </button>
                            {activeAccordions.includes("luggage") && (
                                <div className="menuContainer">
                                    {bagsData?.map((item, index) => {
                                        return (
                                            <div className="inputCont checkbox" key={index}>
                                                <div className="checkBoxCont">
                                                    <label htmlFor={`bag-${item?.id}`} className="checkBoxHolder">
                                                        <i className="fas fa-check"></i>
                                                        <input
                                                            id={`bag-${item?.id}`}
                                                            name="bag_id"
                                                            value={item.id}
                                                            type="checkbox"
                                                        />
                                                    </label>
                                                    <label htmlFor={`bag-${item?.id}`}>{item?.name}</label>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </li>

                        {/* Minimum Required Age */}
                        <li>
                            <button type="button" onClick={() => handleAccordionToggle("minAge")}>
                                <span>Minimum Required Age</span>
                                <i className={`fas ${activeAccordions.includes("minAge") ? "fa-chevron-down" : "fa-chevron-right"} `} />
                            </button>
                            {activeAccordions.includes("minAge") && (
                                <div className="menuContainer">
                                    <div className="inputCont">
                                        <input type="number" name="min_age" placeholder="Enter Minimum Age" />
                                    </div>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
                <div className="filterFooter">
                    <div className="btnCont">
                        <button type="button" onClick={clearFilters} className="themeBtn secondary">Clear Filters</button>
                        <button
                            type="submit"
                            className="themeBtn"
                            disabled={searchMutation.isPending}
                        >
                            {searchMutation.isPending ? "Searching..." : "Update Filters"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Filter;
