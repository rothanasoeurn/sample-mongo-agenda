const moment = require("moment");
const { RECURRENCE_TYPE, WEEKLY, MONTHLY } = require("../commonConstant");

const nextSchedule = (recurrenceAt, recurrenceType) => {
  let nextSettlement;

  if (recurrenceType === RECURRENCE_TYPE.WEEKLY) {
    const checkFormat = WEEKLY.includes(recurrenceAt);
    if (!checkFormat) throw new Error("Weekdays is wrong format");

    // prepare next settlement in weekly
    nextSettlement = moment()
      .add(1, "weeks")
      .isoWeekday(recurrenceAt)
      .format("YYYY-MM-DD 00:00:00");
  } else if (recurrenceType === RECURRENCE_TYPE.MONTHLY) {
    const checkFormat = MONTHLY.includes(recurrenceAt);
    if (!checkFormat) throw new Error("Day of month is wrong format");

    // prepare next settlement in monthly
    // monthly has 3 formats (startOfMonth, endOfMonth, 1 - 31)
    if (recurrenceAt === "startOfMonth") {
      nextSettlement = moment()
        .add(1, "months")
        .startOf("month")
        .format("YYYY-MM-DD 00:00:00");
    } else if (recurrenceAt === "endOfMonth") {
      nextSettlement = moment()
        .add(1, "months")
        .endOf("month")
        .format("YYYY-MM-DD 00:00:00");
    } else {
      const datePrepare = moment().format("MMMM/YYYY");
      nextSettlement = moment(new Date(`${recurrenceAt}/${datePrepare}`))
        .add(1, "months")
        .format("YYYY-MM-DD 00:00:00");
    }
  } else if (recurrenceType === RECURRENCE_TYPE.YEARLY) {
    if (recurrenceAt.length !== 4) throw new Error("Year is wrong format");
    nextSettlement = moment(new Date(`01/01/${recurrenceAt}`))
      .add(1, "year")
      .format("YYYY-MM-DD 00:00:00");
  }
  return nextSettlement;
};

const defineJob = async (agenda, jobName) => {
  agenda.define(jobName, async (job) => {
    const time = () => {
      return new Date().toTimeString().split(" ")[0];
    };

    const jobData = job.attrs;
    const date = moment(jobData.nextRunAt).format("DD/MM/YYYY hh:mm:ss");
    console.log(`job name \u001b[1;33m${jobData.name}\u001b[0m is working`);
    console.log("job next run: ", date);
    console.log(`running: ${time()} \n\n\n`);

    // TODO
    // - get data from job
    // - prepare query data
    //   - calculate start from now and end date with
    // - start query
    // - meet condition then send to discord bot
  });
};

module.exports = { nextSchedule, defineJob };
