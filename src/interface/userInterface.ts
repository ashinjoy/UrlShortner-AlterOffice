import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  uname: string;
  email: string;
  google_id: string;
}
export interface IAuthService {
  generateAuthUrl(): string;
  authenticateUser(code: string): any;
}

export interface INewUser {
  uname: string;
  email: string;
  google_id: string;
}
