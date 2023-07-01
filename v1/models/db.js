const mongoose = require("mongoose");

//!   Establishing connection
const url = "mongodb+srv://HTS:hts123@cluster0.40fno8n.mongodb.net/";

//creating a default connection to mongodb
mongoose.connect(url, (err) => {
  if (err) console.log("could not connected to db ", err);
  else console.log("connected to HTS db");
});

const conn = mongoose.connection;

conn.on("disconnected", () => {
  console.log("disconnected from  HTS db");
});

conn.on("error", (err) => {
  console.log("could not connected to  HTS db", err);
});
