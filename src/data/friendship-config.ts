export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  date: string;
  note: string;
  placeholder: {
    from: string;
    to: string;
    motif: "sunrise" | "notes" | "rain" | "picnic" | "night" | "letters";
  };
};

export type TimelineEntry = {
  id: string;
  date: string;
  title: string;
  description: string;
  tag: string;
  photoSrc?: string;
};

export type ScratchCardContent = {
  id: string;
  label: string;
  title: string;
  body: string;
  foil: string;
  prompt: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: { id: string; label: string; points: number }[];
};

export type QuizResult = {
  minScore: number;
  title: string;
  body: string;
};

export type EasterEgg = {
  id: string;
  title: string;
  hint: string;
  message: string;
};

export type NavSection = {
  id: string;
  label: string;
};

export type FriendshipConfig = {
  friendName: string;
  senderName: string;
  siteTitle: string;
  introEyebrow: string;
  introHeadline: string;
  introSubhead: string;
  openButtonLabel: string;
  introStamp: string;
  introPostscript: string;
  introSealNote: string;
  welcomeTitle: string;
  welcomeEyebrow: string;
  welcomeMessage: string;
  welcomeSignature: string;
  navSections: NavSection[];
  galleryEyebrow: string;
  galleryTitle: string;
  galleryIntro: string;
  galleryNote: string;
  timelineEyebrow: string;
  timelineTitle: string;
  timelineIntro: string;
  scratchEyebrow: string;
  scratchTitle: string;
  scratchIntro: string;
  letterEyebrow: string;
  letterTitle: string;
  letterIntro: string;
  letterGreeting: string;
  letterBody: string[];
  letterClosing: string;
  letterSignature: string;
  quizEyebrow: string;
  quizTitle: string;
  quizIntro: string;
  quizQuestions: QuizQuestion[];
  quizResults: QuizResult[];
  easterEggs: EasterEgg[];
  finaleEyebrow: string;
  finaleTitle: string;
  finaleMessage: string;
  finaleLockedNote: string;
  finaleUnlockedNote: string;
  certificateTitle: string;
  certificateAward: string;
  certificateBody: string;
  certificateFootnote: string;
  gallery: GalleryPhoto[];
  timeline: TimelineEntry[];
  scratchCards: ScratchCardContent[];
  musicSrc: string;
  musicLabel: string;
};

