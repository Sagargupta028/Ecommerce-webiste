const categoryService = require("../services/category.service");

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    return res.status(200).send(categories);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getCategoriesByLevel = async (req, res) => {
  try {
    const { level } = req.params;
    const categories = await categoryService.getCategoriesByLevel(parseInt(level));
    return res.status(200).send(categories);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getCategoriesByParent = async (req, res) => {
  try {
    const { parentId } = req.params;
    const categories = await categoryService.getCategoriesByParent(parentId);
    return res.status(200).send(categories);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const initializeCategories = async (req, res) => {
  try {
    await categoryService.initializeCategories();
    return res.status(200).send({ message: 'Categories initialized successfully' });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoriesByLevel,
  getCategoriesByParent,
  initializeCategories
};
