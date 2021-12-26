const { Router } = require("express");

const { signup } = require("../../controllers/auth");

const router = Router();

router.post("/sign-up", signup);

module.exports = router;
