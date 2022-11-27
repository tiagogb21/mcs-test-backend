import { Schema } from "mongoose";

const phoneOrMail = {
  telefone: 'Telefone',
  email: 'Email',
};

export const ContactSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: Object.keys(phoneOrMail),
    trim: true,
  },
  contact: {
    type: String,
    required: true,
    lowercase: true,
  },
});
