import React, { useEffect } from "react";
import {
  Car,
  CheckCircle2,
  CircleDollarSign,
  CircleOff,
  Clock3,
  MapPin,
  PlayCircle,
  Power,
  PowerOff,
  XCircle,
} from "lucide-react";

import { getnotification } from "../../../zustand/Admindashboard";
import useScoket from "../../../zustand/socket.config";

const LiveActivity = () => {
  const { activites } = getnotification();

  const checkauth = useScoket((state) => state.checkauth);
  const Socket = useScoket((state) => state.Socket);

  const listentoadminactivites = useScoket(
    (state) => state.listentoadminactivites
  );

  const nonlistentoadminactivites = useScoket(
    (state) => state.nonlistentoadminactivites
  );

  // Connect admin socket
  useEffect(() => {
    checkauth();
  }, [checkauth]);

  // Listen for admin activities
  useEffect(() => {
    if (!Socket) {
      console.log("LiveActivity: Socket not connected");
      return;
    }

    console.log("LiveActivity: listening for admin activities");

    listentoadminactivites();

    return () => {
      nonlistentoadminactivites();
    };
  }, [Socket]);

  // Activity UI configuration
  const getActivityConfig = (type: string) => {
    switch (type) {
      case "DRIVER_ONLINE":
        return {
          icon: <Power size={18} />,
          iconStyle: "text-green-600 bg-green-100",
          dotStyle: "bg-green-500",
          badgeStyle:
            "bg-green-50 text-green-700 border-green-200",
        };

      case "DRIVER_OFFLINE":
        return {
          icon: <PowerOff size={18} />,
          iconStyle: "text-gray-600 bg-gray-100",
          dotStyle: "bg-gray-400",
          badgeStyle:
            "bg-gray-50 text-gray-600 border-gray-200",
        };

      case "RIDE_CREATED":
        return {
          icon: <MapPin size={18} />,
          iconStyle: "text-blue-600 bg-blue-100",
          dotStyle: "bg-blue-500",
          badgeStyle:
            "bg-blue-50 text-blue-700 border-blue-200",
        };

      case "RIDE_ACCEPTED":
        return {
          icon: <Car size={18} />,
          iconStyle: "text-purple-600 bg-purple-100",
          dotStyle: "bg-purple-500",
          badgeStyle:
            "bg-purple-50 text-purple-700 border-purple-200",
        };

      case "RIDE_STARTED":
        return {
          icon: <PlayCircle size={18} />,
          iconStyle: "text-yellow-600 bg-yellow-100",
          dotStyle: "bg-yellow-500",
          badgeStyle:
            "bg-yellow-50 text-yellow-700 border-yellow-200",
        };

      case "RIDE_COMPLETED":
        return {
          icon: <CheckCircle2 size={18} />,
          iconStyle: "text-emerald-600 bg-emerald-100",
          dotStyle: "bg-emerald-500",
          badgeStyle:
            "bg-emerald-50 text-emerald-700 border-emerald-200",
        };

      case "RIDE_CANCELLED":
        return {
          icon: <XCircle size={18} />,
          iconStyle: "text-red-600 bg-red-100",
          dotStyle: "bg-red-500",
          badgeStyle:
            "bg-red-50 text-red-700 border-red-200",
        };

      case "PAYMENT_SUCCESS":
        return {
          icon: <CircleDollarSign size={18} />,
          iconStyle: "text-green-600 bg-green-100",
          dotStyle: "bg-green-500",
          badgeStyle:
            "bg-green-50 text-green-700 border-green-200",
        };

      default:
        return {
          icon: <Clock3 size={18} />,
          iconStyle: "text-gray-600 bg-gray-100",
          dotStyle: "bg-gray-400",
          badgeStyle:
            "bg-gray-50 text-gray-600 border-gray-200",
        };
    }
  };

  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-lg">
              Live Activity
            </h2>

            {/* Live indicator */}
            <span className="flex items-center gap-1.5 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>

              Live
            </span>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Real-time system activity
          </p>
        </div>

        {/* Activity count */}
        <div className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-600">
          {activites.length}
        </div>
      </div>

      {/* Activities */}
      <div className="max-h-[500px] overflow-y-auto">

        {activites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">

            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <Clock3
                size={22}
                className="text-gray-400"
              />
            </div>

            <p className="font-medium text-gray-600">
              No recent activity
            </p>

            <p className="mt-1 text-sm text-gray-400">
              New activities will appear here
            </p>

          </div>
        ) : (
          <div>
            {activites.map((activity, index) => {
              const config = getActivityConfig(activity.type);

              return (
                <div
                  key={`${activity.timestamp}-${index}`}
                  className="group relative flex gap-4 border-b px-5 py-4 transition hover:bg-gray-50"
                >

                  {/* Timeline */}
                  <div className="relative flex flex-col items-center">

                    {/* Icon */}
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.iconStyle}`}
                    >
                      {config.icon}
                    </div>

                    {/* Timeline line */}
                    {index !== activites.length - 1 && (
                      <div className="absolute top-10 h-full w-px bg-gray-200" />
                    )}

                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">

                    <div className="flex items-start justify-between gap-3">

                      <div>
                        <p className="font-medium text-gray-900">
                          {activity.title}
                        </p>

                        <p className="mt-1 text-sm leading-5 text-gray-500">
                          {activity.message}
                        </p>
                      </div>

                      {/* Type badge */}
                      <span
                        className={`hidden shrink-0 rounded-full border px-2 py-1 text-[10px] font-semibold uppercase sm:inline-block ${config.badgeStyle}`}
                      >
                        {activity.type.replaceAll("_", " ")}
                      </span>

                    </div>

                    {/* Bottom information */}
                    <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">

                      <span>
                        {new Date(
                          activity.timestamp
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>

                      {activity.rideId && (
                        <>
                          <span>•</span>

                          <span>
                            Ride #{activity.rideId.slice(0, 8)}
                          </span>
                        </>
                      )}

                      {activity.amount !== undefined && (
                        <>
                          <span>•</span>

                          <span className="font-medium text-gray-600">
                            Rs. {activity.amount.toFixed(2)}
                          </span>
                        </>
                      )}

                    </div>

                  </div>

                  {/* New activity indicator */}
                  {index === 0 && (
                    <span
                      className={`absolute right-2 top-2 h-2 w-2 rounded-full ${config.dotStyle}`}
                    />
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
};

export default LiveActivity;