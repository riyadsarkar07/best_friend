# Our Little World

A handmade digital scrapbook you can give as a friendship surprise. It opens with an envelope, then becomes a wandering set of polaroids, a timeline, scratch cards, a letter, a tiny quiz, hidden notes, and a printable best-friend certificate.

Personal details live in one file. Until you replace them, the site uses clearly labeled sample copy and illustrated placeholders. It never pretends those placeholders are real photographs or real memories.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Motion for React
- Lucide icons

## Local setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Personalization

Edit `src/data/friendship-config.ts`. That file controls:

- Friend name and sender name
- Intro copy and welcome message
- Letter greeting, paragraphs, closing, and signature
- Gallery captions, dates, notes, and optional photo paths
- Timeline dates, titles, and descriptions
- Scratch-card messages
- Quiz questions, answers, and result bands
- Easter-egg notes
- Finale copy and certificate text
- Optional music path

Keep the writing warm and specific. Do not invent memories that did not happen.

### Photographs

Put images in `public/photos/`, then set each gallery item like this:

```ts
{
  id: "photo-1",
  src: "/photos/picnic.jpg",
  alt: "The two of you on a picnic blanket",
  caption: "The sandwiches were chaotic",
  date: "June 2024",
  note: "We stayed until the park lights came on.",
  placeholder: { from: "#F3C9A4", to: "#E8A0A8", motif: "picnic" },
}
```

Leave `src` empty to keep the illustrated placeholder. The lightbox will say it is placeholder artwork.

### Music

Add a licensed audio file, for example `public/audio/soft-song.mp3`, then set:

```ts
musicSrc: "/audio/soft-song.mp3",
musicLabel: "A soft song for wandering",
```

If `musicSrc` is empty, the player stays visible but disabled. Music never autoplays.

## Features

- Animated envelope opening with a letter reveal
- Scrapbook home titled from the config
- Polaroid gallery with lightbox, keyboard support, and previous/next controls
- Friendship timeline with scroll reveals
- Six scratch-to-reveal cards for mouse, touch, and keyboard
- Handwritten letter with replay
- Optional friendship quiz with replayable results
- Three hidden interactions
- Final certificate that can be saved as a PNG
- Optional music controls
- Reduced-motion support and visible focus states
- No accounts, analytics, or server-side collection of personal messages

## Deploy on Vercel

1. Push this repository to GitHub.
2. Import the repo in Vercel.
3. Keep the default Next.js settings.
4. Deploy.

Useful git commands after you have reviewed the diff:

```bash
git add .
git commit -m "Add friendship scrapbook surprise website"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## Project map

- `src/data/friendship-config.ts` — all editable content
- `src/components/` — envelope, gallery, timeline, scratch cards, letter, quiz, finale
- `src/app/page.tsx` — experience entry
- `public/photos/` — optional photographs
- `public/audio/` — optional music
