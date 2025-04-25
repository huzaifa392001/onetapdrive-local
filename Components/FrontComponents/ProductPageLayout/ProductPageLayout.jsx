"use client";
import React, { useEffect, useState } from "react";
import "./ProductPageLayout.scss";
import product from "@/DummyData/SingleProduct.json";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import Head from "next/head";
import { useMutation, useQuery } from "@tanstack/react-query";
import { generateLead, getSingleCar } from "@/Services/FrontServices/GeneralServices";
import Loading from "@/app/(home)/loading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Fancybox from "@/Components/Fancybox/Fancybox";
import { getSingleWishlistedCar, toggleWishlist } from "@/Services/UserServices/UserServices";
import { toast } from "react-toastify";
import { store } from "@/Redux/Store";
import { SET_OTP_MODAL_STATUS, SET_USER_MODAL_STATUS } from "@/Redux/Slices/General";

function ProductPageLayout() {
    const [data, setData] = useState();
    const [user, setUser] = useState({});
    const [vendor, setVendor] = useState({});
    const [fancyboxIsActive, setFancyboxIsActive] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState();
    const [activeAccordion, setActiveAccordion] = useState(null); // Track active accordion
    const [activeFaq, setActiveFaq] = useState(null); // Track the active FAQ
    const [activeModal, setActiveModal] = useState(null); // Track which modal is active
    const [activePrice, setActivePrice] = useState(null);
    const currentCity = useSelector((state) => state.general.currentLocation);
    const route = usePathname().split("/").pop();
    const [isMobile, setIsMobile] = useState(false);
    const loggedInUser = useSelector((state) => state.auth.userDetails);

    const faqs = [
        {
            question: `What is the daily and monthly rate of renting a ${data?.name}?`,
            answer: `The daily price for the ${data?.name} is AED ${data?.carPrices?.map((item) =>
                item?.priceType === "daily" ? item?.price : null
            )} per day and AED  ${data?.carPrices?.map((item) =>
                item?.priceType === "monthly" ? item?.price : null
            )} per month. Rate may vary depending on the length of time renting and season.`
        },
        {
            question: "What is the mileage limit for this rental?",
            answer: `Rentals have a standard mileage limit of ${data?.carPrices?.map((item) =>
                item?.priceType === "daily" ? item?.kilometers : null
            )} km/day.`
        },
        {
            question: `Are there any unique features that come with the ${data?.name}?`,
            answer: `There are features that come with ${data?.name} like ${data?.features?.map((item) => {
                return item?.name;
            })} that will allow you to have an enjoyable and comfortable ride.`
        },
        {
            question: "Can I get this car delivered?",
            answer: "Grand Royal Rent a Car offers delivery upon request to your location (view fast delivery locations) within Dubai. However, free pick-up from their branch in Al Khabaisi is available during office hours. "
        },
        {
            question: "Can I get this car delivered?",
            answer: "Grand Royal Rent a Car offers delivery upon request to your location (view fast delivery locations) within Dubai. However, free pick-up from their branch in Al Khabaisi is available during office hours. "
        },
        {
            question: "Can I get this car delivered?",
            answer: "Grand Royal Rent a Car offers delivery upon request to your location (view fast delivery locations) within Dubai. However, free pick-up from their branch in Al Khabaisi is available during office hours. "
        }
    ];

    const accordions = [
        {
            title: "Delivery & Pick-Up",
            data: [
                {
                    icon: (
                        <div className="delivery-icon">
                            <i className="far fa-building"></i>
                        </div>
                    ),
                    deliveryName: <p>Branch Pick-up</p>
                },
                {
                    icon: (
                        <div className="delivery-icon">
                            <i className="fas fa-door-open"></i>
                        </div>
                    ),
                    deliveryName: <p>Delivery to You</p>
                },
                {
                    icon: (
                        <div className="delivery-icon">
                            <i className="fas fa-plane-alt"></i>
                        </div>
                    ),
                    deliveryName: <p>Airport Delivery</p>
                },
                {
                    locationHeading: <h3>Company Location</h3>,
                    locationIcon: (
                        <div className="locationIcon">
                            <i className="fas fa-map-marker-alt"></i>
                        </div>
                    ),
                    CompanyLocation: <p>Office #2111, B2B Tower, Al Abraj Street, Business Bay, Dubai - UAE</p>
                }
            ]
        },
        {
            title: "Branch Location(s)",
            data: [
                {
                    location: (
                        <div className="branchLocation">
                            <span>Business Bay</span>
                        </div>
                    )
                }
            ]
        },
        {
            title: "Fast Delivery Locations",
            data: [
                {
                    location: (
                        <>
                            <a className="branchLocation" href="#">
                                <span>Bluewaters Island</span>
                            </a>
                            <a className="branchLocation" href="#">
                                <span>Business Bay</span>
                            </a>
                            <a className="branchLocation" href="#">
                                <span>DIFC</span>
                            </a>
                            <a className="branchLocation" href="#">
                                <span>Downtown Dubai</span>
                            </a>
                            <a className="branchLocation" href="#">
                                <span>Dubai Hills Estate</span>
                            </a>
                            <a className="branchLocation" href="#">
                                <span>Dubai Marina</span>
                            </a>
                            <a className="branchLocation" href="#">
                                <span>Dubai Waterfront</span>
                            </a>
                            <a className="branchLocation" href="#">
                                <span>Dubai World Central</span>
                            </a>
                            <a className="branchLocation" href="#">
                                <span>Emirates Hills</span>
                            </a>
                            <a className="branchLocation" href="#">
                                <span>JBR </span>
                            </a>
                            <a className="branchLocation" href="#">
                                <span>Jumeirah Heights</span>
                            </a>
                        </>
                    )
                }
            ]
        },
        {
            title: "Payment Mode",
            data: [
                {
                    location: (
                        <>
                            <div className="branchLocation">
                                <span>Credit Card</span>
                            </div>
                            <div className="branchLocation">
                                <span>Debit Card</span>
                            </div>
                            <div className="branchLocation">
                                <span>Cash</span>
                            </div>
                            <div className="branchLocation">
                                <span>Bitcoin/Crypto</span>
                            </div>
                        </>
                    )
                }
            ]
        },
        {
            title: "Languages Spoken",
            data: [
                {
                    location: (
                        <>
                            <div className="branchLocation">
                                <span>English</span>
                            </div>
                            <div className="branchLocation">
                                <span>Arabic</span>
                            </div>
                            <div className="branchLocation">
                                <span>French</span>
                            </div>
                            <div className="branchLocation">
                                <span>Russian</span>
                            </div>
                            <div className="branchLocation">
                                <span>Spanish</span>
                            </div>
                            <div className="branchLocation">
                                <span>Turkish</span>
                            </div>
                            <div className="branchLocation">
                                <span>Chinese</span>
                            </div>
                            <div className="branchLocation">
                                <span>German</span>
                            </div>
                        </>
                    )
                }
            ]
        },
        {
            title: "Car Fleet",
            data: [
                {
                    location: (
                        <>
                            <div className="branchLocation">
                                <span>SUV</span>
                            </div>
                            <div className="branchLocation">
                                <span>Sedan</span>
                            </div>
                            <div className="branchLocation">
                                <span>Convertible</span>
                            </div>
                            <div className="branchLocation">
                                <span>Coupe</span>
                            </div>
                            <div className="branchLocation">
                                <span>Muscle</span>
                            </div>
                            <div className="branchLocation">
                                <span>Hybrid</span>
                            </div>
                            <div className="branchLocation">
                                <span>Luxury</span>
                            </div>
                            <div className="branchLocation">
                                <span>Sports</span>
                            </div>
                            <div className="branchLocation">
                                <span>Supercar</span>
                            </div>
                            <div className="branchLocation">
                                <span>Compact</span>
                            </div>
                        </>
                    )
                }
            ]
        },
        {
            title: "About the supplier",
            data: [
                {
                    aboutLogo: (
                        <div className="logoSec">
                            <Link href={``} className="brand">
                                <figure>
                                    <Image
                                        src={`/images/brands/${product?.brand?.image}` || "/images/noImage.jpg"}
                                        alt=""
                                        width={50}
                                        height={50}
                                    />
                                </figure>
                                Top Elegant Car Rental LLC
                            </Link>
                        </div>
                    ),
                    aboutPara:
                        "We aspire to become the leading Luxury Rent a Car company in Dubai through continuous good quality services, brand new cars and customers satisfaction focus. From any of our locations you can get an affordable rate on a range of rental cars including luxury models from leading brands like BMW, Mercedes-Benz, and Audi among others."
                }
            ]
        }
    ];

    const { data: carData, isPending } = useQuery({
        queryKey: ["Car"],
        queryFn: () => getSingleCar(route)
    });

    const { data: wishlistData, isPending: isWishlistPending } = useQuery({
        queryKey: ["wishlist", carData?.data?.id], // good to include the id in the key
        queryFn: () => getSingleWishlistedCar(carData?.data?.id),
        enabled: !!data?.id
    });

    const wishlistMutation = useMutation({
        mutationFn: () => toggleWishlist(),
        onSuccess: () => {
            toast.success("Added To Wishlist");
        },
        onError: () => {
            toast.error("Failed to add to wishlist");
        }
    });

    const generateLeadMutation = useMutation({
        mutationFn: generateLead,
    })

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // Check initially
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const renderTags = () => {
        const tags = [];
        if (data?.premium) tags.push("Premium");
        if (data?.refreshedAt) tags.push("Featured");

        return tags.map((tag, index) => (
            <span key={index} className="tag">
                <i className={`fas fa-${tag.toLowerCase()}`} />
                {tag}
            </span>
        ));
    };

    const handleAccordionClick = (index) => {
        setActiveAccordion((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleFaqClick = (index) => {
        if (activeFaq === index) {
            setActiveFaq(null); // Deselect the FAQ if it's already active
        } else {
            setActiveFaq(index); // Set the clicked FAQ as active
        }
    };

    const handlePriceClick = (index) => {
        setActivePrice((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleOptionClick = (option) => {
        setActiveModal(option); // Set the active modal to the clicked option
    };

    const toggleWishlistFunc = (id) => {
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

        const body = {
            enabled: isWishlisted
        };

        wishlistMutation.mutate({ id: id, body: body });
        console.log("loggedInUser=> ", loggedInUser);
    };

    const openFancyboxFromIndex = (startIndex = 0) => {
        if (data?.images?.length) {
            const slides = data.images.map((item) => ({
                src: item.image,
                type: "image"
            }));

            window.Fancybox?.show(slides, { startIndex });
            setFancyboxIsActive(true);
        }
    };

    const buildWhatsAppMessage = () => {
        const brand = data?.model?.brand?.name || '';
        const model = data?.model?.name || '';
        const year = data?.makeYear || '';
        const company = vendor?.companyName || '';

        let message = `Hi there, I would like to rent ${brand} ${model} ${year} by ${company}.\n\n`;

        // Get daily price
        const dailyPrice = data?.carPrices?.find(price => price.priceType === "daily")?.price;
        if (dailyPrice) {
            message += `Price per day: AED ${dailyPrice}/day\n`;
        }

        // Get weekly price
        const weeklyPrice = data?.carPrices?.find(price => price.priceType === "weekly")?.price;
        if (weeklyPrice) {
            message += `Price per week: AED ${weeklyPrice}/week\n`;
        }

        // Get monthly price
        const monthlyPrice = data?.carPrices?.find(price => price.priceType === "monthly")?.price;
        if (monthlyPrice) {
            message += `Price per month: AED ${monthlyPrice}/month\n`;
        }

        message += `Link: ${window.location.href}\n\n`;
        message += `Note: Any changes made to this message will result in the inquiry not being sent to the agent.`;

        const whatsappNumber = (vendor?.whatsappNumber || '').replace(/[^0-9+]/g, '');
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
            car_id: parseInt(data?.id),
            type: type
        };

        console.log("leadBody=> ", body);

        generateLeadMutation.mutate(body);
    };

    useEffect(() => {
        setIsWishlisted(wishlistData?.data?.isCarWishlist);
    }, [wishlistData]);

    useEffect(() => {
        setData(carData?.data);
        setUser(carData?.data?.user);
        setVendor(carData?.data?.user?.vendorProfile);
    }, [carData]);

    if (!data || isPending) return <Loading />;

    return (
        <>
            <Head>
                <title>{data?.name}</title>
                <meta
                    name="description"
                    content={`Rent ${product?.model?.brand?.name} ${product?.model_name} in ${currentCity}.`}
                />
            </Head>

            <section className="productDetailSec">
                <div className="customContainer">
                    <BreadCrumb
                        city={data?.city?.name}
                        brand={data?.model?.brand?.name}
                        model={data?.model?.name}
                    />

                    <div className="headingContainer">
                        <figure>
                            <Image src={data?.model?.brand?.image || "/images/noImage.jpg"} alt="" fill />
                        </figure>
                        <div className="heading">
                            <h1>{data?.name}</h1>
                            <h3>
                                Hire in {data?.city?.name}: {data?.color?.name} {data?.category?.name},{" "}
                                {data?.seatingCapacity?.name}{" "} {data?.features && "with "}
                                {data?.features
                                    ?.slice(0, 3)
                                    ?.map((item, index, array) =>
                                        `${item?.name ? item?.name + (index < array.length - 1 ? ", " : "") : ""}`
                                    )}
                            </h3>
                        </div>
                    </div>

                    <div className="imagesRow">
                        {isMobile ? (
                            <Swiper
                                spaceBetween={10}
                                slidesPerView={1}
                                pagination={{ clickable: true }}
                                modules={[Pagination]}
                                className="mySwiper"
                            >
                                {data?.images?.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <figure>
                                            <Image
                                                onClick={() => openFancyboxFromIndex(index)}
                                                src={item?.image || "/images/noImage.jpg"}
                                                alt="Car Thumbnail Image"
                                                width={500}
                                                height={500}
                                            />
                                        </figure>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <>
                                <figure>
                                    <Image
                                        onClick={() => openFancyboxFromIndex(0)}
                                        src={data?.images?.[0]?.image || "/images/noImage.jpg"}
                                        alt="Car Thumbnail Image"
                                        width={500}
                                        height={500}
                                    />
                                </figure>

                                {(data?.images?.length > 1 ? data.images.slice(1, 5) : [null, null, null]).map(
                                    (image, index) => {
                                        const actualIndex = index + 1;

                                        if (index === 1) {
                                            return (
                                                <figure key={index} className="multiImage">
                                                    <Image
                                                        onClick={() => openFancyboxFromIndex(2)}
                                                        src={data?.images?.[2]?.image || "/images/noImage.jpg"}
                                                        alt={`Car image ${actualIndex + 0}`}
                                                        width={250}
                                                        height={250}
                                                    />
                                                    <Image
                                                        onClick={() => openFancyboxFromIndex(3)}
                                                        src={data?.images?.[3]?.image || "/images/noImage.jpg"}
                                                        alt={`Car image ${actualIndex + 1}`}
                                                        width={250}
                                                        height={250}
                                                    />
                                                </figure>
                                            );
                                        }

                                        if (index === 2) return null;

                                        return (
                                            <figure key={index} onClick={() => openFancyboxFromIndex(actualIndex)}>
                                                <Image
                                                    src={image?.image || "/images/noImage.jpg"}
                                                    alt={`Car image ${actualIndex}`}
                                                    width={500}
                                                    height={500}
                                                />
                                            </figure>
                                        );
                                    }
                                )}
                            </>
                        )}

                        <div className="imgTags">
                            {renderTags()}
                            <div className="btnCont">
                                <Link href="">
                                    <i className="fal fa-share-alt" />
                                </Link>
                                <button
                                    className={`wishlistBtn ${isWishlistPending ? "disabledBtn" : ""} ${isWishlisted ? "active" : ""
                                        } `}
                                    onClick={() => toggleWishlistFunc(data?.id)}
                                    disabled={isWishlistPending}
                                >
                                    <i className={`${isWishlisted ? "fas" : "fal"} fa-heart`} />
                                </button>
                            </div>
                        </div>

                        <button type="button" onClick={() => openFancyboxFromIndex(0)} className="showAllBtn">
                            <i className="fas fa-images" />
                            View All Photos
                        </button>
                    </div>

                    <div className="detailLayout">
                        <div className="details">
                            <h2 className="name">Rent {data?.name}</h2>

                            <div className="tags">
                                <span className="tag">
                                    {data?.category?.name || "Category Not Available"}
                                </span>
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
                                    {data?.door?.name}
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
                                    {data?.seatingCapacity?.name}
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
                                    {data?.bagFit?.name}
                                </span>
                            </div>

                            <div className="priceCont">
                                <div className="leftSide">
                                    <h2>
                                        {data?.carPrices?.map((item) => {
                                            <span className="cutPrice">
                                                From &nbsp;&nbsp;
                                                <del>AED {item?.discount === "daily" ? item?.price : null}</del>
                                            </span>
                                        })}
                                        AED{" "}
                                        {data?.carPrices?.map((item) =>
                                            item?.priceType === "daily" ? item?.price : null
                                        )}{" "}
                                        / Day
                                    </h2>
                                </div>
                                <div className="rightSide">
                                    <ul>
                                        <li>
                                            <i className="fas fa-check" />
                                            <span>1 day rental available</span>
                                        </li>
                                        {data?.insuranceIncluded && (
                                            <li>
                                                <i className="fas fa-check" />
                                                <span>Insurance Included</span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>

                            <div className="disclaimer">
                                <h4>Disclaimer:</h4>
                                <p>
                                    By using this website, you agree to our{" "}
                                    <Link href={"/terms-and-conditions"}>Terms and Conditions</Link> and{" "}
                                    <Link href={"/privacy-policy"}>Privacy Policy</Link>, and disclaim{" "}
                                    <Link href={"/"}>Onetapdrive.com</Link> from any incorrect information provided by
                                    car rental companies or us.
                                </p>
                            </div>

                            <div className="description">
                                <h4>
                                    <i className="far fa-file-alt" />
                                    Description & Highlights:
                                </h4>
                                <p>
                                    Drive the <strong>{data?.name}</strong> in Dubai for AED{" "}
                                    <strong>
                                        {data?.carPrices?.map((item) =>
                                            item?.priceType === "daily" ? item?.price : null
                                        )}
                                    </strong>{" "}
                                    per day or AED{" "}
                                    <strong>
                                        {data?.carPrices?.map((item) =>
                                            item?.priceType === "monthly" ? item?.price : null
                                        )}
                                    </strong>{" "}
                                    per month. The rental includes comprehensive insurance and comes with a mileage
                                    allowance of{" "}
                                    <strong>
                                        {data?.carPrices?.map((item) =>
                                            item?.priceType === "daily" ? item?.kilometers : null
                                        )}
                                    </strong>{" "}
                                    km per day.
                                </p>
                                <p>
                                    A security deposit of AED <strong>{data?.securityDepositAmount}</strong> is required
                                    at the time of booking and this is fully refundable.
                                </p>
                                <p>
                                    For availability and bookings, contact <strong>{vendor?.companyName}</strong> today.
                                </p>
                                <button
                                    className="themeBtn themeBtnAlt"
                                    onClick={() => handleOptionClick("description")}
                                >
                                    Read More
                                </button>
                            </div>

                            <div className="optionCont">
                                <ul>
                                    <li onClick={() => handleOptionClick("features")}>
                                        <span>Features & Specs</span>
                                        <i className="fas fa-chevron-right" />
                                    </li>
                                    <li onClick={() => handleOptionClick("requirements")}>
                                        <span>Requirements</span>
                                        <i className="fas fa-chevron-right" />
                                    </li>
                                    <li onClick={() => handleOptionClick("faq")}>
                                        <span>FAQs (Frequently Asked Questions)</span>
                                        <i className="fas fa-chevron-right" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="companyDetails">
                            <div className="supplierBox">
                                <div className="company">
                                    <figure>
                                        <Image
                                            title={vendor?.companyName}
                                            src={vendor?.companyLogo || "/images/noImage.jpg"}
                                            width={80}
                                            height={80}
                                            alt={`${product?.brand?.name}'s Image`}
                                        />
                                    </figure>
                                    <h5>Book directly from supplier</h5>
                                    <div className="btnCont">
                                        <button onClick={() => handleGenerateLead("call")} className="call">
                                            <svg
                                                width="21"
                                                height="20"
                                                viewBox="0 0 21 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M15.1817 8.95829C14.8234 8.95829 14.54 8.66663 14.54 8.31663C14.54 8.00829 14.2317 7.36663 13.715 6.80829C13.2067 6.26663 12.6484 5.94996 12.1817 5.94996C11.8234 5.94996 11.54 5.65829 11.54 5.30829C11.54 4.95829 11.8317 4.66663 12.1817 4.66663C13.015 4.66663 13.89 5.11663 14.6567 5.92496C15.3734 6.68329 15.8317 7.62496 15.8317 8.30829C15.8317 8.66663 15.54 8.95829 15.1817 8.95829Z" />
                                                <path d="M18.1895 8.95829C17.8312 8.95829 17.5479 8.66663 17.5479 8.31663C17.5479 5.35829 15.1395 2.95829 12.1895 2.95829C11.8312 2.95829 11.5479 2.66663 11.5479 2.31663C11.5479 1.96663 11.8312 1.66663 12.1812 1.66663C15.8479 1.66663 18.8312 4.64996 18.8312 8.31663C18.8312 8.66663 18.5395 8.95829 18.1895 8.95829Z" />
                                                <path d="M9.70671 12.4583L8.16504 14C7.84004 14.325 7.32337 14.325 6.99004 14.0083C6.89837 13.9166 6.80671 13.8333 6.71504 13.7416C5.85671 12.875 5.08171 11.9666 4.39004 11.0166C3.70671 10.0666 3.15671 9.11663 2.75671 8.17496C2.36504 7.22496 2.16504 6.31663 2.16504 5.44996C2.16504 4.88329 2.26504 4.34163 2.46504 3.84163C2.66504 3.33329 2.98171 2.86663 3.42337 2.44996C3.95671 1.92496 4.54004 1.66663 5.15671 1.66663C5.39004 1.66663 5.62337 1.71663 5.83171 1.81663C6.04837 1.91663 6.24004 2.06663 6.39004 2.28329L8.32337 5.00829C8.47337 5.21663 8.58171 5.40829 8.6567 5.59163C8.73171 5.76663 8.77337 5.94163 8.77337 6.09996C8.77337 6.29996 8.71504 6.49996 8.59837 6.69163C8.49004 6.88329 8.33171 7.08329 8.1317 7.28329L7.49837 7.94163C7.4067 8.03329 7.36504 8.14163 7.36504 8.27496C7.36504 8.34163 7.37337 8.39996 7.39004 8.46663C7.41504 8.53329 7.44004 8.58329 7.45671 8.63329C7.60671 8.90829 7.86504 9.26663 8.2317 9.69996C8.6067 10.1333 9.0067 10.575 9.44004 11.0166C9.52337 11.1 9.61504 11.1833 9.69837 11.2666C10.0317 11.5916 10.04 12.125 9.70671 12.4583Z" />
                                                <path d="M18.8064 15.2751C18.8064 15.5084 18.7647 15.7501 18.6814 15.9834C18.6564 16.0501 18.6314 16.1167 18.598 16.1834C18.4564 16.4834 18.273 16.7667 18.0314 17.0334C17.623 17.4834 17.173 17.8084 16.6647 18.0167C16.6564 18.0167 16.648 18.0251 16.6397 18.0251C16.148 18.2251 15.6147 18.3334 15.0397 18.3334C14.1897 18.3334 13.2814 18.1334 12.323 17.7251C11.3647 17.3167 10.4064 16.7667 9.45638 16.0751C9.13138 15.8334 8.80638 15.5917 8.49805 15.3334L11.223 12.6084C11.4564 12.7834 11.6647 12.9167 11.8397 13.0084C11.8814 13.0251 11.9314 13.0501 11.9897 13.0751C12.0564 13.1001 12.123 13.1084 12.198 13.1084C12.3397 13.1084 12.448 13.0584 12.5397 12.9667L13.173 12.3417C13.3814 12.1334 13.5814 11.9751 13.773 11.8751C13.9647 11.7584 14.1564 11.7001 14.3647 11.7001C14.523 11.7001 14.6897 11.7334 14.873 11.8084C15.0564 11.8834 15.248 11.9917 15.4564 12.1334L18.2147 14.0917C18.4314 14.2417 18.5814 14.4167 18.673 14.6251C18.7564 14.8334 18.8064 15.0417 18.8064 15.2751Z" />
                                            </svg>
                                            <span>{user?.phoneNumber}</span>
                                        </button>
                                        <button onClick={() => handleGenerateLead("whatsapp")} className="whatsapp">
                                            <svg
                                                width="21"
                                                height="20"
                                                viewBox="0 0 21 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M16.584 3.79297C14.9473 2.15234 12.7676 1.25 10.4512 1.25C5.66992 1.25 1.7793 5.14062 1.7793 9.92188C1.7793 11.4492 2.17773 12.9414 2.93555 14.2578L1.70508 18.75L6.30273 17.543C7.56836 18.2344 8.99414 18.5977 10.4473 18.5977H10.4512C15.2285 18.5977 19.2051 14.707 19.2051 9.92578C19.2051 7.60938 18.2207 5.43359 16.584 3.79297ZM10.4512 17.1367C9.1543 17.1367 7.88477 16.7891 6.7793 16.1328L6.51758 15.9766L3.79102 16.6914L4.51758 14.0312L4.3457 13.7578C3.62305 12.6094 3.24414 11.2852 3.24414 9.92188C3.24414 5.94922 6.47852 2.71484 10.4551 2.71484C12.3809 2.71484 14.1895 3.46484 15.5488 4.82812C16.9082 6.19141 17.7441 8 17.7402 9.92578C17.7402 13.9023 14.4238 17.1367 10.4512 17.1367ZM14.4043 11.7383C14.1895 11.6289 13.123 11.1055 12.9238 11.0352C12.7246 10.9609 12.5801 10.9258 12.4355 11.1445C12.291 11.3633 11.877 11.8477 11.748 11.9961C11.623 12.1406 11.4941 12.1602 11.2793 12.0508C10.0059 11.4141 9.16992 10.9141 8.33008 9.47266C8.10742 9.08984 8.55273 9.11719 8.9668 8.28906C9.03711 8.14453 9.00195 8.01953 8.94727 7.91016C8.89258 7.80078 8.45898 6.73438 8.2793 6.30078C8.10352 5.87891 7.92383 5.9375 7.79102 5.92969C7.66602 5.92188 7.52148 5.92188 7.37695 5.92188C7.23242 5.92188 6.99805 5.97656 6.79883 6.19141C6.59961 6.41016 6.04102 6.93359 6.04102 8C6.04102 9.06641 6.81836 10.0977 6.92383 10.2422C7.0332 10.3867 8.45117 12.5742 10.627 13.5156C12.002 14.1094 12.541 14.1602 13.2285 14.0586C13.6465 13.9961 14.5098 13.5352 14.6895 13.0273C14.8691 12.5195 14.8691 12.0859 14.8145 11.9961C14.7637 11.8984 14.6191 11.8438 14.4043 11.7383Z" />
                                            </svg>
                                            <span>{vendor?.whatsappNumber}</span>
                                        </button>
                                    </div>
                                    <div className="priceAccordion">
                                        {data?.carPrices?.map((price, index) => (
                                            <div
                                                key={index}
                                                className={`priceBox ${activePrice === index ? "active" : ""}`}
                                                onClick={() => handlePriceClick(index)}
                                            >
                                                <div className="priceTitle">
                                                    <h3>{price?.priceType}</h3>
                                                    <i
                                                        className={`far ${activePrice === index ? "fa-minus" : "fa-plus"
                                                            }`}
                                                    />
                                                </div>

                                                <div className="priceDetails">
                                                    <p className="priceMileage">
                                                        <strong> {price?.discountedPrice ? "Original" : ""} Price:</strong>
                                                        {price?.discountedPrice
                                                            ? <del>AED {price?.price}</del>
                                                            : <span>AED {price?.price}</span>
                                                        }
                                                    </p>
                                                    {price?.discountedPrice && (
                                                        <p className="priceMileage">
                                                            <strong>Discounted Price:</strong> {price?.discountedPrice}
                                                        </p>
                                                    )}
                                                    <p className="priceMileage">
                                                        <strong>Included mileage limit:</strong> {price?.kilometers} KM
                                                    </p>

                                                    {price?.details?.insurance && (
                                                        <p className="priceMileage">
                                                            <strong>Insurance:</strong> {price?.details?.insurance}
                                                        </p>
                                                    )}

                                                    {price?.details?.monthly && (
                                                        <p className="priceMileage">
                                                            <strong>Monthly:</strong> {price?.details?.monthly}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div data-lenis-prevent className={`sideModal ${activeModal === "faq" ? "active" : ""}`}>
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
                                    className={`faqBox ${activeFaq === index ? "active" : ""}`}
                                    onClick={() => handleFaqClick(index)}
                                >
                                    <div className="question">
                                        <h3>{faq?.question}</h3>
                                        <i className={`far ${activeFaq === index ? "fa-minus" : "fa-plus"}`} />
                                    </div>
                                    {activeFaq === index && (
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

            <div data-lenis-prevent className={`sideModal ${activeModal === "requirements" ? "active" : ""}`}>
                <div className="backdrop" onClick={() => handleOptionClick()} />
                <div className="modalContent">
                    <div className="modalHeader">
                        <h2>Requirements</h2>
                        <button onClick={() => handleOptionClick()}>
                            <i className="fas fa-times" />
                        </button>
                    </div>
                    <div className="modalBody">
                        <div className="reqBox">
                            <h3>
                                <i className="far fa-id-card" />
                                Documents Required
                            </h3>
                            <p>
                                You are eligible to rent a car across the emirates provided you have the below mentioned
                                documents valid with you:
                            </p>
                            <ul>
                                <li>
                                    <h4>Minimum Driver&apos;s Age</h4>
                                    <h3>{data?.minimumRequiredAge} Years</h3>
                                </li>
                                <li>
                                    <h4>Security Deposit</h4>
                                    <h3>AED {data?.securityDepositAmount}</h3>
                                </li>
                            </ul>
                            <h3>For UAE Residents</h3>
                            <ul>
                                <li className="nospace">
                                    <i className="fas fa-check" />
                                    <h4>UAE Driving License</h4>
                                </li>
                                <li className="nospace">
                                    <i className="fas fa-check" />
                                    <h4>Emirates ID (Residential Visa may be acceptable)</h4>
                                </li>
                            </ul>
                            <h3>For Tourist Visition UAE</h3>
                            <ul>
                                <li className="nospace">
                                    <i className="fas fa-check" />
                                    <h4>Passport</h4>
                                </li>
                                <li className="nospace">
                                    <i className="fas fa-check" />
                                    <h4>Visit Visa</h4>
                                </li>
                                <li className="nospace">
                                    <i className="fas fa-check" />
                                    <h4>Home Country Driving License</h4>
                                </li>
                                <li className="nospace">
                                    <i className="fas fa-check" />
                                    <h4>International Driving Permin (IDP)</h4>
                                </li>
                            </ul>
                            <p>
                                Visitors from the GCC, US, UK, Canada, Europe and certain other countries can drive with
                                their home country driving license, without the need of an IDP.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div data-lenis-prevent className={`sideModal ${activeModal === "features" ? "active" : ""}`}>
                <div className="backdrop" onClick={() => handleOptionClick()} />
                <div className="modalContent">
                    <div className="modalHeader">
                        <h2>Features & Specs</h2>
                        <button onClick={() => handleOptionClick()}>
                            <i className="fas fa-times" />
                        </button>
                    </div>
                    <div className="modalBody">
                        <div className="featureBox">
                            <h3>Car Specs</h3>
                            <ul className="carSpecs">
                                <li>
                                    <i className="far fa-car"></i>
                                    Sedan
                                </li>
                                <li>
                                    <i className="far fa-car"></i>
                                    {data?.door?.name}
                                </li>
                                <li>
                                    <i className="far fa-car"></i>
                                    {data?.seatingCapacity?.name}
                                </li>
                                <li>
                                    <i className="far fa-car"></i>
                                    Fits {data?.bagFit?.name}
                                </li>
                                <li>
                                    <i className="far fa-car"></i>
                                    Specs: {data?.spec?.name}
                                </li>
                                <li>
                                    <i className="far fa-car"></i>
                                    {data?.transmission?.name}
                                </li>
                                <li>
                                    <i className="far fa-car"></i>
                                    {data?.fuelType?.name}
                                </li>
                            </ul>

                            <h3>Car Color</h3>
                            <ul className="carSpecs">
                                <li>Exterior</li>
                                <li>
                                    <div className="colorBox" style={{ background: data?.color?.name }}></div>
                                    {data?.color?.name}
                                </li>
                                <li>Interior</li>
                                <li>
                                    <div className="colorBox" style={{ background: data?.interiorColor }}></div>
                                    {data?.interiorColor}
                                </li>
                            </ul>
                            <h3>Car Features</h3>
                            <ul className="carSpecs">
                                {data?.features &&
                                    data?.features?.map((item, index) => (
                                        <li key={index}>
                                            <i className="far fa-car"></i>
                                            {item?.name}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div data-lenis-prevent className={`sideModal ${activeModal === "supplier" ? "active" : ""}`}>
                <div className="backdrop" onClick={() => handleOptionClick()} />
                <div className="modalContent">
                    <div className="modalHeader">
                        <h2>Supplier Details</h2>
                        <button onClick={() => handleOptionClick()}>
                            <i className="fas fa-times" />
                        </button>
                    </div>
                    <div className="modalBody">
                        <div className="supBox">
                            <div className="logoSec">
                                <Link href={``} className="brand">
                                    <figure>
                                        <Image
                                            src={vendor?.companyLogo || "/images/noImage.jpg"}
                                            alt=""
                                            width={50}
                                            height={50}
                                        />
                                    </figure>
                                    {vendor?.companyName}
                                </Link>
                            </div>
                            <div className="openTime">
                                <div className="iconTime">
                                    <i className="fas fa-clock"></i>
                                    <div className="time">
                                        <h2>OPEN TIME</h2>
                                        <p>Open 24 hours</p>
                                    </div>
                                </div>
                                <i className="fas fa-arrow-right"></i>
                            </div>
                            <div className="accordions">
                                {accordions.map((accordion, accordionIndex) => (
                                    <div key={accordionIndex} className="accordionSection">
                                        <button
                                            className={`accordionTitle ${activeAccordion === accordionIndex ? "active" : ""
                                                }`}
                                            onClick={() => handleAccordionClick(accordionIndex)}
                                        >
                                            <h3>{accordion.title}</h3>
                                            <i
                                                className={`far ${activeAccordion === accordionIndex ? "fa-minus" : "fa-plus"
                                                    }`}
                                            />
                                        </button>

                                        {activeAccordion === accordionIndex && (
                                            <div className="accordionContent">
                                                {accordion.data.map((item, itemIndex) => (
                                                    <div key={itemIndex} className="accordionItem">
                                                        <div className="iconName">
                                                            {item.icon && <div className="icon">{item.icon}</div>}
                                                            {item.deliveryName && (
                                                                <div className="deliveryName">{item.deliveryName}</div>
                                                            )}
                                                        </div>
                                                        {item.location && (
                                                            <div className="location">{item.location}</div>
                                                        )}
                                                        {item.locationHeading && (
                                                            <div className="locationHeading">
                                                                {item.locationHeading}
                                                            </div>
                                                        )}
                                                        <div className="iconName">
                                                            {item.locationIcon && (
                                                                <div className="icon">{item.locationIcon}</div>
                                                            )}
                                                            {item.CompanyLocation && (
                                                                <div className="deliveryName">
                                                                    {item.CompanyLocation}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="aboutSup">
                                                            {item.aboutLogo && (
                                                                <div className="deliveryName">{item.aboutLogo}</div>
                                                            )}
                                                            {item.aboutPara && (
                                                                <p className="aboutPara">{item.aboutPara}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div data-lenis-prevent className={`sideModal ${activeModal === "description" ? "active" : ""}`}>
                <div className="backdrop" onClick={() => handleOptionClick()} />
                <div className="modalContent">
                    <div className="modalHeader">
                        <h2>Description</h2>
                        <button onClick={() => handleOptionClick()}>
                            <i className="fas fa-times" />
                        </button>
                    </div>
                    <div className="modalBody">
                        <div className="desBox">
                            <p>
                                Rent and drive this {data?.name}-model in Dubai, UAE for AED{" "}
                                {data?.carPrices?.map((item) => (item?.priceType === "daily" ? item?.price : null))}
                                /day & AED{" "}
                                {data?.carPrices?.map((item) => (item?.priceType === "monthly" ? item?.price : null))}
                                /month. Rental cost includes basic comprehensive insurance and standard mileage limit of{" "}
                                {data?.carPrices?.map((item) =>
                                    item?.priceType === "daily" ? item?.kilometers : null
                                )}{" "}
                                km/day. Security deposit of AED{" "}
                                {data?.securityDepositAmount} is required. Contact {vendor?.companyName} directly for
                                bookings and inquiries.
                            </p>
                            <h3>
                                Why hire the {product?.brand?.name} {product?.model_name}?
                            </h3>
                            <p>
                                The fun begins where the pavement ends. Cranking out 261 horsepower and riding on a
                                tough, full-length boxed ladder frame, the Xterra can handle practically anything the
                                trail throws in front of it With legendary Nissan reliability, that iconic aluminum roof
                                rack, rugged styling, and fully equipped off-road capability, Xterra is going to get you
                                and your gear where you need to go.
                            </p>
                            <div className="ratingArea">
                                <div className="rating">
                                    <div className="ratingStars">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                    <p>5 of 5 Author Rating</p>
                                </div>
                                <p>Based on 515 reviews</p>
                                <p>
                                    for {product?.brand?.name} {product?.model_name} {product?.make_year}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Fancybox
                options={{
                    Carousel: {
                        infinite: false
                    }
                }}
                setFancyboxIsActive={setFancyboxIsActive}
                fancyboxIsActive={fancyboxIsActive}
            >
                {data?.images?.map((item, index) => (
                    <a className="fancyboximages" data-fancybox="gallery" href={item?.image} key={index}>
                        <img alt="" src={item?.image} width="200" height="150" />
                    </a>
                ))}
            </Fancybox>
        </>
    );
}

export default ProductPageLayout;
