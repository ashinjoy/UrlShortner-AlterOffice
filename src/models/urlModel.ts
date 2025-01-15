
import mongoose, { Schema } from "mongoose";
import { IUrl } from "../interface/urInterface";
const urlSchema = new Schema<IUrl>(
  {
    longUrl: {
      type: String,
      requried: true,
    },
    short: {
      type: String,
      // unique: true,
      required: true,
    },
    topic: {
      type: String,
      default: "general",
    },
    // totalClicks: {
    //   type: Number,
    //   default: 0,
    // },
  },
  {
    timestamps: true,
  }
);
export const urlModel = mongoose.model<IUrl>('url',urlSchema)
