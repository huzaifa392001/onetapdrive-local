import React, { useEffect, useState } from "react";
import "./VendorHeader.scss";
import Link from "next/link";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { vendorLogout } from "@/Services/AuthService/AuthService";
import { useSelector } from "react-redux";

function VendorHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector((state) => state.auth.userDetails);

    const logoutMutation = useMutation({
        mutationFn: vendorLogout,
        onSuccess: () => {
            toast.success("Logout Successfully");
        }
    });

    useEffect(() => {
        console.log("user=> ", user);
    }, [user]);

    const handleLogout = () => {
        vendorLogout();
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };
    return (
        <div className="vendorHeader">
            <figure className="logoCont">
                <Image src={"/images/logo.webp"} width={250} height={50} alt="OneTap Logo" />
            </figure>
            <div className="customDropdown">
                <button type="button" onClick={toggleDropdown} className="dropdownButton">
                    <Image src={"/images/logo.webp"} width={35} height={35} alt="Company Logo"></Image>
                    Drift Car Rental
                    <i className="fas fa-chevron-down"></i>
                </button>

                {isOpen && (
                    <div className="dropdownMenu">
                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <li>
                                <Link href={""} onClick={closeDropdown}>
                                    <i className="fa fa-user"></i>
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleLogout}>
                                    <i className="fas fa-sign-out-alt"></i>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default VendorHeader;
