const Address = require("../models/address.model.js");
const Order = require("../models/order.model.js");
const OrderItem = require("../models/orderItems.js");
const Product = require("../models/product.model.js");
const cartService = require("../services/cart.service.js")

const createOrder = async (user, shippAddress) => {
  let address;

  if (shippAddress._id) {
    let existAddress = await Address.findById(shippAddress._id);
    address = existAddress;
  } else {
    address = new Address(shippAddress);
    address.user = user;
    await address.save();

    user.address.push(address);
    await user.save();
  }

  const cart = await cartService.findUserCart(user._id);
  const orderItems = [];
  for (const item of cart.cartItems) {
    const orderItem = new OrderItem({
      price: item.price,
      product: item.product,
      quantity: item.quantity,
      size: item.size,
      userId: item.userId,
      discountedPrice: item.discountedPrice,
    });
    const createdOrderItem = await orderItem.save();
    orderItems.push(createdOrderItem);

    // Decrease product quantities immediately when order is created
    const product = await Product.findById(item.product);
    if (product) {
      // Decrease overall quantity
      product.quantity = Math.max(0, product.quantity - item.quantity);
      
      // Decrease size-specific quantity if size exists
      if (item.size && product.sizes && product.sizes.length > 0) {
        const sizeIndex = product.sizes.findIndex(s => s.name === item.size);
        if (sizeIndex !== -1) {
          product.sizes[sizeIndex].quantity = Math.max(0, product.sizes[sizeIndex].quantity - item.quantity);
        }
      }
      
      await product.save();
    }
  }

  const createdOrder = new Order({
    user,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountedPrice: cart.totalDiscountedPrice,
    discounte: cart.discounte,
    totalItem: cart.totalItem,
    shippingAddress: address,
  });

  const savedOrder = await createdOrder.save();
  return savedOrder;
};

const placeOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  order.orderStatus = "PLACED";
  order.paymentDetails.status = "COMPLETED";
  return await order.save();
};

const confirmedOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  order.orderStatus = "CONFIRMED";
  return await order.save();
};

const shipOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  order.orderStatus = "SHIPPED";
  return await order.save();
};

const deliverOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  order.orderStatus = "DELIVERED";
  return await order.save();
};

const cancelledOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  
  // Restore product quantities when order is cancelled (only if order was already placed/confirmed)
  if (order.orderStatus === "PLACED" || order.orderStatus === "CONFIRMED") {
    for (const orderItem of order.orderItems) {
      const product = await Product.findById(orderItem.product._id);
      if (product) {
        // Restore overall quantity
        product.quantity += orderItem.quantity;
        
        // Restore size-specific quantity if size exists
        if (orderItem.size && product.sizes && product.sizes.length > 0) {
          const sizeIndex = product.sizes.findIndex(s => s.name === orderItem.size);
          if (sizeIndex !== -1) {
            product.sizes[sizeIndex].quantity += orderItem.quantity;
          }
        }
        
        await product.save();
      }
    }
  }
  
  order.orderStatus = "CANCELED";
  return await order.save();
};

const findOrderById = async (orderId) => {
  const order = await Order.findById(orderId)
    .populate("user")
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress");
  return order;
};

const usersOrderHistory = async (userId) => {
  try {
    const orders = await Order.find({ user: userId })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllOrders = async (reqQuery = {}) => {
  const { status, sort } = reqQuery;
  
  let query = Order.find()
    .populate({ path: "orderItems", populate: { path: "product" } });
  
  // Filter by status if provided
  if (status && status !== "") {
    query = query.where("orderStatus").equals(status);
  }
  
  // Sort orders
  if (sort) {
    if (sort === "Newest") {
      query = query.sort({ orderDate: -1 });
    } else if (sort === "Older") {
      query = query.sort({ orderDate: 1 });
    }
  } else {
    // Default sort by newest
    query = query.sort({ orderDate: -1 });
  }
  
  const orders = await query.lean();
  const totalOrders = orders.length;
  
  console.log(`Found ${totalOrders} orders (all on one page)`);
  return {
    orders,
    totalPages: 1,
    currentPage: 1,
    totalOrders
  };
};

const deleteOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  await Order.findByIdAndDelete(order._id);
};

module.exports = {
  createOrder,
  placeOrder,
  confirmedOrder,
  shipOrder,
  deliverOrder,
  cancelledOrder,
  findOrderById,
  usersOrderHistory,
  getAllOrders,
  deleteOrder,
};
