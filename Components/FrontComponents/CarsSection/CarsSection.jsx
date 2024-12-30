import ProductCard from '@/Components/ProductCard/ProductCard'
import ProductCardSkeleton from '@/Components/ProductCard/ProductCardSkeleton'
import SecHeading from '@/Components/SecHeading/SecHeading'
import Link from 'next/link'
import React, { Suspense } from 'react'

function CarsSection(props) {
    return (
        <section className="productSec">
            <div className="customContainer">
                <div className="headingCont">
                    <SecHeading heading={props?.secHeading} />
                    <Link href={""} className='themeBtn'>
                        View All
                    </Link>
                </div>
                <div className="prodRow col4">
                    {props?.data?.map((product, index) => (
                        <Suspense fallback={<ProductCardSkeleton />}>
                            <ProductCard className={`${props?.isFeatured ? "featured" : ""}`} data={product} key={index} />
                        </Suspense>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CarsSection