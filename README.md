# React Native Movies App

## Overview

A React Native project (Expo) that displays trending and latest movies. Uses TypeScript, custom hooks, and Appwrite for backend data/storage.

## Tech stack

- TypeScript, JavaScript, Tailwind CSS, Nativewind CSS
- React Native, Expo
- Appwrite (backend)
- npm
- API Movie data is from TMDB 

## Prerequisites

- Node.js (16+)
- npm
- Expo CLI (optional: `npm install -g expo-cli`)
- Appwrite project and collection configured. (SignUp or SignIn)
- Create a developer account to access the TMDB API.(https://developer.themoviedb.org/docs/getting-started) 

## Setup

1. Clone repository and switch to `main` branch.
2. Install dependencies: As listed in the package.json
3. Configure the required environment variables for both APPWRITE and TMDB API keys. (example):
    - `APPWRITE_ENDPOINT=<your-appwrite-endpoint>`
    - `APPWRITE_PROJECT_ID=<your-project-id>`
    - `APPWRITE_DATABASE_ID=<your-database-id>`
    - `APPWRITE_COLLECTION_ID=<your-collection-id>`

      Place them in your `.env` or secure settings as used by the project.
4. Configure Appwrite collection schema: Ensure your Appwrite collection has these required attributes:
   - title_movie (string, required)
   - overview (string)
   - poster_path (string)
   - movie_id (string/number)
   - search_count (number)

## Run (development)

- Start Metro / Expo:

- Use WebStorm or Expo Go to run on device / simulator.
- Check Expo documentation. (https://docs.expo.dev/)

## Scripts

- `npm start` — start dev server
- `npm run ios` / `npm run android` — platform runs (if configured)
- `npm test` — run tests (if present)

## Project structure (key files)

```md
├── app/
│   └── (appPage)/
│       └── index.tsx           # Main home screen
├── components/
│   ├── SearchBar.tsx           # Search input component
│   ├── MovieCard.tsx           # Grid movie item
│   └── TrendingCard.tsx        # Horizontal trending card
├── servicesApi/
│   ├── useFetch.ts             # Custom data fetching hook
│   ├── api.ts                  # Third-party API helpers
│   └── appwrite.ts             # Appwrite integration
└── README.md
```

## Key Files

- `app/(appPage)/index.tsx` — renders main UI with SearchBar, TrendingCard, and MovieCard
- `components/MovieCard.tsx` — displays individual movie in grid
- `components/TrendingCard.tsx` — displays trending movies horizontally
- `servicesApi/useFetch.ts` — custom hook for data fetching
- `servicesApi/appwrite.ts` — Appwrite database operations

## Key concepts

- Data Fetching: Uses useFetch hook for trending and latest movies
- UI Components: Built with React Native FlatList and ScrollView
- Type Safety: Full TypeScript support for props and data structures
- Backend Integration: Appwrite handles data persistence and search tracking

## Common issues & fixes

### 1) Appwrite SDK Deprecation warning: 

Issue: `listDocuments`, `updateDocument`, `createDocument` showing as deprecated
- Cause: SDK version differences / API changes.
- Fix:
    - Update the Appwrite SDK to the version you intend to use and consult the official Appwrite JS SDK docs for the current method names.
    - Update your `servicesApi/appwrite` functions to call the current document methods exposed by your SDK. Typically you will:
        - Replace deprecated calls with the newer equivalents (check your SDK: e.g., method names may be `list`, `create`, `update` under a `database` or `databases` client).
    - Adjust parameters to match the new method signatures (collection id, data object, read/write permissions, etc.).

### 2) Error: `Invalid document structure: Missing required attribute "title_movie"`

- Cause: Appwrite collection has a required attribute `title_movie` but document payload is missing it.
- Fix:
    - Ensure every create/update payload includes `title_movie`.
    - Map movie data from external API to Appwrite document fields before creating/updating documents.

Example payload (ensure `title_movie` present):

```typescript
const payload = {
  title_movie: movie.title ?? movie.title_movie ?? '',
  overview: movie.overview,
  poster_path: movie.poster_path,
  // other fields...
};
// Use current Appwrite SDK method to create/update with this payload.
```

### 3.Debugging Tips

- Network Issues: Check network responses in browser/debugger to verify data structure
- Props Debugging: Add console.log(item) before rendering MovieCard to inspect data
- Appwrite Errors: Enable verbose logging to see full error details:
