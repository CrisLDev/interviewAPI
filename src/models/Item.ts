import { Schema, model, Document } from "mongoose";

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: String,
      required: true,
      trim: true,
    },
    sold: {
      type: String,
      required: true,
      trim: true,
    },
    imgUrl: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export interface IItem extends Document {
  name: string;
  descriptiob: string;
  stock: string;
  sold?: string;
  imgUrl: string;
}

export default model<IItem>("Item", itemSchema);
