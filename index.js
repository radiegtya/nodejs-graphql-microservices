const express = require('express')
const bodyParser = require('body-parser')
const cote = require('cote')({ redis: { host: 'localhost', port: "6379" } })
const productRequester = new cote.Requester({ 
    name: 'Product Requester', 
    key: 'product',
})
const orderRequester = new cote.Requester({ 
    name: 'Order Requester', 
    key: 'order',
})

const app = express()
app.use(bodyParser.json())

app.get('/products', (req, res)=>{
    productRequester.send({ type: 'index' }, (err, docs) => {
        res.send(docs)
    })
})

app.post('/product', (req, res)=>{
    productRequester.send({ type: 'store', body: req.body })
    res.send('async post')
})

app.get('/orders', (req, res)=>{
    orderRequester.send({ type: 'index' }, (err, docs) => {
        res.send(docs)
    })
})

app.post('/order', (req, res)=>{
    //create the order
    orderRequester.send({ type: 'store', body: req.body }, (err, doc) => {
        res.send(doc)        
    })    
})


app.listen(5000, ()=> {
    console.log('Server listening on port 5000')
})