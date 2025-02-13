'use client';
import React, { useEffect, useState } from 'react';
import SecHeading from '@/Components/SecHeading/SecHeading';
import CategoryCard from './CategoryCard/CategoryCard';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './Categories.scss';

function Categories() {
    const [windowWidth, setWindowWidth] = useState(0);
    const [showAll, setShowAll] = useState(false);
    const categoriesData = useSelector((state) => state.general.categories);
    const [totalCat, setTotalCat] = useState(0);
    const carWithDriver = {
        name: "Car With Driver",
        img: "/images/categories/Car-With-Driver.webp",
        quantity: 9
    };

    // Ensure functionality only triggers when there are at least 8 categories
    const hasEnoughCategories = categoriesData?.length >= 8;
    const displayedCategories = showAll ? categoriesData : categoriesData?.slice(0, totalCat);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Set initial window width

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (windowWidth > 768) {
            setTotalCat(7);
        } else {
            setTotalCat(6);
        }
    }, [windowWidth]);

    return (
        <>
            <section className="categoriesSec">
                <div className="customContainer">
                    {/* Section Heading */}
                    <SecHeading
                        // description={`Take your road trip to the next level with <strong>cheap car rental Dubai</strong> options and enjoy premium cars from leading automakers.`}
                        heading={"Choose by categories"}
                    />
                    <div className="catRow">
                        {/* Map through displayedCategories */}
                        {displayedCategories?.map((category, index) => (
                            <div className="catCol" key={index}>
                                <CategoryCard data={category} />
                            </div>
                        ))}
                        <div className="catCol cwd">
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
        </>
    );
}

export default React.memo(Categories);