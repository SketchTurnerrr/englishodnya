import { DictionaryResponse } from '@/types/dictionary';
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

export async function getWordDefinition(
  word: string
): Promise<DictionaryResponse | null> {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
        word
      )}`
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error('Error fetching definition:', error);
    return null;
  }
}

export const stopWords = new Set([
  // Articles
  'a',
  'an',
  'the',

  // Pronouns
  'i',
  'me',
  'my',
  'mine',
  'myself',
  'you',
  'your',
  'yours',
  'yourself',
  'he',
  'him',
  'his',
  'himself',
  'she',
  'her',
  'hers',
  'herself',
  'it',
  'its',
  'itself',
  'we',
  'us',
  'our',
  'ours',
  'ourselves',
  'they',
  'them',
  'their',
  'theirs',
  'themselves',
  'this',
  'that',
  'these',
  'those',

  // Prepositions
  'in',
  'on',
  'at',
  'to',
  'for',
  'of',
  'with',
  'by',
  'from',
  'up',
  'down',
  'into',
  'onto',
  'upon',
  'about',
  'above',
  'across',
  'after',
  'against',
  'along',
  'among',
  'around',
  'before',
  'behind',
  'below',
  'beneath',
  'beside',
  'between',
  'beyond',

  // Conjunctions
  'and',
  'but',
  'or',
  'nor',
  'so',
  'yet',
  'because',
  'although',
  'unless',
  'since',
  'while',

  // Auxiliary verbs
  'am',
  'is',
  'are',
  'was',
  'were',
  'be',
  'been',
  'being',
  'have',
  'has',
  'had',
  'do',
  'does',
  'did',
  'shall',
  'will',
  'should',
  'would',
  'may',
  'might',
  'must',
  'can',
  'could',

  // Other common words
  'there',
  'here',
  'where',
  'when',
  'why',
  'how',
  'all',
  'any',
  'both',
  'each',
  'few',
  'more',
  'most',
  'other',
  'some',
  'such',
  'than',
  'too',
  'very',
  'just',
  'now',
  'also',
  'then',

  // Numbers
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
  'twenty',
  'thirty',
  'forty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety',
  'hundred',
  'thousand',
]);
