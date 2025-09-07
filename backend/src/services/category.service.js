const Category = require("../models/category.model");

// Get all categories
const getAllCategories = async () => {
  try {
    const categories = await Category.find({}).populate('parentCategory');
    return categories;
  } catch (error) {
    throw new Error(`Error fetching categories: ${error.message}`);
  }
};

// Get categories by level (1 = top level, 2 = second level, 3 = third level)
const getCategoriesByLevel = async (level) => {
  try {
    const categories = await Category.find({ level }).populate('parentCategory');
    return categories;
  } catch (error) {
    throw new Error(`Error fetching categories by level: ${error.message}`);
  }
};

// Get child categories by parent ID
const getCategoriesByParent = async (parentId) => {
  try {
    const categories = await Category.find({ parentCategory: parentId }).populate('parentCategory');
    return categories;
  } catch (error) {
    throw new Error(`Error fetching child categories: ${error.message}`);
  }
};

// Initialize category structure
const initializeCategories = async () => {
  try {
    // Clear existing categories and reinitialize
    await Category.deleteMany({});
    console.log('Cleared existing categories');

    // Create top level categories (Level 1)
    const men = await Category.create({ name: 'Men', level: 1 });
    const women = await Category.create({ name: 'Women', level: 1 });
    const kids = await Category.create({ name: 'Kids', level: 1 });

    // Create second level categories (Level 2)
    const menClothing = await Category.create({ name: 'Clothing', level: 2, parentCategory: men._id });
    const menAccessories = await Category.create({ name: 'Accessories', level: 2, parentCategory: men._id });
    
    const womenClothing = await Category.create({ name: 'Clothing', level: 2, parentCategory: women._id });
    const womenAccessories = await Category.create({ name: 'Accessories', level: 2, parentCategory: women._id });
    
    const kidsClothing = await Category.create({ name: 'Clothing', level: 2, parentCategory: kids._id });
    const kidsAccessories = await Category.create({ name: 'Accessories', level: 2, parentCategory: kids._id });

    // Create third level categories (Level 3) - Men's Clothing
    await Category.create({ name: 'Mens Kurtas', level: 3, parentCategory: menClothing._id });
    await Category.create({ name: 'Shirt', level: 3, parentCategory: menClothing._id });
    await Category.create({ name: 'Men Jeans', level: 3, parentCategory: menClothing._id });
    await Category.create({ name: 'Sweaters', level: 3, parentCategory: menClothing._id });
    await Category.create({ name: 'T-Shirts', level: 3, parentCategory: menClothing._id });
    await Category.create({ name: 'Jackets', level: 3, parentCategory: menClothing._id });
    await Category.create({ name: 'Activewear', level: 3, parentCategory: menClothing._id });

    // Men's Accessories
    await Category.create({ name: 'Watches', level: 3, parentCategory: menAccessories._id });
    await Category.create({ name: 'Wallets', level: 3, parentCategory: menAccessories._id });
    await Category.create({ name: 'Bags', level: 3, parentCategory: menAccessories._id });
    await Category.create({ name: 'Sunglasses', level: 3, parentCategory: menAccessories._id });
    await Category.create({ name: 'Hats', level: 3, parentCategory: menAccessories._id });
    await Category.create({ name: 'Belts', level: 3, parentCategory: menAccessories._id });

    // Women's Clothing
    await Category.create({ name: 'Tops', level: 3, parentCategory: womenClothing._id });
    await Category.create({ name: 'Dresses', level: 3, parentCategory: womenClothing._id });
    await Category.create({ name: 'Women Jeans', level: 3, parentCategory: womenClothing._id });
    await Category.create({ name: 'Lengha Choli', level: 3, parentCategory: womenClothing._id });
    await Category.create({ name: 'Sweaters', level: 3, parentCategory: womenClothing._id });
    await Category.create({ name: 'T-Shirts', level: 3, parentCategory: womenClothing._id });
    await Category.create({ name: 'Jackets', level: 3, parentCategory: womenClothing._id });
    await Category.create({ name: 'Gouns', level: 3, parentCategory: womenClothing._id });
    await Category.create({ name: 'Sarees', level: 3, parentCategory: womenClothing._id });
    await Category.create({ name: 'Kurtas', level: 3, parentCategory: womenClothing._id });

    // Women's Accessories (same as men's)
    await Category.create({ name: 'Watches', level: 3, parentCategory: womenAccessories._id });
    await Category.create({ name: 'Wallets', level: 3, parentCategory: womenAccessories._id });
    await Category.create({ name: 'Bags', level: 3, parentCategory: womenAccessories._id });
    await Category.create({ name: 'Sunglasses', level: 3, parentCategory: womenAccessories._id });
    await Category.create({ name: 'Hats', level: 3, parentCategory: womenAccessories._id });
    await Category.create({ name: 'Belts', level: 3, parentCategory: womenAccessories._id });

    // Kids categories (similar structure)
    await Category.create({ name: 'Boys Clothing', level: 3, parentCategory: kidsClothing._id });
    await Category.create({ name: 'Girls Clothing', level: 3, parentCategory: kidsClothing._id });
    await Category.create({ name: 'Kids T-Shirts', level: 3, parentCategory: kidsClothing._id });
    await Category.create({ name: 'Kids Jeans', level: 3, parentCategory: kidsClothing._id });
    await Category.create({ name: 'Kids Dresses', level: 3, parentCategory: kidsClothing._id });

    // Kids Accessories
    await Category.create({ name: 'Kids Bags', level: 3, parentCategory: kidsAccessories._id });
    await Category.create({ name: 'Kids Hats', level: 3, parentCategory: kidsAccessories._id });
    await Category.create({ name: 'Kids Sunglasses', level: 3, parentCategory: kidsAccessories._id });

    console.log('Categories initialized successfully');
  } catch (error) {
    console.error('Error initializing categories:', error);
    throw error;
  }
};

module.exports = {
  getAllCategories,
  getCategoriesByLevel,
  getCategoriesByParent,
  initializeCategories
};
