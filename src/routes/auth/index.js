const { Router } = require("express");

const { signup, login } = require("../../controllers/auth");

const router = Router();

router.post("/sign-up", signup);
router.post("/login", login);

module.exports = router;
