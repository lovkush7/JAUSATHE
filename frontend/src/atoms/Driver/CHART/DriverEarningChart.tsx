import React from 'react'
import { api } from '../../../api/Api';
import { useQuery } from '@tanstack/react-query';
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
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
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
export const getMonthlyEarnings = async (year: number) => {
  const res = await api.get(
    `/Payment/monthly-earning?year=${year}`
  );

  return res.data;
};

const DriverEarningChart = () => {
    const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;
    const currentYear = new Date().getFullYear();

const { data, isLoading } = useQuery({
  queryKey: ["monthly-earnings", currentYear],
  queryFn: () => getMonthlyEarnings(currentYear),
});
if(isLoading){
    return <div>Loading...</div>
}
console.log("the the fetched res is  ", data)
  return (
    <div>
           <Card>
      <CardHeader>
        <CardTitle>Monthly Ride Earnings</CardTitle>
        <CardDescription>{currentYear}</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar
              dataKey="earnings"
              fill="var(--color-earnings)"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
    </div>
  )
}

export default DriverEarningChart
