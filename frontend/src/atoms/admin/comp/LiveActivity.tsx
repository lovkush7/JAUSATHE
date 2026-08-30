import React, { useEffect } from "react";
import { getnotification } from "../../../zustand/Admindashboard";
import useScoket from "../../../zustand/socket.config";


const LiveActivity = () => {
    const { activites } = getnotification();
    const { Socket, listentoadminactivites, nonlistentoadminactivites } =
       useScoket()

    useEffect(() => {
        if (!Socket) return;

        listentoadminactivites();

        return () => {
            nonlistentoadminactivites();
        };
    }, [Socket, listentoadminactivites, nonlistentoadminactivites]);

    console.log("the activities are ", activites);

    return (
        <div>
            <div className="rounded-xl border">
                <div className="border-b p-4">
                    <h2 className="font-semibold">
                        Live Activity
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Real-time activity
                    </p>
                </div>

                <div>
                    {activites.map((activity, index) => (
                        <div
                            key={`${activity.timestamp}-${index}`}
                            className="border-b p-4"
                        >
                            <div className="flex gap-3">
                                <div>
                                    <p className="font-medium">
                                        {activity.title}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        {activity.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LiveActivity;