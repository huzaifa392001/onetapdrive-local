"use client";
import ProductCard from "@/Components/ProductCard/ProductCard";
import ProductCardSkeleton from "@/Components/ProductCard/ProductCardSkeleton";
import SecHeading from "@/Components/SecHeading/SecHeading";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import "./CarsSection.scss";

import { Pagination } from 'swiper/modules';

function CarsSection(props) {
    const [windowWidth, setWindowWidth] = useState(0);
    const [total, setTotal] = useState();

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        windowWidth > 1024
            ? setTotal(8)
            : windowWidth > 768
                ? setTotal(3)
                : windowWidth > 480
                    ? setTotal(2)
                    : setTotal(1);
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth); // Update the windowWidth when the window is resized
        });
    });
    
    // Don't render the component if data is empty or undefined
    if (!props?.data || props?.data?.length === 0) return null;

    return (
        <section className="productSec">
            <div className="customContainer">
                <div className="headingCont">
                    <SecHeading heading={props?.secHeading} />
                    {!props?.limited && (
                        <Link href={props?.btnLink || ""} className="themeBtn">
                            View All
                        </Link>
                    )}
                </div>
                <Swiper
                    pagination={{
                        dynamicBullets: true,
                    }}
                    slidesPerView={1}
                    spaceBetween={0}
                    modules={[Pagination]}
                    className="mySwiper"
                    breakpoints={{
                        575: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        992: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1025: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {Array.isArray(props?.data) &&
                        props?.data?.map((product, index) => (
                            <SwiperSlide key={index}>
                                <Suspense fallback={<ProductCardSkeleton />}>
                                    <ProductCard
                                        featured={props?.isFeatured}
                                        className={`${props?.isFeatured ? "featured" : ""}`}
                                        data={product}
                                    />
                                </Suspense>
                            </SwiperSlide>
                        ))}
                </Swiper>
                {/* <div className="prodRow col4">


                </div> */}
            </div>
        </section>
    );
}

export default CarsSection;
