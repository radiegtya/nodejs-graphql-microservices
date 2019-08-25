const cote = require('cote')({ redis: { host: 'localhost', port: "6379" } })
const orderService = new cote.Responder({ 
    name: 'Order Service',
    key: 'order'
})

const orderPublisher = new cote.Publisher({
    name: 'Order Publisher',
    // namespace: 'order',
    // key: 'order',
    broadcasts: ['orderCreated'],
})

const productRequester = new cote.Requester({ 
    name: 'Product Requester', 
    key: 'product',
})

const Order = require('./Order')

// orderService.on('*', console.log)
 
orderService.on('index', (req, cb) => {
    Order.find({}, cb)    
})

orderService.on('show', (req, cb) => {
    Order.findById(req._id, cb)    
})

orderService.on('store', (req, cb) => {
    //create order, then update the product stock
    const order = new Order(req.body)
    order.save(cb)
    productRequester.send({ type: 'update', _id: order.productId, body: {$inc: {stock: 1}} })

    // //tell client on ordercreated
    // orderPublisher.publish('orderCreated', order.productId)
})