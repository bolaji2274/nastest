// src/components/OrderForm.js
import React, { useEffect, useState } from 'react';
import { getProducts, createApplication } from '../../../context/allApi';

function OrderForm() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getProducts()
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    createApplication({ product, quantity })
      .then((response) => {
        setMessage('Application submitted successfully');
        setQuantity(1);
        setProduct('');
      })
      .catch((error) => setMessage('Failed to submit application'));
  };

  return (
    <div>
      <h2>Place an Order</h2>
      <form onSubmit={handleSubmit}>
        <select value={product} onChange={(e) => setProduct(e.target.value)} required>
          <option value="">Select Product</option>
          {products.map((prod) => (
            <option key={prod.id} value={prod.id}>
              {prod.name} - {prod.stock} in stock
            </option>
          ))}
        </select>
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <button type="submit">Place Order</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default OrderForm;
