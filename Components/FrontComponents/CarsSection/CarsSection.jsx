"use client";
import ProductCard from "@/Components/ProductCard/ProductCard";
import ProductCardSkeleton from "@/Components/ProductCard/ProductCardSkeleton";
import SecHeading from "@/Components/SecHeading/SecHeading";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import "./CarsSection.scss";

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
    return (
        <section className="productSec">
            <div className="customContainer">
                <div className="headingCont">
                    <SecHeading heading={props?.secHeading} />
                    {!props?.limited && (
                        <Link href={""} className="themeBtn">
                            View All
                        </Link>
                    )}
                </div>
                <div className="prodRow col4">
                    {Array.isArray(props?.data) &&
                        props?.data?.slice(0, total || 1).map((product, index) => (
                            <Suspense key={index} fallback={<ProductCardSkeleton />}>
                                <ProductCard
                                    featured={props?.isFeatured}
                                    className={`${props?.isFeatured ? "featured" : ""}`}
                                    data={product}
                                />
                            </Suspense>
                        ))}
                </div>
            </div>
        </section>
    );
}

export default CarsSection;
