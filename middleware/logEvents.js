const date = require("date-fns");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (payload, fileName) => {
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    const time = date.format(new Date(), "HH:MM:ss\tdd/MM/yyyy");
    const text = `${time} - ${payload}\n`;
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", fileName),
      text,
    );
  } catch (error) {
    console.log(error);
  }
};

const logRequests = (req, res, next) => {
  const payload = `Method:${req.method} , URL:${req.url} , Origin:${req.headers.origin}`;
  logEvents(payload, "requestLogs.txt");
  next();
};

module.exports = { logEvents, logRequests };
