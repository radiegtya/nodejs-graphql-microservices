const mongoose = require('./mongoose')

const Order = mongoose.model('Order', {
    productId : mongoose.Types.ObjectId,
    userId : mongoose.Types.ObjectId,
    qty: Number,
    price: Number
})

module.exports = Order