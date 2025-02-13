"use client";
import React, { memo, useEffect, useState, Suspense, useCallback } from "react";
import { usePathname } from "next/navigation"; // ✅ Correct hook
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Lenis from "lenis";
import "./HomeWrapper.scss";
import Loading from "@/app/(home)/loading";
import { GeneralServices } from "@/Services/FrontServices/GeneralServices";
import LoginModal from "../LoginModal/LoginModal";

function HomeWrapper({ children }) {
    const [lenis, setLenis] = useState(null);
    const [isLenisEnabled, setIsLenisEnabled] = useState(
        typeof window !== "undefined" && window.innerWidth >= 768
    ); // ✅ Fix: Ensure window is defined
    const pathname = usePathname(); // ✅ Detect route changes

    const lenisSetup = useCallback(() => {
        if (isLenisEnabled) {
            const lenisInstance = new Lenis({
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smooth: true,
                mouseMultiplier: 1,
            });
            setLenis(lenisInstance);

            function raf(time) {
                lenisInstance.raf(time);
                requestAnimationFrame(raf);
            }

            requestAnimationFrame(raf);

            document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
                anchor.addEventListener("click", function (e) {
                    e.preventDefault();
                    lenisInstance.scrollTo(this.getAttribute("href"));
                });
            });
        }
    }, [isLenisEnabled]);

    const scrollToTop = useCallback(() => {
        if (lenis) {
            lenis.scrollTo(0);
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ Fallback for non-Lenis users
        }
    }, [lenis]);

    useEffect(() => {
        const handleResize = () => {
            const isEnabled = window.innerWidth >= 768;
            setIsLenisEnabled(isEnabled);

            if (!isEnabled && lenis) {
                lenis.destroy();
                setLenis(null);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [lenis]);

    useEffect(() => {
        if (isLenisEnabled) {
            lenisSetup();
        }
        GeneralServices.setCategories();
        GeneralServices.setLocation();
    }, [lenisSetup, isLenisEnabled]);

    useEffect(() => {
        scrollToTop(); // ✅ Scroll to top on route change
    }, [pathname, scrollToTop]);

    return (
        <main className="wrapper">
            <Header />
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <LoginModal />
            <Footer />
        </main>
    );
}

export default memo(HomeWrapper);
