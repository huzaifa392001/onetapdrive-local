import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import brandsData from "@/DummyData/brands.json"
import "./brands.scss"

function page() {
    return (
        <>
            <section className="headingSec">
                <div className="customContainer">
                    <h1>Browse <span>Rental Cars</span> by Brands</h1>
                    <h5>
                        2214 cars from 47 auto brands available for hire in Dubai
                    </h5>
                    <p>
                        If you're looking to drive a car model of a specific auto brand in the UAE, you've come to the right place. <Link href={"https://onetapdrive.com"}>onetapdrive.com</Link> hosts the largest selection of cars for rent in the UAE. Listed below are cars available for hire by every auto brand. Be it cars by Ferrari, Lamborghini, Rolls Royce, Hyundai, Toyota, Honda, Kia and so on.
                    </p>
                </div>
            </section>
            <section className="brandsSec">
                <div className="customContainer">
                    <div className="brandRow">
                        {brandsData?.map((item, index) => (
                            <Link href={`/brands/${item?.url}`} className="brandCard" key={index}>
                                <figure>
                                    <Image src={item?.img} fill alt={`${item?.name}'s Image`} />
                                </figure>
                                <h3>{item?.name}</h3>
                                <h6>{item?.quantity} Cars Available</h6>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default page