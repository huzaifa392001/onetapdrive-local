import ProductCard from '@/components/ProductCard/ProductCard';
import React, { Suspense } from 'react';
import productsData from "@/DummyData/Products.json";
import ProductCardSkeleton from '@/components/ProductCard/ProductCardSkeleton';
import "./FilteredCars.scss";
import FullProductCard from '@/components/FullProductCard/FullProductCard';

function FilteredCars(props) {
    return (
        <div className="filteredCars">
            {props?.premium && (
                <div className="premiumRow">
                    {productsData?.slice(0, 3).map((item, index) => (
                        <Suspense key={index} fallback={<ProductCardSkeleton />}>
                            <ProductCard premium className={'premium'} data={item} />
                        </Suspense>
                    ))}
                </div>
            )}
            <div className="totalResult">
                <p>Showing <span>1</span> - <span>20</span> of <span>1000</span> Cars</p>
            </div>
            <div className="resultRow">
                {productsData?.map((item, index) => (
                    <FullProductCard data={item} featured key={index} />
                ))}
            </div>
        </div>
    );
}

export default FilteredCars;
