// src/components/CustomerOrders.js
import React, { useEffect, useState } from 'react';
import { getCustomerOrders } from '../../../context/allApi';

function CustomerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getCustomerOrders()
      .then((response) => setOrders(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2>Your Orders</h2>
      <ul>
       {orders.map((order) => (
          <li key={order.id}>
            Product: {order.application.product.name ? order.application.product.name : 'Unknown Product'} | 
            Quantity: {order.application.quantity} | 
            Status: {order.status} | 
            Created At: {new Date(order.created_at).toLocaleDateString()} |
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerOrders;
