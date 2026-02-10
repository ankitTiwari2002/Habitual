# Habitual

Master your days and transform your life with Habitual. An AI-powered habit tracker designed to help you build lasting routines.

## Features

- **Habit Tracking:** Easy one-tap logging for daily and weekly habits.
- **AI Coach:** Get personalized habit suggestions based on your interests and goals powered by Genkit.
- **Real-time Statistics:** Visualize your consistency with activity charts, completion rates, and streak tracking.
- **Secure Authentication:** Robust email and password authentication with strong password protection.
- **Modern UI:** Clean, responsive interface built with Tailwind CSS and Shadcn UI.
- **Live Data:** Instant synchronization across devices using Firebase Firestore.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
- **Database & Auth:** [Firebase](https://firebase.google.com/) (Firestore & Authentication)
- **AI Engine:** [Genkit](https://github.com/firebase/genkit) for intelligent habit recommendations
- **Icons:** [Lucide React](https://lucide.dev/)
- **Charts:** [Recharts](https://recharts.org/)

## Getting Started

### Prerequisites

- Node.js 18+ installed.
- A Firebase project set up.

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure Firebase:
   Update `src/firebase/config.ts` with your Firebase project credentials.

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:9002](http://localhost:9002) in your browser.

## Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components.
- `src/ai`: Genkit flows and AI prompt definitions.
- `src/hooks`: Custom React hooks for habits, stats, and mobile detection.
- `src/firebase`: Firebase client initialization and utility functions.
# Habitual
# Habitual
