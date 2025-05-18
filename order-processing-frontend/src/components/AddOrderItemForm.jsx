// src/components/AddOrderItemForm.jsx
import { useState, useEffect } from "react";
import FormModal from "./FormModal";
import { getProducts } from "../services/productService";

const AddOrderItemForm = ({ isOpen, onClose, onSubmit, orderId }) => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts();
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const handleSubmit = () => {
    if (!productId || quantity < 1) {
      alert("Select a product and enter a valid quantity");
      return;
    }
    onSubmit(orderId, { productId, quantity });
  };

  return (
    <FormModal
      isOpen={isOpen}
      title="Add Item to Order"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block text-sm font-medium mb-1">Product</label>
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">-- Select Product --</option>
          {products.map((p) => (
            <option key={p.product_id} value={p.product_id}>
              {p.name} (₹{p.price})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Quantity</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
    </FormModal>
  );
};

export default AddOrderItemForm;
