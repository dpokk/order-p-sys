import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from './routes/productRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import orderItemRoutes from './routes/orderItemRoutes.js';

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Use the routes defined above
app.use('/products', productRoutes);   // Routes for product-related operations
app.use('/customers', customerRoutes); // Routes for customer-related operations
app.use('/orders', orderRoutes);       // Routes for order-related operations
app.use('/order-items', orderItemRoutes);   // Routes for order item-related operations

// Define a port for the server to listen on
const PORT = process.env.PORT || 5000;
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
