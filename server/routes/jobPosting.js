const router = require("express").Router();
const {
    getAllJobPostings,
    addJobPosting,
    getJobPosting,
    updateJobPosting,
    deleteJobPosting,
} = require("../controllers/jobPosting.controller");

const { createApplication, getUserApplicationDetails } = require("../controllers/application.controller");

const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");
const verifyEmployer = require("../middleware/verifyEmployer");

router
    .route("/")
    .get(getAllJobPostings)
    .post(verifyToken, verifyEmployer, addJobPosting)

router
    .route("/apply")
    .post(verifyToken, createApplication)

router
    .route("/get-user-applications")
    .get(verifyToken, getUserApplicationDetails)

router
    .route("/:id")
    .get(getJobPosting)
    .delete(verifyToken, verifyAdmin, deleteJobPosting)
    .put(verifyToken, verifyAdmin, updateJobPosting)

module.exports = router;