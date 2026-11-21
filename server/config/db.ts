import mongoose from "mongoose";


const connectDB = async ()=> {
    mongoose.connection.on('connected',()=>{
        console.log("Mongodb connected");
    })

    await mongoose.connect(process.env.MONGO_DB_URI as string)
}

export default connectDB;

// import mongoose from "mongoose";

// let cached = (global as any).mongoose;

// if (!cached) {
//   cached = (global as any).mongoose = { conn: null, promise: null };
// }

// async function connectDB() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//       serverSelectionTimeoutMS: 10000, // Increase selection timeout to 10 seconds
//       connectTimeoutMS: 10000,         // Increase connection timeout
//     };

//     cached.promise = mongoose.connect(process.env.MONGODB_URI!, opts).then((m) => {
//       return m;
//     });
//   }
  
//   try {
//     cached.conn = await cached.promise;
//   } catch (e) {
//     cached.promise = null; // Key: reset after failure, to allow next retry
//     throw e;
//   }
  
//   return cached.conn;
// }

// export default connectDB;