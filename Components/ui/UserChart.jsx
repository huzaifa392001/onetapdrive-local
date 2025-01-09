"use client";

import React from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

const chartData = [
  { month: "January", vendors: 186, users: 80 },
  { month: "February", vendors: 305, users: 200 },
  { month: "March", vendors: 237, users: 120 },
  { month: "April", vendors: 73, users: 190 },
  { month: "May", vendors: 209, users: 130 },
  { month: "June", vendors: 214, users: 140 },
];

const chartConfig = {
  vendors: {
    label: "Vendors",
    color: "var(--vendor-bg)",
  },
  users: {
    label: "Users",
    color: "var(--theme-color)",
  },
};

function UserChart() {
  return (
    <Card className="w-[800px] h-[600px] mx-auto">
      <CardHeader>
        <CardTitle>Vendors - Users</CardTitle>
        <CardDescription>January - June 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <BarChart
            width={800}
            height={500}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 40,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month" 
              tickFormatter={(value) => value.slice(0, 3)}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="vendors" fill="var(--vendor-bg)" radius={4}>
              <LabelList dataKey="vendors" position="top" />
            </Bar>
            <Bar dataKey="users" fill="var(--theme-color)" radius={4}>
              <LabelList dataKey="users" position="top" />
            </Bar>
          </BarChart>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserChart;
