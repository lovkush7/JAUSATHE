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
import useScoket from '../../../zustand/socket.config';
export const getMonthlyEarnings = async (year: number, driverId: string) => {
  const res = await api.get(
    "/Payment/monthly-earning", {
    params: {
      year: year,
      driverId
    }

  }

  );

  return res.data;
};

const DriverEarningChart = () => {
  const { authUser } = useScoket()
  const chartConfig = {
    earnings: {
      label: "Earnings",
      color: "#3B82F6",
    },
  } satisfies ChartConfig;
  const currentYear = new Date().getFullYear();

  const { data, isLoading } = useQuery({
    queryKey: ["monthly-earnings", currentYear],
    queryFn: () => getMonthlyEarnings(currentYear, authUser?.id!),
  });
  if (isLoading) {
    return <div>Loading...</div>
  }
  console.log("the the fetched res is  ", data)
  return (
    <div>
      <Card className="w-full min-h-[420px] border border-[#2A2A3A] bg-[#161628] shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">Monthly Ride Earnings</CardTitle>
          <CardDescription className="text-gray-400">{currentYear}</CardDescription>
        </CardHeader>

        <CardContent>
          <ChartContainer config={chartConfig} className='h-[300px] w-full'>
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
                radius={[8, 8, 0, 0]}
                maxBarSize={45}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default DriverEarningChart
