import Image from "next/image";
import Link from "next/link";
import React from "react";

function BrandCard(props) {
    const brand = props?.data;
    return (
        <Link href={`/brands/${brand?.slug}` || ""} className="brandCard">
            <figure>
                <Image src={brand?.image || ""} alt="" width={80} height={80} />
            </figure>
            <div className="content">
                <h3>{brand?.name || ""}</h3>
                <p>{brand?.cars || "0"} cars</p>
            </div>
        </Link>
    );
}

export default BrandCard;
