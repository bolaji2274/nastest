// src/components/AdminOrders.js
import React, { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus } from '../../../context/allApi'

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [statusUpdateMessage, setStatusUpdateMessage] = useState('');

  useEffect(() => {
    getAllOrders()
      .then((response) => setOrders(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleStatusUpdate = (orderId, status) => {
    updateOrderStatus(orderId, status)
      .then((response) => {
        setStatusUpdateMessage(`Order ${orderId} updated to ${status}`);
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          )
        );
      })
      .catch((error) => setStatusUpdateMessage('Failed to update status'));
  };

  return (
    <div>
      <h2>Manage Orders</h2>
      {statusUpdateMessage && <p>{statusUpdateMessage}</p>}
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Product: {order.product.name} | Quantity: {order.quantity} | Status: {order.status}
            <button onClick={() => handleStatusUpdate(order.id, 'Accepted')}>Accept</button>
            <button onClick={() => handleStatusUpdate(order.id, 'Rejected')}>Reject</button>
            <button onClick={() => handleStatusUpdate(order.id, 'Completed')}>Complete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminOrders;
