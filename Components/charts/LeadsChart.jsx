"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

function LeadsChart({ title = "Leads", description = "", data = [] }) {
    if (!data || data.length === 0) {
        return <div className="text-center py-10">No leads data available.</div>;
    }

    const options = {
        chart: {
            type: "donut",
        },
        labels: data.map((d) => d.label),
        legend: {
            position: "bottom",
        },
        states: {
            hover: {
                filter: {
                    type: "none",
                    value: 0.1
                }
            }
        },
        colors: ["var(--vendor-bg)", "var(--theme-color)"],
        dataLabels: {
            enabled: true,
            formatter: (val) => `${val.toFixed(1)}%`,
        },
        tooltip: {
            y: {
                formatter: (val) => `${val} Leads`,
            },
        },
    };

    const series = data.map((d) => d.value);

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ReactApexChart options={options} series={series} type="donut" height={300} />
            </CardContent>
        </Card>
    );
}

export default LeadsChart;
