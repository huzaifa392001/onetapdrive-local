'use client'
import React, { memo, useEffect, useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Lenis from 'lenis'
import Image from 'next/image'
import "./HomeWrapper.scss"
import Loading from '@/app/(home)/loading'
import { GeneralServices } from '@/Services/FrontServices/GeneralServices'

function LoadingPopup() {
    return (
        <div className="loading-popup">
            <Image src={'/images/logo.webp'} width={450} height={100} alt="OneTap Logo" />
        </div>
    )
}

function HomeWrapper({ children }) {
    const [lenis, setLenis] = useState(null)
    const router = useRouter()

    const lenisSetup = () => {
        const lenisInstance = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            mouseMultiplier: 1,
        })
        setLenis(lenisInstance)

        function raf(time) {
            lenisInstance.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", function (e) {
                e.preventDefault()
                lenisInstance.scrollTo(this.getAttribute("href"))
            })
        })
    }

    const scrollToTop = () => {
        if (lenis) {
            lenis.scrollTo(0)
        }
    }

    useEffect(() => {
        lenisSetup()
        GeneralServices.setCategories()
        GeneralServices.setLocation()
    }, [])

    useEffect(() => {
        const handleRouteChangeComplete = () => {
            scrollToTop()
        }
        router.events?.on?.('routeChangeComplete', handleRouteChangeComplete)

        return () => {
            router.events?.off?.('routeChangeComplete', handleRouteChangeComplete)
        }
    }, [router, lenis, scrollToTop]) // Include scrollToTop in the dependency array

    return (
        <main className="wrapper">
            <Header />
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
            <Footer />
        </main>
    )
}

export default memo(HomeWrapper)
