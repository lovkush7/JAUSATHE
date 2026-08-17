"use client"

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart"

// Weekly ride data
const weeklyRides = {
  completed: 38,
  target: 50,
}

// Calculate progress percentage
const progress = Math.min(
  Math.round((weeklyRides.completed / weeklyRides.target) * 100),
  100
)

const remaining = Math.max(
  weeklyRides.target - weeklyRides.completed,
  0
)

const chartData = [
  {
    rides: weeklyRides.completed,
    fill:  "#2563eb" ,
  },
]

const chartConfig = {
  rides: {
    label: "Rides",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function WeeklyRidesChart() {
  return (
    <Card className="flex flex-col drop-shadow-lg ">
      <CardHeader className="items-center pb-0">
        <CardTitle>Weekly Rides</CardTitle>

        <CardDescription>
          This week's ride performance
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={90 - (progress * 360) / 100}
            innerRadius={80}
            outerRadius={90}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[90, 80]}
            />

            <RadialBar
              dataKey="rides"
              background
              cornerRadius={10}
            />

            <PolarRadiusAxis
              tick={false}
              tickLine={false}
              axisLine={false}
            >
              <Label
                content={({ viewBox }) => {
                  if (
                    viewBox &&
                    "cx" in viewBox &&
                    "cy" in viewBox
                  ) {
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
                          className="fill-foreground text-4xl font-bold"
                        >
                          {weeklyRides.completed}
                        </tspan>

                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          / {weeklyRides.target} Rides
                        </tspan>
                      </text>
                    )
                  }

                  return null
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          {progress}% of weekly target completed
          <TrendingUp className="h-4 w-4" />
        </div>

        <div className="leading-none text-muted-foreground">
          {remaining > 0
            ? `${remaining} rides remaining to reach your target`
            : "Weekly ride target completed 🎉"}
        </div>
      </CardFooter>
    </Card>
  )
}