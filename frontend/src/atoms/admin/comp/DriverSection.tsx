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
  CardContent
} from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { api } from "../../../api/Api"
const datas = async () => {
  const res = await api.get('/admin/details')
  return res.data
}

export function DriverSectionCards() {
  const { data } = useQuery({
    queryKey: [''],
    queryFn: () => datas(),

  })
  console.log("the datais ", data)
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">


      <Card className="w-full shadow-lg">
        <CardHeader className="text-center">
          <CardDescription>
            Active Driver
          </CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center items-center">
          <div className="text-4xl font-bold mt-4">
            {data?.active}
          </div>
        </CardContent>
      </Card>

      <Card className="w-full shadow-lg">
        <CardHeader className="text-center">
          <CardDescription>
          AverageFare
          </CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center items-center">
          <div className="text-4xl font-bold mt-4">
            {data?.averageFare}
          </div>
        </CardContent>
      </Card>

      {/* <Card className="w-full shadow-lg">
        <CardHeader className="text-center">
          <CardDescription>
            Today's Newuser
          </CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center items-center">
          <div className="text-4xl font-bold mt-4">
            {data?.newuser}
          </div>
        </CardContent>
      </Card> */}
      <Card className="w-full shadow-lg">
        <CardHeader className="text-center">
          <CardDescription>
            Today's Rides
          </CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center items-center">
          <div className="text-4xl font-bold mt-4">
            {data?.ride}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}