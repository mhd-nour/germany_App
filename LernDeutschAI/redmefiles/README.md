# LernDeutsch AI - Mobile App

A German vocabulary learning app powered by AI image text extraction. Capture German text from real-world sources (menus, signs, books) and automatically build your vocabulary library.

## Features

- 📸 **Smart Capture**: Use camera or gallery to capture German text
- 🤖 **AI Extraction**: Automatic text extraction and vocabulary parsing (Phase 3)
- 📚 **Vocabulary Library**: Search, filter, and manage your vocabulary
- 🎯 **Grammar Support**: Articles (der/die/das), plurals, verb conjugation
- 📊 **Progress Tracking**: Mastery levels from New → Learning → Reviewing → Mastered
- 🌙 **Dark Theme**: Beautiful "Midnight Germany" dark mode design

## Tech Stack

- **Framework**: React Native with Expo SDK 50
- **Language**: TypeScript
- **Navigation**: React Navigation 6
- **Backend**: Supabase (Auth, Database, Storage)
- **Styling**: Custom design system with gradients

## Project Structure

```
LernDeutschAI/
├── App.tsx                 # Main entry point
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/         # Button, Input, Card, etc.
│   │   └── vocabulary/     # VocabularyCard, Form, etc.
│   ├── screens/            # App screens
│   │   ├── auth/           # Login, SignUp, ForgotPassword
│   │   ├── main/           # Dashboard, Profile
│   │   ├── capture/        # CaptureHome, Camera, Processing, Review
│   │   └── library/        # LibraryHome, VocabularyDetail, Edit
│   ├── navigation/         # Navigator configurations
│   ├── services/           # Supabase, Auth, Vocabulary services
│   ├── hooks/              # useAuth, useVocabulary
│   ├── theme/              # Colors, Typography, Spacing
│   ├── types/              # TypeScript types
│   └── config/             # Environment config
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator or Android Emulator (or physical device with Expo Go)

### Installation

1. **Install dependencies**:
   ```bash
   cd LernDeutschAI
   npm install
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env
   ```
   Fill in your Supabase credentials in `.env`

3. **Start the development server**:
   ```bash
   npm start
   # or
   npx expo start
   ```

4. **Run on device/emulator**:
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on physical device

## Supabase Setup

Before running the app, ensure you have:

1. Created a Supabase project
2. Set up the database schema (see `phase1_supabase.md`)
3. Configured Row Level Security policies
4. Added your credentials to `.env`

### Required Environment Variables

```
EXPO_PUBLIC_SUPABASE_URL=your-project-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Design System

### Color Palette (Midnight Germany Theme)

- **Primary**: Amber (#F59E0B) - Actions & highlights
- **Secondary**: Teal (#14B8A6) - Accents
- **Background**: Dark gradient (#0F172A → #1E293B)
- **Grammar Colors**:
  - der (Masculine): Blue (#3B82F6)
  - die (Feminine): Pink (#EC4899)
  - das (Neuter): Green (#22C55E)

### Word Categories

- Noun (with article & plural)
- Verb (with helper verb & past participle)
- Adjective
- Phrase
- Other

### Mastery Levels

1. **New** - Just added
2. **Learning** - Actively studying
3. **Reviewing** - Periodic review
4. **Mastered** - Fully learned

## Development Phases

- ✅ **Phase 1**: Supabase Backend Setup
- ✅ **Phase 2**: Mobile UI (This implementation)
- 🔲 **Phase 3**: Logic & Data Integration (Gemini AI)
- 🔲 **Phase 4**: Reliability & Offline Sync

## Scripts

```bash
npm start       # Start Expo dev server
npm run android # Run on Android
npm run ios     # Run on iOS
npm run lint    # Run ESLint
```

## Contributing

1. Follow the existing code style
2. Use TypeScript strict mode
3. Follow the design system guidelines
4. Test on both iOS and Android

## License

Private project - All rights reserved

---

Built with ❤️ for German learners
