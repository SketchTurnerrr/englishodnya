export interface Word {
  word: string
  definition: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export const spellingWords: Word[] = [
  // Easy Words
  {
    word: 'apple',
    definition: 'A round fruit with red or green skin and white flesh',
    difficulty: 'easy',
  },
  {
    word: 'book',
    definition: 'A written or printed work consisting of pages',
    difficulty: 'easy',
  },
  {
    word: 'house',
    definition: 'A building for human habitation',
    difficulty: 'easy',
  },
  {
    word: 'smile',
    definition: "Form one's features into a pleased expression",
    difficulty: 'easy',
  },
  {
    word: 'water',
    definition: 'A clear liquid essential for life',
    difficulty: 'easy',
  },

  {
    word: 'clean',
    definition: 'Clear of dirt, stains, or other impurities',
    difficulty: 'easy',
  },
  {
    word: 'green',
    definition: 'Of or pertaining to the color between blue and yellow',
    difficulty: 'easy',
  },
  {
    word: 'happy',
    definition: 'Feeling or showing pleasure and contentment',
    difficulty: 'easy',
  },
  {
    word: 'rain',
    definition: 'Precipitation of water droplets in the form of raindrops',
    difficulty: 'easy',
  },
  {
    word: 'sun',
    definition: 'The starlight, especially the light of the sun',
    difficulty: 'easy',
  },

  // Medium Words
  {
    word: 'beautiful',
    definition: 'Pleasing to the senses or mind aesthetically',
    difficulty: 'medium',
  },
  {
    word: 'adventure',
    definition: 'An exciting or remarkable experience',
    difficulty: 'medium',
  },
  {
    word: 'knowledge',
    definition: 'Facts, information, and skills acquired through experience',
    difficulty: 'medium',
  },
  {
    word: 'important',
    definition: 'Of great significance or value',
    difficulty: 'medium',
  },
  {
    word: 'exercise',
    definition: 'Activity requiring physical effort',
    difficulty: 'medium',
  },

  // Hard Words
  {
    word: 'consciousness',
    definition: "The state of being aware of one's surroundings",
    difficulty: 'hard',
  },
  {
    word: 'phenomenon',
    definition: 'A fact or situation that is observed to exist',
    difficulty: 'hard',
  },
  {
    word: 'enthusiasm',
    definition: 'Intense and eager enjoyment, interest, or approval',
    difficulty: 'hard',
  },
  {
    word: 'necessary',
    definition: 'Required to be done, achieved, or present',
    difficulty: 'hard',
  },
  {
    word: 'pronunciation',
    definition: 'The way in which a word is pronounced',
    difficulty: 'hard',
  },
]
