"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import brandsData from "@/DummyData/brands.json";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

function BrandsPageLayout() {
    const brands = useSelector((state) => state.general.brands);

    return (
        <>
            <section className="headingSec">
                <div className="customContainer">
                    <h1>
                        Browse <span>Rental Cars</span> by Brands
                    </h1>
                    <h5>2214 cars from 47 auto brands available for hire in Dubai</h5>
                    <p>
                        If you&apos;re looking to drive a car model of a specific auto brand in the UAE, you&apos;ve
                        come to the right place. <Link href={"https://onetapdrive.com"}>onetapdrive.com</Link> hosts the
                        largest selection of cars for rent in the UAE. Listed below are cars available for hire by every
                        auto brand. Be it cars by Ferrari, Lamborghini, Rolls Royce, Hyundai, Toyota, Honda, Kia and so
                        on.
                    </p>
                </div>
            </section>
            <section className="brandsSec">
                <div className="customContainer">
                    <div className="brandRow">
                        {brands?.map((item, index) => (
                            <Link href={`/brands/${item?.brand_slug}`} className="brandCard" key={index}>
                                <figure>
                                    <Image src={item?.brand_image} fill alt={`${item?.brand_name}'s Image`} />
                                </figure>
                                <h3>{item?.brand_name}</h3>
                                <h6>{item?.cars} Cars Available</h6>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default BrandsPageLayout;
