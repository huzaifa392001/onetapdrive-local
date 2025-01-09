import ProductCard from '@/components/ProductCard/ProductCard'
import ProductCardSkeleton from '@/components/ProductCard/ProductCardSkeleton'
import SecHeading from '@/components/SecHeading/SecHeading'
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