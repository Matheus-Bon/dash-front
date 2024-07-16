'use client'

import React from 'react';
import formatPrice from '@/utils/formatPrice';
import Divider from '@mui/material/Divider';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import PrintIcon from '@mui/icons-material/Print';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import MopedIcon from '@mui/icons-material/Moped';
import editOrder from '@/services/orders/editOrderById';
import PaidIcon from '@mui/icons-material/Paid';
import PaymentIcon from '@mui/icons-material/Payment';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { toast } from 'sonner';
import PrintButton from './PrintButton';

export default function OrderModal({ order, onClose }) {

    const productsToText = { title: '', products: '' };
    for (const product of order.products) {
        productsToText.title = `${product.quantity}x\t${product.name}`;
        for (const flavor of product.flavors) {
            productsToText.products = `\t${flavor.quantity}x\t${flavor.name}\n`;
        }
    }

    const statusColor = {
        'pending': 'text-red-500',
        'preparing': 'text-yellow-500',
        'out_for_delivery': 'text-blue-500',
        'ready_for_pickup': 'text-blue-500',
        'completed': 'text-green-500',
    }

    const confirmOrder = async () => {
        const { data, statusCode } = await editOrder(order._id, { status: 'preparing' });

        if (statusCode !== 200) {
            toast.error(`Error ao atualizar status do pedido #${order.order_code}`);
            return;
        }

        toast.success(`Preparando pedido #${order.order_code}`);
        onClose();
    }

    const cancelOrder = async () => {
        const { data, statusCode } = await editOrder(order._id, { status: 'canceled' });

        if (statusCode !== 200) {
            toast.error(`Error ao atualizar status do pedido #${order.order_code}`);
            return;
        }

        toast.success(`Pedido #${order.order_code} cancelado`);
        onClose();
    }

    const readyOrders = async () => {
        const status = order.delivery ? 'out_for_delivery' : 'ready_for_pickup';
        const { data, statusCode } = await editOrder(order._id, { status });

        if (statusCode !== 200) {
            toast.error(`Error ao atualizar status do pedido #${order.order_code}`);
            return;
        }

        toast.success(`Pedido #${order.order_code} concluído`);
        onClose();
    }

    const completeOrder = async () => {
        const { data, statusCode } = await editOrder(order._id, { status: 'completed' });

        if (statusCode !== 200) {
            toast.error(`Error ao atualizar status do pedido #${order.order_code}`);
            return;
        }

        toast.success(`Pedido #${order.order_code} concluído`);
        onClose();
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-md max-w-3xl w-full">
                <section className='flex flex-row justify-between'>
                    <div className="flex flex-col mb-4 gap-1">
                        <h2 className="text-3xl font-semibold">
                            {order.user.name}
                        </h2>
                        <span className='flex gap-2'>
                            <p>Pedido #{order.order_code}</p>
                            <p>-</p>
                            <p>
                                Feito às <span className='font-bold'>
                                    {new Date(order.createdAt).toLocaleTimeString('pt-BR')}
                                </span>
                            </p>
                            <p>-</p>
                            <p className={statusColor[order.status]}>
                                {order.statusLabel}
                            </p>
                        </span>
                    </div>

                    <div className='flex flex-row gap-3'>
                        
                        <PrintButton />

                        {order.status === 'pending' && (
                            <>
                                <button
                                    onClick={confirmOrder}
                                    className="p-3 my-3 rounded-lg bg-green-700 text-slate-200 font-semibold hover:bg-green-900"
                                    title='Confirmar Pedido'
                                >
                                    <CheckIcon />
                                </button>
                                <button
                                    onClick={cancelOrder}
                                    className="p-3 my-3 rounded-lg bg-red-700 text-slate-200 font-semibold hover:bg-red-900"
                                    title='Cancelar Pedido'
                                >
                                    <CancelIcon />
                                </button>
                            </>
                        )}

                        {order.status === 'preparing' && (
                            <>
                                <button
                                    onClick={readyOrders}
                                    className="p-3 my-3 rounded-lg bg-green-700 text-slate-200 font-semibold hover:bg-green-900"
                                    title='Concluir Pedido'
                                >
                                    <CheckIcon />
                                </button>
                            </>
                        )}

                        {order.status === 'out_for_delivery' || order.status === 'ready_for_pickup' && (
                            <>
                                <button
                                    onClick={completeOrder}
                                    className="p-3 my-3 rounded-lg bg-green-700 text-slate-200 font-semibold hover:bg-green-900"
                                    title='Finalizar Pedido'
                                >
                                    <DoneAllIcon />
                                </button>
                            </>
                        )}

                    </div>
                </section>

                <Divider className='mb-5' />

                <seaction className='flex flex-col gap-3'>
                    <div className='m-2 p-4 border bg-slate-50'>
                        <div className='flex flex-col justify-start gap-2'>
                            <div className='flex flex-row gap-2 mb-1'>
                                <LocationOnIcon />
                                <h2 className='font-bold text-xl'>
                                    Endereço
                                </h2>
                            </div>
                            <p>
                                {order.address.body}
                            </p>
                        </div>
                    </div>

                    <div className='m-2 p-4 border bg-slate-50'>
                        <div className='flex flex-col justify-start gap-2'>
                            <div className='flex flex-row gap-2 mb-2'>
                                <TextSnippetIcon />
                                <h2 className='font-bold text-xl'>
                                    Pedido
                                </h2>
                            </div>
                            <span>
                                <h3 className='font-semibold text-lg'>{productsToText.title}</h3>
                                <p className='ml-5'>
                                    {productsToText.products}
                                </p>
                            </span>
                        </div>

                        <Divider className='my-5' />

                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-row gap-2 mb-2 items-center'>
                                <DeliveryDiningIcon />
                                <h3 className='font-bold text-xl'>
                                    Delivery
                                </h3>
                            </div>
                            <span className={order.delivery ? 'text-xl text-green-900' : 'text-xl text-red-800'}>
                                {order.delivery ? 'Sim' : 'Não'}
                            </span>
                        </div>

                        <Divider className='my-5' />

                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-row gap-2 mb-2 items-center'>
                                <PaymentIcon />
                                <h3 className='font-bold text-xl'>
                                    Forma de Pagamento
                                </h3>
                            </div>
                            <span className='text-xl font-extralight'>
                                {order.paymentLabel}
                            </span>
                        </div>

                        <Divider className='my-5' />

                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-row gap-2 mb-2 items-center'>
                                <PaidIcon />
                                <h3 className='font-bold text-xl'>
                                    Total
                                </h3>
                            </div>
                            <span className='text-xl font-extralight'>
                                {formatPrice(order.total_price)}
                            </span>
                        </div>
                    </div>
                </seaction>

                <div className='flex flex-row justify-end'>
                    <button
                        onClick={onClose}
                        className="mt-4 px-4 py-2 bg-red-700 text-slate-200 rounded hover:bg-red-900"
                    >
                        Fechar
                    </button>
                </div>

            </div>
        </div>
    );
}
