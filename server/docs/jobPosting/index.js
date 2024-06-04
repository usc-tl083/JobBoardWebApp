const createJobPosting = require("./createJobPosting");
const deleteJobPosting = require("./deleteJobPosting");
const getJobPosting = require("./getJobPosting");
const getJobPostings = require("./getJobPostings");
const updateJobPosting = require("./updateJobPosting");

module.exports = {
    "/job-postings": {
        ...getJobPostings,
        ...createJobPosting,
    },
    "/job-postings/{id}": {
        ...getJobPosting,
        ...updateJobPosting,
        ...deleteJobPosting,
    }
}