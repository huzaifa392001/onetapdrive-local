'use client'
import SecHeading from '@/components/SecHeading/SecHeading'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './Brands.scss'

import { Pagination, Autoplay } from 'swiper/modules';
import brandsData from '@/DummyData/brands.json'
import BrandCard from './BrandCard/BrandCard';

function Brands() {
    return (
        <section className="brandsSec">
            <div className="customContainer">
                <SecHeading
                    heading={"Rent A Car From Top Brands"}
                    description={`Take your road trip to the next level with <strong>cheap car rental Dubai</strong> options and enjoy premium cars from leading automakers.`}
                />
                <Swiper
                    pagination={{
                        dynamicBullets: true,
                    }}
                    modules={[Pagination, Autoplay]}
                    className="brandsSwiper"
                    slidesPerView={4}
                    loop={true}
                    spaceBetween={10}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: true,
                    }}
                    breakpoints={{
                        575: {
                            slidesPerView: 4.5,
                        },
                        767: {
                            slidesPerView: 5.5,
                        },
                        991: {
                            slidesPerView: 7.75,
                        },
                        1199: {
                            slidesPerView: 7,
                        },
                        1366: {
                            slidesPerView: 10,
                        },
                    }}
                >
                    {brandsData?.map((brand, index) => (
                        <SwiperSlide key={index}>
                            <BrandCard data={brand} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

export default Brands
