import mongoose from "mongoose";
import { Schema } from "mongoose";
import crypto from "crypto";

const CommentsSchema = new Schema({
  comments: String,
  organisationName: String,
  deleteStatus: Boolean,
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() }
});

mongoose.model("Comments", CommentsSchema);
