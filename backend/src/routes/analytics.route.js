const express = require("express");
const router = express.Router();
const analyticsController = require("../controller/analytics.controller.js");
const authenticate = require("../middleware/authenticate.js");

router.get("/dashboard", authenticate, analyticsController.getDashboardAnalytics);

module.exports = router;
