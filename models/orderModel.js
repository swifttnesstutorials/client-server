const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{ foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food" }, quantity: Number }],
  totalAmount: { type: Number, required: true },
  discount: { type: Number, default: 0 }, // Discount from offer or coupon
  finalAmount: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Preparing", "Delivered", "Cancelled"], default: "Pending" },
});

module.exports = mongoose.model("Order", orderSchema);
