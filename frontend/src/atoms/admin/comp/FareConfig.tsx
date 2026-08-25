"use client"

import * as React from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

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

type VehicleType = "BIKE" | "CAR" | "TAXI"

interface FareConfig {
  vehicleType: VehicleType
  baseFare: number
  perKmRate: number
  perMinRate: number
  minimumFare: number
  platformFee: number
  nightRide: number
  rainRide: number
  isActive: boolean
}

// -----------------------------------------
// GET FARE CONFIG
// -----------------------------------------

const getFareConfig = async () => {
  const response = await api.get("/admin/fare-config")

  console.log("FARE API RESPONSE:", response.data)

  return response.data
}

// -----------------------------------------
// UPDATE FARE CONFIG
// -----------------------------------------

const updateFareConfig = async ({
  vehicleType,
  data,
}: {
  vehicleType: VehicleType
  data: FareConfig
}) => {
  const response = await api.put(
    `/admin/fare-config/${vehicleType}`,
    data
  )

  return response.data
}

// -----------------------------------------
// COMPONENT
// -----------------------------------------

export default function FareConfig() {
  const queryClient = useQueryClient()

  const [vehicleType, setVehicleType] =
    React.useState<VehicleType>("BIKE")

  const [formData, setFormData] =
    React.useState<FareConfig | null>(null)

  // ---------------------------------------
  // GET DATA
  // ---------------------------------------

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fare-config"],
    queryFn: getFareConfig,
  })

  console.log("DATA:", data)


  React.useEffect(() => {
    if (!data) return

    const configs = Array.isArray(data)
      ? data
      : data.data ?? data.fareConfig ?? []

    const selected = configs.find(
      (item: FareConfig) =>
        item.vehicleType === vehicleType
    )

    console.log("SELECTED:", selected)

    if (selected) {
      setFormData(selected)
    }
  }, [data, vehicleType])

  // ---------------------------------------
  // UPDATE
  // ---------------------------------------

  const updateMutation = useMutation({
    mutationFn: updateFareConfig,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fare-config"],
      })
    },

    onError: (error) => {
      console.error("UPDATE ERROR:", error)
    },
  })

  // ---------------------------------------
  // INPUT CHANGE
  // ---------------------------------------

  const updateField = (
    field: keyof FareConfig,
    value: string | number | boolean
  ) => {
    setFormData((previous) => {
      if (!previous) return null

      return {
        ...previous,
        [field]: value,
      }
    })
  }

  // ---------------------------------------
  // SAVE
  // ---------------------------------------

  const handleSave = () => {
    if (!formData) return

    updateMutation.mutate({
      vehicleType,
      data: formData,
    })
  }

  // ---------------------------------------
  // LOADING
  // ---------------------------------------

  if (isLoading) {
    return (
      <div className="p-6">
        Loading fare configuration...
      </div>
    )
  }

  // ---------------------------------------
  // ERROR
  // ---------------------------------------

  if (isError) {
    return (
      <div className="p-6 text-red-500">
        Failed to load fare configuration.

        <pre className="mt-4 text-xs">
          {String(error)}
        </pre>
      </div>
    )
  }

  // ---------------------------------------
  // MAIN UI
  // ---------------------------------------

  return (
    <div className="p-6">

      <Card>

        <CardHeader>

          <CardTitle>
            Fare Configuration
          </CardTitle>

          <CardDescription>
            Manage fare configuration for each
            vehicle type.
          </CardDescription>

        </CardHeader>

        <CardContent className="space-y-6">

          {/* VEHICLE BUTTONS */}

          <div className="flex gap-3">

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
              Bike
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
              Car
            </Button>

            <Button
              variant={
                vehicleType === "TAXI"
                  ? "default"
                  : "outline"
              }
              onClick={() =>
                setVehicleType("TAXI")
              }
            >
              Taxi
            </Button>

          </div>

          {/* VEHICLE TITLE */}

          <div>

            <h2 className="text-lg font-semibold">
              {vehicleType} Fare
            </h2>

          </div>

          {/* TABLE */}

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

                  {/* VEHICLE */}

                  <TableRow>

                    <TableCell>
                      Vehicle Type
                    </TableCell>

                    <TableCell>
                      {formData.vehicleType}
                    </TableCell>

                  </TableRow>

                  {/* BASE FARE */}

                  <TableRow>

                    <TableCell>
                      Base Fare
                    </TableCell>

                    <TableCell>

                      <Input
                        type="number"
                        value={formData.baseFare}
                        onChange={(e) =>
                          updateField(
                            "baseFare",
                            Number(e.target.value)
                          )
                        }
                        className="w-[200px]"
                      />

                    </TableCell>

                  </TableRow>

                  {/* PER KM */}

                  <TableRow>

                    <TableCell>
                      Per KM Rate
                    </TableCell>

                    <TableCell>

                      <Input
                        type="number"
                        value={formData.perKmRate}
                        onChange={(e) =>
                          updateField(
                            "perKmRate",
                            Number(e.target.value)
                          )
                        }
                        className="w-[200px]"
                      />

                    </TableCell>

                  </TableRow>

                  {/* PER MINUTE */}

                  <TableRow>

                    <TableCell>
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
                            Number(e.target.value)
                          )
                        }
                        className="w-[200px]"
                      />

                    </TableCell>

                  </TableRow>

                  {/* MINIMUM */}

                  <TableRow>

                    <TableCell>
                      Minimum Fare
                    </TableCell>

                    <TableCell>

                      <Input
                        type="number"
                        value={formData.minimumFare}
                        onChange={(e) =>
                          updateField(
                            "minimumFare",
                            Number(e.target.value)
                          )
                        }
                        className="w-[200px]"
                      />

                    </TableCell>

                  </TableRow>

                  {/* PLATFORM */}

                  <TableRow>

                    <TableCell>
                      Platform Fee
                    </TableCell>

                    <TableCell>

                      <Input
                        type="number"
                        value={formData.platformFee}
                        onChange={(e) =>
                          updateField(
                            "platformFee",
                            Number(e.target.value)
                          )
                        }
                        className="w-[200px]"
                      />

                    </TableCell>

                  </TableRow>

                  {/* NIGHT */}

                  <TableRow>

                    <TableCell>
                      Night Ride
                    </TableCell>

                    <TableCell>

                      <Input
                        type="number"
                        step="0.1"
                        value={formData.nightRide}
                        onChange={(e) =>
                          updateField(
                            "nightRide",
                            Number(e.target.value)
                          )
                        }
                        className="w-[200px]"
                      />

                    </TableCell>

                  </TableRow>

                  {/* RAIN */}

                  <TableRow>

                    <TableCell>
                      Rain Ride
                    </TableCell>

                    <TableCell>

                      <Input
                        type="number"
                        step="0.1"
                        value={formData.rainRide}
                        onChange={(e) =>
                          updateField(
                            "rainRide",
                            Number(e.target.value)
                          )
                        }
                        className="w-[200px]"
                      />

                    </TableCell>

                  </TableRow>

                  {/* ACTIVE */}

                  <TableRow>

                    <TableCell>
                      Active
                    </TableCell>

                    <TableCell>

                      <Button
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

            <div className="rounded-md border p-10 text-center">
              No configuration found for{" "}
              {vehicleType}
            </div>

          )}

          {/* SAVE */}

          {formData && (

            <div className="flex justify-end">

              <Button
                onClick={handleSave}
                disabled={updateMutation.isPending}
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