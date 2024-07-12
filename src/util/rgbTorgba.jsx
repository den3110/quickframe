function rgbToRgba(rgb, alpha) {
    // Tách các thành phần màu từ chuỗi rgb
    let rgbValues = rgb.match(/\d+/g);
    let r = rgbValues[0];
    let g = rgbValues[1];
    let b = rgbValues[2];

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Ví dụ sử dụng:

export default rgbToRgba