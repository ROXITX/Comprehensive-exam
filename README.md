# CompreQuest 🎓

Gamified, mobile-first MCQ prep for the **CSE1907 Comprehensive Examination** (M.Tech CSE & Business Analytics).

- Every syllabus subject, organised topic by topic
- All question-bank (2022 & 2023 batch) questions, with answers re-checked, plus 4–5 similar questions for each
- An explanation for every option, a one-line memory hook, and quick-revision cards for each topic
- XP, levels, streaks, combos, boss rounds with stars, badges, a 60-second Blitz mode and a 100-question timed mock exam
- Spaced-repetition review queue and a mistake book
- Works offline (PWA, installable). Optional Firebase Google sign-in syncs progress across devices.

## Hosting (GitHub Pages)
Settings → Pages → Build and deployment → Source: **Deploy from a branch** → pick this branch and `/ (root)`.

## Firebase sync (optional)
1. Firebase console → Project settings → Your apps → add a **Web app**, then copy its config into `firebase-config.js`.
2. Authentication → Sign-in method → enable **Google**. Under Authentication → Settings → Authorized domains, add `<your-user>.github.io`.
3. Firestore Database → create database, then paste `firestore.rules` into the Rules tab.

## Editing content
Questions live in `content/*.md` (format documented at the top of `scripts/build.mjs`).
After editing, run `node scripts/build.mjs` to regenerate `data/*.json`. The build checks that every question has exactly one correct answer and an explanation for every option.
