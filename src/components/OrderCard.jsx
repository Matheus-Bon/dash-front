import diffTimeMin from '@/utils/diffTimeMin';
import React from 'react';

export default function OrderCard({ order, onClick }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer" onClick={onClick}>
            <h2 className="text-xl font-bold">Pedido #{order.orderCode}</h2>
            <p className='font-extralight'>{order.name}</p>
            <p className='font-extralight'>Há {diffTimeMin(order.updatedAt)} minutos</p>
        </div>
    );
}
