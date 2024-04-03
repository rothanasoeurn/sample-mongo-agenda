const mongoose = require("mongoose");
const Agenda = require("agenda");
// const settlementJob = require("../jobs/settlementJob");
const alertManagement = require("../jobs/alertManagementJob");

const agenda = new Agenda();

const startAgenda = () => {
  try {
    agenda.mongo(mongoose.connection.db, "cron_jobs");

    // settlementJob(agenda);
    alertManagement(agenda);

    agenda.on("ready", async () => {
      console.log("agenda is started");
      agenda.start();
    });

    // agenda.on('success', job => {
    //   console.log(`Run Successfully ${job.attrs.data.scheduleId}`);
    // });
  } catch (error) {
    console.log("agenda error: ", error.message);
  }
};

module.exports = { startAgenda, agenda };
