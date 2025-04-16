import Image from "next/image";
import Link from "next/link";
import React from "react";

function BrandCard(props) {
    const brand = props?.data;
    return (
        <Link href={`/brands/${brand?.brand_slug}` || ""} className="brandCard">
            <figure>
                <Image src={brand?.brand_image || ""} alt="" width={80} height={80} />
            </figure>
            <div className="content">
                <h3>{brand?.brand_name || ""}</h3>
                <p>{brand?.cars || "0"} cars</p>
            </div>
        </Link>
    );
}

export default BrandCard;
