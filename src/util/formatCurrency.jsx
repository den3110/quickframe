function formatCurrency(currency= 0) {
    // Loại bỏ ký hiệu đô la và chuyển chuỗi thành số
    let amount = parseFloat(currency?.toString()?.replace('$', '')) ;

    // Kiểm tra nếu số là âm, đặt lại ký hiệu đô la phía trước
    if (amount < 0) {
        amount = Math.abs(amount);
        return `-$${amount.toFixed(2)}`;
    }

    return `+$${amount.toFixed(2)}`;
}

export default formatCurrency