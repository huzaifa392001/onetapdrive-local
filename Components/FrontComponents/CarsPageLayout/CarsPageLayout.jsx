'use client'
import React, { useState } from 'react'
import SearchBar from './SearchBar/SearchBar'
import Advertisement from './Advertisement/Advertisement'
import BreadCrumb from '../BreadCrumb/BreadCrumb'
import { useSelector } from 'react-redux'
import { usePathname } from 'next/navigation'
import FilteredCars from '../FilteredCars/FilteredCars'
import Image from 'next/image'

function CarsPageLayout() {
    const currentCity = useSelector((state) => state.general.currentLocation)
    const route = usePathname().split('/');
    const activeRoute = route[route.length - 1];
    const categories = useSelector((state) => state.general.categories)

    const [showAll, setShowAll] = useState(false); // State to toggle category visibility
    const [faqToggle, setFaqToggle] = useState({}); // State to toggle FAQ visibility

    const toggleShowAll = () => {
        setShowAll((prev) => !prev);
    };

    const toggleFaq = (index) => {
        setFaqToggle((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    return (
        <section className="listingSec">
            <SearchBar activeCategory={activeRoute} />
            <div className="customContainer">
                <BreadCrumb
                    city={currentCity}
                    route={activeRoute}
                />
                <div className="productGrid">
                    <div className="filteredCars">
                        <div className="pageHeader">
                            <h1>
                                Car Rental Dubai
                            </h1>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, laborum. Reiciendis possimus itaque quis officia.
                            </p>
                        </div>
                        <Advertisement />
                        <FilteredCars premium />
                    </div>
                    <div className="sider">
                        <div className="categoryDrawer">
                            <figure className='appBanner'>
                                <Image src={'/images/appBanner.jpg'} height={150} width={350} alt="App Banner" />
                            </figure>
                            <div className="categoriesDrawerCont">
                                {(showAll ? categories : categories.slice(0, 4))?.map((item, index) => (
                                    <div className="categoryTab" key={index}>
                                        <span>
                                            {item?.name}
                                        </span>
                                        <i className="fas fa-caret-right" />
                                    </div>
                                ))}
                                {categories.length > 4 && (
                                    <button
                                        className="showMoreBtn"
                                        onClick={toggleShowAll}
                                    >
                                        <div className="btnWrapper">
                                            {showAll ? <i className="fas fa-chevron-up" /> : <i className="fas fa-chevron-down" />}
                                        </div>
                                    </button>
                                )}
                            </div>
                        </div>
                        {[
                            {
                                question: 'How to get the Best Deal',
                                answers: [
                                    'Compare offers from over 50 rent a car companies in the UAE, filter based on your location, budget and requirement.',
                                    'Narrow down with your preferences: саr sрeсs, mileаgе limit, insurаnсе included, cаr features and so on.',
                                    'Short-list the bеst offеrs by the саr rеntаl рrоvidеr and соntact them directly via phone, WhatsApp or request a cаll back.',
                                    'Be sure to ask for the actual pictures and specs of the саr before finalizing the deal.',
                                    'Bооk directly, frее of markups!',
                                ],
                            },
                            {
                                question: 'Car Rental To-Dos',
                                answers: [
                                    'At the time of dеlivеry, check for existing dents and scratches.',
                                    'Shаrе it with the car rental соmраnу drivеr / mаnаgеr at the start.',
                                    'Аlways bеst to provide sеcuritу dероsit by сredit card as pre-authorization block.',
                                    'Your bank can shield you from unlawful charges besides the refund process.',
                                    'Be sure to sign a car rental agreement issued under the advertised company name.',
                                ],
                            },
                        ].map((faq, index) => (
                            <div className="faqCont" key={index}>
                                <div
                                    className="question"
                                    onClick={() => toggleFaq(index)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <h4>{faq.question}</h4>
                                    <i className={`fas ${faqToggle[index] ? 'fa-minus' : 'fa-plus'}`} />
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
                        <figure class="rightAdd">
                            <img src="/images/carLayout.gif" alt="" />
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CarsPageLayout;
