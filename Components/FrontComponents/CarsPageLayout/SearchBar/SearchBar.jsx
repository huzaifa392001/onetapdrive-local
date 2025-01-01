'use client';
import React, { useState } from 'react';
import "../CarsPageLayout.scss";
import categoryData from "@/DummyData/Categories.json";
import { usePathname, useRouter } from 'next/navigation';

function SearchBar() {
    const path = usePathname()
    const [activeDropdown, setActiveDropdown] = useState(''); // Manage active dropdown
    const [selectedCategory, setSelectedCategory] = useState(path.split("/")[2].replace("-", " ")); // Default category
    const [priceFilter, setPriceFilter] = useState({ min: '', max: '' }); // Manage price inputs
    const Router = useRouter()

    const handleDropdownToggle = (type) => {
        setActiveDropdown((prev) => (prev === type ? '' : type)); // Toggle dropdown
    };

    const handleInputChange = (e, field) => {
        setPriceFilter({ ...priceFilter, [field]: e.target.value }); // Update price input
    };

    const handleReset = () => {
        setPriceFilter({ min: '', max: '' }); // Reset inputs
    };

    const handleDone = () => {
        setActiveDropdown(''); // Close dropdown on 'Done'
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category); // Update selected category
        setActiveDropdown(''); // Close dropdown
        let route = category.toString().replace(" ", "-")
        Router.push(`/cars/${route.toLowerCase()}`)
    };

    return (
        <div className="searchBar">
            <div className="customContainer">
                <div className="searchCont">
                    <input placeholder="Search" type="text" />
                    <button className="themeBtn">Search</button>
                </div>
                <div className="sortBar">
                    {[
                        { label: selectedCategory, type: 'sports' },
                        { label: 'Sort: Daily', type: 'sort' },
                        { label: 'Price', type: 'price' },
                    ].map(({ label, type }) => (
                        <div
                            className={`dropdownCont ${activeDropdown === type ? 'active' : ''}`}
                            key={type}
                        >
                            <button
                                className="placeholder"
                                onClick={() => handleDropdownToggle(type)}
                            >
                                <div>
                                    <span>{label}</span>
                                    {type === 'sort' && (
                                        <span className="min">(high to low)</span>
                                    )}
                                </div>
                                <i className={`fas ${type === 'sort' ? 'fa-sort' : 'fa-chevron-down'}`} />
                            </button>
                            {activeDropdown === type && (
                                <div className="dropdown">
                                    {type === 'sports' ? (
                                        <ul data-lenis-prevent className="categoryGrid">
                                            {categoryData.map((item) => (
                                                <li
                                                    key={item.name}
                                                    className={`categoryItem ${selectedCategory === item.name ? 'active' : ''
                                                        }`}
                                                    onClick={() => handleCategorySelect(item.name)}
                                                >
                                                    <span>{item.name}</span>
                                                    <small>{item.quantity} Cars</small>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : type === 'price' ? (
                                        <>
                                            <h4>Price (AED)</h4>
                                            <div className="gridCont">
                                                <div className="priceInputCont">
                                                    <label htmlFor="">Minimum</label>
                                                    <input
                                                        placeholder="Enter Amount"
                                                        type="number"
                                                        value={priceFilter.min}
                                                        onChange={(e) => handleInputChange(e, 'min')}
                                                    />
                                                </div>
                                                <div className="priceInputCont">
                                                    <label htmlFor="">Maximum</label>
                                                    <input
                                                        placeholder="Enter Amount"
                                                        type="number"
                                                        value={priceFilter.max}
                                                        onChange={(e) => handleInputChange(e, 'max')}
                                                    />
                                                </div>
                                                <div className="priceInputCont">
                                                    <button onClick={handleReset}>Reset</button>
                                                </div>
                                                <div className="priceInputCont">
                                                    <button className="transparent" onClick={handleDone}>
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
                        <button className="placeholder">
                            <i className="far fa-sliders-h" />
                            <div>
                                <span>More Filters</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(SearchBar);
