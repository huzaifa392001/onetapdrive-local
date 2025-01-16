'use client'
import React, { memo, useEffect, useState, Suspense, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Lenis from 'lenis'
import "./HomeWrapper.scss"
import Loading from '@/app/(home)/loading'
import { GeneralServices } from '@/Services/FrontServices/GeneralServices'
import LoginModal from '../LoginModal/LoginModal'

function HomeWrapper({ children }) {
    const [lenis, setLenis] = useState(null)
    const router = useRouter()

    const lenisSetup = useCallback(() => {
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
    }, [])

    const scrollToTop = useCallback(() => {
        if (lenis) {
            lenis.scrollTo(0)
        }
    }, [lenis])

    useEffect(() => {
        lenisSetup()
        GeneralServices.setCategories()
        GeneralServices.setLocation()
    }, [lenisSetup])

    useEffect(() => {
        const handleRouteChangeComplete = () => {
            scrollToTop()
        }
        router.events?.on?.('routeChangeComplete', handleRouteChangeComplete)

        return () => {
            router.events?.off?.('routeChangeComplete', handleRouteChangeComplete)
        }
    }, [router, scrollToTop])

    return (
        <main className="wrapper">
            <Header />
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
            <LoginModal />
            <Footer />
        </main>
    )
}

export default memo(HomeWrapper)
