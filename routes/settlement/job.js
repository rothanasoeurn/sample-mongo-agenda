const { JOB_TYPES } = require("../../commonConstant");
const { agenda } = require("../../agent/agendaConfig");
const nextSchedule = require("../../utils/commonUtil");

const createJob = async (req, res) => {
  const { scheduleId, recurrenceType, recurrenceAt, jobName } = req.query;
  try {
    // prepare next schedule for agenda
    const date = nextSchedule(recurrenceAt, recurrenceType);

    const jobData = await agenda.schedule(date, jobName, {
      scheduleId: scheduleId,
      recurrenceAt,
      type: recurrenceType,
    });

    return res.status(200).json({
      status: 200,
      message: "success",
      jobName,
      schedule: date,
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

module.exports = createJob;
