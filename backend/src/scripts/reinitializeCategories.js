const mongoose = require('mongoose');
const Category = require('../models/category.model');

const mongoUrl = "mongodb+srv://sagargupta028:Sagar@9097@cluster0.tpyfy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const main = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log('MongoDB connected successfully');

    // Clear existing categories
    await Category.deleteMany({});
    console.log('Cleared existing categories');

    // Create top level categories (Level 1)
    const men = await Category.create({ name: 'Men', level: 1 });
    const women = await Category.create({ name: 'Women', level: 1 });
    const kids = await Category.create({ name: 'Kids', level: 1 });
    console.log('Created top level categories');

    // Create second level categories (Level 2)
    const menClothing = await Category.create({ name: 'Clothing', level: 2, parentCategory: men._id });
    const menAccessories = await Category.create({ name: 'Accessories', level: 2, parentCategory: men._id });
    
    const womenClothing = await Category.create({ name: 'Clothing', level: 2, parentCategory: women._id });
    const womenAccessories = await Category.create({ name: 'Accessories', level: 2, parentCategory: women._id });
    
    const kidsClothing = await Category.create({ name: 'Clothing', level: 2, parentCategory: kids._id });
    const kidsAccessories = await Category.create({ name: 'Accessories', level: 2, parentCategory: kids._id });
    console.log('Created second level categories');

    // Men's Clothing (Level 3)
    await Category.create({ name: 'Mens Kurtas', level: 3, parentCategory: menClothing._id });
    await Category.create({ name: 'Shirt', level: 3, parentCategory: menClothing._id });
    await Category.create({ name: 'Men Jeans', level: 3, parentCategory: menClothing._id });
    await Category.create({ name: 'Sweaters', level: 3, parentCategory: menClothing._id });
    await Category.create({ name: 'T-Shirts', level: 3, parentCategory: menClothing._id });
    await Category.create({ name: 'Jackets', level: 3, parentCategory: menClothing._id });
    await Category.create({ name: 'Activewear', level: 3, parentCategory: menClothing._id });

    // Men's Accessories (Level 3)
    await Category.create({ name: 'Watches', level: 3, parentCategory: menAccessories._id });
    await Category.create({ name: 'Wallets', level: 3, parentCategory: menAccessories._id });
    await Category.create({ name: 'Bags', level: 3, parentCategory: menAccessories._id });
    await Category.create({ name: 'Sunglasses', level: 3, parentCategory: menAccessories._id });
    await Category.create({ name: 'Hats', level: 3, parentCategory: menAccessories._id });
    await Category.create({ name: 'Belts', level: 3, parentCategory: menAccessories._id });

    // Women's Clothing (Level 3)
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

    // Women's Accessories (Level 3)
    await Category.create({ name: 'Watches', level: 3, parentCategory: womenAccessories._id });
    await Category.create({ name: 'Wallets', level: 3, parentCategory: womenAccessories._id });
    await Category.create({ name: 'Bags', level: 3, parentCategory: womenAccessories._id });
    await Category.create({ name: 'Sunglasses', level: 3, parentCategory: womenAccessories._id });
    await Category.create({ name: 'Hats', level: 3, parentCategory: womenAccessories._id });
    await Category.create({ name: 'Belts', level: 3, parentCategory: womenAccessories._id });

    // Kids Clothing (Level 3)
    await Category.create({ name: 'Boys Clothing', level: 3, parentCategory: kidsClothing._id });
    await Category.create({ name: 'Girls Clothing', level: 3, parentCategory: kidsClothing._id });
    await Category.create({ name: 'Kids T-Shirts', level: 3, parentCategory: kidsClothing._id });
    await Category.create({ name: 'Kids Jeans', level: 3, parentCategory: kidsClothing._id });
    await Category.create({ name: 'Kids Dresses', level: 3, parentCategory: kidsClothing._id });

    // Kids Accessories (Level 3)
    await Category.create({ name: 'Kids Bags', level: 3, parentCategory: kidsAccessories._id });
    await Category.create({ name: 'Kids Hats', level: 3, parentCategory: kidsAccessories._id });
    await Category.create({ name: 'Kids Sunglasses', level: 3, parentCategory: kidsAccessories._id });

    console.log('Created third level categories');

    // Verify the structure
    const totalCategories = await Category.countDocuments();
    const level1Count = await Category.countDocuments({ level: 1 });
    const level2Count = await Category.countDocuments({ level: 2 });
    const level3Count = await Category.countDocuments({ level: 3 });

    console.log(`Categories initialized successfully!`);
    console.log(`Total: ${totalCategories}, Level 1: ${level1Count}, Level 2: ${level2Count}, Level 3: ${level3Count}`);

    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

main();
