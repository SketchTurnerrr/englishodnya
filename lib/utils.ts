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
): Promise<DictionaryResponse> {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
        word
      )}`
    );
    if (!response.ok) return [];
    const data: DictionaryResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching definition:', error);
    return [];
  }
}

export function getLocalISODate(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getYesterdayLocalISODate(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return getLocalISODate(yesterday);
}

export const stopWords = new Set([
  // Contractions
  "'s",
  "'ll",
  "'re",
  "'ve",
  "n't",
  "'d",
  "o'clock",
  "can't",
  "didn't",
  "doesn't",
  "don't",
  "hadn't",
  "hasn't",
  "haven't",

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

// const speakWord = () => {
//   if (!currentWord) return;

//   const synth = window.speechSynthesis;

//   const speak = () => {
//     const voices = synth.getVoices();
//     console.log('Available voices:', voices);
//     let selectedVoice = voices.find((v) => v.name === 'Google US English');
//     if (!selectedVoice) {
//       // fallback to en‑US or first available
//       selectedVoice =
//         voices.find((v) => v.lang.startsWith('en-US')) || voices[0];
//     }
//     console.log('Selected voice:', selectedVoice);

//     const utterance = new SpeechSynthesisUtterance(currentWord.word);
//     if (selectedVoice) utterance.voice = selectedVoice;
//     utterance.lang = 'en-US';
//     synth.cancel(); // clear any ongoing speech
//     synth.speak(utterance);
//   };

//   // speak right away, and again if voices load later
//   speak();
//   synth.addEventListener('voiceschanged', speak);
// };
