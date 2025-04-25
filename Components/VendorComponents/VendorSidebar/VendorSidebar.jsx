import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./VendorSidebar.scss";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/Services/AuthService/AuthService";

function VendorSidebar() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const { data: vendorData } = useQuery({
        queryKey: ["vendorProfile"],
        queryFn: getCurrentUser
    });
    const pathName = usePathname();

    const toggleSubMenu = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    // Define sidebar menu items with dividers
    const menuItems = [
        { path: "/", label: "Website", icon: "fas fa-globe", target: "_blank" },
        { path: "/vendor", label: "Dashboard", icon: "fas fa-home" },
        { path: "/vendor/license", label: "Trade License", icon: "fas fa-id-badge" },
        { path: "/vendor/leads", label: "Leads Management", icon: "fas fa-file-alt" },
        { path: "/vendor/fleet", label: "My Fleet", icon: "fas fa-car" },
        // { path: "/vendor/car-with-driver", label: "My Fleet With Driver", icon: "fas fa-taxi" },
        { path: "/vendor/manage-car-offers", label: "Manage Car Offers", icon: "fas fa-percentage" },
        { path: "/vendor/profile", label: "Profile", icon: "far fa-user" },
        // {
        //     path: "",
        //     label: "Settings",
        //     icon: "fas fa-cogs",
        //     isExpandable: true,
        //     subMenu: [
        //         { path: "/vendor/profile", label: "Profile", icon: "far fa-user" },
        //         { path: "/vendor/company", label: "company", icon: "fas fa-building" },
        //         { path: "/vendor/brand", label: "brand", icon: "far fa-lock" },
        //         { path: "/vendor/notifications", label: "Notifications", icon: "far fa-bell" }
        //     ]
        // }
    ];

    return (
        <>
            {/* Toggle Button for Mobile/Tablet */}
            <button className="vendor-sidebar-toggle" onClick={toggleSidebar}>
                <i className={`fas ${isSidebarVisible ? "fa-times" : "fa-bars"}`}></i>
            </button>

            {/* Sidebar */}
            <div className={`vendor-sidebar ${isSidebarVisible ? "visible" : ""}`}>
                <ul>
                    <li className="progress">
                        <div className="data">
                            <span>Consumed Refresh</span>
                            {vendorData?.data?.user?.vendorPackageOrder?.userConsumePackageItems ? (
                                (() => {
                                    const refreshItem = vendorData?.data?.user?.vendorPackageOrder.userConsumePackageItems.find(
                                        item => item.type === "day" && item.item === "Refresh"
                                    );
                                    return (
                                        <span>
                                            {refreshItem?.used || 0} / {refreshItem?.quantity || 0}
                                        </span>
                                    );
                                })()
                            ) : (
                                <span>0 / 0</span>
                            )}
                        </div>
                        <div className="progress-bar">
                            <div className="filled" style={{
                                width: (() => {
                                    const refreshItem = vendorData?.data?.user?.vendorPackageOrder?.userConsumePackageItems?.find(
                                        item => item.type === "day" && item.item === "Refresh"
                                    );
                                    if (!refreshItem || !refreshItem.quantity) return "0%";
                                    return `${(refreshItem.used / refreshItem.quantity) * 100}%`;
                                })()
                            }} />
                        </div>
                    </li>
                    {menuItems.map((item, index) => {
                        if (item.type === "divider") {
                            return (
                                <li key={index} className="divider">
                                    <h4>{item?.label}</h4>
                                </li>
                            );
                        }

                        const vendorPath = pathName;
                        let isActive = "";
                        if (!item?.subMenu) {
                            isActive = item.path === vendorPath;
                        }

                        return item.isExpandable ? (
                            <li key={index} onClick={toggleSubMenu}>
                                <span>
                                    <i className={`${item.icon}`}></i>
                                    <span>{item.label}</span>
                                    <i className={`fal fa-angle-${isExpanded ? "down" : "right"}`} />
                                </span>
                                {isExpanded && (
                                    <div className="vendor-sub-menu expanded">
                                        <ul>
                                            {item.subMenu.map((subItem, subIndex) => {
                                                const isSubItemActive = subItem.path === vendorPath;
                                                return (
                                                    <li key={subIndex}>
                                                        <Link
                                                            className={isSubItemActive ? "active" : ""}
                                                            href={subItem.path}
                                                        >
                                                            <i className={subItem.icon}></i>
                                                            <span>{subItem.label}</span>
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ) : (
                            <li key={index}>
                                <Link href={item.path} target={item?.target || ""} className={isActive ? "active" : ""}>
                                    <i className={`${item.icon} fa-lg`}></i>
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}

export default VendorSidebar;
