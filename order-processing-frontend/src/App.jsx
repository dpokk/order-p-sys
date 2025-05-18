import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="products" element={<Products />} />
          <Route path="customers" element={<Customers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:orderId" element={<OrderDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;