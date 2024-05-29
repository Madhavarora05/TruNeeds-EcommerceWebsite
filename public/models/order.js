const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    username: { type: String, required: true },
    products: [
        {
            productId: { type: String, required: true },
            productName: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    subtotal: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
