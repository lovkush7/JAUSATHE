"use client"

import * as React from "react"
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import { api } from "../../../api/Api"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// --------------------------------------------------
// Vehicle Type
// --------------------------------------------------

type VehicleType =
  | "BIKE"
  | "AUTO"
  | "CAR"
  | "ELECTRIC"

// --------------------------------------------------
// Fare Config Type
// --------------------------------------------------

interface FareConfig {
  id: string
  vechicleType: VehicleType
  baseFare: string
  perKmRate: string
  perMinRate: string
  minimumFare: string
  platformFee: string
  isActive: boolean
  NightRide: string
  RainRide: string
}



const getFareConfig = async (): Promise<FareConfig[]> => {
  const response = await api.get("/admin/fare-config")

  console.log("FARE CONFIG:", response.data)

  return response.data
}



const updateFareConfig = async ({
  id,
  data,
}: {
  id: string
  data: Partial<FareConfig>
}) => {
  const response = await api.patch(
    `/admin/fare-config/${id}`,
    data
  )

  return response.data
}

// --------------------------------------------------
// COMPONENT
// --------------------------------------------------

export default function FareConfig() {
  const queryClient = useQueryClient()

  // Selected vehicle
  const [vehicleType, setVehicleType] =
    React.useState<VehicleType>("BIKE")

  // Editable data
  const [formData, setFormData] =
    React.useState<FareConfig | null>(null)

  // ------------------------------------------------
  // GET
  // ------------------------------------------------

  const {
    data: fareConfigs = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fare-config"],
    queryFn: getFareConfig,
  })

  // ------------------------------------------------
  // Find selected vehicle
  // ------------------------------------------------

  React.useEffect(() => {
    const selected = fareConfigs.find(
      (fare) =>
        fare.vechicleType === vehicleType
    )

    console.log(
      "Selected vehicle:",
      vehicleType
    )

    console.log(
      "Selected fare:",
      selected
    )

    if (selected) {
      setFormData({
        ...selected,
      })
    }
  }, [fareConfigs, vehicleType])

  // ------------------------------------------------
  // UPDATE MUTATION
  // ------------------------------------------------

  const updateMutation = useMutation({
    mutationFn: updateFareConfig,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fare-config"],
      })
    },

    onError: (error) => {
      console.error(
        "Fare update error:",
        error
      )
    },
  })

  // ------------------------------------------------
  // Change Input
  // ------------------------------------------------

  const updateField = (
    field: keyof FareConfig,
    value: string | boolean
  ) => {
    setFormData((prev) => {
      if (!prev) return null

      return {
        ...prev,
        [field]: value,
      }
    })
  }

  // ------------------------------------------------
  // SAVE
  // ------------------------------------------------

  const handleSave = () => {
    if (!formData) return

    updateMutation.mutate({
      id: formData.id,

      data: {
        baseFare: formData.baseFare,
        perKmRate: formData.perKmRate,
        perMinRate: formData.perMinRate,
        minimumFare: formData.minimumFare,
        platformFee: formData.platformFee,
        NightRide: formData.NightRide,
        RainRide: formData.RainRide,
        isActive: formData.isActive,
      },
    })
  }

  

  if (isLoading) {
    return (
      <div className="p-6">
        Loading fare configuration...
      </div>
    )
  }

 

  return (
    <div className="p-6">

      <Card>

     

        <CardHeader>

          <CardTitle>
            Fare Configuration
          </CardTitle>

          <CardDescription>
            Manage fare configuration for
            different vehicle types.
          </CardDescription>

        </CardHeader>

        <CardContent className="space-y-6">

          <div className="flex flex-wrap gap-3">

            <Button
              variant={
                vehicleType === "BIKE"
                  ? "default"
                  : "outline"
              }
              onClick={() =>
                setVehicleType("BIKE")
              }
            >
              🏍 Bike
            </Button>

            <Button
              variant={
                vehicleType === "AUTO"
                  ? "default"
                  : "outline"
              }
              onClick={() =>
                setVehicleType("AUTO")
              }
            >
              🛺 Auto
            </Button>

            <Button
              variant={
                vehicleType === "CAR"
                  ? "default"
                  : "outline"
              }
              onClick={() =>
                setVehicleType("CAR")
              }
            >
              🚗 Car
            </Button>

            <Button
              variant={
                vehicleType === "ELECTRIC"
                  ? "default"
                  : "outline"
              }
              onClick={() =>
                setVehicleType("ELECTRIC")
              }
            >
              ⚡ Electric
            </Button>

          </div>


          <div>

            <h2 className="text-lg font-semibold">
              {vehicleType} Fare Configuration
            </h2>

            <p className="text-sm text-muted-foreground">
              Configure pricing for{" "}
              {vehicleType.toLowerCase()}.
            </p>

          </div>

         

          {formData ? (

            <div className="rounded-md border">

              <Table>

                <TableHeader>

                  <TableRow>

                    <TableHead>
                      Configuration
                    </TableHead>

                    <TableHead>
                      Value
                    </TableHead>

                  </TableRow>

                </TableHeader>

                <TableBody>

                  {/* Vehicle */}

                  <TableRow>

                    <TableCell className="font-medium">
                      Vehicle Type
                    </TableCell>

                    <TableCell>
                      {formData.vechicleType}
                    </TableCell>

                  </TableRow>

                  {/* Base Fare */}

                  <TableRow>

                    <TableCell className="font-medium">
                      Base Fare
                    </TableCell>

                    <TableCell>

                      <Input
                        type="number"
                        value={formData.baseFare}
                        onChange={(e) =>
                          updateField(
                            "baseFare",
                            e.target.value
                          )
                        }
                        className="w-[220px]"
                      />

                    </TableCell>

                  </TableRow>

                  {/* Per KM */}

                  <TableRow>

                    <TableCell className="font-medium">
                      Per KM Rate
                    </TableCell>

                    <TableCell>

                      <Input
                        type="number"
                        value={formData.perKmRate}
                        onChange={(e) =>
                          updateField(
                            "perKmRate",
                            e.target.value
                          )
                        }
                        className="w-[220px]"
                      />

                    </TableCell>

                  </TableRow>

             

                  <TableRow>

                    <TableCell className="font-medium">
                      Per Minute Rate
                    </TableCell>

                    <TableCell>

                      <Input
                        type="number"
                        step="0.1"
                        value={formData.perMinRate}
                        onChange={(e) =>
                          updateField(
                            "perMinRate",
                            e.target.value
                          )
                        }
                        className="w-[220px]"
                      />

                    </TableCell>

                  </TableRow>

                  {/* Minimum Fare */}

                  <TableRow>

                    <TableCell className="font-medium">
                      Minimum Fare
                    </TableCell>

                    <TableCell>

                      <Input
                        type="number"
                        value={formData.minimumFare}
                        onChange={(e) =>
                          updateField(
                            "minimumFare",
                            e.target.value
                          )
                        }
                        className="w-[220px]"
                      />

                    </TableCell>

                  </TableRow>

                  {/* Platform Fee */}

                  <TableRow>

                    <TableCell className="font-medium">
                      Platform Fee
                    </TableCell>

                    <TableCell>

                      <Input
                        type="number"
                        value={formData.platformFee}
                        onChange={(e) =>
                          updateField(
                            "platformFee",
                            e.target.value
                          )
                        }
                        className="w-[220px]"
                      />

                    </TableCell>

                  </TableRow>

                  {/* Night Ride */}

                  <TableRow>

                    <TableCell className="font-medium">
                      Night Ride Multiplier
                    </TableCell>

                    <TableCell>

                      <Input
                        type="number"
                        step="0.1"
                        value={formData.NightRide}
                        onChange={(e) =>
                          updateField(
                            "NightRide",
                            e.target.value
                          )
                        }
                        className="w-[220px]"
                      />

                    </TableCell>

                  </TableRow>

                  {/* Rain Ride */}

                  <TableRow>

                    <TableCell className="font-medium">
                      Rain Ride Multiplier
                    </TableCell>

                    <TableCell>

                      <Input
                        type="number"
                        step="0.1"
                        value={formData.RainRide}
                        onChange={(e) =>
                          updateField(
                            "RainRide",
                            e.target.value
                          )
                        }
                        className="w-[220px]"
                      />

                    </TableCell>

                  </TableRow>

                  {/* Active */}

                  <TableRow>

                    <TableCell className="font-medium">
                      Status
                    </TableCell>

                    <TableCell>

                      <Button
                        type="button"
                        variant={
                          formData.isActive
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          updateField(
                            "isActive",
                            !formData.isActive
                          )
                        }
                      >
                        {formData.isActive
                          ? "Active"
                          : "Inactive"}
                      </Button>

                    </TableCell>

                  </TableRow>

                </TableBody>

              </Table>

            </div>

          ) : (

            <div className="rounded-md border p-10 text-center text-muted-foreground">
              No fare configuration found for{" "}
              {vehicleType}.
            </div>

          )}

          {/* -------------------------------------- */}
         

          {formData && (

            <div className="flex justify-end">

              <Button
                onClick={handleSave}
                disabled={
                  updateMutation.isPending
                }
              >

                {updateMutation.isPending
                  ? "Saving..."
                  : "Save Changes"}

              </Button>

            </div>

          )}

        </CardContent>

      </Card>

    </div>
  )
}