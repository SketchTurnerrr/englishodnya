export interface DictionaryResponse {
  word: string;
  phonetic?: string;
  phonetics: {
    text?: string;
    audio?: string;
  }[];
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example?: string;
      synonyms: string[];
      antonyms: string[];
    }[];
  }[];
}

interface WordDefinition {
  word: string;
  definition: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective';
}
