import React, { useEffect, useState } from 'react'
import carFeatures from "@/DummyData/CarFeatures.json"
import carColors from "@/DummyData/CarColors.json"

function Filter({ handle, filterState, brands, setFilters }) {
    const [filterActive, setFilterActive] = useState(false);
    const [activeAccordions, setActiveAccordions] = useState([]);
    const [localBrands, setLocalBrands] = useState()

    useEffect(() => {
        setFilterActive(filterState);
    }, [filterState]);

    const handleFilterState = (state) => {
        setFilterActive(state);
        handle(state);
    };

    useEffect(() => {
        setLocalBrands(brands)
    }, [brands])

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

    const vehicleTypes = [
        {
            "name": "luxury",
            "quantity": "112"
        },
        {
            "name": "SUV",
            "quantity": "112"
        },
        {
            "name": "Crossover",
            "quantity": "112"
        },
        {
            "name": "Sedan",
            "quantity": "112"
        },
        {
            "name": "Economy",
            "quantity": "112"
        },
        {
            "name": "Sports",
            "quantity": "112"
        },
        {
            "name": "Convertible",
            "quantity": "112"
        },
        {
            "name": "Monthly",
            "quantity": "112"
        },
        {
            "name": "Supercar",
            "quantity": "112"
        },
        {
            "name": "Muscle",
            "quantity": "112"
        },
        {
            "name": "Compact",
            "quantity": "112"
        },
        {
            "name": "Special Edition",
            "quantity": "112"
        },
        {
            "name": "Coupe",
            "quantity": "112"
        },
        {
            "name": "Van",
            "quantity": "112"
        },
        {
            "name": "Electric",
            "quantity": "112"
        },
        {
            "name": "Commercial",
            "quantity": "112"
        },
        {
            "name": "Special Needs",
            "quantity": "112"
        },
        {
            "name": "Minivan",
            "quantity": "112"
        },
        {
            "name": "Pickup Truck",
            "quantity": "112"
        },
        {
            "name": "Hybrid",
            "quantity": "112"
        },
        {
            "name": "Bus",
            "quantity": "112"
        },
        {
            "name": "Classic / Retro",
            "quantity": "112"
        },
        {
            "name": "Truck",
            "quantity": "112"
        },
    ]

    const fuelTypes = [
        {
            "name": "Petrol",
            "quantity": "139"
        },
        {
            "name": "Diesel",
            "quantity": "139"
        },
        {
            "name": "Electric",
            "quantity": "139"
        },
        {
            "name": "Hybrid",
            "quantity": "139"
        },
    ]

    const handleAccordionToggle = (acc) => {
        setActiveAccordions((prev) =>
            prev.includes(acc) ? prev.filter(item => item !== acc) : [...prev, acc]
        );
    };

    return (
        <div className={`filtersCont ${filterActive ? "active" : ''}`} data-lenis-prevent>
            <div class="backDrop" onClick={() => handleFilterState(false)} />
            <div class="filterMenu">
                <div class="filterHeader">
                    <h3>Filters</h3>
                    <button onClick={() => handleFilterState(false)} class="closeBtn">
                        <i class="fas fa-times" />
                    </button>
                </div>
                <div class="filterBody">
                    <ul>
                        {/* location */}
                        <li>
                            <button onClick={() => handleAccordionToggle("location")} >
                                <span>
                                    location
                                </span>
                                <i class="fas fa-chevron-right" />
                            </button>
                            {activeAccordions.includes("location") && (
                                <div class="menuContainer">
                                    <div class="inputCont">

                                        <select name="" id="">
                                            <option selected disabled value="">Select a City from below</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                        </li>

                        {/* car brand / model */}
                        <li>
                            <button onClick={() => handleAccordionToggle("brand")} >
                                <span>
                                    Car Brand / Model
                                </span>
                                <i class="fas fa-chevron-right" />
                            </button>
                            {activeAccordions.includes('brand') && (
                                <div class="menuContainer">
                                    <div class="inputCont">

                                        <select name="" id="">
                                            <option selected disabled value="">Select Car Brand</option>
                                            {localBrands?.map((item, index) => (
                                                <option key={index}>
                                                    {item?.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div class="inputCont">

                                        <select name="" id="">
                                            <option selected disabled value="">Select Car Model</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                        </li>

                        {/* model year */}
                        <li>
                            <button onClick={() => handleAccordionToggle("year")} >
                                <span>
                                    Model Year
                                </span>
                                <i class="fas fa-chevron-right" />
                            </button>
                            {activeAccordions.includes('year') && (
                                <div class="menuContainer">
                                    <div class="inputCont">
                                        <select name="" id="">
                                            <option selected disabled value="">Select Model Year</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                        </li>

                        {/* no of seats */}
                        <li>
                            <button onClick={() => handleAccordionToggle("seats")} >
                                <span>
                                    No. of Seats
                                </span>
                                <i class="fas fa-chevron-right" />
                            </button>
                            {activeAccordions.includes('seats') && (
                                <div class="menuContainer">
                                    <div class="inputCont checkbox">
                                        <div class="checkBoxCont">
                                            <label htmlFor="" className='checkBoxHolder'>
                                                <i className='fas fa-check' ></i>
                                                <input type="checkbox" />
                                            </label>
                                            <label>1-2 Seats (115)</label>
                                        </div>
                                    </div>
                                    <div class="inputCont checkbox">
                                        <div class="checkBoxCont">
                                            <label htmlFor="" className='checkBoxHolder'>
                                                <i className='fas fa-check' ></i>
                                                <input type="checkbox" />
                                            </label>
                                            <label>1-2 Seats (115)</label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>

                        {/* price range */}
                        <li>
                            <button onClick={() => handleAccordionToggle("price")} >
                                <span>
                                    Price Range
                                </span>
                                <i class="fas fa-chevron-right" />
                            </button>
                            {activeAccordions.includes('price') && (
                                <div class="menuContainer">
                                    <div class="priceInputRow">
                                        <div class="inputCont">
                                            <label htmlFor="">Max Day Budget</label>
                                            <input placeholder='AED' type="text" name="" id="" />
                                            <button class="themeBtn">Update</button>
                                        </div>
                                        <div class="inputCont">
                                            <label htmlFor="">Max Monthly Budget</label>
                                            <input placeholder='AED' type="text" name="" id="" />
                                            <button class="themeBtn">Update</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>

                        {/* vehicle type */}
                        <li>
                            <button onClick={() => handleAccordionToggle("vehicleType")} >
                                <span>
                                    Vehicle Type
                                </span>
                                <i class="fas fa-chevron-right" />
                            </button>
                            {activeAccordions.includes('vehicleType') && (
                                <div class="menuContainer">
                                    {vehicleTypes?.map((type, index) => {
                                        const id = type.name.replaceAll(" ", "-"); // ID generate krdi
                                        return (
                                            <div className="inputCont checkbox" key={id}>
                                                <div className="checkBoxCont">
                                                    <label htmlFor={id} className='checkBoxHolder'>
                                                        <i className='fas fa-check'></i>
                                                        <input id={id} name={id} type="checkbox" />
                                                    </label>
                                                    <label htmlFor={id}>{type.name} ({type.quantity})</label>
                                                </div>
                                            </div>
                                        );
                                    })}

                                </div>
                            )}
                        </li>

                        {/* rental period */}
                        <li>
                            <button onClick={() => handleAccordionToggle("rentalPeriod")} >
                                <span>
                                    Rental Period
                                </span>
                                <i class="fas fa-chevron-right" />
                            </button>
                            {activeAccordions.includes('rentalPeriod') && (
                                <div class="menuContainer">
                                    <div class="inputCont">
                                        <select name="" id="">
                                            <option selected disabled value="">Select Rental Period</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                        </li>

                        {/* features */}
                        <li>
                            <button onClick={() => handleAccordionToggle("features")} >
                                <span>
                                    Car Features
                                </span>
                                <i class="fas fa-chevron-right" />
                            </button>
                            {activeAccordions.includes('features') && (
                                <div class="menuContainer">
                                    {carFeatures?.map((feature, index) => {
                                        const id = feature.replaceAll(" ", "-"); // ID generate krdi
                                        return (
                                            <div className="inputCont checkbox" key={index}>
                                                <div className="checkBoxCont">
                                                    <label htmlFor={id} className='checkBoxHolder'>
                                                        <i className='fas fa-check'></i>
                                                        <input id={id} name={id} type="checkbox" />
                                                    </label>
                                                    <label htmlFor={id}>{feature}</label>
                                                </div>
                                            </div>
                                        );
                                    })}

                                </div>
                            )}
                        </li>

                        {/* transmission */}
                        <li>
                            <button onClick={() => handleAccordionToggle("transmission")} >
                                <span>
                                    Car transmission
                                </span>
                                <i class="fas fa-chevron-right" />
                            </button>
                            {activeAccordions.includes('transmission') && (
                                <div class="menuContainer">
                                    <div className="inputCont checkbox">
                                        <div className="checkBoxCont">
                                            <label htmlFor='manual' className='checkBoxHolder'>
                                                <i className='fas fa-check'></i>
                                                <input id='manual' name='manual' type="checkbox" />
                                            </label>
                                            <label htmlFor='manual'>Manual</label>
                                        </div>
                                    </div>
                                    <div className="inputCont checkbox">
                                        <div className="checkBoxCont">
                                            <label htmlFor='auto' className='checkBoxHolder'>
                                                <i className='fas fa-check'></i>
                                                <input id='auto' name='auto' type="checkbox" />
                                            </label>
                                            <label htmlFor='auto'>Auto</label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>

                        {/* Fuel Type */}
                        <li>
                            <button onClick={() => handleAccordionToggle("fueltype")} >
                                <span>
                                    Fuel Type
                                </span>
                                <i class="fas fa-chevron-right" />
                            </button>
                            {activeAccordions.includes('fueltype') && (
                                <div class="menuContainer">
                                    {fuelTypes?.map((type, index) => {
                                        const id = type.name.replaceAll(" ", "-"); // ID generate krdi
                                        return (
                                            <div className="inputCont checkbox" key={id}>
                                                <div className="checkBoxCont">
                                                    <label htmlFor={id} className='checkBoxHolder'>
                                                        <i className='fas fa-check'></i>
                                                        <input id={id} name={id} type="checkbox" />
                                                    </label>
                                                    <label htmlFor={id}>{type.name} ({type.quantity})</label>
                                                </div>
                                            </div>
                                        );
                                    })}

                                </div>
                            )}
                        </li>

                        {/* colors */}
                        <li>
                            <button onClick={() => handleAccordionToggle("colors")} >
                                <span>
                                    Car Colors
                                </span>
                                <i class="fas fa-chevron-right" />
                            </button>
                            {activeAccordions.includes('colors') && (
                                <div class="menuContainer">
                                    {carColors?.map((feature, index) => {
                                        const id = feature.replaceAll(" ", "-"); // ID generate krdi
                                        return (
                                            <div className="inputCont checkbox" key={index}>
                                                <div className="checkBoxCont">
                                                    <label htmlFor={id} className='checkBoxHolder'>
                                                        <i className='fas fa-check'></i>
                                                        <input id={id} name={id} type="checkbox" />
                                                    </label>
                                                    <label htmlFor={id}>{feature}</label>
                                                </div>
                                            </div>
                                        );
                                    })}

                                </div>
                            )}
                        </li>

                        {/* Minimum Required Age */}
                        <li>
                            <button onClick={() => handleAccordionToggle("minAge")} >
                                <span>
                                    Minimum Required Age
                                </span>
                                <i class="fas fa-chevron-right" />
                            </button>
                            {activeAccordions.includes("minAge") && (
                                <div class="menuContainer">
                                    <div class="inputCont">

                                        <select name="" id="">
                                            <option selected disabled value="">Select minimum age</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
                <div class="filterFooter">
                    <div class="btnCont">
                        <button class="themeBtn secondary">
                            Clear Filters
                        </button>
                        <button class="themeBtn">
                            Update Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter