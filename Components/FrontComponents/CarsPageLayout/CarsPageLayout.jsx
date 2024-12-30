import React from 'react'
import SearchBar from './SearchBar/SearchBar'

function CarsPageLayout() {
    return (
        <section className="productSec">
            <SearchBar />
            <div className="customContainer"></div>
        </section>
    )
}

export default CarsPageLayout