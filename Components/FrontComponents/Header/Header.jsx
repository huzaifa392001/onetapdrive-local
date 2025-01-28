'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import './Header.scss'
import Link from 'next/link'
import brandsData from '@/DummyData/brands.json'
import categoryData from "@/DummyData/Categories.json"
import { useSelector } from 'react-redux'
import { GeneralServices } from '@/Services/FrontServices/GeneralServices'
import { store } from '@/Redux/Store'
import { SET_USER_MODAL_STATUS } from '@/Redux/Slices/General'

function Header() {
    const [windowWidth, setWindowWidth] = useState(0);
    const currentCity = useSelector((state) => state.general.currentLocation)
    const [navShow, setNavShow] = useState('');
    const [dropdownPosition, setDropdownPosition] = useState(0); // For dynamic left position
    const rentACarRef = useRef(null); // Reference for the Rent a Car menu item
    const [selectedLocation, setSelectedLocation] = useState(currentCity); // Default location
    const isUser = useSelector((state) => state.auth.isUser)

    const handleMouseEnter = (type) => {
        if (type === 'cat') {
        }
        setNavShow(type);
    };

    const handleMouseLeave = () => {
        setNavShow('');
    };

    const handleLocationSelect = (location) => {
        setSelectedLocation(location); // Update selected location
        GeneralServices.setLocation(location)
        setNavShow(''); // Close the dropdown
    };

    useEffect(() => {
        if (rentACarRef.current) {
            const rect = rentACarRef.current.getBoundingClientRect(); // Get the position of Rent a Car
            const dropdown = document.querySelector('.categoryDropdown'); // Select the dropdown
            const dropdownWidth = dropdown ? dropdown.offsetWidth : 0; // Dynamically get the dropdown's width
            const screenWidth = window.innerWidth;

            // Adjust position to prevent overflow
            const position = rect.left + dropdownWidth > screenWidth
                ? screenWidth - dropdownWidth - 10 // Ensure it stays within bounds
                : rect.left;

            setDropdownPosition(position);
        }
    }, [navShow]); // Recalculate if dropdown visibility changes

    const handleModalVisible = () => {
        store.dispatch(SET_USER_MODAL_STATUS(true))
    }

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth);
        });
    })

    return (
        <>
            {windowWidth > 768 ?
                (
                    <div
                        className={`menuWrapper`}
                        onMouseLeave={handleMouseLeave} // Hide dropdown when mouse leaves menuWrapper
                    >
                        <header>
                            <div className="topHeader">
                                <div className="headerContainer">
                                    <div className="headerRow">
                                        <div className="leftNav">
                                            <div className="location"
                                                onMouseEnter={() => handleMouseEnter('location')}
                                            >
                                                <div className="placeHolder">
                                                    {/* <Image src={"/images/uae-flag.png"} width={30} height={15} alt="UAE's Flag" /> */}
                                                    <i className="fas fa-map-marker-alt mapMarker" />
                                                    <h4>{selectedLocation}</h4> {/* Display selected location */}
                                                    <i className="fas fa-chevron-down" />
                                                </div>

                                                <div className={`dropdown ${navShow === 'location' ? 'navShow' : ''}`}>
                                                    <ul>
                                                        {['Dubai', 'Abu Dhabi', 'Fujairah', 'Ajman', 'Al Ain', 'Sharjah', 'Ras Al Khaimah', 'Umm Al Quwain'].map((location) => (
                                                            <li key={location} className={selectedLocation === location ? 'active' : ''} >
                                                                <button onClick={() => handleLocationSelect(location)}>
                                                                    {location} {selectedLocation === location && <i className="fas fa-check" />}
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rightNav">
                                            {!isUser && (
                                                <button onClick={handleModalVisible} className="login">
                                                    <i className="fas fa-user" />
                                                    <span>Log In / Signup</span>
                                                </button>
                                            )}
                                            {isUser && (
                                                <Link href={"/user/dashboard"} className="userMenu">
                                                    <h5>Current user</h5>
                                                    <i className="fas fa-chevron-right" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="headerContainer">
                                <nav>
                                    <figure className="logoCont">
                                        <Link href={"/"} ><Image src={'/images/logo.webp'} width={250} height={50} alt="OneTap Logo" /></Link>
                                    </figure>
                                    <div className="navItems">
                                        <ul>
                                            <li
                                                onMouseEnter={() => handleMouseEnter('cat')}
                                                ref={rentACarRef} // Attach the ref to Rent a Car
                                            >
                                                <Link href={"/cars/all"}>
                                                    <i className="fas fa-car" />
                                                    Rent a Car <i className="fas fa-chevron-down"></i>
                                                </Link>
                                            </li>
                                            <li onMouseEnter={() => handleMouseEnter('carBrands')}>
                                                <Link href={"/brands"}>
                                                    <i className="fas fa-star" />
                                                    Car Brands <i className="fas fa-chevron-down"></i>
                                                </Link>
                                            </li>
                                            <li onMouseEnter={() => handleMouseEnter('carsWithDriver')}>
                                                <Link href={""}>
                                                    <i className="fas fa-car" />
                                                    Cars with Driver <i className="fas fa-chevron-right" />
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* <div className="searchBarCont">
                            <SearchBar />
                        </div> */}
                                </nav>
                            </div>
                        </header>
                        <div className={`brandsDropdown ${navShow === 'carBrands' ? 'navShow' : ''}`}>
                            <div className="brandsCont">
                                {brandsData &&
                                    brandsData.map((brand, index) => (
                                        <Link href={`/cars/${brand?.url}`} className="brandCont" key={index}>
                                            <figure>
                                                <Image src={brand?.img} width={50} height={50} alt="" />
                                            </figure>
                                            <h6>{brand?.name}</h6>
                                        </Link>
                                    ))}
                            </div>
                        </div>
                        <div
                            className={`categoryDropdown ${navShow === 'cat' ? 'navShow' : ''}`}
                            style={{ left: `${dropdownPosition}px` }} // Set dynamic left position
                        >
                            <div className="catCont">
                                <div className="catRow">
                                    <div className="catCol">
                                        <h4>Popular Categories</h4>
                                        <ul>
                                            <li>
                                                <Link href={"/cars/economy"}>
                                                    <span>Economy Cars</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={"/cars/luxury"}>
                                                    <span>Luxury Car Rental Dubai</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={"/cars/sports"}>
                                                    <span>Sports Car Rental Dubai</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={"/cars/special"}>
                                                    <span>Special Edition</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={"/cars/muscle"}>
                                                    <span>Muscle Cars</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={"/cars/electric"}>
                                                    <span>Electric Cars</span>
                                                </Link>
                                            </li>
                                        </ul>
                                        <h4>Others</h4>
                                        <ul>
                                            <li>
                                                <Link href={"/list-your-rental-cars"}>
                                                    <span>List your cars</span>
                                                </Link>
                                            </li>
                                            {/* <li>
                                    <Link href={""}>
                                        <span>Directory</span>
                                    </Link>
                                </li> */}
                                        </ul>
                                    </div>
                                    <div className="catCol">
                                        <h4>Category</h4>
                                        <ul>

                                            {categoryData?.map((item, index) => (
                                                <li key={index}>
                                                    <Link href={`/cars/${item?.url}`}>{item?.name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                :
                (
                    <>
                        <div className="headerMenu">
                            <header>
                                <div className="headerRow">
                                    <div className="location"
                                        onClick={() => handleMouseEnter('location')}
                                    >
                                        <div className="placeHolder">
                                            {/* <Image src={"/images/uae-flag.png"} width={30} height={15} alt="UAE's Flag" /> */}
                                            <i className="fas fa-map-marker-alt mapMarker" />
                                            <h4>{selectedLocation}</h4> {/* Display selected location */}
                                        </div>
                                    </div>
                                    <figure className="logoCont">
                                        <Link href={"/"} ><Image src={'/images/logo.webp'} width={250} height={50} alt="OneTap Logo" /></Link>
                                    </figure>
                                    <div className="menu">
                                        <button onClick={() => handleMouseEnter('menu')}>
                                            <i className="fas fa-bars" />
                                        </button>
                                    </div>
                                </div>
                            </header>
                            <div className={`locationMenu fullMenu ${navShow === 'location' ? 'navShow' : ''}`}>
                                <div onClick={() => handleMouseLeave()} className="backDropBg" />
                                <div className="menuCont">
                                    <button onClick={() => handleMouseLeave('')} className="closeBtn">
                                        <i className="fas fa-times" />
                                    </button>
                                    <ul>
                                        {['Dubai', 'Abu Dhabi', 'Fujairah', 'Ajman', 'Al Ain', 'Sharjah', 'Ras Al Khaimah', 'Umm Al Quwain'].map((location) => (
                                            <li key={location}>
                                                <button onClick={() => handleLocationSelect(location)} className={selectedLocation === location ? 'active' : ''}>
                                                    {location} {selectedLocation === location && <i className="fas fa-check" />}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className={`locationMenu fullMenu ${navShow === 'menu' ? 'navShow' : ''}`}>
                                <div onClick={() => handleMouseLeave()} className="backDropBg" />
                                <div className="menuCont">
                                    <button onClick={() => handleMouseLeave('')} className="closeBtn">
                                        <i className="fas fa-times" />
                                    </button>
                                    <ul>
                                        <li>
                                            <Link href={"/cars/all"}>Home</Link>
                                        </li>
                                        <li>
                                            <button onClick={() => handleMouseEnter('cat')}>
                                                Rent A Car
                                                <i className="fas fa-caret-right" />
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleMouseEnter('brands')}>
                                                Car Brands
                                                <i className="fas fa-caret-right" />
                                            </button>
                                        </li>
                                        <li>
                                            <Link href={"/cars/all"}>Cars with Driver</Link>
                                        </li>
                                        <li>
                                            <Link href={"/cars/all"}>About Us</Link>
                                        </li>
                                        <li>
                                            <Link href={"/cars/all"}>Blogs</Link>
                                        </li>
                                        <li>
                                            <Link href={"/cars/all"}>FAQs</Link>
                                        </li>
                                        <li>
                                            <Link href={"/cars/all"}>Contact Us</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={`locationMenu fullMenu ${navShow === 'cat' ? 'navShow' : ''}`}>
                                <div onClick={() => handleMouseLeave()} className="backDropBg" />
                                <div className="menuCont">
                                    <button onClick={() => handleMouseLeave('')} className="closeBtn">
                                        <i className="fas fa-times" />
                                    </button>
                                    <h4>Popular Categories</h4>
                                    <ul>
                                        <li>
                                            <Link href={"/cars/economy"}>
                                                <span>Economy Cars</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={"/cars/luxury"}>
                                                <span>Luxury Car Rental Dubai</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={"/cars/sports"}>
                                                <span>Sports Car Rental Dubai</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={"/cars/special"}>
                                                <span>Special Edition</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={"/cars/muscle"}>
                                                <span>Muscle Cars</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={"/cars/electric"}>
                                                <span>Electric Cars</span>
                                            </Link>
                                        </li>
                                    </ul>
                                    <h4>Others</h4>
                                    <ul>
                                        <li>
                                            <Link href={"/list-your-rental-cars"}>
                                                <span>List your cars</span>
                                            </Link>
                                        </li>
                                        {/* <li>
                                    <Link href={""}>
                                        <span>Directory</span>
                                    </Link>
                                </li> */}
                                    </ul>
                                    <h4>Categories</h4>
                                    <ul>
                                        {categoryData?.map((item, index) => (
                                            <li key={index}>
                                                <Link href={`/cars/${item?.url}`}>{item?.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className={`locationMenu fullMenu ${navShow === 'brands' ? 'navShow' : ''}`}>
                                <div onClick={() => handleMouseLeave()} className="backDropBg" />
                                <div className="menuCont">
                                    <button onClick={() => handleMouseLeave('')} className="closeBtn">
                                        <i className="fas fa-times" />
                                    </button>
                                    <ul className='brands'>
                                        {brandsData &&
                                            brandsData.map((brand, index) => (
                                                <li>
                                                    <Link href={`/cars/${brand?.url}`} className="brandCont" key={index}>
                                                        <h6>{brand?.name}</h6>
                                                        <figure>
                                                            <Image src={brand?.img} width={50} height={50} alt="" />
                                                        </figure>
                                                    </Link>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
}

export default React.memo(Header);
