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

export default function OrderModal({ order, onClose }) {

    let productsToText = '';
    for (const product of order.products) {
        productsToText += `${product.quantity}x ${product.name}\n`;
        for (const flavor of product.flavors) {
            productsToText += `\t${flavor.quantity}x ${flavor.name}\n`;
        }
    }

    const statusColor = {
        'pending': 'text-red-500',
        'preparing': 'text-yellow-500'
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-md max-w-3xl w-full">
                <section className='flex flex-row justify-between'>
                    <div className="flex flex-col mb-4 gap-1">
                        <h2 className="text-3xl font-semibold">
                            {order.name}
                        </h2>
                        <span className='flex gap-2'>
                            <p>Pedido #{order.orderCode}</p>
                            <p>-</p>
                            <p>
                                Feito às <span className='font-bold'>
                                    {new Date(order.updatedAt).getHours()}:{new Date(order.updatedAt).getMinutes()}
                                </span>
                            </p>
                            <p>-</p>
                            <p className={statusColor[order.status]}>
                                {order.status}
                            </p>
                        </span>
                    </div>

                    <div className='flex flex-row gap-3'>
                        <button
                            onClick={onClose}
                            className="p-3 my-3 rounded-lg bg-gray-700 text-slate-200 font-semibold rounded hover:bg-gray-900"
                            title='Imprimir Pedido'
                        >
                            <PrintIcon />
                        </button>

                        {order.status === 'pending' && (
                            <>
                                <button
                                    onClick={() => console.log('Pedido confirmado')}
                                    className="p-3 my-3 rounded-lg bg-green-700 text-slate-200 font-semibold rounded hover:bg-green-900"
                                    title='Confirmar Pedido'
                                >
                                    <CheckIcon />
                                </button>
                                <button
                                    onClick={() => console.log('Pedido cancelado')}
                                    className="p-3 my-3 rounded-lg bg-red-700 text-slate-200 font-semibold rounded hover:bg-red-900"
                                    title='Cancelar Pedido'
                                >
                                    <CancelIcon />
                                </button>
                            </>
                        )}

                        {order.status === 'preparing' && (
                            <>
                                <button
                                    onClick={() => console.log('Pedido confirmado')}
                                    className="p-3 my-3 rounded-lg bg-green-700 text-slate-200 font-semibold rounded hover:bg-green-900"
                                    title='Despachar Pedido'
                                >
                                    <MopedIcon />
                                </button>
                            </>
                        )}

                    </div>


                </section>

                <Divider className='mb-5' />

                <seaction className='flex flex-col gap-3'>
                    <div className='m-2 p-4 border bg-slate-50'>
                        <div className='flex flex-row justify-between gap-2'>
                            <LocationOnIcon />
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia eveniet reprehenderit omnis facere odit impedit aliquam debitis unde, commodi consequuntur blanditiis excepturi fugit? Laborum quae inventore nemo maxime amet cumque!
                            </p>
                        </div>
                    </div>

                    <div className='m-2 p-4 border bg-slate-50'>
                        <div className='flex flex-row justify-start gap-2'>
                            <TextSnippetIcon />
                            <pre className='whitespace-pre-wrap'>
                                {productsToText}
                            </pre>
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
