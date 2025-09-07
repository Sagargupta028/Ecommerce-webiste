const mongoose = require('mongoose');
const Category = require('../models/category.model');

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URL || "mongodb+srv://sagargupta028:Sagar@9097@cluster0.tpyfy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(mongoUrl);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const initializeCategories = async () => {
  try {
    // Clear existing categories and reinitialize
    await Category.deleteMany({});
    console.log('Cleared existing categories');

    console.log('Initializing categories...');

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

    // Kids categories
    await Category.create({ name: 'Boys Clothing', level: 3, parentCategory: kidsClothing._id });
    await Category.create({ name: 'Girls Clothing', level: 3, parentCategory: kidsClothing._id });
    await Category.create({ name: 'Kids T-Shirts', level: 3, parentCategory: kidsClothing._id });
    await Category.create({ name: 'Kids Jeans', level: 3, parentCategory: kidsClothing._id });
    await Category.create({ name: 'Kids Dresses', level: 3, parentCategory: kidsClothing._id });

    // Kids Accessories
    await Category.create({ name: 'Kids Bags', level: 3, parentCategory: kidsAccessories._id });
    await Category.create({ name: 'Kids Hats', level: 3, parentCategory: kidsAccessories._id });
    await Category.create({ name: 'Kids Sunglasses', level: 3, parentCategory: kidsAccessories._id });

    console.log('Categories initialized successfully!');
    console.log('Total categories created:', await Category.countDocuments());
  } catch (error) {
    console.error('Error initializing categories:', error);
    throw error;
  }
};

const main = async () => {
  await connectDB();
  await initializeCategories();
  await mongoose.connection.close();
  console.log('Database connection closed');
  process.exit(0);
};

main().catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});
