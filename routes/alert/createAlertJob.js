const { JOB_TYPES } = require("../../commonConstant");
const { agenda } = require("../../agent/agendaConfig");
const { defineJob } = require("../../utils/commonUtil");

const createAlertJob = async (req, res) => {
  const { jobName, payload } = req.body;
  try {
    // prepare next schedule for agenda
    const data = payload || {};
    // const jobData = await agenda.schedule("in 1 minutes", jobName, data);
    const jobData = await agenda.every("30 seconds", jobName, data);
    await defineJob(agenda, jobName);
    console.log(`Job name: \u001b[1;33m${jobName}\u001b[0m is defined`);

    return res.status(200).json({
      status: 200,
      message: "success",
      jobName,
      jobData: jobData,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      status: 400,
      message: "unsuccess create job",
      error: err.message,
    });
  }
};

module.exports = createAlertJob;
