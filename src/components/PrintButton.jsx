'use client';

import React from 'react';
import { toast } from 'sonner';
import PrintIcon from '@mui/icons-material/Print';

export default function PrintButton({ order }) {
    const handlePrint = async () => {
        try {
            const deviceId = parseInt(localStorage.getItem('vendorId'));
            const device = await navigator.usb.requestDevice({ filters: [{ vendorId: deviceId }] }); // Substitua pelo vendorId da sua impressora
            await device.open();
            await device.selectConfiguration(1);
            await device.claimInterface(0);

            const encoder = new TextEncoder();
            const data = encoder.encode(buildPrintData(order));
            await device.transferOut(1, data);

            await device.close();
            toast.success('Pedido impresso com sucesso!');
        } catch (error) {
            console.error('Erro ao imprimir:', error);
            toast.error('Erro ao imprimir o pedido.');
        }
    };

    const buildPrintData = (order) => {
        let printData = `Pedido #${order.order_code}\n`;
        printData += `Cliente: ${order.user.name}\n`;
        printData += `Endereço: ${order.address.body}\n`;
        printData += 'Produtos:\n';
        order.products.forEach((product) => {
            printData += `${product.quantity}x ${product.name}\n`;
            product.flavors.forEach((flavor) => {
                printData += `  - ${flavor.quantity}x ${flavor.name}\n`;
            });
        });
        printData += `Total: ${order.total_price}\n`;
        return printData;
    };

    return (
        <button
            onClick={handlePrint}
            className="p-3 my-3 rounded-lg bg-gray-700 text-slate-200 font-semibold hover:bg-gray-900"
            title='Imprimir Pedido'
        >
            <PrintIcon />
        </button>
    );
}
