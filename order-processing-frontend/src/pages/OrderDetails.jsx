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

  if (loading) return <div className="p-6 text-lg text-gray-600">Loading...</div>;
  if (!order) return <div className="p-6 text-lg text-red-500">Order not found</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#2f27ce] tracking-tight">Order Details</h1>
        <div className="space-x-2">
          {order.status === 'placed' && (
            <button
              onClick={handleCancelOrder}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              Cancel Order
            </button>
          )}
          <button
            onClick={() => navigate('/orders')}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-[#2f27ce] text-white hover:bg-[#433bff] transition-colors"
          >
            Back to Orders
          </button>
        </div>
      </div>

      {/* Order Information */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-gray-700 text-sm">
          <div>
            <p><span className="font-medium">Order ID:</span> {order.order_id}</p>
            <p><span className="font-medium">Date:</span> {new Date(order.order_date).toLocaleString()}</p>
          </div>
          <div>
            <p className="flex items-center gap-2">
              <span className="font-medium">Status:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                order.status === 'placed' 
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {order.status.toUpperCase()}
              </span>
            </p>
            <p><span className="font-medium">Total Amount:</span> ₹{order.total_amount}</p>
          </div>
        </div>
      </div>

      {/* Order Items Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 overflow-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Items</h2>
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase text-gray-500 border-b">
            <tr>
              <th className="py-3">Product</th>
              <th className="py-3 text-right">Price</th>
              <th className="py-3 text-right">Quantity</th>
              <th className="py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.order_item_id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="py-3">{item.product_name}</td>
                <td className="py-3 text-right">₹{item.price}</td>
                <td className="py-3 text-right">{item.quantity}</td>
                <td className="py-3 text-right">₹{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;
