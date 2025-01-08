'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import "./ProductCard.scss"

function ProductCard(props) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const product = props?.data;
    const images = product?.thumbnail
        ? [{ name: product?.thumbnail }, ...product?.images?.slice(0, 3)] // Thumbnail + 3 images
        : [...product?.images?.slice(0, 4)]; // 4 images if no thumbnail
    return (
        <div onMouseLeave={() => setActiveImageIndex(0)} className={`productCard ${props?.className}`}>
            {!props?.premium && (
                <Link href={`/product/${product?.slug}`}>
                    <figure className='imgCont' >
                        {props?.premium && (
                            <span className="imgTag">
                                <i className="fas fa-star" />
                                Premium
                            </span>
                        )}
                        {props?.featured && (
                            <span className="imgTag">
                                <i className="fas fa-stars" />
                                Featured
                            </span>
                        )}
                        <Image src={`/images/product/${product?.thumbnail}`} fill alt='' />
                    </figure>
                </Link>
            )}
            {props?.premium && (
                <Link href={`/product/${product?.slug}`}>
                    <figure className="imgCont">
                        {props?.premium && (
                            <span className="imgTag">
                                <i className="fas fa-star" />
                                Premium
                            </span>
                        )}
                        {props?.featured && (
                            <span className="imgTag">
                                <i className="fas fa-stars" />
                                Featured
                            </span>
                        )}
                        {images.map((image, index) => (
                            <div key={index} className={`imgBox ${activeImageIndex === index ? "active" : ""}`}>
                                <Image
                                    src={`/images/product/${image?.name}`}
                                    fill
                                    alt=""
                                // className={activeImageIndex === index ? "active" : ""}
                                />
                                {index === images?.length - 1 && (
                                    <div className="goToCont">
                                        <h6>Like what you see?</h6>
                                        <button class="themeBtn">
                                            Find out more
                                            <i class="far fa-chevron-double-right" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="barRow">
                            {images.map((_, index) => (
                                <span
                                    key={index}
                                    onMouseEnter={() => setActiveImageIndex(index)}
                                    className={activeImageIndex === index ? "active" : ""}
                                />
                            ))}
                        </div>
                    </figure>
                </Link>
            )}
            <div className="content">
                <Link href={`/product/${product?.slug}`}>
                    <h3>{product?.brand?.name} {product?.model_name} {product?.make_year}</h3>
                    <div className="tags">
                        <span className="tag">
                            {product?.category}
                            <i className="fas fa-car" />
                        </span>
                        <span className="tag">
                            {product?.car_doors}
                            <svg stroke="currentColor"
                                fill="currentColor" strokeWidth="0"
                                viewBox="0 0 512 512" height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M149.6 41L42.88 254.4c23.8 24.3 53.54 58.8 78.42 97.4 24.5 38.1 44.1 79.7 47.1 119.2h270.3L423.3 41H149.6zM164 64h230l8 192H74l90-192zm86.8 17.99l-141 154.81L339.3 81.99h-88.5zM336 279h64v18h-64v-18z">
                                </path>
                            </svg>
                        </span>
                        <span className="tag">
                            {product?.passengers}
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
                        </span>
                        <span className="tag">
                            {product?.bags}
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
                        </span>
                    </div>
                </Link>
                <div className="divider" />
                <div className="priceCont">
                    <div className="priceBox">
                        {product?.daily_discount_price && (
                            <p className='cutPrice' ><del>AED {product?.daily_discount_price}</del></p>
                        )}
                        <h6><span>AED {product?.price_per_day}</span> / day</h6>
                        <p>
                            <i className="fas fa-road" />
                            <span>
                                {product?.per_day_mileage} KM
                            </span>
                        </p>
                    </div>
                    <div className="priceBox">
                        {product?.cutPrice && (
                            <p>{product?.cutPrice}</p>
                        )}
                        <h6><span>AED {product?.monthly_extra}</span> / monthly</h6>
                        <p>
                            <i className="fas fa-road" />
                            <span>
                                {product?.monthly_mileage} KM
                            </span>
                        </p>
                    </div>
                </div>
                <div className="divider" />
                <div className="brandCont">
                    <Link href={``} className="brand">
                        <Image src={`/images/product/${product?.brand?.image}`} fill alt='' />
                    </Link>
                    <div className="detail">
                        <ul>
                            <li>
                                <i className="fas fa-check" />
                                <p>1 day rental available</p>
                            </li>
                            <li>
                                <i className="fas fa-check" />
                                <p>Insurance Required</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard