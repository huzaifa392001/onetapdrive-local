"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

function CarListingChart({ title = "Car listing & Car with driver listing", description = "How many cars listing", data = [] }) {
    if (!data || data.length === 0) {
        return <div className="text-center py-10">No data available.</div>;
    }

    const categories = data.map((d) => d.month.slice(0, 3));

    const series = [
        {
            name: "Car Listing",
            data: data.map((d) => d.cars),
        },
        {
            name: "Car With Driver Listing",
            data: data.map((d) => d.car_with_driver),
        },
    ];

    const options = {
        chart: {
            type: "line",
            toolbar: { show: false },
            zoom: { enabled: false },
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        colors: ["var(--vendor-bg)", "var(--theme-color)"],
        markers: {
            size: 4,
            strokeWidth: 2,
            hover: {
                size: 6,
            },
        },
        tooltip: {
            shared: true,
            intersect: false,
            theme: "light",
        },
        grid: {
            show: true,
            strokeDashArray: 3,
        },
        xaxis: {
            categories: categories,
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: {
                    fontSize: "12px",
                },
            },
        },
        legend: {
            position: "top",
            horizontalAlign: "left",
        },
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ReactApexChart options={options} series={series} type="line" height={300} />
            </CardContent>
        </Card>
    );
}

export default CarListingChart;
