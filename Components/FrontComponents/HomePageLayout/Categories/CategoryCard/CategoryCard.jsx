import React from "react";
import "./CategoryCard.scss";
import Image from "next/image";
import Link from "next/link";

function CategoryCard(props) {
    const category = props.data;

    return (
        <Link href={`/cars/${category?.slug}`} className="categoryCard">
            <figure>
                <Image
                    src={category?.image || category?.img || ""}
                    width={200}
                    height={200}
                    quantity={100}
                    alt={`${category?.name}'s Picture`}
                />
            </figure>
            <div className="content">
                <h3>{category?.name}</h3>
                <span>{category?.cars ? `${category?.cars} Cars` : "No Cars Available"}</span>
            </div>
        </Link>
    );
}

export default React.memo(CategoryCard);
