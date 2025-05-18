import { useState, useEffect } from 'react';
import Table from '../components/Table';
import ProductForm from '../components/ProductForm';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
  };

  const handleAddClick = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (product) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(product.product_id);
      fetchProducts();
    }
  };

  const handleFormSubmit = async (formData) => {
    if (editingProduct) {
      await updateProduct(editingProduct.product_id, formData);
    } else {
      await createProduct(formData);
    }
    setIsModalOpen(false);
    fetchProducts();
  };

  const columns = [
    { header: 'ID', accessor: 'product_id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Price', accessor: 'price', render: (value) => `₹${value}` },
    { header: 'Created At', accessor: 'created_at' },
  ];

  const actions = [
    { label: 'Edit', onClick: handleEditClick },
    { label: 'Delete', onClick: handleDeleteClick },
  ];

  return (    <div className="flex flex-col">
      <div className="px-6 py-4 flex justify-between items-center border-b border-[#dedcff]">
        <h1 className="text-2xl font-bold text-[#2f27ce]">Products Management</h1>
        <button
          onClick={handleAddClick}
          className="px-4 py-2 bg-[#2f27ce] text-white rounded hover:bg-[#433bff] transition-colors"
        >
          + Add Product
        </button>
      </div>
      <div className="px-6 py-6">
        <Table columns={columns} data={products} actions={actions} />
      </div>
      {isModalOpen && (
        <ProductForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
          initialData={editingProduct}
        />
      )}
    </div>
  );
};

export default ProductPage;
