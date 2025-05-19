import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { getOrdersTotalCost } from '../services/orderService';

const OrderTotalModal = ({ isOpen, onClose }) => {
  const [totals, setTotals] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchTotals();
    }
  }, [isOpen]);

  const fetchTotals = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getOrdersTotalCost();
      setTotals(response.data);
    } catch (error) {
      console.error('Error fetching order totals:', error);
      setError('Failed to load orders total. Please try again.');
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Orders Summary"
    >
      {loading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2f27ce]"></div>
        </div>
      ) : error ? (
        <div className="text-red-600 text-center py-4">
          <p>{error}</p>
          <button
            onClick={fetchTotals}
            className="mt-2 px-4 py-2 text-sm bg-[#2f27ce] text-white rounded hover:bg-[#433bff]"
          >
            Try Again
          </button>
        </div>
      ) : totals ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded">
              <h3 className="text-sm font-medium text-gray-500">Active Orders</h3>
              <p className="text-2xl font-bold text-[#2f27ce]">{totals.active_orders_count}</p>
              <p className="text-sm text-gray-500">{formatCurrency(totals.active_orders_total)}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <h3 className="text-sm font-medium text-gray-500">Cancelled Orders</h3>
              <p className="text-2xl font-bold text-red-600">{totals.cancelled_orders_count}</p>
              <p className="text-sm text-gray-500">{formatCurrency(totals.cancelled_orders_total)}</p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <h3 className="text-sm font-medium text-gray-500">Total Orders Value</h3>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(totals.total_cost)}</p>
          </div>
        </div>
      ) : (
        <p className="text-center py-4 text-gray-500">No order data available</p>
      )}
    </Modal>
  );
};

export default OrderTotalModal;
