import jwt from "jsonwebtoken"
import Envconfig from "../config/Envconfig.ts"
import { User } from "../entity/User.entities.ts"

export const expressAuthentication = async (
  request: any,
  securityName: string,
  scopes?: string[]
) => {
  try {
    if (securityName === "jwt") {

      let token: string | undefined

      if (request.cookies?.jwt) {
        token = request.cookies.jwt
      } 
      else if (request.headers?.authorization?.split(" ")[1]) {
        token = request.headers.authorization.split(" ")[1]
      }

      if (!token) {
        throw new Error("Token not provided")
      }

      let decoded: any

      try {
        decoded = jwt.verify(token, Envconfig.JWT_SECRET!)
      } catch {
        throw new Error("Invalid token")
      }

      const user = await User.findOne({
        where: {
          id: decoded.id
        }
      })

      if (!user) {
        throw new Error("User not found")
      }

      request.user = user

      return user
    }

    throw new Error("Invalid security scheme")
  } catch (err) {
    throw err
  }
}