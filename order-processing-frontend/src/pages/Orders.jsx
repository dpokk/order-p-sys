// src/pages/Orders.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../services/orderService";
import Table from "../components/Table";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const columns = [
    { header: "Order ID", accessor: "order_id" },
    { header: "Customer", accessor: "customer_name" },
    { header: "Total Amount", accessor: "total_amount" },
    { header: "Status", accessor: "status" },
    {
      header: "Actions",
      accessor: "actions",
      render: (value, order) => (
        <Link
          to={`/orders/${order.order_id}`}
          className="text-blue-500 hover:text-blue-700"
        >
          View Details
        </Link>
      ),
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold text-[#2f27ce]">Orders Management</h1>
      </div>
      <div className="px-6">
        <Table columns={columns} data={orders} />
      </div>
    </div>
  );
};

export default Orders;
