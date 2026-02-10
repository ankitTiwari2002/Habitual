# **App Name**: Habitual

## Core Features:

- Secure Authentication: Users can sign up and log in securely using Firebase Authentication (email/password, Google Sign-In) with protected routes and auth persistence.
- Habit Management (CRUD): Users can create, read, update, and delete habits, specifying title, description, frequency, and active status.
- Daily Habit Tracking: Users can mark habits as completed or not completed for the current day, with prevention of duplicate logs.
- Streak Calculation and Display: Calculate and display the user's current streak, best streak, and missed days for each habit, providing motivational feedback.
- Analytics Dashboard: Display key metrics like total habits, completion percentage, and weekly/monthly progress using charts and graphs powered by Chart.js or Recharts.
- Personalized Habit Suggestions (AI): Leverage AI to suggest new habits based on user's profile, existing habits, and goals. The tool incorporates information only when confident of the suggestion's relevance.
- Data Persistence: Data will be stored using Firestore, according to the defined schema

## Style Guidelines:

- Primary color: Deep purple (#6750A4), evoking sophistication and focus.
- Background color: Light lavender (#E6E0EA), providing a calm and unobtrusive backdrop.
- Accent color: Soft periwinkle (#B0A5C6) is used for secondary actions, enhancing visual appeal without overwhelming the interface.
- Body and headline font: 'Inter', a sans-serif font known for its readability and modern aesthetic. 'Inter' will be used throughout for headlines and body text, ensuring consistency and clarity.
- Use minimalist, outline-style icons to represent different habit categories and actions.  Icons should be easily recognizable and consistently styled throughout the app.
- Dashboard features a clean, card-based layout for displaying habits.  A sidebar or top navigation provides easy access to different sections of the app. Ensure a responsive design for access across devices.
- Implement smooth transitions and subtle animations (e.g., hover effects, loading states) to enhance the user experience and provide visual feedback. Animations should be used sparingly to avoid overwhelming the user.