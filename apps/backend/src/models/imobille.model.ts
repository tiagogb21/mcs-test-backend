import mongoose, { Schema } from "mongoose";
import { IImmobileDocument } from "../interfaces/immobile.interface";
import { AddressSchema } from "./address.schema";

const homeOrAppartment = ['casa', 'apartamento']

const ImmobileSchema = new Schema({
  type: {
    type: String,
    enum: homeOrAppartment,
    required: true,
  },
  address: {
    type: AddressSchema,
    unique: true,
    required: true,
  },
  owners: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    // required: true,
  }
});

export const ImmobileModel = mongoose.model<IImmobileDocument>("Immobile", ImmobileSchema);
export const ImmobileModelTest = mongoose.model<IImmobileDocument>("ImmobileTest", ImmobileSchema);
