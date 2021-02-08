const mongoose = require("mongoose");

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//   })
//   .then(() => {
//     console.log("Mongodb connected");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// mongoose.connection.on("connected", () => {
//   console.log("Mongoose connected to db");
// });

// mongoose.connection.on("error", (err) => {
//   console.log(err.message);
// });

// mongoose.connection.on("disconnected", () => {
//   console.log("Mongoose connection is disconnected");
// });

// // process.on("SIGINT", async () => {
// //   await mongoose.connection.close();
// //   process.exit(0);
// // });

// seperated

let connected;

const connectToDb = () => {
  if (connected) {
    // console.log("Using existing database connection");
    return Promise.resolve();
  }

  // console.log("Creating new database connection");
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  };
  return mongoose
    .connect(process.env.MONGO_URI || "mongodb://localhost:27017/test", options)
    .then((db) => {
      // console.log("Mongoose connected");
      connected = db.connections[0].readyState;
      return mongoose.connection.db;
    })
    .catch((err) => {
      // console.log(err.message);
    });
};

module.exports = connectToDb;
