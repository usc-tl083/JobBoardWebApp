const router = require("express").Router();

const auth = require("./auth");
const swaggerUi = require("swagger-ui-express");
const docs = require("../docs");

router.use("/auth", auth);
router.use("/docs", swaggerUi.serve, swaggerUi.setup(docs));

module.exports = router;
