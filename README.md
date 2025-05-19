# Order Processing System

A full-stack web application for managing orders, products, and customers. This system provides a modern and efficient way to handle order processing workflows.

## Features

- **Product Management**
  - Add, edit, and delete products
  - Track product prices and inventory
  - View product history

- **Customer Management**
  - Customer registration and profile management
  - Track customer order history
  - Contact information management

- **Order Processing**
  - Create and manage orders
  - Track order status (placed, cancelled)
  - Detailed order items with quantity and pricing
  - Order history and reporting

## Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS for styling
- Modern UI/UX design

### Backend
- Node.js
- Express.js
- MySQL Database

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- Git

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd order-processing-system
   ```

2. **Backend Setup**
   ```bash
   cd order-processing-backend
   npm install
   # Create a .env file with your database credentials
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd order-processing-frontend
   npm install
   npm run dev
   ```

4. **Database Setup**
   - Create a MySQL database
   - Import the schema from `schema.md`
   - Update the database credentials in the backend `.env` file

## Environment Variables

### Backend (.env)
```
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=order_processing
PORT=3000
```

## Project Structure

```
order-processing-system/
├── order-processing-frontend/    # React frontend application
├── order-processing-backend/     # Node.js backend application
└── schema.md                     # Database schema
```

## Development

- Frontend runs on `http://localhost:5173`
- Backend API runs on `http://localhost:3000`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

