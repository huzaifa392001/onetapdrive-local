'use client';
import React, { useState } from 'react';
import './Categories.scss';
import SecHeading from '@/Components/SecHeading/SecHeading';
import CategoryCard from './CategoryCard/CategoryCard';
import { useSelector } from 'react-redux';

function Categories() {
    const [showAll, setShowAll] = useState(false);
    const categoriesData = useSelector((state) => state.general.categories);
    const carWithDriver = {
        name: "Car With Driver",
        img: "/images/categories/Car-With-Driver.webp",
        quantity: 9
    };

    // Ensure functionality only triggers when there are at least 8 categories
    const hasEnoughCategories = categoriesData?.length >= 8;
    const displayedCategories = showAll ? categoriesData : categoriesData?.slice(0, 7);

    return (
        <section className="categoriesSec">
            <div className="customContainer">
                {/* Section Heading */}
                <SecHeading heading={"Choose by categories"} />
                <div className="catRow">
                    {/* Map through displayedCategories */}
                    {displayedCategories?.map((category, index) => (
                        <div className="catCol" key={index}>
                            <CategoryCard data={category} />
                        </div>
                    ))}
                    <div className="catCol">
                        <CategoryCard data={carWithDriver} />
                    </div>
                </div>
                {hasEnoughCategories && (
                    <div className="showMoreCont">
                        <button className="themeBtn" onClick={() => setShowAll(!showAll)}>
                            {showAll ? "Show Less" : "Show More"}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default React.memo(Categories);