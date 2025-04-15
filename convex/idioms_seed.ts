import { mutation } from './_generated/server'

const idioms = [
  {
    content: "It's raining cats and dogs",
    definition: "It's raining very heavily",
    example: "I can't go for a walk now - it's raining cats and dogs outside!",
  },
  {
    content: 'Break a leg',
    definition: 'Good luck (often used in theater)',
    example: 'Your performance is about to start - break a leg!',
  },
  {
    content: 'Piece of cake',
    definition: 'Something that is very easy to do',
    example: 'The math test was a piece of cake - I finished it in 20 minutes.',
  },
  {
    content: 'Cost an arm and a leg',
    definition: 'To be very expensive',
    example: 'That new smartphone costs an arm and a leg!',
  },
  {
    content: 'Hit the nail on the head',
    definition: 'To describe exactly what is causing a situation or problem',
    example:
      'You hit the nail on the head when you said the project needs better planning.',
  },
  {
    content: 'Under the weather',
    definition: 'Feeling sick or unwell',
    example:
      "I'm feeling a bit under the weather today, so I'll work from home.",
  },
  {
    content: 'Bite off more than you can chew',
    definition: 'To take on more responsibility than you can handle',
    example:
      'By signing up for five different clubs, Tom bit off more than he could chew.',
  },
  {
    content: 'Beat around the bush',
    definition: 'To avoid talking about something directly',
    example: 'Stop beating around the bush and tell me what happened!',
  },
  {
    content: 'Call it a day',
    definition: 'To stop working on something',
    example:
      "We've been at this for hours - let's call it a day and continue tomorrow.",
  },
  {
    content: 'Cut corners',
    definition: 'To do something in the easiest or cheapest way',
    example:
      "The builder cut corners and now we're having problems with the roof.",
  },
  {
    content: 'Get your act together',
    definition: 'To organize yourself and behave more appropriately',
    example:
      'You need to get your act together if you want to pass this course.',
  },
  {
    content: 'Pull yourself together',
    definition: 'To calm down and behave more sensibly',
    example:
      "I know you're upset, but you need to pull yourself together before the meeting.",
  },
  {
    content: 'Jump on the bandwagon',
    definition: 'To join an activity that has become very popular',
    example:
      "Everyone's jumping on the bandwagon of healthy eating these days.",
  },
  {
    content: 'Kill two birds with one stone',
    definition: 'To solve two problems with one action',
    example:
      'By cycling to work, I kill two birds with one stone: I save money and get exercise.',
  },
  {
    content: 'Let the cat out of the bag',
    definition: 'To reveal a secret accidentally',
    example:
      "I didn't mean to let the cat out of the bag about your surprise party!",
  },
  {
    content: 'Miss the boat',
    definition: 'To miss an opportunity',
    example:
      "If you don't apply today, you'll miss the boat - the deadline is midnight.",
  },
  {
    content: 'Once in a blue moon',
    definition: 'Very rarely',
    example:
      'I only see my cousins once in a blue moon since they moved abroad.',
  },
  {
    content: "Pull someone's leg",
    definition:
      'To joke with someone, often by trying to make them believe something untrue',
    example:
      "Don't worry, I was just pulling your leg about the exam being cancelled.",
  },
  {
    content: 'Sit on the fence',
    definition: 'To avoid choosing sides in a dispute',
    example:
      "You can't sit on the fence forever - you need to decide which proposal to support.",
  },
  {
    content: 'Spill the beans',
    definition: 'To reveal secret information',
    example: 'Come on, spill the beans! Tell us what happened at the meeting!',
  },
  {
    content: 'Take it with a grain of salt',
    definition: 'To not completely believe something',
    example:
      "Take his promises with a grain of salt - he often doesn't follow through.",
  },
  {
    content: 'The ball is in your court',
    definition: "It's your turn to take action",
    example: "I've sent you the proposal - the ball is in your court now.",
  },
  {
    content: 'Throw in the towel',
    definition: 'To give up',
    example:
      'After trying for hours to fix the computer, he threw in the towel and called a technician.',
  },
  {
    content: 'Time flies',
    definition: 'Time passes quickly',
    example:
      "Time flies when you're having fun - I can't believe it's already midnight!",
  },
  {
    content: 'When pigs fly',
    definition: 'Something that will never happen',
    example: "He'll clean his room when pigs fly!",
  },
  {
    content: 'Bite the bullet',
    definition: 'To force yourself to do something unpleasant',
    example: "I'll have to bite the bullet and go to the dentist eventually.",
  },
  {
    content: 'Break the ice',
    definition: 'To make people feel more comfortable in a social situation',
    example:
      'The team-building game helped break the ice at the new employee orientation.',
  },
  {
    content: 'Burn the midnight oil',
    definition: 'To work late into the night',
    example:
      "She's been burning the midnight oil to finish her thesis on time.",
  },
  {
    content: 'Cross that bridge when you come to it',
    definition: 'To deal with a problem only when it becomes necessary',
    example:
      "Don't worry about next year's schedule yet - we'll cross that bridge when we come to it.",
  },
  {
    content: 'Cut to the chase',
    definition: 'To get to the point without wasting time',
    example: "Let's cut to the chase - are you interested in the job or not?",
  },
  {
    content: 'Face the music',
    definition: 'To accept the consequences of your actions',
    example:
      'After breaking the window, he had to face the music when his parents came home.',
  },
  {
    content: 'Get out of hand',
    definition: 'To become uncontrollable',
    example:
      'The party got out of hand when uninvited guests started showing up.',
  },
  {
    content: 'Give someone the cold shoulder',
    definition: 'To deliberately ignore someone',
    example:
      'Ever since their argument, Tom has been giving Sarah the cold shoulder.',
  },
  {
    content: 'Go back to the drawing board',
    definition: 'To start over after a failure',
    example:
      "The design was rejected, so we'll have to go back to the drawing board.",
  },
  {
    content: 'Hit the books',
    definition: 'To study hard',
    example: 'Finals are next week, so I need to hit the books.',
  },
  {
    content: 'In hot water',
    definition: 'In trouble',
    example: "He's in hot water with his boss for missing the deadline.",
  },
  {
    content: 'Keep your chin up',
    definition: 'To stay cheerful in difficult situations',
    example: 'Keep your chin up - things will get better soon!',
  },
  {
    content: 'Make a long story short',
    definition: 'To tell something briefly',
    example:
      'To make a long story short, we missed our flight and had to stay an extra day.',
  },
  {
    content: 'On cloud nine',
    definition: 'Extremely happy',
    example: "She's been on cloud nine since she got engaged.",
  },
  {
    content: 'Out of the blue',
    definition: 'Unexpectedly',
    example: 'Out of the blue, my old friend called me after ten years.',
  },
  {
    content: 'Put all your eggs in one basket',
    definition: 'To risk everything on a single venture',
    example:
      "Don't put all your eggs in one basket - diversify your investments.",
  },
  {
    content: 'Actions speak louder than words',
    definition: 'What someone does means more than what they say they will do',
    example: "Don't just promise to help - actions speak louder than words.",
  },
  {
    content: 'Add fuel to the fire',
    definition: 'To make a bad situation even worse',
    example: 'His angry response just added fuel to the fire.',
  },
  {
    content: 'Back to square one',
    definition: 'Having to start over again',
    example:
      "The computer crashed and I lost my work - I'm back to square one.",
  },
  {
    content: 'Barking up the wrong tree',
    definition: 'Looking for solutions in the wrong place',
    example:
      "If you think I took your phone, you're barking up the wrong tree.",
  },
  {
    content: 'Best of both worlds',
    definition: 'Having the benefits of two different things',
    example:
      'Working from home gives you the best of both worlds - comfort and productivity.',
  },
  {
    content: 'Better late than never',
    definition: "It's better to do something late than not at all",
    example: 'I finally finished the project. Better late than never!',
  },
  {
    content: 'Blessing in disguise',
    definition:
      'Something that seems bad at first but turns out to be beneficial',
    example:
      'Losing my job was a blessing in disguise - I found a much better one.',
  },
  {
    content: 'Cry over spilled milk',
    definition: 'To complain about something that cannot be undone',
    example: "There's no use crying over spilled milk - what's done is done.",
  },
  {
    content: "Don't judge a book by its cover",
    definition: "Don't judge something by its appearance alone",
    example:
      "The restaurant looks plain, but don't judge a book by its cover - the food is amazing.",
  },
  {
    content: 'Every cloud has a silver lining',
    definition: 'Every difficult situation has a positive aspect',
    example:
      'The flight was cancelled, but every cloud has a silver lining - we got a free hotel stay.',
  },
  {
    content: 'Get a taste of your own medicine',
    definition: "To be treated the same way you've treated others",
    example:
      'He finally got a taste of his own medicine when someone played a prank on him.',
  },
  {
    content: 'Give someone the benefit of the doubt',
    definition: "To trust someone's explanation without proof",
    example:
      "I'll give you the benefit of the doubt this time, but don't be late again.",
  },
  {
    content: 'Go the extra mile',
    definition: 'To put in more effort than expected',
    example: 'She always goes the extra mile to help her students understand.',
  },
  {
    content: 'Hit the sack',
    definition: 'To go to bed',
    example: "I'm exhausted - I'm going to hit the sack.",
  },
  {
    content: 'In the same boat',
    definition: 'In the same difficult situation',
    example:
      "Don't worry, we're all in the same boat - none of us understood the lecture.",
  },
  {
    content: 'Keep an eye on',
    definition: 'To watch carefully',
    example: 'Can you keep an eye on my bag while I go to the restroom?',
  },
  {
    content: 'Learn the ropes',
    definition: 'To learn how to do a job or task',
    example:
      'It will take a few weeks to learn the ropes at your new position.',
  },
  {
    content: 'Make ends meet',
    definition: 'To earn just enough money to live on',
    example: 'She works two jobs to make ends meet.',
  },
  {
    content: 'On thin ice',
    definition: 'In a risky or dangerous situation',
    example: "After missing three deadlines, he's on thin ice with his boss.",
  },
  {
    content: 'Play it by ear',
    definition: 'To decide how to deal with a situation as it develops',
    example: "I'm not sure if I can make it - let's play it by ear.",
  },
  {
    content: 'Rule of thumb',
    definition: 'A general principle based on experience',
    example:
      'As a rule of thumb, arrive at the airport two hours before your flight.',
  },
  {
    content: 'See eye to eye',
    definition: 'To agree with someone',
    example:
      "We don't always see eye to eye, but we respect each other's opinions.",
  },
  {
    content: 'Take a rain check',
    definition: 'To postpone an activity for another time',
    example: "I can't make it to lunch today - can I take a rain check?",
  },
  {
    content: 'The last straw',
    definition: 'The final problem that makes a situation unbearable',
    example:
      'When the printer broke down, it was the last straw - I quit my job.',
  },
  {
    content: 'Under pressure',
    definition: 'Experiencing stress or anxiety',
    example: "He works best when he's under pressure.",
  },
  {
    content: 'A dime a dozen',
    definition: 'Very common and not special',
    example: 'These excuses are a dime a dozen - I want to hear the truth.',
  },
  {
    content: 'All ears',
    definition: 'Listening attentively',
    example: "Tell me about your idea - I'm all ears.",
  },
  {
    content: 'Bark is worse than their bite',
    definition: "Someone who seems aggressive but isn't actually harmful",
    example:
      "Don't worry about the new manager - his bark is worse than his bite.",
  },
  {
    content: 'Beat the clock',
    definition: 'To finish something before a deadline',
    example: 'We managed to beat the clock and submit the proposal on time.',
  },
  {
    content: "Catch someone's eye",
    definition: "To attract someone's attention",
    example: 'The colorful display caught my eye as I walked past the store.',
  },
  {
    content: 'Down to earth',
    definition: 'Practical and sensible',
    example: "Despite her success, she's very down to earth.",
  },
  {
    content: 'Easier said than done',
    definition: 'More difficult to do than to talk about',
    example: 'Learning a new language is easier said than done.',
  },
  {
    content: 'Fish out of water',
    definition: 'Someone in an uncomfortable situation',
    example: 'At the formal dinner, I felt like a fish out of water.',
  },
  {
    content: 'Get the ball rolling',
    definition: 'To start something happening',
    example: "Let's get the ball rolling with some introductions.",
  },
  {
    content: 'Hit the road',
    definition: 'To leave or start a journey',
    example: "It's getting late - we should hit the road.",
  },
  {
    content: 'In the nick of time',
    definition: 'At the last possible moment',
    example: 'The firefighters arrived in the nick of time.',
  },
  {
    content: 'Jump the gun',
    definition: 'To do something too soon',
    example: "Don't jump the gun - wait for the official announcement.",
  },
  {
    content: 'Keep your head up',
    definition: 'Stay optimistic in difficult times',
    example: "Keep your head up - you'll find a new job soon.",
  },
  {
    content: 'Like a fish takes to water',
    definition: 'To adapt to something very easily',
    example: 'She took to programming like a fish takes to water.',
  },
  {
    content: 'Make a mountain out of a molehill',
    definition: 'To exaggerate a minor problem',
    example:
      "Don't make a mountain out of a molehill - it's just a small mistake.",
  },
  {
    content: 'No pain, no gain',
    definition: 'Benefits require hard work',
    example: 'If you want to get fit, remember: no pain, no gain.',
  },
  {
    content: 'Off the hook',
    definition: 'Free from obligation or trouble',
    example: "The witness's testimony got him off the hook.",
  },
  {
    content: 'Penny for your thoughts',
    definition: 'Asking what someone is thinking about',
    example: 'You look deep in thought - penny for your thoughts?',
  },
  {
    content: 'Quick and dirty',
    definition: 'Done fast but roughly',
    example: 'We need a quick and dirty solution for now.',
  },
  {
    content: 'Ring a bell',
    definition: 'To sound familiar',
    example: "That name rings a bell, but I can't remember where I heard it.",
  },
  {
    content: 'Save the day',
    definition: 'To prevent a disaster or solve a problem',
    example: 'The backup generator saved the day during the power outage.',
  },
  {
    content: 'Take the bull by the horns',
    definition: 'To face a difficult situation directly',
    example: "It's time to take the bull by the horns and confront this issue.",
  },
  {
    content: 'Up in the air',
    definition: 'Uncertain or undecided',
    example: 'Our vacation plans are still up in the air.',
  },
  {
    content: 'Water under the bridge',
    definition: 'Past events that no longer matter',
    example: "We argued last week, but that's water under the bridge now.",
  },
  {
    content: 'Your guess is as good as mine',
    definition: "I don't know any more than you do",
    example: 'Where did I put my keys? Your guess is as good as mine.',
  },
]

export const seedIdioms = mutation({
  args: {},
  handler: async (ctx) => {
    for (const idiom of idioms) {
      await ctx.db.insert('idioms', idiom)
    }
    return `Added ${idioms.length} idioms to the database.`
  },
})
