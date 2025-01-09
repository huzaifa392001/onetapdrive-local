    "use client";

    import { TrendingUp } from "lucide-react";
    import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
    import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    } from "@/components/ui/card";
    import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    } from "@/components/ui/chart";

    // Define chart data
    const chartData = [
    { month: "January", carListed: 186, carWithDriverListed: 80 },
    { month: "February", carListed: 305, carWithDriverListed: 200 },
    { month: "March",carListed: 237, carWithDriverListed: 120 },
    { month: "April", carListed: 73, carWithDriverListed: 190 },
    { month: "May", carListed: 209, carWithDriverListed: 130 },
    { month: "June", carListed: 214, carWithDriverListed: 140 }
    ];

    // Create the chart configuration object
    const chartConfig = {
        carListed: {
        label: "Car Listed",
        color: "var(--vendor-bg)",
    },
    carWithDriverListed: {
        label: "Car With Driver Listed",
        color: "var(--theme-color)",
    },
    };

    function UserChart() {
    return (
        <Card className="mx-auto">
        <CardHeader>
            <CardTitle>Car Listed - Car With Driver Listed</CardTitle>
            <CardDescription>January - June 2025</CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig} className="h-[490px] w-[600px]">
            <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={true} />
                <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Line
                dataKey="carListed"
                type="monotone"
                stroke="var(--vendor-bg)"
                strokeWidth={2}
                dot={true}
                />
                <Line
                dataKey="carWithDriverListed"
                type="monotone"
                stroke="var(--theme-color)"
                strokeWidth={2}
                dot={true}
                />
            </LineChart>
            </ChartContainer>
        </CardContent>
        </Card>
    );
    }

    export default UserChart;
