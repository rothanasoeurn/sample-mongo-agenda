const mongoose = require("mongoose");
const { ENV } = require("./commonConstant");
const { agenda, startAgenda } = require("./agent/agendaConfig");

const DB_URI = `mongodb://${ENV.MONGODB_USERNAME}:${ENV.MONGODB_PASSWORD}@${ENV.MONGODB_CONNECTION_URI}`;
let isMongooseEventRegistered = false;

const connectMongoDB = async () => {
  try {
    console.log("Establishing connection to DB: ", ENV.MONGODB_CONNECTION_URI);

    if (!isMongooseEventRegistered) {
      mongoose.connection.on("error", (e) => {
        console.log("mongodb connection error event: ", e);
        mongoose.disconnect();
        agenda.stop();
      });

      mongoose.connection.on("connected", () => {
        console.log("mongodb connected event");
        startAgenda();
      });

      mongoose.connection.on("disconnected", () => {
        console.log("mongodb disconnected event");

        setTimeout(() => {
          connectMongoDB();
        }, 30000);
      });
      isMongooseEventRegistered = true;
    }

    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("mongodb connected");
  } catch (error) {
    console.log("error make connection to mongodb", error.message);
  }
};

module.exports = connectMongoDB;
