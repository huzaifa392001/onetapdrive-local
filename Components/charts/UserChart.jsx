"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const chartData = [
    { month: "January", vendors: 186, users: 80 },
    { month: "February", vendors: 305, users: 200 },
    { month: "March", vendors: 237, users: 120 },
    { month: "April", vendors: 73, users: 190 },
    { month: "May", vendors: 209, users: 130 },
    { month: "June", vendors: 214, users: 140 }
];

const options = {
    chart: {
        type: "bar",
        toolbar: { show: false }
    },
    plotOptions: {
        bar: {
            borderRadius: 4,
            columnWidth: "40%"
        }
    },
    states: {
        hover: {
            filter: {
                type: "none",
                value: 0.1
            }
        }
    },
    dataLabels: {
        enabled: true,
        position: "top",
        style: {
            fontSize: "12px"
        }
    },
    xaxis: {
        categories: chartData.map((d) => d.month.slice(0, 3)),
        axisBorder: { show: false },
        axisTicks: { show: false }
    },
    colors: ["var(--vendor-bg)", "var(--theme-color)"],
    legend: {
        position: "top",
        horizontalAlign: "left"
    },
    tooltip: {
        shared: true,
        intersect: false
    }
};

const series = [
    {
        name: "Vendors",
        data: chartData.map((d) => d.vendors)
    },
    {
        name: "Users",
        data: chartData.map((d) => d.users)
    }
];

function UserChart({ title = "vendor - User", description="How many users and vendor" }) {
    return (
        <Card className="w-[100%] mx-auto">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ReactApexChart options={options} series={series} type="bar" height={500} />
            </CardContent>
        </Card>
    );
}

export default UserChart;
