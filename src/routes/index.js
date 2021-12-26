const { Router } = require("express");

const auth = require("./auth");
const view = require("./view");

const router = Router();

router.use("/auth", auth);
router.use("/", view);

module.exports = router;
