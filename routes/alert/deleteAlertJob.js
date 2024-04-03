const { JOB_TYPES } = require("../../commonConstant");
const { agenda } = require("../../agent/agendaConfig");
const connectDB = require("../../DBConfig");
const { Types } = require("mongoose");

const deleteAlertJob = async (req, res) => {
  const { jobId } = req.params;
  console.log("delete jobs ID: ", jobId);

  try {
    // prepare next schedule for agenda
    const jobData = agenda.cancel({ _id: new Types.ObjectId(jobId) });

    return res.status(200).json({
      status: 200,
      message: "success",
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

module.exports = deleteAlertJob;
