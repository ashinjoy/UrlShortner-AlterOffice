import { defaultMaxListeners } from "events";
import mongoose from "mongoose";
const urlSchema = new mongoose.Schema(
  {
    longUrl: {
      type: String,
      requried: true,
    },
    shortUrl: {
      type: String,
      unique: true,
      required: true,
    },
    short:{
      type:String,
    },
    topic: {
      type: String,
      default: "general",
    },
    totalClicks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
export const urlModel = mongoose.model('url',urlSchema)
