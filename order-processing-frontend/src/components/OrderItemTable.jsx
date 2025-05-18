// src/components/OrderItemTable.jsx

import React, { useEffect, useState } from "react";
import { getOrderItems, deleteOrderItem } from "../services/orderItemService";
import { formatCurrency } from "../utils/helpers";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

const OrderItemTable = ({ orderId }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchOrderItems = async () => {
      const response = await getOrderItems(orderId);
      setOrderItems(response.data);
    };

    fetchOrderItems();
  }, [orderId]);

  const handleDelete = async () => {
    await deleteOrderItem(selectedItem.id);
    setOrderItems(orderItems.filter((item) => item.id !== selectedItem.id));
    setIsDeleting(false);
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Item Name</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Total</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b">{item.name}</td>
              <td className="py-2 px-4 border-b">{item.quantity}</td>
              <td className="py-2 px-4 border-b">{formatCurrency(item.price)}</td>
              <td className="py-2 px-4 border-b">
                {formatCurrency(item.quantity * item.price)}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => {
                    setSelectedItem(item);
                    setIsDeleting(true);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isDeleting && (
        <DeleteConfirmDialog
          message="Are you sure you want to delete this order item?"
          onConfirm={handleDelete}
          onCancel={() => setIsDeleting(false)}
        />
      )}
    </div>
  );
};

export default OrderItemTable;
