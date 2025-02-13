import React, { useEffect, useState } from "react";
import "./Footer.scss";
import Image from "next/image";
import Link from "next/link";

function Footer() {
    const [windowWidth, setWindowWidth] = useState(0);
    const pageLinks = [
        {
            name: "Dubai car Rental FAQs",
            url: "/faqs",
        },
        {
            name: "Car Rental Blogs",
            url: "/blogs",
        },
        {
            name: "List your Car Rental",
            url: "/",
        },
        {
            name: "Rent by Brand",
            url: "/brands",
        },
        {
            name: "Car with Driver",
            url: "/",
        },
        {
            name: "Car Rental App",
            url: "/",
        },
        {
            name: "About Us",
            url: "/about-us",
        },
        {
            name: "Terms & Conditions",
            url: "/terms-and-conditions",
        },
        {
            name: "Privacy Policy",
            url: "/privacy-policy",
        },
        {
            name: "Terms of Use",
            url: "/terms-of-use",
        },
        {
            name: "Contact Us",
            url: "/contact",
        },
    ];

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth);
        });

        return () => {
            window.removeEventListener("resize", () => {
                setWindowWidth(window.innerWidth);
            }); // cleanup this event
        };
    })

    if (windowWidth > 768) {
        return (
            <footer className="footer">
                <div
                    className="contentSec"
                    style={{ backgroundImage: "url(/images/mercedes.webp)" }}
                >
                    <div className="content">
                        <div className="customContainer">
                            <h2>Are you a Car Rental Company? Join US.</h2>
                            <h4>
                                List your cars with the UAE&apos;s Biggest Car Rental & Learning
                                Marketplace Today!
                            </h4>
                            <button className="themeBtn">Sign up now</button>
                        </div>
                    </div>
                </div>
                <div className="footerSec">
                    <div className="footerContainer">
                        <div className="footerRow">
                            <div className="footerCol col3">
                                <div className="logoCont">
                                    <figure>
                                        <Image
                                            src={"/images/logo.webp"}
                                            width={250}
                                            height={50}
                                            alt="OneTap Logo"
                                        />
                                    </figure>
                                    <p>
                                        Find the best deals for budget and luxury / sports car
                                        rentals, chauffeur service and driver on hire service.
                                        Headquartered in Dubai, our services are available in select
                                        cities across the globe.
                                    </p>
                                </div>
                            </div>
                            <div className="footerCol col4">
                                <ul className="footerList">
                                    {pageLinks?.map((item, index) => (
                                        <li key={index}>
                                            <Link href={item?.url}>{item?.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="footerCol col2">
                                <h4>For Inquiries And Support</h4>
                                <ul className="footerList">
                                    <li>
                                        <Link href={""}>+971581355884</Link>
                                    </li>
                                    <li>
                                        <Link href={""}>info@onetapdrive.com</Link>
                                    </li>
                                </ul>
                                <h4>For Car with Driver</h4>
                                <ul className="footerList">
                                    <li>
                                        <Link href={""}>+971581355884</Link>
                                    </li>
                                </ul>
                                <h4>Advertise With Us</h4>
                                <ul className="footerList">
                                    <li>
                                        <Link href={""}>+971581355884</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="footerCol col3 footerAddress">
                                <h4>Address</h4>
                                <ul className="footerList full">
                                    <li>
                                        <Link href={"https://maps.app.goo.gl/PFwCjgdcumoXxqFW9"}>
                                            Dusseldorf Business, Point # 1, Al Barsha Road, Al Barsha,
                                            Al Barsha 1 - Dubai
                                        </Link>
                                    </li>
                                </ul>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14450.498274067922!2d55.205055!3d25.114567!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6beabf615ab5%3A0x3d0dcf9b883dad4b!2sDusseldorf%20Business%20Point!5e0!3m2!1sen!2sus!4v1735042327336!5m2!1sen!2sus"
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
    else {
        return
    }
}

export default Footer;
