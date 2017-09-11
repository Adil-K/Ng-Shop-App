const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const sortOn = require('sort-on');
const bodyParser = require('body-parser');
const _ = require('underscore');

let products = require('./items');
const seed = require('./seed');

// app setup
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//
// Products
//

// returning products
// GET /api/products
app.get('/api/products', (req, res) => {
  const page = Number(req.query.page) || 0;
  const pageSize = Number(req.query.pageSize) || 20;
  const sortExpression = req.query.sort;

  // sort
  console.log(sortExpression);
  let selectedProducts = products;
  if (sortExpression) {
    selectedProducts = sortOn(selectedProducts, sortExpression);
  }

  // skip and take
  selectedProducts = selectedProducts.slice(
    page * pageSize,
    page * pageSize + pageSize,
  );

  res.json({ total: products.length, page, pageSize, selectedProducts });
});

// get single product by id
// GET /api/products/1
app.get('/api/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = _.find(products, { id: id });
  if (!product)
    return res
      .status(404)
      .json({ code: 'NotFound', message: 'Product not found' });
  return res.json(product);
});

/* POST /api/products
   {
      "title": "my new product",
      "price": 9.99,
      "stocked": true,
      "desc": "just some text",
      "image": "https://dummyimage.com/300x300.jpg"
   }
*/
app.post('/api/products', (req, res) => {
  // Get resource
  const resource = req.body;
  if (!resource.title || !resource.price) {
    res
      .status(400)
      .json({ code: 'BadRequest', message: 'Missing title and/or price' });
    return;
  }
  // Assign number
  resource.id = new Date().valueOf();

  // Add dummy image when not provided
  if (!resource.image) {
    resource.image = 'https://dummyimage.com/300x300.jpg';
  }

  // Add to users's
  products.push(resource);

  // return resource
  res.status(200).json(resource);
});

/* PUT /api/products/12
  {
    "title": "my new product",
    "price": 9.99,
    "stocked": true,
    "desc": "just some text",
    "image": "https://dummyimage.com/300x300.jpg"
  }
*/
app.put('/api/products/:id', (req, res) => {
  // Get resource
  const resource = req.body;
  console.log('put', req.body);

  // Find and update
  const product = _.findWhere(products, { id: Number(req.params.id) });
  if (!product) {
    return res.json(404, { code: 'NotFound', message: 'Product not found' });
  }

  product.sku = resource.sku;
  product.title = resource.title;
  product.price = resource.price;
  product.basePrice = resource.basePrice;
  product.stocked = resource.stocked;
  product.desc = resource.desc;
  product.image = resource.image;

  return res.status(200).json(product);
});

// DELETE /api/products/1
app.delete('/api/products/:id', (req, res) => {
  const product = _.findWhere(products, { id: Number(req.params.id) });
  if (!product) {
    return res.status(204);
  }

  products = _.without(products, product);
  return res.status(200).json(product);
});

//
// basket
//

// get basket for session
// GET /api/basket
app.get('/api/basket', (req, res) => {
  if (basket.length > 4)
    return res.status(500).json({
      code: 'InteralServerError',
      message: 'Oops, something went wrong',
    });
  res.json(basket);
});

// add product to basket
// POST /api/basket/product/1
// {
//    quantity: 10
// }
app.post('/api/basket/product/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = _.find(products, { id: id });
  if (!product)
    return res
      .status(404)
      .json({ code: 'NotFound', message: 'Product not found' });
  if (!product.stocked)
    return res
      .status(409)
      .json({ code: 'Conflict', message: 'Product not in stock' });
  let quantity = Math.floor(Number(req.body.quantity) || 1);
  const index = _.findIndex(basket, { id: id });
  if (index < 0) basket.push({ id: id, quantity: quantity });
  if (index >= 0) {
    quantity = (basket[index].quantity || 0) + quantity;
    basket[index].quantity = quantity;
  }
  res.status(201).json(basket);
});

// remove product from basket
// DELETE /api/basket/product/46
app.delete('/api/basket/product/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = _.findIndex(basket, { id: id });
  const product = _.find(products, { id: id });
  if (!product || index === -1)
    return res
      .status(404)
      .json({ code: 'NotFound', message: 'Product not found' });
  basket.splice(index, 1);
  res.json(basket);
});

// patch quantity of products in basket
// PATH /api/basket/product/46
// {
//    quantity: 10
// }
app.patch('/api/basket/product/:id', (req, res) => {
  const id = Number(req.params.id);
  const quantity = Math.floor(Number(req.body.quantity)) || 0;
  const index = _.findIndex(basket, { id: id });
  const product = _.find(products, { id: id });
  if (!product)
    return res
      .status(404)
      .json({ code: 'NotFound', message: 'Product not found' });
  if (!product.stocked)
    return res
      .status(409)
      .json({ code: 'Conflict', message: 'Product not in stock' });

  if (index >= 0 && quantity) basket[index].quantity = quantity;
  if (index === -1 && quantity) basket.push({ id: id, quantity: quantity });
  if (quantity == 0) basket.splice(index, 1);

  return res.json(basket);
});

// delete basket
// DELETE /api/basket
app.delete('/api/basket', (req, res) => {
  const previosBasket = basket;
  basket = [];
  res.json(previosBasket);
});

app.all('/api/*', (req, res) =>
  res.status(404).json({
    code: 'NotFound',
    message: 'Resource not found or method not supprted',
  }),
);

//
// listen for requests
//
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(
    `Express server listening on port: http://localhost:${server.address()
      .port}/api/products`,
  );
});