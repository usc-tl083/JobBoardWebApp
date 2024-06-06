const router = require("express").Router();
const {
    getAllApplicaitons,
    getApplication,
    updateApplication,
    deleteApplication,
    createApplication,

} = require("../controllers/application.controller");

const verifyAdmin = require(",,/middleware/verifyAdmin");
const verifyEmployer = require("../middleware/verifyEmployer");
const verifyToken = require("../middleware/verifyToken");

router
    .route("/")
    .get(verifyToken, verifyAdmin, getAllApplicaitons)
    .post(verifyToken, verifyEmployer, createApplication)

router
    .route("/:id")
    .get(verifyToken, getApplication)
    .delete(verifyToken, verifyAdmin, deleteApplication)
    .put(verifyToken, updateApplication)