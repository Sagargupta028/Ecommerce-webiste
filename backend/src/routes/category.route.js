const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category.controller");

// Get all categories
router.get("/", categoryController.getAllCategories);

// Get categories by level
router.get("/level/:level", categoryController.getCategoriesByLevel);

// Get categories by parent ID
router.get("/parent/:parentId", categoryController.getCategoriesByParent);

// Initialize categories (for setup)
router.post("/initialize", categoryController.initializeCategories);

module.exports = router;
