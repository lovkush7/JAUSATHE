"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { api } from "../../../api/Api"
import { useQuery } from "@tanstack/react-query"

const chartReq = async(range:string)=>{
  const res = await api.get(`/admin/getRides`,{
    params:{
      range
    }
  })
  return res.data;
}

// const chartData = [
//   { date: "2026-08-01", rides: 12 },
//   { date: "2026-08-02", rides: 18 },
//   { date: "2026-08-03", rides: 10 },
//   { date: "2026-08-04", rides: 22 },
//   { date: "2026-08-05", rides: 16 },
//   { date: "2026-08-06", rides: 25 },
//   { date: "2026-08-07", rides: 20 },

//   { date: "2026-08-08", rides: 15 },
//   { date: "2026-08-09", rides: 21 },
//   { date: "2026-08-10", rides: 28 },
//   { date: "2026-08-11", rides: 19 },
//   { date: "2026-08-12", rides: 31 },
//   { date: "2026-08-13", rides: 24 },
//   { date: "2026-08-14", rides: 29 },

//   { date: "2026-08-15", rides: 34 },
//   { date: "2026-08-16", rides: 27 },
//   { date: "2026-08-17", rides: 30 },
// ]

// --------------------------------------------------
// Chart Config
// --------------------------------------------------

const chartConfig = {
  rides: {
    label: "Rides",
    color: "#2563eb",
  },
} satisfies ChartConfig

// --------------------------------------------------
// Component
// --------------------------------------------------

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()

  const [timeRange, setTimeRange] = React.useState("7d")

  // Mobile ma automatically 7 days
  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const {data} =  useQuery({
    queryKey: [timeRange],
    queryFn: ()=>chartReq(timeRange),
    enabled: !!timeRange
  })
 console.log("the chart data", data)
const chartData = data?.chart ?? []

const totalRides = data?.totalRides ?? 0

  // const filteredData = React.useMemo(() => {
  //   const referenceDate = new Date("2026-08-17")

  //   let daysToSubtract = 7

  //   if (timeRange === "30d") {
  //     daysToSubtract = 30
  //   }

  //   if (timeRange === "90d") {
  //     daysToSubtract = 90
  //   }

  //   const startDate = new Date(referenceDate)

  //   startDate.setDate(
  //     startDate.getDate() - daysToSubtract
  //   )

  //   return chartData.filter((item:any) => {
  //     const date = new Date(item.date)

  //     return date >= startDate
  //   })
  // }, [timeRange])

  // --------------------------------------------------
  // Total rides
  // --------------------------------------------------

  // const totalRides = filteredData.reduce(
  //   (total, item) => total + item.rides,
  //   0
  // )

  return (
    <Card className="@container/card">

      {/* ---------------- Header ---------------- */}

      <CardHeader>
        <CardTitle>Total Rides</CardTitle>

        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total rides for the selected period
          </span>

          <span className="@[540px]/card:hidden">
            Ride activity
          </span>
        </CardDescription>

        <CardAction>

          {/* Desktop Toggle */}

          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value) => {
              if (value) {
                setTimeRange(value)
              }
            }}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">
              Last 3 months
            </ToggleGroupItem>

            <ToggleGroupItem value="30d">
              Last 30 days
            </ToggleGroupItem>

            <ToggleGroupItem value="7d">
              Last 7 days
            </ToggleGroupItem>
          </ToggleGroup>

          {/* Mobile Select */}

          <Select
            value={timeRange}
            onValueChange={setTimeRange}
          >
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select ride range"
            >
              <SelectValue placeholder="Last 7 days" />
            </SelectTrigger>

            <SelectContent className="rounded-xl">

              <SelectItem
                value="90d"
                className="rounded-lg"
              >
                Last 3 months
              </SelectItem>

              <SelectItem
                value="30d"
                className="rounded-lg"
              >
                Last 30 days
              </SelectItem>

              <SelectItem
                value="7d"
                className="rounded-lg"
              >
                Last 7 days
              </SelectItem>

            </SelectContent>
          </Select>

        </CardAction>
      </CardHeader>

      {/* ---------------- Chart ---------------- */}

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">

        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >

          <AreaChart data={chartData}>

            {/* Gradient */}

            <defs>
              <linearGradient
                id="fillRides"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-rides)"
                  stopOpacity={0.8}
                />

                <stop
                  offset="95%"
                  stopColor="var(--color-rides)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            {/* Grid */}

            <CartesianGrid
              vertical={false}
            />

            {/* X Axis */}

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)

                return date.toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                  }
                )
              }}
            />

            {/* Tooltip */}

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(
                      value
                    ).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                      }
                    )
                  }}
                  formatter={(value) => [
                    `${value} rides`,
                    "Total Rides",
                  ]}
                  indicator="dot"
                />
              }
            />

            {/* Ride Area */}

            <Area
              dataKey="rides"
              type="natural"
              fill="url(#fillRides)"
              stroke="var(--color-rides)"
              strokeWidth={2}
            />

          </AreaChart>

        </ChartContainer>

        {/* Total */}

        <div className="mt-4 text-sm text-muted-foreground">
          Total rides:{" "}
          <span className="font-semibold text-foreground">
            {totalRides}
          </span>
        </div>

      </CardContent>

    </Card>
  )
}