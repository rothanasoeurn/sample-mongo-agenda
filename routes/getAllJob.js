const { JOB_TYPES } = require("../commonConstant");
const { agenda } = require("../agent/agendaConfig");
const moment = require("moment");

const getAllJob = async (req, res) => {
  try {
    const jobData = await agenda.jobs({});
    const jobs = [];
    for (const job of jobData) {
      const date = moment(job.nextRunAt).format("DD/MM/YYYY hh:mm:ss");
      jobs.push({ nextRunDate: date, ...job.attrs });
    }

    return res.status(200).json({
      status: 200,
      message: "success",
      jobData: jobs,
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

module.exports = getAllJob;
