import Image from 'next/image'
import React from 'react'
import "../CarsPageLayout.scss"

function Advertisement() {
    return (
        <div className="addGrid">
            <div className="adImg">
                <Image src={'/images/ads/1.jpg'} width={400} height={140} alt='' />
            </div>
            <div className="adImg">
                <Image src={'/images/ads/2.jpg'} width={400} height={140} alt='' />
            </div>
            <div className="adImg">
                <Image src={'/images/ads/3.jpg'} width={400} height={140} alt='' />
            </div>
        </div>
    )
}

export default React.memo(Advertisement)