import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI_LOCAL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`\nMongoDB Connected : ${conn.connection.host}`.cyan);
  } catch (error) {
    console.log(`Error : ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
