const numberToWords = (num) => {
  const units = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
  const teens = ["mười", "mười một", "mười hai", "mười ba", "mười bốn", "mười lăm", "mười sáu", "mười bảy", "mười tám", "mười chín"];
  const tens = ["", "", "hai mươi", "ba mươi", "bốn mươi", "năm mươi", "sáu mươi", "bảy mươi", "tám mươi", "chín mươi"];
  const hundreds = ["", "một trăm", "hai trăm", "ba trăm", "bốn trăm", "năm trăm", "sáu trăm", "bảy trăm", "tám trăm", "chín trăm"];

  if (num === 0) return units[0];

  let word = '';

  if (num >= 100) {
    word += hundreds[Math.floor(num / 100)] + " ";
    num = num % 100;
  }

  if (num >= 20) {
    word += tens[Math.floor(num / 10)] + " ";
    num = num % 10;
  } else if (num >= 10) {
    word += teens[num - 10] + " ";
    num = 0;
  }

  if (num > 0 && num < 10) {
    word += units[num] + " ";
  } else if (num > 0) {
    word += units[num];
  }

  return word.trim();
};

export default numberToWords