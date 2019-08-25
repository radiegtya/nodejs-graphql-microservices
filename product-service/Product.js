const mongoose = require('./mongoose')

const Product = mongoose.model('Product', {
    title : String,
    price: Number,
    stock: Number
})

module.exports = Product