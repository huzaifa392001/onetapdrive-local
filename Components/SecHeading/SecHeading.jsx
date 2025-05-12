"use client";
import React from 'react'
import "./SecHeading.scss"

function SecHeading(props) {
    return (
        <>
            <h2 className={`secHeading ${props.className}`}>{props?.heading}</h2>
            {props?.description && (
                <p
                    className={`secHeadingDescription ${props?.descriptionClassname}`}
                    dangerouslySetInnerHTML={{ __html: props?.description }}
                />
            )}
        </>
    )
}

export default SecHeading
