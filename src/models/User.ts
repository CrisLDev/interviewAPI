import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

const ObjectId = Schema.Types.ObjectId;

const userSchema: Schema<IUser> = new Schema({
  userName: {
    type: String,
    required: true,
    min: 4,
    trim: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
    default: "user",
  },
  password: {
    type: String,
    required: true,
    min: 6,
    trim: true,
  },
  imgUrl: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  items: [
    {
      type: ObjectId,
      ref: "Item",
    },
  ],
});

export interface IUser extends Document {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  address: string;
  history: string[];
  encryptPassword(password: string): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
}

userSchema.methods.encryptPassword = async (
  password: string
): Promise<string> => {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>("User", userSchema);
