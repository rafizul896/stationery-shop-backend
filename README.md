# Stationery Shop Backend

## Overview

The **Stationery Shop Backend** is a robust backend solution developed using **Express.js** and **TypeScript**, designed to manage stationery products and customer orders efficiently. It leverages **MongoDB** with **Mongoose** for seamless data handling, ensuring efficient inventory management, order processing, and revenue calculation. 

## Features

### Core Features

- **Stationery Product Management**:
  - Create, retrieve, update, and delete stationery products.
  - Search products by name, brand, or category.
- **Order Management**:
  - Place orders for stationery products.
  - Automatically update inventory based on orders.
  - Handle out-of-stock scenarios.
- **Revenue Calculation**:
  - Compute total revenue from all orders.

### Additional Features

- **Comprehensive Error Handling**:
  - Structured error responses for validation errors, authentication failures, and unexpected server issues.
  - Ensures consistent and user-friendly error messaging.
- **Authentication & Authorization**:
  - **JWT-based authentication** to secure operations.
  - **Role-based access control (RBAC)** differentiating between Admin and User permissions.
- **Data Validation**:
  - Mongoose schema validation ensures data integrity for products and orders.
- **Payment Integration**:
  - Supports **SurjoPay, AmaarPay, SSLCommerz, Stripe**, or other payment gateways.
- **Pagination Support**:
  - Implemented for product listings and order retrieval.
- **TypeScript Support**:
  - Ensures type safety for a better development experience and fewer runtime errors.

---

## Project Structure

```bash
Stationery_Shop/
├── dist/                        # Compiled TypeScript files
├── node_modules/                # Project dependencies
├── src/                         # Source code folder
│   ├── app/                     # Application logic
│   │   ├── config/              # Configuration files
│   │   │   └── createErrorRes.ts  # Utility for structured error responses
│   │   ├── modules/             # Feature-based modules
│   │   │   ├── order/           # Order module
│   │   │   │   ├── order.controller.ts   # Controller for order logic
│   │   │   │   ├── order.interface.ts    # Interfaces for order types
│   │   │   │   ├── order.model.ts        # Database model for orders
│   │   │   │   ├── order.route.ts        # API routes for orders
│   │   │   │   └── order.service.ts      # Business logic for orders
│   │   │   ├── products/        # Products module
│   │   │   │   ├── products.controller.ts   # Controller for product logic
│   │   │   │   ├── products.interface.ts    # Interfaces for product types
│   │   │   │   ├── products.model.ts        # Database model for products
│   │   │   │   ├── products.route.ts        # API routes for products
│   │   │   │   └── products.service.ts      # Business logic for products
│   ├── app.ts                   # Main application setup
│   ├── server.ts                # Server initialization file
├── .env                         # Environment variables
├── .gitignore                   # Git ignored files
├── .prettierrc                  # Prettier configuration
├── .prettierignore              # Prettier ignored files
├── eslint.config.mjs            # ESLint configuration
├── package.json                 # Project metadata and dependencies
├── package-lock.json            # Dependency lockfile
├── tsconfig.json                # TypeScript configuration
```

---

## API Endpoints

### Product Endpoints

- **Create Product**: `POST /api/products`
- **Get All Products**: `GET /api/products`
- **Get Product by ID**: `GET /api/products/:productId`
- **Update Product**: `PUT /api/products/:productId`
- **Delete Product**: `DELETE /api/products/:productId`

### Order Endpoints

- **Place an Order**: `POST /api/orders`
- **Calculate Revenue**: `GET /api/orders/revenue`

---

## Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/rafizul896/stationery-shop-server.git
cd stationery-shop-server
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Setup Environment Variables

Create a `.env` file and configure it with:

```bash
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb://localhost:27017/stationery_shop
JWT_SECRET=your_secret_key
```

### Step 4: Build the Project

Compile TypeScript files into JavaScript:

```bash
npm run build
```

### Step 5: Start the Server

#### Development Mode (Auto-restarts on changes):
```bash
npm run start:dev
```

#### Production Mode:
```bash
npm run start:prod
```

### Step 6: Access the API

Use Postman or a browser:

```bash
http://localhost:5000/api
```

---

## Error Handling

### **Standard Error Response Format**

```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400,
  "error": {
    "details": "Additional error details, if applicable"
  },
  "stack": "Error stack trace, if available"
}
```

### **API Response Format**

```javascript
{ 
    "success": true,
    "message": Responce is successfully,
    "meta": {
        "page": number,
        "limit": number,
        "total": number,
      "totalPage": number
      },
    "data": [],
};
```

---

## Authentication & Authorization

- **User Registration & Login**:
  - Secure password hashing.
  - JWT-based authentication.
  - Role-based access control.
- **Protected Routes**:
  - Admins manage products and orders.
  - Users can place orders and view history.

---

## Database Schema

- **Users** (roles: user, admin)
- **Products** (name, brand, price, model, stock, etc.)
- **Orders** (linked to user, product details, total price, status)

---

## Security & Middleware

- **Authentication Middleware**:
  - Protects private routes such as checkout and admin dashboard.
- **Secure API Endpoints**:
  - Implements authentication and authorization checks.

---

**Developed with using Express, TypeScript & MongoDB.**

