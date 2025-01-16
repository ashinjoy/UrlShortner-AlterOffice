import jwt from "jsonwebtoken";
import { secrets } from "../constants/secrets";
import { BadRequestError } from "../errors/badrequest";
const createAccessToken = async (data: string) => {
  try {
    if (!secrets.JWT_SECRET) {
      throw new BadRequestError("token secret not loaded");
    }
    return await jwt.sign(data, secrets.JWT_SECRET);
  } catch (error) {
    throw error;
  }
};

const verifyAccessToken = async (data: string) => {
  try {
    if (!secrets.JWT_SECRET) {
      throw new BadRequestError("token secret not loaded");
    }
    return await jwt.verify(data, secrets.JWT_SECRET);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
    createAccessToken,
    verifyAccessToken
}