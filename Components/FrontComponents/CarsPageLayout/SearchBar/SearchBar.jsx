"use client";
import React, { useState, useEffect } from "react";
import "../CarsPageLayout.scss";
import { usePathname, useRouter } from "next/navigation";
import { store } from "@/Redux/Store";
import { SET_SEARCH_PARAMS } from "@/Redux/Slices/Search";
import { useSelector } from "react-redux";
import Filter from "./Filter/Filter";
import brandsData from "@/DummyData/brands.json";

function SearchBar({ activeCategory }) {
    const path = usePathname();
    const categoryData = useSelector((state) => state?.general?.categories);
    const currentCategory = useSelector((state) => state?.search?.searchParam?.category);
    const [searchFilters, setSearchFilters] = useState(useSelector((state) => state.search.searchParam));
    const [activeDropdown, setActiveDropdown] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(currentCategory);
    const [selectedSort, setSelectedSort] = useState("Daily: High to Low");
    const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });
    const [isFilterVisible, setIsFilterVisible] = useState(false);
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

    const sortOptions = [
        { mainHeading: "Featured", sortingType: null },
        { mainHeading: "Daily", sortingType: "Low to High" },
        { mainHeading: "Daily", sortingType: "High to Low" },
        { mainHeading: "Weekly", sortingType: "Low to High" },
        { mainHeading: "Weekly", sortingType: "High to Low" },
        { mainHeading: "Monthly", sortingType: "Low to High" },
        { mainHeading: "Monthly", sortingType: "High to Low" }
    ];

    useEffect(() => {
        if (activeCategory && categoryData?.length > 0) {
            const foundCategory = categoryData.find(
                (item) => item.name.toLowerCase() === activeCategory.toLowerCase()
            );
            setSelectedCategory(foundCategory ? foundCategory.name : "all");
        } else {
            setSelectedCategory("all");
        }
    }, [activeCategory, categoryData]);

    const handleFilter = (filterState) => {
        setIsFilterVisible(filterState);
    };

    return (
        <>
            <div className="searchBar">
                <div className="searchContainer">
                    <div className="searchCont">
                        <input placeholder="Search" type="text" />
                        <button className="themeBtn">Search</button>
                    </div>
                    <div className="sortBar">
                        {[
                            { label: selectedCategory, type: "category" },
                            { label: selectedSort, type: "sort" },
                            { label: "Price", type: "price" }
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
                                                    className={`categoryItem ${
                                                        selectedCategory === "all" ? "active" : ""
                                                    }`}
                                                    onClick={() => handleCategorySelect("all")}
                                                >
                                                    <span>All</span>
                                                    <small>{totalQuantity} Cars</small>
                                                </li>
                                                {categoryData.map((item) => (
                                                    <li
                                                        key={item.name}
                                                        className={`categoryItem ${
                                                            selectedCategory.toLowerCase() ===
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
                                                        className={`sortItem ${
                                                            selectedSort ===
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
                                <i className="far fa-sliders-h" />
                                <div>
                                    <span>More Filters</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Filter
                setFilters={setSearchFilters}
                brands={brandsData}
                handle={handleFilter}
                filterState={isFilterVisible}
            />
        </>
    );
}

export default React.memo(SearchBar);
