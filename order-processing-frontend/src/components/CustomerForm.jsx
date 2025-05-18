import { useState, useEffect } from 'react';
import FormModal from './FormModal';

const CustomerForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
      });
    } else {
      setFormData({ name: '', email: '', phone: '' });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('All fields are required');
      return;
    }
    onSubmit(formData);
  };

  return (
    <FormModal
      isOpen={isOpen}
      title={initialData ? 'Edit Customer' : 'Add Customer'}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block text-sm font-medium mb-1 text-[#2f27ce]">Customer Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded bg-[#dedcff] text-[#050315] border-[#2f27ce] focus:outline-[#433bff]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-[#2f27ce]">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded bg-[#dedcff] text-[#050315] border-[#2f27ce] focus:outline-[#433bff]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-[#2f27ce]">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded bg-[#dedcff] text-[#050315] border-[#2f27ce] focus:outline-[#433bff]"
        />
      </div>
    </FormModal>
  );
};

export default CustomerForm;
