import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function conjugateDay(number: number): string {
  const numberStr = String(number);
  const lastTwoDigits =
    numberStr.length >= 2 ? parseInt(numberStr.slice(-2)) : number;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'днів';
  }

  const lastDigit = number % 10;

  if (lastDigit === 1) {
    return 'день';
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return 'дні';
  } else {
    return 'днів';
  }
}
