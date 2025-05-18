import { useState, useEffect } from 'react';
import FormModal from './FormModal';

const ProductForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({ name: '', price: '' });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        price: initialData.price || '',
      });
    } else {
      setFormData({ name: '', price: '' });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.price) {
      alert('All fields are required');
      return;
    }
    onSubmit(formData);
  };

  return (
    <FormModal
      isOpen={isOpen}
      title={initialData ? 'Edit Product' : 'Add Product'}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block text-sm font-medium mb-1">Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
    </FormModal>
  );
};

export default ProductForm;
