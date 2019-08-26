const cote = require('cote')({ redis: { host: 'localhost', port: "6379" } })
const productService = new cote.Responder({ 
    name: 'Product Service',
    key: 'product'
})
// const orderSubscriber = new cote.Subscriber({
//     name: 'Order Subscriber',
//     // namespace: 'rnd',
//     // key: 'a certain key',
//     subscribesTo: ['orderCreated'],
// })
// const productRequester = new cote.Requester({ 
//     name: 'Product Requester', 
//     key: 'product',
// })

const Product = require('./Product')

// productService.on('*', console.log)
 
productService.on('index', (req, cb) => {
    Product.find({}, cb)    
})

productService.on('show', (req, cb) => {
    Product.findById(req._id, cb)    
})

productService.on('store', (req, cb) => {
    const product = new Product(req.body)
    product.save(cb)
})

productService.on('update', async (req, cb) => {
    Product.update(
        {_id: req._id},
        req.body        
    , cb)
})

// //subscribe
// orderSubscriber.on('orderCreated', (productId) => {
//     console.log('PRODUCT_ID', productId)
//     productRequester.send({ type: 'update', _id: productId, body: {$inc: {stock: 1}} })
// })