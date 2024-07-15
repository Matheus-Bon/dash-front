import { printer as ThermalPrinter, types as PrinterTypes } from 'node-thermal-printer';

export async function POST(request) {
    const printer = new ThermalPrinter({
        type: PrinterTypes.EPSON, // 'star' or 'epson'
        interface: 'usb',
    });

    printer.alignCenter();
    printer.println("Tabela de Exemplo");
    printer.drawLine();

    printer.tableCustom([
        { text: "Coluna 1", align: "LEFT", width: 0.33 },
        { text: "Coluna 2", align: "CENTER", width: 0.33 },
        { text: "Coluna 3", align: "RIGHT", width: 0.33 }
    ]);

    printer.drawLine();

    printer.tableCustom([
        { text: "Dado 1", align: "LEFT", width: 0.33 },
        { text: "Dado 2", align: "CENTER", width: 0.33 },
        { text: "Dado 3", align: "RIGHT", width: 0.33 }
    ]);

    printer.cut();

    try {
        await printer.execute();
        return Response.json({ message: 'Impressão bem-sucedida' });
    } catch (error) {
        console.error("Erro na impressão", error);
        return Response.json({ message: 'Erro na impressão', error });
    }
}
