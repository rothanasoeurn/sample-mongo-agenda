const { JOB_TYPES } = require("../commonConstant");
const nexSchedule = require("../utils/commonUtil");
// const { agenda } = require("../agent/agendaConfig");

const settlementJob = async (agenda) => {
  const time = () => {
    return new Date().toTimeString().split(" ")[0];
  };
  agenda.define(JOB_TYPES.NEXT_SETTLEMENT_JOB, async (job) => {
    const { scheduleId, type, recurrenceAt } = job.attrs.data;
    console.log("Job name: ", job.attrs.name);

    console.log("Data: ", scheduleId, type, recurrenceAt);

    const nextDate = await nexSchedule(recurrenceAt, type);
    console.log("nextDate", nextDate);

    // await agenda.schedule(nextDate, job.attrs.name, {
    //   scheduleId: scheduleId,
    //   date: nextDate,
    //   type: type,
    // });
    console.log("nextSettlementJob running: ", scheduleId, ` -- ${time()}`);
    console.log(
      "-----------------------------------------------------------------"
    );
    console.log(" ");
  });
};

module.exports = settlementJob;
