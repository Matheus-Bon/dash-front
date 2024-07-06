export default function formatPrice(price) {
    price = price / 100;
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 });
}


