# Event Planning POC

A proof of concept for an event planning system built with React, TypeScript, and Supabase. The application allows users to create events, propose multiple dates, and collect time preferences from participants to find the best meeting time.

## Features

- 📅 Event Creation: Create events with title, description, location, and multiple date proposals
- 👥 Time Preferences: Participants can mark their availability for each proposed date
- 🤖 Smart Recommendations: Analyze time preferences to suggest the best meeting times
- 📊 Event Management: View, edit, and delete events
- 🔒 User Authentication: Secure access with Supabase authentication
- 🎨 Modern UI: Clean and responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Form Management**: React Hook Form

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)

## Environment Setup

1. Create a `.env` file in the root directory with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Database Schema

The application uses the following main tables:

- `events`: Stores event details (title, description, location)
- `event_dates`: Stores proposed dates for each event
- `time_preferences`: Stores participant availability preferences

## Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
src/
├── components/         # React components
│   ├── EventCreation/ # Event creation components
│   ├── EventDetails/  # Event details view
│   ├── EventList/     # Event listing
│   └── ...
├── lib/               # Utilities and configurations
├── App.tsx           # Main application component
└── main.tsx         # Application entry point
```

## Features in Detail

### Event Creation
- Create events with multiple date proposals
- Add title, description, and location
- Dynamic form for adding multiple date options

### Time Preferences
- Participants can mark their availability as:
    - Available
    - Maybe
    - Unavailable
- Real-time updates of preferences

### Smart Recommendations
- Analyzes all participant preferences
- Suggests optimal meeting times based on availability
- Handles multiple date recommendations

## Contributing

This is a proof of concept project. Feel free to fork and extend it for your needs.

## License

MIT