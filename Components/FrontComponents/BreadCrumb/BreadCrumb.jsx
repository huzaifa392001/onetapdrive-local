import Link from "next/link";
import React, { useEffect } from "react";

function BreadCrumb(props) {
    const states = props?.route;
    return (
        <div className="breadCrumb">
            <ul>
                <li>
                    <Link href={"/"}>Home</Link>
                </li>
                {props?.city && (
                    <li>
                        <Link href={`/cars/${props?.city}`}>{props?.city}</Link>
                    </li>
                )}
                {props?.brand && (
                    <li>
                        <Link href={`/cars/${props?.brand}`}>{props?.brand}</Link>
                    </li>
                )}
                {props?.model && (
                    <li>
                        <Link href={`/cars/${props?.model}`}>{props?.model}</Link>
                    </li>
                )}
                {states?.map((state, index) => {
                    const isLast = index === states.length - 1;
                    return (
                        <>
                            {isLast ? (
                                <li key={index}>{state}</li>
                            ) : (
                                <li key={index}>
                                    <Link href={`/cars/${state}`}>{state}</Link>
                                </li>
                            )}
                        </>
                    );
                })}
                {/* {props?.brand && (
                    <li>
                        <Link href={`/cars/${props?.brand}`}>
                            {props?.brand}
                        </Link>
                    </li>
                )}
                {props?.route && (
                    <li>
                        {props?.route.replace("-", " ")}
                    </li>
                )}
                {props?.model && (
                    <li>
                        {props?.model.replace("-", " ")}
                    </li>
                )} */}
            </ul>
        </div>
    );
}

export default React.memo(BreadCrumb);
