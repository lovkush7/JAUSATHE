export enum UserRole {
    ADMIN = "ADMIN",
    PASSENGERS = "PASSENGERS",
    DRIVER = "DRIVER",

}

export enum VehicleType {
 BIKE = "BIKE",
 CAR = "CAR",
 ELECTRIC = "ELECTRIC",
 AUTO = "AUTO",

 
}

export enum Driverstatus {
    ONLIE= "ONLINE",
    OFFLINE = "OFFLINE",
    BUSY = "BUSY"
}

export enum RideStatus{
    REQUESTED = "REQUESTED",
    ACCEPTED = "ACCEPTED",
    ARRIVING = "ARRIVING",
    STARTED = "STARTED",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED",

}

export enum Cancledby {
    DRIVER = "DRIVER",
    PASSENGERS = "PASSENGERS",
    SYSTEM = "SYSTEM"
}