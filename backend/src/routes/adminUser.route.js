const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller.js");
const authenticate = require("../middleware/authenticate");

// DELETE: /api/admin/users/:userId
router.delete("/:userId", authenticate, userController.deleteUser);

module.exports = router;
