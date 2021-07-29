import { Schema, model, Document } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

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
      trim: true,
    },
    imgUrl: {
      type: String,
      required: true,
      trim: true,
    },
    userCreator: {
      type: ObjectId,
      ref: "Item",
      required: true,
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
