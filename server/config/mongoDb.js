import mongoose from "mongoose";

export const MongoDbConnections = async (uri) => {
  return mongoose.connect(uri);
};
