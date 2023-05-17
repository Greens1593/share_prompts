import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);
  if (!isConnected) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "share-prompts",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      isConnected = true;
      console.log("Connected to MongoDB");
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("Already connected");
  }
};
