import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/interview";

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    console.log("Database is conected to", db.connection.name);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
