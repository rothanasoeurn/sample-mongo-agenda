const ENV = {
  MONGODB_USERNAME: "app_settlement_user",
  MONGODB_PASSWORD: "NrD17FG3",
  MONGODB_CONNECTION_URI:
    "localhost:27017/app_settlement?retryWrites=true&w=majority",
};
const JOB_TYPES = {
  NEXT_SETTLEMENT_JOB: "nextSettlementJob",
};

const RECURRENCE_TYPE = {
  WEEKLY: "weekly",
  MONTHLY: "monthly",
  YEARLY: "yearly",
};

const WEEKLY = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const MONTHLY = [
  "startOfMonth",
  "endOfMonth",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
];

module.exports = { ENV, JOB_TYPES, RECURRENCE_TYPE, WEEKLY, MONTHLY };
