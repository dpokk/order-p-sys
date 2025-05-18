import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import orderItemRoutes from './routes/orderItemRoutes.js';

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(cors());

// Use the routes defined above
app.use('/api/products', productRoutes);   // Routes for product-related operations
app.use('/api/customers', customerRoutes); // Routes for customer-related operations
app.use('/api/orders', orderRoutes);       // Routes for order-related operations
app.use('/api/order-items', orderItemRoutes);   // Routes for order item-related operations

// Define a port for the server to listen on
const PORT = process.env.PORT || 5000;
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
