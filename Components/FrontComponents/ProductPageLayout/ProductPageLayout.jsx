"use client";
import React, { useState } from "react";
import "./ProductPageLayout.scss";
import product from "@/DummyData/SingleProduct.json";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import CarsSection from "../CarsSection/CarsSection";
import relatedCars from "@/DummyData/Products.json";
import Head from "next/head";

function ProductPageLayout() {
  const faqs = [
    {
      question: "Can I get this car delivered?",
      answer:
        "Grand Royal Rent a Car offers delivery upon request to your location (view fast delivery locations) within Dubai. However, free pick-up from their branch in Al Khabaisi is available during office hours. ",
    },
    {
      question: "Can I get this car delivered?",
      answer:
        "Grand Royal Rent a Car offers delivery upon request to your location (view fast delivery locations) within Dubai. However, free pick-up from their branch in Al Khabaisi is available during office hours. ",
    },
    {
      question: "Can I get this car delivered?",
      answer:
        "Grand Royal Rent a Car offers delivery upon request to your location (view fast delivery locations) within Dubai. However, free pick-up from their branch in Al Khabaisi is available during office hours. ",
    },
    {
      question: "Can I get this car delivered?",
      answer:
        "Grand Royal Rent a Car offers delivery upon request to your location (view fast delivery locations) within Dubai. However, free pick-up from their branch in Al Khabaisi is available during office hours. ",
    },
    {
      question: "Can I get this car delivered?",
      answer:
        "Grand Royal Rent a Car offers delivery upon request to your location (view fast delivery locations) within Dubai. However, free pick-up from their branch in Al Khabaisi is available during office hours. ",
    },
    {
      question: "Can I get this car delivered?",
      answer:
        "Grand Royal Rent a Car offers delivery upon request to your location (view fast delivery locations) within Dubai. However, free pick-up from their branch in Al Khabaisi is available during office hours. ",
    },
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
          deliveryName: <p>Branch Pick-up</p>,
        },
        {
          icon: (
            <div className="delivery-icon">
              <i className="fas fa-door-open"></i>
            </div>
          ),
          deliveryName: <p>Delivery to You</p>,
        },
        {
          icon: (
            <div className="delivery-icon">
              <i className="fas fa-plane-alt"></i>
            </div>
          ),
          deliveryName: <p>Airport Delivery</p>,
        },
        {
          locationHeading: <h3>Company Location</h3>,
          locationIcon: (
            <div className="locationIcon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
          ),
          CompanyLocation: (
            <p>
              Office #2111, B2B Tower, Al Abraj Street, Business Bay, Dubai -
              UAE
            </p>
          ),
        },
      ],
    },
    {
      title: "Branch Location(s)",
      data: [
        {
          location: (
            <div className="branchLocation">
              <span>Business Bay</span>
            </div>
          ),
        },
      ],
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
          ),
        },
      ],
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
          ),
        },
      ],
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
          ),
        },
      ],
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
          ),
        },
      ],
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
                    src={`/images/brands/${product?.brand?.image}`}
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
            "We aspire to become the leading Luxury Rent a Car company in Dubai through continuous good quality services, brand new cars and customers satisfaction focus. From any of our locations you can get an affordable rate on a range of rental cars including luxury models from leading brands like BMW, Mercedes-Benz, and Audi among others.",
        },
      ],
    },
  ];
  const prices = [
    {
      title: "Per Day",
      details: {
        price: "AED 180",
        includedMileage: "250 km",
        additionalMileage: "AED 1 / km",
        supplierNote:
          "Note: Prices may vary based on availability and demand. Contact the supplier for final rates.",
      },
    },
    {
      title: "Per Week",
      details: {
        price: "AED 1260",
        includedMileage: "1750 km",
        additionalMileage: "AED 1 / km",
        insurance: "Basic Comprehensive", // Insurance detail for Weekly
        supplierNote:
          "Note: Weekly rental rates include limited mileage and are subject to terms and conditions.",
      },
    },
    {
      title: "Per Month",
      details: {
        price: "AED 3800",
        includedMileage: "4500 km",
        additionalMileage: "AED 1 / km",
        monthly: "1 Month", // Monthly detail for Monthly
        supplierNote:
          "Note: Monthly rentals offer the best value. Contact the supplier for extended plans.",
      },
    },
  ];

  const [activeAccordion, setActiveAccordion] = useState(null); // Track active accordion
  const [activeFaq, setActiveFaq] = useState(null); // Track the active FAQ
  const [activeModal, setActiveModal] = useState(null); // Track which modal is active
  const [activePrice, setActivePrice] = useState(null);
  const currentCity = useSelector((state) => state.general.currentLocation);
  const route = usePathname().split("/");
  const activeRoute =
    route[route.length - 1]?.replaceAll("-", " ") || "Default Route";

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

  return (
    <>
      <Head>
        <title>
          {product?.brand?.name} {product?.model_name}
        </title>
        <meta
          name="description"
          content={`Rent ${product?.brand?.name} ${product?.model_name} in ${currentCity}.`}
        />
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
                {product?.brand?.name || "Unknown Brand"}{" "}
                {product?.model_name || "Model"} {product?.make_year || "Year"}
              </h1>
              <h3>
                Hire in {product?.city}: {product?.exterior_color.split(":")[0]}{" "}
                {product?.category}, {product?.passengers} Seats with{" "}
                {product?.car_features.replaceAll(",", ", ")}
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
                  <figure key={index} className="multiImage">
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
            <Link href={""} className="showAllBtn">
              <i className="fas fa-images" />
              View All Photos
            </Link>
          </div>

          <div className="detailLayout">
            <div className="details">
              <h2 className="name">
                Rent {product?.brand?.name} {product?.model_name}{" "}
                {product?.make_year}
              </h2>

              <div className="tags">
                <span className="tag">
                  {product?.category}
                  {/* <i className="fas fa-car" /> */}
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
                  {product?.car_doors}
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
                  {product?.passengers}
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
                  {product?.bags}
                </span>
              </div>

              <div className="priceCont">
                <div className="leftSide">
                  <h2>
                    {product?.daily_discount_price && (
                      <span className="cutPrice">
                        From &nbsp;&nbsp;
                        <del>AED {product?.daily_discount_price}</del>
                      </span>
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
                  By using this website, you agree to our{" "}
                  <Link href={"/terms-and-condition"}>
                    Terms and Conditions
                  </Link>{" "}
                  and <Link href={"/privacy-policy"}>Privacy Policy</Link>, and
                  disclaim <Link href={"/"}>Onetapdrive.com</Link> from any
                  incorrect information provided by car rental companies or us.
                </p>
              </div>

              <div className="description">
                <h4>
                  <i className="far fa-file-alt" />
                  Description & Highlights:
                </h4>
                <p>
                  Rent and drive this {product?.brand?.name}{" "}
                  {product?.model_name} {product?.make_year}-model in Dubai, UAE
                  for AED {product?.price_per_day}/day & AED 49999/month. Rental
                  cost includes basic comprehensive insurance and standard
                  mileage limit of {product?.per_day_mileage} km/day (AED 25 per
                  additional km applicable). Security deposit of AED 5000 is
                  required. Contact {product?.user?.company_name} directly for
                  bookings and inquiries.
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
                  <li onClick={() => handleOptionClick("supplier")}>
                    <span>Supplier Details</span>
                    <i className="fas fa-chevron-right" />
                  </li>
                  <li onClick={() => handleOptionClick("requirements")}>
                    <span>Requirements</span>
                    <i className="fas fa-chevron-right" />
                  </li>
                  {/* <li onClick={() => handleOptionClick('payment')}>
                                        <span>Payment Mode</span>
                                        <i className='fas fa-chevron-right' />
                                    </li> */}
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
                      src={`/images/product/brand.jpg`}
                      width={80}
                      height={80}
                      alt={`${product?.brand?.name}'s Image`}
                    />
                  </figure>
                  <h5>Book directly from supplier</h5>
                  <div className="btnCont">
                    <Link href={""} className="call">
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
                      <span>{product?.user?.contact}</span>
                    </Link>
                    <Link href={""} className="whatsapp">
                      <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16.584 3.79297C14.9473 2.15234 12.7676 1.25 10.4512 1.25C5.66992 1.25 1.7793 5.14062 1.7793 9.92188C1.7793 11.4492 2.17773 12.9414 2.93555 14.2578L1.70508 18.75L6.30273 17.543C7.56836 18.2344 8.99414 18.5977 10.4473 18.5977H10.4512C15.2285 18.5977 19.2051 14.707 19.2051 9.92578C19.2051 7.60938 18.2207 5.43359 16.584 3.79297ZM10.4512 17.1367C9.1543 17.1367 7.88477 16.7891 6.7793 16.1328L6.51758 15.9766L3.79102 16.6914L4.51758 14.0312L4.3457 13.7578C3.62305 12.6094 3.24414 11.2852 3.24414 9.92188C3.24414 5.94922 6.47852 2.71484 10.4551 2.71484C12.3809 2.71484 14.1895 3.46484 15.5488 4.82812C16.9082 6.19141 17.7441 8 17.7402 9.92578C17.7402 13.9023 14.4238 17.1367 10.4512 17.1367ZM14.4043 11.7383C14.1895 11.6289 13.123 11.1055 12.9238 11.0352C12.7246 10.9609 12.5801 10.9258 12.4355 11.1445C12.291 11.3633 11.877 11.8477 11.748 11.9961C11.623 12.1406 11.4941 12.1602 11.2793 12.0508C10.0059 11.4141 9.16992 10.9141 8.33008 9.47266C8.10742 9.08984 8.55273 9.11719 8.9668 8.28906C9.03711 8.14453 9.00195 8.01953 8.94727 7.91016C8.89258 7.80078 8.45898 6.73438 8.2793 6.30078C8.10352 5.87891 7.92383 5.9375 7.79102 5.92969C7.66602 5.92188 7.52148 5.92188 7.37695 5.92188C7.23242 5.92188 6.99805 5.97656 6.79883 6.19141C6.59961 6.41016 6.04102 6.93359 6.04102 8C6.04102 9.06641 6.81836 10.0977 6.92383 10.2422C7.0332 10.3867 8.45117 12.5742 10.627 13.5156C12.002 14.1094 12.541 14.1602 13.2285 14.0586C13.6465 13.9961 14.5098 13.5352 14.6895 13.0273C14.8691 12.5195 14.8691 12.0859 14.8145 11.9961C14.7637 11.8984 14.6191 11.8438 14.4043 11.7383Z" />
                      </svg>
                      <span>Whatsapp</span>
                    </Link>
                  </div>
                  <div className="priceAccordion">
                    {prices.map((price, index) => (
                      <div
                        key={index}
                        className={`priceBox ${activePrice === index ? "active" : ""
                          }`} // Add active class based on state
                        onClick={() => handlePriceClick(index)}
                      >
                        <div className="priceTitle">
                          <h3>{price.title}</h3>
                          <i
                            className={`far ${activePrice === index ? "fa-minus" : "fa-plus"
                              }`}
                          />
                        </div>

                        {activePrice === index && ( // Only show details if this section is active
                          <div className="priceDetails">
                            <p className="priceMileage">
                              <strong>Price:</strong> {price.details.price}
                            </p>
                            <p className="priceMileage">
                              <strong>Included mileage limit:</strong>{" "}
                              {price.details.includedMileage}
                            </p>
                            <p className="priceMileage">
                              <strong>Additional mileage charge:</strong>{" "}
                              {price.details.additionalMileage}
                            </p>

                            {/* Show Insurance for Weekly */}
                            {price.details.insurance && (
                              <p className="priceMileage">
                                <strong>Insurance:</strong>{" "}
                                {price.details.insurance}
                              </p>
                            )}

                            {/* Show Monthly Detail for Monthly */}
                            {price.details.monthly && (
                              <p className="priceMileage">
                                <strong>Monthly:</strong>{" "}
                                {price.details.monthly}
                              </p>
                            )}

                            <p>
                              <strong>Supplier Note:</strong>{" "}
                              {price.details.supplierNote}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="priceCont"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CarsSection secHeading={"More Like This"} limited data={relatedCars} />

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
                  className={`faqBox ${activeFaq === index ? "active" : ""}`} // Add active class based on state
                  onClick={() => handleFaqClick(index)}
                >
                  <div className="question">
                    <h3>{faq?.question}</h3>
                    <i
                      className={`far ${activeFaq === index ? "fa-minus" : "fa-plus"
                        }`}
                    />
                  </div>
                  {activeFaq === index && ( // Only show answer if this FAQ is active
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

      <div
        className={`sideModal ${activeModal === "requirements" ? "active" : ""
          }`}
      >
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
                You are eligible to rent a car across the emirates provided you
                have the below mentioned documents valid with you:
              </p>
              <ul>
                <li>
                  <h4>Minimum Driver&apos;s Age</h4>
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
                Visitors from the GCC, US, UK, Canada, Europe and certain other
                countries can drive with their home country driving license,
                without the need of an IDP.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`sideModal ${activeModal === "features" ? "active" : ""}`}
      >
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
                  <i className="far fa-car"></i>4 Doors
                </li>
                <li>
                  <i className="far fa-car"></i>
                  Fits 5 Passengers
                </li>
                <li>
                  <i className="far fa-car"></i>
                  Fits 2 Bag(s)
                </li>
                <li>
                  <i className="far fa-car"></i>
                  GCC specs: Yes
                </li>
                <li>
                  <i className="far fa-car"></i>
                  Auto Transmission
                </li>
                <li>
                  <i className="far fa-car"></i>
                  Petrol Vehicle
                </li>
              </ul>

              <h3>Car Color</h3>
              <ul className="carSpecs">
                <li>Exterior</li>
                <li>
                  <div
                    className="colorBox"
                    style={{ background: "#98989c" }}
                  ></div>
                  Matte Gray
                </li>
                <li>Interior</li>
                <li>
                  <div
                    className="colorBox"
                    style={{ background: "#e1c699" }}
                  ></div>
                  Beige
                </li>
              </ul>
              <h3>Car Features</h3>
              <ul className="carSpecs">
                <li>
                  <i className="far fa-car"></i>
                  Cruise Control
                </li>
                <li>
                  <i className="far fa-car"></i>
                  Memory Front Seats
                </li>
                <li>
                  <i className="far fa-car"></i>
                  Reverse Camera
                </li>
                <li>
                  <i className="far fa-car"></i>
                  Parking Sensors
                </li>
                <li>
                  <i className="far fa-car"></i>
                  Day-time Running Lights
                </li>
                <li>
                  <i className="far fa-car"></i>
                  Touchscreen LCD
                </li>
                <li>
                  <i className="far fa-car"></i>
                  LCD Screens
                </li>
                <li>
                  <i className="far fa-car"></i>
                  Air Suspension
                </li>
                <li>
                  <i className="far fa-car"></i>
                  Push Button Ignition
                </li>
                <li>
                  <i className="far fa-car"></i>
                  SRS Airbags
                </li>
                <li>
                  <i className="far fa-car"></i>
                  Front Air Bags
                </li>
                <li>
                  <i className="far fa-car"></i>
                  Bluetooth
                </li>
                <li>
                  <i className="far fa-car"></i>
                  Premium Audio
                </li>
                <li>
                  <i className="far fa-car"></i>
                  Rear AC
                </li>
                <li>
                  <i className="far fa-car"></i>
                  Power Mirrors
                </li>
                <li>
                  <i className="far fa-car"></i>
                  Power Windows
                </li>
                <li>
                  <i className="far fa-car"></i>
                  Seat Belt Reminder
                </li>
                <li>
                  <i className="far fa-car"></i>
                  Fabric Seats
                </li>
                <li>
                  <i className="far fa-car"></i>
                  Alloy Wheels
                </li>
                <li>
                  <i className="far fa-car"></i>
                  USB
                </li>
                <li>
                  <i className="far fa-car"></i>
                  Foldable Armrest
                </li>
                <li>
                  <i className="far fa-car"></i>
                  Fog Lights
                </li>
                <li>
                  <i className="far fa-car"></i>
                  Climate Control
                </li>
                <li>
                  <i className="far fa-car"></i>
                  FM Radio
                </li>
                <li>
                  <i className="far fa-car"></i>
                  Stereo MP3 / CD
                </li>
              </ul>
              <h3>Listed in</h3>
              <ul className="listedIn">
                <li>
                  <a href="{}">Sedan Car Rentals in Dubai</a>
                  <i className="fas fa-arrow-right"></i>
                </li>
                <li>
                  <a href="{}">Compact Car Rentals in Dubai</a>
                  <i className="fas fa-arrow-right"></i>
                </li>
                <li>
                  <a href="{}">Economy Car Rentals in Dubai</a>
                  <i className="fas fa-arrow-right"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`sideModal ${activeModal === "supplier" ? "active" : ""}`}
      >
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
                      src={`/images/brands/${product?.brand?.image}`}
                      alt=""
                      width={50}
                      height={50}
                    />
                  </figure>
                  Top Elegant Car Rental LLC
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
                        className={`far ${activeAccordion === accordionIndex
                          ? "fa-minus"
                          : "fa-plus"
                          }`}
                      />
                    </button>

                    {activeAccordion === accordionIndex && (
                      <div className="accordionContent">
                        {accordion.data.map((item, itemIndex) => (
                          <div key={itemIndex} className="accordionItem">
                            <div className="iconName">
                              {item.icon && (
                                <div className="icon">{item.icon}</div>
                              )}
                              {item.deliveryName && (
                                <div className="deliveryName">
                                  {item.deliveryName}
                                </div>
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
                                <div className="deliveryName">
                                  {item.aboutLogo}
                                </div>
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

      <div
        className={`sideModal ${activeModal === "description" ? "active" : ""}`}
      >
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
                Rent and drive this {product?.brand?.name} {product?.model_name}{" "}
                {product?.make_year} in Dubai, UAE for AED{" "}
                {product?.price_per_day}/day & AED 4899/month. Rental cost
                includes basic comprehensive insurance and standard mileage
                limit of {product?.per_day_mileage} km/day (AED 1 per additional
                km applicable). Security deposit of AED 1000 is required.
                Contact Silverstone Rent a Car directly for bookings and
                inquiries.
              </p>
              <h3>
                Why hire the {product?.brand?.name} {product?.model_name}?
              </h3>
              <p>
                The fun begins where the pavement ends. Cranking out 261
                horsepower and riding on a tough, full-length boxed ladder
                frame, the Xterra can handle practically anything the trail
                throws in front of it With legendary Nissan reliability, that
                iconic aluminum roof rack, rugged styling, and fully equipped
                off-road capability, Xterra is going to get you and your gear
                where you need to go.
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
                  for {product?.brand?.name} {product?.model_name}{" "}
                  {product?.make_year}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPageLayout;
