"use client";
import React, { memo, useEffect, useState, useCallback, Suspense } from "react";
import Lenis from "lenis";
import { useSelector } from "react-redux";
import { store } from "@/Redux/Store";
import { SET_IS_USER } from "@/Redux/Slices/Auth";
import Loading from "@/app/(home)/loading";
import Footer from "@/Components/FrontComponents/Footer/Footer";
import Header from "@/Components/FrontComponents/Header/Header";
import Link from "next/link";
import "./UserWrapper.scss";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { userLogout } from "@/Services/AuthService/AuthService";
import { toast } from "react-toastify";

function UserWrapper({ children }) {
    const [lenis, setLenis] = useState(null);
    const router = useRouter();
    const isUser = useSelector((state) => state.auth.isUser);

    const lenisSetup = useCallback(() => {
        const lenisInstance = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            mouseMultiplier: 1
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
    }, []);

    const scrollToTop = useCallback(() => {
        if (lenis) {
            lenis.scrollTo(0);
        }
    }, [lenis]);

    useEffect(() => {
        if (!isUser) {
            router.push("/");
        }
        lenisSetup();
    }, [isUser, lenisSetup]);

    useEffect(() => {
        const handleRouteChangeComplete = () => {
            scrollToTop();
        };

        router.events?.on?.("routeChangeComplete", handleRouteChangeComplete);

        return () => {
            router.events?.off?.("routeChangeComplete", handleRouteChangeComplete);
        };
    }, [scrollToTop]);

    const logoutMutation = useMutation({
        mutationFn: userLogout,
        onSuccess: () => {
            toast.success("User Logout Successfully");
            router.push("/");
        }
    });

    return (
        <>
            {isUser && (
                <main className="userWrapper">
                    <Header />
                    <div className="customContainer">
                        <div className="innerWrap">
                            <div className="sidebar">
                                <ul>
                                    <li>
                                        <Link href={"/user/dashboard"}>
                                            <i className="fas fa-home" />
                                            <span>Dashboard</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={"/user/guide"}>
                                            <i className="fas fa-info-circle" />
                                            <span>Quick Guides</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={"/user/profile"}>
                                            <i className="fas fa-user" />
                                            <span>My Profile</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={() => logoutMutation.mutate()}>
                                            <i className="fad fa-sign-out-alt" />
                                            <span>Logout</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div className="contentWrapper">
                                <Suspense fallback={<Loading />}>{children}</Suspense>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </main>
            )}
        </>
    );
}

export default memo(UserWrapper);
