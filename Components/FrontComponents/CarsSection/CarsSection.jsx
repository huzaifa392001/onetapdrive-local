import ProductCard from '@/Components/ProductCard/ProductCard'
import ProductCardSkeleton from '@/Components/ProductCard/ProductCardSkeleton'
import SecHeading from '@/Components/SecHeading/SecHeading'
import Link from 'next/link'
import React, { Suspense } from 'react'
import "./CarsSection.scss"

function CarsSection(props) {
    return (
        <section className="productSec">
            <div className="customContainer">
                <div className="headingCont">
                    <SecHeading heading={props?.secHeading} />
                    {!props?.limited && (
                        <Link href={""} className='themeBtn'>
                            View All
                        </Link>
                    )}
                </div>
                <div className="prodRow col4">
                    {props?.data?.map((product, index) => (
                        <Suspense key={index} fallback={<ProductCardSkeleton />}>
                            <ProductCard featured={props?.isFeatured} className={`${props?.isFeatured ? "featured" : ""}`} data={product} />
                        </Suspense>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CarsSection