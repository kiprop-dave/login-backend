const { logEvents } = require("./logEvents");

const logErrors = (err, req, res, next) => {
  const payload = `${err.name}:${err.message}`;
  logEvents(payload, "errorLog.txt");
  res.status(500).send(err.message);
};

module.exports = logErrors;
