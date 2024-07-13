/**
 * Làm sáng một màu hex
 * @param {string} hex - Mã màu hex (ví dụ: #174930)
 * @param {number} percent - Tỷ lệ làm sáng (0-100)
 * @returns {string} - Mã màu hex sau khi làm sáng
 */
function lightenColor(hex, percent, warmFactor) {
    // Loại bỏ ký tự #
  hex = hex.replace(/^#/, '');

  // Chuyển đổi hex thành RGB
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Tính toán giá trị màu mới
  r = Math.min(255, r + (255 - r) * (percent / 100) + (255 - r) * (warmFactor / 100));
  g = Math.min(255, g + (255 - g) * (percent / 100) - (255 - g) * (warmFactor / 100));
  b = Math.min(255, b + (255 - b) * (percent / 100) - (255 - b) * (warmFactor / 100));

  // Chuyển đổi RGB trở lại hex
  r = Math.round(r).toString(16).padStart(2, '0');
  g = Math.round(g).toString(16).padStart(2, '0');
  b = Math.round(b).toString(16).padStart(2, '0');

  return `#${r}${g}${b}`;
  }

  export default lightenColor
  