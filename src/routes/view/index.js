const { Router } = require("express");

const publicRoutes = require("./publicRoutes");

const router = Router();

router.use(publicRoutes);

module.exports = router;
