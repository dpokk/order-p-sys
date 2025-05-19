import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { getCustomerOrderSummary } from '../services/orderService';

const CustomerOrderHistoryModal = ({ isOpen, onClose, customerId, customerName }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && customerId) {
      fetchOrderHistory();
    }
  }, [isOpen, customerId]);

  const fetchOrderHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getCustomerOrderSummary(customerId);
      setOrderHistory(response.data);
    } catch (error) {
      console.error('Error fetching order history:', error);
      setError('Failed to load order history. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount || 0);
  };

  const handleViewOrder = (orderId) => {
    onClose();
    navigate(`/orders/${orderId}`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Order History - ${customerName}`}
    >
      {loading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2f27ce]"></div>
        </div>
      ) : error ? (
        <div className="text-red-600 text-center py-4">
          <p>{error}</p>
          <button
            onClick={fetchOrderHistory}
            className="mt-2 px-4 py-2 text-sm bg-[#2f27ce] text-white rounded hover:bg-[#433bff]"
          >
            Try Again
          </button>
        </div>
      ) : orderHistory.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Order ID</th>
                <th className="text-left py-2">Date</th>
                <th className="text-right py-2">Items</th>
                <th className="text-right py-2">Total</th>
                <th className="text-center py-2">Status</th>
                <th className="text-right py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((order) => (
                <tr key={order.order_id} className="border-b">
                  <td className="py-2">#{order.order_id.toString().padStart(5, '0')}</td>
                  <td className="py-2">{new Date(order.order_date).toLocaleDateString()}</td>
                  <td className="text-right py-2">{order.total_items}</td>
                  <td className="text-right py-2">{formatCurrency(order.total_amount)}</td>
                  <td className="text-center py-2">
                    <span className={`px-2 py-1 rounded text-sm ${
                      order.status === 'placed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {order.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="text-right py-2">
                    <button
                      onClick={() => handleViewOrder(order.order_id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center py-4 text-gray-500">No order history found</p>
      )}
    </Modal>
  );
};

export default CustomerOrderHistoryModal;
