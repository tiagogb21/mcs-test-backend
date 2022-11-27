import mongoose, { Schema } from "mongoose";
import { IClientDocument } from "../interfaces/client.interface";
import { ContactSchema } from "./contact.schema";

export const ClientSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  contacts: {
    type: [ContactSchema],
    required: true,
  },
});

export const ClientModel = mongoose.model<IClientDocument>('Client', ClientSchema)
export const ClientModelTest = mongoose.model<IClientDocument>('ClientTest', ClientSchema)
