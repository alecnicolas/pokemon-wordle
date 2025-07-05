# PokeGuesser

A fun guessing game where you try to identify a secret Pokémon based on clues such as types, height, weight, and generation.

---

## How to Play

- The game randomly selects a secret Pokémon.
- You have **8 guesses** to figure out which Pokémon it is.
- Each guess requires you to enter a Pokémon’s name.
- After each guess, you receive clues comparing your guess to the secret Pokémon:
  - **Types**: Colored chips show if your guessed Pokémon shares types with the secret one.
  - **Height & Weight**: Arrows indicate if your guess is taller/shorter or heavier/lighter.
  - **Generation**: Indicates if your guess belongs to the same generation as the secret Pokémon.
- Use these clues to narrow down your guesses and find the correct Pokémon.
- If you guess correctly, the Pokémon name appears in green with a checkmark.
- If you run out of guesses, the secret Pokémon is revealed in red with an "X".

---

## Local Setup Instructions

Follow these steps to run the app locally on your machine:

### Prerequisites

- Node.js (version 18+ recommended)
- npm (comes with Node.js)
- Git (optional, for cloning repo)

### Clone the Repository (if needed)

```bash
git clone https://github.com/alecnicolas/pokemon-wordle.git
cd pokemon-wordle
```

### Install Dependencies

Install all required packages using npm:

```bash
npm install
```
### Run the development server

Start the app locally with:

```bash
npm run dev
```

This will launch a local dev server, usually at:

```bash
  http://localhost:5173/
```

Open this URL to play in your browser.

### Tech used
- React with Typescript
- Vite
- Tailwind CSS
- PokeAPI

### Notes
- The app uses live data from PokeAPI so an internet connection is required
