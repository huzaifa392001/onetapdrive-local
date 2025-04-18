import React from "react";
import "./CategoryCard.scss";
import Image from "next/image";
import Link from "next/link";

function CategoryCard(props) {
    const category = props.data;

    return (
        <Link href={`/cars/${category?.category_slug}`} className="categoryCard">
            <figure>
                <Image
                    src={category?.category_image || category?.img || ""}
                    width={200}
                    height={200}
                    quantity={100}
                    alt={`${category?.category_name}'s Picture`}
                />
            </figure>
            <div className="content">
                <h3>{category?.category_name}</h3>
                <span>{category?.cars ? `${category?.cars} Cars` : "No Cars Available"}</span>
            </div>
        </Link>
    );
}

export default React.memo(CategoryCard);
