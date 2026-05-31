import type { NextFunction, Request, Response } from "express";
import { UserRole } from "../enum/enum.details.ts";

interface authuser extends Request {
    user?: {
        id: string;
        Role: UserRole;
    
    }
}

 export const Adminmiddleware = (req: authuser, res: Response, next: NextFunction) =>{

    try{

        if(req.user?.Role !== UserRole.ADMIN){
            res.status(400).json({message:"admin access required", success: false})
            return;
        
        }
        return next();
    }catch(err){
        throw err;
    }
}

export const Drivermiddleware = (req: authuser, res: Response, next: NextFunction) =>{
    try{
        if(req.user?.Role !== UserRole.DRIVER){
            res.status(400).json({message:"driver access required", success: false})
            return;
        
        }
        return next();

    }catch(err){
        throw err;
    }

}