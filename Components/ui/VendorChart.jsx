"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

// Base data
const baseData = [
  { month: "september", desktop: 186 },
  { month: "october", desktop: 305 },
  { month: "november", desktop: 237 },
  { month: "december", desktop: 173 },
  { month: "january", desktop: 209 },
];

const chartConfig = {
  visitors: { label: "Visitors" },
  desktop: { label: "Desktop" },
  mobile: { label: "Mobile" },
  september: { label: "September", color: "hsl(var(--chart-1))" },
  october: { label: "October", color: "hsl(var(--chart-2))" },
  november: { label: "November", color: "hsl(var(--chart-3))" },
  december: { label: "December", color: "hsl(var(--chart-4))" },
  january: { label: "January", color: "hsl(var(--chart-5))" },
};

function VendorChart() {
  const id = "pie-interactive";
  const [activeMonth, setActiveMonth] = React.useState(baseData[0].month);

  // Update `desktopData` dynamically
  const desktopData = React.useMemo(() => {
    return baseData.map((item) => ({
      ...item,
      fill: item.month === activeMonth ? "var(--theme-color)" : "var(--vendor-bg)",
    }));
  }, [activeMonth]);

  const activeIndex = React.useMemo(
    () => desktopData.findIndex((item) => item.month === activeMonth),
    [activeMonth, desktopData]
  );

  const months = React.useMemo(() => baseData.map((item) => item.month), []);

  return (
    <Card data-chart={id} className="flex flex-col w-[700px]">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Vendors</CardTitle>
          <CardDescription>August - January 2025</CardDescription>
        </div>
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {months.map((key) => {
              const config = chartConfig[key];
              if (!config) {
                return null;
              }
              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={desktopData}
              dataKey="desktop"
              nameKey="month"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {desktopData[activeIndex].desktop.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Vendors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default VendorChart;
