'use client'

import React, { useState, useEffect } from 'react';
import OrderCard from '@/components/OrderCard';
import OrderModal from '@/components/OrderModal';
import getOrders from '@/services/orders/getOrders';
import Loading from "@/components/Loading"


// const orders = [
//   {
//     "name": 'Matheus',
//     "phone": "5521967505770",
//     "_id": "6676fd98186b9862e7001181",
//     "status": "pending",
//     "delivery": true,
//     "updatedAt": "2024-07-05T15:42:31.580Z",
//     "address_id": {
//       "$oid": "66755c1b1d29b644a331215e"
//     },
//     "orderCode": "158145",
//     "payment": "PIX",
//     "products": [
//       {
//         "id": "6677241369cc03b5a1969b6e",
//         "name": "100 Salagdos",
//         "quantity": 1,
//         "total_price_product": 5000,
//         "flavors": [
//           {
//             "id": "6679b922fd55fb32e82c1991",
//             "name": "Quibe",
//             "quantity": 50,
//             "total_price_flavor": 5000
//           },
//           {
//             "id": "6679b922fd55fb32e82c1991",
//             "name": "Coxinha",
//             "quantity": 50,
//             "total_price_flavor": 5000
//           },
//           {
//             "id": "6679b922fd55fb32e82c1991",
//             "name": "Queijo",
//             "quantity": 50,
//             "total_price_flavor": 5000
//           },
//           {
//             "id": "6679b922fd55fb32e82c1991",
//             "name": "Coxinha",
//             "quantity": 50,
//             "total_price_flavor": 5000
//           }
//         ]
//       }
//     ],
//     "total_price": 5500
//   },
//   {
//     "name": 'Matheus',
//     "phone": "5521967505770",
//     "_id": "6676fd98186b9862e7001181",
//     "status": "preparing",
//     "delivery": true,
//     "updatedAt": "2024-07-05T15:42:31.580Z",
//     "address_id": {
//       "$oid": "66755c1b1d29b644a331215e"
//     },
//     "orderCode": "158145",
//     "payment": "PIX",
//     "products": [
//       {
//         "id": "6677241369cc03b5a1969b6e",
//         "name": "100 Salagdos",
//         "quantity": 1,
//         "total_price_product": 5000,
//         "flavors": [
//           {
//             "id": "6679b922fd55fb32e82c1991",
//             "name": "Quibe",
//             "quantity": 50,
//             "total_price_flavor": 5000
//           },
//           {
//             "id": "6679b922fd55fb32e82c1991",
//             "name": "Coxinha",
//             "quantity": 50,
//             "total_price_flavor": 5000
//           },
//           {
//             "id": "6679b922fd55fb32e82c1991",
//             "name": "Queijo",
//             "quantity": 50,
//             "total_price_flavor": 5000
//           },
//           {
//             "id": "6679b922fd55fb32e82c1991",
//             "name": "Coxinha",
//             "quantity": 50,
//             "total_price_flavor": 5000
//           }
//         ]
//       }
//     ],
//     "total_price": 5500
//   },
// ]

export default function Home() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const URL = `${API_BASE_URL}/orders`;

    const sse = new EventSource(
      URL,
      {
        withCredentials: true
      }
    );

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
  const deliveredOrders = orders?.filter(order => order.status === 'delivered');

  const handleCardClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <main className='flex flex-col gap-5'>
      <div className="p-6">
        <h1 className="text-2xl mb-6 font-bold">Pedidos pendentes</h1>
        {pendingOrders?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {selectedOrder && (
        <OrderModal order={selectedOrder} onClose={handleCloseModal} />
      )}
    </main>
  );
}
