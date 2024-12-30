import React from 'react';
import './VendorHeading.scss';

export default function VendorHeading({ headingText }) {
  return (
    <div className="headingWrapper">
        <h1 className="vendorHeading">
            {headingText}
        </h1>
    </div>
  )
}
