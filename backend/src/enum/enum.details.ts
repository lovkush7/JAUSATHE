export enum UserRole {
    ADMIN = "ADMIN",
    PASSENGERS = "PASSENGERS",
    DRIVER = "DRIVER",

}

export enum Userstatus{
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}

export enum VehicleType {
 BIKE = "BIKE",
 CAR = "CAR",
 ELECTRIC = "ELECTRIC",
 AUTO = "AUTO",

 
}

export enum Driverstatus {
    ONLINE= "ONLINE",
    OFFLINE = "OFFLINE",
    BUSY = "BUSY"
}

export enum RideStatus{
    REQUESTED = "REQUESTED",
    SEARCHING ="SEARCHING",
    ACCEPTED = "ACCEPTED",
    ARRIVING = "ARRIVING",
    STARTED = "STARTED",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED",
    DRIVERNOTFOUND="DRIVERNOTFOUND"

}

export enum Cancledby {
    DRIVER = "DRIVER",
    PASSENGERS = "PASSENGERS",
    SYSTEM = "SYSTEM"
}