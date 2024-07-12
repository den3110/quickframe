function hexToRgb(hex) {
    // Loại bỏ ký tự '#' nếu có
    hex = hex.replace(/^#/, '');

    // Chuyển đổi hex thành các thành phần màu
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return `rgb(${r}, ${g}, ${b})`;
}

export default hexToRgb