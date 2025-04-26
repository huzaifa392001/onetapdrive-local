"use client";
import React, { useEffect, useState, useMemo } from "react";
import SearchBar from "./SearchBar/SearchBar";
import Advertisement from "./Advertisement/Advertisement";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import FilteredCars from "../FilteredCars/FilteredCars";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getAllCars, getBrandsCars, getCategorizedCars, getPremiumCars } from "@/Services/FrontServices/GeneralServices";
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
    const [data, setData] = useState({});
    const [premiumFilters, setPremiumFilters] = useState({
        premium: true,
        categoryId: ""
    });

    const { data: premiumCars } = useQuery({
        queryKey: ["premiumCars", premiumFilters],
        queryFn: () => getPremiumCars(activeRoute),
        enabled: activeRoute !== 'all' // Only run query when categories are loaded
    });

    useEffect(() => {
        console.log("premiumCars=>", premiumCars)
    }, [premiumCars]);

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
        queryKey: ["cars", brands ? "brand" : "category", activeRoute],
        queryFn: () =>
            activeRoute === "all"
                ? getAllCars()
                : brands
                    ? getBrandsCars({ brand: activeRoute || "" })
                    : getCategorizedCars({ category: activeRoute || "" }),
        enabled: !searched
    });

    // Function to sort car data based on sort state
    const sortCars = (cars, sortType) => {
        if (!cars || !sortType || cars.length === 0) {
            return cars;
        }

        // Create a copy of the cars array to avoid mutating the original data
        const sortedCars = [...cars];

        // Parse the sort type to determine field and direction
        let priceType, sortDirection;

        if (sortType.includes("Daily")) {
            priceType = "daily";
        } else if (sortType.includes("Weekly")) {
            priceType = "weekly";
        } else if (sortType.includes("Monthly")) {
            priceType = "monthly";
        } else {
            // If sort type is 'Featured' or not recognized, return original order
            return cars;
        }

        sortDirection = sortType.includes("High to Low") ? "desc" : "asc";

        // Sort the cars based on the determined price type and direction
        return sortedCars.sort((a, b) => {
            // Find the relevant price object for each car
            const aPrice = a.carPrices?.find(price => price.priceType === priceType);
            const bPrice = b.carPrices?.find(price => price.priceType === priceType);

            // If one car has the price type and the other doesn't, prioritize the one with the price
            if (aPrice && !bPrice) return -1; // a comes first
            if (!aPrice && bPrice) return 1;  // b comes first

            // If neither has the price type or both have it, sort by price
            if (!aPrice && !bPrice) return 0; // maintain original order if neither has the price

            // Use discounted price if available, otherwise use regular price
            const aPriceValue = aPrice?.discountedPrice || aPrice?.price || 0;
            const bPriceValue = bPrice?.discountedPrice || bPrice?.price || 0;

            // Sort based on direction
            return sortDirection === "asc"
                ? aPriceValue - bPriceValue
                : bPriceValue - aPriceValue;
        });
    };

    // Memoized sorted cars data
    const sortedCarsData = useMemo(() => {
        return sortCars(carsData?.data?.cars, sort);
    }, [carsData?.data?.cars, sort]);

    // Update data state when sortedCarsData changes
    useEffect(() => {
        if (sortedCarsData) {
            setData({ cars: sortedCarsData });
        }
    }, [sortedCarsData]);

    useEffect(() => {
        if (!searched && !brands) { // <-- dono false hone chahiye
            store.dispatch(SET_SEARCH_PARAMS({ ...store.getState().search.searchParam, category: activeRoute.replaceAll("-", " ") }));
        }
    }, [activeRoute]);

    useEffect(() => {
        if (searched) {
            console.log("searchResult=> ", searchResult)
            setData(searchResult)
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

    // Fix loading condition
    if (isPending && !searched) return <Loading />;

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
                            <FilteredCars premiumCars={premiumCars?.data} carsData={data.cars || []} premium />
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
                                    width={500} // Adjust width as needed
                                    height={500} // Adjust height as needed
                                    layout="intrinsic" // Optional: Define the layout strategy
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
