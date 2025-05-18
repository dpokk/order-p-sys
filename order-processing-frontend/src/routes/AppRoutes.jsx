// src/routes/AppRoutes.jsx


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "../pages/Products";
import Customers from "../pages/Customers";
import Orders from "../pages/Orders";
import OrderDetails from "../pages/OrderDetails";


const AppRoutes = () => {
  return (
    <Router>
      <Layout>
        <Routes>
        
          <Route path="/products" element={<Products />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderId" element={<OrderDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
