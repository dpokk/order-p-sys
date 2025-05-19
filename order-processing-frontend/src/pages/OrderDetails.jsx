// src/pages/OrderDetails.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderDetails, cancelOrder } from "../services/orderService";
import { getOrderItems } from "../services/orderItemService";

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrderDetails = async () => {
    try {
      const orderResponse = await getOrderDetails(orderId);
      setOrder(orderResponse.data);
      const itemsResponse = await getOrderItems(orderId);
      setItems(itemsResponse.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const handleCancelOrder = async () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await cancelOrder(orderId);
        await fetchOrderDetails(); // Refresh the order details
      } catch (error) {
        console.error("Error cancelling order:", error);
      }
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!order) return <div className="p-6">Order not found</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#2f27ce]">Order Details</h1>
        <div className="space-x-4">
          {order.status === 'placed' && (
            <button
              onClick={handleCancelOrder}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Cancel Order
            </button>
          )}
          <button
            onClick={() => navigate('/orders')}
            className="px-4 py-2 bg-[#2f27ce] text-white rounded hover:bg-[#433bff]"
          >
            Back to Orders
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Order Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><span className="font-medium">Order ID:</span> {order.order_id}</p>
            <p><span className="font-medium">Date:</span> {new Date(order.order_date).toLocaleString()}</p>
          </div>
          <div>
            <p><span className="font-medium">Status:</span> 
              <span className={`ml-2 px-2 py-1 rounded text-sm ${
                order.status === 'placed' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {order.status.toUpperCase()}
              </span>
            </p>
            <p><span className="font-medium">Total Amount:</span> ₹{order.total_amount}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Order Items</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Product</th>
              <th className="text-right py-2">Price</th>
              <th className="text-right py-2">Quantity</th>
              <th className="text-right py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.order_item_id} className="border-b">
                <td className="py-2">{item.product_name}</td>
                <td className="text-right py-2">₹{item.price}</td>
                <td className="text-right py-2">{item.quantity}</td>
                <td className="text-right py-2">₹{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;
