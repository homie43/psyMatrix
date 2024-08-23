import { IResults } from "../types";

import { TEN, TWELVE, REPLACEMENT_NULL } from "./constans";

const getDestinyNumber = (num: number) => {
  if (num === TEN) return 1;
  if (num === TWELVE) return 3;

  return num;
};

export const calculateResults = (date: string) => {
  const digits = date.replace(/-/g, "").split("").map(Number);
  const sum1 = digits.reduce((acc, curr) => acc + curr, 0);
  // Ниже пиздец, но хз что тут можно сделать
  const sum2 = sum1
    .toString()
    .split("")
    .map(Number)
    .reduce((acc, curr) => acc + curr, 0);

  const dayOfMonth = parseInt(date.split("-")[2], 10);
  const firstNumberDay = dayOfMonth.toString()[0];
  const secondNumberDay = dayOfMonth.toString()[1];

  const conditionForSumThree = sum1 - 2 * Number(firstNumberDay) === sum1;

  const sum3 = conditionForSumThree
    ? sum1 - 2 * Number(secondNumberDay)
    : sum1 - 2 * Number(firstNumberDay);

  const sum4 = sum3
    .toString()
    .split("")
    .map(Number)
    .reduce((acc, curr) => acc + curr, 0);

  const destinyNumber = getDestinyNumber(sum2);

  return { sum1, sum2, sum3, sum4, destinyNumber };
};

// Общая функция для поиска указанной цифры в массиве цифр
const findDigits = (
  date: string,
  obj: IResults | null,
  targetDigit: string
): string | null => {
  if (!obj) return null;

  const dateDigits = date.replace(/\D/g, "").split("");

  const { sum1, sum2, sum3, sum4 } = obj;

  const objDigits = [sum1, sum2, sum3, sum4].join("").split("");

  const allDigits = [...dateDigits, ...objDigits];

  const targetDigits = allDigits
    .filter((digit) => digit === targetDigit)
    .join("");

  return targetDigits.length > 0 ? targetDigits : REPLACEMENT_NULL;
};

export const getValueMatrix = (
  date: string,
  obj: IResults | null,
  value: string
) => findDigits(date, obj, value);

const getLength = (str: string) => {
  return !str || str === REPLACEMENT_NULL ? 0 : str.length;
};

const calculateTotalLength = (
  a: string | null,
  b: string | null,
  c: string | null
) => {
  if (a && b && c) {
    const lengthA = getLength(a);
    const lengthB = getLength(b);
    const lengthC = getLength(c);

    return String(lengthA + lengthB + lengthC);
  }
  return null;
};

export const getParams = (
  a: string | null,
  b: string | null,
  c: string | null
) => calculateTotalLength(a, b, c);
