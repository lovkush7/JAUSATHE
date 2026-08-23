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

import { useQuery } from "@tanstack/react-query"
import { api } from "../../../api/Api"

interface WeeklyRideResponse {
  Completed: number
  target: number
  progress: number
  remaining: number
}

const getTotalRides = async (): Promise<WeeklyRideResponse> => {
  const response = await api.get("/admin/weekly-rides")
  return response.data
}

const chartConfig = {
  rides: {
    label: "Rides",
    color: "#2563eb",
  },
} satisfies ChartConfig

export function WeeklyRidesChart() {
  const { data, isLoading, isError } =
    useQuery<WeeklyRideResponse>({
      queryKey: ["weekly-rides"],
      queryFn: getTotalRides,
    })

    console.log("the totalride data ",data)

  if (isLoading) {
    return (
      <Card className="flex flex-col drop-shadow-lg">
        <CardHeader className="items-center pb-0">
          <CardTitle>Weekly Rides</CardTitle>
          <CardDescription>
            This week's ride performance
          </CardDescription>
        </CardHeader>

        <CardContent className="flex items-center justify-center h-[300px]">
          Loading...
        </CardContent>
      </Card>
    )
  }

  if (isError || !data) {
    return (
      <Card className="flex flex-col drop-shadow-lg">
        <CardHeader className="items-center pb-0">
          <CardTitle>Weekly Rides</CardTitle>
          <CardDescription>
            Failed to load weekly rides
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const completed = data?.Completed
  const target = data.target
  const progress = data.progress
  const remaining = data.remaining

  // Make small percentages visible
  const visibleProgress = Math.max(progress, 5)

  const chartData = [
    {
      rides: completed,
      fill: "#2563eb",
    },
  ]

  return (
    <Card className="flex flex-col drop-shadow-lg">

      {/* Header */}
      <CardHeader className="items-center pb-0">
        <CardTitle>Weekly Rides</CardTitle>

        <CardDescription>
          This week's ride performance
        </CardDescription>
      </CardHeader>

      {/* Chart */}
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={
              90 - (visibleProgress * 360) / 100
            }
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
                          {completed}
                        </tspan>

                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          / {target} Rides
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

      {/* Footer */}
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