"use client";
import React, { useEffect, useState, useMemo, useRef } from "react";
import SearchBar from "./SearchBar/SearchBar";
import Advertisement from "./Advertisement/Advertisement";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import FilteredCars from "../FilteredCars/FilteredCars";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getAllCars, getBrandsCars, getCategorizedCars, getEconomyCars, getPremiumCars } from "@/Services/FrontServices/GeneralServices";
import Loading from "@/Components/Loading/Loading";
import Link from "next/link";
import { store } from "@/Redux/Store";
import { SET_SEARCH_PARAMS } from "@/Redux/Slices/Search";

function CarsPageLayout({ brands, searched }) {
    const route = usePathname().split("/").filter(Boolean);
    const activeRoute = route[route.length - 1];
    const categories = useSelector((state) => state.general.categories);
    const [sort, setSort] = useState("");
    const searchResult = useSelector((state) => state.search.searchedResult);
    const [showAll, setShowAll] = useState(false);
    const [faqToggle, setFaqToggle] = useState({});
    const [data, setData] = useState({ cars: [] });
    const [premiumFilters, setPremiumFilters] = useState({
        premium: true,
        categoryId: ""
    });
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(20); // Default items per page
    const [hasMore, setHasMore] = useState(true);
    const observerTarget = useRef(null);

    const { data: premiumCars } = useQuery({
        queryKey: ["premiumCars", premiumFilters],
        queryFn: () => getPremiumCars(activeRoute),
        enabled: activeRoute !== 'all'
    });

    const toggleShowAll = () => {
        setShowAll((prev) => !prev);
    };

    const toggleFaq = (index) => {
        setFaqToggle((prevState) => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const { data: carsData, isPending } = useQuery({
        queryKey: ["cars", brands ? "brand" : "category", activeRoute, page, perPage],
        queryFn: () =>
            activeRoute === "economy-cars"
                ?
                getEconomyCars()
                : activeRoute === "all"
                    ? getAllCars({ page, perPage })
                    : brands
                        ? getBrandsCars({ brand: activeRoute || "", page, perPage })
                        : getCategorizedCars({ category: activeRoute || "", page, perPage }),
        enabled: !searched
    });

    const sortCars = (cars, sortType) => {
        if (!cars || !sortType || cars.length === 0) {
            return cars;
        }

        const sortedCars = [...cars];
        let priceType, sortDirection;

        if (sortType.includes("Daily")) {
            priceType = "daily";
        } else if (sortType.includes("Weekly")) {
            priceType = "weekly";
        } else if (sortType.includes("Monthly")) {
            priceType = "monthly";
        } else {
            return cars;
        }

        sortDirection = sortType.includes("High to Low") ? "desc" : "asc";

        return sortedCars.sort((a, b) => {
            const aPrice = a.carPrices?.find(price => price.priceType === priceType);
            const bPrice = b.carPrices?.find(price => price.priceType === priceType);

            if (aPrice && !bPrice) return -1;
            if (!aPrice && bPrice) return 1;

            if (!aPrice && !bPrice) return 0;

            const aPriceValue = aPrice?.discountedPrice || aPrice?.price || 0;
            const bPriceValue = bPrice?.discountedPrice || bPrice?.price || 0;

            return sortDirection === "asc"
                ? aPriceValue - bPriceValue
                : bPriceValue - aPriceValue;
        });
    };

    const sortedCarsData = useMemo(() => {
        return sortCars(carsData?.data?.cars, sort);
    }, [carsData?.data?.cars, sort]);

    useEffect(() => {
        if (sortedCarsData) {
            if (page === 1) {
                setData({ cars: sortedCarsData });
            } else {
                setData(prev => ({
                    cars: [...(prev.cars || []), ...sortedCarsData]
                }));
            }

            // Check if there's more data to load based on the response
            // If the API doesn't provide pagination info, we can infer it from the data length
            const currentPageItemCount = sortedCarsData?.length || 0;
            setHasMore(currentPageItemCount >= perPage);
        }
    }, [sortedCarsData, perPage, page]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isPending) {
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 0.5 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [hasMore, isPending]);

    useEffect(() => {
        if (!searched && !brands) {
            store.dispatch(SET_SEARCH_PARAMS({ ...store.getState().search.searchParam, category: activeRoute.replaceAll("-", " ") }));
        }
    }, [activeRoute]);

    useEffect(() => {
        if (searched) {
            setData(searchResult);
            setPage(1);
            setHasMore(false);
        }
    }, [searched, searchResult]);

    const getPageTitle = () => {
        if (searched || brands) {
            return "Car Rental Dubai";
        }
        return activeRoute.replaceAll("-", " ").toLowerCase() === "all"
            ? "Car Rental Dubai"
            : `${activeRoute.replaceAll("-", " ")} Car Rental`;
    };

    const getPageDescription = () => {
        if (searched || brands) {
            return "Find the best cars for rent at the best prices. Choose from a wide range of options with flexible rental plans in Dubai and across the UAE.";
        }
        return `Find the best ${activeRoute.replaceAll("-", " ").toLowerCase() === "all" ? "cars" : activeRoute.replaceAll("-", " ")} for rent at the best prices. Choose from a wide range of options with flexible rental plans in Dubai and across the UAE.`;
    };

    if (isPending && !searched && page === 1) return <Loading />;

    return (
        <>
            <section className="listingSec">
                <SearchBar sorting={setSort} />
                <div className="carsContainer">
                    <BreadCrumb route={route} />
                    <div className="productGrid">
                        <div className="filteredCars">
                            <div className="pageHeader">
                                <h1>{getPageTitle()}</h1>
                                <p>{getPageDescription()}</p>
                            </div>
                            <Advertisement />
                            <FilteredCars paginationData={carsData?.data} premiumCars={premiumCars?.data} carsData={data.cars || []} premium />
                            {hasMore && !searched && (
                                <div
                                    ref={observerTarget}
                                    style={{ height: "20px", width: "100%", margin: "20px 0" }}
                                >
                                    {isPending && page > 1 && (
                                        <div style={{ textAlign: "center" }}>
                                            <i className="fas fa-spinner fa-spin"></i> Loading more cars...
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="sider">
                            <div className="categoryDrawer">
                                <figure className="appBanner">
                                    <Image src={"/images/appBanner.jpg"} height={150} width={350} alt="App Banner" />
                                </figure>
                                <div className="categoriesDrawerCont">
                                    {(showAll ? categories : categories?.slice(0, 4))?.map((item, index) => (
                                        <Link href={`/cars/${item?.slug}`} className="categoryTab" key={index}>
                                            <span>{item?.name}</span>
                                            <i className="fas fa-caret-right" />
                                        </Link>
                                    ))}
                                    {categories?.length > 4 && (
                                        <button className="showMoreBtn" onClick={toggleShowAll}>
                                            <div className="btnWrapper">
                                                {showAll ? (
                                                    <i className="fas fa-chevron-up" />
                                                ) : (
                                                    <i className="fas fa-chevron-down" />
                                                )}
                                            </div>
                                        </button>
                                    )}
                                </div>
                            </div>
                            {[
                                {
                                    question: "How to get the Best Deal",
                                    answers: [
                                        "Compare offers from over 50 rent a car companies in the UAE, filter based on your location, budget and requirement.",
                                        "Narrow down with your preferences: car specs, mileage limit, insurance included, car features and so on.",
                                        "Short-list the best offers by the car rental provider and contact them directly via phone, WhatsApp or request a call back.",
                                        "Be sure to ask for the actual pictures and specs of the car before finalizing the deal.",
                                        "Book directly, free of markups!"
                                    ]
                                },
                                {
                                    question: "Car Rental To-Dos",
                                    answers: [
                                        "At the time of dеlivеry, check for existing dents and scratches.",
                                        "Shаrе it with the car rental соmраnу drivеr / mаnаgеr at the start.",
                                        "Аlways bеst to provide sеcuritу dероsit by сredit card as pre-authorization block.",
                                        "Your bank can shield you from unlawful charges besides the refund process.",
                                        "Be sure to sign a car rental agreement issued under the advertised company name."
                                    ]
                                }
                            ].map((faq, index) => (
                                <div className="faqCont" key={index}>
                                    <div
                                        className="question"
                                        onClick={() => toggleFaq(index)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <h4>{faq.question}</h4>
                                        <i className={`fas ${faqToggle[index] ? "fa-minus" : "fa-plus"}`} />
                                    </div>
                                    {faqToggle[index] && (
                                        <div className="answer">
                                            <ul>
                                                {faq.answers.map((answer, idx) => (
                                                    <li key={idx}>
                                                        <span className="dot" />
                                                        <span>{answer}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <figure className="rightAdd">
                                <Image
                                    src="/images/carLayout.gif"
                                    alt="Car Layout"
                                    width={500}
                                    height={500}
                                    layout="intrinsic"
                                />
                            </figure>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default CarsPageLayout;
