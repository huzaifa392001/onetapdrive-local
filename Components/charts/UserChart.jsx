"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import ReactApexChart from "react-apexcharts";

function UserChart({ title, description, data = [] }) {

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
            categories: data.map((d) => d.month.slice(0, 3)),
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
            data: data.map((d) => d.vendors)
        },
        {
            name: "Users",
            data: data.map((d) => d.users)
        }
    ];
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ReactApexChart options={options} series={series} type="bar" height={300} />
            </CardContent>
        </Card>
    );
}

export default UserChart;
