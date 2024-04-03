const moment = require("moment");
const { JOB_TYPES } = require("../commonConstant");
const { defineJob } = require("../utils/commonUtil");

const runJobsBySchedule = async (agenda) => {
  try {
    const jobs = await agenda.jobs({});
    if (jobs.length > 0) {
      for (const job of jobs) {
        const restartJobName = job.attrs.name;
        defineJob(agenda, restartJobName);
        console.log(
          `Job name: \u001b[1;33m${restartJobName}\u001b[0m is defined`
        );
      }
      console.log("All job is defined...!");
    }

    return true;
  } catch (error) {
    console.log("runJobsBySchedule error: ", error);
  }
};

module.exports = runJobsBySchedule;
