function removeVietnameseTones(str) {
  const vietnameseMap = {
    a: "aáàảãạăắằẳẵặâấầẩẫậ",
    e: "eéèẻẽẹêếềểễệ",
    i: "iíìỉĩị",
    o: "oóòỏõọôốồổỗộơớờởỡợ",
    u: "uúùủũụưứừửữự",
    y: "yýỳỷỹỵ",
    d: "dđ",
  };

  let result = str.toLowerCase();

  for (const key in vietnameseMap) {
    for (const char of vietnameseMap[key]) {
      result = result.replace(new RegExp(char, "g"), key);
    }
  }

  return result;
}

export function sortDataAlphabet(arr, propertyName) {
  return arr.slice().sort((a, b) => {
    const charA = removeVietnameseTones(a[propertyName])[0];
    const charB = removeVietnameseTones(b[propertyName])[0];

    if (charA < charB) {
      return -1;
    }
    if (charA > charB) {
      return 1;
    }
    return 0;
  });
}
