'use client'
import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar/SearchBar'
import Advertisement from './Advertisement/Advertisement'
import BreadCrumb from '../BreadCrumb/BreadCrumb'
import { useSelector } from 'react-redux'
import { usePathname } from 'next/navigation'
import FilteredCars from '../FilteredCars/FilteredCars'
import Image from 'next/image'
import SecHeading from '@/Components/SecHeading/SecHeading'

function CarsPageLayout() {
    const currentCity = useSelector((state) => state.general.currentLocation)
    const route = usePathname().split("/").filter(Boolean);
    const activeRoute = route[route.length - 1];
    const categories = useSelector((state) => state.general.categories)

    const [showAll, setShowAll] = useState(false);
    const [faqToggle, setFaqToggle] = useState({});

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
        <>
            <section className="listingSec">
                <SearchBar activeCategory={activeRoute} />
                <div className="customContainer">
                    <BreadCrumb
                        city={currentCity}
                        route={route}
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
                                        'Narrow down with your preferences: car specs, mileage limit, insurance included, car features and so on.',
                                        'Short-list the best offers by the car rental provider and contact them directly via phone, WhatsApp or request a call back.',
                                        'Be sure to ask for the actual pictures and specs of the car before finalizing the deal.',
                                        'Book directly, free of markups!',
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
            <section className="contentSec">
                <div className="customContainer">
                    <div className="content">
                        <SecHeading heading={"Lorem Ipsum"} />
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae a reiciendis veniam consequuntur vel modi nam voluptatibus quos inventore debitis architecto, saepe at, nesciunt eum! Veritatis harum magnam, obcaecati voluptatum rem sed ab qui similique illum asperiores, quasi pariatur, voluptates in recusandae reiciendis! Commodi ab rem dolorem veniam, dignissimos quisquam reiciendis quidem. Nemo earum inventore tenetur doloremque illo quisquam beatae quasi? Nisi asperiores placeat provident, fugit sunt explicabo perferendis blanditiis distinctio animi voluptatem facere hic corporis obcaecati libero cupiditate mollitia voluptas reprehenderit eius eaque expedita ad voluptates doloremque! Fugit perspiciatis corrupti reiciendis debitis adipisci eveniet culpa beatae quaerat nisi sapiente?
                        </p>
                        <SecHeading heading={"Lorem Ipsum"} />
                        <ul>
                            <li>
                                <i className="fas fa-chevron-right" />
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, eveniet.
                            </li>
                            <li>
                                <i className="fas fa-chevron-right" />
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, eveniet.
                            </li>
                            <li>
                                <i className="fas fa-chevron-right" />
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, eveniet.
                            </li>
                            <li>
                                <i className="fas fa-chevron-right" />
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, eveniet.
                            </li>
                            <li>
                                <i className="fas fa-chevron-right" />
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, eveniet.
                            </li>
                        </ul>
                        <SecHeading heading={"Lorem Ipsum"} />
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae a reiciendis veniam consequuntur vel modi nam voluptatibus quos inventore debitis architecto, saepe at, nesciunt eum! Veritatis harum magnam, obcaecati voluptatum rem sed ab qui similique illum asperiores, quasi pariatur, voluptates in recusandae reiciendis! Commodi ab rem dolorem veniam, dignissimos quisquam reiciendis quidem. Nemo earum inventore tenetur doloremque illo quisquam beatae quasi? Nisi asperiores placeat provident, fugit sunt explicabo perferendis blanditiis distinctio animi voluptatem facere hic corporis obcaecati libero cupiditate mollitia voluptas reprehenderit eius eaque expedita ad voluptates doloremque! Fugit perspiciatis corrupti reiciendis debitis adipisci eveniet culpa beatae quaerat nisi sapiente?
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae a reiciendis veniam consequuntur vel modi nam voluptatibus quos inventore debitis architecto, saepe at, nesciunt eum! Veritatis harum magnam, obcaecati voluptatum rem sed ab qui similique illum asperiores, quasi pariatur, voluptates in recusandae reiciendis! Commodi ab rem dolorem veniam, dignissimos quisquam reiciendis quidem. Nemo earum inventore tenetur doloremque illo quisquam beatae quasi? Nisi asperiores placeat provident, fugit sunt explicabo perferendis blanditiis distinctio animi voluptatem facere hic corporis obcaecati libero cupiditate mollitia voluptas reprehenderit eius eaque expedita ad voluptates doloremque! Fugit perspiciatis corrupti reiciendis debitis adipisci eveniet culpa beatae quaerat nisi sapiente?
                        </p>
                        <ul>
                            <li>
                                <i className="fas fa-chevron-right" />
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, eveniet.
                            </li>
                            <li>
                                <i className="fas fa-chevron-right" />
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, eveniet.
                            </li>
                            <li>
                                <i className="fas fa-chevron-right" />
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, eveniet.
                            </li>
                            <li>
                                <i className="fas fa-chevron-right" />
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, eveniet.
                            </li>
                            <li>
                                <i className="fas fa-chevron-right" />
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, eveniet.
                            </li>
                        </ul>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae a reiciendis veniam consequuntur vel modi nam voluptatibus quos inventore debitis architecto, saepe at, nesciunt eum! Veritatis harum magnam, obcaecati voluptatum rem sed ab qui similique illum asperiores, quasi pariatur, voluptates in recusandae reiciendis! Commodi ab rem dolorem veniam, dignissimos quisquam reiciendis quidem. Nemo earum inventore tenetur doloremque illo quisquam beatae quasi? Nisi asperiores placeat provident, fugit sunt explicabo perferendis blanditiis distinctio animi voluptatem facere hic corporis obcaecati libero cupiditate mollitia voluptas reprehenderit eius eaque expedita ad voluptates doloremque! Fugit perspiciatis corrupti reiciendis debitis adipisci eveniet culpa beatae quaerat nisi sapiente?
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CarsPageLayout;
