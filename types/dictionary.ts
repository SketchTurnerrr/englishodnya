// export interface DictionaryResponse {
//   word: string;
//   phonetic?: string;
//   phonetics: {
//     text?: string;
//     audio?: string;
//     sourceUrl?: string;
//     license?: {
//       name: string;
//       url: string;
//     };
//   }[];
//   meanings: {
//     partOfSpeech: string;
//     definitions: {
//       definition: string;
//       example?: string;
//       synonyms: string[];
//       antonyms: string[];
//     }[];
//   }[];
//   license?: {
//     name: string;
//     url: string;
//   };
//   sourceUrls?: string[];
// }

export type DictionaryResponse = Result[];

export type Result = {
  word?: string;
  phonetics?: Phonetic[];
  meanings?: Meaning[];
  license?: License;
  sourceUrls?: string[];
};

export type License = {
  name?: string;
  url?: string;
};

export type Meaning = {
  partOfSpeech?: string;
  definitions?: Definition[];
  synonyms?: string[];
  antonyms?: string[];
};

export type Definition = {
  definition?: string;
  synonyms?: any[];
  antonyms?: any[];
  example?: string;
};

export type Phonetic = {
  audio?: string;
  sourceUrl?: string;
  license?: License;
  text?: string;
};
