import React, { Suspense, useEffect } from "react";
import "./FilteredCars.scss";
import FullProductCard from "@/Components/FullProductCard/FullProductCard";
import ProductCardSkeleton from "@/Components/ProductCard/ProductCardSkeleton";
import ProductCard from "@/Components/ProductCard/ProductCard";

function FilteredCars(props) {

    const premiumCars = props?.premiumCars;
    useEffect(() => {
        console.log("paginationData=>", props?.paginationData)
    }, [props?.paginationData])

    return (
        <div className="filteredCars">
            <div class="premiumRow">
                {props?.premium && (
                    <>
                        {premiumCars?.carDetails?.map((item, index) => (
                            <Suspense key={index} fallback={<ProductCardSkeleton />}>
                                <ProductCard premium className={"premium"} data={item?.car} />
                            </Suspense>
                        ))}
                    </>
                )}
            </div>

            {/* {props?.carsData?.length > 0 && (
                <div className="totalResult">
                    <p>
                        Showing <span>1</span> - <span>{props?.paginationData?.perPage || props?.paginationData?.totalItems}</span>{" "}
                        of <span>{props?.paginationData?.totalItems}</span> Cars
                    </p>
                </div>
            )} */}

            <div className="resultRow">
                {props?.carsData?.length > 0 ? (
                    props?.carsData.map((item, index) => <FullProductCard data={item} featured key={index} />)
                ) : (
                    <div className="noResult">
                        <p>No cars found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FilteredCars;
