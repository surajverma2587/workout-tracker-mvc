const { Router } = require("express");

const view = require("./view");

const router = Router();

router.use("/", view);

module.exports = router;
