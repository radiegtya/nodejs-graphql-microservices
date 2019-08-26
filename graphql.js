const { ApolloServer, gql, ApolloError } = require('apollo-server')
const cote = require('cote')({ redis: { host: 'localhost', port: "6379" } })

const productRequester = new cote.Requester({ 
    name: 'Product Requester', 
    key: 'product',
})
const orderRequester = new cote.Requester({ 
    name: 'Order Requester', 
    key: 'order',
})

// setInterval(()=> {
//   console.log(productRequester.sock.queue)
// }, 3000)


const typeDefs = gql`

  type Product {
    _id: String
    title: String
    price: Int
    stock: Int
  }

  type Order {
    _id: String
    productId: String
    product: Product
    userId: String
    qty: Int
    price: Int 
  }

  type Query {
    products: [Product]
    orders: [Order]
    order(_id: String): Order
    product(_id: String): Product
  }

  input ProductInput {
    title: String
    stock: Int
    price: Int 
  }

  input OrderInput {
    productId: String
    userId: String
    qty: Int
    price: Int 
  }

  type Mutation {
    createProduct(input: ProductInput): Product
    createOrder(input: OrderInput): Order
  }
`

const resolvers = {
  Query: {
    products: async () => {
        return await productRequester.send({ type: 'index' })
    },
    orders: async () => {
        return await orderRequester.send({ type: 'index' })
    },
    order: async (_, { _id }) => {
        return await orderRequester.send({ type: 'show', _id })
    },
    product: async (_, { _id }) => {
        return await productRequester.send({ type: 'show', _id })
    }
  },
  Order: {
    product: async (order) => {
        return await productRequester.send({ type: 'show', _id: order.productId })
    }
  },  
  Mutation: {
    createProduct: async (_, { input })=> {
      return await productRequester.send({ type: 'store', body: input }) 
    },
    createOrder: async (_, { input })=> {
        return await orderRequester.send({ type: 'store', body: input })
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})