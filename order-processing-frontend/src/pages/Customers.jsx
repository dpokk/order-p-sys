import { useState, useEffect } from 'react';
import Table from '../components/Table';
import CustomerForm from '../components/CustomerForm';
import CustomerOrderHistoryModal from '../components/CustomerOrderHistoryModal';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '../services/customerService';

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);
  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();
      setCustomers(response.data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setCustomers([]);
    }
  };

  const handleAddClick = () => {
    setEditingCustomer(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (customer) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      await deleteCustomer(customer.customer_id);
      fetchCustomers();
    }
  };

  const handleFormSubmit = async (formData) => {
    if (editingCustomer) {
      await updateCustomer(editingCustomer.customer_id, formData);
    } else {
      await createCustomer(formData);
    }
    setIsModalOpen(false);
    fetchCustomers();
  };
  const handleViewHistory = (customer) => {
    setSelectedCustomer(customer);
    setIsHistoryModalOpen(true);
  };

  const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date));
};

  const columns = [
    // { header: 'ID', accessor: 'customer_id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    // { header: 'Created At', accessor: 'created_at', render: (value) => formatDate(value) }
  ];

  const actions = [
    {
      label: 'View Orders',
      onClick: handleViewHistory,
      className: 'text-sm font-medium px-2 py-2 rounded bg-[#2f27ce] text-white rounded hover:bg-[#433bff] transition-colors whitespace-nowrap'
    },
    {
      label: 'Edit',
      onClick: handleEditClick,
      className: 'text-sm font-medium px-2 py-1 rounded bg-green-600 text-white hover:bg-green-700 transition-colors whitespace-nowrap'
    },
    {
      label: 'Delete',
      onClick: handleDeleteClick,
      className: 'text-sm font-medium px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition-colors whitespace-nowrap'
    }
  ];

  return (
    <div className="flex flex-col">
      <div className="px-6 pb-6 flex justify-between items-center border-b border-[#dedcff]">
        <h1 className="text-xl font-semibold">CUSTOMER MANAGEMENT</h1>
        <button
          onClick={handleAddClick}
          className="px-4 py-2 bg-[#2f27ce] text-white rounded hover:bg-[#433bff] transition-colors">
          + Add Customer
        </button>
      </div>
      <div className="px-6 py-6">
        <Table columns={columns} data={customers} actions={actions} />
      </div>
      {isModalOpen && (
        <CustomerForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
          initialData={editingCustomer}
        />
      )}
      {isHistoryModalOpen && selectedCustomer && (
        <CustomerOrderHistoryModal
          isOpen={isHistoryModalOpen}
          onClose={() => setIsHistoryModalOpen(false)}
          customerId={selectedCustomer.customer_id}
          customerName={selectedCustomer.name}
        />
      )}
    </div>
  );
};

export default CustomerPage;
