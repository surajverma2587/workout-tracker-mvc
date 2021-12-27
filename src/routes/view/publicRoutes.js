const { Router } = require("express");

const {
  renderSignUp,
  renderLogin,
} = require("../../controllers/view/publicController");

const router = Router();

router.get("/sign-up", renderSignUp);
router.get("/login", renderLogin);

module.exports = router;
