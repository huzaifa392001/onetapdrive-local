'use client'
import React, { memo } from 'react';
import "./ProductCardSkeleton.scss";

function ProductCardSkeleton() {
    return (
        <div className="productCard loading">
            {/* Image Skeleton */}
            <figure className='imgCont'>
                <div className="skeleton skeleton-image"></div>
            </figure>

            {/* Content Skeleton */}
            <div className="content">
                {/* Title Skeleton */}
                <div className="skeleton skeleton-text title"></div>

                {/* Tags Skeleton */}
                <div className="tags">
                    <div className="skeleton skeleton-tag"></div>
                    <div className="skeleton skeleton-tag"></div>
                    <div className="skeleton skeleton-tag"></div>
                    <div className="skeleton skeleton-tag"></div>
                </div>

                {/* Divider */}
                <div className="divider"></div>

                {/* Price Section Skeleton */}
                <div className="priceCont">
                    <div className="priceBox">
                        <div className="skeleton skeleton-text small"></div>
                        <div className="skeleton skeleton-text medium"></div>
                        <div className="skeleton skeleton-text small"></div>
                    </div>
                    <div className="priceBox">
                        <div className="skeleton skeleton-text small"></div>
                        <div className="skeleton skeleton-text medium"></div>
                        <div className="skeleton skeleton-text small"></div>
                    </div>
                </div>

                {/* Divider */}
                <div className="divider"></div>

                {/* Brand Section Skeleton */}
                <div className="brandCont">
                    <div className="brand">
                        <div className="skeleton skeleton-image small"></div>
                    </div>
                    <div className="detail">
                        <ul>
                            <li>
                                <div className="skeleton skeleton-text"></div>
                            </li>
                            <li>
                                <div className="skeleton skeleton-text"></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(ProductCardSkeleton);
