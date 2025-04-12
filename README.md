# SupaTyper

SupaTyper is a typing game where users select a topic, type a dynamically generated paragraph, and earn a score based on speed and accuracy, with results displayed on a real-time leaderboard.

## Features

- Topic-based paragraph generation using OpenRouter's language model
- Scoring system that rewards speed and accuracy, ignoring punctuation errors
- Real-time leaderboard powered by Firebase
- Stylish, user-friendly interface with a specified color palette

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **External Services**: OpenRouter (for paragraph generation), Firebase (for leaderboard)
- **Package Manager**: pnpm

## Project Structure

The project follows a modular, maintainable structure:

```
supatyper/
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page
├── components/           # UI components
│   ├── common/           # Reusable UI components
│   └── features/         # Feature-specific components
├── context/              # React Context for state management
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and services
│   ├── api/              # API client
│   ├── firebase/         # Firebase integration
│   ├── openrouter/       # OpenRouter integration
│   └── utils/            # Utility functions
└── types/                # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- pnpm (v7 or later)
- OpenRouter API key
- Firebase project with Realtime Database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/supatyper.git
   cd supatyper
   ```

2. Create a `.env.local` file with your API keys:
   ```
   OPENROUTER_API_KEY=your_openrouter_api_key
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project_id.firebaseio.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

3. Run the setup script:
   ```bash
   ./run.sh
   ```

   This will:
   - Install pnpm if not already installed
   - Clean up any previous installation
   - Install dependencies with pnpm
   - Start the development server

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Firebase Setup

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/)
2. Enable Realtime Database
3. Set security rules (initially public for simplicity, refine later with authentication):
   ```json
   {
     "rules": {
       ".read": "true",
       ".write": "true"
     }
   }
   ```

## OpenRouter Setup

1. Create an account on [OpenRouter](https://openrouter.ai/)
2. Generate an API key
3. Add the API key to your `.env.local` file

## Deployment

The project can be easily deployed to Vercel:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Configure environment variables in the Vercel dashboard
4. Deploy

## License

This project is licensed under the MIT License - see the LICENSE file for details.
