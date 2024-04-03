const { JOB_TYPES } = require("../../commonConstant");
const { agenda } = require("../../agent/agendaConfig");

const cancelJob = async (req, res) => {
  const { jobName } = req.query;
  try {
    agenda.cancel({ name: jobName });
    return res.status(200).json({
      status: 200,
      message: "Cancel success",
      jobName,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = cancelJob;
