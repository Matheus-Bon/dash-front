'use client';

import React from 'react';
import { toast } from 'sonner';
import PrintIcon from '@mui/icons-material/Print';
import formatPhone from '@/utils/formatPhone';
import formatPrice from '@/utils/formatPrice';

export default function PrintButton({ order }) {
    const handlePrint = async () => {
        try {
            const deviceId = parseInt(localStorage.getItem('vendorId'));

            // const device = await navigator.usb.requestDevice({ filters: [{ vendorId: deviceId }] });
            const device = await navigator.usb.getDevices().then(devices => devices.find(el => el.vendorId === deviceId));
            await device.open();
            await device.selectConfiguration(1);
            await device.claimInterface(device.configuration.interfaces[1].interfaceNumber);

            const encoder = new TextEncoder();
            // const d = buildPrintData(order)

            const data = encoder.encode(buildPrintData(order));
            const endpoint = device.configuration.interfaces[1].alternate.endpoints[0].endpointNumber;
            await device.transferOut(endpoint, data);

            await device.close();
            toast.success('Pedido impresso com sucesso!');
        } catch (error) {
            console.error('Erro ao imprimir:', error);
            toast.error('Erro ao imprimir o pedido.');
        }
    };

    const buildPrintData = (order) => {
        const { address, _id, createdAt, order_code, payment_method, products, total_price, user, statusLabel, paymentLabel } = order;

        // Inicializar a string de dados para impressão
        let printData = '';

        // Adicionar informações do cabeçalho
        printData += '\n---------- BOCADINHAS SALGADERIA ----------\n';
        printData += `Data: ${new Date(createdAt).toLocaleDateString()} ${new Date(createdAt).toLocaleTimeString()}\n`;
        printData += `Codigo do Pedido: ${order_code}\n\n`;
        printData += `Status do Pedido: ${statusLabel}\n`;

        // Adicionar informações do cliente e endereço
        printData += `Cliente: ${user.name}\n`;
        printData += `Telefone: ${formatPhone(user.phone)}\n`;
        printData += `Endereco: ${address.body}\n`;
        printData += `----------------------------------------\n`;

        // Adicionar lista de produtos
        printData += 'Produtos:\n';
        products.forEach((product, index) => {
            printData += `${index + 1}. ${product.name}\n`;
            printData += `   Quantidade: ${product.quantity}\n`;
            // printData += `   Preço Unitário: ${formatPrice(product.total_price_product / product.quantity)}\n`;
            printData += `   Total: ${formatPrice(product.total_price_product)}\n`;
            if (product.flavors.length > 0) {
                printData += `   Sabores:\n`;

                for (const flavor of product.flavors) {
                    printData += `      x${flavor.quantity}   ${flavor.name}\n`;
                }
            }
        });

        // Adicionar total do pedido e método de pagamento
        printData += `----------------------------------------\n`;
        printData += `Total do Pedido: ${(total_price / 100).toFixed(2)}\n`;
        printData += `Metodo de Pagamento: ${paymentLabel}\n`;

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
