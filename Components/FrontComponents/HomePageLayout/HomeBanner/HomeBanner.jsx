import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import "./HomeBanner.scss"
import Link from 'next/link'

function HomeBanner(props) {
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth);  // Update the windowWidth when the window is resized
        });
        return () => {
            window.removeEventListener("resize", () => {
                setWindowWidth(window.innerWidth);  // Update the windowWidth when the window is resized
            });
        }
    })

    if (windowWidth > 768) {
        return (
            <section className='mainSec'>
                <figure>
                    <Image quality={100} loading='eager' src={'/images/hero_bg.jpg'} alt='Home Banner' width={1922} height={450} />
                </figure>
                <div className="content">
                    <h1>
                        {`UAE's Fastest growing`}
                        <span>
                            Rent a car marketplace
                        </span>
                    </h1>
                    <Link href={""} className='themeBtn'>
                        Book now
                    </Link>
                </div>
            </section>
        )
    }
}

export default React.memo(HomeBanner)