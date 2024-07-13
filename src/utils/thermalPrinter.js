const ThermalPrinter = require("node-thermal-printer").printer;
const Types = require("node-thermal-printer").types;

let printer = new ThermalPrinter({
    type: Types.EPSON,  // 'star' or 'epson'
    interface: 'tcp://192.168.0.100:9100',  // Endereço IP da impressora
});

printer.alignCenter();
printer.println("Comanda");
printer.drawLine();
printer.println("Produto: Café");
printer.println("Quantidade: 2");
printer.println("Preço: R$ 5,00");
printer.cut();

printer.execute().then(() => {
    console.log("Comanda impressa com sucesso!");
}).catch((error) => {
    console.error("Erro ao imprimir comanda: ", error);
});
