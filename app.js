const express = require("express");
const cors = require("cors");
const connectDB = require("./DBConfig");
const createJob = require("./routes/settlement/job");
const cancelJob = require("./routes/settlement/cancelJob");

const createAlertJob = require("./routes/alert/createAlertJob");
const deleteAlertJob = require("./routes/alert/deleteAlertJob");

const getAllJob = require("./routes/getAllJob");

const startServer = async () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  // connect to DB
  await connectDB();

  // alert management
  app.post("/job/alert/create", createAlertJob);
  app.get("/job/alert", getAllJob);
  app.delete("/job/alert/:jobId", deleteAlertJob);

  //settlement
  app.get("/job", createJob);
  app.get("/cancel", cancelJob);

  // Start server
  app.listen(6000, () => {
    console.log(`testing agenda server running`);
  });
};

startServer();
