//для проверки длины строки
function checkStrLength(str, maxLength) {
  return str.length <= maxLength;
}
checkStrLength('проверяемая строка', 20); // true
checkStrLength('проверяемая строка', 18); // true
checkStrLength('проверяемая строка', 10); // false

//для проверки, является ли строка палиндромом
function checkPalindrome(str) {
  str = str.toLowerCase().replace(/ /g, '');

  for (let i = 0; i < str.length / 2 - 1; i++) {
    if (str[i] !== str[str.length - 1 - i]) {
      return false;
    }
  }

  return true;
}
checkPalindrome('топот'); // true
checkPalindrome('ДовОд'); // true
checkPalindrome('Кекс'); // false
checkPalindrome('Лёша на полке клопа нашёл '); // true

//извлекает из строки цифры от 0 до 9 и возвращает их в виде целого положительного числа
function getNumbers(str) {
  str = String(str);
  let numbersStr = '';

  for (let i = 0; i < str.length; i++) {
    if ('0' <= str[i] && str[i] <= '9') {
      numbersStr += str[i];
    }
  }

  if (numbersStr) {
    return Number(numbersStr);
  }

  return NaN;
}
getNumbers('2023 год'); // 2023
getNumbers('ECMAScript 2022'); // 2022
getNumbers('1 кефир, 0.5 батона'); // 105
getNumbers('агент 007'); // 7
getNumbers('а я томат'); // NaN
getNumbers(2023); // 2023
getNumbers(-1); // 1
getNumbers(1.5); // 15

//исходную строку дополняет указанными символами до заданной длины
function fillStr(str, minLength, addStr) {
  if (str.length >= minLength) {
    return str;
  }

  while (str.length < minLength) {
    const additionalLength = minLength - str.length;
    if (addStr.length > additionalLength) {
      addStr = addStr.slice(0, additionalLength);
    }

    str = addStr + str;
  }

  return str;
}
fillStr('1', 2, '0'); // '01'
fillStr('1', 4, '0'); // '0001'
fillStr('q', 4, 'werty'); // 'werq'
fillStr('q', 4, 'we'); // 'wweq'
fillStr('qwerty', 4, '0'); // 'qwerty'
fillStr('qwerty', 3, '0'); // 'qwerty'
