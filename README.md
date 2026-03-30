# 🌾 Ceres — Calorie Counter

A personal calorie-tracking dashboard built to get hands-on with **TypeScript** and **Tailwind CSS v4**.  
Named after the Roman goddess of agriculture, Ceres helps you log meals, set nutritional goals, and visualise your intake over time.

## Features

- **Daily Logging** — Track calories, protein, carbs, and fat across breakfast, lunch, dinner, and snacks.
- **Food Search** — Look up real products via the [Open Food Facts](https://world.openfoodfacts.org/) API with debounced search.
- **Smart Goal Setting** — Choose between custom macros or TDEE-based presets (weight loss / maintenance / muscle gain) calculated with the Mifflin-St Jeor equation.
- **Weekly Chart** — Bar chart powered by Recharts showing the last 7 days of calorie intake.
- **Progress Indicators** — Circular and linear progress bars for calories and individual macronutrients.
- **Date Picker** — Navigate between days to review or edit past entries.
- **Dark Mode** — Full light / dark theme toggle with smooth animated switch.
- **Persistent Storage** — All data persists in `localStorage` via Zustand's `persist` middleware.
- **Animations** — Entry/exit transitions and layout animations courtesy of Framer Motion.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Build Tool | [Vite 7](https://vite.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| State Management | [Zustand](https://zustand.docs.pmnd.rs/) |
| Forms | [React Hook Form](https://react-hook-form.com/) |
| Charts | [Recharts](https://recharts.org/) |
| Animations | [Framer Motion](https://motion.dev/) |
| HTTP Client | [Axios](https://axios-http.com/) |
| Date Utilities | [date-fns](https://date-fns.org/) |

## Project Structure

```
src/
├── components/
│   ├── AddFoodForm/       # Inline form to add a food entry to a meal
│   ├── Button/            # Reusable button component
│   ├── CircularProgress/  # Circular calorie progress ring
│   ├── DailyLog/          # Daily summary: progress + macros + date picker
│   ├── DatePicker/        # Calendar date selector (react-day-picker)
│   ├── FoodEntryItem/     # Single logged food item with delete action
│   ├── FoodSearch/        # Product search panel (Open Food Facts API)
│   ├── Header/            # App header with settings & theme toggle
│   ├── Meals/             # Meal sections (breakfast, lunch, dinner, snacks)
│   ├── NutrientCard/      # Card displaying a search result's nutrients
│   ├── NutrientsProgress/ # Linear progress bars for protein, carbs & fat
│   ├── SetGoalsForm/      # Modal form for configuring nutrition goals
│   └── WeekChart/         # 7-day calorie bar chart
├── hooks/
│   └── useDebounce.ts     # Debounce hook for search input
├── lib/
│   ├── api.ts             # Open Food Facts API integration
│   └── store.ts           # Zustand store (entries, goals, theme)
├── types/
│   └── index.ts           # Shared TypeScript interfaces
├── App.tsx                # Root layout
├── main.tsx               # Entry point
└── main.css               # Tailwind config & theme tokens
```

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** (or any compatible package manager)

### Install & Run

```bash
# Clone the repo
git clone https://github.com/<your-username>/ceres-calorie-counter.git
cd ceres-calorie-counter

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Purpose

This project is a **learning exercise** focused on:

- Writing idiomatic **TypeScript** with strict typing (interfaces, generics, discriminated unions).
- Using **Tailwind CSS v4** features — `@theme` tokens, `@custom-variant`, and the new CSS-first configuration.
- Managing client-side state with **Zustand** (persist middleware, combine pattern).
- Integrating **React Hook Form** with controlled components (`Controller` + `react-select`).
- Building responsive layouts and polished micro-interactions.

## License

This project is for personal/educational use.
