function formatPhone(numb) {
    if (numb.length === 13 && numb.startsWith('55')) {
        let ddd = numb.substring(3, 5);
        let part = numb.substring(5, 11);
        let part2 = numb.substring(11, 15);
        return `(${ddd}) ${part}-${part2}`;
    } else {
        console.log("Número de telefone inválido.");
        return numb;
    }
}

module.exports = formatPhone;