export const friendshipConfig: FriendshipConfig = {
  friendName: "Riley",
  senderName: "Jordan",
  siteTitle: "Our Little World",

  introEyebrow: "A tiny gift, made by hand",
  introHeadline: "Hey, Riley",
  introSubhead:
    "There is something tucked inside this envelope. Nothing urgent. Nothing you have to earn. Just a small corner of the internet made only for you.",
  openButtonLabel: "Open your surprise",
  introStamp: "Handle with care",
  introPostscript: "No rush. Open it whenever you are ready.",
  introSealNote: "Press the seal",

  welcomeTitle: "Our Little World",
  welcomeEyebrow: "The first page",
  welcomeMessage:
    "This is a quiet corner of the internet folded into a scrapbook. Wander through it the way you would a shoebox of notes: slowly, with snacks, and with no required order. Every page is yours to keep.",
  welcomeSignature: "Made slowly, with far too much tape",

  navSections: [
    { id: "home", label: "Home" },
    { id: "gallery", label: "Gallery" },
    { id: "timeline", label: "Timeline" },
    { id: "scratch", label: "Secrets" },
    { id: "letter", label: "Letter" },
    { id: "quiz", label: "Quiz" },
    { id: "finale", label: "Finale" },
  ],

  galleryEyebrow: "Chapter one",
  galleryTitle: "Polaroids on the table",
  galleryIntro:
    "Pictures you can almost hear. Tap any frame to hold it closer, read the caption, and linger for a moment.",
  galleryNote:
    "These frames are waiting for your real photographs. Until then, each one is an honest illustrated placeholder, never a pretend memory.",

  timelineEyebrow: "Chapter two",
  timelineTitle: "The story so far",
  timelineIntro:
    "A handful of chapters, pressed between the pages. Dates, titles, and descriptions all live in one editable file.",

  scratchEyebrow: "Chapter three",
  scratchTitle: "Six little secrets",
  scratchIntro:
    "Scratch gently with a finger or mouse, or use the reveal button if that is easier. When all six are open, the last page unlocks.",

  letterEyebrow: "Chapter four",
  letterTitle: "A letter, just for you",
  letterIntro:
    "Open the envelope whenever you like. You do not need to finish the rest of the scrapbook first.",

  letterGreeting: "Dear Riley,",
  letterBody: [
    "I made this little corner of the internet just for you. Life gets busy, but sometimes it is important to remind the people who matter that we are glad they are part of our story.",
    "Here is a tiny reminder that you are an important part of mine. Thank you for the jokes that land at the wrong volume, the check-ins that arrive at the right time, and the way you make ordinary Tuesdays feel less ordinary.",
    "Replace these paragraphs with your own words. Keep it sincere, keep it warm, and keep it yours.",
  ],
  letterClosing: "Always in your corner,",
  letterSignature: "Jordan",

  quizEyebrow: "An optional, silly exam",
  quizTitle: "How well do we know our own chaos?",
  quizIntro:
    "No wrong answers here, only revealing ones. Pick what feels most true and see which kind of friendship you have accidentally built.",

  quizQuestions: [
    {
      id: "q1",
      prompt: "Our official friendship snack is...",
      options: [
        { id: "q1a", label: "Something crunchy and shared too loudly", points: 2 },
        { id: "q1b", label: "Whatever was left in the kitchen", points: 1 },
        { id: "q1c", label: "A very serious pastry", points: 2 },
        { id: "q1d", label: "We forget to eat and then panic", points: 1 },
      ],
    },
    {
      id: "q2",
      prompt: "If we are late, it is because...",
      options: [
        { id: "q2a", label: "One of us found a dog", points: 2 },
        { id: "q2b", label: "The playlist needed one more song", points: 1 },
        { id: "q2c", label: "We were already talking in the doorway", points: 2 },
        { id: "q2d", label: "Time is a social construct", points: 1 },
      ],
    },
    {
      id: "q3",
      prompt: "A perfect hang looks like...",
      options: [
        { id: "q3a", label: "Errands that become an odyssey", points: 2 },
        { id: "q3b", label: "The same cafe booth, indefinitely", points: 2 },
        { id: "q3c", label: "A walk with no destination", points: 1 },
        { id: "q3d", label: "Silence, snacks, and excellent company", points: 1 },
      ],
    },
    {
      id: "q4",
      prompt: "Our texting style is best described as...",
      options: [
        { id: "q4a", label: "Novels, then three days of quiet", points: 1 },
        { id: "q4b", label: "A stream of photos with no context", points: 2 },
        { id: "q4c", label: "Voice notes that could be podcasts", points: 2 },
        { id: "q4d", label: "One word, perfectly timed", points: 1 },
      ],
    },
    {
      id: "q5",
      prompt: "The unofficial motto of this friendship is...",
      options: [
        { id: "q5a", label: "We can figure it out", points: 2 },
        { id: "q5b", label: "This is fine, and also hilarious", points: 2 },
        { id: "q5c", label: "Bring a cardigan", points: 1 },
        { id: "q5d", label: "See you in the group chat", points: 1 },
      ],
    },
  ],
  quizResults: [
    {
      minScore: 0,
      title: "Comfortable chaos, certified",
      body: "You two do not need matching answers. You need snacks, a shared look, and someone who laughs at the same wrong moment.",
    },
    {
      minScore: 6,
      title: "Honorary sibling energy",
      body: "You know the rhythms. You finish the stories. You still surprise each other, which is the whole trick.",
    },
    {
      minScore: 9,
      title: "Best-friend folklore in progress",
      body: "This is the kind of score that comes with a lifetime membership, a private language, and excellent seating at every table.",
    },
  ],

  easterEggs: [
    {
      id: "egg-star",
      title: "A star you were not supposed to notice",
      hint: "A small star is hiding near the top of the page.",
      message:
        "You found the quiet wish. May your next ordinary day come with excellent lighting and a text that arrives on time.",
    },
    {
      id: "egg-sticker",
      title: "The sticker did a little dance",
      hint: "A flower sticker is pressed somewhere along the edge.",
      message:
        "Some friendships are a pressed flower in a book. Yours is the book, the flower, and the person who keeps forgetting the bookmark.",
    },
    {
      id: "egg-note",
      title: "A note tucked in the margin",
      hint: "A tiny heart is folded into the lower corner.",
      message:
        "P.S. You are easy to root for. That is not a small thing. Please drink some water and text back when you can.",
    },
  ],

  finaleEyebrow: "The last page",
  finaleTitle: "You made it to the very end",
  finaleMessage:
    "Not because you had to finish everything, but because this page wanted to say it plainly: I am glad you are in my story.",
  finaleLockedNote:
    "The certificate is still tucked away. Scratch open all six secrets above and this page will celebrate properly.",
  finaleUnlockedNote: "You found every secret. The certificate is officially yours.",

  certificateTitle: "Official Best Friend Certificate",
  certificateAward: "Keeper of the Shared Brain Cell",
  certificateBody:
    "This lifetime membership includes unlimited inside jokes, emergency pep talks, and the right to steal fries without asking.",
  certificateFootnote: "Lifetime membership, no expiration date.",

  gallery: [
    {
      id: "photo-1",
      src: "",
      alt: "Placeholder polaroid with a warm sunrise wash",
      caption: "A morning you both remember",
      date: "Add a date",
      note: "Swap this for a real photo in the config.",
      placeholder: { from: "#F3C9A4", to: "#E8A0A8", motif: "sunrise" },
    },
    {
      id: "photo-2",
      src: "",
      alt: "Placeholder polaroid with handwritten note motifs",
      caption: "A scrap of handwriting",
      date: "Add a date",
      note: "Use a photo of a ticket, note, or doodle.",
      placeholder: { from: "#E7D7C4", to: "#C9B8D9", motif: "notes" },
    },
    {
      id: "photo-3",
      src: "",
      alt: "Placeholder polaroid with rainy window colors",
      caption: "A quiet afternoon",
      date: "Add a date",
      note: "Rainy walks count as lore.",
      placeholder: { from: "#B7C6C2", to: "#8FA3B0", motif: "rain" },
    },
    {
      id: "photo-4",
      src: "",
      alt: "Placeholder polaroid with picnic colors",
      caption: "A shared snack",
      date: "Add a date",
      note: "Food photos are always legal tender.",
      placeholder: { from: "#D7E3C4", to: "#E8C4A0", motif: "picnic" },
    },
    {
      id: "photo-5",
      src: "",
      alt: "Placeholder polaroid with night-sky colors",
      caption: "A late conversation",
      date: "Add a date",
      note: "Keep the caption short and specific.",
      placeholder: { from: "#C5B4D4", to: "#6E7A9B", motif: "night" },
    },
    {
      id: "photo-6",
      src: "",
      alt: "Placeholder polaroid with stacked letter colors",
      caption: "Something only you two would get",
      date: "Add a date",
      note: "Inside jokes welcome. Oversharing optional.",
      placeholder: { from: "#F2D6C8", to: "#B9C9A8", motif: "letters" },
    },
  ],

  timeline: [
    {
      id: "t1",
      date: "Edit this date",
      title: "The day the story starts",
      description:
        "Replace this with how you met, or the first time it felt easy to be yourselves. Keep it specific and kind.",
      tag: "Beginning",
    },
    {
      id: "t2",
      date: "Edit this date",
      title: "A season of inside jokes",
      description:
        "Add the nickname, the running gag, or the snack that became a ritual. This is sample copy, not a real memory.",
      tag: "Lore",
    },
    {
      id: "t3",
      date: "Edit this date",
      title: "A hard week, handled together",
      description:
        "Write about showing up. A ride, a voice note, a ridiculous meme sent at 1am. Sample text only.",
      tag: "Anchor",
    },
    {
      id: "t4",
      date: "Edit this date",
      title: "A tiny adventure",
      description:
        "A wrong turn, a shared playlist, a museum bench, a spectacularly average meal that still became a story.",
      tag: "Adventure",
    },
    {
      id: "t5",
      date: "Still being written",
      title: "Whatever comes next",
      description:
        "Leave room for the unplanned chapters. Friendship is less a highlight reel and more a well-loved paperback.",
      tag: "Ongoing",
    },
  ],

  scratchCards: [
    {
      id: "scratch-1",
      label: "Card 01",
      prompt: "A gentle roast",
      title: "A gentle roast",
      body: "You still laugh at your own jokes first, and honestly the rest of us are just trying to keep up.",
      foil: "#7F946F",
    },
    {
      id: "scratch-2",
      label: "Card 02",
      prompt: "A secret compliment",
      title: "A secret compliment",
      body: "You make rooms kinder without making a speech about it. That is a rare and excellent talent.",
      foil: "#C98991",
    },
    {
      id: "scratch-3",
      label: "Card 03",
      prompt: "A memory you fill in",
      title: "A memory to fill in",
      body: "Replace this with a tiny moment only the two of you would remember. Keep it small. Small is the point.",
      foil: "#D4A37A",
    },
    {
      id: "scratch-4",
      label: "Card 04",
      prompt: "An appreciation note",
      title: "An appreciation note",
      body: "Thank you for showing up on the messy days, and for making the easy days feel like they were chosen on purpose.",
      foil: "#9B87B0",
    },
    {
      id: "scratch-5",
      label: "Card 05",
      prompt: "A friendship prediction",
      title: "A friendship prediction",
      body: "In ten years you will still send the most unhinged voice notes, and they will still be the highlight of the week.",
      foil: "#6F8F88",
    },
    {
      id: "scratch-6",
      label: "Card 06",
      prompt: "The final secret",
      title: "The final secret",
      body: "You are officially stuck with this friendship. No refunds, no trial period, unlimited snacks.",
      foil: "#B76E79",
    },
  ],

  musicSrc: "",
  musicLabel: "A soft song for wandering",
};
