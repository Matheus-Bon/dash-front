'use client'

import React, { useState, useEffect } from 'react';
import OrderCard from '@/components/OrderCard';
import OrderModal from '@/components/OrderModal';
import Loading from "@/components/Loading"


export default function Home() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleConnectUSB = () => {
    if (confirm("Você deseja conceder permissão para acessar o dispositivo USB?")) {
      navigator.usb.requestDevice({ filters: [] }).then(function (device) {
        localStorage.setItem('vendorId', device.vendorId)
        console.log(device);
      }).catch(error => {
        console.error(error);
      });
    }
  };

  useEffect(() => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const URL = `${API_BASE_URL}/orders?token=${document.cookie.replace('auth=', '')}`;

    const sse = new EventSource(URL, { withCredentials: true });

    sse.onmessage = event => {
      const eventData = JSON.parse(event.data);
      setOrders(eventData);
    }

  }, []);

  if (!orders.length) {
    return <Loading />
  }

  const pendingOrders = orders?.filter(order => order.status === 'pending');
  const preparingOrders = orders?.filter(order => order.status === 'preparing');
  const deliveryOrders = orders?.filter(order => order.status === 'out_for_delivery');
  const pickupOrders = orders?.filter(order => order.status === 'ready_for_pickup');
  const completedOrders = orders?.filter(order => order.status === 'completed');



  const handleCardClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <section className='flex flex-col gap-5 overflow-y-auto'>
      <h1 className='font-semibold text-3xl mb-10'>
        Gerenciar Pedidos
      </h1>
      <button
        className='mb-5 p-2 bg-blue-500 text-white rounded'
        onClick={handleConnectUSB}
      >
        Conectar Dispositivo USB
      </button>
      <div className="p-6">
        <h1 className="text-2xl mb-6 font-bold">Pedidos pendentes</h1>
        {pendingOrders?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {pendingOrders.map(order => (
              <OrderCard key={order._id} order={order} onClick={() => handleCardClick(order)} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Não há pedidos pendentes.</p>
        )}
      </div>

      <div className="p-6">
        <h1 className="text-2xl mb-6 font-bold">Pedidos em preparo</h1>
        {preparingOrders?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {preparingOrders.map(order => (
              <OrderCard key={order._id} order={order} onClick={() => handleCardClick(order)} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Não há pedidos em preparo.</p>
        )}
      </div>

      <div className="p-6">
        <h1 className="text-2xl mb-6 font-bold">Pedidos em entrega</h1>
        {deliveryOrders?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliveryOrders.map(order => (
              <OrderCard key={order._id} order={order} onClick={() => handleCardClick(order)} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Não há pedidos em entrega.</p>
        )}
      </div>

      <div className="p-6">
        <h1 className="text-2xl mb-6 font-bold">Pedidos prontos para retirada</h1>
        {pickupOrders?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pickupOrders.map(order => (
              <OrderCard key={order._id} order={order} onClick={() => handleCardClick(order)} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Não há pedidos prontos para retirada.</p>
        )}
      </div>

      <div className="p-6">
        <h1 className="text-2xl mb-6 font-bold">Pedidos concluídos</h1>
        {completedOrders?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {completedOrders.map(order => (
              <OrderCard key={order._id} order={order} onClick={() => handleCardClick(order)} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Não há pedidos concluídos.</p>
        )}
      </div>


      {selectedOrder && (
        <OrderModal order={selectedOrder} onClose={handleCloseModal} />
      )}
    </section>
  );
}
