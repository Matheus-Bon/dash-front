'use client'

import React from 'react';
import formatPrice from '@/utils/formatPrice';
import Divider from '@mui/material/Divider';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import PaymentIcon from '@mui/icons-material/Payment';
import PaidIcon from '@mui/icons-material/Paid';

const PrintableOrder = React.forwardRef((props, ref) => {
    const { order, productsToText, statusColor } = props;

    return (
        <div ref={ref} className="print-container">
            <div className="print-header">
                <h2 className="text-3xl font-semibold">{order.user.name}</h2>
                <span className='flex gap-2'>
                    <p>Pedido #{order.order_code}</p>
                    <p>-</p>
                    <p>Feito às <span className='font-bold'>{new Date(order.createdAt).toLocaleTimeString('pt-BR')}</span></p>
                    <p>-</p>
                    <p className={statusColor[order.status]}>{order.statusLabel}</p>
                </span>
            </div>

            <Divider className='mb-5' />

            <section className='flex flex-col gap-3'>
                <div className='m-2 p-4 border bg-slate-50'>
                    <div className='flex flex-col justify-start gap-2'>
                        <div className='flex flex-row gap-2 mb-1'>
                            <LocationOnIcon />
                            <h2 className='font-bold text-xl'>Endereço</h2>
                        </div>
                        <p>{order.address.body}</p>
                    </div>
                </div>

                <div className='m-2 p-4 border bg-slate-50'>
                    <div className='flex flex-col justify-start gap-2'>
                        <div className='flex flex-row gap-2 mb-2'>
                            <TextSnippetIcon />
                            <h2 className='font-bold text-xl'>Pedido</h2>
                        </div>
                        <span>
                            <h3 className='font-semibold text-lg'>{productsToText.title}</h3>
                            <p className='ml-5'>{productsToText.products}</p>
                        </span>
                    </div>

                    <Divider className='my-5' />

                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-row gap-2 mb-2 items-center'>
                            <DeliveryDiningIcon />
                            <h3 className='font-bold text-xl'>Delivery</h3>
                        </div>
                        <span className={order.delivery ? 'text-xl text-green-900' : 'text-xl text-red-800'}>
                            {order.delivery ? 'Sim' : 'Não'}
                        </span>
                    </div>

                    <Divider className='my-5' />

                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-row gap-2 mb-2 items-center'>
                            <PaymentIcon />
                            <h3 className='font-bold text-xl'>Forma de Pagamento</h3>
                        </div>
                        <span className='text-xl font-extralight'>{order.paymentLabel}</span>
                    </div>

                    <Divider className='my-5' />

                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-row gap-2 mb-2 items-center'>
                            <PaidIcon />
                            <h3 className='font-bold text-xl'>Total</h3>
                        </div>
                        <span className='text-xl font-extralight'>{formatPrice(order.total_price)}</span>
                    </div>
                </div>
            </section>
        </div>
    );
});

export default PrintableOrder;
