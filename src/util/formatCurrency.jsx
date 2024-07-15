function formatCurrency(currency = 0) {
    let amount = parseFloat(currency?.toString()?.replace('$', ''));

    if (isNaN(amount)) {
        amount = 0;
    } else {
        amount = parseFloat(amount.toFixed(2));
    }
    if (amount < 0) {
        amount = Math.abs(amount);
        return `-$${amount}`;
    }

    return `+$${amount}`;
}

export default formatCurrency;
