import mongoose, { Schema } from "mongoose";
import { IClick } from "../interface/redirectInterface";

const analyticSchema = new Schema<IClick>(
  {
    url_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "url",
    },
    short: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    os_name: {
      type: String,
      // required:true
    },
    device_name: {
      type: String,
      // required:true
    },
    ip_address: {
      type: String,
      // required:true
    },
    user_agent: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const analyticsModel = mongoose.model<IClick>("analytic", analyticSchema);
