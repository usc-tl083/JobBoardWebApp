const router = require("express").Router();
const { verify } = require("crypto");
const {
    getAllJobPostings,
    addJobPosting,
    getJobPosting,
    getJobPostingByEmployerId,
    getJobPostingByJobType,
    getJobPostingByTitle,
    getJobPostingsByLocation,
    updateJobPosting,
    deleteJobPosting,
} = require("../controllers/jobPosting.controller");

const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");

router
    .route("/")
    .get(getAllJobPostings)
    .post(verifyToken, verifyAdmin, addJobPosting)

router
    .route("/:slug")

router
    .route("/:id")
    .get(getJobPosting)
    .delete(verifyToken, verifyAdmin, deleteJobPosting)
    .put(verifyToken, verifyAdmin, updateJobPosting)


module.exports = router;