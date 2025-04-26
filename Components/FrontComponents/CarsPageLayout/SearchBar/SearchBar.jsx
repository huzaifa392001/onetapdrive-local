"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import "../CarsPageLayout.scss";
import { usePathname, useRouter } from "next/navigation";
import { store } from "@/Redux/Store";
import { SET_SEARCH_PARAMS } from "@/Redux/Slices/Search";
import { useSelector } from "react-redux";
import Filter from "./Filter/Filter";
import brandsData from "@/DummyData/brands.json";
import { SearchServices } from "@/Services/FrontServices/SearchServices";
import Image from "next/image";
import Link from "next/link";

function SearchBar({ sorting }) {
    const categoryData = useSelector((state) => state?.general?.categories);
    const currentCategory = useSelector((state) => state?.search?.searchParam?.category);
    const [searchFilters, setSearchFilters] = useState(useSelector((state) => state.search.searchParam));
    const [activeDropdown, setActiveDropdown] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(currentCategory);
    const [selectedSort, setSelectedSort] = useState("Daily: High to Low");
    const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchedBrands, setSearchedBrands] = useState([]);
    const [searchedCars, setSearchedCars] = useState([]);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const searchContRef = useRef(null);
    const Router = useRouter();

    // Calculate total quantity
    const totalQuantity = categoryData?.reduce((sum, item) => sum + (parseInt(item.cars) || 0), 0);

    const handleDropdownToggle = (type) => {
        setActiveDropdown((prev) => (prev === type ? "" : type)); // Toggle dropdown
    };

    const handleInputChange = (e, field) => {
        setPriceFilter({ ...priceFilter, [field]: e.target.value }); // Update price input
    };

    const handleReset = () => {
        setPriceFilter({ min: "", max: "" }); // Reset inputs
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category); // Update selected category
        setActiveDropdown(""); // Close dropdown
        let route = category.toString().replace(" ", "-");
        Router.push(`/cars/${route.toLowerCase()}`);

        // Dispatch category to Redux
        store.dispatch(
            SET_SEARCH_PARAMS({
                ...store.getState().search.searchParam, // Preserve existing state
                category: category // Update category field
            })
        );
    };

    const handleSortSelect = (sortOption) => {
        const { mainHeading, sortingType } = sortOption;
        const displayText = sortingType ? `${mainHeading}: ${sortingType}` : mainHeading;
        setSelectedSort(displayText); // Update selected sort option
        setActiveDropdown(""); // Close dropdown

        // Pass the sort type to parent component via the sorting prop
        if (typeof sorting === 'function') {
            sorting(displayText);
        }

        // Dispatch sort option to Redux
        store.dispatch(
            SET_SEARCH_PARAMS({
                ...store.getState().search.searchParam, // Preserve existing state
                sort: sortingType // Update sort field
            })
        );
    };

    const handlePriceFilterSubmit = () => {
        setActiveDropdown("");
        // Dispatch price filter to Redux
        store.dispatch(
            SET_SEARCH_PARAMS({
                ...store.getState().search.searchParam, // Preserve existing state
                price: priceFilter // Update price field with current filter values
            })
        );
    };

    // Debounce function to delay API calls
    const debounce = (func, delay) => {
        let debounceTimer;
        return function (...args) {
            const context = this;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    };

    // Debounced search handler
    const debouncedSearch = useCallback(
        debounce(async (term) => {
            console.log('term=> ', term)
            if (!term) {
                setSearchedBrands([]);
                setSearchedCars([]);
                setShowSearchDropdown(false);
                return;
            }

            const result = await SearchServices.getCarSuggestionsByQuery(term)
            console.log('search result=> ', result)
            if (result) {
                if (result?.data?.brands?.length > 0) {
                    setSearchedBrands(result.data.brands);
                } else {
                    setSearchedBrands([]);
                }
                if (result?.data?.cars?.length > 0) {
                    setSearchedCars(result.data.cars);
                } else {
                    setSearchedCars([]);
                }

                // Show dropdown if we have any results or if search term exists
                setShowSearchDropdown(
                    result?.data?.brands?.length > 0 || result?.data?.cars?.length > 0 || term.length > 0
                );
            }
        }, 500), // 500ms delay
        []
    );

    useEffect(() => {
        console.log('searchedBrands=> ', searchedBrands)
        console.log('searchedCars=> ', searchedCars)
    }, [searchedBrands, searchedCars])

    // Handle search input change
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSearch(value);
    };

    // Handle clicks outside search container
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContRef.current && !searchContRef.current.contains(event.target)) {
                setShowSearchDropdown(false);
            }
        };

        // Add event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setSelectedCategory(currentCategory)
    }, [currentCategory])

    const sortOptions = [
        { mainHeading: "Featured", sortingType: "Default" },
        { mainHeading: "Daily", sortingType: "Low to High" },
        { mainHeading: "Daily", sortingType: "High to Low" },
        { mainHeading: "Weekly", sortingType: "Low to High" },
        { mainHeading: "Weekly", sortingType: "High to Low" },
        { mainHeading: "Monthly", sortingType: "Low to High" },
        { mainHeading: "Monthly", sortingType: "High to Low" }
    ];

    // Set initial sort value on component mount
    useEffect(() => {
        if (typeof sorting === 'function') {
            sorting(selectedSort);
        }
    }, []);

    const handleFilter = (filterState) => {
        setIsFilterVisible(filterState);
    };
    return (
        <>
            <div className="searchBar">
                <div className="searchContainer">
                    <div className="searchCont" ref={searchContRef}>
                        <input
                            placeholder="Search for Cars, Brands, Models..."
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onFocus={() => {
                                if (searchTerm) setShowSearchDropdown(true);
                            }}
                        />
                        {showSearchDropdown && (
                            <div data-lenis-prevent className="searchDropdown">
                                <ul>
                                    {searchedBrands?.length > 0 && (
                                        <>
                                            <li className="heading">
                                                Brands
                                            </li>
                                            {searchedBrands.map((item, index) => (
                                                <li key={index}>
                                                    <Link href={`/brands/${item?.slug}`}>
                                                        {item?.image && (
                                                            <Image src={item.image} alt={item.name} width={40} height={40} />
                                                        )}
                                                        <h6>{item?.name}</h6>
                                                    </Link>
                                                </li>
                                            ))}
                                        </>
                                    )}

                                    {searchedCars?.length > 0 && (
                                        <>
                                            <li className="heading">
                                                Cars
                                            </li>
                                            {searchedCars.map((item, index) => (
                                                <li key={index}>
                                                    <Link href={`/product/${item?.slug}`}>
                                                        <h6>{item?.name}</h6>
                                                    </Link>
                                                </li>
                                            ))}
                                        </>
                                    )}

                                    {searchTerm && searchedBrands.length === 0 && searchedCars.length === 0 && (
                                        <li className="no-results">
                                            <p>No results found</p>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="sortBar">
                        {[
                            { label: selectedCategory, type: "category" },
                            { label: selectedSort, type: "sort" },
                            // { label: "Price", type: "price" }
                        ].map(({ label, type }, index) => (
                            <div className={`dropdownCont ${activeDropdown === type ? "active" : ""}`} key={index}>
                                {type !== "sort" && (
                                    <button className="placeholder" onClick={() => handleDropdownToggle(type)}>
                                        <div>
                                            <span>{label}</span>
                                            {type === "sort" && <span className="min">(high to low)</span>}
                                        </div>
                                        <i className={`fas ${type === "sort" ? "fa-sort" : "fa-chevron-down"}`} />
                                    </button>
                                )}
                                {type === "sort" && (
                                    <button className="placeholder" onClick={() => handleDropdownToggle("sort")}>
                                        <div>
                                            <span>{selectedSort.split(":")[0]}</span> {/* Main heading */}
                                            {selectedSort.includes(":") && (
                                                <span className="min">({selectedSort.split(":")[1].trim()})</span>
                                            )}
                                        </div>
                                        <i className="fas fa-sort" />
                                    </button>
                                )}
                                {activeDropdown === type && (
                                    <div className="dropdown">
                                        {type === "category" ? (
                                            <ul data-lenis-prevent className="categoryGrid">
                                                <li
                                                    className={`categoryItem ${selectedCategory === "all" ? "active" : ""
                                                        }`}
                                                    onClick={() => handleCategorySelect("all")}
                                                >
                                                    <span>All</span>
                                                    <small>{totalQuantity} Cars</small>
                                                </li>
                                                {categoryData.map((item) => (
                                                    <li
                                                        key={item.name}
                                                        className={`categoryItem ${selectedCategory.toLowerCase() ===
                                                            item.name.toLowerCase()
                                                            ? "active"
                                                            : ""
                                                            }`}
                                                        onClick={() => handleCategorySelect(item.name)}
                                                    >
                                                        <span>{item.name}</span>
                                                        <small>{item.cars || 0} Cars</small>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : type === "sort" ? (
                                            <ul data-lenis-prevent className="sortGrid">
                                                {sortOptions.map((option, index) => (
                                                    <li
                                                        key={index}
                                                        className={`sortItem ${selectedSort ===
                                                            (option.sortingType
                                                                ? `${option.mainHeading}: ${option.sortingType}`
                                                                : option.mainHeading)
                                                            ? "active"
                                                            : ""
                                                            }`}
                                                        onClick={() => handleSortSelect(option)}
                                                    >
                                                        <span>
                                                            {option.sortingType
                                                                ? `${option.mainHeading}:`
                                                                : option.mainHeading}
                                                        </span>
                                                        {option?.sortingType && (
                                                            <span className="min">({option?.sortingType})</span>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : type === "price" ? (
                                            <>
                                                <h4>Price (AED)</h4>
                                                <div className="gridCont">
                                                    <div className="priceInputCont">
                                                        <label htmlFor="">Minimum</label>
                                                        <input
                                                            placeholder="Enter Amount"
                                                            type="number"
                                                            value={priceFilter.min}
                                                            onChange={(e) => handleInputChange(e, "min")}
                                                        />
                                                    </div>
                                                    <div className="priceInputCont">
                                                        <label htmlFor="">Maximum</label>
                                                        <input
                                                            placeholder="Enter Amount"
                                                            type="number"
                                                            value={priceFilter.max}
                                                            onChange={(e) => handleInputChange(e, "max")}
                                                        />
                                                    </div>
                                                    <div className="priceInputCont">
                                                        <button onClick={handleReset}>Reset</button>
                                                    </div>
                                                    <div className="priceInputCont">
                                                        <button
                                                            className="transparent"
                                                            onClick={handlePriceFilterSubmit}
                                                        >
                                                            Done
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        ) : null}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="dropdownCont">
                            <button onClick={() => handleFilter(true)} className="placeholder">
                                <div>
                                    <span>More Filters</span>
                                </div>
                                <i className="far fa-sliders-h" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Filter
                brands={brandsData}
                handle={handleFilter}
                filterState={isFilterVisible}
            />
        </>
    );
}

export default React.memo(SearchBar);
