import {
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">

      {/* Total Revenue */}
      <Card className="w-full">
        <CardHeader>
          <CardDescription>
            Total Revenue
          </CardDescription>

          <CardTitle className="text-2xl font-semibold tabular-nums">
            $1,250.00
          </CardTitle>

          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Trending up this month
            <IconTrendingUp className="size-4" />
          </div>

          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>

      {/* New Customers */}
      <Card className="w-full">
        <CardHeader>
          <CardDescription>
            New Customers
          </CardDescription>

          <CardTitle className="text-2xl font-semibold tabular-nums">
            1,234
          </CardTitle>

          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Down 20% this period
            <IconTrendingDown className="size-4" />
          </div>

          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>

      {/* Active Accounts */}
      <Card className="w-full">
        <CardHeader>
          <CardDescription>
            Active Accounts
          </CardDescription>

          <CardTitle className="text-2xl font-semibold tabular-nums">
            45,678
          </CardTitle>

          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Strong user retention
            <IconTrendingUp className="size-4" />
          </div>

          <div className="text-muted-foreground">
            Engagement exceed targets
          </div>
        </CardFooter>
      </Card>

      {/* Growth Rate */}
      <Card className="w-full">
        <CardHeader>
          <CardDescription>
            Growth Rate
          </CardDescription>

          <CardTitle className="text-2xl font-semibold tabular-nums">
            4.5%
          </CardTitle>

          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Steady performance increase
            <IconTrendingUp className="size-4" />
          </div>

          <div className="text-muted-foreground">
            Meets growth projections
          </div>
        </CardFooter>
      </Card>

    </div>
  )
}