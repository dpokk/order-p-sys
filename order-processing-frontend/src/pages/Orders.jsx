import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import OrderForm from '../components/OrderForm';
import OrderTotalModal from '../components/OrderTotalModal';
import { getOrders, createOrder } from '../services/orderService';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTotalModalOpen, setIsTotalModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getOrders();
      setOrders(response.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError(error.message || 'Failed to fetch orders');
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateOrder = async (orderData) => {
    try {
      await createOrder(orderData);
      setIsModalOpen(false);
      fetchOrders();
    } catch (error) {
      console.error('Error creating order:', error);
      // You might want to show this error to the user through a toast notification
    }
  };

  const handleViewDetails = (order) => {
    navigate(`/orders/${order.order_id}`);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(date));
  };

  const columns = [
    { 
      header: 'Order ID', 
      accessor: 'order_id',
      render: (value) => `#${value.toString().padStart(5, '0')}`
    },
    { header: 'Customer', accessor: 'customer_name' },
    { 
      header: 'Total Amount', 
      accessor: 'total_amount', 
      render: (value) => formatCurrency(value)
    },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (value) => (
        <span className={`px-2 py-1 rounded text-sm ${
          value === 'placed' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
    { 
      header: 'Order Date', 
      accessor: 'order_date',
      render: (value) => formatDate(value)
    },
  ];

  const actions = [
    { 
      label: 'View Details', 
      onClick: handleViewDetails,
      className: 'text-white hover:text-grey-200'
    }
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2f27ce]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-600 text-center">
          <p className="text-xl font-semibold mb-2">Error</p>
          <p>{error}</p>
          <button
            onClick={fetchOrders}
            className="mt-4 px-4 py-2 bg-[#2f27ce] text-white rounded hover:bg-[#433bff] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="px-6 pb-6 flex justify-between items-center border-b border-[#dedcff]">
        <h1 className="text-xl font-semibold ">ORDER MANAGEMENT</h1>
        <div className="space-x-4">
          <button
            onClick={() => setIsTotalModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            View Orders Total
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-[#2f27ce] text-white rounded hover:bg-[#433bff]"
          >
            + Add Order
          </button>
        </div>
      </div>
      <div className="px-6 py-6">
        <Table 
          columns={columns} 
          data={orders} 
          actions={actions} 
          className="w-full"
          emptyMessage="No orders found"
        />
      </div>
      {isModalOpen && (
        <OrderForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateOrder}
        />
      )}
      <OrderTotalModal
        isOpen={isTotalModalOpen}
        onClose={() => setIsTotalModalOpen(false)}
      />
    </div>
  );
};

export default Orders;