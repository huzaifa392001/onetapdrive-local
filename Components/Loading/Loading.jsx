import React from 'react'
import Image from 'next/image'
import "./Loading.scss"

function Loading() {
    return (
        <div className={`loading__screen`}>
            <Image src={"/images/logo.webp"} alt="OneTapDrive's Logo" width={681} height={111} />
        </div>
    )
}

export default React.memo(Loading)