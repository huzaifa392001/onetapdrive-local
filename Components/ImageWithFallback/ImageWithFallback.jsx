import React, { useState, useEffect } from 'react';
import Image from 'next/image';

function ImageWithFallback({ src, fallbackSrc = "/images/noImage.jpg", ...props }) {
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        // Set the image source when the component mounts or src changes
        setImgSrc(src);

        // Cleanup function that runs when the component unmounts
        return () => {
            // Setting to an empty string or null would effectively "release" the image
            // This helps free up memory when the component is unmounted
            setImgSrc(null);
        };
    }, [src]);


    useEffect(() => {
        return () => {
            // Setting to an empty string or null would effectively "release" the image
            // This helps free up memory when the component is unmounted
            setImgSrc(null);
        }
    },[])

    return (
        <Image
            {...props}
            src={imgSrc}
            onError={() => {
                setImgSrc(fallbackSrc);
            }}
        />
    );
}

export default ImageWithFallback;