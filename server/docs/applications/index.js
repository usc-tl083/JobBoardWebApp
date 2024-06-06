const createApplication = require("./createApplication");
const updateApplication = require("./updateApplication");
const getApplication = require("./getApplication");
const getApplications = require("./getApplications");
const deleteApplication = require("./deleteApplicaiton");
const getUser = require("../users/get-user");
const updateUser = require("../users/update-user");

module.exports = {
    "/applications": {
        ...getApplications,
        ...createApplication,
    },
    "/applications/{id}": {
        ...getApplication,
        ...updateApplication,
        ...deleteApplication,
    },
};
