const { Router } = require("express");

const { renderSignUp } = require("../../controllers/view/publicController");

const router = Router();

router.get("/sign-up", renderSignUp);

module.exports = router;
