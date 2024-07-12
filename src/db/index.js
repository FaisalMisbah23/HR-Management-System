import mongoose from "mongoose";
const dbName = "hrmanagement";
const connectToDb = async () => {
  try {
    const res = await mongoose.connect(`${process.env.MONGO_URI}/${dbName}`);
    console.log("Connected to mongodb");
  } catch (error) {
    console.log("Error while connected to mongodb", error);
    process.exit(1);
  }
};

export default connectToDb;
