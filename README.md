# Shopify Product Sync Application

## BACKEND

## Overview

This project is a Shopify integration backend application that synchronizes products between a Shopify store and a local MongoDB database.

## The application supports:

Admin Authentication for Dashboard

Fetching products from Shopify

Fetching Shopify Access Token

Creating products in Shopify and storing them locally

Updating products in Shopify and syncing locally

Deleting products from Shopify and removing them locally

Webhook handling for automatic product synchronization

Creating products locally and syncing in Shopify

Updating products locally and syncing in Shopify

Deleting products locally and syncing in Shopify

Pagination support for product retrieval

This project demonstrates full CRUD operations with Shopify Admin API and proper backend architecture.

## Tech Stack

1. Node.js

2. Express.js

3. MongoDB with Mongoose

4. Shopify Admin REST API

5. Axios

6. Json Web Token

7. Bcrypt for password hashing

8. Ngrok for local development webhook testing

## Project Structure

backend/
│
├── config/
│ ├── db.config.js
│ ├── env.config.js
│ └── shopify.config.js
│
├── controller/
├── admin.controller.js
│ ├── product.controller.js
│ ├── product-webhook.controller.js
│ └── token.controller.js
│
├── model/
├── admin.model.js
│ ├── product.model.js
│ └── token.model.js
│
├── route/
├── admin.route.js
│ ├── product.route.js
│ ├── product-webhook.route.js
│ └── token.route.js
│
├── util/
│ └── fetch-products.util.js
│
├── app.js
├── server.js
└── package.json

## Features

1. Get Products from Shopify

Fetches products directly from Shopify store using Admin API.

Endpoint:

GET /get-all-shopify-products

2. Get Products from Local Database

Fetches stored products from MongoDB with pagination support.

Endpoint:

GET /get-all-products?page=1&limit=10

3. Create Product

Creates a product in Shopify and stores it in the local database.

Endpoint:

POST /create-product

Required Fields:

title

body_html (optional)

vendor (optional)

product_type (optional)

4. Update Product

Updates product in Shopify and synchronizes changes in local database.

Endpoint:

PUT /update-product?id=

?id represents shopifyProductId

5. Delete Product

Deletes product from Shopify and removes it from local database.

Endpoint:

DELETE /delete-product?id

?id represents shopifyProductId

6. Webhook Integration

The application listens to Shopify webhooks:

Product Create

Product Update

Product Delete

## Environment Variables

Create a .env file in backend folder:
PORT=
MONGO_URI=
SHOPIFY_API_KEY=
SHOPIFY_API_SECRET=
HOST=
SHOP_DOMAIN=
SHOPIFY_ACCESS_TOKEN=
ADMIN_TOKEN_SECRET_KEY=

## Installation

1. Clone the repository
   git clone <repository-url>

2. Install dependencies
   npm install

3. Add environment variables in .env

4. Start the server
   npm run dev

5. Server will run on:
   http://localhost:4500

## Webhook Setup (Development)

Use ngrok to expose local server:
ngrok http 4500

# API Documentation

## Base URL

https://your-ngrok-url

WEBHOOK URLs:
/api/webhooks/product-create
/api/webhooks/product-update
/api/webhooks/product-delete

LOCAL API TEST URLs:

1. Admin Sign Up
   Endpoint: /admin/sign-up
   Method: POST
   Description: Sign up admin into local database
   Body : {adminName, adminEmail, adminPassword}

2. Admin Sign In
   Endpoint: /admin/sign-in
   Method: POST
   Description: Sign in admin into local database
   Body : {adminEmail, adminPassword}

3. Admin Log Out
   Endpoint: /admin/logout
   Method: GET
   Description: Sign out admin

4. Load Current Logged In Admin
   Endpoint: /admin/load-current-logged-admin
   Method: GET
   Description: Load data of currently logged in admin

5. Create Product Locally For Shopify Store
   Endpoint: /products/create-product
   Method: POST
   Description: Create product locally and sync product on shopify store
   Body : {
   title: "",
   body_html: "",
   product_type: ""
   }

6. Update Product Locally For Shopify Store
   Endpoint: /products/update-product?id=
   ?id represents shopifyProductId
   Method: PUT
   Description: Update product locally and sync product on shopify store
   Body : {
   title: "",
   body_html: "",
   product_type: ""
   }

7. Delete Product Locally For Shopify Store
   Endpoint: /products/delete-product?id=
   ?id represents shopifyProductId
   Method: DELETE
   Description: Delete product locally and sync product on shopify store

8. Get All Products From Local Database
   Endpoint: products/get-all-products?page=1&limit=11
   ?page represents current page
   ?limit represents current page limit
   Method: GET
   Description: Fetch all the products from the local database

9. Fetch All Product Form Shopify Store
   Endpoint: /products/get-all-shopify-products
   Method: GET
   Description: Fetch all the products from shopify store and saved it into local database

## FRONTEND

TODO

GOOD LUCK 🙂
