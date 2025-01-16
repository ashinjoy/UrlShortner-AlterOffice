import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../errors/badrequest";
import { verifyAccessToken } from "../utils/jwt";
import { NotAuthorized } from "../errors/notAuthorized";

export class AuthMiddleware {
  static async isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
        if (!req.headers["Authorization"] && !req.headers["authorization"]) {
            throw new BadRequestError("Bad Reuqest");
          }
          const header = req.headers["Authorization"] || req.headers["authorization"];
          if (Array.isArray(header) || !header) {
            throw new BadRequestError("Bad Request");
          }
          const userAccessToken = header.split(" ")[1];
          const decodeToken = await verifyAccessToken(userAccessToken);
          if (!decodeToken) {
            throw new NotAuthorized("Not Authorized");
          }
          next();
    } catch (error) {
        next(error)
    }
   
  }
}
