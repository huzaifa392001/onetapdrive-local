import ProductCard from "@/Components/ProductCard/ProductCard";
import React, { Suspense } from "react";
import productsData from "@/DummyData/Products.json";
import ProductCardSkeleton from "@/Components/ProductCard/ProductCardSkeleton";
import "./FilteredCars.scss";
import FullProductCard from "@/Components/FullProductCard/FullProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

function FilteredCars(props) {
    return (
        <div className="filteredCars">
            {/* <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={16}
                slidesPerView={1} // Default for smaller screens
                pagination={{ clickable: true }}
                breakpoints={{
                    575: {
                        slidesPerView: 2
                    },
                    768: {
                        slidesPerView: 3
                    }
                }}
            >
                {props?.premium && (
                    <>
                        {props?.carsData &&
                            props?.carsData?.slice(0, 3).map((item, index) => (
                                <Suspense key={index} fallback={<ProductCardSkeleton />}>
                                    <SwiperSlide>
                                        <ProductCard premium className={"premium"} data={item} />
                                    </SwiperSlide>
                                </Suspense>
                            ))}
                    </>
                )}
            </Swiper> */}
            <div className="resultRow">
                {props?.carsData?.data?.length > 0 ? (
                    props?.carsData?.data.map((item, index) => <FullProductCard data={item} featured key={index} />)
                ) : (
                    <div className="noResult">
                        <p>No cars found.</p>
                    </div>
                )}
            </div>

            {props?.carsData?.data?.length > 0 && (
                <div className="totalResult">
                    <p>
                        Showing <span>1</span> - <span>{props?.carsData?.perPage || props?.carsData?.totalItems}</span>{" "}
                        of <span>{props?.carsData?.totalItems}</span> Cars
                    </p>
                </div>
            )}
        </div>
    );
}

export default FilteredCars;
