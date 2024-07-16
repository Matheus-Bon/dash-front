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
            const device = await navigator.usb.requestDevice({ filters: [{ vendorId: deviceId }] }); // Substitua pelo vendorId da sua impressora
            await device.open();
            await device.selectConfiguration(1);
            await device.claimInterface(device.configuration.interfaces[1].interfaceNumber)

            const encoder = new TextEncoder();
            const d = buildPrintData(order)
            console.log(d)
            // const data = encoder.encode(buildPrintData(order));
            // const endpoint = device.configuration.interfaces[1].alternate.endpoints[0].endpointNumber;
            // await device.transferOut(endpoint, data);

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
        printData += '---------- BOCADINHAS SALGADERIA ----------\n';
        printData += `Data: ${new Date(createdAt).toLocaleDateString()} ${new Date(createdAt).toLocaleTimeString()}\n`;
        printData += `Código do Pedido: ${order_code}\n\n`;

        // Adicionar informações do cliente e endereço
        printData += `Cliente: ${user.name}\n`;
        printData += `Telefone: ${user.phone}\n`;
        printData += `Endereço: ${address.body}\n`;
        printData += `----------------------------------------\n`;

        // Adicionar lista de produtos
        printData += 'Produtos:\n';
        products.forEach((product, index) => {
            printData += `${index + 1}. ${product.name}\n`;
            printData += `   Quantidade: ${product.quantity}\n`;
            printData += `   Preço Unitário: ${(product.total_price_product / product.quantity).toFixed(2)}\n`;
            printData += `   Total: ${(product.total_price_product / 100).toFixed(2)}\n`;
            if (product.flavors.length > 0) {
                printData += `   Sabores: ${product.flavors.join(', ')}\n`;
            }
        });

        // Adicionar total do pedido e método de pagamento
        printData += `----------------------------------------\n`;
        printData += `Total do Pedido: ${(total_price / 100).toFixed(2)}\n`;
        printData += `Método de Pagamento: ${paymentLabel}\n`;

        // Adicionar status do pedido
        printData += `Status do Pedido: ${statusLabel}\n`;

        // Retornar os dados formatados para impressão
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
