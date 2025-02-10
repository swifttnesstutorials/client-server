const Order = require("../models/orderModel.js");
const Coupon = require("../models/couponModel.js");

// 🛒 Place an Order
exports.placeOrder = async (req, res) => {
  try {
    let { items, totalAmount, couponCode } = req.body;
    let discount = 0;

    console.log("🔹 Order Request Body:", req.body);

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode, isActive: true });
      if (coupon && totalAmount >= coupon.minOrderAmount) {
        discount = Math.min((totalAmount * coupon.discountPercentage) / 100, coupon.maxDiscount);
      }
    }

    const finalAmount = parseFloat((totalAmount - discount).toFixed(2)); 
    const newOrder = new Order({
      userId: req.user.id,
      items,
      totalAmount,
      discount,
      finalAmount,
    });

    await newOrder.save();
    console.log("✅ Order Saved Successfully:", newOrder);

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("❌ Error placing order:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// 📦 Get Logged-in User's Orders
exports.getMyOrders = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    console.log("🔹 Fetching orders for user:", req.user.id);

    const orders = await Order.find({ userId: req.user.id })
      .populate("items.foodId", "name price")
      .sort({ createdAt: -1 });

    console.log("✅ Orders Found:", orders);

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.json({ orders });
  } catch (error) {
    console.error("❌ Error fetching orders:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// ❌ Cancel an Order
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status !== "Pending") {
      return res.status(400).json({ message: "Only pending orders can be canceled" });
    }

    order.status = "Cancelled";
    await order.save();
    res.json({ message: "Order cancelled successfully", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
