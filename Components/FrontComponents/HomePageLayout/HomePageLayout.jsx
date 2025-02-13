'use client'
import React, { useEffect, useState } from "react";
import HomeBanner from "./HomeBanner/HomeBanner";
import Categories from "./Categories/Categories";
import Brands from "./Brands/Brands";
import "./HomePageLayout.scss";
import productsData from "@/DummyData/Products.json";
import faqData from "@/DummyData/Faq.json";
import CarsSection from "../CarsSection/CarsSection";
import Image from "next/image";
import FAQsSection from "@/Components/FAQsSection/FAQsSection";
import SecHeading from "@/Components/SecHeading/SecHeading";
import Link from "next/link";

function HomePageLayout() {
    const [windowWidth, setWindowWidth] = useState(0);
    const docData = [
        {
            heading: "For UAE Residents",
            list: ["Driving License", "Emirates ID"],
            note: "(Residential Visa may be acceptable)",
            img: "/images/uae-resident.webp",
        },
        {
            heading: "For Tourists visiting the UAE",
            list: [
                "Passport",
                "Visit Visa",
                "Home Country Driving License",
                "International Driving Permit (IDP)",
            ],
            img: "/images/uae-tourist.webp",
        },
    ];

    const benefitData = [
        {
            heading: "Enjoy the ride",
            content:
                "While you unwind, let our professional chauffeur take over the driving and handle the vehicle through traffic. With their experience of the city, you can enjoy a comfortable journey tailored to your preferences.",
            //   img: "/images/seat-belt.webp",
        },
        {
            heading: "Enjoy the ride",
            content:
                "While you unwind, let our professional chauffeur take over the driving and handle the vehicle through traffic. With their experience of the city, you can enjoy a comfortable journey tailored to your preferences.",
            //   img: "/images/seat-belt.webp",
        },
        {
            heading: "Enjoy the ride",
            content:
                "While you unwind, let our professional chauffeur take over the driving and handle the vehicle through traffic. With their experience of the city, you can enjoy a comfortable journey tailored to your preferences.",
            //   img: "/images/seat-belt.webp",
        },
    ];

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth);
        });
    })

    return (
        <>
            <HomeBanner />
            <Categories />
            {windowWidth > 768 && (
                <section
                    className="customBanner"
                    style={{ backgroundImage: "url(/images/mercedes.webp)" }}
                >
                    <div className="content">
                        <div className="customContainer">
                            <h2>Smart and Affordable Ways to Rent a Car in UAE</h2>
                            <p>
                                Still stuck searching for a
                                <strong>{`‘rent a car near me’? `}</strong>
                                Your perfect match is right here! OneTapDrive.com is one of
                                Dubai&apos;s emerging car rental marketplaces, catering to
                                budget-friendly car rental deals from the best rental companies.
                                You can access our extensive fleet of over 2,000 vehicles from
                                trusted rental companies across the UAE. We are confident that you
                                will find the most affordable options, whether you are a tourist
                                in need of a car or a resident looking for long-term rentals,
                                starting from AED 30 per day.
                            </p>
                        </div>
                    </div>
                </section>
            )}
            <Brands />
            <CarsSection secHeading={"Dubai Car Rental"} data={productsData} />
            <section className="addBanner">
                <div className="customContainer">
                    <figure className="imgCont">
                        <Image
                            width={1600}
                            height={450}
                            src={"/images/addnew.webp"}
                            alt="Advertisement Banner"
                        />
                    </figure>
                </div>
            </section>
            <CarsSection secHeading={"Luxury Car Rental"} data={productsData} />
            <section className="addBanner">
                <div className="customContainer">
                    <figure className="imgCont">
                        <Image
                            width={1366}
                            height={220}
                            src={"/images/add.webp"}
                            alt="Advertisement Banner"
                        />
                    </figure>
                </div>
            </section>
            <CarsSection isFeatured secHeading={"Economy Cars"} data={productsData} />
            {/* New Section  */}

            <section
                className="docSec"
                style={{ backgroundImage: "url('/images/doc-sec-bg.webp')" }}
            >
                <div className="customContainer">
                    <div className="contentWrapper">
                        <div className="emptySpace"></div>
                        <div className="contentSide">
                            <div className="content docContent">
                                <SecHeading
                                    heading={"Required Documents for Car Rental in the UAE"}
                                />
                                <p>
                                    One particular thing about the UAE is that you will find
                                    yourself visiting all the major attractions in the country.
                                    Located in the region, the best way to navigate is by car, with
                                    landmarks such as the Burj Khalifa and iconic shopping venues
                                    such as the Dubai Mall and stunning beaches of Jumeirah waiting
                                    to say welcome. You can rent a vehicle across the Emirates if
                                    you have the valid documents mentioned below.
                                </p>
                                <p>
                                    Hence, to enjoy our rental car services in the UAE, ensure you
                                    have a valid UAE driving license to rent both luxury and economy
                                    cars in Dubai.
                                </p>
                            </div>
                            <div className="docCardRow">
                                {docData?.map((item, index) => (
                                    <div className="docCard" key={index}>
                                        <div className="cardHead">
                                            <h5>{item?.heading}</h5>
                                        </div>
                                        <figure>
                                            <Image
                                                src={item?.img}
                                                width={250}
                                                height={140}
                                                alt={item?.heading}
                                            />
                                        </figure>
                                        <ul>
                                            {item?.list?.map((listItem, index) => (
                                                <li key={index}>
                                                    <i className="fas fa-caret-right" />
                                                    <span>{listItem}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        {item?.note && <p className="note">{item?.note}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <CarsSection secHeading={"Car with driver"} data={productsData} />
            <section className="benefitSec" style={{ backgroundImage: "url('/images/benefits-sec-bg.webp')" }}>
                <div className="customContainer">
                    <SecHeading
                        heading={"Top Benefits to Rent a Car with Driver in Dubai"}
                    />
                    <div className="benefitRow">
                        {benefitData?.map((item, index) => (
                            <div className="benefitCard" key={index}>
                                {/* <figure>
                  <Image
                    src={item?.img}
                    width={100}
                    height={100}
                    alt={`${item?.heading}`}
                  />
                </figure> */}
                                <h5>{item?.heading}</h5>
                                <p>{item?.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="bestCarSec">
                <div className="customContainer">
                    <div className="bestCarRow">
                        <figure>
                            <Image
                                src={"/images/rent-vector.webp"}
                                width={550}
                                height={350}
                                alt="Car Image"
                            />
                        </figure>
                        <div className="content">
                            <SecHeading heading="Find the Best Car Rental and Driver Services in Dubai" />
                            <ul>
                                <li>
                                    <i className="fas fa-caret-right" />
                                    <span>
                                        <Link href={"https://onetapdrive.com"}>
                                            OneTapDrive.com
                                        </Link>{" "}
                                        is a renowned car rental and leasing marketplace. With over
                                        2,000 verified cars, we feature with more than 200 local car
                                        rental companies in Dubai to ensure you get the best rental
                                        options.
                                    </span>
                                </li>
                                <li>
                                    <i className="fas fa-caret-right" />
                                    <span>
                                        Whether for business or personal use, explore the cheapest
                                        car rental deals and discounts in your area. We also offer
                                        competitive, commission free car rental services in Dubai,
                                        Abu Dhabi, Sharjah and Ajman. Additionally we provide
                                        chauffeur services.
                                    </span>
                                </li>
                                <li>
                                    <i className="fas fa-caret-right" />
                                    <span>
                                        We have a fleet of luxury supercars (Ferrari, Lamborghini,
                                        and Rolls Royce), premium SUVs (Range Rover and Mercedes
                                        Benz) and economy cars (Kia Picanto, Nissan Sunny, and
                                        Renault Duster). This wide variety makes our clients happy
                                        with a large choice to pick from.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <FAQsSection data={faqData} secHeading={"Frequently Asked Questions"} />
        </>
    );
}

export default React.memo(HomePageLayout);
