import React from 'react';
import formatPrice from '@/utils/formatPrice';
import Divider from '@mui/material/Divider';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import PrintIcon from '@mui/icons-material/Print';

{/* <button
    onClick={onClose}
    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
>
    Fechar
</button> */}

export default function OrderModal({ order, onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-md max-w-3xl w-full">
                <div className='flex flex-row justify-between'>
                    <div className="flex flex-col mb-4 gap-1">
                        <h2 className="text-3xl font-semibold">
                            {order.name}
                        </h2>
                        <span className='flex gap-2'>
                            <p>Pedido #{order.orderCode}</p>
                            <p>*</p>
                            <p>
                                Feito às <span className='font-bold'>
                                    {new Date(order.updatedAt).getHours()}:{new Date(order.updatedAt).getMinutes()}
                                </span>
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
                        <button
                            onClick={onClose}
                            className="p-3 my-3 rounded-lg bg-green-700 text-slate-200 font-semibold rounded hover:bg-green-900"
                            title='Confirmar Pedido'
                        >
                            <CheckIcon />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-3 my-3 rounded-lg bg-red-700 text-slate-200 font-semibold rounded hover:bg-red-900"
                            title='Cancelar Pedido'
                        >
                            <CancelIcon />
                        </button>
                    </div>
                </div>

                <Divider className='mb-5' />

                <div className="mb-4">
                    <p className="mb-2">
                        <strong>Status:</strong> {order.status}
                    </p>
                    <p className="mb-2">
                        <strong>Delivery:</strong> {order.delivery ? 'Sim' : 'Não'}
                    </p>
                    <p className="mb-2">
                        <strong>Atualizado em:</strong> {new Date(order.updatedAt).toLocaleString()}
                    </p>
                    <p className="mb-2">
                        <strong>Método de Pagamento:</strong> {order.payment}
                    </p>
                    <p className="mb-2">
                        <strong>Preço Total:</strong> {formatPrice(order.total_price)}
                    </p>
                </div>

                {/* <div className="mb-4">
                    <p className="mb-2">
                        <strong>Endereço:</strong> {order.address.street}, {order.address.number} - {order.address.city}, {order.address.state} - {order.address.zipCode}
                    </p>
                    <p className="mb-2">
                        <strong>Localização:</strong> {`Lat: ${order.address.location.lat}, Lng: ${order.address.location.lng}`}
                    </p>
                </div> */}

                <div>
                    <p className="mb-2">
                        <strong>Produtos:</strong>
                    </p>
                    <ul>
                        {order.products.map(product => (
                            <li key={product.id.$oid} className="mb-4">
                                <p className="mb-2">
                                    <strong>Nome:</strong> {product.name}
                                </p>
                                <p className="mb-2">
                                    <strong>Quantidade:</strong> {product.quantity}
                                </p>
                                <p className="mb-2">
                                    <strong>Preço Total:</strong> {formatPrice(product.total_price_product)}
                                </p>
                                <p className="mb-2">
                                    <strong>Sabores:</strong>
                                </p>
                                <ul className="ml-4">
                                    {product.flavors.map(flavor => (
                                        <li key={flavor.id.$oid} className="mb-2">
                                            <p className="mb-2">
                                                <strong>Nome:</strong> {flavor.name}
                                            </p>
                                            <p className="mb-2">
                                                <strong>Quantidade:</strong> {flavor.quantity}
                                            </p>
                                            <p className="mb-2">
                                                <strong>Preço Total:</strong> {formatPrice(flavor.total_price_flavor)}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
