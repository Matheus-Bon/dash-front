const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;

const printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: process.env.PRINTER_TCP,
});

export async function POST(request) {
    try {
        // Conecte à impressora
        const isConnected = await printer.isPrinterConnected();
        console.log('isConnected', isConnected)
        if (!isConnected) {
            throw new Error("Não foi possível conectar à impressora");
        }

        // Adicione o conteúdo a ser impresso
        printer.println("Olá, isso é um teste de impressão via TCP!");

        // Envie o comando de impressão
        const executeResult = await printer.execute();
        if (executeResult) {
            console.log("Impressão realizada com sucesso!");
        } else {
            console.error("Falha ao executar a impressão");
        }
    } catch (error) {
        console.error("Erro ao tentar imprimir:", error);
    }
}
