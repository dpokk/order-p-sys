// src/pages/OrderDetails.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../services/orderService";
import { getOrderItems } from "../services/orderItemService";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderResponse = await getOrderDetails(orderId);
        setOrder(orderResponse.data);
        const itemsResponse = await getOrderItems(orderId);
        setItems(itemsResponse.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  if (!order) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Order Details</h1>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Order Info</h3>
        <p><strong>Order ID:</strong> {order.order_id}</p>
        <p><strong>Customer:</strong> {order.customer_name}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total Amount:</strong> {order.total_amount}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Order Items</h3>
        <ul>
          {items.map((item) => (
            <li key={item.order_item_id}>
              <strong>{item.product_name}</strong> x {item.quantity} - {item.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetails;
