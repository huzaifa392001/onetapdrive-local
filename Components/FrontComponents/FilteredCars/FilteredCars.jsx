import ProductCard from '@/Components/ProductCard/ProductCard';
import React, { Suspense } from 'react';
import productsData from "@/DummyData/Products.json";
import ProductCardSkeleton from '@/Components/ProductCard/ProductCardSkeleton';
import "./FilteredCars.scss";
import FullProductCard from '@/Components/FullProductCard/FullProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

function FilteredCars(props) {
    return (
        <div className="filteredCars">
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={16}
                slidesPerView={1} // Default for smaller screens
                pagination={{ clickable: true }}
                breakpoints={{
                    575:{
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                }}
            >
                {props?.premium && (
                    <>
                        {productsData?.slice(0, 3).map((item, index) => (
                            <Suspense key={index} fallback={<ProductCardSkeleton />}>
                                <SwiperSlide>
                                    <ProductCard premium className={'premium'} data={item} />
                                </SwiperSlide>
                            </Suspense>
                        ))}
                    </>
                )}
            </Swiper>
            <div className="resultRow">
                {productsData?.map((item, index) => (
                    <FullProductCard data={item} featured key={index} />
                ))}
            </div>
            <div className="totalResult">
                <p>Showing <span>1</span> - <span>20</span> of <span>1000</span> Cars</p>
            </div>
        </div>
    );
}

export default FilteredCars;
