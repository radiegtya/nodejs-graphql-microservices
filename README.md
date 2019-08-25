# NodeJS GraphQL Microservices

Example of using NodeJS for Microservices using GraphQL. If you are not familiar with GraphQL, you can find the Simple API example to give you basic understanding about this repo.

## Features

This is how good microservices should do, we cover it all in this repo! Thanks to cote (https://github.com/dashersw/cote)

- Zero dependency: Microservices with only JavaScript and Node.js
- Zero-configuration: no IP addresses, no ports, no routing to configure
- Decentralized: No fixed parts, no "manager" nodes, no single point of failure
- Auto-discovery: Services discover each other without a central bookkeeper
- Fault-tolerant: Don't lose any requests when a service is down
- Scalable: Horizontally scale to any number of machines
- Performant: Process thousands of messages per second
- Humanized API: Extremely simple to get started with a reasonable API!

## Prerequisites

- Nodejs
- Redis 
- MongoDB
- Docker (optional) I am too lazy to include the docker setup here

## Setup

- run redis on default port 6379
- run mongodb on default port 27017
- open the project file, then run the main GraphQL/API Gateway
```
$ npm install
$ node graphql.js #for graphql example
$ node index.js #for express API example (if You are not familiar with GraphQL but still want to understand this repo :3)
```
- run the product-service
```
$ cd product-service
$ npm install
$ node ProductService.js
```
- run the order-service
```
$ cd order-service
$ npm install
$ node OrderService.js
```

## Example

**The example consists of Gateway (GraphQL/API) which is query are auto discover its microservices across the network (thanks to cote redis). Its just simple DUMMY app (don't expect much! Simple is better). The study case is product and orders. To fulfill the FAULT TOLERANT and SERVICE DISCOVERY scenario, You can reproduce it by:**

- Run API on (graphql.js/index.js), order-service, and product-service
- Execute API using GraphQL createOrder or express POST /order
```graphql
mutation createOrder($order: OrderInput){
  createOrder (input: $order) {
    _id
    qty
    price
    product{
      title
    }
  }
}
```
- Check the result, and it should create order, and update the product stock
- Try disconnect product-service
- Execute APi AGAIN using GraphQL createOrder or express POST /order
- The API Return something and works fine, BUT
- The product data is not updated (its normal because product-service still down)
- RERUN product-service ($ cd product-service && node ProductService.js)
- It should automatically update the product stock when the product-service is UP!! 

**To give You understanding about how to make DB RELATION alike across multi services, You can reproduce it by:**

- Run API on (graphql.js/index.js), order-service, and product-service
- Execute the orders API via GraphQL or Express GET /orders
```graphql
query {
  orders {
    _id
    product {
      title
    }
    qty
    price
  }
}
```
- You will see that, product can be fetched from order, although product is on different service

COOL EH???!!

## Attention!!!

- This example still using single database (this is not OP in microservice world), but You can simply use multiple database that runs on each services. The example already separate the db connection logic on each service.
- The case study is not real world implementation, it only to give you basic understanding of HOW microservices, service discovery, fault tolerant, etc etc etc just works :3
- Use docker to make the service UP again automatically when down, simplified setup, etc. I was not using docker to make this repo as simple as possible.