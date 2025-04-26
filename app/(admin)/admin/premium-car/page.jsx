"use client";
import React, { useState, useEffect } from "react";
import AdminDataTable from "@/Components/AdminComponents/AdminTable/adminTable";
import SecHeading from "@/Components/SecHeading/SecHeading";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getAllVendors, getPremiumCar } from "@/Services/AdminServices/AdminServices";
import Loading from "@/Components/Loading/Loading";
import { getCategories } from "@/Services/FrontServices/GeneralServices";
import "./index.scss";

function Page() {
    const [premiumData, setPremiumData] = useState([]);
    const [filters, setFilters] = useState({
        premium: "",
        vendorId: "",
        categoryId: ""
    });

    const { data: premiumResponse, isPending, refetch } = useQuery({
        queryKey: ["premium", filters],
        queryFn: () => getPremiumCar(filters),
        enabled: true,
    });

    const { data: vendorsApiData } = useQuery({
        queryKey: ["vendors"],
        queryFn: getAllVendors,
    });

    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const handleFilterChange = (e, filterType) => {
        const value = e.target.value;
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    useEffect(() => {
        if (premiumResponse) {
            const transformed = premiumResponse?.data?.carDetails?.map((item, index) => ({
                id: item.id || index,
                name: item?.name,
                company_name: item?.user?.vendorProfile?.companyName,
                category: item?.category?.name,
                premium: item?.isPremium
            }));
            setPremiumData(transformed);
        }
    }, [premiumResponse]);

    if (isPending) return <Loading />;

    return (
        <>
            <div className="headingCont">
                <SecHeading heading="Premium Car" />
                <div className="filterPremium">
                    <div className="inputCont">
                        <select
                            onChange={(e) => handleFilterChange(e, 'premium')}
                            value={filters.premium}
                            className="themeSelect"
                        >
                            <option value="">Select Premium</option>
                            <option value="true">Premium</option>
                        </select>
                    </div>
                    <div className="inputCont">
                        <select
                            onChange={(e) => handleFilterChange(e, 'vendorId')}
                            value={filters.vendorId}
                            className="themeSelect"
                        >
                            <option value="">Select Vendor</option>
                            {vendorsApiData?.data?.map((item) => (
                                <option key={item.userId} value={item.userId}>
                                    {item.companyName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="inputCont">
                        <select
                            onChange={(e) => handleFilterChange(e, 'categoryId')}
                            value={filters.categoryId}
                            className="themeSelect"
                        >
                            <option value="">Select Category</option>
                            {categories?.data?.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <AdminDataTable data={premiumData} refetchData={refetch} premiumAction={true} />
        </>
    );
}

export default Page;
