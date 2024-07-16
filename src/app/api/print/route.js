const ThermalPrinter = require('node-thermal-printer').printer;
const PrinterTypes = require('node-thermal-printer').types;
const usb = require('escpos-usb');

export async function POST(request) {
    try {
        const { orderDetails } = request.body;

        let printer = new ThermalPrinter({
            type: PrinterTypes.EPSON,
            interface: usb()
        });

        printer.alignCenter();
        printer.println("Order Details");
        printer.drawLine();
        printer.alignLeft();
        orderDetails.products.forEach(product => {
            printer.println(`${product.quantity}x ${product.name}`);
            product.flavors.forEach(flavor => {
                printer.println(`  - ${flavor.quantity}x ${flavor.name}`);
            });
        });
        printer.drawLine();
        printer.println(`Total: ${orderDetails.totalPrice}`);
        printer.cut();

        try {
            await printer.execute();
            console.log("Print done!");
            return Response.json("Print done!");
        } catch (error) {
            console.error("Print failed:", error);
            return Response.json("Print failed");
        }
    } catch (error) {
        console.error("Error:", error);
        return Response.json("Server error");
    }
}
