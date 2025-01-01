'use client'
import React, { useEffect } from 'react'
import SearchBar from './SearchBar/SearchBar'
import Advertisement from './Advertisement/Advertisement'
import BreadCrumb from '../BreadCrumb/BreadCrumb'
import { useSelector } from 'react-redux'
import { usePathname } from 'next/navigation'
import FilteredCars from '../FilteredCars/FilteredCars'

function CarsPageLayout() {
    const currentCity = useSelector((state) => state.general.currentLocation)
    const route = usePathname().split('/');
    const activeRoute = route[route.length - 1];
    const categories = useSelector((state) => state.general.categories)


    return (
        <section className="productSec">
            <SearchBar />
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
                        <div class="categoryDrawer">
                            {categories?.map((item, index) => (
                                <div class="categoryTab" key={index}>
                                    <span>
                                        {item?.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CarsPageLayout