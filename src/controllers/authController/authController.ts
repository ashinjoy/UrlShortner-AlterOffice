import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../errors/badrequest";
import { IAuthService } from "../../interface/userInterface";

export class AuthController {
  authService: IAuthService;
  constructor(authService: IAuthService) {
    this.authService = authService;
    // console.log('hello',this.authService.generateAuthUrl)
  }
  auth(req: Request, res: Response, next: NextFunction) {
    try {
      // console.log('getAuthenticated',this.authService)
      const getAuthUrl = this.authService.generateAuthUrl();
      res.status(200).json({ url: getAuthUrl });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  async googleAuth(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("hello guyzz");
      
      const { code } = req.query as { code: string };
      if (!code) {
        throw new BadRequestError("Bad Request");
      }
      // const authInfo = await authenticateUser(code);
     const authInfo =  await this.authService.authenticateUser(code)
     console.log(authInfo);
     
      res.status(200).json({
        message: "Authentication successful",
        user: authInfo.userInfo,
        tokens: authInfo.token,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
