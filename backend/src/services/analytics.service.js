const Order = require("../models/order.model.js");
const Product = require("../models/product.model.js");
const User = require("../models/user.model.js");

// Get dashboard analytics
const getDashboardAnalytics = async () => {
  try {
    // Get current date and calculate date ranges
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfLastWeek = new Date(new Date().setDate(new Date().getDate() - new Date().getDay() - 7));
    
    // Total counts
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    
    // Monthly data
    const monthlyOrders = await Order.find({
      createdAt: { $gte: startOfMonth }
    });
    
    const lastMonthOrders = await Order.find({
      createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth }
    });
    
    // Calculate total revenue from all orders
    const allOrders = await Order.find({});
    const totalRevenue = allOrders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
    
    // Calculate monthly revenue
    const monthlyRevenue = monthlyOrders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
    const lastMonthRevenue = lastMonthOrders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
    
    // Calculate growth percentages
    const revenueGrowth = lastMonthRevenue > 0 ? 
      ((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue * 100).toFixed(1) : 0;
    
    const orderGrowth = lastMonthOrders.length > 0 ? 
      ((monthlyOrders.length - lastMonthOrders.length) / lastMonthOrders.length * 100).toFixed(1) : 0;
    
    // Weekly sales data for charts
    const weeklyData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));
      
      const dayOrders = await Order.find({
        createdAt: { $gte: startOfDay, $lte: endOfDay }
      });
      
      const dayRevenue = dayOrders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
      weeklyData.push(Math.round(dayRevenue / 1000)); // Convert to thousands
    }
    
    // Order status counts
    const orderStatusCounts = await Order.aggregate([
      {
        $group: {
          _id: "$orderStatus",
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Category-wise earnings
    const categoryEarnings = await Order.aggregate([
      { $unwind: "$orderItems" },
      {
        $lookup: {
          from: "products",
          localField: "orderItems.product",
          foreignField: "_id",
          as: "productInfo"
        }
      },
      { $unwind: "$productInfo" },
      {
        $lookup: {
          from: "categories",
          localField: "productInfo.category",
          foreignField: "_id",
          as: "categoryInfo"
        }
      },
      { $unwind: "$categoryInfo" },
      {
        $group: {
          _id: "$categoryInfo.name",
          totalEarnings: { $sum: "$orderItems.price" },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { totalEarnings: -1 } },
      { $limit: 3 }
    ]);
    
    return {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      monthlyRevenue,
      monthlyOrders: monthlyOrders.length,
      revenueGrowth: parseFloat(revenueGrowth),
      orderGrowth: parseFloat(orderGrowth),
      weeklyData,
      orderStatusCounts,
      categoryEarnings
    };
    
  } catch (error) {
    throw new Error(`Analytics service error: ${error.message}`);
  }
};

module.exports = {
  getDashboardAnalytics
};
