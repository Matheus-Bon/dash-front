const { JSDOM } = require('jsdom');

export async function POST(request) {
    try {
        const dom = new JSDOM(request.body);
        const html = dom.serialize();
        
        console.log(dom)

        const buffer = Buffer.from(html, 'utf8');
        return Response.json(buffer);

    } catch (error) {
        console.error("Error:", error);
        return Response.json("Server error");
    }
}
