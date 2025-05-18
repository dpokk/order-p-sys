# Order Processing Backend API Documentation

## Project Overview
Order Processing Backend is a Node.js application built with Express and MySQL that provides RESTful API endpoints for managing products, customers, orders, and order items.

## Technology Stack
- **Node.js**: JavaScript runtime
- **Express**: Web framework for building APIs
- **MySQL**: Database for storing application data
- **dotenv**: For environment variable management

## Directory Structure
```
order-processing-backend/
├── package.json            # Project configuration and dependencies
├── src/                    # Source code
│   ├── app.js              # Main application entry point
│   ├── config/             # Configuration files
│   │   ├── database.js     # Database connection setup
│   │   └── config.js       # Application configuration
│   ├── controllers/        # Request handlers
│   │   ├── productController.js
│   │   ├── customerController.js
│   │   ├── orderController.js
│   │   └── orderItemController.js
│   ├── models/             # Database models
│   │   ├── Product.js
│   │   ├── Customer.js
│   │   ├── Order.js
│   │   └── OrderItem.js
│   ├── routes/             # API route definitions
│   │   ├── productRoutes.js
│   │   ├── customerRoutes.js
│   │   ├── orderRoutes.js
│   │   └── orderItemRoutes.js
│   ├── services/           # Business logic services
│   │   └── orderService.js
│   ├── middlewares/        # Express middlewares
│   └── utils/              # Utility functions
```

## Database Configuration
The database connection is configured in `src/config/database.js`. The system uses environment variables for database credentials:
- DB_HOST: Database host
- DB_USER: Database username
- DB_PASS: Database password
- DB_NAME: Database name
- DB_PORT: Database port (defaults to 3306)

## API Endpoints

### Products

| Method | Endpoint             | Description                    | Request Body                      | Response                      |
|--------|----------------------|--------------------------------|-----------------------------------|-------------------------------|
| POST   | /products            | Create a new product           | `{ name, price }`                 | Created product information   |
| GET    | /products            | Get all products               | -                                 | Array of all products         |
| GET    | /products/:productId | Get product by ID              | -                                 | Single product object         |
| PUT    | /products/:productId | Update product                 | `{ name, price }`                 | Updated product information   |
| DELETE | /products/:productId | Delete product                 | -                                 | Deletion confirmation         |

### Customers

| Method | Endpoint               | Description                  | Request Body                      | Response                      |
|--------|------------------------|------------------------------|-----------------------------------|-------------------------------|
| POST   | /customers             | Create a new customer        | `{ name, email, phone }`          | Created customer information  |
| GET    | /customers/:email      | Get customer by email        | -                                 | Single customer object        |
| PUT    | /customers/:customerId | Update customer              | `{ name, email, phone }`          | Updated customer information  |
| DELETE | /customers/:customerId | Delete customer              | -                                 | Deletion confirmation         |

### Orders

| Method | Endpoint                     | Description                    | Request Body                      | Response                      |
|--------|------------------------------|--------------------------------|-----------------------------------|-------------------------------|
| POST   | /orders                      | Create a new order             | `{ customerId, totalAmount }`     | Created order information     |
| GET    | /orders/customer/:customerId | Get all orders for a customer  | -                                 | Array of customer orders      |
| DELETE | /orders/:orderId             | Delete order                   | -                                 | Deletion confirmation         |

### Order Items

| Method | Endpoint                     | Description                    | Request Body                                | Response                      |
|--------|------------------------------|--------------------------------|---------------------------------------------|-------------------------------|
| POST   | /order-items                 | Add an item to an order        | `{ orderId, productId, quantity, price }`   | Created order item info       |
| GET    | /order-items/order/:orderId  | Get all items in an order      | -                                           | Array of order items          |
| PUT    | /order-items/:orderItemId    | Update an order item           | `{ quantity, price }`                       | Updated order item info       |
| DELETE | /order-items/:orderItemId    | Delete an order item           | -                                           | Deletion confirmation         |

## Models

### Product Model (Product.js)
- **createProduct(name, price)**: Creates a new product in the database
- **getAllProducts()**: Retrieves all products
- **getProductById(productId)**: Gets a product by its ID
- **updateProduct(productId, name, price)**: Updates a product's details
- **deleteProduct(productId)**: Deletes a product

### Customer Model (Customer.js)
- Functions for managing customer data in the database including creation, retrieval, updating, and deletion

### Order Model (Order.js)
- Functions for managing orders including creation, retrieval by customer, and deletion

### OrderItem Model (OrderItem.js)
- Functions for managing order items including adding items to orders, retrieving items for a specific order, updating quantities, and removing items

## Controllers

### Product Controller (productController.js)
- **createProduct**: Validates request and creates a new product
- **getAllProducts**: Retrieves all products
- **getProductById**: Gets a product by ID with error handling
- **updateProduct**: Updates product details with validation
- **deleteProduct**: Removes a product with confirmation

### Customer Controller (customerController.js)
- Handles customer-related operations with validation and error handling

### Order Controller (orderController.js)
- Manages creation, retrieval, and deletion of orders

### OrderItem Controller (orderItemController.js)
- Handles adding, retrieving, updating, and removing items from orders

## Frontend Integration Notes

When building a frontend for this API:

1. **Authentication**: Currently, the API doesn't implement authentication. You may need to add this for production use.

2. **API Base URL**: The API runs on port 5000 by default.

3. **Error Handling**: All endpoints return appropriate HTTP status codes and error messages that should be handled in the frontend:
   - 200/201: Success
   - 400: Bad request (missing or invalid data)
   - 404: Resource not found
   - 500: Server error

4. **Data Flow**:
   - First, create/retrieve customers
   - Then manage products
   - Create orders for customers
   - Add order items to orders

5. **Data Model Relationships**:
   - Customers have many Orders
   - Orders have many OrderItems
   - Products are referenced by OrderItems

This documentation provides a comprehensive overview of the backend structure and API endpoints, which should be sufficient for building a frontend application that interacts with this backend. 