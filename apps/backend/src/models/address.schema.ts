import { Schema } from "mongoose";

export const AddressSchema = new Schema({
  street: {
    type: String,
    required: true,
    lowercase: true,
  },
  city: {
    type: String,
    required: true,
    lowercase: true,
  },
  state: {
    type: String,
    required: true,
    lowercase: true,
  },
  zipCode: {
    type: String,
    required: true,
    lowercase: true,
  }
});
