import { useState, useEffect } from 'react';
import FormModal from './FormModal';
import { getCustomers } from '../services/customerService';
import { getProducts } from '../services/productService';

const OrderForm = ({ isOpen, onClose, onSubmit }) => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    customerId: '',
    items: []
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [customersRes, productsRes] = await Promise.all([
          getCustomers(),
          getProducts()
        ]);
        setCustomers(customersRes.data || []);
        setProducts(productsRes.data || []);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const handleCustomerChange = (e) => {
    setFormData(prev => ({ ...prev, customerId: e.target.value }));
  };

  const handleQuantityChange = (productId, quantity, price) => {
    setFormData(prev => {
      const newItems = [...prev.items];
      const existingIndex = newItems.findIndex(item => item.productId === productId);
      
      if (quantity > 0) {
        const productDetails = products.find(p => p.product_id === parseInt(productId));
        if (existingIndex >= 0) {
          newItems[existingIndex] = {
            ...newItems[existingIndex],
            quantity: parseInt(quantity)
          };
        } else {
          newItems.push({
            productId: parseInt(productId),
            quantity: parseInt(quantity),
            price: productDetails.price
          });
        }
      } else {
        if (existingIndex >= 0) {
          newItems.splice(existingIndex, 1);
        }
      }
      
      return { ...prev, items: newItems };
    });
  };

  const handleSubmit = () => {
    if (!formData.customerId) {
      alert('Please select a customer');
      return;
    }

    if (formData.items.length === 0) {
      alert('Please add at least one item to the order');
      return;
    }

    onSubmit({
      customerId: parseInt(formData.customerId),
      items: formData.items.map(item => ({
        product_id: item.productId,
        quantity: item.quantity,
        price: item.price
      }))
    });
  };

  const getItemQuantity = (productId) => {
    const item = formData.items.find(i => i.productId === productId);
    return item ? item.quantity : '';
  };

  return (
    <FormModal
      isOpen={isOpen}
      title="Create New Order"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Select Customer
          </label>
          <select
            value={formData.customerId}
            onChange={handleCustomerChange}
            className="w-full border px-3 py-2 rounded text-[#050315] "
          >
            <option value="">-- Select Customer --</option>
            {customers.map(customer => (
              <option key={customer.customer_id} value={customer.customer_id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Add Items
          </label>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {products.map(product => (
              <div key={product.product_id} className="flex items-center gap-2 p-2 border rounded">
                <span className="flex-1">{product.name} - ₹{product.price}</span>
                <input
                  type="number"
                  min="0"
                  value={getItemQuantity(product.product_id)}
                  onChange={(e) => handleQuantityChange(product.product_id, e.target.value, product.price)}
                  className="w-20 px-2 py-1 border rounded"
                  placeholder="Qty"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </FormModal>
  );
};

export default OrderForm;