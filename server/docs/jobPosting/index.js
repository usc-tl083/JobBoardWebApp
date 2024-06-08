const createJobPosting = require("./createJobPosting");
const deleteJobPosting = require("./deleteJobPosting");
const getJobPosting = require("./getJobPosting");
const getJobPostings = require("./getJobPostings");
const updateJobPosting = require("./updateJobPosting");
const applyJob = require("./applyJob");

module.exports = {
    "/job-postings": {
        ...getJobPostings,
        ...createJobPosting,
    },
    "/job-postings/apply": {
        ...applyJob,
    },
    "/job-postings/{id}": {
        ...getJobPosting,
        ...updateJobPosting,
        ...deleteJobPosting,
    }
}