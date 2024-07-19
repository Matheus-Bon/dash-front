function formatPhone(numb) {
    numb = numb.slice(2);
    let ddd = numb.substring(0, 2);
    let part = numb.substring(2, 7);
    let part2 = numb.substring(7, 11);
    return `(${ddd}) ${part}-${part2}`;
}

module.exports = formatPhone;
