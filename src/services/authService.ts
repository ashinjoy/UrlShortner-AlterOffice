import { google } from "googleapis";
import { REDIRECT_URI, SCOPES } from "../constants/constants";
import { secrets } from "../constants/secrets";
import { IUserRepository } from "../interface/userRepoInterface";
import { createAccessToken } from "../utils/jwt";
import { BadRequestError } from "../errors/badrequest";
const googleAuthClient = new google.auth.OAuth2(
  secrets.GOOGLE_CLIENT_ID,
  secrets.GOOGLE_CLIENT_SECRET,
  REDIRECT_URI
);
const scopes = SCOPES;

export class AuthService {
  userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  generateAuthUrl(): string {
    const authUrl = googleAuthClient.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    return authUrl;
  }
  async authenticateUser(code: string) {
    try {
      const { tokens } = await googleAuthClient.getToken(code);
      googleAuthClient.setCredentials(tokens);
      const oauth2 = google.oauth2({ version: "v2", auth: googleAuthClient });
      const userInfo = await oauth2.userinfo.get();
      console.log('userInfo',userInfo)
      const isUserPresent = await this.userRepository.getUserByEmail(
        userInfo.data.email
      );
      if (!isUserPresent) {
        const userEntity = {
          uname: userInfo.data.name || "",
          email: userInfo.data.email || "",
          google_id: userInfo.data.id || "",
        };
        await this.userRepository.createUser(userEntity);
      }
      
      if(!userInfo.data.id){
        throw new BadRequestError('ID Not Available')
      }
      const generateToken = await createAccessToken(userInfo.data.id)
      return {
        userInfo: userInfo.data,
        token:generateToken
      };
    } catch (error) {
      throw new Error("Authentication Failed");
    }
  }
}
