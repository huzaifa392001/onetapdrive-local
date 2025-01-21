'use client'
import React, { useState } from 'react';
import './ProductPageLayout.scss';
import product from '@/DummyData/SingleProduct.json';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import BreadCrumb from '../BreadCrumb/BreadCrumb';
import CarsSection from '../CarsSection/CarsSection';
import relatedCars from "@/DummyData/Products.json"
import Head from 'next/head';

function ProductPageLayout() {
    const faqs = [
        {
            "question": "Can I get this car delivered?",
            "answer": "Grand Royal Rent a Car offers delivery upon request to your location (view fast delivery locations) within Dubai. However, free pick-up from their branch in Al Khabaisi is available during office hours. "
        },
        {
            "question": "Can I get this car delivered?",
            "answer": "Grand Royal Rent a Car offers delivery upon request to your location (view fast delivery locations) within Dubai. However, free pick-up from their branch in Al Khabaisi is available during office hours. "
        },
        {
            "question": "Can I get this car delivered?",
            "answer": "Grand Royal Rent a Car offers delivery upon request to your location (view fast delivery locations) within Dubai. However, free pick-up from their branch in Al Khabaisi is available during office hours. "
        },
        {
            "question": "Can I get this car delivered?",
            "answer": "Grand Royal Rent a Car offers delivery upon request to your location (view fast delivery locations) within Dubai. However, free pick-up from their branch in Al Khabaisi is available during office hours. "
        },
        {
            "question": "Can I get this car delivered?",
            "answer": "Grand Royal Rent a Car offers delivery upon request to your location (view fast delivery locations) within Dubai. However, free pick-up from their branch in Al Khabaisi is available during office hours. "
        },
        {
            "question": "Can I get this car delivered?",
            "answer": "Grand Royal Rent a Car offers delivery upon request to your location (view fast delivery locations) within Dubai. However, free pick-up from their branch in Al Khabaisi is available during office hours. "
        },
    ];

    const [activeFaq, setActiveFaq] = useState(null);  // Track the active FAQ
    const [activeModal, setActiveModal] = useState(null);  // Track which modal is active
    const currentCity = useSelector((state) => state.general.currentLocation);
    const route = usePathname().split('/');
    const activeRoute = route[route.length - 1]?.replaceAll("-", " ") || "Default Route";

    const renderTags = () => {
        const tags = [];
        if (product?.premium) tags.push("Premium");
        if (product?.featured) tags.push("Featured");

        return tags.map((tag, index) => (
            <span key={index} className="tag">
                <i className={`fas fa-${tag.toLowerCase()}`} />
                {tag}
            </span>
        ));
    };

    const handleFaqClick = (index) => {
        if (activeFaq === index) {
            setActiveFaq(null);  // Deselect the FAQ if it's already active
        } else {
            setActiveFaq(index);  // Set the clicked FAQ as active
        }
    };

    const handleOptionClick = (option) => {
        setActiveModal(option);  // Set the active modal to the clicked option
    };

    return (
        <>
            <Head>
                <title>{product?.brand?.name} {product?.model_name}</title>
                <meta name="description" content={`Rent ${product?.brand?.name} ${product?.model_name} in ${currentCity}.`} />
            </Head>



            <section className="productDetailSec">
                <div className="customContainer">
                    <BreadCrumb
                        city={currentCity}
                        brand={product?.brand?.name}
                        model={product?.model_name}
                    // route={activeRoute}
                    />

                    <div className="headingContainer">
                        <figure>
                            <Image
                                src={`/images/brands/${product?.brand?.image}`}
                                alt=""
                                fill
                            />
                        </figure>
                        <div className="heading">
                            <h1>
                                {product?.brand?.name || "Unknown Brand"} {product?.model_name || "Model"} {product?.make_year || "Year"}
                            </h1>
                            <h3>
                                Hire in {product?.city}: {product?.exterior_color.split(':')[0]}{' '}
                                {product?.category}, {product?.passengers} Seats with{' '}
                                {product?.car_features.replaceAll(',', ', ')}
                            </h3>
                        </div>
                    </div>

                    <div className="imagesRow">
                        <figure>
                            <Image
                                src={`/images/product/${product?.thumbnail}`} // Adjust the path as per your directory structure
                                alt={`Car Thumbnail Image`}
                                width={500}
                                height={500}
                            />
                        </figure>
                        {product?.images?.slice(0, 4).map((image, index) => {
                            if (index === 1) {
                                // Render index 2 and 3 in the same figure
                                return (
                                    <figure key={index} className='multiImage'>
                                        <Image
                                            src={`/images/product/${product?.images[1]?.name}`} // Image at index 2
                                            alt={`Car image ${index + 1}`}
                                            width={250}
                                            height={250}
                                        />
                                        <Image
                                            src={`/images/product/${product?.images[2]?.name}`} // Image at index 3
                                            alt={`Car image ${index + 2}`}
                                            width={250}
                                            height={250}
                                        />
                                    </figure>
                                );
                            }
                            // Skip index 3 since it's already included with index 2
                            if (index === 2) return null;

                            // Render all other images normally
                            return (
                                <figure key={index}>
                                    <Image
                                        src={`/images/product/${image.name}`}
                                        alt={`Car image ${index + 1}`}
                                        width={500}
                                        height={500}
                                    />
                                </figure>
                            );
                        })}
                        <div className="imgTags">
                            {renderTags()}

                            <div className="btnCont">
                                <Link href={""}>
                                    <i className="fal fa-share-alt" />
                                </Link>
                                <Link href={""}>
                                    <i className="fal fa-heart" />
                                </Link>
                            </div>
                        </div>
                        <Link href={""} className='showAllBtn'>
                            <i className="fas fa-images" />
                            View All Photos
                        </Link>
                    </div>

                    <div className="detailLayout">

                        <div className="details">
                            <h2 className='name'>
                                Rent {product?.brand?.name} {product?.model_name} {product?.make_year}
                            </h2>

                            <div className="tags">
                                <span className="tag">
                                    {product?.category}
                                    {/* <i className="fas fa-car" /> */}
                                </span>
                                <span className="tag">
                                    <svg stroke="currentColor"
                                        fill="currentColor" strokeWidth="0"
                                        viewBox="0 0 512 512" height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M149.6 41L42.88 254.4c23.8 24.3 53.54 58.8 78.42 97.4 24.5 38.1 44.1 79.7 47.1 119.2h270.3L423.3 41H149.6zM164 64h230l8 192H74l90-192zm86.8 17.99l-141 154.81L339.3 81.99h-88.5zM336 279h64v18h-64v-18z">
                                        </path>
                                    </svg>
                                    {product?.car_doors}
                                </span>
                                <span className="tag">
                                    <svg stroke="currentColor"
                                        fill="currentColor" strokeWidth="0"
                                        viewBox="0 0 24 24" height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill="none"
                                            d="M0 0h24v24H0V0z"></path>
                                        <path
                                            d="M15 5v7H9V5h6m0-2H9c-1.1 0-2 .9-2 2v9h10V5c0-1.1-.9-2-2-2zm7 7h-3v3h3v-3zM5 10H2v3h3v-3zm15 5H4v6h2v-4h12v4h2v-6z">
                                        </path>
                                    </svg>
                                    {product?.passengers}
                                </span>
                                <span className="tag">
                                    <svg stroke="currentColor"
                                        fill="currentColor" strokeWidth="0"
                                        viewBox="0 0 24 24" height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill="none"
                                            d="M0 0h24v24H0z"></path>
                                        <path
                                            d="M17 6h-2V3c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v3H7c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2 0 .55.45 1 1 1s1-.45 1-1h6c0 .55.45 1 1 1s1-.45 1-1c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9.5 18H8V9h1.5v9zm3.25 0h-1.5V9h1.5v9zm.75-12h-3V3.5h3V6zM16 18h-1.5V9H16v9z">
                                        </path>
                                    </svg>
                                    {product?.bags}
                                </span>
                            </div>

                            <div className="priceCont">
                                <div className="leftSide">
                                    <h2>
                                        {product?.daily_discount_price && (
                                            <span className='cutPrice' >From &nbsp;&nbsp;<del>AED {product?.daily_discount_price}</del></span>
                                        )}
                                        AED {product?.price_per_day} / Day
                                    </h2>
                                </div>
                                <div className="rightSide">
                                    <ul>
                                        <li>
                                            <i className="fas fa-check" />
                                            <span>1 day rental available</span>
                                        </li>
                                        <li>
                                            <i className="fas fa-check" />
                                            <span>Insurance Included</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="disclaimer">
                                <h4>Disclaimer:</h4>
                                <p>
                                    By using this website, you agree to our <Link href={"/terms-and-condition"}>Terms and Conditions</Link> and <Link href={"/privacy-policy"}>Privacy Policy</Link>, and disclaim <Link href={"/"}>Onetapdrive.com</Link> from any incorrect information provided by car rental companies or us.
                                </p>
                            </div>

                            <div className="description">
                                <h4>
                                    <i className="far fa-file-alt" />
                                    Description & Highlights:
                                </h4>
                                <p>
                                    Rent and drive this {product?.brand?.name} {product?.model_name} {product?.make_year}-model in Dubai, UAE for AED {product?.price_per_day}/day & AED 49999/month. Rental cost includes basic comprehensive insurance and standard mileage limit of {product?.per_day_mileage} km/day (AED 25 per additional km applicable). Security deposit of AED 5000 is required. Contact {product?.user?.company_name} directly for bookings and inquiries.
                                </p>
                                <button className="themeBtn themeBtnAlt">
                                    Read More
                                </button>
                            </div>

                            <div className="optionCont">
                                <ul>
                                    <li onClick={() => handleOptionClick('features')}>
                                        <span>Features & Specs</span>
                                        <i className='fas fa-chevron-right' />
                                    </li>
                                    <li onClick={() => handleOptionClick('supplier')}>
                                        <span>Supplier Details</span>
                                        <i className='fas fa-chevron-right' />
                                    </li>
                                    <li onClick={() => handleOptionClick('requirements')}>
                                        <span>Requirements</span>
                                        <i className='fas fa-chevron-right' />
                                    </li>
                                    {/* <li onClick={() => handleOptionClick('payment')}>
                                        <span>Payment Mode</span>
                                        <i className='fas fa-chevron-right' />
                                    </li> */}
                                    <li onClick={() => handleOptionClick('faq')}>
                                        <span>FAQs (Frequently Asked Questions)</span>
                                        <i className='fas fa-chevron-right' />
                                    </li>
                                </ul>
                            </div>

                        </div>



                    </div>
                </div>
            </section>

            <CarsSection
                secHeading={"More Like This"}
                limited
                data={relatedCars}
            />

            <div className={`sideModal ${activeModal === "faq" ? "active" : ""}`}>
                <div className="backdrop" onClick={() => handleOptionClick()} />
                <div className="modalContent">
                    <div className="modalHeader">
                        <h2>Frequently Asked Questions</h2>
                        <button onClick={() => handleOptionClick()}>
                            <i className="fas fa-times" />
                        </button>
                    </div>
                    <div className="modalBody">
                        <div className="faqs">
                            {faqs?.map((faq, index) => (
                                <div
                                    key={index}
                                    className={`faqBox ${activeFaq === index ? 'active' : ''}`} // Add active class based on state
                                    onClick={() => handleFaqClick(index)}
                                >
                                    <div className="question">
                                        <h3>{faq?.question}</h3>
                                        <i className={`far ${activeFaq === index ? "fa-minus" : "fa-plus"}`} />
                                    </div>
                                    {activeFaq === index && (  // Only show answer if this FAQ is active
                                        <div className="answer">
                                            <p>{faq?.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className={`sideModal ${activeModal === "requirements" ? "active" : ""}`}>
                <div className="backdrop" onClick={() => handleOptionClick()} />
                <div className="modalContent">
                    <div className="modalHeader">
                        <h2>Requirements</h2>
                        <button onClick={() => handleOptionClick()}>
                            <i className="fas fa-times" />
                        </button>
                    </div>
                    <div className="modalBody">
                        <div class="reqBox">
                            <h3>
                                <i class="far fa-id-card" />
                                Documents Required
                            </h3>
                            <p>
                                You are eligible to rent a car across the emirates provided you have the below mentioned documents valid with you:
                            </p>
                            <ul>
                                <li>
                                    <h4>Minimum Driver's Age</h4>
                                    <h3>18 Years</h3>
                                </li>
                                <li>
                                    <h4>Security Deposit</h4>
                                    <h3>AED 5000</h3>
                                </li>
                                <li>
                                    <h4>Refunded in</h4>
                                    <h3>30 days</h3>
                                </li>
                            </ul>
                            <h3>For UAE Residents</h3>
                            <ul>
                                <li className='nospace'>
                                    <i class="fas fa-check" />
                                    <h4>UAE Driving License</h4>
                                </li>
                                <li className='nospace'>
                                    <i class="fas fa-check" />
                                    <h4>Emirates ID (Residential Visa may be acceptable)</h4>
                                </li>
                            </ul>
                            <h3>For Tourist Visition UAE</h3>
                            <ul>
                                <li className='nospace'>
                                    <i class="fas fa-check" />
                                    <h4>Passport</h4>
                                </li>
                                <li className='nospace'>
                                    <i class="fas fa-check" />
                                    <h4>Visit Visa</h4>
                                </li>
                                <li className='nospace'>
                                    <i class="fas fa-check" />
                                    <h4>Home Country Driving License</h4>
                                </li>
                                <li className='nospace'>
                                    <i class="fas fa-check" />
                                    <h4>International Driving Permin (IDP)</h4>
                                </li>
                            </ul>
                            <p>
                                Visitors from the GCC, US, UK, Canada, Europe and certain other countries can drive with their home country driving license, without the need of an IDP.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`sideModal ${activeModal === "features" ? "active" : ""}`}>
                <div className="backdrop" onClick={() => handleOptionClick()} />
                <div className="modalContent">
                    <div className="modalHeader">
                        <h2>Features & Specs</h2>
                        <button onClick={() => handleOptionClick()}>
                            <i className="fas fa-times" />
                        </button>
                    </div>
                    <div className="modalBody">
                        <div class="featureBox">

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductPageLayout;
