const auth = require("./auth");
const users = require("./users");
const jobPosting = require("./jobPosting");

module.exports = {
  paths: {
    ...auth,
    ...users,
    ...jobPosting,
  },
};
