import diffTimeMin from '@/utils/diffTimeMin';
import React from 'react';

export default function OrderCard({ order, onClick }) {
    return (
        <div className="flex flex-col bg-white p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer" onClick={onClick}>
            <div className='flex flex-row justify-between'>
                <h2 className="text-xl font-bold">Pedido #{order.order_code}</h2>
            </div>
            <p className='font-extralight'>{order.user.name}</p>
            <p className='font-extralight'>Há {diffTimeMin(order.createdAt)} minutos</p>
        </div>
    );
}
