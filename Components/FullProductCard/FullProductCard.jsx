"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import "./FullProductCard.scss";
import { store } from "@/Redux/Store";
import { toast } from "react-toastify";
import { SET_OTP_MODAL_STATUS, SET_USER_MODAL_STATUS } from "@/Redux/Slices/General";
import { useSelector } from "react-redux";

function FullProductCard(props) {
    const loggedInUser = useSelector((state) => state.auth.userDetails);
    const product = props?.data;
    // State for active image
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const buildWhatsAppMessage = () => {
        const brand = product?.model?.brand?.name || '';
        const model = product?.model?.name || '';
        const year = product?.makeYear || '';
        const company = product?.user?.vendorProfile?.companyName || '';

        let message = `Hi there, I would like to rent ${brand} ${model} ${year} by ${company}.\n\n`;

        // Get daily price
        const dailyPrice = product?.carPrices?.find(price => price.priceType === "daily")?.price;
        if (dailyPrice) {
            message += `Price per day: AED ${dailyPrice}/day\n`;
        }

        // Get weekly price
        const weeklyPrice = product?.carPrices?.find(price => price.priceType === "weekly")?.price;
        if (weeklyPrice) {
            message += `Price per week: AED ${weeklyPrice}/week\n`;
        }

        // Get monthly price
        const monthlyPrice = product?.carPrices?.find(price => price.priceType === "monthly")?.price;
        if (monthlyPrice) {
            message += `Price per month: AED ${monthlyPrice}/month\n`;
        }

        message += `Link: ${window.location.href}\n\n`;
        message += `Note: Any changes made to this message will result in the inquiry not being sent to the agent.`;

        const whatsappNumber = (product?.user?.vendorProfile?.whatsappNumber || '').replace(/[^0-9+]/g, '');
        const encodedMessage = encodeURIComponent(message);

        // Open WhatsApp with the message
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');

        return { whatsappNumber, encodedMessage };
    };

    const handleGenerateLead = (type) => {
        if (!loggedInUser?.id) {
            store.dispatch(SET_USER_MODAL_STATUS(true));
            toast.error("Please Login First");
            return;
        }

        if (!loggedInUser?.account_verified) {
            store.dispatch(SET_OTP_MODAL_STATUS(true));
            toast.error("Please verify your account first.");
            return;
        }

        if (type === "whatsapp") {
            buildWhatsAppMessage();
        }

        const body = {
            vendor_id: parseInt(user?.id),
            car_id: parseInt(product?.id),
            type: type
        };

        generateLeadMutation.mutate(body);
    };

    return (
        <div onMouseLeave={() => setActiveImageIndex(0)} className="fullProductCard">
            <Link href={`/product/${product?.slug}`}>
                <figure className="productImg">
                    {product?.refreshedAt && (
                        <span className="imgTag">
                            <i className="fas fa-stars" />
                            Featured
                        </span>
                    )}
                    {product?.images?.slice(0, 4)?.map((image, index) => (
                        <div key={index} className={`imgBox ${activeImageIndex === index ? "active" : ""}`}>
                            <Image
                                src={image?.image || ""}
                                fill
                                alt=""
                            // className={activeImageIndex === index ? "active" : ""}
                            />
                            {index === 3 && (
                                <div className="goToCont">
                                    <h6>Like what you see?</h6>
                                    <button className="themeBtn">
                                        Find out more
                                        <i className="far fa-chevron-double-right" />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="barRow">
                        {product?.images?.slice(0, 4)?.map((_, index) => (
                            <span
                                key={index}
                                onMouseEnter={() => setActiveImageIndex(index)}
                                className={activeImageIndex === index ? "active" : ""}
                            />
                        ))}
                    </div>
                </figure>
            </Link>
            <div className="content">
                <Link href={`/product/${product?.slug}`}>
                    <h3>
                        {product?.model?.brand?.name} {product?.model?.name} {product?.makeYear?.name}
                        &nbsp;
                        <span>
                            Hire in {product?.city?.name}: {product?.color?.name} {product?.category?.name},{" "}
                            {product?.seatingCapacity?.name}{" "} {product?.features && "with "}
                            {product?.features
                                ?.slice(0, 3)
                                ?.map((item, index, array) =>
                                    `${item?.name ? item?.name + (index < array.length - 1 ? ", " : "") : ""}`
                                )}
                        </span>
                    </h3>
                </Link>
                <div className="carInfo">
                    <div className="leftArea">
                        <div className="tags">
                            <span className="tag">{product?.category?.name}</span>
                            <span className="tag">
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 512 512"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M149.6 41L42.88 254.4c23.8 24.3 53.54 58.8 78.42 97.4 24.5 38.1 44.1 79.7 47.1 119.2h270.3L423.3 41H149.6zM164 64h230l8 192H74l90-192zm86.8 17.99l-141 154.81L339.3 81.99h-88.5zM336 279h64v18h-64v-18z"></path>
                                </svg>
                                {product?.door?.name}
                            </span>
                            <span className="tag">
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 24 24"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                                    <path d="M15 5v7H9V5h6m0-2H9c-1.1 0-2 .9-2 2v9h10V5c0-1.1-.9-2-2-2zm7 7h-3v3h3v-3zM5 10H2v3h3v-3zm15 5H4v6h2v-4h12v4h2v-6z"></path>
                                </svg>
                                {product?.seatingCapacity?.name}
                            </span>
                            <span className="tag">
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 24 24"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path d="M17 6h-2V3c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v3H7c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2 0 .55.45 1 1 1s1-.45 1-1h6c0 .55.45 1 1 1s1-.45 1-1c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9.5 18H8V9h1.5v9zm3.25 0h-1.5V9h1.5v9zm.75-12h-3V3.5h3V6zM16 18h-1.5V9H16v9z"></path>
                                </svg>
                                {product?.bagFit?.name}
                            </span>
                        </div>
                        <div className="detail">
                            <ul>
                                {/* <li>
                                    <i className="fal fa-check-circle" />
                                    <p>Free Delivery</p>
                                </li> */}
                                <li>
                                    <i className="fal fa-check-circle" />
                                    <p>1 day rental available</p>
                                </li>
                                {!product?.insuranceIncluded && (
                                    <li>
                                        <i className="fal fa-check-circle" />
                                        <p>Insurance Required</p>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="rightArea">
                        <div className="priceCont">
                            <div className="priceBox">
                                {(() => {
                                    const dailyPrice = product?.carPrices?.find(item => item?.priceType === "daily");
                                    if (dailyPrice?.discountedPrice) {
                                        return (
                                            <p className="cutPrice">
                                                <del>AED {dailyPrice.price}</del>
                                            </p>
                                        );
                                    } else if (product?.daily_discount_price) {
                                        return (
                                            <p className="cutPrice">
                                                <del>AED {product?.daily_discount_price}</del>
                                            </p>
                                        );
                                    }
                                    return null;
                                })()}
                                <h6>
                                    <span>
                                        AED{" "}
                                        {(() => {
                                            const dailyPrice = product?.carPrices?.find(item => item?.priceType === "daily");
                                            return dailyPrice?.discountedPrice || dailyPrice?.price || "";
                                        })()}
                                    </span>{" "}
                                    / day
                                </h6>
                                <p>
                                    <i className="fas fa-road" />
                                    <span>
                                        {product?.carPrices?.find(item => item?.priceType === "daily")?.kilometers || ""} KM
                                    </span>
                                </p>
                            </div>
                            <div className="priceBox">
                                {product?.cutPrice && <p>{product?.cutPrice}</p>}

                                {(() => {
                                    const monthly = product?.carPrices?.find((item) => item?.priceType === "monthly");
                                    const weekly = product?.carPrices?.find((item) => item?.priceType === "weekly");
                                    const fallback = monthly || weekly;

                                    return fallback ? (
                                        <>
                                            {fallback.discountedPrice && (
                                                <p className="cutPrice">
                                                    <del>AED {fallback.price}</del>
                                                </p>
                                            )}
                                            <h6>
                                                <span>AED {fallback.discountedPrice || fallback.price}</span> / {fallback.priceType}
                                            </h6>
                                            <p>
                                                <i className="fas fa-road" />
                                                <span>{fallback.kilometers} KM</span>
                                            </p>
                                        </>
                                    ) : null;
                                })()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btnCont">
                    <figure className="brandImgCont">
                        <Image src={product?.user?.vendorProfile?.companyLogo} width={40} height={40} alt="" />
                    </figure>
                    <Link href={`tel:${product?.user?.phoneNumber}`} onClick={() => handleGenerateLead("call")} className="call">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.1817 8.95829C14.8234 8.95829 14.54 8.66663 14.54 8.31663C14.54 8.00829 14.2317 7.36663 13.715 6.80829C13.2067 6.26663 12.6484 5.94996 12.1817 5.94996C11.8234 5.94996 11.54 5.65829 11.54 5.30829C11.54 4.95829 11.8317 4.66663 12.1817 4.66663C13.015 4.66663 13.89 5.11663 14.6567 5.92496C15.3734 6.68329 15.8317 7.62496 15.8317 8.30829C15.8317 8.66663 15.54 8.95829 15.1817 8.95829Z" />
                            <path d="M18.1895 8.95829C17.8312 8.95829 17.5479 8.66663 17.5479 8.31663C17.5479 5.35829 15.1395 2.95829 12.1895 2.95829C11.8312 2.95829 11.5479 2.66663 11.5479 2.31663C11.5479 1.96663 11.8312 1.66663 12.1812 1.66663C15.8479 1.66663 18.8312 4.64996 18.8312 8.31663C18.8312 8.66663 18.5395 8.95829 18.1895 8.95829Z" />
                            <path d="M9.70671 12.4583L8.16504 14C7.84004 14.325 7.32337 14.325 6.99004 14.0083C6.89837 13.9166 6.80671 13.8333 6.71504 13.7416C5.85671 12.875 5.08171 11.9666 4.39004 11.0166C3.70671 10.0666 3.15671 9.11663 2.75671 8.17496C2.36504 7.22496 2.16504 6.31663 2.16504 5.44996C2.16504 4.88329 2.26504 4.34163 2.46504 3.84163C2.66504 3.33329 2.98171 2.86663 3.42337 2.44996C3.95671 1.92496 4.54004 1.66663 5.15671 1.66663C5.39004 1.66663 5.62337 1.71663 5.83171 1.81663C6.04837 1.91663 6.24004 2.06663 6.39004 2.28329L8.32337 5.00829C8.47337 5.21663 8.58171 5.40829 8.6567 5.59163C8.73171 5.76663 8.77337 5.94163 8.77337 6.09996C8.77337 6.29996 8.71504 6.49996 8.59837 6.69163C8.49004 6.88329 8.33171 7.08329 8.1317 7.28329L7.49837 7.94163C7.4067 8.03329 7.36504 8.14163 7.36504 8.27496C7.36504 8.34163 7.37337 8.39996 7.39004 8.46663C7.41504 8.53329 7.44004 8.58329 7.45671 8.63329C7.60671 8.90829 7.86504 9.26663 8.2317 9.69996C8.6067 10.1333 9.0067 10.575 9.44004 11.0166C9.52337 11.1 9.61504 11.1833 9.69837 11.2666C10.0317 11.5916 10.04 12.125 9.70671 12.4583Z" />
                            <path d="M18.8064 15.2751C18.8064 15.5084 18.7647 15.7501 18.6814 15.9834C18.6564 16.0501 18.6314 16.1167 18.598 16.1834C18.4564 16.4834 18.273 16.7667 18.0314 17.0334C17.623 17.4834 17.173 17.8084 16.6647 18.0167C16.6564 18.0167 16.648 18.0251 16.6397 18.0251C16.148 18.2251 15.6147 18.3334 15.0397 18.3334C14.1897 18.3334 13.2814 18.1334 12.323 17.7251C11.3647 17.3167 10.4064 16.7667 9.45638 16.0751C9.13138 15.8334 8.80638 15.5917 8.49805 15.3334L11.223 12.6084C11.4564 12.7834 11.6647 12.9167 11.8397 13.0084C11.8814 13.0251 11.9314 13.0501 11.9897 13.0751C12.0564 13.1001 12.123 13.1084 12.198 13.1084C12.3397 13.1084 12.448 13.0584 12.5397 12.9667L13.173 12.3417C13.3814 12.1334 13.5814 11.9751 13.773 11.8751C13.9647 11.7584 14.1564 11.7001 14.3647 11.7001C14.523 11.7001 14.6897 11.7334 14.873 11.8084C15.0564 11.8834 15.248 11.9917 15.4564 12.1334L18.2147 14.0917C18.4314 14.2417 18.5814 14.4167 18.673 14.6251C18.7564 14.8334 18.8064 15.0417 18.8064 15.2751Z" />
                        </svg>
                        <span>{product?.user?.phoneNumber}</span>
                    </Link>
                    <button onClick={() => handleGenerateLead("whatsapp")} className="whatsapp">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.584 3.79297C14.9473 2.15234 12.7676 1.25 10.4512 1.25C5.66992 1.25 1.7793 5.14062 1.7793 9.92188C1.7793 11.4492 2.17773 12.9414 2.93555 14.2578L1.70508 18.75L6.30273 17.543C7.56836 18.2344 8.99414 18.5977 10.4473 18.5977H10.4512C15.2285 18.5977 19.2051 14.707 19.2051 9.92578C19.2051 7.60938 18.2207 5.43359 16.584 3.79297ZM10.4512 17.1367C9.1543 17.1367 7.88477 16.7891 6.7793 16.1328L6.51758 15.9766L3.79102 16.6914L4.51758 14.0312L4.3457 13.7578C3.62305 12.6094 3.24414 11.2852 3.24414 9.92188C3.24414 5.94922 6.47852 2.71484 10.4551 2.71484C12.3809 2.71484 14.1895 3.46484 15.5488 4.82812C16.9082 6.19141 17.7441 8 17.7402 9.92578C17.7402 13.9023 14.4238 17.1367 10.4512 17.1367ZM14.4043 11.7383C14.1895 11.6289 13.123 11.1055 12.9238 11.0352C12.7246 10.9609 12.5801 10.9258 12.4355 11.1445C12.291 11.3633 11.877 11.8477 11.748 11.9961C11.623 12.1406 11.4941 12.1602 11.2793 12.0508C10.0059 11.4141 9.16992 10.9141 8.33008 9.47266C8.10742 9.08984 8.55273 9.11719 8.9668 8.28906C9.03711 8.14453 9.00195 8.01953 8.94727 7.91016C8.89258 7.80078 8.45898 6.73438 8.2793 6.30078C8.10352 5.87891 7.92383 5.9375 7.79102 5.92969C7.66602 5.92188 7.52148 5.92188 7.37695 5.92188C7.23242 5.92188 6.99805 5.97656 6.79883 6.19141C6.59961 6.41016 6.04102 6.93359 6.04102 8C6.04102 9.06641 6.81836 10.0977 6.92383 10.2422C7.0332 10.3867 8.45117 12.5742 10.627 13.5156C12.002 14.1094 12.541 14.1602 13.2285 14.0586C13.6465 13.9961 14.5098 13.5352 14.6895 13.0273C14.8691 12.5195 14.8691 12.0859 14.8145 11.9961C14.7637 11.8984 14.6191 11.8438 14.4043 11.7383Z" />
                        </svg>
                        <span>{product?.user?.vendorProfile?.whatsappNumber}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FullProductCard;
