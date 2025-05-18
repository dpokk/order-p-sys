import { useState, useEffect } from 'react';
import Table from '../components/Table';
import CustomerForm from '../components/CustomerForm';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '../services/customerService';

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
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

  const columns = [
    { header: 'ID', accessor: 'customer_id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Created At', accessor: 'created_at' },
  ];

  const actions = [
    { label: 'Edit', onClick: handleEditClick },
    { label: 'Delete', onClick: handleDeleteClick },
  ];

  return (
    <div className="flex flex-col">
      <div className="px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#2f27ce]">Customers Management</h1>
        <button
          onClick={handleAddClick}
          className="px-4 py-2 bg-[#2f27ce] text-white rounded hover:bg-[#433bff] transition-colors"
        >
          + Add Customer
        </button>
      </div>
      <div className="px-6">
        <Table columns={columns} data={customers} actions={actions} />
      </div>
      <CustomerForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingCustomer}
      />
    </div>
  );
};

export default CustomerPage;
