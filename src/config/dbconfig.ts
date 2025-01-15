import mongoose from "mongoose";
import { secrets } from "../constants/secrets";


(async function dbConnect() {
  try {
    if (!secrets.DB_CONNECTION_STRING) {
      throw new Error("Database String Error");
    }
    await mongoose.connect(secrets.DB_CONNECTION_STRING);
    console.log("Db connected SuccessFully");
  } catch (error) {
    console.error(error);
    throw error
  }
})();
 